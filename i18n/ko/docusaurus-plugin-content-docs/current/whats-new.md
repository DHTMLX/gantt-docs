---
title: "What's New"
sidebar_label: "What's New"
---

What's New
==========


현재 사용 중인 dhtmlxGantt 버전이 2.0보다 이전 버전이라면, 업데이트에 대한 자세한 내용은 [](migration.md)를 참고하세요.

9.0.11
---------------
<span class='release_date'>2025년 5월 27일. 버그 수정 릴리즈</span>

### 수정 사항

- [mergeCalendars](api/method/mergecalendars.md)에서 `customWeeks` 값이 잘못 병합되는 문제 수정
- [column](guides/specifying-columns.md#wbscode) `name`에 공백이 포함된 경우 `onrender` 함수에서 오류가 발생하는 현상 수정
- [S-Curve Overlay](guides/baselines.md#extraoverlayforthechart)가 활성화된 상태에서 [click_drag](guides/extensions-list.md#advanceddragndrop)로 타임라인을 드래그한 후 Gantt가 읽기 전용 모드에 남아있는 문제 수정
- [Resource calendar](guides/resource-management.md) 사용 시, [Lightbox](guides/default-edit-form.md)의 duration 섹션 아래에 [Resources](guides/resource-management.md#resourceviewpanel) 섹션이 위치할 때 작업 기간이 `0`으로 초기화되는 문제 수정
- Gantt가 **React StrictMode**에서 사용될 때 "This is a Trial version" 경고로 인해 콘솔 오류가 발생하는 현상 수정
- [gantt.config.baselines.render_mode](api/config/baselines.md#rendermode)가 비활성화된 경우 [adjustTaskHeightForBaselines](api/method/adjusttaskheightforbaselines.md) 함수가 행 높이를 다시 계산하지 않는 문제 수정
- Salesforce 환경에서 타임라인이 [숨겨진](api/config/show_chart.md) 경우 작업이 표시되지 않는 문제 수정
- [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) 설정이 비활성화된 경우 상위 작업에서 캘린더가 상속되지 않는 문제 수정
- [ReactGantt](integrations/react.md)가 groupBy 모드일 때 다시 렌더링 시 스크롤 위치가 초기화되는 문제 수정

### 업데이트

- [gantt.env](api/other/env.md)에 `isSalesforce` 플래그 추가
- [React Gantt](integrations/react.md#groupingtasks)에 `groupTasks` prop 추가

9.0.10
---------------
<span class='release_date'>2025년 4월 22일. 버그 수정 릴리즈</span>

### 수정 사항

- [Lightbox](guides/default-edit-form.md)에서 `parent` 필드 값을 변경할 수 없는 문제 수정
- Firefox 88 이상에서 마우스 휠 사용 시 스크롤 속도가 과도하게 빨라지는 현상 수정
- 하위 작업이 일정이 없고 날짜 파라미터가 없는 경우 [project tasks](guides/task-types.md#projecttasks)를 드래그할 수 없는 문제 수정
- [open](api/method/open.md) 또는 [close](api/method/close.md) 메서드 사용 시 [gantt.silent](api/method/silent.md) 동작 중 [gantt.render()](api/method/render.md)가 예기치 않게 호출되지 않도록 보장
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) 이벤트가 `false`를 반환할 때 [project tasks](guides/task-types.md#projecttasks)가 다시 그려지지 않는 문제 수정
- 작업 진행 바가 예상대로 작업 전체 너비를 차지하도록 보장
- [접근성](guides/accessibility.md#waiariaattributes) 향상을 위해 읽기 전용 작업 링크에서 잘못된 WAI-ARIA 속성 제거
- 작업 바 높이 변경에 따라 작업 바 리사이저가 적응하지 않는 문제 수정

9.0.9
---------------
<span class='release_date'>2025년 4월 16일. 버그 수정 릴리즈</span>

### 업데이트

- [React Gantt](integrations/react.md) 샘플이 Commercial, Enterprise, Ultimate, Evaluation 패키지에 추가됨

### 수정 사항

- [resetLayout](api/method/resetlayout.md) 메서드 호출 후 마우스 휠 줌이 동작하지 않는 문제 수정
- [Quick Info](guides/quick-info.md) 팝업이 [Timeline](guides/configuring-time-scale.md) 또는 [Grid](guides/specifying-columns.md) 뷰의 확장/축소 버튼 클릭 시 나타나는 문제 수정
- 그리드 뷰를 초기화하지 않고 Gantt를 제거할 때 발생하는 오류 수정
- [Undo extension](guides/undo-redo.md)이 활성화된 상태에서 존재하지 않는 상위 작업을 가진 작업을 로드할 때 발생하는 오류 수정
- [click_drag](guides/extensions-list.md#advanceddragndrop) 확장이 터치 디바이스에서 동작하지 않는 문제 수정
- 터치 디바이스에서 그리드 스크롤 반응성 개선

9.0.7
---------------
<span class='release_date'>2025년 3월 27일. 버그 수정 릴리즈</span>

### 수정 사항

- [keyboard_navigation](guides/keyboard-navigation.md)이 활성화된 상태에서 그리드 없이 타임라인의 작업을 클릭할 때 발생하는 오류 수정
- [placeholder task](api/config/placeholder_task.md)가 포함된 정렬된 작업의 [WBS code](guides/specifying-columns.md#wbscode) 계산 오류 수정
- 작업을 축소하거나 [그리드 크기 조정](guides/layout-config.md#defaultlayout) 시 리소스 타임라인의 스케일 셀이 사라지는 문제 해결
- [`gantt.silent`](api/method/silent.md) 함수 내에서 자식과 부모 작업을 모두 추가할 때 올바른 작업 순서가 유지되도록 보장
- [resource cells](guides/resource-management.md#resourcecellvalue)의 값을 편집한 후에도 포커스가 유지되도록 개선
- 작업 클릭 시 Gantt가 그리드의 가장 왼쪽 위치로 스크롤되는 현상 방지
- [group](api/method/groupby.md) 모드에서 새 작업 추가 시 `group` 속성이 유지되도록 보장
- [markers](guides/markers.md)가 타임라인이 처음에 비활성화된 경우 표시되지 않는 문제 수정
- 레이아웃 구성에서 차트가 처음에 표시되지 않을 때 중복되는 [markers](guides/markers.md) 방지
- [dragging the timeline](api/config/drag_timeline.md) 후 드래그 핸들(링크, 진행률, 작업 크기 조정)이 사라지는 문제 수정
- 링크 id 타입이 숫자형일 때 [predecessor inline editor](guides/inline-editors-ext.md#predecessoreditor)가 올바르게 동작하도록 보장
- `gantt_marker_area` 요소 중복 방지
- `changeTaskId` 액션에 대한 [undo](guides/undo-redo.md) 기능 수정

9.0.6
---------------
<span class='release_date'>2025년 3월 18일. 버그 수정 릴리즈</span>

### 수정 사항

- [lightbox](guides/default-edit-form.md)에서 버튼이 Gantt를 재초기화하기 전까지 현재 로케일을 반영하지 않는 문제 수정
- 일부만 로드된 작업의 링크를 삭제할 때 발생하는 오류 해결
- `parent` 속성 타입을 숫자에서 문자열로 변경한 후 작업이 잘못 하위 브랜치의 맨 아래로 이동하는 현상 방지
- 스크롤바 근처 리사이저 조정으로 스크롤바 동작 개선
- [gantt.batchUpdate](api/method/batchupdate.md) 내에서 작업 추가 시 [resource assignments](guides/resource-management.md#assigningresources)가 유지되도록 보장
- [infinite scale](guides/configuring-time-scale.md#infinitescroll)에서 드래그 앤 드롭 중 작업이 사라지는 문제 수정
- 데이터가 여러 번 파싱된 후 [lightbox](guides/default-edit-form.md)에서 리소스 이름이 올바르게 표시되도록 보장
- [duration_step](api/config/duration_step.md) 설정 사용 시 [`getClosestWorkTime`](api/method/getclosestworktime.md)에서 잘못된 날짜 계산 수정
- [onColumnDragMove](api/config/reorder_grid_columns.md) 이벤트를 취소할 수 있도록 허용
- 트라이얼 빌드가 Lightning Web Components(LWC)에서 실행되지 않는 호환성 문제 해결
- [resource panel](guides/resource-management.md#resourceviewpanel)에 영향을 주는 `fetchTasks` 및 [deepcopy_on_parse](api/config/deepcopy_on_parse.md) 설정 관련 문제 해결
- Gantt 초기화 시 폰트 아이콘 표시 오류 수정

9.0.5
---------------
<span class='release_date'>2025년 2월 28일. 버그 수정 릴리즈</span>

- [Resource Grid](guides/resource-management.md#resourceviewpanel)에서 행 크기 조정 시 발생하는 오류 수정
- [Time control](guides/time.md#properties)의 **year_range** 속성으로 지정된 범위에 마지막 연도가 포함되도록 보장
- `line-height` CSS 스타일로 인해 영향을 받는 링크 화살표 위치 수정
- `links` 배열 없이 [collections](guides/supported-data-formats.md#jsonwithcollections) 로드 시 발생하는 오류 수정
- `gantt.config.baselines`가 falsy이지만 명시적으로 `false`로 설정되지 않은 경우 발생하는 문제 해결
- [click_drag](guides/extensions-list.md#advanceddragndrop) 기능이 [resetLayout](api/method/resetlayout.md) 호출 후 동작하지 않는 문제 수정
- [keyboard_navigation](guides/keyboard-navigation.md) 활성화 시 선택된 하위 작업이 상위 작업보다 위에 표시되지 않도록 보장
- 작업 ID에 작은따옴표가 포함된 경우 발생하는 키보드 내비게이션 문제 수정
- duration이 음수일 때 [calculateEndDate](api/method/calculateenddate.md) 동작 수정
- [baselines](guides/inbuilt-baselines.md)가 활성화된 타임라인 없이 데이터셋을 로드할 때 발생하는 오류 해결
- 작업이 차트 시간 범위 밖에 있어도 그리드 셀이 포커스를 받을 수 있도록 보장
- [inline editor](guides/inline-editors-ext.md)에서 날짜 값을 일부만 삭제할 때 발생하는 오류 수정
- `fetchTasks`가 활성화된 상태에서 필터링 후 [resource panel](guides/resource-management.md#resourceviewpanel)이 잘못 표시되는 문제 수정

9.0.4
---------------
<span class='release_date'>2024년 12월 3일. 버그 수정 릴리즈</span>

- [SNET constraint](guides/auto-scheduling.md#timeconstraintsfortasks) 날짜를 [inline editor](guides/inline-editors-ext.md)로 변경할 수 없는 문제 수정
- [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) 설정이 비활성화된 경우, 단일 [resource assignment](guides/resource-management.md#assigningresources)가 있는 작업에 대해 Gantt가 글로벌 [calendar](guides/working-time.md)를 반환하는 문제 수정
- Gantt를 [재초기화](api/method/init.md)하거나 [레이아웃을 재설정](api/method/resetlayout.md)한 후 inline editor를 통해 시작 날짜를 변경할 때 [constraint](guides/auto-scheduling.md#timeconstraintsfortasks) 날짜에 문제가 발생하는 현상 수정
- [gantt.getGanttInstance](guides/multiple-gantts.md) 메서드 사용 시 컨테이너를 지정하지 않으면 [gantt.plugins](api/method/plugins.md) 일부 설정에서 스크립트 오류가 발생하는 문제 수정
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md) 설정이 활성화되고 작업이 [grouped](api/method/groupby.md)된 경우 Gantt가 동작하지 않는 문제 수정
- 작업을 드래그한 후 작업의 [constraint](guides/auto-scheduling.md#timeconstraintsfortasks)이 유지되도록 보장

9.0.3
---------------
<span class='release_date'>2024년 11월 19일. 버그 수정 릴리즈</span>

- [Quick Info](guides/quick-info.md) 팝업 스타일 관련 회귀 문제 수정
- 'start'/'end' 대신 'flex-start'/'flex-end' 사용으로 인한 PostCSS 빌드 경고 해결
- lightbox를 통해 업데이트 시 [resource assignment](guides/resource-management.md#assigningresources)가 제거되는 문제 방지
- [resource_cell_value](api/template/resource_cell_value.md)에서 [resource_render_empty_cells](api/config/resource_render_empty_cells.md)가 활성화된 비작업일에 작업 배열이 비어있는 문제 수정
- [lightbox](guides/default-edit-form.md) 섹션에 내장된 버튼 클릭 시 발생하는 오류 수정
- [resource panel](guides/resource-management.md#resourceviewpanel)과 [zoom levels](guides/zooming.md#builtinzoomingmodule)가 동기화되도록 보장
- Gantt를 [재초기화](api/method/init.md)하거나 [레이아웃을 재설정](api/method/resetlayout.md)한 후 [Inline Editors](guides/inline-editors-ext.md) 이벤트가 제거되지 않도록 방지
- [redoing](guides/undo-redo.md) 후 열림 상태가 복원되지 않는 문제 수정

9.0.2
---------------
<span class='release_date'>2024년 11월 11일. 버그 수정 릴리즈</span>


### 수정 사항

- [작업 객체의 속성](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)을 통해 작업 색상이 지정될 때 작업 테두리 및 진행률에 잘못된 스타일이 적용되는 회귀 현상 수정
- [marker_class](api/template/marker_class.md) 템플릿의 기능 복원
- 라이트박스의 [textarea](guides/textarea.md) 섹션에서 누락된 classname 복원
- [마감일](guides/inbuilt-baselines.md#deadlinesandconstraints)이 작업 행 밖에 표시되고 완전히 중앙 정렬되지 않는 문제 수정
- 마우스 오버 시 링크가 다른 링크 위에 표시되도록 보장
- [parse](api/method/parse.md) 메서드를 사용하여 [baseline](guides/inbuilt-baselines.md) 날짜를 로드할 때 날짜가 계산되지 않는 문제 수정
- 일반 및 [RTL](guides/rtl-mode.md) 보기 모두에서 [제약 조건](guides/inbuilt-baselines.md#deadlinesandconstraints)의 위치를 올바르게 수정
- 분할 작업의 일부를 연결할 때 불필요한 링크 루프 방지
- [Quick Info](guides/quick-info.md)가 [detached mode](api/config/quick_info_detached.md)에서 너비 증가 및 하드코딩된 스타일로 인해 숨겨지지 않는 문제 수정
- [Export API](api/method/exporttoexcel.md)에서 Excel 내보내기 시 트리 들여쓰기 지원
- [multiselect_one_level](api/config/multiselect_one_level.md)가 활성화된 상태에서 다른 트리 레벨의 작업을 선택하면 작업 선택이 불가능한 문제 해결
- TypeScript 환경에서 [export_api](api/method/exporttopdf.md) 플러그인의 기능 복원
- 타입 정의 업데이트

9.0.1
---------------

<span class='release_date'>2024년 10월 21일. 버그 수정 릴리스</span>

### 수정 사항

- [smart_rendering](api/config/smart_rendering.md)이 활성화된 상태에서 드래그 시 링크 위치가 잘못 표시되는 회귀 현상 수정
- [lightbox](guides/default-edit-form.md)의 [Resource Control](guides/resources.md)이 컨테이너를 벗어나 확장되는 회귀 현상 수정
- 커스텀 CSS로 강조 표시된 경우 마지막 행의 [time scale](guides/configuring-time-scale.md) 셀 하단 테두리가 누락되는 문제 수정
- [smart_scales](api/config/smart_scales.md)가 비활성화된 경우 [sticky labels](guides/configuring-time-scale.md#stickylabels)의 잘못된 동작 수정
- 오른쪽 클릭 후에도 Gantt가 작업을 [수직 드래그](api/config/order_branch.md)하는 문제 해결
- [resetLayout](api/method/resetlayout.md) 호출 시 [S-Curve Overlay](guides/baselines.md#extraoverlayforthechart) 플러그인의 기능이 중단되는 문제 수정
- [predecessor editor](guides/inline-editing.md#typesofeditors)가 중복 링크를 생성하지 않도록 방지

<b>9.0</b>
---------------

<span class='release_date'>2024년 10월 17일. 주요 업데이트</span>

[블로그에서 릴리스 리뷰 보기](https://dhtmlx.com/blog/dhtmlx-gantt-9-0/)

### 주요 변경 사항

이번 업데이트에서는 Gantt 패키지의 구조와 기능 동작에 일부 변경 사항이 있습니다. 안전을 위해 
[마이그레이션 노트](migration.md#80---90)를 반드시 확인하세요.

### 새로운 기능

- CSS 변수 기반의 [스킨 커스터마이징](guides/custom-skins.md)
- 새로운 [다크 스킨](guides/skins.md#darkskin) 도입
- 내장 [baseline](guides/inbuilt-baselines.md) 지원 추가
- [수동 일정 요약 작업](guides/custom-projects-dates.md) 지원
- [시간 눈금의 스티키 라벨](guides/configuring-time-scale.md#stickylabels)

### 업데이트

- [Terrace 스킨](guides/skins.md#terraceskin) 업데이트
- [마감일](guides/inbuilt-baselines.md#deadlinesandconstraints)의 기본 표시 추가
- [작업 제약 조건](guides/inbuilt-baselines.md#taskconstraints)의 기본 표시 추가
- [스킨 소스 파일](guides/custom-skins.md) 패키지 포함
- [Undo 플러그인](guides/undo-redo.md)에 undo/redo 스택을 관리하는 `setUndoStack` 및 `setRedoStack` 메서드 추가
- [npm을 통한 Gantt 프로페셔널 버전 설치](guides/installation.md) 지원
- [Bluebird Promise](api/method/promise.md) 라이브러리 코어에서 **제거**
- 고해상도 화면 및 작은 화면에서의 확장성 및 반응성 개선
- 타입 정의 업데이트

### 수정 사항

- 부모 작업의 높이가 더 클 때 마일스톤의 링크 위치가 잘못 표시되는 문제 수정
- [자동 스케줄링](guides/auto-scheduling.md) 중 작업에 대해 자동 스케줄링이 취소될 경우 발생하는 오류 해결
- [분할 작업](guides/split-tasks.md)이 분할 부모 행 내에 올바르게 표시되도록 보장
- 하위 작업의 링크 지연이 0인 경우 [프로젝트 자동 스케줄링](guides/auto-scheduling.md#summaryscheduling) 수정
- 서로 다른 행 높이를 가진 [분할 작업](guides/split-tasks.md)의 링크 위치 오류 수정
- 2단계 작업이 있는 프로젝트도 Gantt가 제대로 자동 스케줄링하도록 보장
- 작업이 지정된 날짜 범위 밖에 있을 때 [resource_cell_value](guides/resource-management.md#resourcecellvalue)에서 고정 날짜 "assignments"를 반환하지 않는 문제 수정

8.0.11
----------

<span class='release_date'>2024년 10월 8일. 버그 수정 릴리스</span>

### 수정 사항

- [열 리사이저](guides/specifying-columns.md#resizing)가 가장 오른쪽 열에 있을 때 타임라인과 함께 그리드 스크롤이 동작하지 않는 문제 수정
- [lightbox](guides/default-edit-form.md)에서 [Time section](guides/time.md)을 추가할 때 [wide_form](api/config/wide_form.md) 모드로 전환되는 현상 방지
- [number editor](guides/inline-editing.md)가 min 및 max 속성을 준수하여 정의된 범위를 벗어난 값 입력 방지
- [Resource Panel](guides/resource-management.md)에 작업이 표시된 상태에서 [gantt.batchUpdate](api/method/batchupdate.md) 메서드 내에서 작업 삭제 시 오류 수정
- Salesforce 환경에서 [lightbox](guides/default-edit-form.md) 위치가 올바르게 중앙에 표시되도록 수정
- [row_height](api/config/row_height.md) 설정으로 인해 [키보드 내비게이션](guides/keyboard-navigation.md)이 중단되는 문제 수정
- 일부 시나리오에서 프로젝트 [자동 스케줄링](guides/auto-scheduling.md) 날짜가 올바르게 계산되도록 하여 한 번의 호출만으로 정확한 결과 제공
- [Resource Histogram](guides/resource-management.md#resourceviewpanel)이 페이지에 있을 때 [키보드 내비게이션](guides/keyboard-navigation.md) 문제 해결
- [gantt.getGanttInstance](guides/multiple-gantts.md)를 구성 파라미터와 함께 호출하면 터치 지원 기기에서 초기화 오류 수정
- Node.js 버전에서 [gantt.load](api/method/load.md) 메서드 제거
- 커스텀 [getVisibleRange](api/method/addtasklayer.md) 함수 정의 시 Gantt에서 오류가 발생하는 문제 수정
- [키보드 내비게이션](guides/keyboard-navigation.md) 사용 시 작업 업데이트 후 Gantt가 해당 작업으로 스크롤되는 회귀 현상 해결
- 헤더의 정렬 아이콘 클릭 시 [그리드 정렬](api/config/sort.md)이 제대로 동작하도록 수정
- [drag_timeline](api/config/drag_timeline.md) 활성화 시 작업 리페인팅이 일관되지 않게 표시되는 문제 수정

8.0.10
----------

<span class='release_date'>2024년 8월 23일. 버그 수정 릴리스</span>

### 수정 사항

- Gantt가 두 번째 [캘린더](guides/working-time.md)에서 날짜 설정을 [병합](guides/working-time.md#mergingcalendars)하지" 않는 문제 수정
- ["hide empty"](guides/resources.md) 옵션이 활성화된 경우 [리소스](guides/resource-management.md)가 할당되지 않는 문제 수정
- [Resource Section](guides/resources.md)에 값이 수정되기 전까지 [getLightboxSection](api/method/getlightboxsection.md) 메서드가 `null`을 반환하는 문제 수정
- [Resource Histogram](guides/resource-management.md#resourceviewpanel) 템플릿이 최소 날짜 이전에 시작하지만 표시된 날짜 범위 내에 종료되는 작업에 대해 호출되지 않는 문제 수정
- 작업 [type](guides/typeselect.md) 변경 후 [Resource Assignments](guides/resource-management.md)가 저장되지 않는 문제 수정
- lightbox에서 'project' 작업 [type](guides/typeselect.md)이 설정되지 않는 문제 수정
- [병합된](guides/working-time.md#mergingcalendars)" 캘린더의 [worktime 설정](guides/working-time.md)이 주말로 처리되는 문제 수정
- 작업에 [Resource Assignments](guides/resource-management.md)가 서로 다른 날짜에 할당된 경우 [리소스별 그룹화](api/method/groupby.md)가 동작하지 않는 문제 수정
- [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) 이벤트를 사용하여 자식이 없는 [분할 작업 필터링](guides/split-tasks.md#filteringsplittasks) 시 오류 발생 문제 수정
- [프로젝트 및 하위 작업 드래그](api/config/drag_project.md) 후 [Resource Assignments](guides/resource-management.md)가 업데이트되지 않는 문제 수정

8.0.9
----------

<span class='release_date'>2024년 6월 18일. 버그 수정 릴리스</span>

### 수정 사항

- [키보드 단축키](guides/keyboard-navigation.md)로 여러 번 들여쓰기/내어쓰기 후 작업이 사라지는 문제 해결
- Gantt를 수직 스크롤한 후 [인라인 에디터](guides/inline-editing.md)를 다시 열 수 없는 문제 수정
- [gantt.createDataProcessor](api/method/createdataprocessor.md) 메서드에서 지정한 커스텀 헤더를 [DataProcessor](guides/server-side.md#resources_crud)가 무시하는 문제 수정
- [onBeforeLightbox](api/event/onbeforelightbox.md) 핸들러가 새 작업 생성 중 `false`를 반환할 때 발생하는 작업 표시 문제 수정
- [timeline_placeholder](api/config/timeline_placeholder.md) 구성이 활성화된 경우 [marker](guides/markers.md) 높이가 잘못 표시되는 문제 수정
- [Formatter](guides/formatters-ext.md)가 라틴 문자가 아닌 경우 동작하지 않는 문제 수정
- 부모 작업을 [수직 드래그](api/config/order_branch.md)한 후 작업이 사라지는 문제 수정
- [smart_rendering](api/config/smart_rendering.md) 활성화 시 스크롤용 [키보드 단축키](guides/keyboard-navigation.md)가 제대로 동작하지 않는 문제 수정
- [Resource Assignments](guides/resource-management.md) 객체의 커스텀 속성이 파싱 후 포함되지 않는 문제 수정
- TypeScript 타입 정의 업데이트

8.0.8
----------

<span class='release_date'>2024년 5월 31일. 버그 수정 릴리스</span>

### 수정 사항

- [Undo extension](guides/undo-redo.md)이 대량 작업 시 일부 작업을 건너뛰는 문제 수정
- [gantt.silent](api/method/silent.md) 함수 내에서 [gantt.deleteLink](api/method/deletelink.md) 호출 시 스크립트 오류 수정
- 두 연결된 작업에 서로 다른 [캘린더](guides/working-time.md)가 있을 때 [자동 스케줄링](guides/auto-scheduling.md)이 잘못 동작하는 문제 수정
- [순환 링크](api/method/iscircularlink.md) 생성 후 스크립트 오류 발생 문제 수정
- 편집 가능한 [Resource Panel](guides/resource-management.md)이 있는 Gantt를 [destroying](api/method/destructor.md) 후 스크립트 오류 발생 문제 수정
- 일부 브라우저에서 [툴팁](guides/tooltips.md)이 사라지는 문제 수정

8.0.7
----------

<span class='release_date'>2024년 5월 16일. 버그 수정 릴리스</span>


### 수정 사항

- SalesForce의 트라이얼 빌드에서 발생하는 스크립트 오류 수정
- [onAfterTaskUpdate](api/event/onaftertaskupdate.md) 이벤트가 이제 타임라인에서 작업을 드래그한 후 [Auto Scheduling](guides/auto-scheduling.md) 이벤트보다 먼저 발생함
- [Multiselect](guides/multiselection.md) 확장 기능이 활성화된 상태에서 선택된 작업을 조작할 때 중복 이벤트가 발생하던 문제 수정
- 차트의 첫 번째 작업에 날짜가 없을 때 발생하던 스크립트 오류 수정
- [lightbox](guides/default-edit-form.md) 섹션 이름을 클래스 이름으로 section 요소에 추가하여 식별 용이성 개선
- [Auto Scheduling](guides/auto-scheduling.md)이 활성화된 상태에서 [lightbox](guides/default-edit-form.md)에서 작업의 일정을 해제할 수 없던 문제 수정
- Gantt 차트를 스크롤할 때 [resize_rows](api/config/resize_rows.md) 마커 위치 오류 수정
- 연결된 [unscheduled tasks](guides/unscheduled-tasks.md)의 [Auto Scheduling](guides/auto-scheduling.md) 방지
- 스마트 렌더링이 비활성화된 상태에서 [Rollup](guides/milestones.md#rolluptasksandmilestones) 작업을 추가할 때 Gantt가 크래시 나던 문제 수정
- 터치 디바이스에서 [split tasks](guides/split-tasks.md)를 드래그할 때의 문제 수정
- [unscheduled tasks](guides/unscheduled-tasks.md)에 대해 [isCriticalTask](api/method/iscriticaltask.md), [getFreeSlack](api/method/getfreeslack.md), [getTotalSlack](api/method/gettotalslack.md) 메서드 사용 시 발생하던 오류 수정
- 연결된 프로젝트에 [unscheduled](guides/unscheduled-tasks.md) 하위 작업만 있을 때 발생하던 오류 수정

8.0.6
----------

<span class='release_date'>2023년 9월 25일. 버그 수정 릴리즈</span>

### 수정 사항

- 접근성 향상을 위한 [WAI-ARIA attributes](guides/accessibility.md#waiariaattributes) 사용의 개선 및 수정
- [`grid_elastic_columns`](api/config/grid_elastic_columns.md) 설정이 활성화된 상태에서 그리드 폭이 다시 그려진 후 감소하는 문제 수정
- 기본 [`undo_steps`](guides/undo-redo.md#configuringtheundofunctionality) 수가 10에서 100으로 증가
- [Export API client](guides/extensions-list.md#exportservice)가 이제 Gantt의 GPL 버전에 통합됨(이전에는 PRO 버전에만 포함)
- [Node.js version of Gantt](guides/using-gantt-on-server.md)에서 https export [server endpoints](guides/export.md#parametersoftheexportmethods) 지원 추가

8.0.5
----------

<span class='release_date'>2023년 9월 1일. 버그 수정 릴리즈</span>

### 수정 사항

- [gantt.getGanttInstance](guides/multiple-gantts.md) 설정을 통해 확장 기능을 활성화할 때 잘못된 경고가 발생하던 문제 수정
- [skip_off_time](api/config/skip_off_time.md) 설정이 활성화된 상태에서 [gantt.exportToExcel()](api/method/exporttoexcel.md)이 잘못 동작하던 문제 수정
- [Samples Viewer](https://docs.dhtmlx.com/gantt/samples/) 개선

8.0.4
----------

<span class='release_date'>2023년 7월 31일. 버그 수정 릴리즈</span>

### 수정 사항

- [Resource Datastore](guides/resource-management.md#workingwithresourceviewpanel)의 변경 사항을 [DataProcessor](guides/server-side.md#resources_crud)가 추적하지 않던 문제 수정
- [process_resource_assignments](api/config/process_resource_assignments.md) 설정이 비활성화된 상태에서 작업을 드래그한 후 발생하던 오류 수정
- [gantt.calculateEndDate](api/method/calculateenddate.md)에서 분 단위로 날짜를 빼는 경우 잘못 동작하던 문제 수정
- [visibility groups](guides/layout-config.md#visibilitygroups)가 포함된 레이아웃의 성능 소폭 개선

8.0.3
----------

<span class='release_date'>2023년 6월 14일. 버그 수정 릴리즈</span>

### 수정 사항

- [Resource Panel](guides/resource-management.md) 성능 개선
- [negative Lag](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks)이 있는 작업에서 [Free Slack](guides/critical-path.md#gettingfreeandtotalslack) 계산 오류 수정
- 진행률이 100%인 작업의 [Critical Path](guides/critical-path.md) 계산 오류 수정

8.0.2
----------

<span class='release_date'>2023년 5월 31일. 버그 수정 릴리즈</span>

### 수정 사항

- [LinkFormatters](guides/formatters-ext.md#linkformatter)를 사용할 때 발생하는 [Export](guides/export-common.md) 오류 수정
- [Undo extension](guides/undo-redo.md)이 [Resources and Resource Assignments](guides/resource-management.md)와 함께 사용할 때 잘못 동작하던 문제 수정
- 타입 정의 업데이트
- [Rollup](guides/milestones.md#rolluptasksandmilestones) 작업 렌더링 성능 개선
- [Split Tasks](guides/split-tasks.md) 렌더링 성능 개선
- 기타 성능 개선

8.0.1
----------

<span class='release_date'>2023년 3월 30일. 버그 수정 릴리즈</span>

### 수정 사항

- [lightbox](guides/default-edit-form.md)가 열려 있지 않을 때 [gantt.showCover()](api/method/showcover.md) 호출 시 발생하는 오류 수정
- [split tasks](guides/split-tasks.md)에서 시간 축 외부에 표시되는 분할 작업으로 인한 스크립트 오류 발생 회귀 문제 수정
- [gantt.addLinkLayer()](api/method/addlinklayer.md) 메서드의 회귀 문제 수정
- [settings of work time](guides/working-time.md#globalsettings)에 분 단위가 포함된 경우 [auto scheduling](guides/auto-scheduling.md)과 [MSO, FNET, FNLT constraints](guides/auto-scheduling.md#timeconstraintsfortasks)가 잘못 동작하던 문제 수정
- 스크롤 시 [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) 이벤트 작동 오류 수정

<b>8.0</b>
--------------

<span class='release_date'>2023년 3월 20일. 주요 업데이트</span>

[블로그에서 릴리즈 리뷰 보기](https://dhtmlx.com/blog/dhtmlx-gantt-8-0/)

### 주요 변경 사항

최신 버전에 맞추려면 [Migration article](migration.md#71---80)을 확인하세요.

### 신규 기능

- 리소스 관리 업데이트:
    - 리소스 및 리소스 할당 정보를 [데이터와 함께 불러오기](guides/supported-data-formats.md#json) 가능
    - 리소스 및 리소스 할당 변경을 [DataProcessor](guides/server-side.md#resources_crud)로 추적 가능
    - [Resource panel](guides/resource-management.md#workingwithresourceviewpanel) 사용 시 필요한 보일러플레이트 코드 감소
- 작업 그룹화 기능이 그룹 내에서 원래 Gantt 트리 구조를 보존할 수 있음:
    - [groupBy()](api/method/groupby.md) 메서드의 새로운 **save_tree_structure** 파라미터 추가
- [Empty state screen](guides/empty-state-screen.md):
    - 새로운 [show_empty_state](api/config/show_empty_state.md) 속성
    - 새로운 [emptyStateElement extension](guides/empty-state-element-ext.md)
- 타임라인의 배경 그리드를 전체 컨테이너로 확장 가능:
    - 새로운 [timeline_placeholder](api/config/timeline_placeholder.md) 속성
- Rollup 항목 및 split tasks 개선:
    - 개별 [rollup items](guides/milestones.md#stylingseparaterollupitems) 및 [split tasks](guides/split-tasks.md#styling) 스타일 지정 가능
    - [프로젝트 작업에서 모든 rollup 항목 숨기기](guides/milestones.md#hidingtasksandmilestones) 가능
    - rollup 항목의 표시 위치 제어 가능(새로운 [onBeforeRollupTaskDisplay](api/event/onbeforerolluptaskdisplay.md) 이벤트)
    - [split tasks 필터링](guides/split-tasks.md#filteringsplittasks) 가능(새로운 [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) 이벤트)
    - split tasks 표시 성능 최적화
- 백엔드에서 확인을 받은 후에만 항목 삭제 가능:
    - [dataProcessor configuration object](api/method/createdataprocessor.md)의 새로운 **deleteAfterConfirmation** 파라미터
- 자동 스케줄링 및 제약 조건 계산 업데이트:
    - 작업이 상위 프로젝트로부터 제약 유형을 상속 가능:
        - 새로운 [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md) 속성
- Critical Path, Slack, Auto Scheduling 개선:
    - Critical path, Slack, Auto scheduling 알고리즘에서 작업의 진행률 사용 가능:
        - 새로운 [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md) 속성
     - [total slack](guides/critical-path.md#gettingfreeandtotalslack)을 프로젝트 단위로 계산 가능
     - 크리티컬 패스 계산 성능 대폭 개선
- [getTaskBy()](api/method/gettaskby.md) 메서드가 이제 'project' 작업 선택 지원:
    - [getTaskBy()](api/method/gettaskby.md) 메서드의 새로운 **types** 파라미터
- 타임라인 셀에 임의의 HTML 콘텐츠 삽입 가능:
    - 새로운 [timeline_cell_content](api/template/timeline_cell_content.md) 템플릿
- [gantt.plugins](guides/extensions-list.md#exportservice)에 export API가 포함되어 별도의 JS 파일 추가 불필요. [Migration](migration.md#71---80) 문서 참고

### 업데이트

- TypeScript 타입 정의 업데이트

### 수정 사항

- 분 단위 [duration_unit](api/config/duration_unit.md) 및 사용자 지정 [working time](guides/working-time.md#globalsettings) 설정에서 [duration calculation](guides/working-time.md) 문제 수정
- slack 계산 관련 다양한 문제 수정
- [Slack calculations](guides/critical-path.md#gettingfreeandtotalslack) 활성화 시 데이터 로딩에서 발생하는 스크립트 오류 수정
- [setWorkTime](api/method/setworktime.md) 메서드가 이제 customWeeks 내 날짜의 규칙 설정 지원
- 스마트 렌더링 사용 시 Gantt에 데이터 대신 빈 공간이 표시되는 문제 수정
- [custom heights](guides/resizing-rows.md#settingtherowheight)가 있는 행에서 [vertical reordering](guides/reordering-tasks.md) 시 그리드 행이 잘못 이동하던 문제 수정
- [Multiselect](guides/multiselection.md) 확장 기능이 활성화된 상태에서 [Inline editors](guides/inline-editing.md)가 잘못 동작하던 문제 수정
- [gantt.config.quick_info_detached](api/config/quick_info_detached.md) 설정이 `false`일 때 [Quick Info](guides/quick-info.md) 팝업이 잘못 표시되던 문제 수정
- [Inline Editor](guides/inline-editing.md#custominlineeditor) 인터페이스의 `is_valid` 함수 인자 수정. 이제 함수는 컬럼 객체를 받음
- [gantt.groupBy](guides/grouping.md)가 활성화된 상태에서 작업 생성 시 `parent` 속성이 올바르게 저장되지 않던 문제 수정
- [placeholder tasks](api/config/placeholder_task.md) 및 [Keyboard navigation](guides/keyboard-navigation.md) 활성화 시 예기치 않은 수직 스크롤 문제 수정
- [DataProcessor](guides/server-side.md)가 [Auto Scheduling](guides/auto-scheduling.md) 이후 일부 변경 사항을 백엔드에 반영하지 못하던 문제 수정
- [vertical reordering](guides/reordering-tasks.md)에서 작업 행이 Gantt 외부로 드래그될 수 있던 문제 수정
- [Resource panel](guides/resource-management.md#resourceviewpanel)에서 행의 `odd` CSS 클래스가 잘못 지정되던 문제 수정

7.1.13
----------

<span class='release_date'>2022년 11월 4일. 버그 수정 릴리즈</span>

### 수정 사항

- [gantt.addLinkLayer()](api/method/addlinklayer.md) 메소드가 [smart_rendering](api/config/smart_rendering.md) 속성과 함께 동작하지 않던 문제를 수정했습니다.
- 다양한 [time scales](guides/configuring-time-scale.md)에서 [S-Curve Overlay](guides/baselines.md#extraoverlayforthechart)가 제대로 표시되지 않던 문제를 수정했습니다.
- [grid_elastic_columns](api/config/grid_elastic_columns.md) 속성이 활성화된 경우 [그리드 열 크기 조정](guides/specifying-columns.md#resizing)에 문제가 있던 부분을 수정했습니다.
- [Keyboard Navigation](guides/keyboard-navigation.md)을 사용하여 작업을 삭제한 후 Gantt의 수직 스크롤 위치가 초기화되는 문제를 수정했습니다.
- [treeDatastore.move()](api/other/treedatastore.md) 메소드의 동작 오류를 수정했습니다.
- [gantt.parse()](api/method/parse.md) 메소드 사용 시 데이터셋의 [extra collections](guides/supported-data-formats.md#jsonwithcollections)이 [gantt.serverList()](api/method/serverlist.md) 메소드로 접근 가능하도록 수정했습니다.
- [gantt.groupBy()](api/method/groupby.md) 메소드 사용 후 그룹화 시 선택 상태가 초기화되는 문제를 수정했습니다.
- Vue.js v3.x와의 호환성 문제를 해결했습니다.
- 지정된 작업에 'constraint_date'가 없을 때 [gantt.getConstraintLimitations()](api/method/getconstraintlimitations.md) 메소드에서 발생하던 스크립트 오류를 수정했습니다.
- SalesForce Web Security와의 호환성 문제를 해결했습니다.
- [Keyboard Navigation](guides/keyboard-navigation.md#focusbehaviorduringkeyboardnavigation) 활성화 시 Gantt 컨테이너 밖을 클릭해도 포커스가 Gantt로 돌아오는 문제를 수정했습니다.
- [German locale](guides/localization.md#activatingalocale)가 업데이트되었습니다.
- 다중 선택 모드에서 작업을 한 번 클릭하면 인라인 에디터를 열 수 있습니다([inline_editors_multiselect_open](api/config/inline_editors_multiselect_open.md) 속성 추가).

7.1.12
-----------

<span class='release_date'>2022년 6월 16일. 버그 수정 릴리즈</span>

### 수정 사항

- "week" 단위에서 [gantt.isWorkTime()](api/method/isworktime.md) 메소드의 잘못된 동작을 수정했습니다.
- [gantt.silent()](api/method/silent.md) 메소드로 작업과 링크를 추가할 때 렌더링되지 않던 문제를 수정했습니다.
- 일부 경우 데이터 로딩 후 "Task not found" 오류 메시지가 표시되던 문제를 수정했습니다.
- [gantt.changeLightboxType()](api/method/changelightboxtype.md) 메소드 사용 시 이전 lightbox 요소가 DOM에 남아있던 문제를 수정했습니다.
- 썸머타임/윈터타임 변경 이후 작업이 겹칠 때 종료 날짜 계산이 잘못되던 문제를 수정했습니다.
- 셀 에디터로 리소스 값을 편집할 때 [Resource Grid](guides/resource-management.md#resourceviewpanel)가 사라지던 문제를 수정했습니다.
- [Gantt layout](guides/layout-config.md)에 ["resourceGrid"/"resourceTimeline"](guides/resource-management.md#resourceviewpanel) 뷰만 포함되고 "grid"/"timeline" 뷰가 없을 때 발생하던 스크립트 오류를 수정했습니다.
- [Resource Panel](guides/resource-management.md#resourceviewpanel)이 포함된 Gantt layout에서 [autosize](api/config/autosize.md) 설정이 잘못 동작하던 문제를 수정했습니다.
- [split tasks](guides/split-tasks.md)에 대한 [lightbox](guides/default-edit-form.md)를 수정하여, 이제 분할 작업을 더블 클릭하면 lightbox가 정상적으로 표시됩니다.

7.1.11
-----------

<span class='release_date'>2022년 4월 27일. 버그 수정 릴리즈</span>

### 수정 사항

- 압축된 Gantt 파일의 sourcemap 문제를 수정했습니다.
- [autosize = 'y'](api/config/autosize.md) 적용 시 [markers](guides/markers.md)의 위치가 잘못 표시되던 문제를 수정했습니다.
- Gantt 컨테이너에 여분의 margin이나 vertical offset이 있을 경우 [tooltip](guides/tooltips.md) 및 기타 요소의 위치가 잘못 표시되던 문제를 수정했습니다.
- [editable resource diagram](guides/resource-management.md)의 첫 번째 셀을 편집한 후 행 순서가 변경되는 문제를 수정했습니다.
- 작업을 확장하거나 축소한 후 [smart rendering](api/config/smart_rendering.md)이 잘못 동작하던 문제를 수정했습니다.
- [onBeforeDrag](guides/advanced-dnd.md) 이벤트가 [click_drag](guides/extensions-list.md#advanceddragndrop) 및 [drag_timeline](guides/extensions-list.md#dragtimeline) 확장 사용 시 기본 동작을 차단하지 못하던 문제를 수정했습니다.
- [resource assignments store](guides/resource-management.md#assigningresources)에 대해 [changeId()](api/other/datastore.md) 메소드 호출 시 발생하던 스크립트 오류를 수정했습니다.
- 기본 [Gantt layout](guides/layout-config.md#defaultlayout)의 스크롤바가 이제 **scrollVer**/**scrollHor** 이름 없이도 올바르게 작동합니다.
- [split tasks](guides/split-tasks.md)가 [selection](api/config/select_task.md) 시 일반 작업과 동일하게 'gantt_selected' 클래스를 받도록 변경되었습니다.

7.1.10
-----------

<span class='release_date'>2022년 3월 16일. 버그 수정 릴리즈</span>

### 수정 사항

- [project task](guides/task-types.md#projecttasks)에 자식이 없고 `start_date` 파라미터만 지정된 경우 Gantt가 렌더링되지 않던 문제를 수정했습니다.
- 작업 ID가 숫자가 아니거나 16자 이상의 숫자 문자열일 때 [작업 행을 드래그 앤 드롭으로 크기 조정](guides/resizing-rows.md#resizingrowsbydraganddrop)할 수 없던 문제를 수정했습니다.
- [visibility groups](guides/layout-config.md#visibilitygroups)가 [complex layout](guides/layout-config.md)에서 그리드와 타임스케일의 크기 동기화를 막던 문제를 수정했습니다.
- 여러 작업을 동시에 수평 이동할 때 작업 날짜에 문제가 발생하던 부분을 수정했습니다.
- [auto-update mode](https://docs.dhtmlx.com/api__dataprocessor_setupdatemode.html)가 비활성화된 경우 [dataProcessor](guides/server-side.md)가 여러 데이터스토어에서 모든 업데이트를 전송하지 않던 문제를 수정했습니다.
- [milestone](guides/milestones.md)이 [FF link](api/config/links.md)와 함께 사용될 때 다음 날로 이동하던 문제를 수정했습니다.
- [backward scheduling](guides/auto-scheduling.md#forwardbackwardplanning) 사용 시 [project_end](api/config/project_end.md)가 비작업 시간으로 설정되면 milestone의 `end_date` 계산이 잘못되던 문제를 수정했습니다.
- Gantt 위에 HTML 요소가 표시된 경우 작업 재정렬이 잘못 동작하던 문제를 수정했습니다.
- 캘린더에서 날짜/요일 설정을 제거한 후 [unsetWorkTime()](api/method/unsetworktime.md) 메소드가 변경 사항을 즉시 적용하지 않던 문제를 수정했습니다.
- [multiselect](guides/extensions-list.md#multitaskselection) 확장이 활성화된 경우 [clearAll()](api/method/clearall.md) 메소드가 선택된 작업을 해제하지 않던 문제를 수정했습니다.
- [exportToExcel()](api/method/exporttoexcel.md) 메소드에 `visual: true` 파라미터와 [duration_unit](api/config/duration_unit.md)을 'hour'로 설정할 때 오류가 발생하던 문제를 수정했습니다.

7.1.9
-----------

<span class='release_date'>2022년 1월 10일. 버그 수정 릴리즈</span>

### 수정 사항

- "year" 스케일에서 프로젝트를 드래그한 후 하위 작업의 정렬이 맞지 않던 문제와 [스케일을 동적으로 전환](guides/dynamic-scale.md)할 때 발생하던 문제를 수정했습니다.
- ["month"](api/config/scales.md) 스케일에서 [하위 작업이 있는 프로젝트를 드래그](api/config/drag_project.md)한 후 프로젝트 기간이 변경되는 문제를 수정했습니다.
- [Auto Scheduling](guides/auto-scheduling.md)에서 작업 기간을 변경할 때 [constraint type](guides/auto-scheduling.md#timeconstraintsfortasks)이 "ASAP"에서 "SNET"으로 변경되던 문제를 수정했습니다.
- [schedule_from_end](api/config/schedule_from_end.md)가 활성화된 상태에서 인라인 에디터로 시작/종료일을 변경한 후 [backward scheduling](guides/auto-scheduling.md#forwardbackwardplanning)이 잘못 동작하던 문제를 수정했습니다.
- [읽기 전용 모드에서 읽기 전용 작업에 대해 lightbox를 열 수 있습니다](guides/readonly-mode.md#readonlymodeforspecifictaskslinks).
- 이제 lightbox로 읽기 전용 작업을 편집할 수 없습니다.
- [읽기 전용 모드에서 편집 가능한 작업에 대해 lightbox가 열리지 않던 문제](guides/readonly-mode.md#readonlymodefortheentiregantt)(v6.3.1에서 발생)를 수정했습니다.
- [show_chart](api/config/show_chart.md)로 타임라인을 숨긴 후 그리드 열 크기 조정에 문제가 있던 부분을 수정했습니다.
- [Auto Scheduling](guides/auto-scheduling.md)에서 [project_start](api/config/project_start.md)와 [project_end](api/config/project_end.md) 값을 변경한 후 취소할 수 없던 문제를 수정했습니다.
- 자동 스케줄링이 비활성화된 작업에 제약 조건이 할당되는 문제를 수정했습니다.
- 작업 날짜 범위가 10년을 넘고 [연도 선택기 범위가 지정되지 않은 경우](guides/duration.md) lightbox가 연도 범위를 정의하지 못하던 문제를 수정했습니다.
- 3개 이상의 수직 뷰에 수평 스크롤바가 연결된 경우 Gantt 로딩 후 스크립트 오류가 발생하던 문제를 수정했습니다.
- [onBeforeTaskAutoSchedule](api/event/onbeforeautoschedule.md) 이벤트가 [strict mode](api/config/auto_scheduling_strict.md)에서 [ASAP constraint](guides/auto-scheduling.md#timeconstraintsfortasks)를 링크 없는 작업에 설정할 때 잘못 동작하던 문제를 수정했습니다.
- Next.js 프로젝트에서 Gantt의 압축 버전을 실행할 때 오류가 발생하던 문제를 수정했습니다.
- [gantt instance](guides/multiple-gantts.md#ganttinstanceconfiguration)를 빈 컨테이너에 초기화할 때 Gantt의 너비가 변경되는 문제를 수정했습니다.

7.1.8
-----------

<span class='release_date'>2021년 11월 30일. 버그 수정 릴리즈</span>

### 수정 사항

- [Resource Histogram](guides/resource-management.md#resourceviewpanel) 및 [fit_tasks](api/config/fit_tasks.md) 설정이 활성화된 상태에서 [gantt.groupBy](guides/grouping.md) 메소드에서 발생하던 스크립트 오류를 수정했습니다.
- [Undo extension](guides/undo-redo.md)이 [vertical reordering](guides/reordering-tasks.md) 취소 시 [서버로](guides/server-side.md) 업데이트를 전송하지 않던 문제를 수정했습니다.
- [Export to MS Project](guides/export-msproject.md) 모듈에서 커스텀 속성 전송 시 간헐적으로 `Unknown error`가 반환되던 문제를 수정했습니다.
- [gantt.silent](api/method/silent.md) 메소드가 [gantt.changeTaskId](api/method/changetaskid.md)에서 API 이벤트 및 리페인트를 차단하지 않던 문제를 수정했습니다.
- [gantt.undo](api/config/undo.md) 메소드가 되돌린 항목의 원래 세로 위치를 복원하지 않던 문제를 수정했습니다.
- [resource assignment form](guides/resources.md)에서 [resource assignment](guides/resource-management.md#assigningresources)의 id를 사용자가 지정한 값 대신 자동 생성 값으로 대체하던 문제를 수정했습니다.
- 중첩 항목이 있는 작업에 [gantt.changeTaskId](api/method/changetaskid.md)를 사용할 때 중첩 레벨이 잘못 계산되던 문제를 수정했습니다.

7.1.7
-----------

<span class='release_date'>2021년 10월 5일. 버그 수정 릴리즈</span>

### 수정 사항

- [total slack](api/method/gettotalslack.md) 값이 잘못 계산되는 문제 수정
- [total slack](guides/critical-path.md#gettingfreeandtotalslack) 계산 성능 개선
- [Material](guides/skins.md#materialskin) 스킨에서 [lightbox](guides/edit-form.md) 스타일 수정
- [Zoom plugin](guides/zooming.md#builtinzoomingmodule)에서 [gantt.init](api/method/init.md) 이후 [zoom.init](guides/zoom.md) 메서드를 호출할 때 작동하지 않는 문제 수정
- [inherit_calendar](guides/working-time.md#assigningcalendartoproject) 설정과 [gantt.groupBy](guides/grouping.md) 메서드를 함께 사용할 때 발생하는 스크립트 오류 수정
- [placeholder task](api/config/placeholder_task.md)가 활성화된 상태에서 [gantt.batchUpdate](api/method/batchupdate.md)로 작업을 추가할 때 발생하는 스크립트 오류 수정
- [placeholder task](api/config/placeholder_task.md)가 정렬, 순서 변경, 하위 작업 추가가 가능했던 문제 수정
- [grid columns](guides/specifying-columns.md) 크기가 잘못 표시되는 문제 수정
- [column's resizers](guides/specifying-columns.md#resizing) 동작이 [reordering of the columns](api/config/reorder_grid_columns.md)와 충돌하던 문제 수정

7.1.6
---------------

<span class='release_date'>2021년 8월 23일. 버그 수정 릴리즈</span>

### 수정 사항

- [schedule_from_end](api/config/schedule_from_end.md)가 활성화된 상태에서 [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md) 설정이 올바르게 동작하지 않던 문제 수정
- 컬럼의 [onrender](api/config/columns.md) 콜백이 그리드 스크롤 시 커스텀 요소가 사라지는 문제 수정
- v7.1.5에서 발생한 회귀(regression)로, 복잡한 레이아웃에서 그리드 셀 크기 조정 후 행이 사라지는 문제 수정
- [size/visibility groups](guides/layout-config.md#visibilitygroups)가 복잡한 레이아웃에서 컬럼 크기 동기화를 막던 문제 수정
- gantt가 작은 컨테이너에 렌더링될 때 그리드 표시 개선

7.1.5
---------------

<span class='release_date'>2021년 7월 22일. 버그 수정 릴리즈</span>

### 수정 사항

- ["marker" mode](guides/reordering-tasks.md#improvingperformancewithlargedatasets)에서 gantt 행 높이가 다를 때 작업의 수직 순서 변경이 잘못 동작하던 문제 수정
- [show_grid](api/config/show_grid.md)와 [show_chart](api/config/show_chart.md) 설정이 비활성화된 일부 레이아웃에서 타임라인과 그리드 크기 문제 수정
- 그리드 헤더 셀에 `data-column-name` 및 `data-column-index` 속성 추가
- [gantt_init.md](api/method/init.md)로 재초기화 후 [구성에서](guides/specifying-columns.md#overview) 모든 컬럼을 제거했을 때 그리드가 올바르게 표시되지 않는 문제 수정
- Vue.js 애플리케이션에서 리소스 패널 설정이 [gantt의 메인 설정](guides/common-configuration.md#ganttconfigobject)을 덮어쓰는 문제 수정
- [resource layout](guides/layout-config.md#configsandtemplatesofviews)에 제공된 설정 객체를 수정하여 [resource panel](guides/resource-management.md#resourceviewpanel) 구성을 동적으로 변경할 수 있는 기능 추가

7.1.4
---------

<span class='release_date'>2021년 6월 30일. 버그 수정 릴리즈</span>

### 수정 사항

- [unsetWorkTime](api/method/unsetworktime.md)이 잘못 동작하여 해당 날짜의 근무 시간이 잘못 지정되는 문제 수정
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)가 false이고 [smart_rendering](api/config/smart_rendering.md)이 활성화된 상태에서 [Resource histogram](guides/resource-management.md#resourceviewpanel) 스크롤 시 발생하는 스크립트 오류 수정
- [Inline Editors](guides/inline-editors-ext.md) 모듈의 `editNextRow` 및 `editPrevRow` 메서드가 잘못 동작하는 문제 수정
- [Quick Info](guides/extensions-list.md#quickinfo) 팝업이 그리드의 "추가" 버튼 클릭 후 계속 표시되는 문제 수정
- [ASAP constraints](guides/auto-scheduling.md#timeconstraintsfortasks)가 프로젝트의 가장 빠른 날짜로 작업을 이동하지 않던 문제 수정
- [Inline Editors](guides/inline-editors-ext.md)에서 [constraints](guides/auto-scheduling.md#timeconstraintsfortasks)를 인라인 에디터로 수정할 수 없던 문제 수정
- [Keyboard Navigation](guides/keyboard-navigation.md)의 "scroll into view" 동작이 선택된 작업 바가 이미 보이는 경우에도 불필요하게 스크롤을 발생시키던 문제 수정
- [click_drag](guides/extensions-list.md#advanceddragndrop) 확장 사용 시 마우스가 컨테이너 밖으로 이동할 때 스크립트 오류 발생 문제 수정
- Gantt의 [auto_types](api/config/auto_types.md) 설정 성능 개선

7.1.3
------

<span class='release_date'>2021년 5월 25일. 버그 수정 릴리즈</span>

### 수정 사항

- 일부 작업이 [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 이벤트로 숨겨진 경우 [gantt.moveTask](api/method/movetask.md) 호출 시 발생하는 스크립트 오류 수정
- 최신 Firefox 브라우저에서 스크롤 속도 문제 수정
- [작업 시간 계산](guides/working-time.md) 성능 개선

7.1.2
------

<span class='release_date'>2021년 4월 26일. 버그 수정 릴리즈</span>

### 수정 사항

- [resource panel](guides/resource-management.md#resourceviewpanel) 성능 대폭 개선
- [gantt.load](api/method/load.md) 진행 중에 [gantt.destructor](api/method/destructor.md)를 호출할 때 발생하는 스크립트 오류 수정
- 작업 id 변경 시 [split tasks](guides/split-tasks.md)가 잘못 동작하는 문제 수정
- Angular에서 마우스 휠 스크롤이 잘못 동작하는 문제 수정

7.1.1
------

<span class='release_date'>2021년 4월 19일. 버그 수정 릴리즈</span>

### 수정 사항

- [click_drag](guides/extensions-list.md#advanceddragndrop) 플러그인의 회귀(regression) 문제 수정
- [gantt.config.csp](api/config/csp.md) 설정을 "auto" 모드로 지정 시 Security Violation 오류 발생 문제 수정
- v7.1.0 패키지 코드에 ES6 문법이 포함되어 있던 빌드 설정 오류 수정, 라이브러리는 다시 ES5 호환
- [gantt.config.reorder_grid_columns](api/config/reorder_grid_columns.md) 설정이 활성화된 상태에서 그리드 컬럼 크기 조정 시 발생하는 스크립트 오류 수정
- TypeScript 타입 정의 업데이트
- [datastore](api/other/datastore.md)에 [onDestroy](api/other/datastore.md#ondestroy) 이벤트 추가
- [task calendars](guides/working-time.md#assigningcalendartotask)가 많은 Gantt의 성능 개선
- [batchUpdate](api/method/batchupdate.md) 및 [autoScheduling](guides/auto-scheduling.md) 중 [resource assignment](guides/resource-management.md#managingresourceassignments) 계산 성능 개선

7.1
----------

<span class='release_date'>2021년 4월 8일. 마이너 업데이트</span>

[블로그의 릴리즈 리뷰](https://dhtmlx.com/blog/dhtmlx-gantt-7-1-part-time-resource-assignment-rollup-tasks/)
### 주요 변경 사항

이번 업데이트로 일부 컴포넌트에 변경 사항이 적용되었습니다. 기존 코드를 수정해야 할 변경 사항은 없으나, [Migration](migration.md#70---71) 문서를 확인하시기 바랍니다.

### 새로운 기능

- [작업의 특정 날짜에 리소스 할당 기능](guides/resource-management.md#resourceassignmenttime)
- 새로운 [gantt.getTaskAssignments()](api/method/gettaskassignments.md) 메서드
- 새로운 [gantt.config.process_resource_assignments](api/config/process_resource_assignments.md) 및 [gantt.updateTaskAssignments()](api/method/updatetaskassignments.md) Gantt API를 통한 [리소스 할당 관리](guides/resource-management.md#managingresourceassignments) 기능
- [Rollup tasks 및 milestones](guides/milestones.md#rolluptasksandmilestones)
- [타임라인 영역에서 작업 바 및 마일스톤 숨기기 기능](guides/milestones.md#hidingtasksandmilestones)
- [기간별로 다른 근무 시간 설정 기능](guides/working-time.md#rules_for_periods)
- [그리드의 개별 행 높이 설정 기능](guides/resizing-rows.md#settingtherowheight)
- [드래그 앤 드롭으로 그리드 행 높이 조절 기능](guides/resizing-rows.md#resizingrowsbydraganddrop)
- [gantt.getTaskBarHeight()](api/method/gettaskbarheight.md) 메서드로 작업의 DOM 요소 높이 가져오기 기능
- 신규 이벤트: [onBeforeRowResize](api/event/onbeforerowresize.md), [onRowResize](api/event/onrowresize.md), [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md), [onAfterRowResize](api/event/onafterrowresize.md)
- 그리드 셀을 DOM에 렌더링할 때 사용하는 [onrender](guides/specifying-columns.md#modifyingcellsafterrendering) 콜백 추가
- 작업 레이어의 커스텀 요소를 DOM에 렌더링할 때 사용하는 [onrender](api/method/addtasklayer.md) 콜백 추가

### 수정 사항

- 리소스에 값이 할당된 경우 리소스 뷰에서 작업을 수직으로 재정렬할 때 발생하는 문제 수정
- 작업이 타임라인 셀의 시작점에 시작하지 않으면 "resource_cell_value"가 호출되지 않고 리소스 마커가 렌더링되지 않는 문제 수정
- 데이터 저장소에 이미 존재하는 id로 작업을 삭제할 때 Gantt가 멈추는 문제 수정
- "root_id" 파라미터가 설정되어 있어도 작업 id로 0 값을 지정할 때 발생하는 스크립트 오류 수정
- Salesforce 환경에서 리사이저 리스너가 동작하지 않는 문제 수정
- [Fullscreen Extension](guides/fullscreen-ext.md)을 여러 번 적용하거나 해당 메서드를 여러 번 호출할 때 스크립트 오류 발생 문제 수정
- [Keyboard Navigation Extension](guides/keynav-ext.md)을 여러 번 추가하면 그리드 내 탐색이 중단되는 문제 수정
- [Inline Editors](guides/inline-editing.md)에서 [hide:true](guides/specifying-columns.md#visibility) 속성으로 숨긴 컬럼 뒤에 있는 셀에서 에디터를 열 수 없던 문제 수정

7.0.13
------

<span class='release_date'>2021년 2월 15일. 버그 수정 릴리즈</span>

### 수정 사항

- [layout configuration](guides/layout-config.md#layoutcustomization)을 동적으로 변경하고 [gantt.addTaskLayer](api/method/addtasklayer.md)를 사용할 때 발생하는 스크립트 오류 수정
- `fetchTasks` 옵션 사용 시 [resource histogram](guides/resource-management.md#resourceviewpanel)의 초기 내부 높이 문제 수정
- [predecessor editor](guides/inline-editing.md#typesofeditors)가 값 수정 시 기존 링크를 삭제하는 문제 수정
- [gantt.addTask](api/method/addtask.md) 및 [gantt.parse](api/method/parse.md) 메서드로 [중복된 ID의 작업](guides/task-object-operations.md)을 추가할 때 gantt가 잘못 동작하는 문제 수정
- [auto_types](api/config/auto_types.md) 및 [drag_project](api/config/drag_project.md) 설정이 활성화된 상태에서 드래그 앤 드롭 성능 개선
- [duration_unit](api/config/duration_unit.md)이 "day"로 지정된 경우 [작업 시간 계산](guides/working-time.md) 성능 개선

7.0.12
------

<span class='release_date'>2021년 1월 14일. 버그 수정 릴리즈</span>

### 수정 사항

- 대형 프로젝트에서 [수직 드래그 앤 드롭](guides/reordering-tasks.md#draganddropacrosstheentireganttstructure) 관련 일부 사소한 문제 수정
- [autosize](api/config/autosize.md) 설정 사용 시 컨테이너 크기가 잘못 표시되는 문제 수정
- [키보드 내비게이션](guides/keyboard-navigation.md)이 이제 그리드의 수평 스크롤과 올바르게 작동하도록 수정
- Layout의 [HTML 뷰](guides/layout-config.md#htmlasinnerview)가 외부 [스크롤바](guides/layout-config.md#scrollbar)를 지원하도록 개선
- [추가 그리드](https://docs.dhtmlx.com/gantt/samples/10_layout/01_rightside_columns.html)가 레이아웃에 추가된 경우, [작업 재정렬](guides/reordering-tasks.md#draganddropacrosstheentireganttstructure) 후 그리드 상태가 잘못 표시되는 문제 수정
- 리소스가 선택된 상태에서 [리소스 패널](guides/resource-management.md)을 초기화 및 재로딩할 때 발생하던 스크립트 오류 수정
- lightbox의 [time](guides/time.md) 섹션에서 시작 날짜가 종료 날짜보다 클 때 자동으로 종료 날짜를 보정하는 기능을 비활성화할 수 있는 옵션 추가
- [Duration Formatter](guides/formatters-ext.md) 기본 설정의 오타 수정
- [popup message](guides/message-boxes.md#basicpopupmessage)가 표시 중일 때 gantt가 [destroyed](api/method/destructor.md) 되면 발생하던 스크립트 오류 수정
- [RTL](guides/rtl-mode.md) 모드에서 Grid 및 Timeline의 수평 스크롤 초기 위치 문제 수정
- lightbox에서 [typeselect](guides/typeselect.md) 컨트롤이 설정에 추가되지 않은 경우, 작업 유형 선택이 저장되지 않는 문제 수정
- [gantt.resetLayout()](api/method/resetlayout.md) 메서드 호출 후 [markers](guides/markers.md)가 사라지는 문제 수정
- 대형 프로젝트에서 [drag_project](api/config/drag_project.md) 설정 사용 시 성능 문제 개선
- [read-only](guides/readonly-mode.md) 모드에서 커스텀 버튼이 추가된 경우 [QuickInfo](api/method/showquickinfo.md) 팝업이 표시되지 않는 문제 수정

7.0.11
------

<span class='release_date'>2020년 11월 11일. 버그 수정 릴리즈</span>

### 업데이트

- 컨테이너 크기 조정 시 Gantt를 다시 그리기 전 대기 시간을 변경할 수 있도록 [container_resize_timeout](api/config/container_resize_timeout.md) 설정 추가
- 마우스 휠로 gantt를 스크롤할 때 속도를 조절할 수 있는 [wheel_scroll_sensitivity](api/config/wheel_scroll_sensitivity.md) 설정 추가

### 수정 사항

- [Auto Scheduling](guides/auto-scheduling.md) 사용 시 서로 다른 작업 캘린더를 사용할 때 발생하는 버그 수정
- [placeholder](api/config/placeholder_task.md) 작업과 [Auto Scheduling](guides/auto-scheduling.md) 간의 충돌 문제 수정
- [sort](api/config/sort.md) 활성화 시 불필요한 리페인트 문제 수정
- [Inline Editors](guides/inline-editing.md)와 스크롤 가능한 그리드에서 클릭 직후 인라인 에디터 포커스가 해제되는 문제 수정
- 사용자가 [Quick Info](guides/extensions-list.md#quickinfo) 팝업을 클릭할 때 Gantt가 해당 팝업을 닫아버리는 문제 수정

7.0.10
------

<span class='release_date'>2020년 9월 22일. 버그 수정 릴리즈</span>

### 수정 사항

- [수직 리사이저](guides/layout-config.md#defaultlayout) 동작 오류 수정 (v7.0.9에서 발생한 회귀)
- Android Chrome에서 작업의 수직 재정렬 중 예기치 않은 페이지 새로고침(풀-투-리프레시) 방지
- 모바일 Firefox에서 링크 생성 중 발생하던 스크립트 오류 수정
- [multiselect](api/config/multiselect.md) 설정은 활성화되어 있으나 [multiselect](guides/extensions-list.md#multitaskselection) 플러그인이 활성화되지 않은 경우 작업 선택이 올바르게 동작하지 않는 문제 수정
- [Inline Editors](guides/inline-editing.md) 내부의 HTML select 컨트롤 동작 개선
- 링크된 작업이 서로 다른 [작업 캘린더](guides/working-time.md)를 사용할 때 [Auto Scheduling](guides/auto-scheduling.md)이 올바르게 동작하지 않는 문제 수정
- [gantt.plugins](api/method/plugins.md) 메서드는 이제 `false` 값으로 지정된 플러그인을 활성화하지 않음
- [Inline Editors](guides/inline-editing.md)와 [Keyboard Navigation](guides/keyboard-navigation.md) 간의 충돌 문제 수정
- [Inline Editors](guides/inline-editing.md)에서 더블 클릭 시 에디터가 닫혀버리는 문제 수정

7.0.9
-------

<span class='release_date'>2020년 8월 27일. 버그 수정 릴리즈</span>

### 수정 사항

- [custom datastores](api/method/createdatastore.md)가 추가된 상태에서 Gantt를 두 번째로 [초기화](api/method/init.md)할 때 발생하는 스크립트 오류 수정
- [auto-scheduling](guides/auto-scheduling.md) 사용 시 [FF 및 SS 링크](api/config/links.md), 그리고 소스 및 대상 작업이 [다른 작업 캘린더](guides/working-time.md#multipleworktimecalendars)를 사용할 때 동작 오류 수정
- [duration_unit](api/config/duration_unit.md)가 "minute"으로 설정되고 시작 시간이 비작업일의 중간일 때 [작업 시간 계산](guides/working-time.md) 오류 수정
- iPadOS v13.6의 Safari iPad 터치 지원 문제 수정
- 모바일 장치에서 [Lightbox](guides/default-edit-form.md) 모달 오버레이 크기 문제 수정
- 일부 브라우저에서 [lightbox 버튼](guides/custom-button.md) 표시 오류 수정
- [gantt.i18n](api/other/i18n.md) 모듈의 이탈리아어 및 포르투갈어 로케일 지원 개선
- [Lightbox](guides/default-edit-form.md)의 [Parent control](guides/parent.md)에서 작업이 root 레벨에 할당될 때 동작 오류 수정
- iframe 내에서 gantt를 초기화할 때 발생하는 스크립트 오류 수정
- [undo](api/config/undo.md) 설정이 비활성화된 경우 [redo](api/config/redo.md) 설정이 올바르게 동작하지 않는 문제 수정

7.0.8
-------

<span class='release_date'>2020년 7월 24일. 버그 수정 릴리즈</span>

### 수정 사항

- Android/iOS 기기에서 터치 지원 관련 문제 수정
- v7.0.6에서 발생한 [링크 생성 및 gantt.isLinkAllowed](api/method/islinkallowed.md) 메서드 관련 회귀 문제 수정
- [gantt.getGanttInstance](guides/multiple-gantts.md)에서 'locale' 파라미터 사용 시 발생하는 스크립트 오류 수정
- [gantt.destructor](api/method/destructor.md)에서 [Keyboard Navigation](guides/extensions-list.md#keyboardnavigation) 및 [Quick Info](guides/extensions-list.md#quickinfo) 확장 기능 사용 시 발생하는 스크립트 오류 수정

7.0.7
--------

<span class='release_date'>2020년 7월 17일. 버그 수정 릴리즈</span>

- [gantt.Promise](api/method/promise.md) 타입 정의의 문법 오류 수정

7.0.6
--------

<span class='release_date'>2020년 7월 16일. 버그 수정 릴리즈</span>

### 수정 사항

- [drag and drop](guides/dnd.md) 중 터치 기기에서 발생하는 스크립트 오류 수정
- [Auto Scheduling](guides/auto-scheduling.md) 확장 기능에서 [링크 유형](api/config/links.md)이 숫자 값으로 정의된 경우 동작 오류 수정
- [resource histogram](guides/resource-management.md#resourceviewpanel) 불필요한 리페인트 횟수 감소
- 작업 [grouping](guides/grouping.md) 확장 기능의 성능 개선
- 터치 기기에서 리소스 타임라인 스크롤 가능하도록 수정
- 'hide empty' 버튼 사용 시 [resource control](guides/resource-management.md) 동작 오류 수정
- [gantt.Promise](api/method/promise.md) 타입 정의의 반환 타입 수정

7.0.5
--------

<span class='release_date'>2020년 6월 19일. 버그 수정 릴리즈</span>

### 업데이트

- [duration_unit](api/config/duration_unit.md)가 "hour"로 설정된 경우 [작업 시간 계산](guides/working-time.md) 성능 개선
- [duration_unit](api/config/duration_unit.md)가 "minute"으로 설정된 경우 [작업 시간 계산](guides/working-time.md) 성능 개선
- [`Gantt.getGanttInstance`](guides/multiple-gantts.md#ganttinstanceconfiguration) 설정 객체에서 작업 캘린더 지정 기능 추가

7.0.4
------

<span class='release_date'>2020년 6월 4일. 버그 수정 릴리즈</span>

### 수정 사항

- autosize 모드에서 gantt 크기 10000px 제한 해제, 더 큰 차트 [인쇄](api/method/exporttopdf.md) 가능
- [drag and drop](guides/dnd.md) 시 사용자가 마우스 버튼을 문서의 어느 부분에서든 놓으면 동작이 종료되도록 수정 (기존에는 gantt 컨테이너에서만 동작)
- [포르투갈어 로케일](guides/localization.md) 업데이트
- [gantt.columnIndexByDate](api/method/columnindexbydate.md) 타입 정의의 반환 타입 수정
- [drag and drop](guides/dnd.md) 중 Gantt 인스턴스가 [destroyed](api/method/destructor.md) 될 때 발생하는 스크립트 오류 수정
- [duration_unit](api/config/duration_unit.md)가 "minute"이고 [마지막 작업 시간 구간](api/method/setworktime.md)이 23:00 이후에 끝날 때 [end_date](api/method/calculateenddate.md)/[duration](api/method/calculateduration.md) 계산 오류 수정
- [grouping extension](guides/grouping.md) 그룹이 작업 수정 시마다 확장되는 문제 수정
- [dataProcessor.setTransactionMode](guides/server-side.md#technique)의 두 번째 파라미터가 첫 번째 파라미터에 객체가 전달된 경우 무시되는 문제 수정
- [inline editor](guides/inline-editing.md) 활성 상태에서 [Gantt 리페인트](api/method/render.md) 시 에디터가 사라지는 문제 수정
- [static_background](api/config/static_background.md) 확장 기능에서 빈 셀 클릭이 작업 요소 클릭으로 처리되는 문제 수정
- [split tasks](guides/split-tasks.md) 간 링크를 드래그 앤 드롭 중 동적으로 다시 그리도록 개선
- [node.js 패키지](guides/using-gantt-on-server.md)에서 [gantt.addTask](api/method/addtask.md) 호출 시 발생하는 스크립트 오류 수정
- [node.js 패키지](guides/using-gantt-on-server.md)에서 [gantt.destructor](api/method/destructor.md) 호출 시 발생하는 스크립트 오류 수정

7.0.3
------

<span class='release_date'>2020년 5월 14일. 버그 수정 릴리즈</span>

### 수정 사항

- 특정 날짜에 작업 시간을 설정할 때 [setWorkTime 메서드](api/method/setworktime.md) 회귀로 인한 스크립트 오류 수정
- Gantt가 [SalesForce Lightning Web Component](https://github.com/DHTMLX/salesforce-gantt-demo) 내에서 사용될 때 [Keyboard Navigation](guides/keyboard-navigation.md) 확장 기능 동작 오류 수정

7.0.2
------

<span class='release_date'>2020년 4월 30일. 버그 수정 릴리즈</span>

### 수정 사항

- [gantt.config.csp](api/config/csp.md)가 true로 설정된 경우 [date formatters](api/other/date.md) 동작 오류 수정
- [click_drag](guides/extensions-list.md#advanceddragndrop) 및 [drag_timeline](guides/extensions-list.md#dragtimeline) 확장 기능에서 [여러 Gantt 인스턴스](guides/multiple-gantts.md) 생성 시 동작 오류 수정
- [dataProcessor router function](guides/server-side.md#customrouting)에서 오류 상태 반환 후 작업 행 요소의 css 클래스가 잘못 표시되는 문제 수정
- Shadow DOM 내 [inline editors](guides/inline-editing.md) 동작 오류 수정

7.0.1
-----

<span class='release_date'>2020년 4월 16일. 버그 수정 릴리즈</span>


###수정 사항

- [작업 기간의 근무 분 단위 계산](guides/working-time.md)에서 주요 성능 향상
- [Tooltip](guides/tooltips.md) 및 [Undo](guides/undo-redo.md) 확장 기능에서 여러 개의 Gantt 인스턴스를 생성할 때 잘못 동작하던 회귀 문제 수정
- [그리드 열 재정렬](api/config/reorder_grid_columns.md) 시 드래그 앤 드롭 중 마우스 포인터가 그리드 가장자리에 이동할 때 타임라인이 스크롤되는 문제 수정
- [열을 오른쪽 그리드 경계로 드래그 앤 드롭 한 후 잘못된 위치에 나타나는 문제](api/config/reorder_grid_columns.md) 수정
- [dataProcessor custom router](guides/server-side.md#customrouting)가 이제 거부된 Promise와도 올바르게 작동함
- [스마트 렌더링](guides/performance.md#smartrendering)에서 일부 링크가 보이지 않던 회귀 문제 수정
- [분할 작업](guides/split-tasks.md)이 이제 1단계 하위 작업뿐만 아니라 모든 중첩 하위 작업도 표시함
- [분할 작업](guides/split-tasks.md) 및 스마트 렌더링에서 분할 작업이 'task' 타입일 때 발생하던 문제 수정
- [분할 작업](guides/split-tasks.md) 내에 중첩된 'project' 작업의 기간을 Gantt가 계산하지 않던 문제 수정
- [RTL 모드](guides/rtl-mode.md)에서 [인라인 에디터](guides/inline-editing.md)를 열었을 때 플레이스홀더의 잘못된 위치 문제 수정

<b>7.0</b>
--------------

<span class='release_date'>2020년 4월 7일. 주요 업데이트</span>

[블로그에서 릴리즈 리뷰 보기](https://dhtmlx.com/blog/dhtmlx-gantt-7-0-node-js-server-module-merging-multiple-calendars-reordering-grid-columns-drag-n-drop-new-customization-options/)
### 주요 변경 사항

이번 업데이트에서는 여러 API 메서드가 변경되었습니다. 최신 버전에 맞추려면 [Migration](migration.md#63---70) 문서를 확인하세요.

### 새로운 기능

- [Node.js에서 Gantt 인스턴스 생성](guides/using-gantt-on-server.md) 가능
- 그리드 전체 크기 조정 시 열 크기를 조절하는 [grid_elastic_columns](api/config/grid_elastic_columns.md) 설정 추가
- [그리드 열을 드래그 앤 드롭으로 재정렬](api/config/reorder_grid_columns.md) 가능
- [QuickInfo](guides/quick-info.md) 확장에서 [gantt.ext.quickInfo 객체의 메서드](guides/quickinfo-ext.md)를 통해 팝업을 수동으로 제어 가능
- [그리드 열에서 긴 텍스트를 말줄임표(...)로 표시](guides/styling-guide.md#customizationgridcolumns) 가능
- [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) 설정 및 [mergeCalendars](api/method/mergecalendars.md) 메서드 추가로 [여러 캘린더를 자동 또는 수동으로 병합](guides/working-time.md#mergingcalendars) 가능
- [getResourceCalendar](api/method/getresourcecalendar.md) 메서드 추가
- [근무 시간을 분 단위로 지정](guides/working-time.md#globalsettings) 가능

### 업데이트

- 로케일 파일이 패키지에서 제거되었으며, Gantt 차트 현지화를 위한 [새로운 API](api/other/i18n.md) 추가
- 모든 확장은 이제 [plugins](api/method/plugins.md) 메서드를 통해 활성화해야 함
- `Gantt.getGanttInstance`가 [새 인스턴스 생성 시 설정 객체를 받을 수 있음](guides/multiple-gantts.md#ganttinstanceconfiguration)
- CSP 확장이 패키지에서 제거되었으며, [csp 모드는 기본 활성화](api/config/csp.md)
- [attachEvent](api/method/attachevent.md) 메서드의 세 번째 매개변수로 settings 객체 추가
- [setWorkTime](api/method/setworktime.md) 메서드에서 근무 시간 설정 포맷이 단순화됨
- 기본 근무 시간이 8:00-17:00에서 8:00-12:00, 13:00-17:00로 변경됨
- [gantt.config.resource_calendars](api/config/resource_calendars.md) 설정 포맷 단순화
- 문서에 [비디오 가이드](guides/video-guides.md) 추가

### 수정 사항

- 열을 숨겼다가 다시 보였을 때 열 너비가 변경되는 버그 수정
- `multiselect` 설정으로 멀티셀렉트 확장을 비활성화했을 때 작업 선택이 불가능해지는 버그 수정
- 시작일이 같은 작업에서 `gantt.sort`가 잘못 동작하던 문제 수정
- Gantt가 웹 컴포넌트 내부에 초기화되었을 때 링크 드래그 앤 드롭 문제 수정

6.3.7
-----

<span class='release_date'>2020년 2월 12일. 버그 수정 릴리즈</span>

### 수정 사항

- 차트 및 리소스 패널의 스마트 렌더링 성능 대폭 개선

6.3.6
-----

<span class='release_date'>2020년 2월 10일. 버그 수정 릴리즈</span>

### 수정 사항

- [gantt.resetLayout](api/method/resetlayout.md)에서 스크립트 오류가 발생하던 회귀 문제 수정
- [QuickInfo 팝업](https://docs.dhtmlx.com/gantt/desktop__extensions_list.html#quickinfo )이 일부 경우 [리소스 패널](https://docs.dhtmlx.com/gantt/desktop__resource_management.html#resourceviewpanel) 뒤에 표시되던 문제 수정
- [gantt.getShortcutHandler](api/method/getshortcuthandler.md) 메서드에서 발생하던 스크립트 오류 수정
- [tooltip.show(x, y)](https://docs.dhtmlx.com/gantt/desktop__tooltips_ext.html) 메서드에서 발생하던 스크립트 오류 수정
- [gantt.getTaskNode](api/method/gettasknode.md)이 [분할 작업](https://docs.dhtmlx.com/gantt/desktop__split_tasks.html)에 대해 올바른 HTML 요소를 반환함
- [가로 스크롤바](https://docs.dhtmlx.com/gantt/desktop__specifying_columns.html#horizontalscrollbar)가 [visibility groups](https://docs.dhtmlx.com/gantt/desktop__layout_config.html#visibilitygroups)가 일부 레이아웃에서 지정될 때 표시되지 않던 문제 수정

6.3.5
-----

<span class='release_date'>2020년 1월 31일. 버그 수정 릴리즈</span>

### 수정 사항

- 작업 [그룹화](guides/grouping.md)에서 드래그 앤 드롭으로 작업을 이동한 후 세로 스크롤 위치가 초기화되는 문제 수정
- [drag_timeline](api/config/drag_timeline.md) 설정이 `null`일 때 발생하던 스크립트 오류 수정
- [static_background](api/config/static_background.md) 및 [static_background_cells](api/config/static_background_cells.md)가 활성화되고 [smart_rendering](api/config/smart_rendering.md)가 비활성화된 경우 강조 셀의 위치가 잘못 표시되는 문제 수정
- [onAfterBranchLoading](api/event/onafterbranchloading.md) 이벤트가 호출되지 않던 문제 수정
- [task_height](api/config/task_height.md) 값이 [row_height](api/config/row_height.md) 값보다 작을 때 [스마트 렌더링](guides/performance.md#smartrendering)이 잘못 동작하던 문제 수정

### 업데이트

- [Gantt 레이아웃을 설정 변경 후 재구성하는 퍼블릭 메서드](api/method/resetlayout.md) 추가

6.3.4
-----

<span class='release_date'>2019년 12월 27일. 버그 수정 릴리즈</span>

### 수정 사항

- [스마트 렌더링](guides/performance.md#smartrendering)을 끌 때 [리소스 부하 다이어그램](guides/resource-management.md#resourceviewpanel)이 충돌하던 문제 수정
- "unit"이라는 이름의 사용자 정의 작업 속성이 있을 때 Gantt가 이를 기간 단위 값으로 간주하여 작업 드래그 후 기간을 곱하던 문제 수정
- [autosize](api/config/autosize.md) 설정이 활성화된 경우 [Tooltip](guides/tooltips.md) 위치가 잘못 표시되던 문제 수정
- [scrollable](guides/specifying-columns.md#horizontalscrollbar) 속성과 [autofit](api/config/autofit.md) 설정이 모두 true일 때 그리드 셀 정렬이 잘못 동작하던 문제 수정
- 타임라인의 작업과 그리드의 [플레이스홀더](api/config/placeholder_task.md) 간 링크 생성이 이제 차단됨
- [auto scheduling 확장](guides/auto-scheduling.md)에서 [제약 조건 타입(SNET/FNET/SNLT/FNLT)](guides/auto-scheduling.md#timeconstraintsfortasks)이 날짜 없이 지정되거나 잘못된 날짜가 지정된 경우 Gantt가 멈추던 버그 수정

6.3.3
-----

<span class='release_date'>2019년 12월 18일. 버그 수정 릴리즈</span>

### 수정 사항

- [그리드 크기 조정](guides/specifying-columns.md#resizing)에서 타임라인이 비활성화되는 문제 수정
- [gantt.parse](api/method/parse.md)가 부모 작업이 자식보다 나중에 로드될 때 프로젝트 트리를 올바르게 업데이트함
- SalesForce Lightning Aura 컴포넌트 프레임워크와의 호환성 수정(Evaluation 빌드)
- SalesForce 환경에서 [Tooltip](guides/tooltips.md)의 잘못된 위치 문제 수정
- gantt 컨테이너에 세로 여백이 있을 때 [Tooltip](guides/tooltips.md) 위치가 잘못 표시되던 문제 수정
- gantt 내부 요소에 누락된 [WAI-ARIA](guides/accessibility.md#waiariaattributes) 속성 추가
- [min_duration](api/config/min_duration.md) 설정의 잘못된 동작 수정
- [링크 포매터](guides/formatters-ext.md#linkformatter)가 사용자 정의 [gantt 인스턴스](guides/multiple-gantts.md)와 함께 잘못 동작하던 문제 수정

6.3.2
-----

<span class='release_date'>2019년 12월 10일. 버그 수정 릴리즈</span>

### 수정 사항

- [gantt.destructor](api/method/destructor.md)가 [클릭-드래그 기능](guides/advanced-dnd.md)이 활성화된 상태에서 호출될 때 발생하던 스크립트 오류 수정
- [gantt.parse](api/method/parse.md)가 전달된 데이터 객체를 더 이상 수정하지 않으며, 대신 딥 카피를 사용함

### 업데이트

- TypeScript 타입 정의 업데이트
- [onBeforeBranchLoading](api/event/onbeforebranchloading.md) 및 [onAfterBranchLoading](api/event/onafterbranchloading.md) 퍼블릭 이벤트 추가로 [동적 로딩](guides/dynamic-loading.md) 요청의 url 또는 동적 파라미터를 수정 가능
- [dataProcessor](guides/server-side.md)의 url을 초기화 후 변경할 수 있는 퍼블릭 메서드 추가

6.3.1
-----

<span class='release_date'>2019년 11월 29일. 버그 수정 릴리즈</span>

### 수정 사항

- [스마트 렌더링](api/method/addtasklayer.md#smartrenderingforcustomlayers)에서 일부 경우 링크가 렌더링되지 않던 회귀 문제 수정
- [읽기 전용 모드](guides/readonly-mode.md)에서 [키보드 내비게이션](guides/keyboard-navigation.md)으로 작업을 수정 및 생성할 수 있던 버그 수정
- [전체화면 확장](guides/fullscreen-mode.md)에서 전체화면 모드 시 일부 페이지 요소가 gantt 위에 표시되던 문제 수정
- [drag-timeline 확장](guides/extensions-list.md#dragtimeline)에서 [readonly 설정](guides/readonly-mode.md) 값을 초기화하던 버그 수정

6.3
-------

<span class='release_date'>2019년 11월 14일. 마이너 업데이트</span>

[블로그에서 릴리즈 리뷰 보기](https://dhtmlx.com/blog/dhtmlx-gantt-chart-6-3-decimal-durations-link-formatting-drag-n-drop-multiple-tasks-even-smarter-rendering/)
### 주요 변경 사항

이번 업데이트에서는 여러 API 메서드가 변경되었습니다. 최신 버전에 맞추려면 [Migration](migration.md#62---63) 문서를 확인하세요.

### 새로운 기능

- [작업 기간을 소수 단위로 지정](guides/working-time.md#taskdurationindecimalformat) 가능
- [마우스 클릭 및 드래그로 타임라인 스크롤](guides/extensions-list.md#dragtimeline) 가능
- [여러 작업을 수평으로 드래그 앤 드롭](guides/multiselection.md#multitaskselectionanddragndrop) 가능

### 업데이트

- [타임스케일](guides/configuring-time-scale.md#range)의 명시적 [start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md) 범위 외부에 [작업을 표시](api/config/show_tasks_outside_timescale.md)할 수 있는 기능 추가
- 작업의 종료일을 포맷팅하기 위한 새로운 [task_end_date](api/template/task_end_date.md) 템플릿 추가
- [Undo](guides/undo-redo.md#undoingredoingchangesmadefromcode) 스택에 커스텀 액션을 추가할 수 있는 기능 추가
- 커스텀 레이어를 [스마트 렌더링](api/method/addtasklayer.md#smartrenderingforcustomlayers)에 연결할 수 있는 기능 추가
- **선행 작업**용 [인라인 에디터](guides/inline-editing.md)가 링크의 포맷된 값을 지원
- 날짜 [인라인 에디터](migration.md#inline_editors)의 입력값에 대한 기본 제한 제거
- [전체 화면 확장](guides/fullscreen-mode.md)을 위한 루트 노드를 지정할 수 있는 기능 추가
- `shiftKey`+`mousewheel` 조합으로 [수평 스크롤](api/config/horizontal_scroll_key.md)을 변경하거나 비활성화할 수 있는 기능 추가
- [Material 스킨](guides/skins.md#materialskin)에서 Roboto 폰트가 제거되었으며, 수동으로 임포트해야 함

### 버그 수정

- [스마트 렌더링](guides/performance.md#smartrendering)이 꺼졌을 때 [리소스 히스토그램](guides/resource-management.md#resourceviewpanel)이 크래시되는 문제 수정
- r.js 컴프레서와의 호환성 문제 수정
- [키보드 네비게이션](guides/keyboard-navigation.md)과 [인라인 에디터](guides/inline-editing.md) 간의 다양한 충돌 문제 수정
- [커스텀 라우터](guides/server-side.md#customrouting)에서 작업 및 링크가 순차적으로 수정될 때 [DataProcessor](guides/server-side.md#customrouting)의 상태가 잘못되는 문제 수정
- 이제 Task/Link의 올바른 데이터 객체가 [커스텀 라우터](guides/server-side.md#customrouting)의 **delete** 호출에도 전달됨

6.2.7
-----

<span class='release_date'>2019년 10월 11일. 버그 수정 릴리즈</span>

### 버그 수정

- [복합 레이아웃](guides/resource-management.md#resourceviewpanel)의 [수평 스크롤이 있는 그리드](guides/specifying-columns.md#horizontalscrollbar)에서 수직 크기 조정 문제 수정
- [스케일 스텝](guides/configuring-time-scale.md#timestep)이 1보다 클 때 [리소스 히스토그램](guides/resource-management.md#resourceviewpanel)이 올바르게 동작하지 않는 문제 수정
- [gantt.parse](api/method/parse.md) 호출 후 브랜치가 접힌 채로 남는 v6.2.4 버그 재발 문제 수정

6.2.6
-----

<span class='release_date'>2019년 9월 19일. 버그 수정 릴리즈</span>

### 버그 수정

- [v6.2 스마트 렌더링](#62)에서 [Gantt 재초기화](api/method/init.md) 후 작업의 수직 위치가 올바르지 않게 되는 회귀 문제 수정
- [QuickInfo 팝업](guides/extensions-list.md#quickinfo)이 [스케줄되지 않은 작업](guides/unscheduled-tasks.md)에 표시되지 않던 문제 수정
- Ultimate 빌드에서 확장 파일이 올바르게 동작하지 않던 문제 수정

6.2.5
-----

<span class='release_date'>2019년 9월 12일. 버그 수정 릴리즈</span>

### 버그 수정

- [하위 작업이 있는 프로젝트 드래그](api/config/drag_project.md) 후 [onBeforeTaskChanged](api/event/onbeforetaskchanged.md) 이벤트 핸들러에서 하위 작업의 초기 값이 잘못되는 문제 수정
- [그룹화](guides/grouping.md) 확장과 [자동 작업 유형](api/config/auto_types.md) 활성화 시 올바르지 않게 동작하는 문제 수정
- [onTaskLoading](api/event/ontaskloading.md) 이벤트 핸들러에서 *false*를 반환할 때 스크립트 오류 발생 문제 수정
- [gantt.load](api/method/load.md) 및 [gantt.parse](api/method/parse.md)에서 발생할 수 있는 예외에 대해 더 명확한 에러 메시지 추가

6.2.4
-----

<span class='release_date'>2019년 9월 5일. 버그 수정 릴리즈</span>

### 버그 수정

- [parse](api/method/parse.md) 메서드로 데이터 업데이트 후 작업 브랜치가 접히는 문제 수정
- [리소스 뷰](guides/resource-management.md#resourceviewpanel)에서 [스마트 렌더링](guides/performance.md#smartrendering)이 올바르지 않게 동작하는 문제 수정
- [Zoom 모듈](guides/zooming.md)이 [Gantt 재초기화](api/method/init.md) 시 불필요한 DOM 이벤트 핸들러를 계속 추가하는 문제 수정

6.2.3
-----

<span class='release_date'>2019년 8월 29일. 버그 수정 릴리즈</span>

### 버그 수정

- IE11 및 MS Edge 브라우저에서 [제약 조건 컨트롤](guides/auto-scheduling.md#timeconstraintsfortasks)이 올바르지 않게 동작하는 문제 수정
- [전체 화면 모드](guides/fullscreen-mode.md)에서 Gantt 요소의 크기 문제 수정
- [전체 화면 모드](guides/fullscreen-mode.md)에서 [onExpand](api/event/onexpand.md) 및 [onCollapse](api/event/oncollapse.md) 이벤트가 호출되지 않는 문제 수정
- 마우스 포인터가 화면의 좌/우 가장자리에 있을 때 [툴팁](guides/tooltips.md) 위치가 올바르지 않은 문제 수정
- [Lightbox](guides/default-edit-form.md)가 열릴 때 [툴팁](guides/tooltips.md)이 숨겨지도록 수정
- 차트 스크롤 시 [툴팁](guides/tooltips.md)이 숨겨지도록 수정
- 같은 선택자를 가진 두 요소 사이에서 마우스 포인터가 이동할 때 [툴팁](guides/tooltips.md)이 업데이트되지 않던 문제 수정
- [getTaskBy](api/method/gettaskby.md)에서 두 번째 인자로 `null` 또는 `0`을 제공할 때 올바르지 않게 동작하는 문제 수정
- [정렬](guides/sorting.md) 후 [WBS](api/method/getwbscode.md) 컬럼이 업데이트되지 않는 문제 수정
- [Material 스킨](guides/skins.md#materialskin)에서 [static_background](api/config/static_background.md)가 올바르지 않게 표시되는 문제 수정

6.2.2
-----

<span class='release_date'>2019년 8월 13일. 버그 수정 릴리즈</span>

### 업데이트

- [gantt.license](api/other/license.md) 속성 추가
- 새로운 링크 생성을 위한 [onLinkCreated](api/event/onlinkcreated.md) API 이벤트 추가 (신규 작업용 [onTaskCreated](api/event/ontaskcreated.md)와 유사)
- [moveTask](api/method/movetask.md)가 [onBeforeTaskMove](api/event/onbeforetaskmove.md)를 통해 동작이 방지되면 `false`를 반환하도록 변경

### 버그 수정

- 사용자가 [새 링크](guides/dependencies.md)를 생성할 때 [render](api/method/render.md) 메서드 호출로 링크 라인이 사라지는 문제 수정
- [마커](guides/markers.md)의 시작일이 [타임스케일](guides/configuring-time-scale.md#range)의 최소 날짜보다 빠른 경우 마커가 표시되지 않던 문제 수정
- [gantt.config.show_chart = false](api/config/show_chart.md)로 초기화할 때 [마커](guides/markers.md)가 표시되지 않는 문제 수정
- 사용자가 [작업 유형](guides/typeselect.md)을 변경할 때 [lightbox](guides/default-edit-form.md)의 모달 오버레이가 사라지는 문제 수정
- [키보드 네비게이션 프리셋](https://docs.dhtmlx.com/gantt/desktop__keyboard_navigation.html#comment-4488512513)에서 [onBeforeTaskMove](api/event/onbeforetaskmove.md)로 동작이 취소되어도 **Shift+left arrow** 단축키 이후 [onAfterTaskUpdate](api/event/onaftertaskupdate.md)가 호출되는 문제 수정

6.2.1
-----

<span class='release_date'>2019년 8월 7일. 버그 수정 릴리즈</span>

### 버그 수정

- [클릭-드래그 기능](guides/advanced-dnd.md)의 IE11 호환성 문제 수정
- 리소스 뷰가 있는 빈 차트에 새 작업을 추가할 때 발생하는 스크립트 오류 수정
- [그룹화](guides/grouping.md) 확장에서 신규 작업에 잘못된 그룹 값이 할당되는 문제 수정
- [키보드 네비게이션](guides/keyboard-navigation.md) 확장에서 Alt+화살표 단축키로 발생하는 스크립트 오류 수정
- [리소스 컨트롤](guides/resource-management.md)에서 필터링 시 대소문자 무시하도록 변경
- 작업 드래그 및 드래그 앤 드롭이 Gantt의 모든 요소에서 mouseup 시 완료되도록 수정
- [스케줄되지 않은 작업](guides/unscheduled-tasks.md) 저장 후 발생하는 스크립트 오류 수정

6.2
-------

<span class='release_date'>2019년 7월 16일. 마이너 업데이트</span>

[블로그 릴리즈 리뷰](https://dhtmlx.com/blog/dhtmlxgantt-6-2-minor-update-boosting-gantt-chart-performance-zooming-mouse-wheel-much/)

### 주요 변경 사항

이 업데이트는 여러 API 메서드에 변경을 포함합니다. 최신 버전에 맞추려면 [마이그레이션](migration.md#61---62) 문서를 확인하세요.

### 신규 기능

- [드래그 앤 드롭으로 작업 생성 및 선택](guides/advanced-dnd.md)
- 마우스 휠로 부드러운 [줌](guides/zooming.md)
- [분할 작업 확장/축소](guides/split-tasks.md#expandingandcollapsingsplittasks) 기능 (PRO)

### 업데이트

- 차트 및 리소스 패널의 성능 대폭 향상
- [인라인 에디터](guides/inline-editing.md)로 작업의 시작/종료일 변경 시 작업 기간이 자동으로 수정됨
- [타임라인 스케일 설정](guides/configuring-time-scale.md) 과정이 간소화됨
- 새로운 [줌](guides/zoom.md) 및 [스케일](api/config/scales.md) API 추가

### 버그 수정

- 여러 작업 강조 표시가 렌더링 후 초기화되는 문제 수정
- 데이터 프로세서 핸들러에서 Gantt를 파괴할 때 스크립트 오류 수정

6.1.7
-----

<span class='release_date'>2019년 6월 27일. 버그 수정 릴리즈</span>

### 버그 수정

- [getClosestWorkTime](api/method/getclosestworktime.md)의 올바르지 않은 동작 수정
- [타임라인 가시성 토글](api/config/show_chart.md) 후 [autoscroll](api/config/autoscroll.md)의 동작 문제 수정
- [멀티 선택 확장](guides/multiselection.md)에서 선택된 작업이 차트 다시 그리기 후 강조 표시를 잃는 문제 수정
- [수직 드래그 앤 드롭](guides/reordering-tasks.md) 후 [스마트 렌더링](guides/performance.md#smartrendering) 및 [키보드 네비게이션](guides/keyboard-navigation.md) 확장 활성화 시 발생하는 스크립트 오류 수정
- 일부 그리드 컬럼이 [숨겨져](guides/specifying-columns.md#visibility) 있을 때 `Tab` 키로 [인라인 에디터](guides/inline-editing.md) 간 전환 시 올바르지 않은 동작 수정
- [제약 날짜](guides/auto-scheduling.md#timeconstraintsfortasks)를 [lightbox](guides/edit-form.md) 및 [인라인 에디터](guides/inline-editing.md)에서 오버라이드하지 못하게 하는 예기치 않은 동작 수정

6.1.6
-----

<span class='release_date'>2019년 5월 14일. 버그 수정 릴리즈</span>

### 버그 수정

- 두 번째 [init](api/method/init.md) 호출 후 [QuickInfo 팝업](guides/extensions-list.md#quickinfo)의 [클릭 핸들러](api/config/quickinfo_buttons.md)가 동작하지 않는 문제 수정
- [show_chart](api/config/show_chart.md)가 false로 설정된 경우 [QuickInfo 팝업](guides/extensions-list.md#quickinfo)이 표시되지 않는 문제 수정
- [수직 드래그 앤 드롭](guides/reordering-tasks.md) 후 [dataProcessor 라우터](guides/server-side.md#customrouting)의 `action` 인자가 올바르지 않은 문제 수정
- [createTask](api/method/createtask.md)가 `index` 파라미터를 무시하는 문제 수정

6.1.5
-----

<span class='release_date'>2019년 4월 25일. 버그 수정 릴리즈</span>

### 버그 수정

- [show_chart](api/config/show_chart.md) 설정이 비활성화된 상태에서 두 번째 [init](api/method/init.md) 호출 시 스크립트 오류 수정
- [마커 모드](guides/reordering-tasks.md#improvingperformancewithlargedatasets)에서 [수직 드래그 앤 드롭](guides/reordering-tasks.md) 플레이스홀더 위치가 올바르지 않은 문제 수정

6.1.4
-----

<span class='release_date'>2019년 4월 18일. 버그 수정 릴리즈</span>

### 버그 수정

- IE 브라우저에서 gantt [재초기화](api/method/init.md) 시 스크립트 오류 수정
- [gantt.destructor](api/method/destructor.md) 호출 시 [툴팁 확장](guides/tooltips.md)의 올바르지 않은 동작 수정
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md) 모드에서 [인라인 에디터](guides/inline-editing.md)가 [숨겨진 컬럼](guides/specifying-columns.md#visibility)을 포함한 그리드에서 올바르지 않게 동작하는 문제 수정
- [Undo](guides/undo-redo.md) 확장에서 새 작업 재생성에 대한 Redo 동작이 모든 속성을 복원하지 못하는 문제 수정
- GPL 빌드에서 두 번째 [gantt.init](api/method/init.md) 호출 시 스크립트 오류가 발생하는 회귀 문제 수정

6.1.3
-----

<span class='release_date'>2019년 4월 15일. 버그 수정 릴리즈</span>

### 수정 사항

- [gantt.createTask](api/method/createtask.md)/[gantt.addTask](api/method/addtask.md)가 하드코딩된 0 id 대신 [root_id](api/config/root_id.md) 설정 값을 사용하도록 수정
- `minute` 및 `hour` [duration units](api/config/duration_unit.md)에 대한 [작업 시간 계산](guides/working-time.md) 성능 향상
- [스마트 렌더링](guides/performance.md#smartrendering) 모드에서 대용량 작업 목록 렌더링 시 소폭 성능 개선
- 사용자가 [인라인 에디터](guides/inline-editing.md) 내에서 텍스트를 선택할 때 [수직 드래그 앤 드롭](guides/reordering-tasks.md)이 시작되지 않도록 개선
- IE 브라우저에서 gantt를 [재초기화](api/method/init.md)할 때 발생하는 스크립트 오류 수정
- 차트에서 마지막 작업을 삭제한 후 `cell` 모드의 [키보드 내비게이션](guides/keyboard-navigation.md)에서 발생하는 스크립트 오류 수정
- Gantt가 파괴되거나 재초기화될 때 자동 생성된 [static background](api/config/static_background.md) 스타일 요소가 정리되도록 보장
- [읽기 전용 모드](guides/readonly-mode.md) 활성화 시 [인라인 에디터](guides/inline-editing.md)가 비활성화되도록 개선
- `sort` 설정이 활성화된 [키보드 내비게이션](guides/keyboard-navigation.md)의 `cell` 모드에서 그리드 헤더 셀의 잘못된 선택 현상 수정
- 새 작업 추가 시 자동 유형 변경이 되지 않던 [auto_types](api/config/auto_types.md) 설정의 회귀 현상 수정
- [onTaskDblClick](api/event/ontaskdblclick.md)에서 `false`를 반환하면 [onLinkDblClick](api/event/onlinkdblclick.md)도 차단되는 버그 수정
- JSON 데이터에서 [제약 날짜](guides/auto-scheduling.md#timeconstraintsfortasks) 파싱 시 발생하는 스크립트 오류 수정
- [skip_off_time](api/config/skip_off_time.md) 설정 시 작업 및 [마커](guides/markers.md)의 잘못된 위치 수정
- [마커](guides/markers.md) 재정렬 후 [드래그 앤 드롭](guides/reordering-tasks.md)으로 인한 마커 높이 오류 수정
- 새 작업이 `progress` 속성의 초기 값을 받도록 개선
- [marker](guides/reordering-tasks.md#improvingperformancewithlargedatasets) 모드에서 수직 드래그 앤 드롭 후 작업 위치 오류 수정
- [resource panel](guides/resource-management.md#resourceviewpanel)이 활성화된 상태에서 [gantt.destructor](api/method/destructor.md) 사용 시 발생하는 스크립트 오류 수정
- [typeselect](guides/typeselect.md) 블록에 빈 줄이 표시되는 버그 수정
- [id change](api/method/changetaskid.md) 후 작업이 [critical path](guides/critical-path.md)의 일부로 인식되지 않는 버그 수정

6.1.2
-----

<span class='release_date'>2019년 3월 26일. 버그 수정 릴리스</span>

### 업데이트

- [키보드 내비게이션](guides/keyboard-navigation.md): 활성 셀을 가져오는 메서드 추가

### 수정 사항

- 새로운 데이터 저장소를 생성하여 이전 것을 덮어쓸 때 [resource panel](guides/resource-management.md#resourceviewpanel)이 올바르게 동작하지 않던 문제 수정
- [dataProcessor](guides/server-side.md) POST 모드에서 쿼리 파라미터 값이 잘못 전달되는 현상 수정
- 방향을 지정하지 않고 [gantt.getClosestWorkTime](api/method/getclosestworktime.md) 호출 시 잘못된 결과 반환 문제 수정
- 영어 로케일이 이전에 추가된 로케일을 덮어쓰지 못하던 이슈 수정
- [gantt.undo](api/config/undo.md) 및 그리드에서 들여쓰기 작업 시 스크립트 오류 수정
- SalesForce 호환성 개선: SF에서 새로운 리사이즈 리스너가 동작하지 않던 문제에 대한 대체 처리 추가

6.1.1
-----

<span class='release_date'>2019년 3월 5일. 버그 수정 릴리스</span>

### 수정 사항

- [resource lightbox control](guides/resources.md)에 누락된 로케일 옵션 추가
- [gantt.destructor](api/method/destructor.md)와 dataProcessor를 함께 사용할 때 발생하는 스크립트 오류 수정
- [gantt.destructor](api/method/destructor.md)와 [resource panel](guides/resource-management.md#resourceviewpanel)을 함께 사용할 때 발생하는 스크립트 오류 수정
- [tooltip extension](guides/tooltips.md)의 파일 크기 문제 수정
- 링크 요소 더블 클릭 시 [onTaskDblClick](api/event/ontaskdblclick.md) 이벤트가 예기치 않게 호출되는 현상 수정
- [lightbox](api/config/lightbox.md)가 열린 상태에서 [gantt.init](api/method/init.md)을 호출할 때 lightbox 커버가 남아있는 문제 수정
- [lightbox](api/config/lightbox.md) 및 [tooltip extension](guides/tooltips.md)이 [전체 화면 모드](guides/fullscreen-mode.md)에서 올바르게 동작하지 않는 문제 수정

6.1
------

<span class='release_date'>2019년 2월 21일. 소규모 업데이트</span>

[블로그의 릴리스 리뷰](https://dhtmlx.com/blog/dhtmlxgantt-6-1-time-constraints-backward-scheduling-s-curve/)

### 새로운 기능

- [Gantt 차트에 오버레이 추가 기능](guides/baselines.md#extraoverlayforthechart) (PRO)
- [작업에 대한 시간 제약](guides/auto-scheduling.md#timeconstraintsfortasks) (PRO)
- [역방향 스케줄링](guides/auto-scheduling.md#backwardscheduling) (PRO)
- TypeScript 타입 정의가 패키지에 포함됨

### 업데이트

- dhtmlxGantt의 모든 요소에 [툴팁 생성 기능](guides/tooltips.md#tooltipsfordifferentelements) 추가
- [dataProcessor의 라우팅 옵션](guides/server-side.md#customrouting)
- [프로젝트 수준의 작업 캘린더](guides/working-time.md#assigningcalendartoproject) (PRO)
- [dhtmlxGantt를 ES6 모듈로 가져오기](guides/initializing-gantt-chart.md#moduleimport) 지원

6.0.7
-----

<span class='release_date'>2019년 1월 16일. 버그 수정 릴리스</span>

### 수정 사항

- [resource diagram](guides/resource-management.md#resourceviewpanel)의 불필요한 리페인트 횟수 감소
- 작업 삭제 후 [resource diagram](guides/resource-management.md#resourceviewpanel)에서 발생하던 스크립트 오류 수정
- `Esc` 키로 전체 화면 모드 종료 후 [fullscreen extension](guides/fullscreen-mode.md)에서 발생하던 스크립트 오류 수정
- 여러 차트 간 링크 드래그 시 링크 드래그 앤 드롭 상태 오류 수정 (Gantt 간 링크 생성은 지원되지 않음)
- [여러 작업 선택](guides/multiselection.md) 후 [키보드 내비게이션](guides/keyboard-navigation.md)으로 삭제 시 발생하는 스크립트 오류 수정
- [인라인 에디터](guides/inline-editing.md)의 기본 매핑 수정. 인라인 에디터가 작업 셀에서 키보드 단축키를 차단하지 않도록 개선

6.0.4
-----

<span class='release_date'>2018년 12월 27일. 버그 수정 릴리스</span>

### 수정 사항

- `order_branch='marker'` 모드에서 작업 수직 dnd 후 잘못된 작업 위치 수정
- 선택된 작업이 포함된 하위 트리 삭제 후 발생하는 스크립트 오류 수정
- 리소스 필터가 포함된 lightbox에서 저장/취소 시 발생하는 스크립트 오류 수정

6.0.2
-----

<span class='release_date'>2018년 12월 6일. 버그 수정 릴리스</span>

### 수정 사항

- Gantt를 Vue.js 프로젝트에 import할 때 `ReferenceError: getResourceAssignments is not defined` 오류 수정
- 리소스 할당 후 작업 삭제 시 발생하는 스크립트 오류 수정
- 두 번째 `gantt.init` 호출 후 resource diagram에서 발생하는 스크립트 오류 수정
- marker extension 사용 시 타임라인 표시/숨김 토글 시 발생하는 스크립트 오류 수정
- 작업 트리에 순환 참조가 있을 때 `gantt.parse` 호출 시 페이지가 멈추던 문제를 스크립트 오류로 대체

<b>6.0</b>
----------

<span class='release_date'>2018년 11월 5일. 주요 업데이트</span>

[블로그의 릴리스 리뷰](https://dhtmlx.com/blog/dhtmlxgantt-6-0-major-update-advanced-resource-management/)

### 기능

- [여러 리소스를 한 작업에 할당](guides/resource-management.md#assigningresources) (PRO 버전)
- [여러 리소스로 작업 그룹화](guides/resource-management.md#balancingresourceload) (PRO 버전)
- 리소스 부하 다이어그램 외에 [리소스 히스토그램](guides/resource-management.md#resourceviewpanel) 제공 (PRO 버전)
- [임계 경로 계산](guides/critical-path.md) 중 작업의 free/total slack 얻기 ([getSlack()](guides/critical-path.md#gettingfreeandtotalslack) 대신 [getTotalSlack](api/method/gettotalslack.md) / [getFreeSlack](api/method/getfreeslack.md) 사용, PRO 버전)
- [Excel에서 프로젝트 가져오기](guides/excel.md#importfromexcel)
- [REST-JSON DataProcessor 모드](guides/server-side.md#restjson)로 모든 서버 플랫폼에서 복잡한 레코드 처리
- 컨테이너 크기 변경 시 자동 크기 조정

### 설정

- 작업에 리소스 할당을 위한 lightbox 내 [Resources control](guides/resources.md) (PRO 버전)
- "branch" 모드에서 [작업 재정렬 성능 개선](guides/reordering-tasks.md#improvingperformancewithlargedatasets)
- [auto_types](api/config/auto_types.md) 설정에 대한 성능 개선 (PRO 버전)

### API

- 브랜치 내 작업 재정렬 속도를 높이기 위한 [order_branch](api/config/order_branch.md) 설정의 "marker" 모드
- "marker" 모드에서 [order_branch](api/config/order_branch.md) 설정과 함께 작동하는 [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) 이벤트
- getSlack() 대신 slack 계산을 위한 [getTotalSlack](api/method/gettotalslack.md) / [getFreeSlack](api/method/getfreeslack.md) 메서드 (PRO)
- [importFromExcel](api/method/importfromexcel.md) 메서드
- [groupBy](api/method/groupby.md) 메서드의 *delimiter* 옵션으로 리소스 그룹화

5.2
--------------

<span class='release_date'>2018년 7월 6일. 소규모 업데이트</span>

[블로그의 릴리스 리뷰](https://dhtmlx.com/blog/dhtmlxgantt-5-2/)

### 기능

- [그리드에서 인라인 편집](guides/inline-editing.md)
- [작업 분할](guides/split-tasks.md) (PRO 버전)
- 업데이트된 [키보드 내비게이션](guides/keyboard-navigation.md#existingshortcuts)
- [자동 스케줄링](guides/auto-scheduling.md) 성능 개선

### 설정

- [작업 유형 자동 설정](api/config/auto_types.md) 기능 (PRO 버전)
- 새 작업 생성 시 [플레이스홀더 행 사용](api/config/placeholder_task.md) 기능
- lightbox용 [체크박스](guides/checkbox.md) 및 [라디오 버튼](guides/radio.md) 컨트롤
- 업데이트된 [Content Security Policy](guides/content-security-policy.md) 확장

### API

- [undo](guides/undo-redo.md) 및 [autoscheduling](guides/auto-scheduling.md) 확장용 신규 메서드 및 이벤트

5.1
----------

<span class='release_date'>2018년 2월 27일. 소규모 업데이트</span>

[블로그의 릴리스 리뷰](https://dhtmlx.com/blog/dhtmlxgantt-5-1-resource-management-rtl-mode-and-more/)

### 기능

- [리소스 관리](guides/resource-management.md) (PRO 버전)
- [RTL 모드](guides/rtl-mode.md)
- [그리드의 수평 스크롤](guides/specifying-columns.md#horizontalscrollbar) 및 [기타 레이아웃 개선](guides/layout-config.md)
- [Gantt 및 DataProcessor 인스턴스용 소멸자](guides/multiple-gantts.md#destructorofganttanddataprocessorinstances)

### 설정

- [그리드 열의 최소/최대 너비 설정](guides/specifying-columns.md#width) 기능
- [프로젝트와 하위 작업을 함께 드래그 앤 드롭](guides/dnd.md#draggingprojectsalongwiththeirsubtasks) 기능 (PRO 버전)
- [내보내기 메서드의 확장 파라미터](guides/export-common.md)

### API

- [다중 작업 선택](guides/multiselection.md) 확장의 [API 이벤트](guides/multiselection.md#apievents) 업데이트

### 수정 사항

- 스마트 렌더링 모드에서 키보드 내비게이션 관련 이슈 수정

<b>5.0</b>
---------

<span class='release_date'>2017년 12월 12일. 주요 업데이트</span>

[블로그의 릴리스 리뷰](https://dhtmlx.com/blog/large-scale-update-dhtmlxgantt-version-5-0/)

### 기능

- [유연한 Gantt 레이아웃](guides/layout-config.md)
- [REST API와의 서버 연동](guides/server-side.md). [다양한 서버 플랫폼 튜토리얼](integrations/howtostart-guides.md) 참고

### 스타일링

- 새로운 ["Material" 스킨](guides/skins.md#materialskin)

4.2
------------

<span class='release_date'>2017년 8월 17일. 소규모 업데이트</span>

[블로그의 릴리스 리뷰](https://dhtmlx.com/blog/dhtmlxgantt-4-2-manage-working-days-hours-individual-tasks/)

### 기능

- [작업 및 리소스 수준의 작업 시간 캘린더](guides/working-time.md#multipleworktimecalendars)
- [WBS 코드(개요 번호) 계산](guides/specifying-columns.md#wbscode)
- [드래그 앤 드롭 작업 시 자동 스크롤](guides/dnd.md#autoscrollwhiledraggingtasks)
- [페르시아어(파르시) 로케일 추가](guides/localization.md#predefinedlocales)

### 설정

- [키 네비게이션 단축키에 대한 getter 함수](api/method/getshortcuthandler.md) 추가
- [중첩된 작업 및 링크의 계단식 삭제 구성](api/config/cascade_delete.md) 추가
- [*Shift+마우스 휠 이동*으로 타임라인 수평 스크롤](guides/keyboard-navigation.md#builtinshortcutforhorizontaltimelinescrolling) 기능 추가
- 독일어 및 이탈리아어 로케일 업데이트
- Gantt 스킨의 GIF 이미지를 PNG로 교체


4.1
---------

<span class='release_date'>2016년 9월 1일. 마이너 업데이트</span>

[블로그에서 릴리스 리뷰 보기](https://dhtmlx.com/blog/dhtmlxgantt-4-1-full-accessibility-support/)

### 기능

- [키보드 네비게이션](guides/keyboard-navigation.md)
- [WAI-ARIA 지원](guides/accessibility.md#waiariaattributes)
- [고대비 테마](guides/accessibility.md#highcontrastthemes)
- [자동 스케줄링](guides/auto-scheduling.md) 및 [주요 경로](guides/critical-path.md) 계산 업데이트 (PRO 버전)

### 설정

- [작업 시간 계산](guides/working-time.md) 및 [타임스케일 렌더링](guides/performance.md) 성능 개선
- [작업 시간 해제용 공개 메서드](api/method/unsetworktime.md) 추가
- [QuickInfo 팝업용 API 이벤트](api/overview/events-overview.md) 추가
- [크로아티아어 로케일](guides/localization.md#predefinedlocales) 추가
- [터키어 로케일](guides/localization.md#predefinedlocales) 업데이트


<b>4.0</b>
---------

<span class='release_date'>2015년 12월 1일. 주요 업데이트</span>

### 기능

- [대용량 데이터셋을 위한 스마트 렌더링](guides/performance.md#smartrendering)
- [실행 취소/다시 실행](guides/undo-redo.md) 확장

### 설정

- [주요 경로 계산](guides/critical-path.md) - [링크의 래그/리드 지원](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks) 추가 (PRO 버전)
- 스페인어 및 중국어 [로케일](guides/localization.md#predefinedlocales) 업데이트

### API

- 공개 API 개선 - [ajax](https://docs.dhtmlx.com/api__refs__dhtmlxajax.html), [환경 변수](api/other/env.md)용 공개 헬퍼 추가
- [공개 API 정리](migration.md#3x---40) - 불필요한 글로벌 객체 제거, dhtmlxSuite와의 충돌 해결
- [팝업 메시지용 공개 헬퍼](guides/message-boxes.md) 추가


3.3
----------

<span class='release_date'>2015년 7월 21일. 마이너 업데이트</span>

### 기능

- 의존성 [자동 스케줄링](guides/auto-scheduling.md) 기능 (PRO 버전)
- [전체 화면 모드](guides/fullscreen-mode.md)
- [일정 미지정 작업 지원](guides/unscheduled-tasks.md)
- [역방향 계획](guides/loading.md#loadingtaskdates)

### 설정

- [콘텐츠 보안 정책](guides/content-security-policy.md) 초기 지원
- [그리드의 열별 정렬](guides/sorting.md#sortingpercolumninthegrid) 설정 가능
- 브랜치 순서 지정 기능 개선 - [계층 간 드래그 앤 드롭](guides/reordering-tasks.md#draganddropacrosstheentireganttstructure)

### API

- [ajax 로딩/저장용 REST 모드](guides/server-side.md)


3.2
----------------

<span class='release_date'>2015년 3월 18일. 마이너 업데이트</span>

### 기능

- [작업 그룹화](guides/grouping.md) (PRO 버전)
- [다중 작업 선택](guides/multiselection.md)
- [iCal 및 Excel 형식으로 데이터 내보내기](guides/excel.md)
- [작업 시간 및 주요 경로 계산 성능 대폭 개선](guides/performance.md)


### 설정

- [라이트박스의 연도 선택기 범위 지정 가능](guides/time.md#mapping)


### API

- [작업 재정렬 시 사용 가능한 대상 위치 관리 이벤트](guides/reordering-tasks.md#restrictingdroppositions)
- [로딩 프로세스 관리 이벤트](guides/loading.md#eventsflow)
- 신규 샘플, 메서드, 이벤트 추가


3.1
----------------

<span class='release_date'>2014년 10월 25일. 마이너 업데이트</span>

### 기능

- 터치 디바이스에서 작업 드래그 가능

### 설정

- [스케일의 첫 번째와 마지막 작업 간 기본 오프셋 변경](api/config/scale_offset_minimal.md)

### 버그 수정

- 작업 트리 확장/축소 시 툴팁의 잘못된 동작
- Gantt 초기화 시 API 이벤트 순서
- Gantt가 지워지거나 재초기화될 때 수직 마커의 잘못된 동작


<b>3.0</b>
----------------

<span class='release_date'>2014년 9월 11일. 주요 업데이트</span>

### 설정

- ['Time' 및 'Duration' 컨트롤을 사용자 정의 날짜 속성에 매핑하는 기능](guides/time.md#mapping)

### 기능

- [동적 로딩](guides/dynamic-loading.md) (PRO 버전)
- [드래그 앤 드롭으로 열 및 전체 그리드 크기 조정 가능](guides/specifying-columns.md)
- [동적으로 열 숨기기/표시](guides/specifying-columns.md#visibility) 기능 (PRO 버전)
- [타임라인 영역에 추가 요소 표시](guides/baselines.md) (PRO 버전)
- [주요 경로 지원](guides/critical-path.md) (PRO 버전)
- [읽기 전용 모드의 새로운 가능성](guides/readonly-mode.md)
- [오늘 및 기타 수직 마커](guides/markers.md)
- [프로젝트, 마일스톤 등 다양한 작업 유형의 렌더링 완전 재정의 가능](guides/baselines.md) (PRO 버전)
- [특수 데이터 속성을 통한 작업 스타일링](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)
- [특수 데이터 속성을 통한 링크 스타일링](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject)


### API

- [새로운 트리 관련 메서드](guides/task-tree-operations.md)

2.1
-------------

<span class='release_date'>2014년 3월 28일. 마이너 업데이트</span>

### 글로벌

- 로케일 업데이트
- 다양한 버그 수정

### 설정

- [작업 유형별 라이트박스 사용자 정의 구성](guides/task-types.md#specificlightboxpertasktype)
- [비선형 스케일, 스케일에서 시간 건너뛰기](guides/custom-scale.md) (PRO 버전)

### 기능

- [마일스톤](guides/milestones.md) 및 [프로젝트](guides/task-types.md#projecttasks) 지원 (PRO 버전)
- [작업 기간을 달력 시간이 아닌 근무일/시간 단위로 계산](guides/working-time.md)
- [페이지 내 다수의 Gantt 차트 지원](guides/multiple-gantts.md) (PRO 버전)

### API

- 더 많은 구성, 메서드, 이벤트 추가


<b>2.0</b>
-------------------------------------

<span class='release_date'>2013년 10월 18일. 주요 업데이트</span>

### 글로벌

- [jQuery 통합](guides/jquery-integration.md)
- 주요 성능 개선
- [즉시 사용 가능한 PHP 통합](guides/server-side.md)

### 설정

- [구성 가능한 다중 라인 스케일](guides/configuring-time-scale.md)
- [구성 가능한 다중 열 그리드(선택적 정렬, 드래그 앤 드롭 지원)](guides/reordering-tasks.md)
- [작업 편집용 구성 가능한 팝업 폼](guides/edit-form.md)
- [모든 텍스트 요소를 템플릿으로 정의 가능](guides/common-configuration.md#gantttemplatesobject)
- [모든 날짜 문자열 구성 가능](guides/common-configuration.md#ganttconfigobject)
- [모든 텍스트 라벨 현지화 가능](guides/localization.md)

### 스타일링

- [기본 스킨을 "terrace"로 변경](guides/skins.md#terraceskin)
- [3가지 신규 스킨](guides/skins.md)
- [막대에 선택적 내부 리사이저 추가 가능](api/config/drag_resize.md)
- [작업 생성용 선택적 UI](guides/overview.md)
- [사용자 정의 규칙에 따라 세로 및 가로선 색상 지정 가능](guides/highlighting-time-slots.md)

### 기능

- [JSON에서 로딩 및 직렬화](guides/supported-data-formats.md#json)
- [간소화된 XML 형식으로 로딩 및 직렬화](guides/supported-data-formats.md#xmldhtmlxgantt20)
- [3가지 유형의 작업 링크](api/config/links.md)
- 터치 디바이스에서 Gantt 차트 동작


### API

- [다양한 이벤트 추가](api/overview/events-overview.md)
- [템플릿](api/overview/templates-overview.md) 및 [구성 옵션](api/overview/properties-overview.md) 추가
- [API 간소화, 다양한 객체 대신 단일 Gantt 객체 사용](migration.md)

