---
sidebar_label: onBeforeMultiSelect
title: onBeforeMultiSelect event
description: "在选择一个或多个任务之前触发"
---

# onBeforeMultiSelect

### Description

@short: 在选择一个或多个任务之前触发

@signature: onBeforeMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
gantt.attachEvent("onBeforeMultiSelect", function(e){
    // 在这里编写一些逻辑
    return true;
});
~~~

### Details

:::note
 此事件是 **multiselect** 扩展的一部分，因此请确保已启用 [multiselect](guides/extensions-list.md#duorenwuxuanze) 插件。更多详情请参阅 [多任务选择](guides/multiselection.md) 文章。 
:::


此事件可以被阻止--返回 *false* 将阻止多任务选择的发生。

### Related API
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [多任务选择](guides/multiselection.md#apishijian)

