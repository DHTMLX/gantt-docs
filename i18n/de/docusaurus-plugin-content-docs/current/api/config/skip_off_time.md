---
sidebar_label: skip_off_time
title: skip_off_time Konfiguration
description: "Versteckt Nicht-Arbeitszeiten im Zeitmaßstab"
---

# skip_off_time
:::info
Diese Funktion ist nur in der PRO-Edition verfügbar.
:::
### Description

@short: Versteckt Nicht-Arbeitszeiten im Zeitmaßstab

@signature: skip_off_time: boolean

### Example

~~~jsx
// berechnet die Dauer in Arbeitsstunden und blendet Nicht-Arbeitszeit im Chart aus
gantt.config.duration_unit = "hour";
gantt.config.work_time = true; 
gantt.config.skip_off_time = true; /*!*/

gantt.init("gantt_here");
~~~  

**Default value:** false

### Details

Bitte beachten Sie, dass die **skip_off_time**-Konfiguration die Skala nicht verändert und die Zellen ausblendet, die überhaupt keine Arbeitszeit enthalten. 

Beispiel 1

Eine Tages-Skala beginnt bei 00:00 Uhr und endet um 23:59 Uhr. Die Arbeitszeiten beginnen um 08:00 Uhr und enden um 16:59 Uhr. Sie verwenden eine minimale Skala in Stunden.
Wenn die Konfiguration **skip_off_time** auf *true* gesetzt ist, werden die Zellen, die keine Arbeitszeit enthalten, für alle Skalen ausgeblendet.
Daher beginnt die Tages-Skala bei 08:00 Uhr und endet um 16:59 Uhr. Wenn Sie jedoch nur eine Tages-Skala haben, ändert sich nichts.
Sie beginnt bei 00:00 Uhr und endet um 23:59 Uhr, da es innerhalb eines Tages Arbeitszeiten gibt.

Beispiel 2

Eine Wochen-Skala hat 7 Tage, von denen 2 Tage frei sind (z. B. Samstag und Sonntag). Sie verwenden eine minimale Skala in Tagen. Wenn die Konfiguration **skip_off_time** auf *true* gesetzt ist, werden die freien Tage ausgeblendet und die Wochen-Skala wird von Montag bis Freitag gerendert. Wenn Sie jedoch nur eine Wochen-Skala haben, beginnt die Woche am Montag und endet am Sonntag, unabhängig von der Konfiguration **skip_off_time**, da es Tage in einer Woche gibt, an denen frei ist.

Es gibt zwei Möglichkeiten, ein Diagramm mit versteckter Nicht-Arbeitszeit darzustellen:

- eine Skala mit geringeren Einheiten hinzufügen (eine Stunden-Skala für eine Tages-Skala, eine Tages-Skala für eine Wochen-Skala, usw.)
- eine [benutzerdefinierte Skala](guides/configuring-time-scale.md#customtimeunits) hinzufügen, die nur die Arbeitszeiten/Tage darstellt

:::note
Beispiel: [5-Tage-Arbeitswochen auf der Skala](https://snippet.dhtmlx.com/eq70o558)
:::  

### Related API
- [correct_work_time](api/config/correct_work_time.md)
- [work_time](api/config/work_time.md)

### Related Guides
- [Berechnung der Arbeitszeit](guides/working-time.md)