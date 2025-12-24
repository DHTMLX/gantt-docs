---
title: "Ausblenden von Zeiteinheiten in der Skala"
sidebar_label: "Ausblenden von Zeiteinheiten in der Skala"
---

# Ausblenden von Zeiteinheiten in der Skala

:::info
Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::

Die Bibliothek ermöglicht es, unnötige Zeiteinheiten in der Zeitskala des Diagramms auszublenden. Dies ist beispielsweise nützlich, wenn Sie nur Arbeitstage anzeigen und Wochenenden ausschließen möchten.

Um eine Zeiteinheit in der Skala auszublenden, verwenden Sie in der Regel die **ignore_time**-Methode. Diese Methode ist eine Funktion, die das Datum einer Zelle als Parameter erhält. Um eine bestimmte Einheit auszublenden, sollte die Funktion für dieses Datum *true* zurückgeben.

Um beispielsweise Wochenenden aus der Skala auszublenden, können Sie die Methode wie folgt verwenden:

~~~js
// 0 steht für Sonntag, 6 für Samstag
gantt.ignore_time = function(date){
   if(date.getDay() == 0 || date.getDay() == 6)
      return true;
};
~~~

![skipped_weekends](/img/skipped_weekends.png)


[Not render weekends on the scale](https://docs.dhtmlx.com/gantt/samples/03_scales/09_skip_weekends.html)


:::note
Beachten Sie, dass das Ausblenden von Zeiteinheiten aus der Skala diese nicht aus der Berechnung der Aufgabendauer entfernt. Wenn Sie ausgeblendete Einheiten auch von den Dauern ausschließen möchten, 
lesen Sie bitte den Ansatz im Artikel [Work Time Calculation](guides/working-time.md)
:::

Bei der Arbeit mit [Arbeitszeit-Berechnungen](guides/working-time.md) können Sie [isWorkTime](api/method/isworktime.md) anstelle von fest codierten Werten verwenden:

~~~js
gantt.ignore_time = function(date){
   if(!gantt.isWorkTime(date))
      return true;
};
~~~


[Calculate working hours](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)


Es ist wichtig zu beachten, dass die **ignore_time**-Methode die Skala selbst nicht verändert. Nachfolgend finden Sie Beispiele, die zeigen, wie Zellen ohne Arbeitszeit oder Arbeitstage ausgeblendet werden.

Beispiel 1

Eine Tagesskala läuft von 00:00 bis 23:59, mit Arbeitszeiten von 08:00 bis 16:59. Wenn Sie eine minimale Skala in Stunden haben und **ignore_time** anwenden, werden Zellen, die keine Arbeitszeit darstellen, in allen Skalen ausgeblendet. Das bedeutet, die Tagesskala läuft effektiv von 08:00 bis 16:59. Haben Sie jedoch nur eine Tagesskala, bleibt sie unverändert und beginnt um 00:00 und endet um 23:59, da innerhalb dieses Tages Arbeitszeiten vorhanden sind.

Beispiel 2

Eine Wochenskala umfasst 7 Tage, davon 2 freie Tage (z. B. Samstag und Sonntag). Ist die minimale Skala in Tagen und **ignore_time** wird angewendet, werden die freien Tage ausgeblendet, sodass die Wochenskala Montag bis Freitag anzeigt. Wenn jedoch nur eine Wochenskala vorhanden ist, beginnt sie weiterhin am Montag und endet am Sonntag, da die Woche freie Tage enthält.

Es gibt zwei Möglichkeiten, ein Diagramm mit ausgeblendeten Zeiteinheiten anzuzeigen:

- Fügen Sie eine Skala mit kleineren Einheiten hinzu (zum Beispiel eine Stundenskala neben einer Tagesskala oder eine Tagesskala neben einer Wochenskala)
- Verwenden Sie eine [benutzerdefinierte Skala](guides/configuring-time-scale.md#customtimeunits), die nur die Arbeitszeiten oder Arbeitstage rendert

**Related example:** [5-Tage-Arbeitswochen in der Skala](https://snippet.dhtmlx.com/eq70o558)

