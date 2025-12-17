---
sidebar_label: hideQuickInfo
title: hideQuickInfo method
description: "Blendet das Pop-up-Aufgabenformular aus, falls es derzeit geöffnet ist"
---

# hideQuickInfo

### Description

@short: Blendet das Pop-up-Aufgabenformular aus, falls es derzeit geöffnet ist

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
 Diese Methode ist Teil der **Quick Info**-Erweiterung. Stellen Sie daher sicher, dass das Plugin [quick_info](guides/extensions-list.md#quickinfo) aktiviert ist. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- ["Vollständige Liste der Erweiterungen"](guides/extensions-list.md#quickinfo)

