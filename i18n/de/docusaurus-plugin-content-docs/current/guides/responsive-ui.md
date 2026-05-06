---
title: "Gantt responsiv gestalten"
sidebar_label: "Gantt responsiv gestalten"
---

# Gantt responsiv gestalten

Die Arbeit mit Gantt auf Smartphones kann aufgrund der kleinen Bildschirme unbequem sein, die nicht zulassen, alle Daten auf einmal anzuzeigen. Allerdings kann Gantt so konfiguriert werden, dass es sein Layout an verschiedene Bildschirmgrößen anpasst und sowohl auf Desktop- als auch auf Mobilgeräten nutzbar macht.

Wenn Sie Gantt-Größen in Prozentwerten angeben (z. B. `width: 100%; height: 100%`), passt es sich an die verfügbare Containergröße an. Allerdings verfügt standardmäßig jede Rasterspalte über eine Mindestbreite, die durch die Parameter [`min_column_width`](api/config/min_column_width.md) und [`min_grid_column_width`](api/config/min_grid_column_width.md) definiert ist. Wenn der Container kleiner wird als die Gesamtsumme der Mindestbreiten der Spalten, wird das Raster nicht weiter verkleinert. Dies kann den Eindruck vermitteln, dass Gantt nicht responsive ist. Die folgenden Abschnitte beschreiben die Möglichkeiten, dies zu beheben und Gantt wirklich responsive zu machen.

### Anpassen der Mindestspaltenbreite

Ein Ansatz besteht darin, die Werte von [`min_column_width`](api/config/min_column_width.md) und [`min_grid_column_width`](api/config/min_grid_column_width.md) zu verringern. Dadurch kann Gantt weiter schrumpfen, wenn der Container kleiner wird, und ein responsives Verhalten ermöglichen:

~~~jsx
gantt.config.min_column_width = 30;
gantt.config.min_grid_column_width = 30;
~~~

**Verwandtes Beispiel** [Gantt. Responsive container](https://snippet.dhtmlx.com/kjibqqbb)

### Anpassen des Layouts für kleine Bildschirme

Ein weiterer Ansatz besteht darin, das Gantt-Layout basierend auf der verfügbaren Breite umzuschalten. Wenn ausreichend Platz vorhanden ist, wird das vollständige Layout mit sowohl dem Grid als auch der Timeline angezeigt. Auf schmalen Bildschirmen wird entweder das Grid oder die Timeline angezeigt, um den begrenzten Platz besser zu nutzen.

Dies kann mithilfe des [`onGanttRender`](api/event/onganttrender.md) Events umgesetzt werden. Der Event-Handler prüft die Breite des Gantt-Containers, die aktuelle [layout](api/config/layout.md)-Konfiguration und aktualisiert entsprechend das Gantt-Layout.

**Verwandtes Beispiel** [Gantt. Responsive layout: dynamically hide/show the grid depending on the screen width](https://snippet.dhtmlx.com/w4nwk5wf)