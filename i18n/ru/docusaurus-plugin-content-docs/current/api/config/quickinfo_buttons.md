---
sidebar_label: quickinfo_buttons
title: quickinfo_buttons config
description: "содержит набор кнопок, отображаемых в всплывающей форме с деталями задачи"
---

# quickinfo_buttons

### Description

@short: Содержит набор кнопок, отображаемых в всплывающей форме с деталями задачи

@signature: quickinfo_buttons: any[]

### Example

~~~jsx
gantt.config.quickinfo_buttons=["icon_delete","icon_edit","advanced_details_button"];
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");

gantt.$click.buttons.advanced_details_button=function(id){
    gantt.message("These are advanced details");
    return false; // блокирует стандартное поведение
};
~~~

**Default value:** ["icon_delete","icon_edit"]

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 Эта опция является частью расширения **Quick Info**, поэтому убедитесь, что плагин [quick_info](guides/extensions-list.md#quickinfo) включён. 
:::

### Related API
- api/other/click.md
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#quickinfo)

