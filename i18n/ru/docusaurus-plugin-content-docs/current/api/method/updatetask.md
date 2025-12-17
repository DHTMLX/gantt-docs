---
sidebar_label: updateTask
title: updateTask method
description: "обновляет указанную задачу"
---

# updateTask

### Description

@short: Обновляет указанную задачу

@signature: updateTask: (id: string | number, newState?: Task) =\> void

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `newState` - (optional) *Task* - необязательный параметр, новые значения задачи

### Example

~~~jsx
var taskId = gantt.addTask({
    id:10,
    text:"Task #10",
    start_date:"02-04-2013",
    duration:8,
    parent:1
});

gantt.getTask(taskId).text = "Task #13"; // изменяет данные задачи
gantt.updateTask(taskId); // применяет изменения и обновляет задачу
~~~

### Details

:::note
 Метод вызывает событие [onAfterTaskUpdate](api/event/onaftertaskupdate.md). 
:::
:::note
 Если включён dataProcessor, этот метод также его активирует. 
:::

Этот метод следует вызывать после внесения изменений в объект задачи. Он обновляет внутреннее состояние Gantt, обновляет соответствующие части UI и отправляет обновлённую информацию на сервер.

При вызове срабатывает событие [onAfterTaskUpdate](api/event/onaftertaskupdate.md), которое может инициировать дополнительные перерасчёты.

Если вы работаете с [DataProcessor](guides/server-side.md), вызов этого метода отправит запрос **update** на сервер.

Для визуального обновления, которое не требует сохранения, **используйте метод [refreshTask](api/method/refreshtask.md)**. Он обновит внешний вид задачи без запуска дополнительных вычислений.

~~~js
gantt.templates.task_class = function(start, end, task){
    if(task.$active) {
        return "active_task";
    }
};

gantt.attachEvent("onTaskClick", function(id,e){
    gantt.getTask(id).$active = true;
    gantt.refreshTask(id); /*!*/
});
~~~


В качестве альтернативы, можно обновить задачу, передав новый объект задачи вторым аргументом в метод **updateTask**:

~~~js
var task = {
    id: 2, text: 'New task text', 
    start_date: new Date(2025,03,02), 
    end_date: new Date(2025,03,04), 
    $source: [1], 
    $target: [2]
}
gantt.updateTask(2,task);
~~~

:::note
Sample: [Updating task](https://snippet.dhtmlx.com/fnfpoiik) 
:::

### Related API
- [updateLink](api/method/updatelink.md)
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [Интеграция с серверной стороной](guides/server-side.md#updatingdataontheserver)

