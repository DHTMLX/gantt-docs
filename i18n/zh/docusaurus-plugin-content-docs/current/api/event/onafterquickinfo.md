---
sidebar_label: onAfterQuickInfo
title: onAfterQuickInfo 事件
description: "在弹出式编辑表单关闭后触发"
---

# onAfterQuickInfo

### Description

@short: 在弹出式编辑表单关闭后触发

@signature: onAfterQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (必填) *string | number* - 任务 ID

### Example

~~~jsx
gantt.attachEvent("onAfterQuickInfo",function(taskId){
    // 在这里插入您的自定义逻辑
});
~~~

### Related samples
- [QuickInfo 扩展](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
该事件在 **Quick Info** 扩展中定义，因此您需要激活 [quick_info](guides/extensions-list.md#quick-info) 插件。
:::

在 4.1 版本中新增

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [扩展总览](guides/extensions-list.md#quick-info)