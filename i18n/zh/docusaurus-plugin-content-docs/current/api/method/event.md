---
sidebar_label: event
title: event method
description: "attaches an event handler to an HTML element"
---

# event

### Description

@short: 给一个 HTML 元素附加一个事件处理程序

@signature: event: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (required) *HTMLElement | string* -  HTML 节点或其 id
- `event` - (required) *string* - 一个 HTML 事件的名称（不含 'on' 前缀）
- `handler` - (required) *function* - 事件处理函数
- `options` - (optional) *boolean | HandlerSettings* - 可选，useCapture 或 options 参数的取值。详见信息

### Example

~~~jsx
// 为 'onclick' 事件添加处理程序
gantt.event("divId", "click", function(event){
    // e - DOM事件对象
    do_something();
}, options);
~~~

### Details

通过 [event](api/method/event.md) 附加的所有事件监听器，在调用 [destructor](api/method/destructor.md) 时会自动移除。

### Related API
- [eventRemove](api/method/eventremove.md)

### Related Guides
- [Event Handling](guides/handling-events.md)

### Change log
- 在 4.0 版本中新增