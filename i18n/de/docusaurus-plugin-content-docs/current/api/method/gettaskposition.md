---
sidebar_label: getTaskPosition
title: getTaskPosition method
description: "Ermittelt die Position und Größe des DOM-Elements der Aufgabe innerhalb des Timeline-Bereichs."
---

# getTaskPosition

### Description

@short: Ermittelt die Position und Größe des DOM-Elements der Aufgabe innerhalb des Timeline-Bereichs.

@signature: getTaskPosition: (task: Task, from?: Date, to?: Date) =\> any

### Parameters
- `task` - (required) *Task* - das Task-Objekt
- `from` - (optional) *Date* - optionales Startdatum für das Element
- `to` - (optional) *Date* - 	optionales Enddatum für das Element
### Returns
- ` object` - (object) - ein Objekt, das Größe und Position beschreibt

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
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

Diese Methode liefert ein Objekt mit folgenden Eigenschaften:

- **left** - die CSS left-Position in Pixel
- **top** - die CSS top-Position in Pixel
- **height** - die CSS Höhe des Balken-Elements in Pixel (festgelegt entweder durch die [bar_height](api/config/bar_height.md) Konfiguration oder die *task.bar_height* Eigenschaft)
- **rowHeight** - die CSS Höhe der Aufgabenreihe in Pixel (festgelegt entweder durch die [row_height](api/config/row_height.md) Konfiguration oder die *task.row_height* Eigenschaft) (hinzugefügt in v7.1)
- **width** - die CSS Breite in Pixel (basierend auf dem Zeitraum zwischen Start- und Enddatum der Aufgabe oder den optionalen 'from' und 'to' Daten, falls angegeben)

Wenn Sie nur ein Argument angeben, verwendet die Methode **task.start_date** und **task.end_date**, um **width** und **left** zu berechnen. Wenn Sie das zweite und dritte Argument angeben, werden diese Daten stattdessen verwendet.

Beachten Sie, dass die Methode immer sowohl das Datum als auch die Uhrzeit der Daten berücksichtigt, unabhängig von den Einstellungen der Zeitskala. Zum Beispiel liefern diese beiden Aufrufe:

~~~js
gantt.getTaskPosition(task, new Date(2019, 3, 19, 1, 0), new Date(2019, 3, 19, 1, 0)); 
// und
gantt.getTaskPosition(task, new Date(2019, 3, 19, 1, 0), new Date(2019, 3, 19, 5, 0)); 
~~~

Boxen unterschiedlicher Größe zurück, egal ob Sie eine *hour*, *day*, *month* oder *year* Skala verwenden.

