---
sidebar_label: getLightboxValues
title: getLightboxValues method
description: "返回 lightbox 的各个分区的值"
---

# getLightboxValues

### Description

@short: 从值的各个中获取值

@signature: getLightboxValues: () =\> any

### Returns
- ` obj` - (object) - 值的对象

### Example

~~~jsx
gantt.getLightboxValues();
~~~

### Details

此方法以对象形式返回值，格式为*'section_name:value'*键值对。

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