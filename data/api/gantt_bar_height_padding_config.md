bar_height_padding
=============

@short: adjusts the padding around task bars in the timeline when `bar_height` is set to "full"

@type: number
@default: 9
@example:
gantt.config.bar_height_padding = 5;
gantt.init("gantt_here");

@template: api_config
@descr:
The `bar_height_padding` config defines the vertical padding for task bars in the timeline when `gantt.config.bar_height` is set to "full". The height of a task bar is calculated as `gantt.config.row_height - gantt.config.bar_height_padding`. 

- Setting this config to `0` will make the task bars occupy the full height of the row.
- Increasing the value adds more space above and below the bars.

The example below shows a smaller padding value, which leaves less space around the task bars:

~~~js
gantt.config.bar_height_padding = 3;
~~~

<img src="api/bar_height_padding_small.png">

In this example, a larger padding value leaves more empty space above and below the task bars:

~~~js
gantt.config.bar_height_padding = 14;
~~~

<img src="api/bar_height_padding_large.png">

@relatedapi:
api/gantt_bar_height_config.md
api/gantt_row_height_config.md

@changelog: added in v9.0