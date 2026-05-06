---
sidebar_label: hideQuickInfo
title: hideQuickInfo method
description: "隐藏弹出式任务表单（如果当前处于活动状态）"
---

# hideQuickInfo

### Description

@short: 隐藏弹出式任务表单（如果当前处于活动状态）

@signature: hideQuickInfo: () =\> void

### Example

~~~jsx
gantt.showQuickInfo(5);
...
gantt.hideQuickInfo();
~~~

### Related samples
- [QuickInfo 扩展](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
此方法在 **Quick Info** 扩展中定义，因此您需要激活 [quick_info](guides/extensions-list.md#quick-info) 插件。
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [扩展全集](guides/extensions-list.md#quick-info)