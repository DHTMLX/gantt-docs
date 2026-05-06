---
sidebar_label: deadlines
title: deadlines config
description: "включает или отключает отображение элементов deadlines для задач"
---

# deadlines

### Description

@short: Включает или отключает отображение элементов дедлайна для задач

@signature: deadlines: boolean

### Example

~~~jsx
gantt.config.deadlines = true;
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true

### Related samples
- [Отображение дедлайнов](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

### Details

Эта конфигурация включает или выключает отображение элементов дедлайна для задач. Если включено, Gantt будет проверять свойство `task.deadline`, и если оно содержит действительную дату, элемент дедлайна будет отображаться на временной шкале.

### Related Guides
- [Дополнительные элементы на временной шкале](guides/inbuilt-baselines.md)

### Change log
- добавлено в v9.0