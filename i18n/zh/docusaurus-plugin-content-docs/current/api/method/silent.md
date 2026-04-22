---
sidebar_label: silent
title: silent 方法
description: "使其中的所有代码不触发内部事件或服务器端调用"
---

# silent

### Description

@short: 使其中的所有代码不触发内部事件或服务器端调用

@signature: silent: (callback: GanttCallback) =\> void

### Parameters

- `callback` - （必需）*function* - 回调函数

### Example

~~~jsx
gantt.silent(function () {
    // 任务仅在客户端被删除
    // gantt 不会自动重绘
    gantt.deleteTask(id);
});

// 准备好后手动重绘 gantt
gantt.render();
~~~

### Related Guides
- [服务端集成](guides/server-side.md#error-handling)