---
sidebar_label: onTaskMultiSelect
title: onTaskMultiSelect 事件
description: "当任务选择状态发生变化后触发（任务已被选中/取消选中）"
---

# onTaskMultiSelect

### Description

@short: 任务选择状态已更改后触发（任务已被选中/取消选中）

@signature: onTaskMultiSelect: (id: string | number, state: boolean, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务的 ID
- `state` - (required) *boolean* - true 表示任务已被选中，false 表示未选中
- `e` - (required) *Event* - 一个原生事件对象

### Example

~~~jsx
gantt.attachEvent("onTaskMultiSelect", function(id, state, e){
    // 在这里插入您的自定义逻辑 
});
~~~

### Details

:::note
此事件在 **multiselect** 扩展中定义，因此需要启用 [multiselect](guides/extensions-list.md#multitaskselection) 插件。请在 [Multi-Task Selection](guides/multiselection.md) 文章中阅读详情。
:::

该事件会对范围内的每个任务进行调用。

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)