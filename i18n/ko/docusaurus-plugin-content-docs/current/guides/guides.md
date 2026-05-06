---
title: "가이드"
sidebar_label: "가이드"
---

# 가이드

가이드 정보는 문서의 주요 부분을 차지하며 실제로 dhtmlxGantt를 사용할 때 도움을 제공합니다.
이 챕터는 다양한 난이도의 작업을 수행하는 데 도움을 주는 작업 중심의 매뉴얼로 구성되어 있습니다.
문서는 핵심 절차와 문제 해결 활동을 다룹니다. 

다음의 [표준(Standard) 및 PRO 버전에서 제공되는 기능](guides/editions-comparison.md)을 dhtmlxGantt 라이브러리에서 확인하십시오.

<div className="guidesList">

## 페이지에서 간트 차트 만들기 

간트 차트를 설치하고 초기화하는 방법을 보여주며 사용 가능한 확장 기능 목록을 제공합니다.

- ### [dhtmlxGantt 설치 방법](guides/installation.md)
- ### [간트 차트 초기화](guides/initializing-gantt-chart.md)
- ### [확장 기능의 전체 목록](guides/extensions-list.md)

## 간트 차트 구성 

서버에서 간트 차트를 생성하는 방법, 페이지에서 표준 간트 차트를 구성하고 이를 작동하게 만드는 방법을 설명합니다: 특정 설정으로 구성하고, 기본 템플릿을 사용자 정의하고, 이벤트를 연결하는 등.

- ### [구성](guides/common-configuration.md)
- ### [간트 차트 레이아웃](guides/layout-config.md)
- ### [자원 관리](guides/resource-management.md)
- ### [이벤트 처리](guides/handling-events.md)
- ### [페이지당 다중 간트 차트](guides/multiple-gantts.md)
- ### [서버에서 간트 차트 사용하기](guides/using-gantt-on-server.md)


## 데이터 로딩 및 저장 

간트 차트에 데이터를 로드하는 방법: 다양한 데이터 소스, 형식, 기법에 대해 다룹니다.

- ### [데이터 로딩](guides/loading.md)
- ### [서버 사이드 통합](guides/server-side.md)
- ### [성능: 향상 방법](guides/performance.md)
 
## 그리드 영역 구성 

그리드 작업에 초점을 맞춥니다: 필요한 열을 지정하고 구성하며, 트리 열을 사용자 정의하고, 선택을 활성화하는 등.

- ### [열 지정](guides/specifying-columns.md)
- ### [그리드에서 행 크기 조정](guides/resizing-rows.md)
- ### [트리 열 구성](guides/tree-column.md)
- ### [작업 재정렬](guides/reordering-tasks.md)
- ### [다중 작업 선택](guides/multiselection.md)
- ### [열 정렬](guides/sorting.md)
- ### [작업 그룹화](guides/grouping.md)
- ### [작업 필터링](guides/filtering.md)
- ### [그리드에서의 인라인 편집](guides/inline-editing.md)
  
 
## 스케일 구성

타임라인에서의 작업에 초점을 맞춥니다: 기본 시간 눈금의 형식, 단위, 간격 설정, 두 번째 눈금 추가 및 구성, 특정 날짜 강조 등.

- ### [스케일 설정](guides/configuring-time-scale.md) 
- ### [확대/축소](guides/zooming.md)
- ### [시간 슬롯 하이라이트](guides/highlighting-time-slots.md)
- ### [스케일 설정의 동적 변경](guides/dynamic-scale.md)
- ### [스케일에서 시간 단위 숨기기](guides/custom-scale.md)
- ### [수직 표시 추가](guides/markers.md)
- ### [RTL(오른쪽에서 왼쪽) 모드](guides/rtl-mode.md)
  
## 라이트박스(편집 양식) 구성 

라이트박스와의 작업 방법: 컨트롤 추가/삭제, 컨트롤 값 가져오기/설정, 라이트박스 모양 커스터마이즈 등.

- ### [라이트박스 요소 구성](guides/default-edit-form.md)
- ### [라이트박스 요소 작업](guides/lightbox-manipulations.md)
- ### [커스텀 라이트박스](guides/custom-edit-form.md)
- ### [커스텀 요소 만들기](guides/custom-editor.md)
- ### [라이트박스의 버튼 변경](guides/custom-button.md)
 

## 작업 구성 

