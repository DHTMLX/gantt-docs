---
sidebar_label: eventRemove
title: eventRemove 方法
description: "从 HTML 元素移除一个事件处理程序"
---

# eventRemove

### Description

@short: 从 HTML 元素移除一个事件处理程序

@signature: eventRemove: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (必填) *HTMLElement | string* -  HTML 节点或其 ID
- `event` - (必填) *string* - HTML 事件名称（不带 'on' 前缀）
- `handler` - (必填) *function* - 事件处理程序
- `options` - (可选) *boolean | HandlerSettings* - 可选，表示 useCapture 参数或 options 参数的值。请参阅详细信息

### Example

~~~jsx
const handler = function(event){
    console.log("event!");
};
var element = document.querySelector(".my-element");

gantt.event(element, "click", handler);

gantt.eventRemove(element, "click", handler);
~~~

### Details

通过 [event](api/method/event.md) 绑定的事件监听器将在调用 [destructor](api/method/destructor.md) 时自动分离。

### Related API
- [event](api/method/event.md)

### Related Guides
- [Event Handling](guides/handling-events.md)

### Change log
- 在版本 4.0 中新增