---
sidebar_label: onTaskClosed
title: onTaskClosed event
description: "срабатывает при закрытии ветки"
---

# onTaskClosed

### Description

@short: Срабатывает при закрытии ветки

@signature: onTaskClosed: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - id ветки

### Example

~~~jsx
gantt.attachEvent("onTaskClosed", function(id) {
    alert(`Вы закрыли ветку с id=${id}`);
});
~~~

### Related API
- [close](api/method/close.md)
- [onTaskOpened](api/event/ontaskopened.md)

