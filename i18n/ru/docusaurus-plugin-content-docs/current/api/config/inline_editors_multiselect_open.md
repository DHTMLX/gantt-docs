---
sidebar_label: inline_editors_multiselect_open
title: inline_editors_multiselect_open config
description: "управляет тем, открывается ли inline редактор по одному клику на задачу при активном режиме множественного выбора задач"
---

# inline_editors_multiselect_open

### Description

@short: Управляет тем, открывается ли inline редактор по одному клику на задачу при активном режиме множественного выбора задач

@signature: inline_editors_multiselect_open: boolean | undefined

### Example

~~~jsx
gantt.config.inline_editors_multiselect_open = true;

gantt.init("gantt_here");
~~~

**Default value:** undefined

### Details

При использовании режима одиночного выбора inline редактор появляется сразу после клика по задаче.

При включённом множественном выборе первый клик по задаче, которая не выбрана, выделяет её, а второй клик открывает inline редактор.
Чтобы inline редактор открывался с первого клика даже в режиме множественного выбора, установите опцию **inline_editors_multiselect_open** в true.

### Related Guides
- [Редактирование 'на месте' в гриде](guides/inline-editing.md)
- [Множественный выбор задач](guides/multiselection.md)

### Change log
- добавлено в версии v7.1.13
