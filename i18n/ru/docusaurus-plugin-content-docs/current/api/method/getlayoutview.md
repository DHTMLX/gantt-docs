---
sidebar_label: getLayoutView
title: getLayoutView method
description: "получает объект layout view по его имени"
---

# getLayoutView

### Description

@short: Получает объект layout view по его имени

@signature: getLayoutView: (name: string) =\> any

### Parameters

- `name` - (required) *string* - имя layout view

### Returns
- ` view` - (object) - объект layout view

### Example

~~~jsx
gantt.getLayoutView("resourceTimeline").posFromDate(new Date(2025, 05, 08));
// возвращает 210

gantt.getLayoutView("resourceTimeline").dateFromPos(210);
// возвращает 08 июня 2025
~~~

### Details

Этот метод предоставляет доступ к объекту layout view, позволяя использовать несколько удобных методов. К ним относятся:

- [dateFromPos](api/method/datefrompos.md) - получает дату, соответствующую определённой горизонтальной позиции внутри view
- [posFromDate](api/method/posfromdate.md) - находит относительную горизонтальную позицию для заданной даты в view
- [getScale](api/method/getscale.md) - получает конфигурацию временной шкалы view

Для перемещения view к определённой позиции можно использовать метод [scrollLayoutCell](api/method/scrolllayoutcell.md).

:::note
Sample: [Публичные методы для получения layout cell views и их скроллинга ](https://snippet.dhtmlx.com/0v4mmoxu) 
:::

### Related Guides
- [Макет Gantt](guides/layout-config.md)

