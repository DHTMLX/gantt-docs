---
sidebar_label: posFromDate
title: posFromDate method
description: "gets the relative horizontal position of the specified date in the chart area"
---

# posFromDate

### Description

@short: Gets the relative horizontal position of the specified date in the chart area

@signature: posFromDate: (date: Date) =\> number

### Parameters

- `date` - (required) *Date* - a date you want to know the position of

### Returns
- ` position` - (number) - x-coordinate (in pixels) of the specified date in the timeline

### Example

~~~jsx
gantt.posFromDate(new Date());
~~~

### Details

:::note
The method returns the position of a date that is currently rendered in the Gantt chart. If a date isn't rendered in the chart - the method will return 'null'.
:::


For example, for the Gantt chart above, the method will return the following:

~~~js
gantt.posFromDate(new Date(2023,02,31)); // -> 0
gantt.posFromDate(new Date(2023,03,1));  // -> 74
gantt.posFromDate(new Date(2023,03,2));  // -> 148
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)

