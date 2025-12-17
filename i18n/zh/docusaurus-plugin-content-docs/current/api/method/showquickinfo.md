---
sidebar_label: showQuickInfo
title: showQuickInfo method
description: "为指定任务打开弹出任务表单"
---

# showQuickInfo

### Description

@short: 为指定任务打开弹出任务表单

@signature: showQuickInfo: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -     任务的唯一标识符

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

window.setTimeout(function(){
    gantt.showQuickInfo(10);    
},1);
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 此方法来自**Quick Info**扩展，因此请确保启用了[quick_info](guides/extensions-list.md)插件。 
:::

### Related API
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [扩展功能完整列表](guides/extensions-list.md)

