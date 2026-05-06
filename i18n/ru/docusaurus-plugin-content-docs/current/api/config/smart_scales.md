---
sidebar_label: smart_scales
title: smart_scales конфигурация
description: "указывает, что на экране отображается только видимая часть временной шкалы"
---

# smart_scales

### Description

@short: Указывает, что на экране отображается только видимая часть временной шкалы

@signature: smart_scales: boolean

### Example

~~~jsx
gantt.config.smart_scales = true;
~~~

**Значение по умолчанию:** true

### Details

добавлено в версии 4.1

Использование этой конфигурации значительно ускоряет отрисовку диаграммы, если у вас очень длинная временная шкала.

### Related Guides
- [Производительность: Способы повышения производительности](guides/performance.md#common-techniques)