작업 객체에 대한 일반적인 작업(추가, 삭제, 날짜 형식 설정, 필터링 등)의 기본을 다룹니다.

- ### [작업 유형](guides/task-types.md) 
- ### [작업 객체/ID](guides/task-object-operations.md)
- ### [작업 상위/하위](guides/task-tree-operations.md)
- ### [작업의 기본 조작](guides/crud-task.md)
- ### [예정되지 않은 작업](guides/unscheduled-tasks.md)
- ### [작업 분할](guides/split-tasks.md)
- ### [다중 작업 선택](guides/multiselection.md)
- ### [작업 시간 계산](guides/working-time.md)
- ### [임계 경로](guides/critical-path.md)
- ### [타임라인의 추가 요소](guides/inbuilt-baselines.md)
- ### [타임라인 영역의 커스텀 요소](guides/baselines.md)
- ### [마일스톤](guides/milestones.md)
- ### [간트 차트 요소의 툴팁](guides/tooltips.md)
- ### [작업 내용 표시](guides/text-block-for-task.md)
- ### [읽기 전용 모드](guides/readonly-mode.md)
- ### [유효성 검사](guides/validation.md)
- ### [타임라인에서 작업 드래그](guides/dnd.md)
- ### [드래그 앤 드롭으로 작업 만들기/선택하기](guides/advanced-dnd.md)
- ### [수동으로 예정된 요약 작업](guides/custom-projects-dates.md)

  
## 종속성 링크 구성 

종속성 객체에 대한 일반 작업의 기본에 대해 다룹니다. 예: 추가, 삭제, 의존성 객체 가져오기 등.

- ### [링크 객체/ID 얻기](guides/link-object-operations.md)
- ### [링크 추가/업데이트/삭제](guides/crud-dependency.md)
- ### [자동 스케줄링](guides/auto-scheduling.md)


## 데이터 내보내기 및 가져오기 

다양한 형식으로 간트 차트 데이터를 내보내고 가져오는 방법과 XML 및 JSON으로 데이터를 직렬화하는 방법을 다룹니다.

- ### [Export Service - 독립 실행 설치를 위한 시스템 요구사항](guides/export-requirements.md)
- ### [PDF 및 PNG로 내보내기](guides/export.md)
- ### [Excel 내보내기/가져오기, iCal로 내보내기](guides/excel.md)
- ### [MS Project로부터 내보내기/가져오기](guides/export-msproject.md)
- ### [Primavera P6로부터 내보내기/가져오기](guides/export-primavera.md)
- ### [XML 및 JSON으로 데이터 직렬화](guides/serialization.md)
- ### [Node.js에서 데이터 내보내기/가져오기](guides/export-nodejs.md)


## 스타일링 

간트 차트를 스타일링하는 데 사용할 수 있는 형식과 기법에 대해 설명합니다.

- ### [CSS 문서](guides/css-overview.md)
- ### [스킨](guides/skins.md)
- ### [간트 차트 템플릿](guides/templates.md)
- ### [작업 색상 지정](guides/colouring-tasks.md)
- ### [링크 색상 지정 및 스타일링](guides/colouring-lines.md)
- ### [간트 차트 스타일 다루기](guides/styling-guide.md)
 

## 날짜 작업 

간트 차트에서 날짜를 다룰 때 필요할 수 있는 주제를 다룹니다: 날짜를 문자열로 변환하고 다시 변환하는 법, 날짜 형식에 허용되는 문자 등.

- ### [날짜 형식 사양](guides/date-format.md)
- ### [날짜 연산](guides/date-operations.md)

## 일반 기능 

간트 차트를 만들 때 필요할 수 있는 일반 정보를 안내합니다.

- ### [지역화(다국어 지원)](guides/localization.md)
- ### [전체 화면 모드](guides/fullscreen-mode.md)
- ### [실행 취소/다시 실행 기능](guides/undo-redo.md)
- ### [팝업 메시지 및 모달 상자](guides/message-boxes.md)
- ### [접근성](guides/accessibility.md)
- ### [키보드 탐색](guides/keyboard-navigation.md)
- ### [콘텐츠 보안 정책 준수](guides/content-security-policy.md)
- ### [JQuery와의 통합](guides/jquery-integration.md)

  
## 사용자 인터페이스 가이드 

최종 사용자의 관점에서 간트 차트 인터페이스의 요소를 설명합니다.

- ### [간트 차트 인터페이스](guides/overview.md)


</div>