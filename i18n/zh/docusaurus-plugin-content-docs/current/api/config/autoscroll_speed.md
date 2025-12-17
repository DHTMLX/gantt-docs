---
sidebar_label: autoscroll_speed
title: autoscroll_speed config
description: "定义当拖动任务或链接超出当前浏览器视图时，自动滚动的速度（以毫秒为单位）"
---

# autoscroll_speed

### Description

@short: 定义当拖动任务或链接超出当前浏览器视图时，自动滚动的速度（以毫秒为单位）

@signature: autoscroll_speed: number

### Example

~~~jsx
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;

gantt.init("gantt_here");
~~~

**Default value:** 30

### Details

此功能自版本 4.2 引入

"autoscroll"功能通过 [autoscroll](api/config/autoscroll.md) 选项进行控制。

### Related API
- [autoscroll](api/config/autoscroll.md)

