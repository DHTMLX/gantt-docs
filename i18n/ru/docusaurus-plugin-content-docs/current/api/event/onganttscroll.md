---
sidebar_label: onGanttScroll
title: onGanttScroll event
description: "срабатывает, когда диаграмма Ганта прокручивается до конкретной точки"
---

# onGanttScroll

### Description

@short: Срабатывает, когда диаграмма Ганта прокручивается до конкретной точки

@signature: onGanttScroll: (left: number, top: number) =\> void;

### Parameters

- `left` - (required) *number* - позиция горизонтальной прокрутки
- `top` - (required) *number* - позиция вертикальной прокрутки

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
- [How-tos](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline) (прочитайте, как реализовать бесконечную прокрутку)
- [How-tos](guides/how-to.md#how-to-load-tasks-dynamically) (прочитайте, как загружать задачи динамически)