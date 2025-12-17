---
sidebar_label: getSubtaskDates
title: getSubtaskDates method
description: "berechnet die kombinierten Start-/Enddaten von Aufgaben, die in einem Projekt oder einer anderen Aufgabe verschachtelt sind"
---

# getSubtaskDates

### Description

@short: Berechnet die kombinierten Start-/Enddaten von Aufgaben, die in einem Projekt oder einer anderen Aufgabe verschachtelt sind

@signature: getSubtaskDates: (task_id?: string | number) =\> any

### Parameters
- `task_id` - (optional) *string | number* - die ID der Aufgabe, root_id wird verwendet, wenn nicht angegeben

### Returns
- ` dates` - (object) - ein Objekt, das die Eigenschaften <b>start_date</b> und <b>end_date</b> enthält

### Example

~~~jsx
// Dauer des gesamten Projekts
let dates = gantt.getSubtaskDates();
const dateToStr = gantt.templates.task_date;
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);

// Dauer des Teilprojekts
dates = gantt.getSubtaskDates(1);
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);
~~~

### Details

Diese Methode liefert ein Objekt, das das Startdatum der frühesten Unteraufgabe und das Enddatum der spätesten Unteraufgabe anzeigt.

Das zurückgegebene Objekt sieht folgendermaßen aus:

~~~js
{
  start_date: Date|null,
  end_date: Date|null
}
~~~

Wenn das Gantt-Diagramm geplante Aufgaben enthält, enthalten beide Eigenschaften Datumswerte. Ist das Diagramm leer oder enthält nur ungeplante Aufgaben, sind beide Eigenschaften `null`.

### Related API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getTaskBy](api/method/gettaskby.md)

