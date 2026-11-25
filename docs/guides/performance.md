---
title: "Performance: Ways to Improve"
sidebar_label: "Performance: Ways to Improve"
---

# Performance: Ways to Improve

## Common techniques

DHTMLX Gantt supports large datasets. Published performance measurements for datasets of up to 100,000 tasks are available in the [JavaScript Gantt benchmarks](https://github.com/DHTMLX/js-gantt-benchmarks). To see Gantt with a large dataset, open the [large dataset demo](https://docs.dhtmlx.com/gantt/demos/large-dataset-performance/).

Performance in an application depends on its configuration, task dependencies, calendars, custom rendering, browser, and hardware. Measure server response and data transfer separately from client-side rendering and scheduling.

Keep [smart rendering](#smart-rendering) (rendering virtualization) enabled when working with large datasets. If an operation is slow in your application, measure it and apply the relevant techniques below:

1. To set the background image for the timeline area instead of rendering the actual lines 
(set the [static_background](api/config/static_background.md) option to 'true'; cells with custom CSS classes are still rendered as cells) (**PRO** functionality, [read the details below](#working-with-a-large-date-range))
2. To reduce the initial data transfer and browser memory use when only some branches are needed, use [dynamic loading](guides/dynamic-loading.md) (set the [branch_loading](api/config/branch_loading.md) option to 'true', **PRO** functionality)
3. To use a coarser time scale (set the **unit** property of the [scales](api/config/scales.md) option to "month" or "year", or increase its **step**)
4. To decrease the range of displayable dates (use the [start_date](api/config/start_date.md) and [end_date](api/config/end_date.md) options)
5. To enhance the speed of the scale rendering (enable the [smart_scales](api/config/smart_scales.md) option in case it's disabled)
6. If you use [work time calendars](guides/working-time.md), be sure to set the worktime settings before loading data into the gantt. If you change the worktime settings after loading, the durations of the affected tasks must be recalculated. This may not happen automatically, so your code may need to do it ([see how](guides/working-time.md#changing-calendar-dynamically)). Such recalculations may increase the initialization time of your app.
7. If you specify the [duration_unit](api/config/duration_unit.md) config to "hour" or "minute", be sure to set the [duration_step](api/config/duration_step.md) to 1. Such combination activates certain optimizations for calculations of working time, that works only when the step is set to 1. Note, that there are major performance differences between "optimized" and "non-optimized" modes.
8. To apply multiple task or link changes with a single repaint, use [batchUpdate](api/method/batchupdate.md).
9. To keep smart rendering effective, do not enable the [autosize](api/config/autosize.md) option for large charts. In the autosize mode, Gantt increases its container to show all tasks, so all rows are in the visible area and all of them are rendered.
10. To avoid extra repaints, enable [highlight_critical_path](api/config/highlight_critical_path.md) only when users need to see the [critical path](guides/critical-path.md). While this option is enabled, each change of a task or link repaints the whole chart.
11. To reduce the rendering work in the timeline, remove the [custom layers](guides/baselines.md) that you do not need, especially layers that are redrawn often.
12. To reduce the work done on each change, check the custom code that runs in Gantt event handlers and templates. For example, if your code calculates the progress of projects, recalculate it only when the progress of a task changes, not on every update or repaint. The same applies to the data that custom layers show.


**Related sample**: [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)


## Smart Rendering

Smart rendering is DHTMLX Gantt's implementation of rendering virtualization. It improves performance with large datasets by rendering only the tasks and links visible in the viewport, while keeping all loaded data available.

Starting from v6.2, the smart rendering is enabled by default, as it is included in the core *dhtmlxgantt.js* file. Thus, you don't need to include the *dhtmlxgantt_smart_rendering.js* file on the page to make smart rendering work.

:::note
If you connect the *dhtmlxgantt_smart_rendering.js* file, which is from the old version, it will override the improvements of the new built-in **smart_rendering** extension.
:::

If you need to disable the smart rendering mode, you can set the corresponding configuration parameter to false:

~~~js
gantt.config.smart_rendering = false;
~~~


**Related sample**: [Working with 30000 tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)


The smart rendering of [custom layers](guides/baselines.md) enables only the vertical Smart rendering by default. It means, that the custom layers will be rendered when the row of the specified task is in the view port. But the exact coordinates of a custom element can't be calculated and the whole row of the task in the timeline is taken as its position.

 *You may refer to the [addTaskLayer](api/method/addtasklayer.md#smart-rendering-for-custom-layers) article to learn how to enable the horizontal Smart rendering for custom layers.*


### Working with a large date range

:::note
This functionality is available only in PRO version
:::

If you use a big date range in your project, 
you can enable the [static_background](api/config/static_background.md) parameter in addition to smart rendering
to set the background image for the timeline area instead of rendering the actual lines. The option is disabled by default.

~~~js
gantt.config.static_background = true;
~~~

In this mode, the cells that get a CSS class or content from the [timeline_cell_class](api/template/timeline_cell_class.md) or [timeline_cell_content](api/template/timeline_cell_content.md) templates are still rendered as cells over the background image. For this, the [show_task_cells](api/config/show_task_cells.md) and [static_background_cells](api/config/static_background_cells.md) options must be enabled (they are enabled by default).

Starting from v6.3, smart rendering renders only the cells in the visible part of the timeline, so the effect of this option is smaller than in earlier versions. The option also decreases the size of the request to the export server when you export data.

