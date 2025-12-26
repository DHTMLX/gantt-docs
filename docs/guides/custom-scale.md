---
title: "Hiding Time Units in the Scale"
sidebar_label: "Hiding Time Units in the Scale"
---

# Hiding Time Units in the Scale

:::info
This functionality is available only in PRO edition
:::

The library provides the possibility to hide unnecessary time units in the time scale of the chart. You can use this possibility, for example, to display only working days and hide weekends. 


Generally, to hide a time unit in the time scale you need to use the **ignore_time** method.
The method is a function that takes the cell's date as a parameter. To hide a unit - return *true* for it.


For example, to hide weekends from the scale, use the method as in:

~~~js
// 0 refers to Sunday, 6 - to Saturday
gantt.ignore_time = function(date){
   if(date.getDay() == 0 || date.getDay() == 6)
      return true;
};
~~~

![skipped_weekends](/img/skipped_weekends.png)


[Not render weekends on the scale](https://docs.dhtmlx.com/gantt/samples/03_scales/09_skip_weekends.html)


:::note
Note, hiding time units from the scale doesn't exclude these units from calculation of the tasks duration. To exclude hidden units from duration's calculation, 
use the technique described in the article [Work Time Calculation](guides/working-time.md)
:::

Note that while using [work time calculations](guides/working-time.md), you can use [isWorkTime](api/method/isworktime.md) instead of hardcoded values:

~~~js
gantt.ignore_time = function(date){
   if(!gantt.isWorkTime(date))
      return true;
};
~~~


[Calculate working hours](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)


Please note that the **ignore_time** method doesn't modify the scale. Let's consider the examples below which describe hiding of cells that don't have any working hours/days.

Example 1

A day scale starts at 00:00 and ends at 23:59, the working hours start at 08:00 and end at 16:59. You have a minimal scale in hours. 
When the **ignore_time** method is applied, the cells that have non-working time, will be hidden for all the scales. 
Thus, the day scale will start at 08:00 and end at 16:59. However, if you have just a day scale, it won't be changed.
It will start at 00:00 and end at 23:59, since there are working hours inside a day.

Example 2

A week scale has 7 days, 2 of which are days off (e.g. Saturday and Sunday). You have a minimal scale in days. When the **ignore_time** method is applied, the days off
are hidden and the week scale is rendered from Monday to Friday. However, if you have just a week scale the week will start on Monday and end on Sunday,
since there are days off in a week.

There are two ways to render a chart with hidden time units:

- to add a scale with lesser units (an hour scale for a day scale, a day scale for a week scale, etc.)
- to add a [custom scale](guides/configuring-time-scale.md#customtimeunits) that will render just the working hours/days

**Related sample** [5-day work weeks on the scale](https://snippet.dhtmlx.com/eq70o558)

### Related 
-  [Work Time Calculation](guides/working-time.md)
-  [Setting up Scale](guides/configuring-time-scale.md)

