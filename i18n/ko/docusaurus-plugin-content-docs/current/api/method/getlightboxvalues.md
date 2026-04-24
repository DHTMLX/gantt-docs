---
sidebar_label: getLightboxValues
title: getLightboxValues method
description: "라이트박스의 섹션 값을 반환합니다"
---

# getLightboxValues

### Description

@short: 라이트박스의 섹션 값을 반환합니다

@signature: getLightboxValues: () =\> any

### Returns
- ` obj` - (object) - 값의 객체

### Example

~~~jsx
gantt.getLightboxValues();
~~~

### Details

메서드는 값을 *'section_name:value'* 쌍의 해시로 반환합니다

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