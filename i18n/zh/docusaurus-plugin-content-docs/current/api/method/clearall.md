---
sidebar_label: clearAll
title: clearAll method
description: "从甘特图中移除所有任务和额外元素（如标记）"
---

# clearAll

### Description

@short: 从甘特图中移除所有任务和额外元素（如标记）

@signature: clearAll: () =\> void

### Example

~~~jsx
// 重新加载甘特图中的数据
gantt.load("url1");

gantt.clearAll(); /*!*/
gantt.load("url2");/*!*/
~~~

### Details

请注意，该方法会触发 [onClear](api/event/onclear.md) 事件。

### Related API
- [onClear](api/event/onclear.md)

### Related Guides
- [任务的基本操作](guides/crud-task.md)

