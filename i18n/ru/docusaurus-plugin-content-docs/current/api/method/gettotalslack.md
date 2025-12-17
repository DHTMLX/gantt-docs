---
sidebar_label: getTotalSlack
title: getTotalSlack method
description: "возвращает общий slack для задачи"
---

# getTotalSlack
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Возвращает общий slack для задачи

@signature: getTotalSlack: (task?: Task | string | number) =\> any

### Parameters

- `task` - (optional) *Task | string | number* -        необязательный, объект задачи или её ID

### Returns
- ` total_slack` - (number | object) - возвращает общий slack задачи, или, если параметр <i>task</i> не указан, объект, сопоставляющий ID задач с их значениями общего slack

### Example

~~~jsx
var task = gantt.getTask(7);
gantt.getTotalSlack(task);

gantt.getTotalSlack(7);
~~~

### Related samples
- [Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details

:::note
 Этот метод является частью расширения **critical_path**, поэтому убедитесь, что плагин [critical_path](guides/extensions-list.md#criticalpath) включён через метод [gantt.plugins](api/method/plugins.md). Для получения дополнительной информации смотрите статью [Критический путь](guides/critical-path.md). 
:::


Общий slack представляет собой количество времени, на которое длительность задачи может быть увеличена или сдвинута по timeline без задержки общего завершения проекта.

### Related API
- [getFreeSlack](api/method/getfreeslack.md)

### Related Guides
- [Критический путь](guides/critical-path.md#gettingfreeandtotalslack)

