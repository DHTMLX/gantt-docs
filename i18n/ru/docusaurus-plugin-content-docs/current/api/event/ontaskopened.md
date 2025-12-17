---
sidebar_label: onTaskOpened
title: onTaskOpened event
description: "срабатывает при открытии ветки"
---

# onTaskOpened

### Description

@short: Срабатывает при открытии ветки

@signature: onTaskOpened: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор ветки

### Example

~~~jsx
gantt.attachEvent("onTaskOpened", function(id) {
    // здесь можно разместить кастомную логику
});
~~~

### Related API
- [open](api/method/open.md)
- [onTaskClosed](api/event/ontaskclosed.md)

