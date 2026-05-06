---
sidebar_label: container_resize_method
title: Конфигурация container_resize_method
description: "определяет, будет ли Gantt отслеживать изменение размера контейнера на интервалы времени"
---

# container_resize_method

### Description

@short: Определяет, будет ли Gantt отслеживать изменение размера контейнера на интервалы времени

@signature: container_resize_method: string | undefined

### Example

~~~jsx
gantt.config.container_resize_method = "timeout";
~~~

**Default value:** undefined

### Details

По умолчанию Gantt отслеживает событие "resize" для окна и для iframe-элемента, размещённого внутри Gantt. Иногда эти события не срабатывают (например, в Salesforce).

Если вам нужно, чтобы Gantt отслеживал изменение размера контейнера по интервалам времени, установите **container_resize_method** в *"timeout"*:

~~~js
gantt.config.container_resize_method = "timeout";
~~~

### Related API
- [container_resize_timeout](api/config/container_resize_timeout.md)

### Change log
- Добавлено в версии v7.1