---
sidebar_label: onTaskOpened
title: onTaskOpened event
description: "当分支被打开时触发"
---

# onTaskOpened

### Description

@short: 当分支被打开时触发

@signature: onTaskOpened: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 分支的标识符

### Example

~~~jsx
gantt.attachEvent("onTaskOpened", function(id) {
    // 可以在这里放置自定义逻辑
});
~~~

### Related API
- [open](api/method/open.md)
- [onTaskClosed](api/event/ontaskclosed.md)

