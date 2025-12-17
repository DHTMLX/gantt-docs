---
sidebar_label: onAfterQuickInfo
title: onAfterQuickInfo event
description: "在弹出编辑表单关闭后触发"
---

# onAfterQuickInfo

### Description

@short: 在弹出编辑表单关闭后触发

@signature: onAfterQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (required) *string | number* - 任务的ID

### Example

~~~jsx
gantt.attachEvent("onAfterQuickInfo",function(taskId){
    // 你的代码写在这里
});
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 此事件属于 **Quick Info** 扩展，因此请确保已启用 [quick_info](guides/extensions-list.md) 插件。 
:::


版本 4.1 中新增

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [扩展功能完整列表](guides/extensions-list.md)

