---
sidebar_label: quick_info_detached
title: quick_info_detached config
description: "控制任务表单是从屏幕左侧或右侧滑入，还是直接显示在所选任务旁边"
---

# quick_info_detached

### Description

@short: 控制任务表单是从屏幕左侧或右侧滑入，还是直接显示在所选任务旁边

@signature: quick_info_detached: boolean

### Example

~~~jsx
gantt.config.quick_info_detached = false;

gantt.init("gantt_here");
~~~

**Default value:** true (<i>事件表单将显示在所选事件附近</i>)

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 此选项属于 **Quick Info** 扩展功能，因此请确保已启用 [quick_info](guides/extensions-list.md) 插件。 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [扩展功能完整列表](guides/extensions-list.md)

