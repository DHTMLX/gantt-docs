---
sidebar_label: quickinfo_buttons
title: quickinfo_buttons 配置
description: "在弹出任务详情表单中存放一组按钮"
---

# quickinfo_buttons

### Description

@short: 在弹出任务详情表单中存放一组按钮

@signature: quickinfo_buttons: any[]

### Example

~~~jsx
gantt.config.quickinfo_buttons=["icon_delete","icon_edit","advanced_details_button"];
gantt.locale.labels["advanced_details_button"] = "Advanced Info";
gantt.init("gantt_here");

gantt.$click.buttons.advanced_details_button=function(id){
    gantt.message("这些是高级详情");
    return false; // 阻止默认行为
};
~~~

**默认值：** ["icon_delete","icon_edit"]

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 该选项是**Quick Info**扩展的一部分，请确保已启用[quick_info](guides/extensions-list.md)插件。 
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