---
sidebar_label: show_quick_info
title: show_quick_info Konfiguration
description: "aktiviert/deaktiviert die 'quick_info' Erweiterung (Pop-up-Aufgaben-Detailsformular)"
---

# show_quick_info

### Description

@short: Aktiviert/deaktiviert die 'quick_info'-Erweiterung (Pop-up-Aufgaben-Detailsformular)

@signature: show_quick_info: boolean

### Example

~~~jsx
gantt.config.show_quick_info = false;
gantt.init("gantt_here");
~~~

**Standardwert:** true

### Details

:::note
Diese Option ist in der **Quick Info**-Erweiterung definiert, daher müssen Sie das [quick_info](guides/extensions-list.md#quick-info) Plugin aktivieren.
:::

### Related Guides
- [Vorlagen der 'Quick Info'-Erweiterung (Touch-Unterstützung)](guides/touch-templates.md)