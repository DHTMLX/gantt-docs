---
sidebar_label: showQuickInfo
title: showQuickInfo 方法
description: "显示指定任务的弹出任务表单"
---

# showQuickInfo

### Description

@short: 显示指定任务的弹出任务表单

@signature: showQuickInfo: (id: string | number) =\> void

### Parameters

- `id` - (必填) *string | number* - 任务 ID

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
- [QuickInfo 扩展](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
注意：此方法在 **Quick Info** 扩展中定义，因此需要启用 [quick_info](guides/extensions-list.md#quick-info) 插件。
:::

### Related API
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [扩展列表总览](guides/extensions-list.md#quick-info)