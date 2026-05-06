---
sidebar_label: onBeforeSplitTaskDisplay
title: событие onBeforeSplitTaskDisplay
description: "срабатывает перед отображением части разделенной задачи на диаграмме Ганта"
---

# onBeforeSplitTaskDisplay

### Description

@short: Срабатывает перед тем, как часть разделенной задачи будет отображаться на диаграмме Ганта

@signature: onBeforeSplitTaskDisplay: (id: number | string, task: Task, parent: any) =\> boolean;

### Parameters

- `id` - (required) *number | string* - идентификатор подзадачи
- `task` - (required) *Task* - объект подзадачи
- `parent` - (required) *object* - объект родительской задачи

### Returns
- `result` - (boolean) - определяет, будет ли отображаться подзадача разделяемой задачи на странице (<b>true</b>) или нет (<b>false</b>)

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

![разделенные задачи](/img/split_tasks.png)

Когда разделенная задача отрисовывается, сначала вызывается событие [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) для родительского элемента (задача с *render:"split"*). Затем для каждой подзадачи вызывается событие "onBeforeSplitTaskDisplay". Возврат *false* из "onBeforeSplitTaskDisplay" предотвращает отображение подзадачи.

:::note
пример: [Фильтр разделённых задач](https://snippet.dhtmlx.com/3q1yd7iz)
:::

### Related Guides
- [Разделённые задачи](/guides/split-tasks/)

### Change log
- добавлено в v8.0