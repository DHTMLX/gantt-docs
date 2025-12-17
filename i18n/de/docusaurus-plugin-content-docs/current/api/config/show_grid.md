---
sidebar_label: show_grid
title: show_grid config
description: "steuert die Sichtbarkeit des Grid-Bereichs im Gantt-Diagramm"
---

# show_grid

### Description

@short: Steuert die Sichtbarkeit des Grid-Bereichs im Gantt-Diagramm

@signature: show_grid: boolean

### Example

~~~jsx
//blendet den Grid-Bereich des Gantt-Diagramms aus
gantt.config.show_grid = false;
gantt.init("gantt_here");
~~~

**Default value:** true (das Grid wird angezeigt)

### Details

Die Einstellung *gantt.config.show_grid = false* ermöglicht es Ihnen, den Grid-Bereich des Gantt-Diagramms schnell auszublenden, während *gantt.config.show_chart = false* den Timeline-Bereich ausblendet. Wenn Sie mit einem einfachen Layout arbeiten, sollten Sie diese beiden Optionen nicht gleichzeitig verwenden, da dies zu unerwartetem Verhalten führen kann. Stattdessen empfiehlt es sich, die Layout-Konfiguration über [gantt.config.layout](api/config/layout.md) anzupassen.

Die **show_grid**-Option funktioniert nur, wenn Sie die [Standard-Layout-Konfiguration](guides/layout-config.md#defaultlayout) nicht über [gantt.config.layout](api/config/layout.md) verändert haben. Wenn Sie ein benutzerdefiniertes Layout verwenden, müssen Sie mehrere benutzerdefinierte Konfigurationen erstellen und zwischen ihnen wechseln, um das Grid ein- oder auszublenden.<br> 
:::note
Sample: [Gantt. Toggle grid (custom layout)](https://snippet.dhtmlx.com/omk98l0x) 
:::

### Related API
- [show_chart](api/config/show_chart.md)

### Related Guides
- ["How-tos"](guides/how-to.md#howtotogglegridchart)

