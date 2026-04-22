---
sidebar_label: container_resize_timeout
title: container_resize_timeout config
description: "указывается задержка (в миллисекундах) перед повторной отрисовкой диаграммы Ганта при изменении размера контейнера"
---

# container_resize_timeout

### Description

@short: Указывает задержку (в миллисекундах) перед повторной отрисовкой диаграммы Ганта при изменении размера контейнера

@signature: container_resize_timeout: number

### Example

~~~jsx
gantt.config.container_resize_timeout = 300;
~~~

**Значение по умолчанию:** 20

### Change log
- добавлено в v7.0.11