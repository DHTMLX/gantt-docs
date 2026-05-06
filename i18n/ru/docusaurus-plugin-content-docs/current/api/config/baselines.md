---
sidebar_label: baselines
title: baselines config
description: "настраивает работу baselines в диаграмме Ганта"
---

# baselines

### Description

@short: Настраивает функциональность базовых линий в диаграмме Ганта

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
- [Отображение базовых линий](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

Этот конфиг определяет, как базовые линии обрабатываются и отображаются в диаграмме Ганта. Он может быть задан как объект для настройки отображения или как булево значение для включения или отключения функции. Объект конфигурации содержит следующие свойства:

-  **datastore** - (*string*) - имя datastore, используемого для хранения записей базовых линий. Для смежного функционала смотрите метод `getDatastore`.
-  **render_mode** - (*boolean | string*) - определяет, как отображаются базовые линии:
  - **_false_** - базовые линии не отображаются.
  - **_"taskRow"_** - базовые линии отображаются в той же строке, что и задача.
  - **_"separateRow"_** - базовые линии отображаются в отдельной подстроке, увеличивая высоту строки задач.
  - **_"individualRow"_** - каждая базовая линия отображается в своей собственной подстроке под задачей.
- **dataprocessor_baselines** - (*boolean*) - указывает, следует ли обновления базовых линий вызывать DataProcessor как отдельные записи.
- **row_height** - (*number*) - определяет высоту подстроки для базовых линий, применяется только когда `render_mode` установлен в значение `"separateRow"` или `"individualRow"`.
- **bar_height** -  (*number*) - задаёт высоту полосы базовой линии.

### Related API
- [getDatastore](api/method/getdatastore.md)

### Related Guides
- [Extra Elements in Timeline](guides/inbuilt-baselines.md)

### Change log
- добавлено в v9.0