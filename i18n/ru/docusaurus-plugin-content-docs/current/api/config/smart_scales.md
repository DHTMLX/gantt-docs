---
sidebar_label: smart_scales
title: smart_scales config
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

**Default value:** true

### Details

добавлено в версии 4.1

Включение этой настройки значительно улучшает производительность рендеринга диаграммы, особенно при работе с очень длинными временными шкалами.

### Related Guides
- [Производительность: Способы улучшения](guides/performance.md#commontechniques)
