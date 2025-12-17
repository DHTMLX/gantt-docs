---
sidebar_label: time_step
title: time_step config
description: "legt den minimalen Schritt (in Minuten) für die Zeitwerte der Aufgabe fest"
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

- Die Start- und Endzeiten von Aufgaben richten sich nach Vielfachen des time_step. Zum Beispiel können bei *time_step = 20* Aufgaben nur um 0, 20, 40 Minuten usw. beginnen.
- Der Zeit-Selector im Lightbox folgt dem gleichen time_step.

:::note
 Damit Aufgaben beim Draggen am durch die **time_step**-Eigenschaft definierten Schritt einrasten, stellen Sie sicher, dass die [round_dnd_dates](api/config/round_dnd_dates.md)-Konfiguration auf *false* gesetzt ist.
~~~js
gantt.config.round_dnd_dates = false;
~~~
 
:::

:::note
Sample: [Gantt. Drag'n'drop von Aufgaben mit minimalem Schritt](https://snippet.dhtmlx.com/bd7ir3w7) 
:::

### Related API
- [round_dnd_dates](api/config/round_dnd_dates.md)

