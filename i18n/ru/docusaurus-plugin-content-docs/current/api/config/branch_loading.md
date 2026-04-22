---
sidebar_label: branch_loading
title: branch_loading конфигурация
description: "Включение динамической загрузки в диаграмме Ганта"
---

# branch_loading

:::info
Эта функциональность доступна только в версии PRO.
:::

### Description

@short: Включение динамической загрузки в диаграмме Ганта

@signature: branch_loading: boolean

### Example

~~~jsx
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
gantt.config.branch_loading = true;
gantt.init("gantt_here");

gantt.load("/data"); /*!*/
~~~

**Значение по умолчанию:** false

### Related samples
- [Загрузка подзадач по требованию (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)
- [Оптимизация производительности](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)


### Related API
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [Производительность: Способы улучшения](guides/performance.md)
- [Динамическая загрузка (по требованию)](guides/dynamic-loading.md)