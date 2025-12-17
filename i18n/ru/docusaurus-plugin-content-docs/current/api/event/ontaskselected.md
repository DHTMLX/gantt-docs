---
sidebar_label: onTaskSelected
title: onTaskSelected event
description: "срабатывает, когда пользователь выбирает задачу"
---

# onTaskSelected

### Description

@short: Срабатывает, когда пользователь выбирает задачу

@signature: onTaskSelected: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи

### Example

~~~jsx
gantt.attachEvent("onTaskSelected", function(id){
    //любая ваша логика здесь
});
~~~

### Details

Это событие вызывается для каждой задачи, включённой в диапазон мультивыделения.

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)

