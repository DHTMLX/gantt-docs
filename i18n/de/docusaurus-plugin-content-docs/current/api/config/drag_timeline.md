---
sidebar_label: drag_timeline
title: drag_timeline Konfiguration
description: "konfiguriert das Verhalten der drag_timeline-Erweiterung"
---

# drag_timeline

### Description

@short: Konfiguriert das Verhalten der drag_timeline-Erweiterung

@signature: drag_timeline: null | \{ ignore?: string; useKey?: string | boolean; render?: boolean; \}

### Example

~~~jsx
gantt.config.drag_timeline = {
    ignore:".gantt_task_line, .gantt_task_link",
    useKey: false,
    render: false
};
~~~

**Standardwert:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Related samples
- [Drag timeline](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)

### Details

:::note
Diese Option wird in der **drag_timeline**-Erweiterung definiert, daher müssen Sie das [drag_timeline](guides/extensions-list.md#drag-timeline) Plugin aktivieren. 
:::

Der Konfigurationswert kann entweder ein Objekt oder der **null**-Wert sein; der **null**-Wert deaktiviert die Erweiterung.

~~~js
gantt.config.drag_timeline = null; // deaktiviert die Erweiterung
~~~

Das **drag_timeline**-Objekt umfasst die folgenden Eigenschaften:

- **ignore** - (*string*) - CSS-Selektor. Das Scrollen der Timeline wird für Elemente, die dem Selektor entsprechen, nicht aktiviert

- **useKey** - (*string | boolean*) - Wird die Eigenschaft angegeben, wird das Scrollen der Timeline nur aktiviert, wenn die angegebene Modifikatortaste gedrückt wird. Die unterstützten Werte sind: "ctrlKey", "shiftKey", "metaKey", "altKey"

- **render** - (*boolean*) - Wenn die Eigenschaft aktiviert ist, wird das Scrollen der Timeline neu gerendert, wenn das Scrollen gestartet wird und wenn es beendet ist