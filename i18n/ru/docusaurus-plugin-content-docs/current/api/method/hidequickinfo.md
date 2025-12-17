---
sidebar_label: hideQuickInfo
title: hideQuickInfo method
description: "скрывает всплывающую форму задачи, если она в данный момент открыта"
---

# hideQuickInfo

### Description

@short: Скрывает всплывающую форму задачи, если она в данный момент открыта

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
 Этот метод является частью расширения **Quick Info**, поэтому убедитесь, что плагин [quick_info](guides/extensions-list.md#quickinfo) включен. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#quickinfo)

