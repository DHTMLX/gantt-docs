---
sidebar_label: onAfterQuickInfo
title: onAfterQuickInfo событие
description: "срабатывает после закрытия всплывающей формы редактирования"
---

# onAfterQuickInfo

### Description

@short: Срабатывает после закрытия всплывающей формы редактирования

@signature: onAfterQuickInfo: (taskId: string | number) =\> void;

### Parameters

- `taskId` - (required) *string | number* - идентификатор задачи

### Example

~~~jsx
gantt.attachEvent("onAfterQuickInfo",function(taskId){
    // ваш код здесь
});
~~~

### Related samples
- [расширение QuickInfo](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Это событие определено в расширении **Quick Info**, поэтому необходимо активировать плагин [quick_info](guides/extensions-list.md#quick-info). 
:::

Добавлено в версии 4.1

### Related API
- [showQuickInfo]
- [hideQuickInfo]
- [quick_info_detached]
- [quickinfo_buttons]
- [onQuickInfo]

### Related Guides
- [Полный список расширений](guides/extensions-list.md#quick-info)