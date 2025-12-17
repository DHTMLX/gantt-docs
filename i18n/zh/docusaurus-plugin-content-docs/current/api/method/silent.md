---
sidebar_label: silent
title: silent method
description: "防止代码内部触发任何内部事件或服务器端调用"
---

# silent

### Description

@short: 防止代码内部触发任何内部事件或服务器端调用

@signature: silent: (callback: GanttCallback) =\> void

### Parameters

- `callback` - (required) *function* - 回调函数

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
- [服务器端集成](guides/server-side.md#cuowuchuli)
