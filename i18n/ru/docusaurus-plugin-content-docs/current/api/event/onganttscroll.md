---
sidebar_label: onGanttScroll
title: onGanttScroll event
description: "Срабатывает при прокрутке Gantt-диаграммы до определённой позиции"
---

# onGanttScroll

### Description

@short: Срабатывает при прокрутке Gantt-диаграммы до определённой позиции

@signature: onGanttScroll: (left: number, top: number) =\> void;

### Parameters

- `left` - (required) *number* - горизонтальная позиция прокрутки
- `top` - (required) *number* - вертикальная позиция прокрутки

### Example

~~~jsx
gantt.attachEvent("onGanttScroll", function (left, top){
    // любая ваша логика здесь
});
~~~

### Related API
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [showTask](api/method/showtask.md)
- [showDate](api/method/showdate.md)

### Related Guides
- [Решения](guides/how-to.md#howtohaveaninfinitescrollinthetimeline) (см. как настроить бесконечную прокрутку)
- [Решения](guides/how-to.md#howtoloadtasksdynamically) (см. как динамически загружать задачи)

