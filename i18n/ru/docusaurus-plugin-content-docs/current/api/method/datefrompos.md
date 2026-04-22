---
sidebar_label: dateFromPos
title: dateFromPos method
description: "получает дату указанной горизонтальной позиции в области диаграммы"
---

# dateFromPos

### Description

@short: Получает дату указанной горизонтальной позиции на области диаграммы

@signature: dateFromPos: (pos: number) => Date

### Parameters

- `pos` - (required) *number* - относительная горизонтальная позиция, для которой нужно узнать дату

### Returns
- ` date` - (Date) - дата указанной горизонтальной позиции в области диаграммы

### Example

~~~jsx
var date = gantt.dateFromPos(200);
~~~

### Details

:::note
Метод возвращает дату, которая на данный момент отображается на диаграмме Gantt. Если дата не отображается на диаграмме — метод вернёт 'null'.
:::

Например, для приведённой выше диаграммы Gantt метод вернёт следующее:

~~~js
gantt.dateFromPos(0); // -> Sun Mar 31 2013 00:00:00
gantt.dateFromPos(74);  // -> Mon Apr 01 2013 01:22:17
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)