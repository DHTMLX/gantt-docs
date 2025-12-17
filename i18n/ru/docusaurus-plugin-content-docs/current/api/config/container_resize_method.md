---
sidebar_label: container_resize_method
title: container_resize_method config
description: "указывает, должен ли gantt отслеживать изменение размера контейнера с помощью таймеров"
---

# container_resize_method

### Description

@short: Указывает, должен ли gantt отслеживать изменение размера контейнера с помощью таймеров

@signature: container_resize_method: string | undefined

### Example

~~~jsx
gantt.config.container_resize_method = "timeout";
~~~

**Default value:** undefined

### Details

По умолчанию Gantt реагирует на событие "resize" окна и iframe внутри gantt. Однако эти события могут не всегда срабатывать (например, в средах Salesforce).

Чтобы заставить Gantt проверять изменение размера контейнера с регулярными интервалами, установите **container_resize_method** в значение *"timeout"*:

~~~js
gantt.config.container_resize_method = "timeout";
~~~

### Related API
- [container_resize_timeout](api/config/container_resize_timeout.md)

### Change log
- Добавлено в версии v7.1

