---
sidebar_label: grid_row_class
title: grid_row_class Vorlage
description: "bestimmt die CSS-Klasse, die auf eine Grid-Zeile angewendet wird"
---

# grid_row_class

### Description

@short: Definiert die CSS-Klasse, die einer grid-Zeile zugewiesen wird

@signature: grid_row_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe voraussichtlich beginnt
- `end` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe voraussichtlich abgeschlossen wird
- `task` - (erforderlich) *Task* - das Task-Objekt

### Returns
- `text` - (string | void) - eine CSS-Klasse für das betroffene Element

### Example

~~~jsx
gantt.templates.grid_row_class = function(start, end, task){
    return "";
};
~~~

### Details

Jede zweite Zeile des Grids und des Timeline-Bereichs enthält eine zusätzliche CSS-Klasse namens **odd**, die verwendet werden kann, um die Farben der Zeilen abwechseln:

~~~css
.gantt_row.odd, .gantt_task_row.odd{
    background: silver;
}

.gantt_row, .gantt_task_row {
    background: white;
}
~~~

Durch Standardwerte werden die Stile nur auf gerade Zeilen angewendet. Um ungerade Zeilen zu stylen, müssen Sie der Style-Regel die Klasse **odd** hinzufügen. Daher, wenn Sie allen Zeilen dieselbe Farbe zuweisen möchten, müssen Sie in der Regel eine CSS-Regel für beide Selektoren (mit und ohne '.odd'-Klasse) angeben; andernfalls werden die Standard-CSS-Regeln [spezieller und erhalten eine höhere Priorität](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity).

~~~css
.gantt_row.odd, .gantt_task_row.odd,
.gantt_row, .gantt_task_row {
{
    background: white;
}
~~~

Dasselbe gilt auch für die benutzerdefinierten CSS-Klassen, die Sie über die [grid_row_class](api/template/grid_row_class.md) und [task_row_class](api/template/task_row_class.md) Vorlagen anwenden können:

~~~js
gantt.templates.grid_row_class = function(start, end, task){
    return "wheat_color";
};
~~~

~~~css
.wheat_color,
.wheat_color.odd{
    background:wheat;
}
~~~

Sie werden feststellen, dass die geraden Zeilen auf dem Bildschirm hervorgehoben sind statt der ungeraden. Wenn Sie jedoch die [Indizes der Zeilen](api/method/gettaskindex.md) überprüfen, werden Sie sehen, dass der Stil auf die Zeilen angewendet wird, die ungerade Indizes haben (1, 3, 5 usw.).

### Related Guides
- [Vorlagen des Grids](guides/table-templates.md)