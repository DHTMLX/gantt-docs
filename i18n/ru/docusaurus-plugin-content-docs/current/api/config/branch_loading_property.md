---
sidebar_label: branch_loading_property
title: branch_loading_property config
description: "указывает, что у задачи есть дочерние задачи, которые ещё не загружены с бэкенда"
---

# branch_loading_property
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Указывает, что у задачи есть дочерние задачи, которые ещё не загружены с бэкенда

@signature: branch_loading_property: string

### Example

~~~jsx
gantt.config.branch_loading = true;
gantt.config.branch_loading_property = "hasChild";
gantt.init("gantt_here");
~~~

**Default value:** "$has_child"

### Related samples
- [Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)
- [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

### Details

Этот параметр работает только в сочетании с конфигурацией [branch_loading](api/config/branch_loading.md).

### Related API
- [branch_loading](api/config/branch_loading.md)

### Related Guides
- [Производительность: Способы улучшения](guides/performance.md)
- [Динамическая загрузка (по требованию)](guides/dynamic-loading.md)

