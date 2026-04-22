---
sidebar_label: inline_editors_multiselect_open
title: inline_editors_multiselect_open конфигурация
description: "определяет, следует ли открывать inline editor после одного клика по задаче при включенном множественном выделении"
---

# inline_editors_multiselect_open

### Description

@short: Определяет, следует ли открывать inline editor после одного клика по задаче при включенном множественном выделении

@signature: inline_editors_multiselect_open: boolean | undefined

### Example

~~~jsx
gantt.config.inline_editors_multiselect_open = true;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** undefined

### Details

В режиме одиночного выделения Gantt открывает inline editor после клика по задаче. 

В режиме множественного выделения первый клик по невыбранной задаче выделяет её, а второй клик по той же задаче откроет inline editor.
Если вы хотите, чтобы Gantt открывал inline editor сразу после первого клика, включите конфигурацию **inline_editors_multiselect_open**.

### Related Guides
- [Редактирование прямо на месте в Grid](guides/inline-editing.md)
- [Множественный выбор задач](guides/multiselection.md)

### Change log
- добавлено в v7.1.13