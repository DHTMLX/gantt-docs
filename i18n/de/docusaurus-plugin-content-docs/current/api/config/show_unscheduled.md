---
sidebar_label: show_unscheduled
title: show_unscheduled config
description: "ermöglicht das Umschalten der Sichtbarkeit von nicht geplanten Tasks"
---

# show_unscheduled

### Description

@short: Ermöglicht das Umschalten der Sichtbarkeit von nicht geplanten Tasks

@signature: show_unscheduled: boolean

### Example

~~~jsx
gantt.config.show_unscheduled = false;

gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

### Details

Standardmäßig erscheinen nicht geplante Tasks als leere Zeilen. Wenn Sie möchten, dass diese Tasks direkt im Timeline-Bereich angezeigt werden, setzen Sie die Eigenschaft **show_unscheduled** auf *false*. Die Benennung mag zunächst etwas verwirrend erscheinen, wird aber in einem zukünftigen Update angepasst, um intuitiver zu sein.

### Related API
- [task_unscheduled_time](api/template/task_unscheduled_time.md)

### Related Guides
- ["Grundlegende Operationen mit Aufgaben"](guides/unscheduled-tasks.md)

