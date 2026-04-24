---
sidebar_label: getFreeSlack
title: метод getFreeSlack
description: "возвращает свободный запас времени задачи"
---

# getFreeSlack

:::info 
Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: Возвращает свободный запас времени задачи

@signature: getFreeSlack: (task: Task) =\> number

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` free_slack` - (number) - свободный запас времени задачи

### Example

~~~jsx
const task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~

### Related samples
- [Показать время резерва](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details

:::note
Этот метод определяется в расширении **critical_path**, поэтому вам нужно активировать плагин [critical_path](guides/extensions-list.md#critical-path) с помощью метода [gantt.plugins](api/method/plugins.md). Подробности см. в статье [Критический путь](guides/critical-path.md).
:::

Свободный запас времени — это период времени, который можно использовать для увеличения продолжительности задачи или переноса её на шкале времени без воздействия на следующую задачу, к которой она привязана.

### Related API
- [getTotalSlack](api/method/gettotalslack.md)

### Related Guides
- [Критический путь](guides/critical-path.md#gettingfreeandtotalslack)