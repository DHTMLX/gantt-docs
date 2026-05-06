---
sidebar_label: getSubtaskDuration
title: getSubtaskDuration Methode
description: "Berechnet die kombinierte Dauer von Aufgaben, die in ein Projekt oder eine andere Aufgabe verschachtelt sind."
---

# getSubtaskDuration

### Description

@short: Berechnet die kombinierte Dauer von Aufgaben, die in ein Projekt oder eine andere Aufgabe verschachtelt sind.

@signature: getSubtaskDuration: (task_id?: string | number) =\> number

### Parameters

- `task_id` - (optional) *string | number*	- die Aufgaben-ID, [root_id](api/config/root_id.md) wird verwendet, falls sie nicht angegeben ist

### Returns
- ` duration` - (number) - Gesamtdauer der verschachtelten Aufgaben

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

Berechnet die kombinierte Dauer von Aufgaben, die in ein Projekt oder eine andere Aufgabe verschachtelt sind.

Aufgaben des [Projekttyp](api/config/types.md) werden nicht in die Gesamtdauer eingerechnet.

Der Rückgabewert wird gemäß der Konfiguration in [Dauer-Einheiten](api/config/duration_unit.md) berechnet.

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)
- [getTaskBy](api/method/gettaskby.md)

### Related Guides
- [Formatters Extension](guides/formatters-ext.md#durationformatter)