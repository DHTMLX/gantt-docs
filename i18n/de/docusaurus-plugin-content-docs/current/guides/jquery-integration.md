---
title: "Integration mit JQuery"
sidebar_label: "Integration mit JQuery"
---

# Integration mit JQuery


Bei der Arbeit mit der JQuery-Bibliothek kann das Gantt-Diagramm mit einer vertrauten Syntax zu einer Seite hinzugefügt werden.

So sieht eine grundlegende Gantt-Diagramm-Initialisierung mit JQuery aus:

**Ein mit JQuery initialisiertes Gantt-Diagramm**
~~~js
$(".mygantt").dhx_gantt({
    data:demo_tasks,
    scales:[
        { unit:"year",step:1,format:"%Y"}
    ]
});
$("#gantt1").dhx_gantt().parse(tasksA);
~~~

~~~html
<div class="mygantt" id='gantt1' style='width:100%; height:30%;'></div>
~~~


[jQuery integration](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)


Details:

- **".mygantt"** - ein mit jQuery kompatibler CSS-Selektor, der den Container identifiziert, in dem das Gantt-Diagramm gerendert wird
- Die **dhx_gantt()**-Methode erstellt eine Instanz von dhtmlxGantt. Sie akzeptiert ein Konfigurationsobjekt als Parameter:
  - **data** - (*object*) der Datensatz, der in das Gantt-Diagramm geladen wird
  - **[scales](api/config/scales.md)** - (*array*) eine Liste von Einstellungen, die die Zeitskala definieren
  
:::note
Ein über jQuery initialisiertes Gantt-Diagramm verwendet die gleichen Konfigurationsoptionen und die gleiche API wie eines, das direkt mit JavaScript erstellt wurde.
:::


[jQuery integration](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)

