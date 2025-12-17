---
sidebar_label: show_grid
title: show_grid config
description: "управляет видимостью области grid диаграммы Ганта"
---

# show_grid

### Description

@short: Управляет видимостью области grid диаграммы Ганта

@signature: show_grid: boolean

### Example

~~~jsx
//скрывает область grid диаграммы Ганта
gantt.config.show_grid = false;
gantt.init("gantt_here");
~~~

**Default value:** true (grid отображается)

### Details

Установка *gantt.config.show_grid = false* позволяет быстро скрыть область grid диаграммы Ганта, в то время как *gantt.config.show_chart = false* скрывает область timeline. Если вы работаете с простым layout, лучше не использовать эти две опции одновременно, так как это может привести к непредсказуемому поведению. Вместо этого рассмотрите возможность настройки layout через [gantt.config.layout](api/config/layout.md).

Опция **show_grid** работает только если вы не изменяли [стандартную конфигурацию layout](guides/layout-config.md#defaultlayout) через [gantt.config.layout](api/config/layout.md). Если вы используете кастомный layout, вам нужно создать несколько кастомных конфигураций и переключаться между ними, чтобы показывать или скрывать grid.<br> 
:::note
Sample: [Gantt. Toggle grid (custom layout)](https://snippet.dhtmlx.com/omk98l0x) 
:::

### Related API
- [show_chart](api/config/show_chart.md)

### Related Guides
- [Решения](guides/how-to.md#howtotogglegridchart)

