---
sidebar_label: onMultiSelect
title: onMultiSelect event
description: "在完成对一个任务或一组任务的选择后触发"
---

# onMultiSelect

### Description

@short: 在完成对一个任务或一组任务的选择后触发

@signature: onMultiSelect: (e: Event) => void;

### Parameters

- `e` - (必填) *Event* - 一个原生事件对象

### Example

~~~jsx
gantt.attachEvent("onMultiSelect", function(e){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

:::note
此事件在 **multiselect** 扩展中定义，因此需要激活 [multiselect](guides/extensions-list.md#multitaskselection) 插件。请在 [Multi-Task Selection](guides/multiselection.md) 文章中了解详情。
:::

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)