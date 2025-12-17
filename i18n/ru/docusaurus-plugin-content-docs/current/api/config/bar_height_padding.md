---
sidebar_label: bar_height_padding
title: bar_height_padding config
description: "управляет отступом вокруг task bar на timeline, когда `bar_height` установлен в 'full'"
---

# bar_height_padding

### Description

@short: Управляет отступом вокруг task bar на timeline, когда `bar_height` установлен в "full"

@signature: bar_height_padding: number

### Example

~~~jsx
gantt.config.bar_height_padding = 5;
gantt.init("gantt_here");
~~~

**Default value:** 9

### Details

Настройка `bar_height_padding` регулирует вертикальное пространство вокруг task bar на timeline, когда `gantt.config.bar_height` установлен в "full". Высота каждого task bar вычисляется как `gantt.config.row_height - gantt.config.bar_height_padding`. 

- Значение `0` заставляет task bar занимать всю высоту строки.
- Увеличение значения добавляет больше пространства сверху и снизу task bar.

В примере ниже используется меньшее значение padding, что приводит к меньшему пространству вокруг task bar:

~~~js
gantt.config.bar_height_padding = 3;
~~~

![bar_height_padding_small](/img/bar_height_padding_small.png)

В этом примере большее значение padding создает больше пустого пространства сверху и снизу task bar:

~~~js
gantt.config.bar_height_padding = 14;
~~~

![bar_height_padding_large](/img/bar_height_padding_large.png)

### Related API
- [bar_height](api/config/bar_height.md)
- [row_height](api/config/row_height.md)

### Change log
- добавлено в v9.0

