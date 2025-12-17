---
sidebar_label: getLightboxValues
title: getLightboxValues method
description: "라이트박스 섹션에서 값을 가져옵니다"
---

# getLightboxValues

### Description

@short: 라이트박스 섹션에서 값을 가져옵니다

@signature: getLightboxValues: () =\> any

### Returns
- ` obj` - (object) - 값을 포함하는 객체를 반환합니다

### Example

~~~jsx
gantt.getLightboxValues();
~~~

### Details

이 메서드는 *'section_name:value'* 쌍으로 구성된 객체 형태로 값을 제공합니다.

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

