---
sidebar_label: onTaskIdChange
title: onTaskIdChange event
description: "срабатывает при обновлении ID задачи"
---

# onTaskIdChange

### Description

@short: Срабатывает при обновлении ID задачи

@signature: onTaskIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - текущий ID задачи
- `new_id` - (required) *string | number* - обновлённый ID задачи

### Example

~~~jsx
gantt.attachEvent("onTaskIdChange", function(id,new_id){
    //любая ваша логика здесь
});
~~~

### Related API
- [changeTaskId](api/method/changetaskid.md)

