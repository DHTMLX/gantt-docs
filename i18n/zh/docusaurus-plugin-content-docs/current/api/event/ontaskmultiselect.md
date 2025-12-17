---
sidebar_label: onTaskMultiSelect
title: onTaskMultiSelect event
description: "当任务的选中状态发生变化时触发（任务被选中或取消选中时）"
---

# onTaskMultiSelect

### Description

@short: 当任务的选中状态发生变化时触发（任务被选中或取消选中时）

@signature: onTaskMultiSelect: (id: string | number, state: boolean, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务的标识符
- `state` - (required) *boolean* - 如果任务被选中则为 true，取消选中则为 false
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
gantt.attachEvent("onTaskMultiSelect", function(id, state, e){
    // 一些逻辑处理
});
~~~

### Details

:::note
 该事件属于**multiselect**扩展，因此请确保启用了[multiselect](guides/extensions-list.md)插件。更多信息请参见[多任务选择](guides/multiselection.md)文章。 
:::


此事件会针对选中范围内的每个任务触发。

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [多任务选择](guides/multiselection.md)

