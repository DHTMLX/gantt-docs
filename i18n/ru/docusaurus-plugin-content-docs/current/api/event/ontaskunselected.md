---
sidebar_label: onTaskUnselected
title: onTaskUnselected event
description: "срабатывает, когда пользователь снимает выделение с задачи, выбрав другую"
---

# onTaskUnselected

### Description

@short: Срабатывает, когда пользователь снимает выделение с задачи, выбрав другую

@signature: onTaskUnselected: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - id задачи, с которой было снято выделение

### Example

~~~jsx
gantt.attachEvent("onTaskUnselected", function(id){
    // здесь можно разместить кастомную логику
});
~~~

### Details

Это событие возникает для каждой задачи в пределах диапазона мультивыделения.

Когда активен [multiselect](guides/extensions-list.md#multitaskselection) расширение, оно также срабатывает при удалении задачи из текущего выделения пользователем.

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskSelected](api/event/ontaskselected.md)

