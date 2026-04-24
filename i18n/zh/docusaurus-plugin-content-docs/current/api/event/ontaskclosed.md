---
sidebar_label: onTaskClosed
title: onTaskClosed event
description: "当分支已关闭时触发"
---

# onTaskClosed

### Description

@short: 当分支已关闭时触发

@signature: onTaskClosed: (id: string | number) =\> void;

### Parameters

- `id` - (必填) *string | number* - 分支 ID

### Example

~~~jsx
gantt.attachEvent("onTaskClosed", function(id) {
    alert(`您已关闭了ID为${id}的分支`);
});
~~~

### Related API
- [close](api/method/close.md)
- [onTaskOpened](api/event/ontaskopened.md)