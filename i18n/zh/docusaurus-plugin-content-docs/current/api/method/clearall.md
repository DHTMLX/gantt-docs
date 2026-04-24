---
sidebar_label: clearAll
title: clearAll 方法
description: "从甘特图中移除所有任务及附加元素（包括标记）"
---

# clearAll

### Description

@short: 从甘特图中移除所有任务及附加元素（包括标记）

@signature: clearAll: () =\> void

### Example

~~~jsx
// 重新加载甘特图中的数据
gantt.load("url1");

gantt.clearAll(); /*!*/
gantt.load("url2");/*!*/
~~~

### Details

注意，该方法将触发 [onClear](api/event/onclear.md) 事件。

### Related API
- [onClear](api/event/onclear.md)

### Related Guides
- [Basic Operations with Tasks](guides/crud-task.md)