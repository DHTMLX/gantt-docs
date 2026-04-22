---
sidebar_label: getTaskPosition
title: getTaskPosition method
description: "Berechnet die Position und Größe des DOM-Elements der Aufgabe im Timeline-Bereich"
---

# getTaskPosition

### Description

@short: Berechnet die Position und Größe des DOM-Elements der Aufgabe im Timeline-Bereich

@signature: getTaskPosition: (task: Task, from?: Date, to?: Date) =\> any

### Parameters

- `task` - (required) *Task* - das Task-Objekt
- `from` - (optional) *Date* -  das Startdatum des Elements
- `to`- (optional) *Date* -  das Enddatum des Elements

### Returns
- `object` - (object) - das Größen-Objekt

### Example

~~~jsx
// Hinzufügen der Baseline-Anzeige
gantt.addTaskLayer(function draw_planned(task) {
    if (task.planned_start && task.planned_end) {
        const sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end); /*!*/
        const el = document.createElement('div');
        el.className = 'baseline';
        el.style.left = sizes.left + 'px';
        el.style.top = sizes.top + 'px';
        el.style.width = sizes.width + 'px';
        el.style.height= sizes.height + 'px';
        return el;
    }
    return false;
});
~~~

### Related samples
- [Fristen anzeigen](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)
- [Baseline-Linien anzeigen](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

Die Methode gibt ein Objekt mit den folgenden Eigenschaften zurück:

- **left** - die CSS-left-Position in Pixeln
- **top** - die CSS-top-Position in Pixeln
- **height** - die CSS-Höhe des Balkenelements in Pixeln (definiert entweder durch die [bar_height](api/config/bar_height.md) Konfiguration oder durch die *task.bar_height*-Eigenschaft des Task-Objekts)
- **rowHeight** - die CSS-Höhe der Aufgabenzeile in Pixeln (definiert entweder durch die [row_height](api/config/row_height.md) Konfiguration oder durch die *task.row_height*-Eigenschaft des Task-Objekts) (in Version 7.1 hinzugefügt)
- **width** - die CSS-Breite in Pixeln (definiert durch den Zeitraum zwischen Start- und Enddatum der Aufgabe oder aus den `'from'`, `'to'`-Datumswerten, falls angegeben)

Wenn nur ein Argument übergeben wird, verwendet die Methode **task.start_date**/**task.end_date**, um **width** und **left**-Werte zu berechnen. Andernfalls werden die Datumswerte aus dem zweiten und dritten Argument verwendet.

Hinweis, dass die Methode immer sowohl Datum- als auch Zeitanteile der übergebenen Daten verwendet, unabhängig von den Einstellungen des Zeitmaßstabs. Das bedeutet, dass zwei Aufrufe der unten gezeigten Funktion:

~~~js
gantt.getTaskPosition(task, new Date(2019, 3, 19, 1, 0), new Date(2019, 3, 19, 1, 0)); 
// und
gantt.getTaskPosition(task, new Date(2019, 3, 19, 1, 0), new Date(2019, 3, 19, 5, 0)); 
~~~ 

verschiedene Größen der Boxen zurückgeben werden, nicht nur in der *Stunden*-Skala, sondern auch in den *Tag/Monat/Jahr*-Skalen.