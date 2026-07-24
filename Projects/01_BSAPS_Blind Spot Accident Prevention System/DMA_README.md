# STM32F4 HUB75 LED Matrix Controller (DMA/TIM1 Accelerated Version)

이 펌웨어는 기존 CPU 기반 폴링 방식을 전면 개편하여, **TIM1 타이머와 DMA2를 연동한 하드웨어 가속 렌더링**을 구현한 고성능 버전입니다[cite: 10, 12, 14, 20]. CPU 개입 없이 안정적이고 부드러운 애니메이션과 깜빡임 없는 디스플레이 갱신이 가능합니다.

## 🚀 주요 기능 (Features)
* **DMA 기반 BSRR 고속 제어**: TIM1 이벤트에 맞춰 프레임 버퍼의 명령어를 GPIOB `BSRR` 레지스터로 DMA가 직접 전송하여 핀 상태를 변경합니다[cite: 10, 14, 20].
* **비트플레인(Bitplane) 및 감마 보정**: 8비트 색상을 `color_u8_to_u5()` 함수를 통해 5-bit 색상 심도로 변환하고, 선형적인 색 표현을 위해 감마 보정을 적용합니다[cite: 8, 18, 20].
* **더블 버퍼링 (Double Buffering)**: 화면 찢어짐(Tearing)을 방지하기 위해 `fb0`와 `fb1` 두 개의 메모리를 운영하고, `led_dma_take_vsync()`를 통해 프레임 경계(VSYNC)를 맞춰 화면을 갱신합니다[cite: 10, 12, 20].
* **BSRR 명령어 사전 컴파일**: 단순 픽셀 배열이 아닌, `build_from_pixel_fn`을 통해 CLK, LAT, OE 토글 명령이 모두 포함된 32-bit 워드스트림을 사전에 조립(`LED_WORDS_PER_FRAME`)합니다[cite: 13, 20].
* **내장 RTC 및 애니메이션**: 하드웨어 RTC(`MX_RTC_Init`)를 통한 시계 렌더링(`paint_time_frame`) 및 체커보드, 무지개 스크롤 등의 애니메이션 렌더러를 탑재했습니다[cite: 7, 12, 17, 23].

## 🛠 하드웨어 핀 맵 (Pin Configuration)
DMA의 1회 전송으로 모든 핀 상태를 동기화하여 제어해야 하므로, **모든 HUB75 관련 핀이 GPIOB로 통합**되었습니다[cite: 22].
* **Address (행 선택)**
  * `A`: PB12, `B`: PB13, `C`: PB14, `D`: PB15[cite: 22]
* **RGB Data (색상 데이터)**
  * 상단: `R1` (PB0), `G1` (PB1), `B1` (PB2)[cite: 22]
  * 하단: `R2` (PB3), `G2` (PB4), `B2` (PB5)[cite: 22]
* **Control (제어 신호)**
  * `CLK`: PB6[cite: 22]
  * `LAT`: PB9[cite: 22]
  * `OE`: PB8[cite: 22]
* **UART (디버그 콘솔)**
  * `USART2_TX`: PA2, `USART2_RX`: PA3 (115200 bps)[cite: 14, 22]

*(주의: 부팅 시 `debug_check_pins()` 함수가 제어 핀과 데이터 핀 간의 마스크 충돌 여부 및 포트 정합성을 자동 검사합니다[cite: 9, 19].)*

## 📁 주요 모듈 (Modules)
* `dma.c` / `dma.h`: 타이머 연동 멀티버퍼 DMA를 설정(`led_dma_start`)하고, 인터럽트 콜백을 통해 VSYNC를 관리합니다[cite: 10, 20].
* `paint.c` / `paint.h`: 픽셀 데이터(RGB)를 읽어와 DMA가 전송할 `BSRR` 제어 워드 배열로 변환하는 핵심 렌더링 파이프라인입니다[cite: 13, 23].
* `anim.c` / `anim.h`: 무지개 스크롤, 체커보드 등 동적 프레임 애니메이션의 위상(Phase) 및 스텝을 관리합니다[cite: 7, 17].
* `color.c` / `color.h`: 감마 보정(`powf` 활용) 및 비트플레인 처리를 위한 색상 심도 축소 매핑을 수행합니다[cite: 8, 18].
* `debug_uart.c` / `debug_uart.h`: 동작 주파수에 기반하여 FPS를 계산(`debug_tim1_fps`)하고 시스템 상태를 시리얼 콘솔로 출력합니다[cite: 9, 19].