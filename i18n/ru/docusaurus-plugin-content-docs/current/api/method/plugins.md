---
sidebar_label: plugins
title: plugins method
description: "включает указанные расширения"
---

# plugins

### Description

@short: Активирует указанные расширения

@signature: plugins: (ext?: GanttPlugins) =\> GanttPlugins

### Parameters

- `ext` - (опционально) *GanttPlugins* - объект с именами расширений, которые нужно активировать

### Returns
- ` activatedPlugins` - (GanttPlugins) - объект активированных расширений

### Example

~~~jsx
gantt.plugins({
    quick_info: true,
    keyboard_navigation: true,
    undo: true
});
~~~

### Related Guides
- [Полный список расширений](guides/extensions-list.md)

### Change log
- Плагин **export_api** был включён в список плагинов в версии v8.0. Чтобы активировать сервис экспорта в более ранних версиях, добавьте на страницу файл **https://export.dhtmlx.com/gantt/api.js**. Ознакомьтесь с статьёй [Миграция](migration.md#71---80).
- Добавлено в версии v7.0