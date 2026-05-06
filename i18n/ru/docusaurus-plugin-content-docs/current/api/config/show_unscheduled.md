---
sidebar_label: show_unscheduled
title: конфигурация show_unscheduled
description: "включает отображение несрочных задач"
---

# show_unscheduled

### Description

@short: Включает отображение несрочных задач

@signature: show_unscheduled: boolean

### Example

~~~jsx
gantt.config.show_unscheduled = false;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true

### Related samples
- [Показать несрочные задачи](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

### Details

Обратите внимание, что по умолчанию несрочные задачи отображаются как пустая строка. Чтобы отобразить их на временной шкале, необходимо установить значение свойства **show_unscheduled** в *false*.
Это может быть запутанно для вас, но мы исправим несоответствие между названием свойства и его значениями в одной из будущих версий.

### Related API
- [task_unscheduled_time](api/template/task_unscheduled_time.md)

### Related Guides
- [Основные операции с задачами](guides/unscheduled-tasks.md)