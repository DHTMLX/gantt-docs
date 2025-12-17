---
sidebar_label: fit_tasks
title: fit_tasks config
description: "'weist' das Gantt-Diagramm an, die Zeitskala automatisch anzupassen, um alle angezeigten Aufgaben darzustellen"
---

# fit_tasks

### Description

@short: 'weist' das Gantt-Diagramm an, die Zeitskala automatisch anzupassen, um alle angezeigten Aufgaben darzustellen

@signature: fit_tasks: boolean

### Example

~~~jsx
gantt.config.fit_tasks = true; /*!*/
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto resize scale](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)

### Details

Standardmäßig erweitert dhtmlxGantt die Zeitskala nicht automatisch, wenn eine Aufgabe über das aktuelle Intervall hinausgeht. Diese Situation kann auftreten, wenn ein Benutzer die Daten einer Aufgabe ändert oder nach einer automatischen Planung. 
Dadurch kann die Aufgabenleiste abgeschnitten werden oder unsichtbar sein.

Um sicherzustellen, dass die Skala jedes Mal aktualisiert wird, wenn eine Aufgabe nicht in das aktuelle Skalenintervall passt, setzen Sie die [fit_tasks](api/config/fit_tasks.md)-Eigenschaft auf *true*.

Beachten Sie, dass dieses Verhalten durch die Einstellungen [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) überschrieben werden kann, die die Zeitskala auf bestimmte Grenzen beschränken.

Wenn Sie möchten, dass sich die Zeitskala dynamisch basierend auf dem Datumsbereich anpasst, können Sie entweder die Einstellungen [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) weglassen oder [den Zeitbereich dynamisch verwalten](guides/configuring-time-scale.md#range).

<br>

**Zum Beispiel beträgt die Anfangsdauer der Aufgabe "Project #2" 6 Tage.**


![property_fit_tasks_01](/img/property_fit_tasks_01.png)

Wenn die Dauer auf 8 Tage verlängert wird, reagiert das Gantt-Diagramm je nach Wert der [fit_tasks](api/config/fit_tasks.md)-Eigenschaft unterschiedlich:


- **gantt.config.fit_tasks = false;** (Standardwert)

![property_fit_tasks_02](/img/property_fit_tasks_02.png)

- **gantt.config.fit_tasks = true;** 

![property_fit_tasks_03](/img/property_fit_tasks_03.png)

### Related API
- [onScaleAdjusted](api/event/onscaleadjusted.md)
- [end_date](api/config/end_date.md)
- [start_date](api/config/start_date.md)
- [init](api/method/init.md)

