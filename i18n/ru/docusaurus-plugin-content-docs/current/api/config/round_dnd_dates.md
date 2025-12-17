---
sidebar_label: round_dnd_dates
title: round_dnd_dates config
description: "позволяет округлять даты начала и окончания задачи до ближайших отметок шкалы"
---

# round_dnd_dates

### Description

@short: Позволяет округлять даты начала и окончания задачи до ближайших отметок шкалы

@signature: round_dnd_dates: boolean

### Example

~~~jsx
gantt.config.round_dnd_dates = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Когда это свойство отключено, Gantt будет округлять даты начала и окончания перетаскиваемой задачи до ближайшего часа, а не до ближайших отметок шкалы. В этом режиме можно использовать свойство [time_step](api/config/time_step.md) для задания шага перетаскивания задач. Пример:

:::note
Sample: [Gantt. Drag'n'drop задач с минимальным шагом](https://snippet.dhtmlx.com/bd7ir3w7) 
:::

