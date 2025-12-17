---
sidebar_label: calendar_property
title: calendar_property config
description: "changes the name of the property that affects binding of a calendar to a task/group of tasks"
---

# calendar_property

### Description

@short: Changes the name of the property that affects binding of a calendar to a task/group of tasks

@signature: calendar_property: string

### Example

~~~jsx
gantt.config.calendar_property = "property_name";
~~~

### Details

added in version 4.2

The default value of the option is "calendar_id".

~~~js
{
    "id":2, 
    "calendar_id":"custom", 
    "text":"Task #1", 
    "start_date":"02-04-2013", 
    "duration":"8", 
    "parent":"1", 
    "progress":0.5, 
    "open": true
}
~~~

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [isWorkTime](api/method/isworktime.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)

