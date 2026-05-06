---
sidebar_label: task_attribute
title: task_attribute config
description: "задает имя атрибута, который будет указывать идентификатор элемента HTML задачи"
---

# task_attribute

### Description

@short: Устанавливает имя атрибута, который будет указывать идентификатор HTML-элемента задачи

@signature: task_attribute: string

### Example

~~~jsx
gantt.config.task_attribute = "data-task-id"
~~~

**Значение по умолчанию:** "data-task-id"

### Details

![data_task_id](/img/data_task_id.png)

HTML-элементы задач с использованием значения по умолчанию **task_attribute** (*data-task-id*) выглядят так:

Атрибут *task_id* включён, чтобы обеспечить обратную совместимость с предыдущими версиями.

### Related API
- [locate](api/method/locate.md)