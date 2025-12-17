---
sidebar_label: onMultiSelect
title: onMultiSelect event
description: "当选中一个或多个任务完成时触发"
---

# onMultiSelect

### Description

@short: 当选中一个或多个任务完成时触发

@signature: onMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - 一个原生事件对象

### Example

~~~jsx
gantt.attachEvent("onMultiSelect", function(e){
    // 一些逻辑处理
    return true;
});
~~~

### Details

:::note
 此事件属于 **multiselect** 扩展的一部分，因此请确保已启用 [multiselect](guides/extensions-list.md) 插件。更多详情请参阅 [多任务选择](guides/multiselection.md) 文章。 
:::

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)

### Related Guides
- [多任务选择](guides/multiselection.md#apishijian)

