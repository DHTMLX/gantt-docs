---
sidebar_label: scales
title: scales config
description: "richtet die Konfiguration für die time scale ein"
---

# scales

### Description

@short: Definiert die Konfigurationseinstellungen der Zeitachse

@signature: scales: Scales

### Example

~~~jsx
gantt.config.scales = [
    { unit: "month", step: 1, format: "%F, %Y" },
    {
        unit: "week",
        step: 1,
        format: (date) => `Week #${gantt.date.getWeek(date)}`
    },
    {
        unit: "day",
        step: 1,
        format: "%D",
        css: (date) => !gantt.isWorkTime({ date, unit: "day" }) ? "weekend" : ""
    }
];
~~~

### Details

Each object in the array specifies a single scale. An object can take the following attributes:

- **unit** - (*string*) - der Name der Zeiteinheit. Die verfügbaren Werte sind: "minute", "hour", "day" (Standard), "week", "quarter", "month", "year".
Es besteht auch die Möglichkeit, eine benutzerdefinierte Einheit festzulegen. Lesen Sie dazu mehr unter [here](guides/configuring-time-scale.md#customtimeunits).
- **step?** - (*number*) - der Schritt der Zeitachse (X-Achse), standardmäßig 1.
- **format? (date): any** - (*string | Funktion*) - das Format der Beschriftungen der Skala. Wird es als Funktion festgelegt, wird ein Date-Objekt als Parameter erwartet.
    - **_date_** - (*Date*) - ein Datum, das konvertiert wird
- **date? (date): any** - (*string | Funktion*) - das Format der Skalenbeschriftungen. Wenn es als Funktion festgelegt wird, wird ein Date-Objekt als Parameter erwartet.
    - **_date_** - (*Date*) - ein Datum, das konvertiert wird
- **css? (date): any** - eine Funktion, die den Namen einer CSS-Klasse zurückgibt, die auf die Skalen-Einheiten angewendet wird. Nimmt ein Date-Objekt als Parameter.
    - **_date_** - (*Date*) - ein Datum, das überprüft wird
- **sticky?** - (*boolean*) - macht die Skalenbeschriftung sichtbar, wenn die Zellenbreite größer als die Breite des Viewports ist