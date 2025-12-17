---
sidebar_label: baselines
title: baselines config
description: "настраивает работу baselines в диаграмме Ганта"
---

# baselines

### Description

@short: Настраивает работу baselines в диаграмме Ганта

@signature: baselines: BaselineConfig | boolean

### Example

~~~jsx
gantt.config.baselines = {
  datastore: "baselines",
  render_mode: false,
  dataprocessor_baselines: false,
  row_height: 16,
  bar_height: 8
};
gantt.init("gantt_here");
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

Этот параметр управляет тем, как baselines обрабатываются и отображаются в диаграмме Ганта. Он может быть либо объектом для детальной настройки, либо простым булевым значением для включения или отключения функции. Объект включает следующие опции:

-  **datastore** - (*string*) - имя datastore, в котором хранятся записи baselines. Подробнее об этом смотрите в методе `getDatastore`.
-  **render_mode** - (*boolean | string*) - определяет, как отображаются baselines:
  - **_false_** - baselines не отображаются.
  - **_"taskRow"_** - baselines показываются в той же строке, что и task bar.
  - **_"separateRow"_** - baselines получают собственную подстроку, увеличивая высоту строки задачи.
  - **_"individualRow"_** - каждый baseline рендерится в своей отдельной подстроке под задачей.
- **dataprocessor_baselines** - (*boolean*) - определяет, вызывается ли DataProcessor при изменениях baselines для каждой записи.
- **row_height** - (*number*) - задает высоту подстроки для baselines, используется только при `render_mode` равном `"separateRow"` или `"individualRow"`.
- **bar_height** -  (*number*) - управляет высотой полосы baseline.

### Related API
- [getDatastore](api/method/getdatastore.md)

### Related Guides
- [Дополнительные элементы на временной шкале](guides/inbuilt-baselines.md)

### Change log
- добавлено в v9.0

