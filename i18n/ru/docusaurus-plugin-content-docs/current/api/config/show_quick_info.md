---
sidebar_label: show_quick_info
title: show_quick_info config
description: "Включает или отключает расширение 'quick_info' (всплывающее окно с деталями задачи)"
---

# show_quick_info

### Description

@short: Включает или отключает расширение 'quick_info' (всплывающее окно с деталями задачи)

@signature: show_quick_info: boolean

### Example

~~~jsx
gantt.config.show_quick_info = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

:::note
 Эта опция является частью расширения **Quick Info**, поэтому убедитесь, что плагин [quick_info](guides/extensions-list.md#quickinfo) включен в первую очередь. 
:::

### Related Guides
- [Шаблоны расширения 'Quick Info' (Поддержка Touch)](guides/touch-templates.md)
