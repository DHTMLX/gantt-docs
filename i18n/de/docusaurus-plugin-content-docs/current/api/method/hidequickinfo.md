---
sidebar_label: hideQuickInfo
title: hideQuickInfo Methode
description: "Blendet das Pop-up-Aufgabenformular aus (falls es aktuell aktiv ist)"
---

# hideQuickInfo

### Description

@short: Blendet das Pop-up-Aufgabenformular aus (falls es aktuell aktiv ist)

@signature: hideQuickInfo: () =\> void

### Example

~~~jsx
gantt.showQuickInfo(5);
...
gantt.hideQuickInfo();
~~~

### Related samples
- [QuickInfo-Erweiterung](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Diese Methode ist in der **Quick Info**-Erweiterung definiert, daher müssen Sie das [quick_info](guides/extensions-list.md#quick-info)-Plugin aktivieren.
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#quick-info)