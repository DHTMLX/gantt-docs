---
sidebar_label: getTotalSlack
title: getTotalSlack method
description: "возвращает общий запас времени задачи"
---

# getTotalSlack

:::info
 Эта функция доступна только в PRO-версии. 
:::

### Description

@short: Возвращает общий запас времени задачи

@signature: getTotalSlack: (task?: Task | string | number) =\> any

### Parameters

- `task`-	(необязательный) *Task | string | number*	-	необязательный объект задачи или его идентификатор

### Returns
- ` total_slack` - (число | объект) - либо общий запас времени задачи, или, если параметр <i>task</i> не указан, объект, состоящий из пар ключ:значение, где ключ — идентификатор задачи, а значение — ее общий запас времени

### Example

~~~jsx
var task = gantt.getTask(7);
gantt.getTotalSlack(task);

gantt.getTotalSlack(7);
~~~

### Related samples
- [Показать запас времени](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details

:::note
Этот метод определен в расширении **critical_path**, поэтому вам нужно активировать плагин [critical_path](guides/extensions-list.md#critical-path) с использованием метода [gantt.plugins](api/method/plugins.md). Подробности смотрите в статье [Critical Path](guides/critical-path.md).
:::


Общий запас времени — это период времени, который можно использовать для увеличения продолжительности задачи или перемещения её на временной шкале без влияния на время завершения всего проекта.

### Related API
- [getFreeSlack](api/method/getfreeslack.md)

### Related Guides
- [Critical Path](guides/critical-path.md#gettingfreeandtotalslack)