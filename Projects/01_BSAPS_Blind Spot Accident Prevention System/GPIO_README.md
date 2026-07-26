# STM32F4 HUB75 LED Matrix Controller (GPIO Polling Version)

이 프로젝트는 STM32F4 마이크로컨트롤러를 사용하여 64x32 해상도의 HUB75 RGB LED 매트릭스를 제어하는 초기 펌웨어입니다[cite: 2, 3]. CPU가 직접 GPIO 핀을 제어(Bit-banging)하여 화면을 갱신합니다[cite: 2].

## 🚀 주요 기능 (Features)
* **직접 제어 방식의 디스플레이 갱신**: CPU가 `UpdateMatrix()` 함수를 통해 주기적으로 화면을 그립니다[cite: 2].
* **6KB 프레임 버퍼**: `rgb_framebuffer[32][64][3]` 형태의 3차원 배열을 사용하여 픽셀 단위로 RGB 색상을 관리합니다[cite: 2].
* **다양한 출력 상태 지원**: 시계 모드(`LED_STATE_CLOCK`), 정지 모드(`LED_STATE_STOP`), 마리오 모드(`LED_STATE_MARIO`)를 지원합니다[cite: 2].
* **사용자 정의 폰트 및 비트맵**: `led_font.h`를 통해 7x12 소형 폰트, 11x16 대형 폰트 및 32x32 마리오 비트맵을 렌더링합니다[cite: 1].
* **시리얼 제어 프로토콜**: USART1을 통해 STX/ETX/DLE 프레임 기반의 커스텀 명령(`CMD_LCD_ON`, `CMD_LCD_OFF`, `CMD_SYNC_TIME`)을 수신하고 처리합니다[cite: 5, 6].

## 🛠 하드웨어 핀 맵 (Pin Configuration)
제어 핀과 데이터 핀이 여러 포트에 분산되어 있습니다[cite: 3].
* **Address (행 선택)**
  * `A`: PC0, `B`: PC1, `C`: PC2, `D`: PC3[cite: 3]
* **RGB Data (색상 데이터)**
  * 상단: `R1` (PB0), `G1` (PB1), `B1` (PB2)[cite: 3]
  * 하단: `R2` (PB3), `G2` (PB4), `B2` (PB5)[cite: 3]
* **Control (제어 신호)**
  * `CLK`: PA4[cite: 3]
  * `LAT`: PB9[cite: 3]
  * `OE`: PB8[cite: 3]
* **UART (통신)**
  * `USART1_TX`: PA2, `USART1_RX`: PA3[cite: 3]

## 📁 주요 모듈 (Modules)
* `led_matrix.c` / `led_matrix.h`: 행 선택, 픽셀 설정(`setPixel`), 디스플레이 업데이트(`UpdateMatrix`) 등 핵심 렌더링 로직을 수행합니다[cite: 2].
* `uart_protocol.c` / `uart_protocol.h`: CRC16 검증이 포함된 상태 머신(`FSM_ParseByte`)을 통해 수신된 패킷을 파싱합니다[cite: 6].