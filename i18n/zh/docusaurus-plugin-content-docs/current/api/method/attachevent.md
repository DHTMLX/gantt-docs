---
sidebar_label: attachEvent
title: attachEvent method
description: "连接一个处理函数到 dhtmlxGantt 的内部事件"
---

# attachEvent

### Description

@short: 连接一个处理函数到 dhtmlxGantt 的内部事件

@signature: attachEvent: \<T extends keyof GanttEventCallback\>(event: T, handler: GanttEventCallback[T], settings?: HandlerSettings) =\> string

### Parameters

- `name` - (required) *string* - 事件名称，大小写不敏感
- `handler` - (required) *function* - 处理函数
- `settings` - (optional) *HandlerSettings* - 可选，事件处理器的[设置对象](#propertiesofsettingsobject)

### Returns
- `event_id` - (string) - 已附加事件处理器的id

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("你刚刚点击了id为="+id+"的项");
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

可以为同一个事件附加多个处理函数，所有处理函数都会被执行。
如果任一处理函数返回 *false*，对应的操作将被取消。
处理函数按照附加的顺序执行。

## 设置对象的属性 

设置对象可能包含以下属性:

- **id?** - (*string | number*) - 事件处理器的标识符。
这使得可以方便地从事件中分离特定的处理器:

~~~js
gantt.attachEvent("onTaskClick", function(){
    console.log("task click");
}, {id: "my-click"}); /*!*/
... //稍后：
gantt.detachEvent("my-click");
~~~

- **once?** - (*boolean*) - 指示事件是否只触发一次。
将其设置为 *true*，以仅捕获事件的第一次发生，如下所示:

~~~js
gantt.attachEvent("onTaskClick", function(){
    console.log("capture next task click");
    return true;
}, {once: true}); /*!*/
~~~

- **thisObject?** - (*any*) - 定义事件监听器的 `this` 上下文。

~~~js
gantt.attachEvent("onTaskClick", function(){
    // ...
    return true;
}, {thisObject: this}); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)

### Related Guides
- [事件处理](guides/handling-events.md)

