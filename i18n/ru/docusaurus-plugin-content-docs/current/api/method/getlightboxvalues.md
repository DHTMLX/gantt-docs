---
sidebar_label: getLightboxValues
title: getLightboxValues method
description: "получает значения из секций lightbox"
---

# getLightboxValues

### Description

@short: Получает значения из секций lightbox

@signature: getLightboxValues: () =\> any

### Returns
- ` obj` - (object) - объект, содержащий значения

### Example

~~~jsx
gantt.getLightboxValues();
~~~

### Details

Этот метод возвращает значения в виде объекта с парами *'section_name:value'*

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

