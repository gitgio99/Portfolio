# CarMaker 기반 기상상황 객체인식 모델 성능 평가 및 데이터 생성 파이프라인

본 프로젝트는 **CarMaker v15.0 시뮬레이터** 및 **RSDA(Raw Signal Data Access) GPU 플러그인**을 활용하여 다양한 기상 조건(Sunny, Rain, Snow, Fog)에서의 자율주행 객체 인식 데이터셋을 자동 구축하는 파이프라인입니다[cite: 2, 8]. 또한, 구축된 데이터를 바탕으로 **YOLOv8m** 모델의 Fine-Tuning을 진행하여 악천후 환경에서의 객체 인식 강건성을 평가합니다[cite: 5, 8].

---

## 1. 프로젝트 개요

* **배경**: KITTI, nuScenes 등 기존 실제 도로 기반 오픈 데이터셋은 날씨 등의 환경 변수를 정밀하게 통제하거나 변경하기 어렵다는 한계가 존재합니다.
* **목표**:
  1. CarMaker 내부 센서 데이터를 연동하여 **카메라 이미지(JPEG) 및 Ground Truth 2D Bounding Box 라벨 자동 생성 파이프라인**을 구축합니다[cite: 1, 2, 8].
  2. 기상 변수(Cloud, Rain, Snow, Fog, Sun)를 통제한 다양한 주행 시나리오 데이터셋을 수집합니다.
  3. YOLOv8m 사전 학습 모델(Pre-trained) 대비 **Fine-Tuned 모델의 기상 조건별 인식 성능(mAP, Precision, Recall)을 비교 분석**합니다.

---

## 2. 개발 환경

* **Simulator**: IPG CarMaker v15.0 (Linux 기반)
* **OS**: Ubuntu 22.04.5 LTS
* **Hardware**: NVIDIA GeForce RTX 4080 (CUDA 12.2)[cite: 8]
* **Model**: YOLOv8m (`yolov8m.pt`)[cite: 5, 8]
* **Libraries**: C++17, nvJPEG (`libnvjpeg`), CUDA, Ultralytics[cite: 2, 5]

---

## 3. 핵심 아키텍처 및 구현 내용

### 3.1. RSDA 기반 GPU 이미지 자동 캡처 (`JpegEncoder.cu`)
* CarMaker 센서 클러스터(Camera RSI)의 Raw RGB 데이터를 GPU 메모리 상에서 직접 전송받습니다[cite: 2, 8].
* `nvJPEG` 인코더를 활용하여 CPU 병목 없이 GPU 내에서 고속으로 JPEG 인코딩 및 디스크 저장을 수행합니다[cite: 2, 8].
* **데이터 저장 경로**: `SimOutput/JpegEncoder/[TestRunName]/[SessionFolder]/Cam_XX/Frame_[CycleNumber]_[SimTime].jpg` 형태로 자동 분류되어 저장됩니다[cite: 2].

### 3.2. GT 3D-to-2D 투영 및 라벨 생성 (`GTLabelWriter.cpp`)
* CarMaker `GroundTruthSensor`의 3D Object 정보를 수신합니다[cite: 1, 3, 4].
* **Intrinsics 계산**: FOV와 해상도($1280 \times 800$)를 기반으로 초점 거리($f_x, f_y$) 및 주점($c_x, c_y$)을 산출합니다[cite: 1].
* **3D $\rightarrow$ 2D Projection**: 3D Bounding Box의 8개 코너점을 생성하고 Yaw 값을 반영한 뒤, 다음 식을 통해 2D 픽셀 좌표계로 투영합니다[cite: 1, 8].
  * $u = c_x + \text{uSign} \cdot f_x \cdot (Y / X)$[cite: 1]
  * $v = c_y + \text{vSign} \cdot f_y \cdot (Z / X)$[cite: 1]
* **YOLO Format Conversion**: 투영된 2D Box를 이미지 크기로 정규화하여 `[class_id] [x_center] [y_center] [width] [height]` 형태의 `.txt` 파일로 출력합니다[cite: 1, 8].

### 3.3. 프레임 동기화(Synchronization) 보정
* **문제**: 초기 시스템 시점 차이로 인해 물리 연산(라벨)과 렌더링(이미지) 간 프레임 불일치가 발생하였습니다[cite: 8].
* **해결**: 단순 카운터 증가 방식이 아닌, 절대 시간(`SimCore.Time`) 기반으로 인덱스를 계산하여 정확한 프레임 ID를 보장하도록 알고리즘을 개선하였습니다[cite: 1, 8].
  * 계산식: $currentFrame = \text{round}(elapsed / 0.060) - 1$[cite: 1]

---

## 4. 데이터셋 구조 및 클래스 매핑

### 4.1. 클래스 매핑 (Label Space)
자율주행의 핵심 객체를 식별하기 위해 `FineTune5` 모드를 기본으로 사용하며, 총 5개의 클래스로 매핑합니다[cite: 1].

| Class ID | Class Name | CarMaker GT Type 매핑 |
| :---: | :--- | :--- |
| **0** | `person` | `GTTrafficType_People`[cite: 1] |
| **1** | `truck` | `GTTrafficType_Truck`, `GTTrafficType_SemiTruck`[cite: 1] |
| **2** | `traffic light` | `tGTTrafficLight` 객체 (클래스 2 할당)[cite: 1] |
| **3** | `stop sign` | `tGTTrafficSign` 객체 (클래스 3 할당)[cite: 1] |
| **4** | `car` | `GTTrafficType_Car`, `GTTrafficType_Van`[cite: 1] |

