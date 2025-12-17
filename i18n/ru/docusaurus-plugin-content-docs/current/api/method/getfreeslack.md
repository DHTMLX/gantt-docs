---
sidebar_label: getFreeSlack
title: getFreeSlack method
description: "возвращает свободный запас времени задачи"
---

# getFreeSlack
:::info
 Эта функция доступна только в PRO-версии. 
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
- [Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)

### Details

:::note
 Этот метод является частью расширения **critical_path**, поэтому убедитесь, что плагин [critical_path](guides/extensions-list.md#criticalpath) включен с помощью метода [gantt.plugins](api/method/plugins.md). Подробнее об этом можно прочитать в статье [Критический путь](guides/critical-path.md). 
:::

Свободный запас времени (free slack) - это количество времени, которое можно добавить к длительности задачи или сдвинуть её по таймлайну без влияния на последующие связанные задачи.

### Related API
- [getTotalSlack](api/method/gettotalslack.md)

### Related Guides
- [Критический путь](guides/critical-path.md#gettingfreeandtotalslack)

