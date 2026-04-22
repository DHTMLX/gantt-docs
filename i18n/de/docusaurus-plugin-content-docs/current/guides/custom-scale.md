---
title: "Ausblenden von Zeiteinheiten in der Skala"
sidebar_label: "Ausblenden von Zeiteinheiten in der Skala"
---

# Ausblenden von Zeiteinheiten in der Skala

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar
:::

Die Bibliothek bietet die Möglichkeit, unnötige Zeiteinheiten in der Zeitskala des Diagramms auszublenden. Sie können diese Möglichkeit zum Beispiel verwenden, um nur Arbeitstage anzuzeigen und Wochenenden auszublenden. 


Im Allgemeinen müssen Sie, um eine Zeiteinheit in der Zeitskala auszublenden, die Methode **ignore_time** verwenden.
Die Methode ist eine Funktion, die das Datum der Zelle als Parameter nimmt. Um eine Einheit auszublenden – geben Sie dafür *true* zurück.


Beispielsweise um Wochenenden von der Skala auszublenden, verwenden Sie die Methode wie folgt:

~~~js
// 0 refers to Sunday, 6 - to Saturday
gantt.ignore_time = function(date){
   if(date.getDay() == 0 || date.getDay() == 6)
      return true;
};
~~~

![skipped_weekends](/img/skipped_weekends.png)


[Wochenenden nicht auf der Skala darstellen](https://docs.dhtmlx.com/gantt/samples/03_scales/09_skip_weekends.html)


:::note
Beachten Sie, dass das Ausblenden von Zeiteinheiten aus der Skala diese Einheiten nicht von der Berechnung der Aufgaben-Dauer ausschließt. Um ausgeblendete Einheiten von der Berechnung der Dauer auszuschließen, verwenden Sie die in dem Artikel [Arbeitszeitberechnung](guides/working-time.md) beschriebene Technik.
:::

Beachten Sie, dass Sie beim Verwenden von [Arbeitszeitsberechnungen](guides/working-time.md) die Methode [isWorkTime](api/method/isworktime.md) statt harter Werte verwenden können:

~~~js
gantt.ignore_time = function(date){
   if(!gantt.isWorkTime(date))
      return true;
};
~~~

[Arbeitsstunden berechnen](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)


Bitte beachten Sie, dass die Methode **ignore_time** die Skala nicht verändert. Betrachten wir unten die Beispiele, die das Ausblenden von Zellen beschreiben, die keine Arbeitsstunden/Arbeitstage haben.

Beispiel 1

Eine Tag-Skala beginnt um 00:00 und endet um 23:59, die Arbeitszeiten beginnen um 08:00 und enden um 16:59. Sie haben eine minimale Skala in Stunden. 
Wenn die **ignore_time**-Methode angewendet wird, werden Zellen, die keine Arbeitszeit haben, für alle Skalen ausgeblendet. 
Somit beginnt die Tag-Skala um 08:00 und endet um 16:59. Wenn Sie jedoch nur eine Tag-Skala haben, wird sie nicht geändert.
Sie beginnt um 00:00 und endet um 23:59, da innerhalb eines Tages Arbeitszeiten vorhanden sind.

Beispiel 2

Eine Wochen-Skala hat 7 Tage, von denen 2 Tage frei sind (z. B. Samstag und Sonntag). Sie haben eine minimale Skala in Tagen. Wenn die **ignore_time**-Methode angewendet wird, werden die freien Tage versteckt und die Wochen-Skala wird von Montag bis Freitag dargestellt. Wenn Sie jedoch nur eine Wochen-Skala haben, beginnt die Woche am Montag und endet am Sonntag, da es Tage in einer Woche gibt, die frei sind.

Es gibt zwei Möglichkeiten, ein Diagramm mit versteckten Zeiteinheiten darzustellen:

- eine Skala mit geringeren Einheiten hinzufügen (eine Stunden-Skala für eine Tages-Skala, eine Tages-Skala für eine Wochen-Skala usw.)
- eine [benutzerdefinierte Skala](guides/configuring-time-scale.md#customtimeunits) hinzufügen, die nur die Arbeitsstunden/Arbeitstage darstellt

**Zugehöriges Beispiel** [5-Tage-Arbeitswochen auf der Skala](https://snippet.dhtmlx.com/eq70o558)

### Verwandte 
-  [Arbeitszeitberechnung](guides/working-time.md)
-  [Skala einrichten](guides/configuring-time-scale.md)