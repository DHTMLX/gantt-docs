Performance: Ways to Increase
==================================

Common techniques
--------------------

Starting from 200 tasks, there may be delays in rendering the Gantt chart on the page.

 
There are the following ways to solve this problem:

1. To disable the rendering of single cells and leave just rendering of rows (set the api/gantt_show_task_cells_config.md option to 'false') 
2. To set the background image for the timeline area instead of rendering the actual lines (set the api/gantt_static_background_config.md option to 'true') (**PRO** functionality)
3. To enable the dynamic loading (set the api/gantt_branch_loading_config.md option to 'true')
4. To increase the scale's step (set the **unit** property of the api/gantt_scales_config.md option to "month" or "year")
5. To decrease the range of displayable dates (use the api/gantt_start_date_config.md and api/gantt_end_date_config.md options)
6. To remove progress bars from the tasks (set the api/gantt_show_progress_config.md option to 'false')
7. To enhance the speed of the scale rendering (enable the api/gantt_smart_scales_config.md option in case it's disabled)

{{sample
08_api/10_performance_tweaks.html
}}


Smart Rendering
---------------

The Smart Rendering technique allows considerably enhancing the speed of data rendering, while working with big amounts of data. 
In this mode only the tasks and links visible on the screen at the moment are being rendered.

Starting from v6.2 the smart rendering is enabled by default, as it is included in the core *dhtmlxgantt.js* file. Thus, you don't need to include the *dhtmlxgantt_smart_rendering.js* file on the page to make smart rendering work.

{{note If you connect the *dhtmlxgantt_smart_rendering.js* file, which is from the old version, it will override the improvements of the new built-in **smart_rendering** extension.}}

If you need to disable the smart rendering mode, you can set the corresponding configuration parameter to false:

~~~js
gantt.config.smart_rendering = false;
~~~

{{sample
02_extensions/13_smart_rendering.html
}}

The process of usual smart rendering is to check whether the position of a gantt element falls within the area visible on the screen and define whether to display it or not.

However, the smart rendering of [custom layers](desktop/baselines.md) enables only the vertical Smart rendering by default. It means, that the custom layers will be rendered when the row of the specified task is in the view port. But the exact coordinates of a custom element can't be calculated and the whole row of the task in the timeline is taken as its position.<br> *You may refer to the api/gantt_addtasklayer.md#smartrenderingforcustomlayers article to learn how to enable the horizontal Smart rendering for custom layers.*



###Working with a large date range

{{pronote This functionality is available only in PRO version}}

If you use a big date range in your project, you may also want to enable the api/gantt_static_background_config.md parameter in addition to smart rendering:

~~~js
gantt.config.static_background = true;
~~~

{{sample
08_api/10_performance_tweaks.html
}}
