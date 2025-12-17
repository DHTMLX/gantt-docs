---
sidebar_label: onBeforeTaskMultiSelect
title: onBeforeTaskMultiSelect event
description: "在任务的选择状态即将改变时触发（当任务即将被选中或取消选中时）。"
---

# onBeforeTaskMultiSelect

### Description

@short: 在任务的选择状态即将改变时触发（当任务即将被选中或取消选中时）。

@signature: onBeforeTaskMultiSelect: (id: string | number, state: boolean, e: Event | null) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务的唯一标识符  
- `state` - (required) *boolean* - 如果任务将被选中则为 true，若将被取消选中则为 false  
- `e` - (required) *Event | null* - 原生事件对象（如果可用）

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskMultiSelect", function(id, state, e){  
    // 在此添加你的逻辑  
    return true;  
});
~~~

### Details

:::note
 此事件是 **multiselect** 扩展的一部分，因此请确保已启用 [multiselect](guides/extensions-list.md) 插件。更多详情请参见 [多任务选择](guides/multiselection.md) 文章。 
::: 

该事件会针对选择范围内的每个任务触发。 

通过返回 false 可以阻止任务选择状态的改变。

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [多任务选择](guides/multiselection.md#apishijian)

