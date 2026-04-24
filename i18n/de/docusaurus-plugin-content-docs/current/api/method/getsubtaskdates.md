---
sidebar_label: getSubtaskDates
title: getSubtaskDates method
description: "berechnet die kombinierten Start- und Enddaten von Aufgaben, die in einem Projekt oder einer anderen Aufgabe verschachtelt sind"
---

# getSubtaskDates

### Description

@short: Berechnet die kombinierten Start- und Enddaten von Aufgaben, die in einem Projekt oder einer anderen Aufgabe verschachtelt sind

@signature: getSubtaskDates: (task_id?: string | number) =\> any

### Parameters

- `task_id` - (optional) *string | number* - die ID der Aufgabe, [root_id](api/config/root_id.md) wird verwendet, wenn sie nicht angegeben wird

### Returns
- `dates` - (Objekt) - ein Objekt, das die <b>start_date</b> und <b>end_date</b> Eigenschaften enthält

### Example

~~~jsx
// Dauer des gesamten Projekts
let dates = gantt.getSubtaskDates();
const dateToStr = gantt.templates.task_date;
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);

// Dauer des Unterprojekts
dates = gantt.getSubtaskDates(1);
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);
~~~

### Details

Die Methode gibt ein Objekt zurück, das das Startdatum der frühesten Unteraufgabe und das Enddatum der spätesten Unteraufgabe enthält.

Das Rückgabeobjekt hat folgendes Format:

~~~js
{
  start_date: Date|null,
  end_date: Date|null
}
~~~

Wenn ein Gantt-Diagramm geplante Aufgaben enthält, besitzen beide Eigenschaften Datumswerte. Falls das Gantt-Diagramm leer ist oder nur ungeplante Aufgaben enthält, haben beide Eigenschaften `null`-Werte.

### Related API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getTaskBy](api/method/gettaskby.md)