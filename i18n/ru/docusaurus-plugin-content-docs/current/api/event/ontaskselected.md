---
sidebar_label: onTaskSelected
title: onTaskSelected событие
description: "Срабатывает, когда пользователь выбирает задачу"
---

# onTaskSelected

### Descriptionion

@short: Срабатывает, когда пользователь выбирает задачу

@signature: onTaskSelected: (id: string | number) =\> void;

### Parameters

- `id` - (обязательный) *string,number* - идентификатор задачи

### Example

~~~jsx
gantt.attachEvent("onTaskSelected", function(id){
    // любая ваша логика здесь
});
~~~

### Details

Событие вызывается для каждой задачи в диапазоне множественного выделения.

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)