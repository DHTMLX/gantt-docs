---
sidebar_label: time_step
title: time_step config
description: "setzt den minimalen Schritt (in Minuten) für die Zeitwerte der Aufgabe"
---

# time_step

### Description

@short: Legt den minimalen Schritt (in Minuten) für die Zeitwerte der Aufgabe fest

@signature: time_step: number

### Example

~~~jsx
gantt.config.time_step = 15;
...
gantt.init("gantt_here");
~~~

**Default value:** 60

### Details

- Die Start- und Endzeiten einer Aufgabe nehmen Werte an, die Vielfache des time_step sind, d. h., wenn *time_step = 20*, kann die Aufgabe nur zu folgenden Zeiten beginnen: 0, 20, 40 Minuten usw.
- Die Lightbox-Zeit-Auswahl verwendet denselben time_step.

:::note
Wenn Sie möchten, dass eine Aufgabe mit dem durch time_step festgelegten Schritt gezogen wird, müssen Sie die config [round_dnd_dates](api/config/round_dnd_dates.md) auf *false* setzen.
~~~js
gantt.config.round_dnd_dates = false;
~~~
 
:::

:::note
Beispiel: [Gantt. Drag'n'drop von Aufgaben mit dem minimalen Schritt](https://snippet.dhtmlx.com/bd7ir3w7)
:::

### Related API
- [round_dnd_dates](api/config/round_dnd_dates.md)