---
sidebar_label: quick_info_detached
title: quick_info_detached config
description: "управляет тем, будет ли форма задачи появляться, выезжая слева или справа от экрана, либо непосредственно рядом с выбранной задачей"
---

# quick_info_detached

### Description

@short: Управляет тем, будет ли форма задачи появляться, выезжая слева или справа от экрана, либо непосредственно рядом с выбранной задачей

@signature: quick_info_detached: boolean

### Example

~~~jsx
gantt.config.quick_info_detached = false;

gantt.init("gantt_here");
~~~

**Default value:** true (<i>форма события будет отображаться рядом с выбранным событием</i>)

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 Эта опция является частью расширения **Quick Info**, поэтому убедитесь, что плагин [quick_info](guides/extensions-list.md#quickinfo) включен. 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#quickinfo)

