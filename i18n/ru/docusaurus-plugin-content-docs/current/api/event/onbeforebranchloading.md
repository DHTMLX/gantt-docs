---
sidebar_label: onBeforeBranchLoading
title: onBeforeBranchLoading event
description: "если включена динамическая подгрузка, срабатывает после того, как пользователь разворачивает ветку задачи, но до начала загрузки"
---

# onBeforeBranchLoading

### Description

@short: Если включена динамическая подгрузка, срабатывает после того, как пользователь разворачивает ветку задачи, но до начала загрузки

@signature: onBeforeBranchLoading: (settings: any) =\> boolean;

### Parameters

- `settings` - (required) *object* - объект, который содержит id задачи и URL запроса

### Returns
- ` result` - (boolean) - возвращает `false`, что отменяет динамическую загрузку и запрос к серверу не будет отправлен

### Example

~~~jsx
gantt.attachEvent("onBeforeBranchLoading", function(settings){
    var task = gantt.getTask(settings.taskId);
    config.url += "&value=" + encodeURIComponent(task.text);
    return true;
});
~~~

### Details

Это событие может быть использовано для добавления дополнительных параметров к запросам динамической подгрузки. Объект `settings` содержит два свойства - id задачи и URL запроса:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

URL запроса можно изменять из кода.

Это событие срабатывает только тогда, когда включена [динамическая подгрузка](guides/loading.md).

Событие можно блокировать, возвращение *false* отменит запрос динамической подгрузки.

### Related API
- [onAfterBranchLoading](api/event/onafterbranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [Загрузка данных](guides/loading.md)