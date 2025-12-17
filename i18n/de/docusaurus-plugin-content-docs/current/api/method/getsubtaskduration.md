---
sidebar_label: getSubtaskDuration
title: getSubtaskDuration method
description: "berechnet die Gesamtdauer der innerhalb eines Projekts oder einer anderen Aufgabe verschachtelten Tasks."
---

# getSubtaskDuration

### Description

@short: Berechnet die Gesamtdauer der innerhalb eines Projekts oder einer anderen Aufgabe verschachtelten Tasks.

@signature: getSubtaskDuration: (task_id?: string | number) =\> number

### Parameters
- `task_id` - (optional) *string | number* - die ID der Aufgabe; falls ausgelassen, wird standardmäßig root_id verwendet

### Returns
- ` duration` - (number) - die Gesamtdauer der verschachtelten Tasks

### Example

~~~jsx
const formatter = gantt.ext.formatters.durationFormatter();
//Dauer des gesamten Projekts
let duration = gantt.getSubtaskDuration();
    
console.log(formatter.format(duration));

//Dauer des Teilprojekts
duration = gantt.getSubtaskDates(1);
    
console.log(formatter.format(duration));
~~~

### Details

Diese Methode berechnet die Gesamtdauer aller Tasks, die innerhalb eines Projekts oder einer anderen Aufgabe verschachtelt sind.

Beachten Sie, dass Tasks vom [Projekt-Typ](api/config/types.md) von dieser Gesamtdauer ausgeschlossen sind.

Der zurückgegebene Wert wird in den in der Konfiguration definierten [Dauereinheiten](api/config/duration_unit.md) angegeben.

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)
- [getTaskBy](api/method/gettaskby.md)

### Related Guides
- ["Formatters-Erweiterung"](guides/formatters-ext.md#durationformatter)

