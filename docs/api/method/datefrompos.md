---
sidebar_label: dateFromPos
title: dateFromPos method
description: "gets the date of the specified horizontal position in the chart area"
---

# dateFromPos

### Description

@short: Gets the date of the specified horizontal position in the chart area

@signature: dateFromPos: (pos: number) =\> Date

### Parameters

- `pos` - (required) *number* - the relative horizontal position you want to know the date of

### Returns
- ` date` - (Date) - the date of the specified horizontal position in the chart area

### Example

~~~jsx
var date = gantt.dateFromPos(200);
~~~

### Details

:::note
The method returns a date that is currently rendered in the Gantt chart. If a date isn't rendered in the chart - the method will return 'null'.
:::


For example, for the Gantt chart above, the method will return the following:

~~~js
gantt.dateFromPos(0); // -> Sun Mar 31 2013 00:00:00
gantt.dateFromPos(74);  // -> Mon Apr 01 2013 01:22:17
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)

