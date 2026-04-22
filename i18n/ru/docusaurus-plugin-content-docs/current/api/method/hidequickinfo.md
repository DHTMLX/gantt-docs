---
sidebar_label: hideQuickInfo
title: Метод hideQuickInfo
description: "скрывает всплывающее окно формы задачи (если она в данный момент активна)"
---

# hideQuickInfo

### Description

@short: Скрывает всплывающее окно формы задачи (если оно в данный момент активно)

@signature: hideQuickInfo: () => void

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
Этот метод определён в расширении **Quick Info**, поэтому необходимо активировать плагин [quick_info](guides/extensions-list.md#quick-info). 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#quick-info)