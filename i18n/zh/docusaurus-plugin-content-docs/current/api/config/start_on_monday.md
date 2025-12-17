---
sidebar_label: start_on_monday
title: start_on_monday config
description: "设置一周的起始天"
---

# start_on_monday

### Description

@short: 设置一周的起始天

@signature: start_on_monday: boolean

### Example

~~~jsx
// 一周从星期日开始
gantt.config.start_on_monday = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

当此选项启用（<i>true</i>）时，一周从星期一开始。如果禁用，则一周从星期日开始。
