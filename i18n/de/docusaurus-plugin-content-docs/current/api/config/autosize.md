---
sidebar_label: autosize
title: autosize config
description: "Passt die Größe des Gantt-Diagramms automatisch an, um alle Aufgaben ohne Scrollen anzuzeigen"
---

# autosize

### Description

@short: Passt die Größe des Gantt-Diagramms automatisch an, um alle Aufgaben ohne Scrollen anzuzeigen

@signature: autosize: boolean | string

### Example

~~~jsx
gantt.config.autosize = "xy";

gantt.init("gantt_here");
~~~

**Default value:** false

### Details

Die Einstellung 'autosize' steuert, ob das Gantt-Diagramm seine Daten innerhalb der Container-Dimensionen mit internen Scrollbars anzeigt oder die Container-Größe so anpasst, dass alle Daten ohne internes Scrollen sichtbar sind:

- [Beispiel mit Gantt-Div-Größen, die via CSS gesetzt sind](https://snippet.dhtmlx.com/5/b4d4d1b80) - interne Scrollbars erscheinen bei Bedarf
- [Beispiel, bei dem die Gantt-Div-Größen von einer Komponente berechnet werden](https://snippet.dhtmlx.com/5/c278b3859) - interne Scrollbars sind deaktiviert

Wenn das Gantt-Diagramm in einen bestimmten Bereich der Seite passen soll, muss die Container-Größe manuell verwaltet werden:

- autosizing sollte deaktiviert sein
- die Breite und Höhe des Divs sollten entweder durch das HTML-Layout bestimmt werden, wenn eine responsive Layout-Lösung verwendet wird, oder durch eigenen Code.

## Scrollen zu versteckten Elementen

Standardmäßig scrollt Gantt automatisch, wenn die Methoden [showTask](api/method/showtask.md) oder [showDate](api/method/showdate.md) verwendet werden.
Wenn jedoch **autosize** aktiviert ist, vergrößert Gantt stattdessen die Container-Größe, um das Element auf der Seite sichtbar zu machen, anstatt zu scrollen.

Es gibt keine universelle Lösung dafür, da die Seite auch andere Elemente enthalten kann, die gescrollt werden müssen. Die Lösung hängt also vom jeweiligen Seiten- oder Anwendungs-Setup ab.

In einem *einfachen* Setup kann Gantt vor oder nach anderen Elementen positioniert sein, und das Scrollen der Seite funktioniert problemlos.

In einem *komplexen* Setup kann der Gantt-Container innerhalb anderer Container verschachtelt sein, die selbst wiederum verschachtelt sind.
In solchen Fällen muss man nur die relevanten Elemente manuell scrollen.

Eine Möglichkeit, die Seite zum gewünschten Element zu scrollen, ist die Verwendung der Methode **element.scrollIntoView**:

~~~js
var attr = gantt.config.task_attribute;
var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
if(timelineElement)
    timelineElement.scrollIntoView({block:"center"});
~~~

Hierbei bezieht sich `id` auf die anzuzeigende Aufgaben-ID.

Eine weitere Option ist, die Methode [showTask](api/method/showtask.md) oder [showDate](api/method/showdate.md) von Gantt zu überschreiben:

~~~js
var showTask = gantt.showTask;

gantt.showTask = function(id){
  showTask.apply(this, [id]);
  var attr = gantt.config.task_attribute;
  var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
  if(timelineElement)
    timelineElement.scrollIntoView({block:"center"});
};
~~~

Alternativ kann man auch eine eigene Funktion erstellen, um die Aufgabe anzuzeigen:

~~~js
function showTask(id){
  gantt.showTask(id);
  var attr = gantt.config.task_attribute;
  var timelineElement = document.querySelector(".gantt_task_line["+attr+"='"+id+"']");
    if(timelineElement)
      timelineElement.scrollIntoView({block:"center"});
}
~~~

:::note
Sample: [Scrolling to the specified element](https://snippet.dhtmlx.com/or73u6a5) 
:::

### Related API
- [autosize_min_width](api/config/autosize_min_width.md)

