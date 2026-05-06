---
title: "Manuell Geplante Zusammenfassungsaufgaben"
sidebar_label: "Manuell Geplante Zusammenfassungsaufgaben"
---

# Manuell Geplante Zusammenfassungsaufgaben

Es besteht die Möglichkeit, [Projekte](guides/task-types.md) (Zusammenfassungsaufgaben) manuell zu planen. Diese Funktion dient der Erhöhung der Flexibilität und Genauigkeit bei der Verwaltung von Projekten mit Gantt-Diagrammen.

Standardmäßig berechnen Zusammenfassungsaufgaben ihre Termine automatisch basierend auf dem frühesten Startdatum und dem spätesten Enddatum ihrer Unteraufgaben. Sie können außerdem feste Start- und Enddaten für Zusammenfassungsaufgaben unabhängig von ihren Unteraufgaben festlegen. Dadurch zeigt das Gantt-Diagramm sowohl die feste Dauer als auch die aus Unteraufgaben abgeleitete Dauer an.

[Manuell Geplante Projects](https://docs.dhtmlx.com/gantt/samples/04_customization/25_project_dates.html)

Um diese Funktion für eine Zusammenfassungsaufgabe zu aktivieren, setzen Sie die [auto_scheduling](api/config/auto_scheduling.md) Eigenschaft auf *false*. 

Die festen Termine werden in **task.start_date** und 
**task.end_date** gespeichert, während die aus den Unteraufgaben berechneten Termine in **task.$auto_start_date** und **task.$auto_end_date** verfügbar sind.

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

Sowohl die feste Dauer der Zusammenfassungsaufgabe als auch die tatsächliche Dauer, die aus ihren Unteraufgaben berechnet wird, werden im Gantt-Diagramm angezeigt. 

Wenn der Datumsbereich der Unteraufgabe außerhalb der zugewiesenen Termine der Zusammenfassungsaufgabe liegt, wird die Zusammenfassungsaufgabe hervorgehoben, um einen Scheduling-Konflikt anzuzeigen. Dieser visuelle Hinweis hilft Endbenutzern, Diskrepanzen im Projektzeitplan schnell zu identifizieren und zu beheben.

![Hervorheben einer Zusammenfassungsaufgabe außerhalb des zulässigen Bereichs](/img/custom_project_dates.png)