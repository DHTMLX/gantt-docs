---
sidebar_label: posFromDate
title: posFromDate method
description: "получает относительную горизонтальную позицию заданной даты в области графика"
---

# posFromDate

### Description

@short: Получает относительную горизонтальную позицию заданной даты в области графика

@signature: posFromDate: (date: Date) =\> number

### Parameters

- `date` - (required) *Date* - дата, для которой необходимо получить позицию

### Returns
- ` position` - (number) - x-координата (в пикселях) указанной даты на временной шкале

### Example

~~~jsx
gantt.posFromDate(new Date());
~~~

### Details

:::note

Этот метод возвращает позицию даты, которая в данный момент отображается на диаграмме Ганта. Если дата не видна на графике, возвращается 'null'.
 
:::

![gantt_localized](/img/gantt_localized.png)

Для приведённой выше диаграммы Ганта метод возвращает такие значения:

~~~js
gantt.posFromDate(new Date(2023,02,31)); // -> 0
gantt.posFromDate(new Date(2023,03,1));  // -> 74
gantt.posFromDate(new Date(2023,03,2));  // -> 148
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)

