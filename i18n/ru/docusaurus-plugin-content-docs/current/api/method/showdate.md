---
sidebar_label: showDate
title: showDate метод
description: "Прокручивает область диаграммы так, чтобы указанная дата стала видимой"
---

# showDate

### Description

@short: Прокручивает область диаграммы так, чтобы указанная дата стала видимой

@signature: showDate: (date: Date) =\> void

### Parameters

- `date` - (required) *Date* - дата, которую нужно показать на диаграмме

### Example

~~~jsx
gantt.showDate(new Date()); //shows the current date
~~~

### Details

In the default mode, Gantt scrolls itself when you use the [showDate](api/method/showdate.md) method.
Но если включен режим **autosize**, Gantt увеличивает размер своего контейнера, чтобы поместиться на страницу, вместо того чтобы показывать указанную дату. 
Прочитайте статью [Прокрутка к скрытым элементам](api/config/autosize.md), чтобы узнать, как решить эту проблему.

### Related API
- [showTask](api/method/showtask.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)