---
sidebar_label: quick_info_detached
title: quick_info_detached Konfiguration
description: "definiert, ob das Aufgabenformular von der linken oder rechten Seite des Bildschirms oder in der Nähe der ausgewählten Aufgabe erscheint"
---

# quick_info_detached

### Description

@short: Legt fest, ob das Aufgabenformular von der linken oder rechten Seite des Bildschirms oder in der Nähe der ausgewählten Aufgabe erscheint

@signature: quick_info_detached: boolean

### Example

~~~jsx
gantt.config.quick_info_detached = false;

gantt.init("gantt_here");
~~~

**Standardwert:** true (das Ereignisformular erscheint in der Nähe des ausgewählten Ereignisses)

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Diese Option ist in der **Quick Info**-Erweiterung definiert, daher müssen Sie das [quick_info](guides/extensions-list.md#quick-info)-Plugin aktivieren.
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#quick-info)