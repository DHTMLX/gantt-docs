Performance: Ways to Increase
==================================

Common techniques
--------------------

Starting from 200 tasks, there may be delays in rendering the Gantt chart on the page.

 
There are the following ways to solve this problem:

1. To disable the rendering of single cells and leave just rendering of rows (set the api/gantt_show_task_cells_config.md option to 'false') 
2. To set the background image for the timeline area instead of rendering the actual lines (set the api/gantt_static_background_config.md option to 'true') (**PRO** functionality)
1. To enable the dynamic loading (set the api/gantt_branch_loading_config.md option to 'true')
2. To increase the scale's step (set the api/gantt_scale_unit_config.md to "month" or "year")
3. To decrease the range of displayable dates (use the api/gantt_start_date_config.md and api/gantt_start_date_config.md options)
4. To remove progress bars from the tasks (set the api/gantt_show_progress_config.md option to 'false')


{{sample
08_api/10_performance_tweaks.html
}}


Smart Rendering
----------------

The Smart Rendering technique allows considerably enhancing the speed of data rendering, while working with big amounts of data. 
In this mode only the tasks and links visible on the screen at the moment are being rendered.

To enable Smart Rendering, you need to include the **ext/dhtmlxgantt_smart_rendering.js** extension on the page:

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
   <script src="codebase/ext/dhtmlxgantt_smart_rendering.js"></script>  /*!*/
</head>
<body>
    // your code here
</body>
</html>
~~~

Including the extension on the page is enough to activate the mode. If you need to disable the mode, you can set the corresponding configuration parameter to false:

~~~js
gantt.config.smart_rendering = false;
~~~

{{sample
02_extensions/13_smart_rendering.html
}}

###Working with a large date range

{{pronote This functionality is available only in PRO version}}

If you use a big date range in your project, you may also want to enable the api/gantt_static_background_config.md parameter in addition to smart rendering:

~~~js
gantt.config.static_background = true;
~~~

{{sample
08_api/10_performance_tweaks.html
}}

