---
sidebar_label: quickinfo_buttons
title: quickinfo_buttons config
description: "stores a collection of buttons resided in the pop-up task's details form"
---

# quickinfo_buttons

### Description

@short: Stores a collection of buttons resided in the pop-up task's details form

@signature: quickinfo_buttons: any[]

### Example

~~~jsx
gantt.config.quickinfo_buttons=["icon_delete","icon_edit","advanced_details_button"];
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");

gantt.$click.buttons.advanced_details_button=function(id){
    gantt.message("These are advanced details");
    return false; //blocks the default behavior
};
~~~

**Default value:** ["icon_delete","icon_edit"]

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
This option is defined in the **Quick Info** extension, so you need to activate the [quick_info](guides/extensions-list.md#quick-info) plugin. 
:::

### Related API
- api/other/click.md
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#quick-info)

