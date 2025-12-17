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

- `id` - (required) *string | number* -   идентификатор задачи

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

По умолчанию, при вызове метода [showTask](api/method/showdate.md), Gantt прокручивает себя так, чтобы задача стала видимой. Однако, если активен режим **autosize**, Gantt расширит размер своего контейнера, чтобы сделать задачу видимой на странице, вместо прокрутки к ней. Подробнее о том, как управлять этим поведением, смотрите в руководстве [Scrolling to hidden elements](api/config/autosize.md).

### Related API
- [showDate](api/method/showdate.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)

