---
sidebar_label: roundDate
title: roundDate method
description: "rundet das angegebene Datum auf das nächstgelegene Datum basierend auf der Zeitskala"
---

# roundDate

### Description

@short: Rundet das angegebene Datum auf das nächstgelegene Datum basierend auf der Zeitskala

@signature: roundDate: (date: Date | RoundDateConfig) =\> Date

### Parameters

- `date` - (required) *Date | RoundDateConfig* -     Das Date-Objekt, das gerundet werden soll, oder ein Objekt mit Konfigurationsoptionen

### Returns
- ` date` - (Date) - Das gerundete Date-Objekt

### Example

~~~jsx
var today = gantt.roundDate(new Date());
~~~

### Details

Um ein bestimmtes Datum auf das nächstgelegene Datum zu runden, übergeben Sie einfach das Date-Objekt an diese Methode:

~~~js
var today = gantt.roundDate(new Date());
console.log(today);
~~~

Wenn Sie das Datum nach einer bestimmten Zeiteinheit runden möchten, verwenden Sie ein Objekt mit Einstellungen als Parameter für die **roundDate()**-Methode. Dieses Objekt kann die folgenden Eigenschaften enthalten:

- **date** - (*Date*) - Das zu rundende Date-Objekt;
- **unit?** - (*string*) - Die Zeiteinheit, nach der gerundet wird ("minute", "hour", "day", "week", "month", "year");
- **step?** - (*number*) - Der Intervall-Schritt der Zeitskala (X-Achse), Standard ist 1.

~~~js
var today = gantt.roundDate({
    date: new Date(),
    unit: "hour",
    step: 1   
});
console.log(today);
~~~

### Related API
- [roundTaskDates](api/method/roundtaskdates.md)

