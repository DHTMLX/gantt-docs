---
sidebar_label: smart_rendering
title: smart_rendering-Konfiguration
description: "Aktiviert den Smart Rendering-Modus für die Darstellung von Aufgaben und Verknüpfungen im Gantt"
---

# smart_rendering

### Description

@short: Aktiviert den Smart Rendering-Modus für die Darstellung von Aufgaben und Verknüpfungen im Gantt

@signature: smart_rendering: boolean

### Example

~~~jsx
gantt.config.smart_rendering = true;
...
gantt.init("gantt_here");
~~~

**Standardwert:** true

### Details

Ab Version 6.2 ist das Smart Rendering standardmäßig aktiviert, da es in die Kerndatei *dhtmlxgantt.js* eingebunden ist. Daher müssen Sie die Datei *dhtmlxgantt_smart_rendering.js* nicht auf der Seite einbinden, damit Smart Rendering funktioniert.

:::note
Wenn Sie die Datei *dhtmlxgantt_smart_rendering.js*, die aus der alten Version stammt, einbinden, wird sie die Verbesserungen der neuen integrierten **smart_rendering**-Erweiterung überschreiben.
:::

### Related Guides
- [Leistung: Wege zur Verbesserung](guides/performance.md#smart-rendering)