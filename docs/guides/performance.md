---
title: "Performance: Ways to Improve"
sidebar_label: "Performance: Ways to Improve"
---

# Performance: Ways to Improve

## Common techniques

Starting from 10000-20000 tasks, depending on what configuration options and plugins you use, there may be delays in rendering the Gantt chart on the page.

 
There are the following ways to solve this problem:

1. To disable the rendering of single cells and leave just rendering of rows (set the [show_task_cells](api/config/show_task_cells.md) option to 'false') 
2. To set the background image for the timeline area instead of rendering the actual lines 
(set the [static_background](api/config/static_background.md) option to 'true') (**PRO** functionality, for versions before v6.3, [read the details below](#working-with-a-large-date-range))
3. To enable the dynamic loading (set the [branch_loading](api/config/branch_loading.md) option to 'true')
4. To increase the scale's step (set the **unit** property of the [scales](api/config/scales.md) option to "month" or "year")
5. To decrease the range of displayable dates (use the [start_date](api/config/start_date.md) and [end_date](api/config/end_date.md) options)
6. To remove progress bars from the tasks (set the [show_progress](api/config/show_progress.md) option to 'false')
7. To enhance the speed of the scale rendering (enable the [smart_scales](api/config/smart_scales.md) option in case it's disabled)
8. If you use [work time calendars](guides/working-time.md), be sure to set the worktime settings before loading data into the gantt. Otherwise, durations of all tasks will be recalculated twice - firstly, when the tasks are loaded, and then, when the new calendar is applied. In any case, everything should work correctly, but such recalculations may increase the initialization time of your app.
9. If you specify the [duration_unit](api/config/duration_unit.md) config to "hour" or "minute", be sure to set the [duration_step](api/config/duration_step.md) to 1. Such combination activates certain optimizations for calculations of working time, that works only when the step is set to 1. Note, that there are major performance differences between "optimized" and "non-optimized" modes.


**Related sample**: [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)


## Smart Rendering

The Smart Rendering technique allows considerably enhancing the speed of data rendering, while working with big amounts of data. 
In this mode only the tasks and links visible on the screen at the moment are being rendered.

Starting from v6.2, the smart rendering is enabled by default, as it is included in the core *dhtmlxgantt.js* file. Thus, you don't need to include the *dhtmlxgantt_smart_rendering.js* file on the page to make smart rendering work.

:::note
If you connect the *dhtmlxgantt_smart_rendering.js* file, which is from the old version, it will override the improvements of the new built-in **smart_rendering** extension.
:::

If you need to disable the smart rendering mode, you can set the corresponding configuration parameter to false:

~~~js
gantt.config.smart_rendering = false;
~~~


**Related sample**: [Working with 30000 tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)


The process of usual smart rendering is to check whether the position of a gantt element falls within the area visible on the screen and define whether to display it or not.

However, the smart rendering of [custom layers](guides/baselines.md) enables only the vertical Smart rendering by default. It means, that the custom layers will be rendered when the row of the specified task is in the view port. But the exact coordinates of a custom element can't be calculated and the whole row of the task in the timeline is taken as its position.

 *You may refer to the [addTaskLayer](api/method/addtasklayer.md#smart-rendering-for-custom-layers) article to learn how to enable the horizontal Smart rendering for custom layers.*


### Working with a large date range

:::note
This functionality is available only in PRO version
:::

If you use a big date range in your project and the Gantt version before v6.3, 
you can enable the [static_background](api/config/static_background.md) parameter in addition to smart rendering
to set the background image for the timeline area instead of rendering the actual lines. 

~~~js
gantt.config.static_background = true;
~~~

For Gantt versions above v6.3, this configuration option is useful only if you want to decrease the size of request to the export server when you export data.

