---
sidebar_label: show_grid
title: Конфигурация show_grid
description: "отображает область сетки диаграммы Ганта"
---

# show_grid

### Description

@short: Показывает область сетки диаграммы Ганта

@signature: show_grid: boolean

### Example

~~~jsx
//hides the grid area of the Gantt chart
gantt.config.show_grid = false;
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true

### Details

*gantt.config.show_grid = false* полезно, когда вам нужно быстро скрыть область сетки диаграммы Ганта, в то время как *gantt.config.show_chart = false* служит для скрытия области временной шкалы. Если вы работаете в простом макете, лучше не использовать эти две опции вместе, так как это может привести к непредсказуемому результату. Вместо этого следует изменить конфигурацию макета через [gantt.config.layout](api/config/layout.md).

Конфигурация **show_grid** будет работать только в том случае, если вы не изменили [типовую конфигурацию макета](guides/layout-config.md#default-layout) через [gantt.config.layout](api/config/layout.md). В случае, если вы настроили пользовательскую раскладку, вам придется создать несколько пользовательских конфигураций и переключаться между ними, чтобы скрывать/показывать сетку. 

:::note
sample: [Gantt. Toggle grid (custom layout) ](https://snippet.dhtmlx.com/omk98l0x)
::: 

### Related API
- [show_chart](api/config/show_chart.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-toggle-gridchart)