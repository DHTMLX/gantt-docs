---
sidebar_label: onQuickInfo
title: Событие onQuickInfo
description: "срабатывает, когда появляется всплывающая форма редактирования"
---

# onQuickInfo

### Description

@short: Срабатывает, когда появляется всплывающая форма редактирования

@signature: onQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (обязательно) *string | number* - идентификатор задачи

### Example

~~~jsx
gantt.attachEvent("onQuickInfo",function(taskId){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Расширение QuickInfo](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Это событие определяется в расширении **Quick Info**, поэтому вам нужно активировать плагин [quick_info](guides/extensions-list.md#quick-info).
:::

### Related API
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [quickinfo_buttons](api/config/quickinfo_buttons.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#quick-info)