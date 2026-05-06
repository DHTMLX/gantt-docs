---
sidebar_label: grid_elastic_columns
title: grid_elastic_columns config
description: "Passt die Breite der Spalten in einem scrollbaren Grid"
---

# grid_elastic_columns

### Description

@short: Passt die Breite der Spalten in einem scrollbaren Grid

@signature: grid_elastic_columns: boolean | string

### Example

~~~jsx
gantt.config.grid_elastic_columns = true;
...
gantt.init("gantt_here");
~~~

**Default value:** false

### Details

:::note
Die Eigenschaft funktioniert nur, wenn ein [Grid mit horizontalem Scrollbalken](guides/specifying-columns.md#horizontal-scrollbar) vorhanden ist.
:::

Standardmäßig passt dhtmlxGantt die Größe der Spalten während der Größenänderung des gesamten Grids nicht an. 

Daher bleibt die Breite der Spalten größer werdend des Grids unverändert. Dadurch erscheint auf der rechten Seite des Grids ein leerer Bereich. 
Wenn die Breite des Grids verringert wird, wird im Grid horizontal gescrollt.

![elastic_false](/img/elastic_false.png)

Um die Spalten von der Gridsgröße abhängig zu machen, setzen Sie **grid_elastic_columns** auf *true*:

~~~js
gantt.config.grid_elastic_columns = true;
~~~

:::note
Beispiel: [Elastische Spalten des Grid](https://snippet.dhtmlx.com/k0qqj5w5)
:::

Nun, wenn sich die Breite des Grids ändert, wird auch die Breite der Spalten entsprechend angepasst, und umgekehrt:

- wenn Sie das Grid verbreitern, erweitern sich die Spalten, um die Größe des Grids auszufüllen und den verbleibenden Platz vollständig zu nutzen
- wenn Sie die Spaltenbreite erhöhen, erhöht sich die Größe des Grids (der horizontale Scrollbalken kann erscheinen, aber die Größe der anderen Spalten ändert sich nicht)
- wenn Sie die Spaltenbreite verringern, reduziert sich die Größe des Grids (der horizontale Scrollbalken kann verschwinden, aber die Größe der anderen Spalten kann zunehmen)

![elastic_true](/img/elastic_true.png)

Eine weitere Option besteht darin, den Wert der Eigenschaft auf "min_width" zu setzen:

~~~js
gantt.config.grid_elastic_columns = "min_width";
~~~

In diesem Fall:

- wenn Sie das Grid verbreitern, erweitern sich die Spalten, um die Größe des Grids auszufüllen und den verbleibenden Platz vollständig zu nutzen
- wenn Sie die Breite des Grids verringern, schrumpfen die Spalten, bis sie ihre [minimale Breite](guides/specifying-columns.md#width) erreichen. Wenn alle Spalten die Mindestbreite erreichen, erscheint im Grid die horizontale Scrollleiste.

### Change log
- hinzugefügt in v7.0
