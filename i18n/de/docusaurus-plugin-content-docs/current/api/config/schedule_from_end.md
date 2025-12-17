---
sidebar_label: schedule_from_end
title: schedule_from_end config
description: "ermöglicht rückwärts gerichtete Planung"
---

# schedule_from_end

### Description

@short: Ermöglicht rückwärts gerichtete Planung

@signature: schedule_from_end: boolean

### Example

~~~jsx
gantt.config.schedule_from_end = true;
gantt.config.project_end = new Date(2019, 4, 1);
~~~

**Default value:** false

### Related samples
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

:::note
 Diese Funktionalität ist nur in der PRO Edition verfügbar. 
:::

Das Aktivieren dieser Option durch Setzen auf `true` wechselt den Auto-Scheduling-Modus auf „so spät wie möglich".

Diese Einstellung wird nur wirksam, wenn [project_end](api/config/project_end.md) ebenfalls angegeben ist.

### Related API
- [project_end](api/config/project_end.md)

### Related Guides
- ["Auto Scheduling"](guides/auto-scheduling.md)

