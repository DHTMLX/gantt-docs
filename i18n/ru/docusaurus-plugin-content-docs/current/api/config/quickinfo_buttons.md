---
sidebar_label: quickinfo_buttons
title: quickinfo_buttons конфигурация
description: "хранит коллекцию кнопок, размещённых во всплывающей форме деталей задачи"
---

# quickinfo_buttons

### Description

@short: Хранит коллекцию кнопок, размещённых во всплывающей форме деталей задачи

@signature: quickinfo_buttons: any[]

### Example

~~~jsx
gantt.config.quickinfo_buttons=["icon_delete","icon_edit","advanced_details_button"];
gantt.locale.labels["advanced_details_button"] = "Расширенная информация";
gantt.init("gantt_here");

gantt.$click.buttons.advanced_details_button=function(id){
    gantt.message("Это дополнительные детали");
    return false; //блокирует поведение по умолчанию
};
~~~

**Default value:** ["icon_delete","icon_edit"]

### Related samples
- [расширение QuickInfo](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Эта опция определяется в расширении **Quick Info**, поэтому необходимо активировать плагин [quick_info](guides/extensions-list.md#quick-info). 
:::

### Related API
- api/other/click.md
- [showQuickInfo](api/method/showquickinfo.md)
- [hideQuickInfo](api/method/hidequickinfo.md)
- [quick_info_detached](api/config/quick_info_detached.md)
- [onQuickInfo](api/event/onquickinfo.md)
- [onAfterQuickInfo](api/event/onafterquickinfo.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#quick-info)