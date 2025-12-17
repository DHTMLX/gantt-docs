---
sidebar_label: schedule_from_end
title: schedule_from_end config
description: "enables backward scheduling"
---

# schedule_from_end
:::info
This functionality is available in the PRO edition only. 
:::

:::warning
The property has been deprecated in v9.1, use the `schedule_from_end` property of [gantt.config.auto_scheduling](api/config/auto_scheduling.md#schedule_from_end) instead.
:::
### Description

@short: Enables backward scheduling

@signature: schedule_from_end: boolean

### Example

~~~jsx
gantt.config.schedule_from_end = true;
gantt.config.project_end = new Date(2025, 10, 1);
~~~

**Default value:** false

### Related samples
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

Setting this config to `true` will switch auto scheduling to the `as late as possible` mode.

The value will be only applied if [project_end](api/config/project_end.md) is specified as well.

### Related API
- [project_end](api/config/project_end.md)
- [auto_scheduling](api/config/auto_scheduling.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- the property has been deprecated in v9.1

