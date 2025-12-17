---
sidebar_label: onAfterBranchLoading
title: onAfterBranchLoading event
description: "Когда включена динамическая подгрузка, это событие срабатывает сразу после того, как ветка задач загрузилась на странице."
---

# onAfterBranchLoading

### Description

@short: Когда включена динамическая подгрузка, это событие срабатывает сразу после того, как ветка задач загрузилась на странице.

@signature: onAfterBranchLoading: (settings: any) =\> void;

### Parameters

- `settings` - (required) *object* - Объект, содержащий ID задачи и URL запроса.

### Example

~~~jsx
gantt.attachEvent("onAfterBranchLoading", function(settings){
    console.log(settings.url);
});
~~~

### Details

Объект `settings` включает два свойства: ID задачи и URL, использованный для запроса:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

Это событие происходит только если включена [Динамическая подгрузка](guides/loading.md).

### Related API
- [onBeforeBranchLoading](api/event/onbeforebranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [Загрузка данных](guides/loading.md)

