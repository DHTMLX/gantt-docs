---
sidebar_label: eventRemove
title: eventRemove method
description: "从指定的 HTML 元素中移除事件处理函数"
---

# eventRemove

### Description

@short: 从指定的 HTML 元素中移除事件处理函数

@signature: eventRemove: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (required) *HTMLElement | string* -            HTML 元素或其 ID
- `event` - (required) *string* - 事件名称（不带 'on' 前缀）
- `handler` - (required) *function* - 处理该事件的函数
- `options` - (optional) *boolean | HandlerSettings* -                可选，表示 <i>useCapture</i> 标志或 <i>options</i> 对象。[详情请见](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)

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

通过 [event](api/method/event.md) 添加的任何事件监听器，在调用 [destructor](api/method/destructor.md) 时会被自动移除。

### Related API
- [event](api/method/event.md)

### Related Guides
- [事件处理](guides/handling-events.md)

### Change log
- 版本 4.0 中新增

