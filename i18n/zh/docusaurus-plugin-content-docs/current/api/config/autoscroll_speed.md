---
sidebar_label: autoscroll_speed
title: autoscroll_speed config
description: "在拖动任务或链接离开当前浏览器屏幕时，定义 autoscroll_speed 的滚动速度（单位：毫秒）"
---

# autoscroll_speed

### Description

@short: 在拖动任务或链接离开当前浏览器屏幕时，定义 autoscroll_speed 的滚动速度（单位：毫秒）

@signature: autoscroll_speed: number

### Example

~~~jsx
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;

gantt.init("gantt_here");
~~~

**默认值：** 30

### Details

在版本 4.2 中添加

“autoscroll” 功能由 [autoscroll](api/config/autoscroll.md) 选项启用。

### Related API
- [autoscroll](api/config/autoscroll.md)