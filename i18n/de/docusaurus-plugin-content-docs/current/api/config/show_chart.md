---
sidebar_label: show_chart
title: show_chart config
description: "zeigt den Chart (Timeline)-Bereich des Gantt-Diagramms"
---

# show_chart

### Description

@short: Zeigt den Chart (Timeline)-Bereich des Gantt-Diagramms

@signature: show_chart: boolean

### Example

~~~jsx
//blendet den Timeline-Abschnitt des Gantt-Diagramms aus
gantt.config.show_chart = false;
gantt.init("gantt_here");
~~~

**Default value:** true (das Diagramm ist sichtbar)

### Details

*gantt.config.show_chart = false* ist nützlich, wenn Sie den Timeline-Bereich des Gantt-Diagramms schnell ausblenden müssen, während *gantt.config.show_grid = false* dazu dient, den Grid-Bereich auszublenden. Wenn Sie in einem einfachen Layout arbeiten, sollten Sie diese beiden Optionen besser nicht zusammen verwenden, da dies zu einem unerwarteten Ergebnis führen kann. Stattdessen sollten Sie die Layout-Konfiguration über [gantt.config.layout](api/config/layout.md) ändern.

Die **show_chart**-Konfiguration funktioniert nur, wenn Sie [die Standardkonfiguration des Layouts](guides/layout-config.md#default-layout) nicht über [gantt.config.layout](api/config/layout.md) geändert haben. Falls Sie ein benutzerdefiniertes Layout konfiguriert haben, müssen Sie mehrere benutzerdefinierte Konfigurationen erstellen und zwischen ihnen wechseln, um die Chart auszublenden/einzublenden.

:::note
Beispiel: [Gantt. Timeline umschalten (benutzerdefiniertes Layout) ](https://snippet.dhtmlx.com/aukjyqc8)
:::

### Related API
- [show_grid](api/config/show_grid.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-toggle-gridchart)