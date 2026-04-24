---
sidebar_label: show_grid
title: show_grid config
description: "Zeigt den Grid-Bereich des Gantt-Diagramms"
---

# show_grid

### Description

@short: Zeigt den Grid-Bereich des Gantt-Diagramms

@signature: show_grid: boolean

### Example

~~~jsx
//blendet den Grid-Bereich des Gantt-Diagramms aus
gantt.config.show_grid = false;
gantt.init("gantt_here");
~~~

**Standardwert:** true

### Details

*gantt.config.show_grid = false* ist nützlich, wenn Sie schnell den Grid-Bereich des Gantt-Diagramms ausblenden müssen, während *gantt.config.show_chart = false* dazu dient, den Timeline-Bereich auszublenden. Wenn Sie in einem einfachen Layout arbeiten, sollten Sie diese beiden Optionen besser nicht zusammen verwenden, da dies zu unerwarteten Ergebnissen führen kann. Stattdessen sollten Sie die Layout-Konfiguration über [gantt.config.layout](api/config/layout.md) ändern.

Der **show_grid**-Konfiguration funktioniert nur, wenn Sie [die Standardkonfiguration des Layouts](guides/layout-config.md#default-layout) nicht über [gantt.config.layout](api/config/layout.md) geändert haben. Falls Sie ein benutzerdefiniertes Layout konfiguriert haben, müssen Sie mehrere benutzerdefinierte Konfigurationen erstellen und zwischen ihnen wechseln, um das Grid ein- bzw. auszublenden. 

:::note
Beispiel: [Gantt. Grid umschalten (benutzerdefiniertes Layout)](https://snippet.dhtmlx.com/omk98l0x)
:::

### Related API
- [show_chart](api/config/show_chart.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-toggle-gridchart)