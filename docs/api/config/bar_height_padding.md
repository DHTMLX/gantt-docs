---
sidebar_label: bar_height_padding
title: bar_height_padding config
description: "adjusts the padding around task bars in the timeline when `bar_height` is set to 'full'"
---

# bar_height_padding

### Description

@short: Adjusts the padding around task bars in the timeline when `bar_height` is set to "full"

@signature: bar_height_padding: number

### Example

~~~jsx
gantt.config.bar_height_padding = 5;
gantt.init("gantt_here");
~~~

**Default value:** 9

### Details

The `bar_height_padding` config defines the vertical padding for task bars in the timeline when `gantt.config.bar_height` is set to "full". The height of a task bar is calculated as `gantt.config.row_height - gantt.config.bar_height_padding`. 

- Setting this config to `0` will make the task bars occupy the full height of the row.
- Increasing the value adds more space above and below the bars.

The example below shows a smaller padding value, which leaves less space around the task bars:

~~~js
gantt.config.bar_height_padding = 3;
~~~

![bar_height_padding_small](/img/bar_height_padding_small.png)

In this example, a larger padding value leaves more empty space above and below the task bars:

~~~js
gantt.config.bar_height_padding = 14;
~~~

![bar_height_padding_large](/img/bar_height_padding_large.png)

### Related API
- [bar_height](api/config/bar_height.md)
- [row_height](api/config/row_height.md)

### Change log
- added in v9.0

