---
title: "Manuell geplante Zusammenfassungsaufgaben"
sidebar_label: "Manuell geplante Zusammenfassungsaufgaben"
---

Manuell geplante Zusammenfassungsaufgaben
=========================================

Es ist möglich, [Projekte](guides/task-types.md) (Zusammenfassungsaufgaben) manuell zu planen, um mehr Kontrolle und Präzision bei der Arbeit mit Gantt-Diagrammen zu erhalten.

Normalerweise setzen Zusammenfassungsaufgaben ihre Daten automatisch, indem sie das früheste Start- und das späteste Enddatum ihrer Unteraufgaben übernehmen. Sie können dieses Verhalten jedoch überschreiben, indem Sie den Zusammenfassungsaufgaben feste Start- und Enddaten zuweisen, unabhängig von ihren Unteraufgaben. Das bedeutet, dass im Gantt-Diagramm sowohl die feste Dauer als auch die aus den Unteraufgaben berechnete Dauer angezeigt werden.


[Manually Scheduled Projects](https://docs.dhtmlx.com/gantt/samples/04_customization/25_project_dates.html)


Um die manuelle Planung für eine Zusammenfassungsaufgabe zu aktivieren, setzen Sie die Eigenschaft [auto_scheduling](api/config/auto_scheduling.md) auf *false*.

Die festen Daten werden in **task.start_date** und **task.end_date** gespeichert, während die aus den Unteraufgaben berechneten Daten in **task.$auto_start_date** und **task.$auto_end_date** verfügbar sind.

~~~js
gantt.parse({
  data: [
    {
      id: 1,
      text: "Project Phase 1",
      type: "project",
      start_date: "2025-05-01 00:00:00",
      duration: 15,
      auto_scheduling: false /* ! */
    },
    // ...
  ],
});
~~~

Sowohl die manuell festgelegte Dauer der Zusammenfassungsaufgabe als auch die tatsächliche Dauer basierend auf den Unteraufgaben werden im Gantt-Diagramm angezeigt.

Wenn die Daten der Unteraufgaben über die festgelegten Daten der Zusammenfassungsaufgabe hinausgehen, wird die Zusammenfassungsaufgabe hervorgehoben, um auf einen Planungskonflikt hinzuweisen. Dieser visuelle Indikator hilft den Nutzern, Zeitinkonsistenzen schnell zu erkennen und zu beheben.

![Hervorhebung einer Zusammenfassungsaufgabe außerhalb des zulässigen Bereichs](/img/custom_project_dates.png)

