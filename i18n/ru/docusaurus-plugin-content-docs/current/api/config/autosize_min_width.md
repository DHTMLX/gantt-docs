---
sidebar_label: autosize_min_width
title: autosize_min_width config
description: "определяет минимальную ширину (в пикселях), которую будет иметь диаграмма Ганта при использовании горизонтального режима 'autosize'"
---

# autosize_min_width

### Description

@short: Определяет минимальную ширину (в пикселях), которую будет иметь диаграмма Ганта при использовании горизонтального режима 'autosize'

@signature: autosize_min_width: number

### Example

~~~jsx
gantt.config.autosize = "xy";
gantt.config.autosize_min_width = 800;

gantt.init("gantt_here");
~~~

**Default value:** ноль (0)

### Details

Горизонтальный режим 'autosize' можно включить через опцию, описанную в [autosize](api/config/autosize.md).

### Related API
- [autosize](api/config/autosize.md)

