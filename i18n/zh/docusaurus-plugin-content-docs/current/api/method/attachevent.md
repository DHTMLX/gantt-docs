---
sidebar_label: attachEvent
title: attachEvent 方法
description: "将处理程序附加到 dhtmlxGantt 的内部事件"
---

# attachEvent

### Description

@short: 将处理程序附加到 dhtmlxGantt 的内部事件

@signature: attachEvent: \<T extends keyof GanttEventCallback\>(event: T, handler: GanttEventCallback[T], settings?: HandlerSettings) =\> string

### Parameters

- `name` - (required) *string* - 事件的名称，大小写不敏感
- `handler` - (required) *function* - 处理程序函数
- `settings` - (optional) *HandlerSettings* - 可选，是一个包含事件处理程序设置的对象

### Returns
- `event_id` - (string) - 已附加的事件处理程序的 ID

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("你刚刚点击了id为="+id+"的项");
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

您可以将多个处理程序附加到同一个事件，所有处理程序将按顺序执行。
如果某些处理程序返回 *false*，相关操作将被阻止。
事件处理程序将按照它们被附加的顺序进行处理。

## Settings 对象的属性

Settings 对象可以包含以下属性：

- `id?` - (*string | number*) - 事件处理程序的 ID。
例如，您可以很容易地从指定事件分离一个处理程序：

~~~js {3}
gantt.attachEvent("onTaskClick", () => {
    console.log("task click");
}, { id: "my-click" });

// after a while
gantt.detachEvent("my-click");
~~~

- `once?` - (*boolean*) - 定义事件是否只执行一次。
如果希望仅捕获第一次触发，请将该属性设置为 *true*，例如：

~~~js {4}
gantt.attachEvent("onTaskClick", () => {
    console.log("capture next task click");
    return true;
}, { once: true });
~~~

- `thisObject?` - (*any*) - 指定监听器的 `this` 对象。

~~~js {4}
gantt.attachEvent("onTaskClick", function() {
    // ...
    return true;
}, { thisObject: this });
~~~

### Related API
- [detachEvent](api/method/detachevent.md)

### Related Guides
- [Event Handling](guides/handling-events.md)