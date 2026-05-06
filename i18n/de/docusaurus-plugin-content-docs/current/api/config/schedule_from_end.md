---
sidebar_label: schedule_from_end
title: schedule_from_end Konfiguration
description: "Aktiviert die Rückwärtsplanung"
---

# schedule_from_end
:::info
This functionality is available in the PRO edition only. 
:::

:::warning
Die Eigenschaft wurde in v9.1 veraltet; verwenden Sie stattdessen die `schedule_from_end`-Eigenschaft von [gantt.config.auto_scheduling](api/config/auto_scheduling.md#schedule_from_end).
:::
### Description

@short: Aktiviert Rückwärtsplanung

@signature: schedule_from_end: boolean

### Example

~~~jsx
gantt.config.schedule_from_end = true;
gantt.config.project_end = new Date(2025, 10, 1);
~~~

**Standardwert:** false

### Related samples
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

Wenn diese Konfiguration auf `true` gesetzt wird, wechselt die automatische Planung in den Modus 'so spät wie möglich'.

Der Wert wird nur angewendet, wenn auch [project_end](api/config/project_end.md) angegeben ist.

### Related API
- [project_end](api/config/project_end.md)
- [auto_scheduling](api/config/auto_scheduling.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- Die Eigenschaft wurde in v9.1 veraltet