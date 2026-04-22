---
sidebar_label: branch_loading_property
title: branch_loading_property Konfiguration
description: "gibt an, dass die Aufgabe Unteraufgaben hat, die noch nicht vom Backend geladen wurden"
---

# branch_loading_property

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Gibt an, dass die Aufgabe Unteraufgaben hat, die noch nicht vom Backend geladen wurden

@signature: branch_loading_property: string

### Example

~~~jsx
gantt.config.branch_loading = true;
gantt.config.branch_loading_property = "hasChild";
gantt.init("gantt_here");
~~~

**Standardwert:** "$has_child"

### Related samples
- [Loading subtasks on demand (branch loading)]
- [Performance tweaks]

### Details

Kann nur zusammen mit der [branch_loading](api/config/branch_loading.md) Konfiguration verwendet werden.

### Related API
- [branch_loading](api/config/branch_loading.md)

### Related Guides
- [Performance: Ways to Improve](guides/performance.md)
- [Dynamic Loading (on demand)](guides/dynamic-loading.md)