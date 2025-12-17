---
sidebar_label: hideQuickInfo
title: hideQuickInfo method
description: "如果弹出任务表单当前已打开，则隐藏它"
---

# hideQuickInfo

### Description

@short: 如果弹出任务表单当前已打开，则隐藏它

@signature: hideQuickInfo: () =\> void

### Example

~~~jsx
gantt.showQuickInfo(5);
...
gantt.hideQuickInfo();
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 此方法是**Quick Info**扩展的一部分，因此请确保已启用 [quick_info](guides/extensions-list.md#kuaisuxinxi) 插件。 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [扩展功能完整列表](guides/extensions-list.md#kuaisuxinxi)

