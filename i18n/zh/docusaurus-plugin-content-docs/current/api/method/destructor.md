---
sidebar_label: destructor
title: destructor method
description: "销毁 gantt 实例"
---

# destructor

### Description

@short: 销毁 gantt 实例

@signature: destructor: () =\> void

### Example

~~~jsx
const myGantt = Gantt.getGanttInstance();

// 移除一个 gantt 实例
myGantt.destructor();
~~~

### Details

该方法会销毁一个 gantt 实例，并调用 [onDestroy](api/event/ondestroy.md) 事件。

当调用 destructor 时，它将执行以下操作:

- 清除加载到 gantt 实例中的数据
- 销毁 [dataProcessor](api/method/dataprocessor.md)（若已附加到 gantt 上）
- 从 DOM 中分离 gantt
- 分离通过 [event](api/method/event.md) 和 [attachEvent](api/method/attachevent.md) 方法附加的所有 DOM 事件

:::note
从 v10 开始，所有版本（免费 Community 版和 PRO 版）都支持多个 Gantt 实例。在遗留版本中，如果不允许创建多个实例（v9.x 及更早版本的 GPL 版，或单域 Commercial 构建），调用 gantt destructor 将使 gantt 不可访问，直到页面重新加载。
:::

### Related API
- [onDestroy](api/event/ondestroy.md)

### Related Guides
- [同一页上的多个甘特图](guides/multiple-gantts.md)

### Change log
- 于版本 5.1 中新增