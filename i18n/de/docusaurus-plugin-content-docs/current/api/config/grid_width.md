---
sidebar_label: grid_width
title: grid_width config
description: "legt die Breite des Grids fest"
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

**Default value:** 360

### Details

Die Breite der Grid-Spalten hängt von zwei Faktoren ab: der [width](api/config/columns.md) jeder Spalte und der Gesamtbreite des Grids. Wenn die Summe der Spaltenbreiten nicht mit der grid_width übereinstimmt, passt Gantt einen dieser Werte an.

- Wenn das Gantt mit [gantt.init()](api/method/init.md) initialisiert wird, hat die Spalten-[width](api/config/columns.md) Vorrang.
- Wenn das Gantt mit [gantt.render()](api/method/render.md) gerendert wird, hat die **grid_width** Priorität. <br> 
:::note
Sample: [Anpassung der Spaltenbreite](https://snippet.dhtmlx.com/5/36b6baa89) 
:::
- Wenn das Gantt mit [gantt.init()](api/method/init.md) initialisiert wird und die Spaltenbreite entweder nicht angegeben oder auf **'*'** gesetzt ist, wird die **grid_width** priorisiert. <br>
:::note
Sample: [Anpassung der Spaltenbreite](https://snippet.dhtmlx.com/5/a35378204) 
:::

