---
sidebar_label: onBeforeTaskMultiSelect
title: onBeforeTaskMultiSelect event
description: "在任务选择状态被改变之前触发（任务将被选中或取消选中）"
---

# onBeforeTaskMultiSelect

### Description

@short: 在任务选择状态将要改变时触发（任务将被选中或取消选中）

@signature: onBeforeTaskMultiSelect: (id: string | number, state: boolean, e: Event | null) =\> void;

### Parameters

- `id` - (必填) *string | number* - 任务的 ID
- `state` - (必填) *boolean* - 当任务将被选中时为 true；未选中时为 false
- `e` - (必填) *Event | null* - 一个原生事件对象

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskMultiSelect", function(id, state, e){
    // 在这里插入您的自定义逻辑 
     return true;
});
~~~

### Details

:::note
该事件在 **multiselect** 扩展中定义，因此您需要启用 [multiselect](guides/extensions-list.md#multitaskselection) 插件。请在 [Multi-Task Selection](guides/multiselection.md) 文章中查看详细信息。
:::

该事件会针对范围内的每个任务触发。


该事件是可拦截的，返回 false 将取消任务选择状态的变更。

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)