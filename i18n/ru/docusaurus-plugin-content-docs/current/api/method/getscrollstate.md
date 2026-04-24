---
sidebar_label: getScrollState
title: метод getScrollState
description: "возвращает положение прокрутки"
---

# getScrollState

### Description

@short: Возвращает положение прокрутки

@signature: getScrollState: () =\> \{ x: number, y: number \}

### Returns
- `ScrollState` - (ScrollState) - объект положения прокрутки

### Example

~~~jsx
const sPos = gantt.getScrollState(); // {x:58,y:180}
const posX = sPos.x;
const posY = sPos.y;
~~~

### Details

Метод возвращает объект со следующими свойствами:

- **y** - число пикселей, на которые прокручена позиция по вертикали
- **x** - число пикселей, на которые прокручена позиция по горизонтали
- **inner_width** - ширина видимой области временной шкалы
- **inner_height** - высота видимой области временной шкалы
- **width** - ширина прокрутки области временной шкалы
- **height** - высота прокрутки области временной шкалы

### Related API
- [scrollTo](api/method/scrollto.md)
- [onGanttScroll](api/event/onganttscroll.md)
- [showDate](api/method/showdate.md)
- [showTask](api/method/showtask.md)