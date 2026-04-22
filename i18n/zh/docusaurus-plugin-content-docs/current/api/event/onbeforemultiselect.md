---
sidebar_label: onBeforeMultiSelect
title: onBeforeMultiSelect event
description: "在选择一个任务或一组任务之前触发"
---

# onBeforeMultiSelect

### Description

@short: 在选择一个任务或一组任务之前触发

@signature: onBeforeMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (必填) *Event* - 原生事件对象

### Example

~~~jsx
gantt.attachEvent("onBeforeMultiSelect", function(e){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

:::note
此事件定义在 **multiselect** 扩展中，因此你需要激活 [multiselect](guides/extensions-list.md#multitaskselection) 插件。详见 [多任务选择](guides/multiselection.md#apievents) 文章。
:::

此事件是可阻塞的，返回 *false* 将取消对任务的多选。

### Related API
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [多任务选择](guides/multiselection.md#apievents)