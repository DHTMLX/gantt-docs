---
sidebar_label: min_duration
title: min_duration config
description: "definiert die minimale Dauer (in Millisekunden), die für eine Aufgabe beim Ändern der Größe zulässig ist."
---

# min_duration

### Description

@short: Definiert die minimale Dauer (in Millisekunden), die für eine Aufgabe beim Ändern der Größe zulässig ist.

@signature: min_duration: number

### Example

~~~jsx
gantt.config.min_duration = 24*60*60*1000; // (1 Tag)
~~~

**Default value:** 60*60*1000, oder 3600000 ms, was 1 Stunde entspricht

### Details

- Diese Konfiguration legt die minimale Zeitspanne zwischen dem Start- und Enddatum einer Aufgabe fest <b>(task.start_date - task.end_date)</b>. Sie funktioniert unabhängig von den [Arbeitszeit-Einstellungen](guides/working-time.md) und den [Dauerberechnungen](api/method/calculateduration.md).

### Related Guides
- ["Verschieben von Aufgaben innerhalb der Zeitleiste"](guides/dnd.md)

