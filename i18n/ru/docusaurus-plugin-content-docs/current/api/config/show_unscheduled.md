---
sidebar_label: show_unscheduled
title: show_unscheduled config
description: "позволяет переключать видимость незапланированных задач"
---

# show_unscheduled

### Description

@short: Позволяет переключать видимость незапланированных задач

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

По умолчанию незапланированные задачи отображаются в виде пустых строк. Если вы хотите, чтобы эти задачи показывались непосредственно в области timeline, установите свойство **show_unscheduled** в значение *false*. Название может показаться немного запутанным на первый взгляд, но это будет исправлено в будущих обновлениях для более интуитивного понимания.

### Related API
- [task_unscheduled_time](api/template/task_unscheduled_time.md)

### Related Guides
- [Базовые операции с задачами](guides/unscheduled-tasks.md)

