---
sidebar_label: show_quick_info
title: конфигурация show_quick_info
description: "активирует/отключает расширение 'quick_info' (форма деталей задачи во всплывающем окне)"
---

# show_quick_info

### Description

@short: Активирует/отключает расширение 'quick_info' (форма деталей задачи во всплывающем окне)

@signature: show_quick_info: boolean

### Example

~~~jsx
gantt.config.show_quick_info = false;
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true

### Details

:::note
Этот параметр определяется в расширении **Quick Info**, поэтому вам нужно активировать плагин [quick_info](guides/extensions-list.md#quick-info).
:::

### Related Guides
- [Шаблоны расширения 'Quick Info' (Поддержка касания)](guides/touch-templates.md)