---
sidebar_label: highlight_critical_path
title: highlight_critical_path config
description: "показывает критический путь на диаграмме"
---

# highlight_critical_path

:::info
Эта функциональность доступна только в версии PRO.
:::

### Description

@short: Показывает критический путь на диаграмме

@signature: highlight_critical_path: boolean

### Example

~~~jsx
gantt.config.highlight_critical_path = true; /*!*/

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** false

### Related samples
- [Критический путь](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::note
Этот параметр определяется в расширении **critical_path**, поэтому вам нужно активировать плагин [critical_path](guides/extensions-list.md#critical-path). Подробнее см. в статье [Критический путь](guides/critical-path.md).
:::

### Related API
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [Критический путь](guides/critical-path.md)