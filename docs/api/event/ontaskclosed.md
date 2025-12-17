---
sidebar_label: onTaskClosed
title: onTaskClosed event
description: "fires when a branch has been closed"
---

# onTaskClosed

### Description

@short: Fires when a branch has been closed

@signature: onTaskClosed: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - the branch id

### Example

~~~jsx
gantt.attachEvent("onTaskClosed", function(id) {
    alert(`You've closed a branch with id=${id}`);
});
~~~

### Related API
- [close](api/method/close.md)
- [onTaskOpened](api/event/ontaskopened.md)

