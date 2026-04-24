---
sidebar_label: onAfterBranchLoading
title: onAfterBranchLoading event
description: "если включена динамическая загрузка, срабатывает после загрузки ветви задачи на страницу"
---

# onAfterBranchLoading

### Description

@short: Если включена динамическая загрузка, срабатывает после того, как ветка задачи была загружена на страницу

@signature: onAfterBranchLoading: (settings: any) =\> void;

### Parameters

- `settings` - (обязательный) *объект* - объект, содержащий идентификатор задачи и URL запроса

### Example

~~~jsx
gantt.attachEvent("onAfterBranchLoading", function(settings){
    console.log(settings.url);
});
~~~

### Details

Объект `settings` содержит два свойства: идентификатор задачи и URL запроса:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

Это событие срабатывает только при включенной динамической загрузке [Dynamic loading](guides/loading.md).

### Related API
- [onBeforeBranchLoading](api/event/onbeforebranchloading.md)
- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [Data Loading](guides/loading.md)