---
sidebar_label: bar_height_padding
title: bar_height_padding config
description: "控制当 `bar_height` 设置为 'full' 时，时间轴中任务条周围的间距"
---

# bar_height_padding

### Description

@short: 控制当 `bar_height` 设置为 "full" 时，时间轴中任务条周围的间距

@signature: bar_height_padding: number

### Example

~~~jsx
gantt.config.bar_height_padding = 5;
gantt.init("gantt_here");
~~~

**Default value:** 9

### Details

当 `gantt.config.bar_height` 设置为 "full" 时，`bar_height_padding` 用于调整时间轴中任务条上下的垂直间距。每个任务条的高度计算方式为 `gantt.config.row_height - gantt.config.bar_height_padding`。

- 设置为 `0` 时，任务条会填满整行的高度。
- 增大该值会在任务条上下增加更多的空白空间。

下面的示例中，使用了较小的 padding 值，任务条周围的空白较少:

~~~js
gantt.config.bar_height_padding = 3;
~~~

![bar_height_padding_small](/img/bar_height_padding_small.png)

在这个示例中，较大的 padding 值使任务条上下有更多的空白空间:

~~~js
gantt.config.bar_height_padding = 14;
~~~

![bar_height_padding_large](/img/bar_height_padding_large.png)

### Related API
- [bar_height](api/config/bar_height.md)
- [row_height](api/config/row_height.md)

### Change log
- added in v9.0

