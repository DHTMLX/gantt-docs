---
sidebar_label: onQuickInfo
title: onQuickInfo event
description: "срабатывает при отображении всплывающей формы редактирования"
---

# onQuickInfo

### Description

@short: Срабатывает при отображении всплывающей формы редактирования

@signature: onQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (required) *string | number* - id задачи

### Example

~~~jsx
gantt.attachEvent("onQuickInfo",function(taskId){  
    // ваш код здесь  
});
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 Это событие является частью расширения **Quick Info**, поэтому убедитесь, что включили плагин [quick_info](guides/extensions-list.md#quickinfo). 
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#quickinfo)

