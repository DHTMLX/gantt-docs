---
sidebar_label: showDate
title: showDate method
description: "прокручивает область диаграммы, чтобы сделать указанную дату видимой"
---

# showDate

### Description

@short: Прокручивает область диаграммы, чтобы сделать указанную дату видимой

@signature: showDate: (date: Date) =\> void

### Parameters

- `date` - (required) *Date* - дата, которую нужно показать на диаграмме

### Example

~~~jsx
gantt.showDate(new Date()); //прокручивает к текущей дате
~~~

### Details

По умолчанию вызов метода [showDate](api/method/showdate.md) заставляет Gantt прокрутить себя к указанной дате. 
Однако, когда активен режим **autosize**, вместо прокрутки Gantt увеличивает размер своего контейнера, чтобы отобразить дату на странице. 
Подробности о работе с этим поведением смотрите в статье [Scrolling to hidden elements](api/config/autosize.md).

### Related API
- [showTask](api/method/showtask.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)

