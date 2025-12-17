---
sidebar_label: showQuickInfo
title: showQuickInfo method
description: "открывает всплывающую форму задачи для указанной задачи"
---

# showQuickInfo

### Description

@short: Открывает всплывающую форму задачи для указанной задачи

@signature: showQuickInfo: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -     уникальный идентификатор задачи

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
 Этот метод принадлежит расширению **Quick Info**, поэтому убедитесь, что включен плагин [quick_info](guides/extensions-list.md#quickinfo). 
:::

### Related API
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#quickinfo)

