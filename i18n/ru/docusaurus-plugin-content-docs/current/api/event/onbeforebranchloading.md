---
sidebar_label: onBeforeBranchLoading
title: onBeforeBranchLoading event
description: "Когда включена динамическая загрузка, это событие срабатывает сразу после того, как пользователь раскрывает ветку задачи, но до начала процесса загрузки."
---

# onBeforeBranchLoading

### Description

@short: Когда включена динамическая загрузка, это событие срабатывает сразу после того, как пользователь раскрывает ветку задачи, но до начала процесса загрузки.

@signature: onBeforeBranchLoading: (settings: any) =\> boolean;

### Parameters

- `settings` - (required) *object* - содержит ID задачи и URL запроса

### Returns
- ` result` - (boolean) - возвращение `false` останавливает динамическую загрузку и предотвращает отправку запроса на сервер

### Example

~~~jsx
gantt.attachEvent("onBeforeBranchLoading", function(settings){
    var task = gantt.getTask(settings.taskId);
    config.url += "&value=" + encodeURIComponent(task.text);
    return true;
});
~~~

### Details

Это событие полезно для добавления дополнительных параметров к запросам динамической загрузки. Объект `settings` включает два свойства: ID задачи и URL запроса:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

Вы можете напрямую изменить URL запроса в вашем коде.

Это событие срабатывает только при включенной [динамической загрузке](guides/loading.md).

Также возможно заблокировать это событие; возврат *false* отменит запрос динамической загрузки.

### Related API
- [onAfterBranchLoading](api/event/onafterbranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [Загрузка данных](guides/loading.md)

