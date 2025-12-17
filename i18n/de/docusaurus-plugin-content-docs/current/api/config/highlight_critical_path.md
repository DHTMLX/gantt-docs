---
sidebar_label: highlight_critical_path
title: highlight_critical_path config
description: "hebt den kritischen Pfad innerhalb des Charts hervor"
---

# highlight_critical_path
:::info
 Diese Funktion ist nur in der PRO Edition enthalten. 
:::
### Description

@short: Hebt den kritischen Pfad innerhalb des Charts hervor

@signature: highlight_critical_path: boolean

### Example

~~~jsx
gantt.config.highlight_critical_path = true; /*!*/

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::note
 Diese Einstellung ist Teil der **critical_path** Erweiterung, daher stellen Sie sicher, dass das [critical_path](guides/extensions-list.md#criticalpath) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Kritischer Pfad"](guides/critical-path.md). 
:::

### Related API
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- ["Kritischer Pfad"](guides/critical-path.md)

