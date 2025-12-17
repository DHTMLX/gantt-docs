---
sidebar_label: branch_loading_property
title: branch_loading_property config
description: "zeigt an, dass eine Aufgabe untergeordnete Aufgaben hat, die noch nicht vom Backend geladen wurden"
---

# branch_loading_property
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Zeigt an, dass eine Aufgabe untergeordnete Aufgaben hat, die noch nicht vom Backend geladen wurden

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


Diese Option funktioniert nur in Kombination mit der [branch_loading](api/config/branch_loading.md) Konfiguration.

### Related API
- [branch_loading](api/config/branch_loading.md)

### Related Guides
- ["Performance: Möglichkeiten zur Verbesserung"](guides/performance.md)
- ["Dynamisches Laden (bei Bedarf)"](guides/dynamic-loading.md)

