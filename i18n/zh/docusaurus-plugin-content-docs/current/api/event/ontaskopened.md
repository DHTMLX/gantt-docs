---
sidebar_label: onTaskOpened
title: onTaskOpened 事件
description: "当分支已打开时触发"
---

# onTaskOpened

### Description

@short: 当分支被打开时触发

@signature: onTaskOpened: (id: string | number) =\> void;

### Parameters

- `id` - (必填) *string | number* - 分支 ID

### Example

~~~jsx
gantt.attachEvent("onTaskOpened", function(id) {
    // 在这里插入您的自定义逻辑 
});
~~~

### Related API
- [open](api/method/open.md)
- [onTaskClosed](api/event/ontaskclosed.md)