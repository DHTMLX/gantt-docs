---
sidebar_label: start_on_monday
title: start_on_monday config
description: "устанавливает начальный день недели"
---

# start_on_monday

### Description

@short: Задает начальный день недели

@signature: start_on_monday: boolean

### Example

~~~jsx
// weeks start from Sunday
gantt.config.start_on_monday = false;
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true

### Details

Если параметр установлен в true, неделя будет начинаться с понедельника (в противном случае — с воскресенья).