---
sidebar_label: refreshLink
title: refreshLink method
description: "обновляет указанный линк"
---

# refreshLink

### Description

@short: Обновляет указанный линк

@signature: refreshLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    идентификатор линка

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

Этот метод используется для перерисовки линка после изменения его свойств. В отличие от [updateLink](api/method/updatelink.md), он не активирует [DataProcessor](guides/server-side.md), поэтому изменения не будут отправлены на сервер.

### Related API
- [refreshTask](api/method/refreshtask.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)

