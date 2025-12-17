---
sidebar_label: onBeforeSplitTaskDisplay
title: onBeforeSplitTaskDisplay event
description: "срабатывает непосредственно перед отображением сегмента разбитой задачи на диаграмме Ганта"
---

# onBeforeSplitTaskDisplay

### Description

@short: Срабатывает непосредственно перед отображением сегмента разбитой задачи на диаграмме Ганта

@signature: onBeforeSplitTaskDisplay: (id: number | string, task: Task, parent: any) =\> boolean;

### Parameters

- `id` - (required) *number | string* - идентификатор подзадачи
- `task` - (required) *Task* - объект подзадачи
- `parent` - (required) *object* - объект родительской задачи

### Returns
- ` result` - (boolean) - указывает, должна ли подзадача разбитой задачи отображаться на странице (<b>true</b>) или быть скрытой (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeSplitTaskDisplay", function (id, task, parent) {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

### Details

![split tasks](/img/split_tasks.png)

При отрисовке разбитой задачи сначала срабатывает событие [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) для родительской задачи (той, у которой *render:"split"*). Сразу после этого вызывается "onBeforeSplitTaskDisplay" для каждой из её подзадач. Если из "onBeforeSplitTaskDisplay" вернуть *false*, то соответствующая подзадача не будет отображена.

:::note
Sample: [Фильтрация split задач](https://snippet.dhtmlx.com/3q1yd7iz) 
:::

### Related Guides
- [Разделение задач](guides/split-tasks.md)

### Change log
- добавлено в версии v8.0

