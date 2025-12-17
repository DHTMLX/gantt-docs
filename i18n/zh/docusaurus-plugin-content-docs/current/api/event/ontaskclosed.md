---
sidebar_label: onTaskClosed
title: onTaskClosed event
description: "当一个分支被关闭时触发"
---

# onTaskClosed

### Description

@short: 当一个分支被关闭时触发

@signature: onTaskClosed: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 分支的ID

### Example

~~~jsx
gantt.attachEvent("onTaskClosed", function(id) {
    alert(`您已关闭了ID为${id}的分支`);
});
~~~

### Related API
- [close](api/method/close.md)
- [onTaskOpened](api/event/ontaskopened.md)

