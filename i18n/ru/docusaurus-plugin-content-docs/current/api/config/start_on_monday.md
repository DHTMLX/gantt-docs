---
sidebar_label: start_on_monday
title: start_on_monday config
description: "устанавливает первый день недели"
---

# start_on_monday

### Description

@short: Устанавливает первый день недели

@signature: start_on_monday: boolean

### Example

~~~jsx
// недели начинаются с воскресенья
gantt.config.start_on_monday = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Когда эта опция включена (<i>true</i>), неделя начинается с понедельника. Если опция отключена, неделя будет начинаться с воскресенья.
