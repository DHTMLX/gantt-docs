---
sidebar_label: smart_rendering
title: smart_rendering config
description: "aktiviert den smart rendering Modus zur Anzeige der Aufgaben und Verknüpfungen im Gantt"
---

# smart_rendering

### Description

@short: Aktiviert den smart rendering Modus zur Anzeige der Aufgaben und Verknüpfungen im Gantt

@signature: smart_rendering: boolean

### Example

~~~jsx
gantt.config.smart_rendering = true;
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Seit Version 6.2 ist smart rendering standardmäßig aktiviert, da es jetzt Teil der Kern-Datei *dhtmlxgantt.js* ist. Das bedeutet, dass die Datei *dhtmlxgantt_smart_rendering.js* nicht mehr separat hinzugefügt werden muss, um smart rendering zu aktivieren.

:::note
 Das Einbinden der alten *dhtmlxgantt_smart_rendering.js* Datei überschreibt die Verbesserungen der aktualisierten integrierten **smart_rendering** Funktion. 
:::

### Related Guides
- ["Performance: Möglichkeiten zur Verbesserung"](guides/performance.md#smartrendering)
