---
sidebar_label: dateFromPos
title: dateFromPos method
description: "получает дату, соответствующую заданной горизонтальной позиции внутри области графика"
---

# dateFromPos

### Description

@short: Получает дату, соответствующую заданной горизонтальной позиции внутри области графика

@signature: dateFromPos: (pos: number) =\> Date

### Parameters

- `pos` - (required) *number* - относительная горизонтальная позиция, для которой нужно найти дату

### Returns
- ` date` - (Date) - дата, соответствующая указанной горизонтальной позиции в области графика

### Example

~~~jsx
var date = gantt.dateFromPos(200);
~~~

### Details

:::note

Этот метод возвращает дату, которая в данный момент видна на Gantt chart. Если дата на указанной позиции не отображается в графике, метод вернёт 'null'.
 
:::

![gantt_localized](/img/gantt_localized.png)

В качестве примера, для показанного выше Gantt chart метод вернёт следующее:

~~~js
gantt.dateFromPos(0); // -> Sun Mar 31 2013 00:00:00
gantt.dateFromPos(74);  // -> Mon Apr 01 2013 01:22:17
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)

