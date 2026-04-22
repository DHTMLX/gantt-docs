---
sidebar_label: grid_width
title: grid_width Konfiguration
description: "Legt die Breite des Grids fest"
---

# grid_width

### Description

@short: Legt die Breite des Grids fest

@signature: grid_width: number

### Example

~~~jsx
gantt.config.grid_width = 400;

gantt.init("gantt_here");
~~~

**Standardwert:** 360

### Details

Die Breite der Grid-Spalten hängt von zwei Attributen ab: der [width](api/config/columns.md) der Spalte und der Breite des Grids. Wenn die Summe der Breiten der Spalten nicht der Breite des Grids entspricht, ändert Gantt einen der Parameter.

- Beim Initialisieren des Gantt via [gantt.init()](api/method/init.md) hat die [width](api/config/columns.md) der Spalte Priorität.
- Beim Rendern des Gantt via [gantt.render()](api/method/render.md) hat der **grid_width** Priorität.  

:::note
sample: [Adjustment of column width ](https://snippet.dhtmlx.com/5/36b6baa89)
:::

- Wenn das Gantt via [gantt.init()](api/method/init.md) initialisiert wird und entweder die Breite der Spalte nicht angegeben ist oder auf **'*'** gesetzt ist, hat der **grid_width** Priorität. 

:::note
sample: [Adjusting column width ](https://snippet.dhtmlx.com/5/a35378204)
:::