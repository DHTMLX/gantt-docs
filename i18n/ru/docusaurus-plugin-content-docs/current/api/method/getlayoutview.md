--- 
sidebar_label: getLayoutView
title: getLayoutView method
description: "возвращает объект представления раскладки по его имени"
---

# getLayoutView

### Description

@short: Возвращает объект представления раскладки по его имени

@signature: getLayoutView: (name: string) =\> any

### Parameters

- `name` - (required) *string* - имя представления раскладки

### Returns
- ` view` - (object) - объект представления раскладки

### Example

~~~jsx
gantt.getLayoutView("resourceTimeline").posFromDate(new Date(2025, 05, 08));
// возвращает 210

gantt.getLayoutView("resourceTimeline").dateFromPos(210);
// возвращает 08 июня, 2025
~~~

### Details

Метод позволяет применять некоторые методы к возвращённому объекту представления раскладки. Эти методы:

- [dateFromPos](api/method/datefrompos.md) - возвращает дату указанной горизонтальной позиции во представлении раскладки
- [posFromDate](api/method/posfromdate.md) - возвращает относительную горизонтальную позицию указанной даты во представлении раскладки
- [getScale](api/method/getscale.md) - возвращает конфигурацию шкалы времени представления раскладки

Чтобы прокрутить представление к указанной позиции, применяйте метод [scrollLayoutCell](api/method/scrolllayoutcell.md).

:::note
пример: [Публичные методы получения представлений ячеек раскладки и их прокрутки](https://snippet.dhtmlx.com/0v4mmoxu)
:::

### Related Guides
- [Gantt Layout](guides/layout-config.md)