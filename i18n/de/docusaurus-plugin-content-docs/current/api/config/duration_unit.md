---
sidebar_label: duration_unit
title: duration_unit config
description: "setzt die Duration Unit"
---

# duration_unit

### Description

@short: Setzt die Duration Unit

@signature: duration_unit: string

### Example

~~~jsx
gantt.config.duration_unit = "hour";//eine Stunde
gantt.config.duration_step = 3; 
//wenn task.duration = 2 ist, dauert die Aufgabe 6 Stunden
~~~

**Default value:** "day"

### Related samples
- [Decimal durations for tasks](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)

### Details

Wenn verschiedene Tasks unterschiedliche Duration Units benötigen - zum Beispiel einige in Stunden und andere in Tagen angezeigt werden sollen - kann das [formatter module](guides/working-time.md#taskdurationindecimalformat) dabei helfen, dies zu verwalten.

In solchen Fällen sollte **duration_unit** auf die kleinste Einheit gesetzt werden, die irgendein Task verwenden könnte:

~~~js
gantt.config.duration_step = 1;
gantt.config.duration_unit = "minute";

// oder

gantt.config.duration_step = 1;
gantt.config.duration_unit = "hour";
~~~

Das formatter Plugin ermöglicht dann die Anzeige der Dauer in den gewünschten Einheiten. Es erlaubt auch den Benutzern, Dauerwerte in verschiedenen Einheiten einzugeben.

<br>
Wenn Sie "hour" oder "minute" als duration_unit wählen, ist es empfehlenswert, den [duration_step](api/config/duration_step.md) auf 1 zu setzen. Diese Einstellung aktiviert bestimmte Optimierungen für die Berechnung der Arbeitszeit, die nur funktionieren, wenn der Schritt genau 1 ist. Beachten Sie, dass es erhebliche Performance-Unterschiede zwischen dem "optimierten" und dem "nicht-optimierten" Modus gibt.

### Related API
- [duration_step](api/config/duration_step.md)
- @related: ["Arbeitszeitberechnung"](guides/working-time.md#taskdurationindecimalformat)
- @relatedsample: [Decimal durations for tasks](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md#taskdurationindecimalformat)
- @relatedsample: [Decimal durations for tasks](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)

