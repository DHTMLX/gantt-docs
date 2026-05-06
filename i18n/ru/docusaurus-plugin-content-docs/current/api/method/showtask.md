---
sidebar_label: showTask
title: showTask method
description: "делает указанную задачу видимой на экране"
---

# showTask

### Description

@short: Делает указанную задачу видимой на экране

@signature: showTask: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* - идентификатор задачи

### Example

~~~jsx
var taskId = gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.showTask(10);
~~~

### Details

В режиме по умолчанию Gantt прокручивает сам себя при использовании метода [showTask](api/method/showdate.md).
Однако, если включен режим **autosize**, Gantt увеличивает размер своего контейнера, чтобы показать себя на странице, а не отображать указанную дату.
Прочитайте статью [Прокрутка к скрытым элементам](api/config/autosize.md), чтобы узнать, как решить эту проблему.

### Related API
- [showDate](api/method/showdate.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)