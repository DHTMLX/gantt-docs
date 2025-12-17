---
title: "Full List of Extensions"
sidebar_label: "Full List of Extensions"
---

Full List of Extensions
=========================

dhtmlxGantt includes a set of extensions which add extra functionality to the standard behavior.

To use an extension, you should activate the plugin with the help of the [gantt.plugins](api/method/plugins.md) method. 

Advanced drag-n-drop
----------------------

Provides the possibility to create and select tasks with drag-n-drop.

~~~js
gantt.plugins({
    click_drag: true
});
~~~

#### Related resources

Article: [Creating/Selecting Tasks with DnD](guides/advanced-dnd.md)


API: [click_drag](api/config/click_drag.md)


[Create new tasks by Drag and Drop](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)


## Auto scheduling {#autoscheduling}

:::note
This extension is available in PRO version only
:::

Allows you to schedule tasks automatically depending on relations between them.

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

#### Related resources

Article: [Auto Scheduling](guides/auto-scheduling.md)


API: [auto_scheduling](api/config/auto_scheduling.md)


[Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)


Critical path
-------------

:::note
This extension is available in PRO version only
:::

Presents a sequence of tasks that can't be delayed without affecting the whole project's deadline.
The critical path also determines the shortest time the project can take.

~~~js
gantt.plugins({
    critical_path: true
});
~~~

#### Related resources

Article: [Critical Path](guides/critical-path.md)


API: [highlight_critical_path](api/config/highlight_critical_path.md)


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


Drag Timeline
-------------

Allows scrolling timeline views by mouse-drag.

~~~js
gantt.plugins({
    drag_timeline: true
});
~~~

#### Related resources

API: [drag_timeline](api/config/drag_timeline.md)


[Drag timeline](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)


Extra overlay
--------------

:::note
This extension is available in the PRO version only.
:::

Provides the possibility to add an extra layer over the Gantt Chart for placing some custom content into it.

~~~js
gantt.plugins({
    overlay: true
});
~~~

#### Related resources

Article: [Custom Elements in Timeline Area](guides/baselines.md#extra-overlay-for-the-chart)


[Gantt chart with overlay and zoom (S-Curve)](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)


Export service
-----------

Provides the possibility to enable the online export service.

~~~js
gantt.plugins({
      export_api: true
});
~~~

#### Related resources

Article: [Exporting and Importing Data](guides/export-common.md)

## Full screen {#fullscreen}

Displays Gantt in the full screen mode.

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

#### Related resources

Article: [Full Screen Mode](guides/fullscreen-mode.md) 


[Full Screen](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)


Grouping
------------

:::note
This extension is available in PRO version only
:::

Allows you to group tasks by any of task attributes.

~~~js
gantt.plugins({
    grouping: true
});
~~~

#### Related resources

Article: [Grouping Tasks](guides/grouping.md)


API: [groupBy](api/method/groupby.md)


[Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)


## Keyboard navigation {#keyboardnavigation}

Allows navigating the gantt chart with the help of the keyboard.

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

#### Related resources

Article: [Accessibility](guides/accessibility.md), [Keyboard Navigation](guides/keyboard-navigation.md)


API: [keyboard_navigation](api/config/keyboard_navigation.md),[keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)


## Multitask selection {#multitaskselection}

Allows selecting multiple tasks in Gantt chart at once.

~~~js
gantt.plugins({
    multiselect: true
});
~~~

#### Related resources

Article: [Multi-Task Selection](guides/multiselection.md)


API: [multiselect](api/config/multiselect.md)


[Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)


Quick info
-----------

Provides a popup with a task details.

~~~js
gantt.plugins({
    quick_info: true
});
~~~

#### Related resources

Article: [Templates of the 'Quick Info' Extension (Touch Support)](guides/touch-templates.md), 


[Quick Info (Touch Support)](guides/quick-info.md)


[QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)


Tooltip
---------
Gives the possibility to add extra information for users without overflowing the screen with the text.

~~~js
gantt.plugins({
    tooltip: true
});
~~~

#### Related resources

Article: [Tooltips for Gantt Elements](guides/tooltips.md)


[Tooltip](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)


Undo
------

Allows you to undo/redo the made changes.

~~~js
gantt.plugins({
    undo: true
});
~~~

#### Related resources

Article: [Undo/Redo Functionality](guides/undo-redo.md)


API: [undo](api/config/undo.md), [redo](api/config/redo.md)


[Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)


Vertical marker
---------

Highlights certain dates or date ranges.

~~~js
gantt.plugins({
    marker: true
});
~~~

#### Related resources

Article: [Adding Vertical Markers](guides/markers.md)


API: [addMarker](api/method/addmarker.md),[show_markers](api/config/show_markers.md)


[Today and Status lines in Gantt (vertical markers)](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)

