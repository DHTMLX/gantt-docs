---
sidebar_label: show_unscheduled
title: show_unscheduled Konfiguration
description: "ermöglicht das Anzeigen ungeplanter Aufgaben"
---

# show_unscheduled

### Description

@short: Aktiviert das Anzeigen ungeplanten Aufgaben

@signature: show_unscheduled: boolean

### Example

~~~jsx
gantt.config.show_unscheduled = false;

gantt.init("gantt_here");
~~~

**Standardwert:** true

### Related samples
- [Ungeplante Aufgaben anzeigen](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

### Details

Hinweis: Standardmäßig werden ungeplante Aufgaben als eine leere Zeile angezeigt. Um sie im Timeline-Bereich anzuzeigen, müssen Sie den Wert der Eigenschaft **show_unscheduled** auf *false* setzen. Dies kann verwirrend sein, aber in einer der zukünftigen Versionen werden wir die Inkonsistenz zwischen dem Namen der Eigenschaft und ihren Werten beheben.

### Related API
- [task_unscheduled_time](api/template/task_unscheduled_time.md)

### Related Guides
- [Grundlegende Operationen mit Aufgaben](guides/unscheduled-tasks.md)