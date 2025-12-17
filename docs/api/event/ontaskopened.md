---
sidebar_label: onTaskOpened
title: onTaskOpened event
description: "fires when a branch has been opened"
---

# onTaskOpened

### Description

@short: Fires when a branch has been opened

@signature: onTaskOpened: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - the branch id

### Example

~~~jsx
gantt.attachEvent("onTaskOpened", function(id) {
    //any custom logic here
});
~~~

### Related API
- [open](api/method/open.md)
- [onTaskClosed](api/event/ontaskclosed.md)

