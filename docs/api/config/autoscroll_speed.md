---
sidebar_label: autoscroll_speed
title: autoscroll_speed config
description: "defines the speed of autoscrolling (in ms) while dragging a task or link out of the current browser screen"
---

# autoscroll_speed

### Description

@short: Defines the speed of autoscrolling (in ms) while dragging a task or link out of the current browser screen

@signature: autoscroll_speed: number

### Example

~~~jsx
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;

gantt.init("gantt_here");
~~~

**Default value:** 30


### Details

added in version 4.2

The "autoscroll" functionality is enabled by the [autoscroll](api/config/autoscroll.md) option.

### Related API
- [autoscroll](api/config/autoscroll.md)

