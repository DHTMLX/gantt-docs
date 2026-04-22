---
title: "확장 기능 전체 목록"
sidebar_label: "확장 기능 전체 목록"
---

# 확장 기능 전체 목록

dhtmlxGantt는 표준 동작에 추가 기능을 제공하는 확장 기능 세트를 포함합니다.

확장 기능을 사용하려면 [gantt.plugins](api/method/plugins.md) 메서드를 통해 플러그인을 활성화해야 합니다.

## 고급 드래그 앤 드롭

드래그 앤 드롭으로 작업을 생성하고 선택할 수 있는 기능을 제공합니다.

~~~js
gantt.plugins({
    click_drag: true
});
~~~

#### 관련 자료

문서: [DnD로 작업 생성/선택하기](guides/advanced-dnd.md)

API: [click_drag](api/config/click_drag.md)

샘플: [Drag and Drop으로 새 작업 만들기](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)

## 자동 스케줄링 {#autoscheduling}

:::note
이 확장 기능은 PRO 버전에서만 사용 가능합니다
:::

작업 간 관계에 따라 자동으로 작업을 스케줄링할 수 있습니다.

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

#### 관련 자료

문서: [자동 스케줄링](guides/auto-scheduling.md)

API: [auto_scheduling](api/config/auto_scheduling.md)

샘플: [자동 스케줄링 확장 기능](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

## 크리티컬 패스

:::note
이 확장 기능은 PRO 버전에서만 사용 가능합니다
:::

지연 없이 전체 프로젝트의 마감일에 영향을 주지 않는 작업들의 연속을 나타냅니다.
크리티컬 패스는 또한 프로젝트가 걸릴 수 있는 최단 시간도 결정합니다.

~~~js
gantt.plugins({
    critical_path: true
});
~~~

#### 관련 자료

문서: [크리티컬 패스](guides/critical-path.md)

API: [highlight_critical_path](api/config/highlight_critical_path.md)

샘플: [크리티컬 패스](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

## Drag Timeline

마우스 드래그로 타임라인 뷰를 스크롤할 수 있습니다.

~~~js
gantt.plugins({
    drag_timeline: true
});
~~~

#### 관련 자료

API: [drag_timeline](api/config/drag_timeline.md)

샘플: [드래그 타임라인](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)

## 추가 오버레이

:::note
이 확장 기능은 PRO 버전에서만 사용할 수 있습니다.
:::

Gantt 차트 위에 추가 레이어를 추가하여 맞춤 콘텐츠를 배치할 수 있는 기능을 제공합니다.

~~~js
gantt.plugins({
    overlay: true
});
~~~

#### 관련 자료

문서: [타임라인 영역의 커스텀 요소](guides/baselines.md#extra-overlay-for-the-chart)

샘플: [Overlay가 있는 Gantt 차트 및 확대/축소 (S-커브)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)

## 내보내기 서비스

온라인 내보내기 서비스를 활성화할 수 있는 기능을 제공합니다.

~~~js
gantt.plugins({
    export_api: true
});
~~~

#### 관련 자료

문서: [데이터 내보내기 및 가져오기](guides/export-common.md)

## 전체 화면 {#fullscreen}

Gantt를 전체 화면 모드로 표시합니다.

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

#### 관련 자료

문서: [전체 화면 모드](guides/fullscreen-mode.md)

샘플: [전체 화면](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

## 그룹화

:::note
이 확장 기능은 PRO 버전에서만 사용 가능합니다
:::

작업을 임의의 작업 속성으로 그룹화할 수 있습니다.

~~~js
gantt.plugins({
    grouping: true
});
~~~

#### 관련 자료

문서: [작업 그룹화](guides/grouping.md)

API: [groupBy](api/method/groupby.md)

샘플: [작업 그룹화](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)

## 키보드 탐색 {#keyboardnavigation}

키보드 도움으로 간트 차트를 탐색할 수 있습니다.

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

#### 관련 자료

문서: [접근성](guides/accessibility.md), [키보드 탐색](guides/keyboard-navigation.md)

API: [keyboard_navigation](api/config/keyboard_navigation.md),[keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)

## 다중 작업 선택 {#multitaskselection}

한 번에 여러 작업을 간트 차트에서 선택할 수 있습니다.

~~~js
gantt.plugins({
    multiselect: true
});
~~~

#### 관련 자료

문서: [다중 작업 선택](guides/multiselection.md)

API: [multiselect](api/config/multiselect.md)

샘플: [다중 선택 및 들여쓰기/내어쓰기 작업](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

## 빠른 정보

작업 자세한 정보가 담긴 팝업을 제공합니다.

~~~js
gantt.plugins({
    quick_info: true
});
~~~

#### 관련 자료

문서: [빠른 정보 확장의 템플릿(터치 지원)](guides/touch-templates.md), 

[빠른 정보(터치 지원)](guides/quick-info.md)

샘플: [QuickInfo 확장 기능](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

## 도구 설명(툴팁)

화면을 넘치지 않게 사용자를 위해 추가 정보를 제공할 수 있습니다.

~~~js
gantt.plugins({
    tooltip: true
});
~~~

#### 관련 자료

문서: [간트 요소에 대한 도구 설명(툴팁)](guides/tooltips.md)

샘플: [툴팁](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)

## 실행 취소

수정된 변경사항을 실행 취소/다시 실행할 수 있습니다.

~~~js
gantt.plugins({
    undo: true
});
~~~

#### 관련 자료

문서: [실행 취소/다시 실행 기능](guides/undo-redo.md)

API: [undo](api/config/undo.md), [redo](api/config/redo.md)

샘플: [Gantt의 실행 취소/다시 실행 변경사항](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

## 수직 마커

특정 날짜나 날짜 범위를 강조합니다.

~~~js
gantt.plugins({
    marker: true
});
~~~

#### 관련 자료

문서: [수직 마커 추가](guides/markers.md)

API: [addMarker](api/method/addmarker.md),[show_markers](api/config/show_markers.md)

샘플: [오늘 날짜와 상태 선(수직 마커) in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)