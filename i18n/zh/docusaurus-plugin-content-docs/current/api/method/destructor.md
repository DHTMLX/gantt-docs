---
sidebar_label: destructor
title: destructor method
description: "清理 gantt 实例"
---

# destructor

### Description

@short: 清理 gantt 实例

@signature: destructor: () =\> void

### Example

~~~jsx
const myGantt = Gantt.getGanttInstance();

// 移除一个 gantt 实例
myGantt.destructor();
~~~

### Details

此方法用于清理一个 gantt 实例，并触发 [onDestroy](api/event/ondestroy.md) 事件。

当调用 destructor 时，它将执行以下操作:

- 清除加载到 gantt 实例中的所有数据
- 如果 gantt 关联了 [dataProcessor](api/method/dataprocessor.md)，则移除它
- 将 gantt 从 DOM 中分离
- 移除通过 [event](api/method/event.md) 方法添加的所有 DOM 事件处理程序

:::note

如果你使用的包不支持多个 gantt 实例（例如 GPL 或 Individual 版本），调用 destructor 会使 gantt 变得不可用，直到页面重新加载。
 
:::

### Related API
- [onDestroy](api/event/ondestroy.md)

### Related Guides
- [页面上的多个甘特图](guides/multiple-gantts.md)

### Change log
- 版本 5.1 中新增

