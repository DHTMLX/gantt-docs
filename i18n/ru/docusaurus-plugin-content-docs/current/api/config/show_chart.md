---
sidebar_label: show_chart
title: конфигурация show_chart
description: "показывает область диаграммы (таймлайна) диаграммы Ганта"
---

# show_chart

### Description

@short: Показывает область диаграммы (таймлайн) диаграммы Ганта

@signature: show_chart: boolean

### Example

~~~jsx
//hides the timeline area of the Gantt chart
gantt.config.show_chart = false;
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true (диаграмма видима)

### Details

*​gantt.config.show_chart = false* полезно, когда нужно быстро скрыть область таймлайна диаграммы Ганта, в то время как *gantt.config.show_grid = false* служит для скрытия области сетки. Если вы работаете в простом макете, лучше не использовать эти две опции вместе, так как это может привести к непредсказуемому результату. Вместо этого следует изменить конфигурацию макета через [gantt.config.layout](api/config/layout.md).

Конфигурация **show_chart** будет работать только если вы не изменяли [дефолтную конфигурацию макета](guides/layout-config.md#default-layout) через [gantt.config.layout](api/config/layout.md). В случае если вы настроили пользовательский макет, вам нужно создать несколько пользовательских конфигураций и переключаться между ними, чтобы скрывать/показывать диаграмму.

:::note
пример: [Gantt. Toggle timeline (custom layout) ](https://snippet.dhtmlx.com/aukjyqc8)
:::

### Related API
- [show_grid](api/config/show_grid.md)

### Related Guides
- [Как это сделать](guides/how-to.md#how-to-toggle-gridchart)