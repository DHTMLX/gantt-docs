---
sidebar_label: highlight_critical_path
title: highlight_critical_path config
description: "выделяет критический путь на диаграмме"
---

# highlight_critical_path
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Выделяет критический путь на диаграмме

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
 Эта настройка является частью расширения **critical_path**, поэтому убедитесь, что плагин [critical_path](guides/extensions-list.md#criticalpath) включен. Подробнее об этом можно прочитать в статье [Критический путь](guides/critical-path.md). 
:::

### Related API
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [Критический путь](guides/critical-path.md)

