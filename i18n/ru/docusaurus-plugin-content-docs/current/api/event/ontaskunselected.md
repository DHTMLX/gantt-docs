---
sidebar_label: onTaskUnselected
title: onTaskUnselected событие
description: "Срабатывает, когда пользователь снимает выделение с задачи, выбирая другую задачу"
---

# onTaskUnselected

### Description

@short: Срабатывает, когда пользователь снимает выделение с задачи, выбирая другую задачу

@signature: onTaskUnselected: (id: string | number) =\> void;

### Parameters

- `id` - (обязателен) *string | number* - идентификатор задачи (задача, с которой снято выделение)

### Example

~~~jsx
gantt.attachEvent("onTaskUnselected", function(id){
    // любая ваша логика здесь
});
~~~

### Details

Событие вызывается для каждой задачи в диапазоне множественного выделения.

Если включено расширение [multiselect](guides/extensions-list.md#multitaskselection), событие также срабатывает, когда пользователь снимает выделение с выбранной задачи.

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskSelected](api/event/ontaskselected.md)