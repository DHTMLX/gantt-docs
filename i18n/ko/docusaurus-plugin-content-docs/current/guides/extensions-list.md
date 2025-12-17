---
title: "확장 기능 전체 목록"
sidebar_label: "확장 기능 전체 목록"
---

확장 기능 전체 목록
=========================

dhtmlxGantt는 기본 기능을 확장하는 다양한 확장 기능(Extensions)을 제공합니다.

확장 기능을 활성화하려면 [gantt.plugins](api/method/plugins.md) 메서드를 사용하여 플러그인을 활성화하면 됩니다.

## 고급 드래그 앤 드롭 {#advanceddragndrop}
----------------------

이 확장 기능을 사용하면 드래그 앤 드롭을 통해 작업을 생성하고 선택할 수 있습니다.

~~~js
gantt.plugins({
    click_drag: true
});
~~~

#### 관련 자료

Article: [DnD로 작업 생성/선택하기](guides/advanced-dnd.md)


API: [click_drag](api/config/click_drag.md)




[Create new tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)


## 자동 스케줄링 {#autoscheduling}
----------------

:::info
이 확장 기능은 PRO 버전에서만 사용할 수 있습니다
:::

이 기능은 작업 간의 관계를 기반으로 작업을 자동으로 스케줄링합니다.

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

#### 관련 자료

Article: [자동 스케줄링](guides/auto-scheduling.md)


API: [auto_scheduling](api/config/auto_scheduling.md)




[Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)



## 주요 경로(Critical path) {#criticalpath}
-------------

:::info
이 확장 기능은 PRO 버전에서만 사용할 수 있습니다
:::

프로젝트 전체가 지연되지 않으려면 반드시 제시간에 완료되어야 하는 작업의 순서를 표시합니다. 또한 프로젝트의 최단 소요 기간도 보여줍니다.

~~~js
gantt.plugins({
    critical_path: true
});
~~~

#### 관련 자료

Article: [Critical Path](guides/critical-path.md)


API: [highlight_critical_path](api/config/highlight_critical_path.md)




[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)



## 타임라인 드래그 {#dragtimeline}
-------------

마우스를 드래그하여 타임라인 뷰를 스크롤할 수 있게 해줍니다.

~~~js
gantt.plugins({
    drag_timeline: true
});
~~~

#### 관련 자료

API: [drag_timeline](api/config/drag_timeline.md)




[Drag timeline](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)



## 추가 오버레이 {#extraoverlay}
--------------

:::info
이 확장 기능은 PRO 버전에서만 사용할 수 있습니다.
:::

Gantt 차트 위에 추가 레이어를 추가하여 사용자 지정 콘텐츠를 배치할 수 있습니다.

~~~js
gantt.plugins({
    overlay: true
});
~~~

#### 관련 자료

Article: [타임라인 영역의 커스텀 요소](guides/baselines.md#extraoverlayforthechart)


[Gantt chart with overlay and zoom (S-Curve)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)


## 내보내기 서비스 {#exportservice}
-----------

온라인 내보내기(export) 서비스를 사용할 수 있습니다.

~~~js
gantt.plugins({
      export_api: true
});
~~~

#### 관련 자료

Article: [데이터 내보내기 및 가져오기](guides/export-common.md)

## 전체 화면 {#fullscreen}
-----------

Gantt 차트를 전체 화면 모드로 표시합니다.

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

#### 관련 자료

Article: [전체 화면 모드](guides/fullscreen-mode.md) 




[Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)


## 그룹화 {#grouping}
------------

:::info
이 확장 기능은 PRO 버전에서만 사용할 수 있습니다
:::

작업 속성에 따라 작업을 그룹화할 수 있습니다.

~~~js
gantt.plugins({
    grouping: true
});
~~~

#### 관련 자료

Article: [작업 그룹화](guides/grouping.md)


API: [groupBy](api/method/groupby.md)




[Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)


## 키보드 내비게이션 {#keyboardnavigation}
------------------
Gantt 차트 내에서 키보드를 사용해 이동할 수 있습니다.

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

#### 관련 자료

Article: [접근성](guides/accessibility.md#keyboardnavigation), [키보드 내비게이션](guides/keyboard-navigation.md)


API: [keyboard_navigation](api/config/keyboard_navigation.md),[keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)





## 다중 작업 선택 {#multitaskselection}
-------------------

Gantt 차트에서 여러 작업을 동시에 선택할 수 있습니다.

~~~js
gantt.plugins({
    multiselect: true
});
~~~

#### 관련 자료

Article: [멀티 태스크 선택](guides/multiselection.md)


API: [multiselect](api/config/multiselect.md)




[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)



## 빠른 정보(Quick info) {#quickinfo}
-----------

작업의 세부 정보를 팝업으로 표시합니다.

~~~js
gantt.plugins({
    quick_info: true
});
~~~

#### 관련 자료

Article: ['Quick Info' 확장(터치 지원)의 템플릿](guides/touch-templates.md), 


[퀵 인포 (터치 지원)](guides/quick-info.md)


[QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)



## 툴팁 {#tooltip}
---------
화면을 복잡하게 만들지 않고도 사용자에게 추가 정보를 제공합니다.

~~~js
gantt.plugins({
    tooltip: true
});
~~~

#### 관련 자료

Article: [Gantt 요소의 툴팁](guides/tooltips.md)




[Tooltip](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)


## 실행 취소(Undo) {#undo}
------

변경 사항에 대한 실행 취소 및 다시 실행 기능을 제공합니다.

~~~js
gantt.plugins({
    undo: true
});
~~~

#### 관련 자료

Article: [Undo/Redo 기능](guides/undo-redo.md)


API: [undo](api/config/undo.md), [redo](api/config/redo.md)




[Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)


## 수직 마커 {#verticalmarker}
---------

특정 날짜 또는 날짜 범위를 강조 표시합니다.

~~~js
gantt.plugins({
    marker: true
});
~~~

#### 관련 자료

Article: [수직 마커 추가하기](guides/markers.md)


API: [addMarker](api/method/addmarker.md),[show_markers](api/config/show_markers.md)




[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

