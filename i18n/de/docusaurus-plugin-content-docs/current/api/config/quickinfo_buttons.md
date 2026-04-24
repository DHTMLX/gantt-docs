---
sidebar_label: quickinfo_buttons
title: quickinfo_buttons Konfiguration
description: "Speichert eine Sammlung von Schaltflächen, die im Pop-up-Detailsformular der Aufgabe enthalten sind"
---

# quickinfo_buttons

### Description

@short: Stores a collection of buttons resided in the pop-up task's details form

@signature: quickinfo_buttons: any[]

### Example

~~~jsx
gantt.config.quickinfo_buttons=["icon_delete","icon_edit","advanced_details_button"];
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");

gantt.$click.buttons.advanced_details_button=function(id){
    gantt.message("Dies sind erweiterte Details");
    return false; // blockiert das Standardverhalten
};
~~~

**Default value:** ["icon_delete","icon_edit"]

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Diese Option ist in der **Quick Info**-Erweiterung definiert, daher müssen Sie das [quick_info](guides/extensions-list.md#quick-info) Plugin aktivieren.
:::

### Related API
- api/other/click.md
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#quick-info)