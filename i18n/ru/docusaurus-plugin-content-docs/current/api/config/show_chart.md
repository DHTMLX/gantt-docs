---
sidebar_label: show_chart
title: show_chart config
description: "управляет видимостью секции timeline в диаграмме Ганта"
---

# show_chart

### Description

@short: Управляет видимостью секции timeline в диаграмме Ганта

@signature: show_chart: boolean

### Example

~~~jsx
// скрыть секцию timeline в диаграмме Ганта
gantt.config.show_chart = false;
gantt.init("gantt_here");
~~~

**Default value:** true (секция timeline отображается)

### Details

Установка *gantt.config.show_chart = false* быстро скрывает часть диаграммы Ганта с timeline, тогда как *gantt.config.show_grid = false* скрывает секцию grid. Если вы работаете с простым layout, лучше не использовать обе опции одновременно, так как это может привести к непредсказуемому поведению. Вместо этого рекомендуется настраивать layout через [gantt.config.layout](api/config/layout.md).

Опция **show_chart** работает только если layout остаётся в своей [дефолтной конфигурации](guides/layout-config.md#defaultlayout) и не была изменена через [gantt.config.layout](api/config/layout.md). Если у вас кастомный layout, потребуется определить несколько пользовательских конфигураций и переключаться между ними для управления видимостью диаграммы.<br> 
:::note
Sample: [Gantt. Toggle timeline (custom layout)](https://snippet.dhtmlx.com/aukjyqc8) 
:::

### Related API
- [show_grid](api/config/show_grid.md)

### Related Guides
- [Решения](guides/how-to.md#howtotogglegridchart)

