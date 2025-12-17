---
sidebar_label: quick_info_detached
title: quick_info_detached config
description: "Steuert, ob das Task-Formular von der linken oder rechten Seite des Bildschirms hereinschiebt oder direkt neben der ausgewählten Aufgabe erscheint."
---

# quick_info_detached

### Description

@short: Steuert, ob das Task-Formular von der linken oder rechten Seite des Bildschirms hereinschiebt oder direkt neben der ausgewählten Aufgabe erscheint.

@signature: quick_info_detached: boolean

### Example

~~~jsx
gantt.config.quick_info_detached = false;

gantt.init("gantt_here");
~~~

**Default value:** true (<i>das Event-Formular wird in der Nähe des ausgewählten Events angezeigt</i>)

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 Diese Option ist Teil der **Quick Info** Erweiterung, daher stellen Sie sicher, dass das [quick_info](guides/extensions-list.md#quickinfo) Plugin aktiviert ist. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- ["Vollständige Liste der Erweiterungen"](guides/extensions-list.md#quickinfo)

