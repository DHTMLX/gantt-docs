---
sidebar_label: show_chart
title: show_chart config
description: "Steuert die Sichtbarkeit des Timeline-Abschnitts im Gantt-Diagramm"
---

# show_chart

### Description

@short: Steuert die Sichtbarkeit des Timeline-Abschnitts im Gantt-Diagramm

@signature: show_chart: boolean

### Example

~~~jsx
//blendet den Timeline-Abschnitt des Gantt-Diagramms aus
gantt.config.show_chart = false;
gantt.init("gantt_here");
~~~

**Default value:** true (Timeline-Abschnitt wird angezeigt)

### Details

Die Einstellung *gantt.config.show_chart = false* ist eine schnelle Möglichkeit, den Timeline-Teil des Gantt-Diagramms auszublenden, während *gantt.config.show_grid = false* den Grid-Abschnitt ausblendet. Wenn Sie mit einem einfachen Layout arbeiten, ist es am besten, nicht beide Optionen gleichzeitig zu verwenden, da dies zu unerwartetem Verhalten führen kann. Stattdessen wird empfohlen, die Layout-Konfiguration über [gantt.config.layout](api/config/layout.md) anzupassen.

Die **show_chart**-Option funktioniert nur, wenn das Layout in seiner [Standardkonfiguration](guides/layout-config.md#defaultlayout) bleibt und nicht über [gantt.config.layout](api/config/layout.md) verändert wurde. Wenn Sie ein benutzerdefiniertes Layout eingerichtet haben, müssen Sie mehrere benutzerdefinierte Konfigurationen definieren und zwischen ihnen wechseln, um die Sichtbarkeit des Charts zu steuern.<br> 

:::note
Sample: [Gantt. Toggle timeline (custom layout)](https://snippet.dhtmlx.com/aukjyqc8) 
:::

### Related API
- [show_grid](api/config/show_grid.md)

### Related Guides
- ["How-tos"](guides/how-to.md#howtotogglegridchart)

