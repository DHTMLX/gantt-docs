---
sidebar_label: task_scroll_offset
title: task_scroll_offset 配置
description: "将时间线中离左边界最近任务的偏移量（以像素为单位）设置"
---

# task_scroll_offset

### Description

@short: 将时间线中离左边界最近任务的偏移量（以像素为单位）设置

@signature: task_scroll_offset: number

### Example

~~~jsx
gantt.config.task_scroll_offset = 120;
gantt.init("gantt_here");
~~~

**默认值：** 100