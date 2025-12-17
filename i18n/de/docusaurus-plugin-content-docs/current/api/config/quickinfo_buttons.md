---
sidebar_label: quickinfo_buttons
title: quickinfo_buttons config
description: "enthält eine Reihe von Buttons, die im Pop-up-Formular mit den Aufgabendetails angezeigt werden"
---

# quickinfo_buttons

### Description

@short: Enthält eine Reihe von Buttons, die im Pop-up-Formular mit den Aufgabendetails angezeigt werden

@signature: quickinfo_buttons: any[]

### Example

~~~jsx
gantt.config.quickinfo_buttons=["icon_delete","icon_edit","advanced_details_button"];
gantt.locale.labels["advanced_details_button"] = "Erweiterte Infos";
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
 Diese Option ist Teil der **Quick Info**-Erweiterung, daher stellen Sie sicher, dass das [quick_info](guides/extensions-list.md#quickinfo) Plugin aktiviert ist. 
:::

### Related API
- api/other/click.md
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- ["Vollständige Liste der Erweiterungen"](guides/extensions-list.md#quickinfo)

