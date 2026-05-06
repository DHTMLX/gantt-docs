---
sidebar_label: duration_unit
title: duration_unit Konfiguration
description: "legt die Dauer-Einheit fest"
---

# duration_unit

### Description

@short: Legt die Dauer-Einheit fest

@signature: duration_unit: string

### Example

~~~jsx
gantt.config.duration_unit = "hour";//an hour
gantt.config.duration_step = 3; 
//so if task.duration = 2, the task will long 6 hours
~~~

**Default value:**"day" 

### Related samples
- [Dezimal-Dauern für Aufgaben](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)

### Details

Wenn Sie unterschiedliche Dauer-Einheiten für verschiedene Aufgaben wünschen, d. h. um die Dauern einiger Aufgaben in Stunden und andere Aufgaben in "Tagen" anzuzeigen, können Sie das [formatter module](guides/working-time.md#taskdurationindecimalformat) verwenden. 

In einem solchen Szenario muss duration_unit auf die kleinste Dauer festgelegt werden, die Ihre Aufgaben haben können:

~~~js
gantt.config.duration_step = 1;
gantt.config.duration_unit = "minute";

 // oder

gantt.config.duration_step = 1;
gantt.config.duration_unit = "hour";
~~~

Und das formatter plugin ermöglicht es Ihnen, Dauern in den benötigten Einheiten anzuzeigen. Die Endanwender werden außerdem in der Lage sein, Dauern in unterschiedlichen Einheiten einzugeben.


Wenn Sie die Dauer-Einheit auf "hour" oder "minute" festlegen, empfehlen wir, duration_step auf 1 zu setzen.
Eine solche Kombination aktiviert bestimmte Optimierungen bei der Berechnung der Arbeitszeit, die nur funktionieren, wenn der Schritt auf 1 gesetzt ist. Beachten Sie, dass es erhebliche Leistungsunterschiede zwischen den Optionen "optimized" und "non-optimized" Modi gibt.


### Related API
- [duration_step](api/config/duration_step.md)

### Related Guides
- [Arbeitszeitberechnung](guides/working-time.md#taskdurationindecimalformat)