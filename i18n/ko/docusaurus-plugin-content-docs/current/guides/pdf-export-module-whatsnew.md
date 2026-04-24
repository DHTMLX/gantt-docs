---
title: "PDF Export 모듈의 새로운 기능"
sidebar_label: "PDF Export 모듈의 새로운 기능"
---

PDF Export 모듈의 새로운 기능
================================

## 0.7.7

- 다중 페이지 PDF 내보내기에서 `format` 매개변수가 지정될 때 `width` 및 `height` 매개변수가 무시되지 않도록 수정
- `merge_pages`가 활성화된 단일 페이지 내보내기에서 빈 페이지가 추가되는 문제 수정
- 내보내기가 완료된 후 임시 파일 삭제 문제 수정
- 복잡한 레이아웃에서 HTML 정렬 불일치 문제 수정
- Gantt PDF 내보내기에 대한 페이지 크기 계산 개선
- Gantt 및 Scheduler의 PDF 및 PNG 내보내기를 비교하는 자동화 테스트 추가

## 0.7.6

- Gantt 및 Scheduler의 PDF 및 PNG 내보내기에 대한 HTML 콘텐츠 정화(sanitize) 기능 개선
- 원격 코드 실행(Remote Code Execution) 및 파일 읽기(File Read) 취약점 수정

## 0.7.4

- 다중 페이지 PDF의 머리글/바닥글에서 배경 색상 수정
- 구버전 Scheduler(4.2-5.1)에서 PDF 및 PNG 내보내기 수정
- 워터마크가 있는 Scheduler PDF 내보내기 수정

## 0.7.3

- Gantt 9.1용 템플릿 업데이트

## 0.7.2

- Gantt 9.0에서 외부 Google 글꼴 의존성 제거
- `slice_archive` 구성을 사용할 때 PNG 내보내기 개선
- Windows에서 파일 이름의 특수 문자 지원 개선
- PDF/PNG 내보내기 타임아웃 메시지 개선
- `merge_pages` 구성을 사용할 때 가로 모드의 PDF 내보내기 수정
- 다중 페이지 내보내기에서 헤더와 푸터 매개변수에 HTML을 사용할 때의 오류 수정
- 내보내기 모듈 경로에 공백이 있을 때 Windows에서 PDF 및 PNG 내보내기 수정
- 다중 페이지 내보내기에서 헤더/푸터 콘텐츠 확대/축소 문제 수정
- PNG 내보내기에서 사용자 정의 이름을 사용할 때 `slice_checker` 옵션 수정
- 일부 시나리오에서 PNG 내보내기가 중단되는 문제 수정
- 같은 밀리초 내에 여러 내보내기 요청을 수신할 때 Windows에서 PDF/PNG 내보내기 취소 문제 수정

## 0.7.1

- Excel 내보내기: 렌더링된 타임라인 표현에서 분할 작업을 지원하도록 추가 (`visual: true`)
- Excel 내보내기: 렌더링된 타임라인 표현에서 `end_date`가 `start_date`보다 빠른 경우의 작업 렌더링 수정
- Excel 내보내기: 일정이 지정되지 않은 작업의 날짜를 표시하지 않도록 수정

## 0.7.0
  
- Electron 버전을 29로 업데이트
- PDF 내보내기에 커스텀 여백 지원 추가
- 각 페이지에 머리글과 바닥글을 추가하는 지원 추가(페이지 번호 지정 방법 포함)
- A0, A1, A2 및 Ledger 형식 지원 추가
- Gantt 및 Scheduler 템플릿 업데이트
- `background-clip: text` 및 기타 스타일 규칙이 Chrome 122에서 지원되므로 작동해야 함
- 복잡한 사용자 지정 레이아웃의 PDF 내보내기 수정
- 리소스 패널을 사용할 때의 부분 콘텐츠 내보내기 수정
- `header`에 h1, h2 및 유사 태그를 추가할 때 PDF에 빈 페이지가 생기는 문제 수정
- `raw: true` 및 `merge_pages: true` 구성으로 커스텀 데이터를 사용할 때 내보내기 중단 현상 수정
- Windows에서 Electron 실행 시 EINVAL 오류 수정

## 0.6.7

- DHTMLX Gantt 9.0 원시(raw) 내보내기에 대한 템플릿 업데이트
- `raw` 내보내기의 고정 축(scale) 셀에 대한 수정

## 0.6.6

- `visual` 구성을 사용하여 Excel로 내보낼 때 미지정 작업 무시하도록 개선
- DHTMLX Gantt 9.0용 템플릿 추가

## 0.6.5

- DHTMLX Scheduler 7.0 템플릿 수정

## 0.6.4

- 하나의 PDF 파일에 다중 페이지 내보내기 기능 추가(지정된 형식으로 차트를 청크 단위로 내보낸 후 페이지를 하나의 파일로 병합)
- 하나의 파일 기능으로 다중 페이지 내보내기를 사용할 때 페이지별 그리드 및 타임라인 머리글 표시 기능 추가

## 0.6.3

- 도커 이미지용 Node.js 환경의 기본 이미지를 Node.js 20으로 업데이트
- Dockerfile 최적화 및 도커 이미지 크기 축소

## 0.6.2

- DHTMLX Scheduler 7.0용 템플릿 추가

## 0.6.0

- MS Project / Primavera P6 내보내기 서비스 엔드포인트 변경
- `visual:true` 매개변수로 타임라인 셀의 강조 표시를 정확히 하는 Excel 내보내기 수정
- 도커 파일 빌드용 패키지 업데이트

## 0.5.9

- 도커 이미지의 Node.js 버전 업데이트
- 보안 경고를 해결하기 위해 도커 이미지에서 사용하지 않는 파일 제거
- 그리드 열에 포매터(formatter)가 있을 때 내보내기가 작동하지 않는 버그 수정

## 0.5.8

- 내보내기 모듈의 메인 페이지와 모듈 기능 테스트 링크 제공(테스트하기 전에 드롭다운에서 URL 확인)
예: [https://export.dhtmlx.com](https://export.dhtmlx.com)
- 신규 기능: [Node.js용 Gantt 가져오기 및 내보내기](guides/export-nodejs.md)
- `visual:true` 매개변수로 Excel 내보내기에서 여러 축, 다른 지속 시간 단위가 포함된 데이터를 내보낼 수 있도록 개선. 작업은 타임라인 셀의 시작과 끝에 맞춰 시작될 필요가 없음

## 0.5.7

- Node.js 14와의 호환성 개선
- 커스텀 로케일에 대한 수정
- 도커용 "init" 프로세스 추가

## 0.5.6

- 그래픽 인터페이스가 없는 헤드리스 서버와 도커에서 실행 시 메모리 누수 수정

## 0.5.5

- 도커 이미지 내부 애플리케이션 동작 개선

## 0.5.0

- PDF 및 PNG 내보내기에 PhantomJS에서 Electron으로 전환