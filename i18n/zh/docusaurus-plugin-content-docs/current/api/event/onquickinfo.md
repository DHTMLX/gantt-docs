---
sidebar_label: onQuickInfo
title: onQuickInfo event
description: "当弹出编辑表单显示时触发"
---

# onQuickInfo

### Description

@short: 当弹出编辑表单显示时触发

@signature: onQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (required) *string | number* - 任务ID

### Example

~~~jsx
gantt.attachEvent("onQuickInfo",function(taskId){  
    // 在这里编写您的代码  
});
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 该事件是 **Quick Info** 扩展的一部分，请确保已启用 [quick_info](guides/extensions-list.md) 插件。 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [扩展功能完整列表](guides/extensions-list.md)

