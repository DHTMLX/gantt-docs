---
sidebar_label: start_on_monday
title: start_on_monday 配置
description: "设置一周的起始日"
---

# start_on_monday

### Description

@short: 设置一周的起始日

@signature: start_on_monday: boolean

### Example

~~~jsx
// 一周从星期日开始
gantt.config.start_on_monday = false;
gantt.init("gantt_here");
~~~

**默认值：** true

### Details

如果将该参数设置为 true，则一周将从星期一开始（否则，从星期日开始）。