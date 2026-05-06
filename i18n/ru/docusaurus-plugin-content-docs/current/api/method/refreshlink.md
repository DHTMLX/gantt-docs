---
sidebar_label: refreshLink
title: Метод refreshLink
description: "Обновляет указанную ссылку."
---

# refreshLink

### Description

@short: Обновляет указанную ссылку

@signature: refreshLink: (id: string | number) =\> void

### Parameters

- `id` - (обязательный) *string | number* - идентификатор ссылки

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

var task = gantt.getLink(1);

task.type = 2; /*!*/
gantt.refreshLink(1);       /*!*/
~~~

### Details

Вы можете использовать этот метод для перерисовки ссылки после изменения её свойств. В отличие от [updateLink](api/method/updatelink.md), этот метод не инициирует DataProcessor (guides/server-side.md), и обновления на сервер не будут отправлены.

### Related API
- [refreshTask](api/method/refreshtask.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)