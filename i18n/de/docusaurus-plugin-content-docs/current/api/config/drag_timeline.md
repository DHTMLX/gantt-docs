---
sidebar_label: drag_timeline
title: drag_timeline config
description: "legt fest, wie sich die drag_timeline Erweiterung verhält"
---

# drag_timeline

### Description

@short: Legt fest, wie sich die drag_timeline Erweiterung verhält

@signature: drag_timeline: null | \{ ignore?: string; useKey?: string | boolean; render?: boolean; \}

### Example

~~~jsx
gantt.config.drag_timeline = {
    ignore:".gantt_task_line, .gantt_task_link",
    useKey: false,
    render: false
};
~~~

**Default value:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Related samples
- [Drag timeline](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)

### Details

:::note
 Diese Option ist Teil der **drag_timeline** Erweiterung, daher stellen Sie sicher, dass das [drag_timeline](guides/extensions-list.md#dragtimeline) Plugin aktiviert ist. 
:::

Die Konfiguration kann entweder als Objekt oder als **null** gesetzt werden, wobei **null** die Erweiterung deaktiviert.

~~~js
gantt.config.drag_timeline = null; // deaktiviert die Erweiterung
~~~

Das **drag_timeline** Objekt unterstützt folgende Eigenschaften:


- **ignore** - (*string*) - CSS-Selector für Elemente, die beim Interagieren kein Scrollen der Timeline auslösen

- **useKey** - (*string | boolean*) - wenn gesetzt, aktiviert sich das Scrollen der Timeline nur, solange die angegebene Modifikatortaste gedrückt wird. Unterstützte Tasten sind: "ctrlKey", "shiftKey", "metaKey", "altKey"

- **render** - (*boolean*) - wenn aktiviert, wird die Timeline zu Beginn und am Ende des Scrollens neu gerendert
