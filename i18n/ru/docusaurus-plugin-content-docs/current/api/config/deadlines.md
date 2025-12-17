---
sidebar_label: deadlines
title: deadlines config
description: "включает или отключает отображение элементов deadlines для задач"
---

# deadlines

### Description

@short: Включает или отключает отображение элементов deadlines для задач

@signature: deadlines: boolean

### Example

~~~jsx
gantt.config.deadlines = true;
gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

### Details

Этот параметр управляет показом элементов deadlines для задач. Когда включено, Gantt проверяет свойство `task.deadline`, и если оно содержит корректную дату, deadline отображается на timeline.

### Related Guides
- [Дополнительные элементы на временной шкале](guides/inbuilt-baselines.md)

### Change log
- добавлено в версии v9.0
