---
sidebar_label: show_quick_info
title: show_quick_info config
description: "Aktiviert oder deaktiviert die 'quick_info' Erweiterung (das Pop-up, das Details zur Aufgabe anzeigt)"
---

# show_quick_info

### Description

@short: Aktiviert oder deaktiviert die 'quick_info' Erweiterung (das Pop-up, das Details zur Aufgabe anzeigt)

@signature: show_quick_info: boolean

### Example

~~~jsx
gantt.config.show_quick_info = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

:::note
 Diese Option ist Teil der **Quick Info** Erweiterung. Stellen Sie daher sicher, dass das [quick_info](guides/extensions-list.md#quickinfo) Plugin zuerst aktiviert ist. 
:::

### Related Guides
- ["Vorlagen der 'Quick Info'-Erweiterung (Touch-Unterstützung)"](guides/touch-templates.md)