### 4.2. 출력 디렉토리 구조
```text
SimOutput/
├── JpegEncoder/
│   └── [TestRunName]/
│       └── Var_YYYYMMDD_HHMMSS_ms/
│           └── Cam_00/
│               ├── Frame_000000_0.000.jpg
│               └── Frame_000001_0.060.jpg
└── GTLabels/
    ├── Frame_000000_0.000.txt
    └── Frame_000001_0.060.txt
```

---

## 5. 모델 학습 (Fine-Tuning) 및 평가

### 5.1. 학습 하이퍼파라미터 및 설정 (`fine_tuning.py`)
* **Base Model**: YOLOv8m (`yolov8m.pt`)[cite: 5, 8]
* **Epochs**: 100[cite: 5, 8]
* **Patience**: 20 (성능 향상이 없을 경우 조기 종료)[cite: 5]
* **Batch Size**: 16[cite: 5, 8]
* **Image Size**: 1280x800 (`rect=True` 적용)[cite: 5, 8]
* **Device & Seed**: GPU 0번 사용, 난수 시드 42 고정[cite: 5, 8]
* **Mosaic Augmentation**: 학습 종료 10 Epoch 전 비활성화 (`close_mosaic=10`)[cite: 5, 8]
* **Dataset Size**: 총 6,228장 (Train/Val 비율 9:1)[cite: 8]

### 5.2. 프레임 동기화 보정 및 최종 평가 결과
* **동기화 개선(Synchronization)**: 초기 시뮬레이션 물리 연산과 이미지 로깅 타이밍 차이로 발생하던 라벨-이미지 불일치 문제를 절대시간(SimCore.Time) 기반 인덱싱으로 보정하여 재학습을 진행했습니다[cite: 1, 8].
* **정확도(Accuracy) 향상**: 동기화 보정 전 84%에서 보정 후 88%로 4% 향상되었습니다[cite: 8].
* **배경 오인식(Background Miss) 감소**: 동기화 보정 전 16%에서 보정 후 12%로 4% 감소했습니다[cite: 8].
* **환경별 강건성**: Fine-tuned 모델은 Pre-trained 모델에 비해 Fog, Rain, Snow 등 악천후 환경에서 신뢰도 및 Bounding Box 추론 능력이 유의미하게 향상되었습니다[cite: 8].

## 🔄 전체 프로젝트 파이프라인 (Project Pipeline)

본 프로젝트는 시뮬레이션 환경 구축부터 데이터 생성, 모델 학습, 최종 평가까지 4단계의 파이프라인으로 구성됩니다[cite: 8].

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 1: Simulation & Data Generation (시뮬레이션 및 데이터 추출)                      │
└────────────────────────────────────────────────────────────────────────────────────────┘
          [ CarMaker v15.0 ] 
    (Weather Scenarios: Sunny, Rain, Snow, Fog)[cite: 8]
                 │
                 ├──▶ [Camera RSI Sensor] 
                 │       │ (Raw RGB Data)
                 │       ▼
                 │    [RSDA GPU Plugin (JpegEncoder.cu)][cite: 2]
                 │       │ (nvJPEG Encoding on GPU)[cite: 2, 8]
                 │       ▼
                 │    📂 Images (.jpg)[cite: 2]
                 │
                 └──▶ [GroundTruth Sensor] 
                         │ (3D BBox, Pos, Yaw)[cite: 1, 8]
                         ▼
                      [GTLabelWriter.cpp][cite: 1]
                         │ (3D to 2D Projection & Normalization)[cite: 1, 8]
                         ▼
                      📂 YOLO Labels (.txt)[cite: 1, 8]

                                ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 2: Synchronization & Preprocessing (데이터 동기화 및 전처리)                     │
└────────────────────────────────────────────────────────────────────────────────────────┘
                 [ 절대시간(SimCore.Time) 기반 프레임 동기화 보정 ][cite: 1, 8]
                                │
                                ▼
         [ 📂 Images + 📂 Labels = Total 6,228 Dataset ][cite: 8]
                                │
               [ Dataset Split (Train 9 : Validation 1) ][cite: 8]

                                ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 3: Model Fine-Tuning (모델 학습)                                                 │
└────────────────────────────────────────────────────────────────────────────────────────┘
                  [ Pre-trained YOLOv8m (yolov8m.pt) ][cite: 5, 8]
                                │
                                ▼
                        [ fine_tuning.py ][cite: 5]
    (Epoch: 100, Batch: 16, Imgsz: 1280, Patience: 20, Mosaic: Close at 10)[cite: 5, 8]
                                │
                                ▼
                   [ 🚀 Fine-Tuned YOLOv8m Model ][cite: 8]

                                ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Phase 4: Evaluation & Testing (성능 평가)                                              │
└────────────────────────────────────────────────────────────────────────────────────────┘
                 [ Test Dataset (날씨별 각 450장 구성) ][cite: 8]
                                │
                                ▼
       [ Pre-trained vs Fine-Tuned 성능 비교 (mAP, Precision, Recall) ][cite: 8]
                                │
                                ▼
          [ 악천후(Fog, Rain, Snow) 환경에서의 객체 인식 강건성 검증 완료 ][cite: 8]
```

