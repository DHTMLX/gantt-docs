---
sidebar_label: onTaskIdChange
title: Событие onTaskIdChange
description: "Срабатывает при изменении идентификатора задачи"
---

# onTaskIdChange

### Description

@short: Срабатывает при изменении идентификатора задачи

@signature: onTaskIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (обязательно) *string | number* - текущий идентификатор задачи
- `new_id` - (обязательно) *string | number* - новый идентификатор задачи

### Example

~~~jsx
gantt.attachEvent("onTaskIdChange", function(id,new_id){
    // любая ваша логика здесь
});
~~~

### Related API
- [changeTaskId](api/method/changetaskid.md)