---
sidebar_label: plugins
title: plugins method
description: "включает указанные расширения"
---

# plugins

### Description

@short: Включает указанные расширения

@signature: plugins: (ext?: GanttPlugins) =\> GanttPlugins

### Parameters

- `ext` - (optional) *GanttPlugins* - объект, содержащий список расширений для активации

### Returns
- ` activatedPlugins` - (GanttPlugins) - объект с включёнными расширениями

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
- Начиная с версии v8.0, плагин **export_api** включён в список plugins. Для более ранних версий необходимо добавить скрипт **https://export.dhtmlx.com/gantt/api.js** на вашу страницу. Подробности смотрите в руководстве по [Migration](migration.md#71---80).
- Введено в версии v7.0
