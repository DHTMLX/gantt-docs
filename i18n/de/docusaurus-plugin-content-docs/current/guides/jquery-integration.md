--- 
title: "Integration mit jQuery"
sidebar_label: "Integration mit jQuery"
---

# Integration mit jQuery

Wenn Sie die jQuery-Bibliothek verwenden, können Sie das Gantt-Diagramm auf einer Seite mit der üblichen Syntax darstellen.

Ein standardmäßiges Gantt-Diagramm mit jQuery kann wie folgt initialisiert werden:

**Ein Gantt-Diagramm wird mit jQuery initialisiert**
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

[jQuery-Integration](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)

where:

- **".mygantt"** - ein jQuery-kompatibler CSS-Selektor des Containers, in dem das Gantt-Diagramm erstellt wird 
- **dhx_gantt()**-Methode instanziiert dhtmlxGantt. Als Parameter akzeptiert die Methode ein Konfigurationsobjekt:
  - **data** - (*Objekt*) Ein Datensatz, der in das Gantt-Diagramm geladen wird
  - **[scales](api/config/scales.md)** - (*Array*) Ein Array mit Konfigurationseinstellungen der Zeitachse
  
:::note
Ein über den jQuery-Aufruf inicialisiertes Gantt-Diagramm verwendet dieselbe Konfiguration und API wie das standardmäßig (über JavaScript initialisierte) Gantt-Diagramm.
:::

[jQuery-Integration](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)