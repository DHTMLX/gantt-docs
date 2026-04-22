--- 
sidebar_label: branch_loading_property
title: конфигурация branch_loading_property
description: "указывает, что задача имеет дочерние элементы, которые еще не загружены с бекенда"
---

# branch_loading_property

:::info
Эта функциональность доступна только в издании PRO.
:::

### Description

@short: Specifies that the task has children that are not yet loaded from the backend

@signature: branch_loading_property: string

### Example

~~~jsx
gantt.config.branch_loading = true;
gantt.config.branch_loading_property = "hasChild";
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** "$has_child"

### Related samples
- [Загрузка подзадач по требованию (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)
- [Оптимизации производительности](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

### Details

Можно использовать только вместе с конфигурацией [branch_loading](api/config/branch_loading.md).

### Related API
- [branch_loading](api/config/branch_loading.md)

### Related Guides
- [Производительность: способы улучшения](guides/performance.md)
- [Динамическая загрузка (по требованию)](guides/dynamic-loading.md)