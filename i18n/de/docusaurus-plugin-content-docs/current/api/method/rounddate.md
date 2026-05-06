---
sidebar_label: roundDate
title: roundDate Methode
description: "Rundet das angegebene Datum auf das nächstgelegene Datum im Zeitmaßstab"
---

# roundDate

### Description

@short: Rundet das angegebene Datum auf das nächstgelegene Datum im Zeitmaßstab

@signature: roundDate: (date: Date | RoundDateConfig) => Date

### Parameters

- `date` - (required) *Date | RoundDateConfig* - das Date-Objekt, das gerundet werden soll oder ein Objekt mit Einstellungen

### Returns
- `date` - (Date) - das gerundete Date-Objekt

### Example

~~~jsx
var today = gantt.roundDate(new Date());
~~~


### Details

Wenn das angegebene Datum auf das nächstgelegene Datum gerundet werden soll, übergeben Sie das Date-Objekt als Parameter an die Methode:

~~~js
var today = gantt.roundDate(new Date());
console.log(today);
~~~

Wenn das angegebene Datum unter Berücksichtigung der Zeiteinheit auf das nächstgelegene Datum gerundet werden soll, übergeben Sie der **roundDate()**-Methode ein Objekt mit Einstellungen. Das Objekt kann folgende Attribute enthalten:

- **date** - (*Date*) - das Date-Objekt, das gerundet werden soll;
- **unit?** - (*string*) - die Zeiteinheit ("minute", "hour", "day", "week", "month", "year");
- **step?** - (*number*) - der Schritt der Zeitachse (X-Achse), standardmäßig 1.

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