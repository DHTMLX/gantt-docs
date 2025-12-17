---
sidebar_label: grid_elastic_columns
title: grid_elastic_columns config
description: "passt die Breite der Spalten innerhalb eines scrollbaren grids an"
---

# grid_elastic_columns

### Description

@short: Passt die Breite der Spalten innerhalb eines scrollbaren grids an

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
 Diese Eigenschaft funktioniert nur, wenn ein [grid eine horizontale Scrollbar hat](guides/specifying-columns.md#horizontalscrollbar). 
:::

Standardmäßig ändert dhtmlxGantt die Größe der Spalten nicht, wenn die gesamte grid-Größe angepasst wird.

Wenn also die Breite des grids zunimmt, behalten die Spalten ihre ursprüngliche Breite bei, wodurch rechts leerer Raum entsteht. Wenn die Breite des grids abnimmt, erscheint eine horizontale Scrollbar.

![elastic_false](/img/elastic_false.png)

Um die Spalten mit der Größe des grids anzupassen, setzen Sie **grid_elastic_columns** auf *true*:

~~~js
gantt.config.grid_elastic_columns = true;
~~~

:::note
Sample: [Elastische Spalten des Grids](https://snippet.dhtmlx.com/k0qqj5w5) 
:::

Mit dieser Einstellung passt sich die Breite der Spalten beim Ändern der grid-Breite an:

- Wenn das grid breiter wird, dehnen sich die Spalten aus, um den zusätzlichen Platz zu füllen.
- Wenn die Breite einer Spalte vergrößert wird, vergrößert sich die grid-Größe (eine horizontale Scrollbar kann erscheinen), aber die anderen Spalten bleiben unverändert.
- Wenn die Breite einer Spalte verkleinert wird, schrumpft die grid-Größe (die Scrollbar kann verschwinden), und andere Spalten können wachsen.

![elastic_true](/img/elastic_true.png)

Eine weitere Option ist, den Eigenschaftswert auf "min_width" zu setzen:

~~~js
gantt.config.grid_elastic_columns = "min_width";
~~~

Das passiert dann:

- Wenn das grid breiter wird, dehnen sich die Spalten aus, um den verfügbaren Platz zu füllen.
- Wenn das grid schmaler wird, schrumpfen die Spalten bis zu ihren [Minimalbreiten](guides/specifying-columns.md#width). Sobald alle Spalten ihre Minimalbreite erreicht haben, erscheint eine horizontale Scrollbar.

### Change log
- hinzugefügt in v7.0
