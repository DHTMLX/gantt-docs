---
sidebar_label: quick_info_detached
title: quick_info_detached config
description: "определяет, появится ли форма задачи слева/справа на экране или рядом с выбранной задачей"
---

# quick_info_detached

### Description

@short: Определяет, будет ли форма задачи появляться слева или справа на экране или рядом с выбранной задачей

@signature: quick_info_detached: boolean

### Example

~~~jsx
gantt.config.quick_info_detached = false;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true (форма задачи будет появляться рядом с выбранной задачей)

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Эта опция определяется в расширении **Quick Info**, поэтому необходимо активировать плагин [quick_info](guides/extensions-list.md#quick-info).
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#quick-info)