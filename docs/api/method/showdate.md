---
sidebar_label: showDate
title: showDate method
description: "scrolls the chart area to makes the specified date visible"
---

# showDate

### Description

@short: Scrolls the chart area to makes the specified date visible

@signature: showDate: (date: Date) =\> void

### Parameters

- `date` - (required) *Date* - the date to show in the chart

### Example

~~~jsx
gantt.showDate(new Date()); //shows the current date
~~~

### Details

In the default mode, Gantt scrolls itself when you use the [showDate](api/method/showdate.md) method.
But if the **autosize** mode is enabled, Gantt increases the size of its container to show itself on the page instead of showing the specified date. 
Read the [Scrolling to hidden elements](api/config/autosize.md) article to know how to solve this problem.

### Related API
- [showTask](api/method/showtask.md)
- [scrollTo](api/method/scrollto.md)
- [getScrollState](api/method/getscrollstate.md)
- [onGanttScroll](api/event/onganttscroll.md)

