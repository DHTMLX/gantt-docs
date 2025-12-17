---
sidebar_label: getLightboxValues
title: getLightboxValues method
description: "returns values of the lightbox's sections"
---

# getLightboxValues

### Description

@short: Returns values of the lightbox's sections

@signature: getLightboxValues: () =\> any

### Returns
- ` obj` - (object) - the object of values

### Example

~~~jsx
gantt.getLightboxValues();
~~~

### Details

The method returns the values as a hash of *'section_name:value'* pairs 

~~~js
const values = gantt.getLightboxValues();
~~~

~~~js
values = {
    duration: 2,
    end_date: Fri Apr 05 2013 00:00:00 GMT+0300 (GTB Daylight Time),
    start_date: Wed Apr 03 2013 00:00:00 GMT+0300 (GTB Daylight Time),
    text: "Task #2.1"
}
~~~

### Related Guides
- [getLightboxSection](api/method/getlightboxsection.md)

