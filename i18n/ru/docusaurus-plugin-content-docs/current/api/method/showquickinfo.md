---
sidebar_label: showQuickInfo
title: метод showQuickInfo
description: "отображает всплывающую форму задачи для указанной задачи"
---

# showQuickInfo

### Description

@short: отображает всплывающую форму задачи для указанной задачи

@signature: showQuickInfo: (id: string | number) =\> void

### Parameters

- `id` - (обязательный) *string | number* - идентификатор задачи

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
note Этот метод определён в расширении **Quick Info**, поэтому вам нужно активировать плагин [quick_info](guides/extensions-list.md#quick-info).
:::

### Related API
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Full List of Extensions](guides/extensions-list.md#quick-info)