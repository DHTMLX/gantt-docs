Performance: Ways to Increase
==================================
Starting from 200 tasks, there may be delays in rendering the Gantt chart on the page.

 
There are the following ways to solve this problem:

1. To disable the rendering of single cells and leave just rendering of rows (set the api/gantt_show_task_cells_config.md option to 'false') 
2. To set the background image for the timeline area instead of rendering the actual lines (set the api/gantt_static_background_config.md option to 'true')
1. To enable the dynamic loading (set the api/gantt_branch_loading_config.md option to 'true')
2. To increase the scale's step (set the api/gantt_scale_unit_config.md to "month" or "year")
3. To decrease the range of displayable dates (use the api/gantt_start_date_config.md and api/gantt_start_date_config.md options)
4. To remove progress bars from the tasks (set the api/gantt_show_progress_config.md option to 'false')


{{sample
08_api/10_performance_tweaks.html
}}

@edition: pro