---
title: "扩展功能完整列表"
sidebar_label: "扩展功能完整列表"
---

扩展功能完整列表
=========================

dhtmlxGantt 提供了多种扩展功能，用于增强基础功能。

要启用某个扩展，只需通过 [gantt.plugins](api/method/plugins.md) 方法激活相应插件。

高级拖放
----------------------

此扩展允许通过拖放来创建和选择任务。

~~~js
gantt.plugins({
    click_drag: true
});
~~~

#### 相关资源

文章: [DnD로 작업 생성/선택하기](guides/advanced-dnd.md)


API: [click_drag](api/config/click_drag.md)


[Create new tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)


自动排程
----------------

:::note
此扩展仅在 PRO 版本中可用
:::

该功能会根据任务之间的依赖关系自动进行任务排程。

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

#### 相关资源

文章: [자동 스케줄링](guides/auto-scheduling.md)


API: [auto_scheduling](api/config/auto_scheduling.md)


[Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)


关键路径
-------------

:::note
此扩展仅在 PRO 版本中可用
:::

显示必须按时完成以避免项目整体延期的任务序列，同时展示项目的最短工期。

~~~js
gantt.plugins({
    critical_path: true
});
~~~

#### 相关资源

文章: [Critical Path](guides/critical-path.md)


API: [highlight_critical_path](api/config/highlight_critical_path.md)


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


拖动时间轴
-------------

允许通过鼠标拖动来滚动时间轴视图。

~~~js
gantt.plugins({
    drag_timeline: true
});
~~~

#### 相关资源

API: [drag_timeline](api/config/drag_timeline.md)


[Drag timeline](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)


额外覆盖层
--------------

:::note
此扩展仅在 PRO 版本中可用。
:::

允许在甘特图上添加额外的图层以放置自定义内容。

~~~js
gantt.plugins({
    overlay: true
});
~~~

#### 相关资源

文章: [타임라인 영역의 커스텀 요소](guides/baselines.md)


[Gantt chart with overlay and zoom (S-Curve)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)


导出服务
-----------

启用在线导出服务。

~~~js
gantt.plugins({
      export_api: true
});
~~~

#### 相关资源

文章: [데이터 내보내기 및 가져오기](guides/export-common.md)

全屏显示
-----------

以全屏模式显示甘特图。

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

#### 相关资源

文章: [전체 화면 모드](guides/fullscreen-mode.md) 


[Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)


任务分组
------------

:::note
此扩展仅在 PRO 版本中可用
:::

支持按任意任务属性对任务进行分组。

~~~js
gantt.plugins({
    grouping: true
});
~~~

#### 相关资源

文章: [작업 그룹화](guides/grouping.md)


API: [groupBy](api/method/groupby.md)


[Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)


键盘导航
------------------
支持在甘特图中通过键盘进行导航。

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

#### 相关资源

文章: [접근성](guides/accessibility.md), [키보드 내비게이션](guides/keyboard-navigation.md)


API: [keyboard_navigation](api/config/keyboard_navigation.md),[keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)


多任务选择
-------------------

支持在甘特图中同时选择多个任务。

~~~js
gantt.plugins({
    multiselect: true
});
~~~

#### 相关资源

文章: [멀티 태스크 선택](guides/multiselection.md)


API: [multiselect](api/config/multiselect.md)


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


快速信息
-----------

弹出显示任务详情。

~~~js
gantt.plugins({
    quick_info: true
});
~~~

#### 相关资源

文章: ['Quick Info' 확장(터치 지원)의 템플릿](guides/touch-templates.md), 


[퀵 인포 (터치 지원)](guides/quick-info.md)


[QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)


工具提示
---------
为用户提供补充信息，而不会干扰界面显示。

~~~js
gantt.plugins({
    tooltip: true
});
~~~

#### 相关资源

文章: [Gantt 요소의 툴팁](guides/tooltips.md)


[Tooltip](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)


撤销
------

为所做更改提供撤销和重做功能。

~~~js
gantt.plugins({
    undo: true
});
~~~

#### 相关资源

文章: [Undo/Redo 기능](guides/undo-redo.md)


API: [undo](api/config/undo.md), [redo](api/config/redo.md)


[Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)


垂直标记
---------

高亮显示特定日期或日期范围。

~~~js
gantt.plugins({
    marker: true
});
~~~

#### 相关资源

文章: [수직 마커 추가하기](guides/markers.md)


API: [addMarker](api/method/addmarker.md),[show_markers](api/config/show_markers.md)


[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

