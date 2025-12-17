---
sidebar_label: task_attribute
title: task_attribute config
description: "определяет имя атрибута, используемого для указания id HTML-элемента задачи"
---

# task_attribute

### Description

@short: Определяет имя атрибута, используемого для указания id HTML-элемента задачи

@signature: task_attribute: string

### Example

~~~jsx
gantt.config.task_attribute = "data-task-id"
~~~

**Default value:** "data-task-id"

### Details

HTML-элементы задачи с использованием атрибута по умолчанию **task_attribute** (*data-task-id*) выглядят следующим образом:

![data_task_id](/img/data_task_id.png)

Атрибут *task_id* по-прежнему включён для сохранения совместимости с предыдущими версиями.

### Related API
- [locate](api/method/locate.md)

