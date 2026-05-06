---
sidebar_label: detachAllEvents
title: detachAllEvents 方法
description: "从 dhtmlxGantt 解除所有事件（包括自定义和内部事件）"
---

# detachAllEvents

### Description

@short: 从 dhtmlxGantt 解除所有事件（包括自定义和内部事件）

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("您刚刚点击了id为="+id+"的项");
});
gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("您刚刚双击了id为="+id+"的项");
});

gantt.detachAllEvents();
~~~

### Details

请注意，**detachAllEvents** 方法会移除所有事件处理程序--包括自定义代码添加的和 dhtmlxGantt 内部用于连接不同功能的事件处理程序，因此可能会破坏 dhtmlxGantt 的正常功能。


:::note
 **detachAllEvents** 方法已被废弃。建议使用以下方式替代: 
:::

~~~js
// 在绑定事件时保存处理程序ID
var events = [];
events.push(gantt.attachEvent("onTaskClick", function(id, e) {
    alert("您刚刚点击了id为="+id+"的项");
});
events.push(gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("您刚刚双击了id为="+id+"的项");
});

// 移除所有保存的事件
while (events.length)
   gantt.detachEvent(events.pop()); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)
- [attachEvent](api/method/attachevent.md)

### Related Guides
- [Event Handling](guides/handling-events.md)