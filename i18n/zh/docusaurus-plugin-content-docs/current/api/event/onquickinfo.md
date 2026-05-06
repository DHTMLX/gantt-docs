---
sidebar_label: onQuickInfo
title: onQuickInfo 事件
description: "在弹出编辑表单出现时触发"
---

# onQuickInfo

### Description

@short: 当弹出编辑表单出现时触发

@signature: onQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (必填) *string | number* - 任务 ID

### Example

~~~jsx
gantt.attachEvent("onQuickInfo",function(taskId){
    // 在这里插入您的自定义逻辑 
});
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
本事件在 **Quick Info** 扩展中定义，因此你需要激活 [quick_info](guides/extensions-list.md#quick-info) 插件。
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#quick-info)