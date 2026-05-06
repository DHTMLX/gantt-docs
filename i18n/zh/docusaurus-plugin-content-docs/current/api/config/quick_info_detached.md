---
sidebar_label: quick_info_detached
title: quick_info_detached 配置
description: "定义任务表单将从屏幕左侧/右侧弹出，还是在所选任务附近显示"
---

# quick_info_detached

### Description

@short: 定义任务表单将从屏幕的左侧/右侧弹出，还是在所选任务附近显示

@signature: quick_info_detached: boolean

### Example

~~~jsx
gantt.config.quick_info_detached = false;

gantt.init("gantt_here");
~~~

**默认值：** true（事件表单将出现在所选事件附近）

### Related samples
- [Quick Info 扩展](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
此选项定义在 **Quick Info** 扩展中，因此您需要激活 [quick_info](guides/extensions-list.md#quick-info) 插件。 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [扩展总览](guides/extensions-list.md#quick-info)