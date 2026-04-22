---
sidebar_label: bar_height_padding
title: Настройки bar_height_padding
description: "регулирует отступ вокруг полос задач на временной шкале, когда `bar_height` установлен в 'full'"
---

# bar_height_padding

### Description

@short: Регулирует отступ вокруг полос задач на временной шкале, когда `bar_height` установлен в "full"

@signature: bar_height_padding: number

### Example

~~~jsx
gantt.config.bar_height_padding = 5;
gantt.init("gantt_here");
~~~

**Default value:** 9

### Details

Конфигурация `bar_height_padding` задаёт вертикальные отступы вокруг полос задач на временной шкале, когда `gantt.config.bar_height` установлен в "full". Высота полосы задачи рассчитывается как `gantt.config.row_height - gantt.config.bar_height_padding`.

- Установка этой конфигурации в `0` приведёт к тому, что полосы задач займут всю высоту строки.
- Увеличение значения добавляет больше пространства над и под полосами.

Ниже приведён пример с меньшим значением отступа, что оставляет меньше пространства вокруг полос задач:

~~~js
gantt.config.bar_height_padding = 3;
~~~

![bar_height_padding_small](/img/bar_height_padding_small.png)

В этом примере большее значение отступа оставляет больше пустого пространства над и под полосами задач:

~~~js
gantt.config.bar_height_padding = 14;
~~~

![bar_height_padding_large](/img/bar_height_padding_large.png)

### Related API
- [bar_height](api/config/bar_height.md)
- [row_height](api/config/row_height.md)

### Change log
- добавлено в версии v9.0