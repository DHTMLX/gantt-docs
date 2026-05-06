---
sidebar_label: round_dnd_dates
title: конфигурация round_dnd_dates
description: "включает округление начальных и конечных дат задачи до ближайших делений шкалы"
---

# round_dnd_dates

### Description

@short: Включает округление начальных и конечных дат задачи до ближайших делений шкалы

@signature: round_dnd_dates: boolean

### Example

~~~jsx
gantt.config.round_dnd_dates = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Если вы отключите данное свойство, Gantt будет округлять начальные и конечные даты перетаскиваемой задачи до ближайшего часа, а не до ближайших делений шкалы. В этом случае вы можете использовать свойство [time_step](api/config/time_step.md) для настройки шага перетаскивания задачи. См. пример:

:::note
sample: [Gantt. Перетаскивание задач с минимальным шагом](https://snippet.dhtmlx.com/bd7ir3w7)
:::