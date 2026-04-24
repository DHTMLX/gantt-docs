---
sidebar_label: onTaskClosed
title: Событие onTaskClosed
description: "срабатывает при закрытии ветки"
---

# onTaskClosed

### Description

@short: Срабатывает при закрытии ветки

@signature: onTaskClosed: (id: string | number) => void;

### Parameters

- `id` - (обязательный) *string | number* - идентификатор ветки

### Example

~~~jsx
gantt.attachEvent("onTaskClosed", function(id) {
    alert(`You've closed a branch with id=${id}`);
});
~~~

### Related API
- [close](api/method/close.md)
- [onTaskOpened](api/event/ontaskopened.md)