---
sidebar_label: scales
title: scales config
description: "richtet die Konfiguration für die time scale ein"
---

# scales

### Description

@short: Richtet die Konfiguration für die time scale ein

@signature: scales: Scales

### Example

~~~jsx
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: function (date) {
        return "Week #" + gantt.date.getWeek(date);
    }},
    {unit: "day", step: 1, format: "%D", css: function(date) {
    if(!gantt.isWorkTime({ date: date, unit: "day"})){
            return "weekend"
        }
    }}
];
~~~

### Details

Jeder Eintrag im Array repräsentiert eine einzelne scale. Das Objekt kann folgende Eigenschaften enthalten:

- **unit** - (*string*) - gibt die Einheit der scale an. Optionen sind: "minute", "hour", "day" (Standard), "week", "quarter", "month", "year". 
Es können auch benutzerdefinierte Einheiten definiert werden. Weitere Details finden Sie [hier](guides/configuring-time-scale.md#customtimeunits).
- **step?** - (*number*) - definiert die Schrittweite der time scale (X-Achse), Standard ist 1.
- **format? (date): any** - (*string | Funktion*) - bestimmt, wie die Labels der scale formatiert werden. Wenn eine Funktion angegeben wird, erhält sie ein Date-Objekt.
    - **_date_** - (*Date*) - das zu formatierende Datum
- **date? (date): any** - (*string | Funktion*) - eine weitere Möglichkeit, das Format der Labels der scale anzugeben, entweder als String oder als Funktion mit einem Date-Parameter.
    - **_date_** - (*Date*) - das zu formatierende Datum
- **css? (date): any** - eine Funktion, die einen CSS-Klassennamen zurückgibt, der auf scale-Einheiten angewendet wird, basierend auf dem übergebenen Datum.
    - **_date_** - (*Date*) - das Datum zur Auswertung
- **sticky?** - (*boolean*) - hält das scale-Label sichtbar, wenn die scale-Zelle breiter als der Viewport ist
