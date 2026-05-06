---
sidebar_label: posFromDate
title: метод posFromDate
description: "получает относительную горизонтальную позицию указанной даты в области диаграммы"
---

# posFromDate

### Description

@short: Получает относительную горизонтальную позицию указанной даты в области диаграммы

@signature: posFromDate: (date: Date) => number

### Parameters

- `date` - (required) *Date* - дата, положение которой вы хотите узнать

### Returns
- ` position` - (number) - x-координата (в пикселях) указанной даты на шкале времени

### Example

~~~jsx
gantt.posFromDate(new Date());
~~~

### Details

:::note
Метод возвращает позицию даты, которая в данный момент отображается на диаграмме Gantt. Если дата не отображается на диаграмме - метод вернет 'null'.
:::

Например, для приведенной выше диаграммы Gantt метод вернет следующее:

~~~js
gantt.posFromDate(new Date(2023,02,31)); // -> 0
gantt.posFromDate(new Date(2023,03,1));  // -> 74
gantt.posFromDate(new Date(2023,03,2));  // -> 148
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)