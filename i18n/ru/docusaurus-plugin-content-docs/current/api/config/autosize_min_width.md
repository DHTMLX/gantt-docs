---
sidebar_label: autosize_min_width
title: autosize_min_width config
description: "sets the minimum width (in pixels) that the Gantt chart can take in the horizontal 'autosize' mode"
---

# autosize_min_width

### Description

@short: Устанавливает минимальную ширину (в пикселях), которую может занимать диаграмма Ганта в горизонтальном режиме 'autosize'

@signature: autosize_min_width: number

### Example

~~~jsx
gantt.config.autosize = "xy";
gantt.config.autosize_min_width = 800;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** ноль (0)

### Details

Горизонтальный режим 'autosize' включается опцией [autosize](api/config/autosize.md)

### Related API
- [autosize](api/config/autosize.md)