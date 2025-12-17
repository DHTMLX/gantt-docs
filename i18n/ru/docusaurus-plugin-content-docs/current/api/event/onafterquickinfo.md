---
sidebar_label: onAfterQuickInfo
title: onAfterQuickInfo event
description: "срабатывает после закрытия всплывающей формы редактирования"
---

# onAfterQuickInfo

### Description

@short: Срабатывает после закрытия всплывающей формы редактирования

@signature: onAfterQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (required) *string | number* - id задачи

### Example

~~~jsx
gantt.attachEvent("onAfterQuickInfo",function(taskId){
    // ваш код здесь
});
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
note Это событие является частью расширения **Quick Info**, поэтому убедитесь, что плагин [quick_info](guides/extensions-list.md#quickinfo) включен. 
:::


добавлено в версии 4.1

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onQuickInfo](api/event/onquickinfo.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#quickinfo)

