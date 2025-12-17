---
sidebar_label: grid_row_class
title: grid_row_class template
description: "definiert die CSS-Klasse, die einer grid-Zeile zugewiesen wird"
---

# grid_row_class

### Description

@short: Definiert die CSS-Klasse, die einer grid-Zeile zugewiesen wird

@signature: grid_row_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - das Datum, an dem eine Aufgabe beginnt
- `end` - (required) *Date* - das Datum, an dem eine Aufgabe voraussichtlich abgeschlossen wird
- `task` - (required) *Task* - das Aufgabenobjekt selbst

### Returns
- ` text` - (string | void) - eine CSS-Klasse für das entsprechende Element

### Example

~~~jsx
gantt.templates.grid_row_class = function(start, end, task){
    return "";
};
~~~

### Details

Jede zweite Zeile sowohl im Grid als auch im Timeline-Bereich erhält eine zusätzliche CSS-Klasse namens **odd**, die verwendet werden kann, um abwechselnde Zeilenfarben zu erzeugen:

~~~css
.gantt_row.odd, .gantt_task_row.odd{
    background: silver;
}

.gantt_row, .gantt_task_row {
    background: white;
}
~~~

Standardmäßig gelten diese Styles nur für gerade Zeilen. Um ungerade Zeilen zu stylen, muss die Klasse **odd** in den Selektoren Ihrer CSS-Regeln hinzugefügt werden. Wenn Sie also möchten, dass alle Zeilen dieselbe Farbe haben, müssen Sie normalerweise Regeln für beide Selektoren (mit und ohne die Klasse '.odd') einbeziehen, da die Standard-CSS-Regeln [eine höhere Spezifität besitzen und Vorrang haben](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity).

~~~css
.gantt_row.odd, .gantt_task_row.odd,
.gantt_row, .gantt_task_row {
    background: white;
}
~~~

Dieser Ansatz gilt auch für benutzerdefinierte CSS-Klassen, die über die Templates [grid_row_class](api/template/grid_row_class.md) und [task_row_class](api/template/task_row_class.md) zugewiesen werden:


~~~js
gantt.templates.grid_row_class = function(start, end, task){
    return "wheat_color";
};
~~~
<br>

~~~css
.wheat_color,
.wheat_color.odd{
    background:wheat;
}
~~~

Es kann sein, dass auf dem Bildschirm die geraden Zeilen hervorgehoben erscheinen und nicht die ungeraden. Wenn Sie jedoch die [Zeilenindizes](api/method/gettaskindex.md) überprüfen, stellen Sie fest, dass die Styles auf Zeilen mit ungeraden Indizes (1, 3, 5 usw.) angewendet werden.

### Related Guides
- ["Vorlagen des Grids"](guides/table-templates.md)

