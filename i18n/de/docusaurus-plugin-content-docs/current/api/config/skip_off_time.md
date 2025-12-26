---
sidebar_label: skip_off_time
title: skip_off_time config
description: "blendet die Nicht-Arbeitszeit aus der Zeitskala aus"
---

# skip_off_time
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Blendet die Nicht-Arbeitszeit aus der Zeitskala aus

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

Beachte, dass die Einstellung **skip_off_time** die Skala selbst nicht verändert, sondern nur die Zellen ausblendet, die keinerlei Arbeitszeit enthalten.

Beispiel 1

Stellen Sie sich eine Tages-Skala vor, die von 00:00 bis 23:59 läuft, mit Arbeitszeiten von 08:00 bis 16:59, und die kleinste Skalen-Einheit ist eine Stunde. 
Wenn **skip_off_time** auf *true* gesetzt ist, werden alle Zellen, die Nicht-Arbeitsstunden darstellen, in allen Skalen ausgeblendet. 
Das bedeutet, die Tages-Skala zeigt effektiv nur von 08:00 bis 16:59 an. Wenn jedoch nur die Tages-Skala angezeigt wird, bleibt diese unverändert und beginnt bei 00:00 und endet bei 23:59, da der Tag Arbeitszeiten enthält.

Beispiel 2

Betrachten Sie eine Wochen-Skala, die 7 Tage umfasst, mit 2 freien Tagen (z.B. Samstag und Sonntag), und die kleinste Skalen-Einheit ist ein Tag. Wenn **skip_off_time** auf *true* gesetzt ist, werden die freien Tage ausgeblendet, sodass die Wochen-Skala nur Montag bis Freitag zeigt. Wenn jedoch nur die Wochen-Skala sichtbar ist, läuft sie weiterhin von Montag bis Sonntag, unabhängig von der Einstellung **skip_off_time**, da die Woche auch freie Tage enthält.

Es gibt zwei Möglichkeiten, ein Chart anzuzeigen, das Nicht-Arbeitszeit ausblendet:

- Fügen Sie eine Skala mit kleineren Einheiten hinzu (z.B. eine Stunden-Skala neben einer Tages-Skala oder eine Tages-Skala neben einer Wochen-Skala)
- Verwenden Sie eine [benutzerdefinierte Skala](guides/configuring-time-scale.md#customtimeunits), die nur die Arbeitsstunden oder Arbeitstage anzeigt

:::note
Sample: [5-Tage-Arbeitswochen in der Skala](https://snippet.dhtmlx.com/eq70o558) 
:::

### Related API
- [correct_work_time](api/config/correct_work_time.md)
- [work_time](api/config/work_time.md)

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md)

