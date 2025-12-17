---
sidebar_label: event
title: event method
description: "在HTML元素上设置事件处理程序"
---

# event

### Description

@short: 在HTML元素上设置事件处理程序

@signature: event: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (required) *HTMLElement | string* -            HTML元素或其id
- `event` - (required) *string* - 事件名称（不带"on"前缀）
- `handler` - (required) *function* - 处理该事件的函数
- `options` - (optional) *boolean | HandlerSettings* -                可选，<i>useCapture</i>或<i>options</i>参数值。[更多信息](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

### Example

~~~jsx
// 为 'onclick' 事件添加处理程序
gantt.event("divId", "click", function(event){
    // e - DOM事件对象
    do_something();
}, options);
~~~

### Details

通过 [event](api/method/event.md) 添加的所有事件监听器将在调用 [destructor](api/method/destructor.md) 时自动移除。

### Related API
- [eventRemove](api/method/eventremove.md)

### Related Guides
- [事件处理](guides/handling-events.md)

### Change log
- 版本4.0中新增

