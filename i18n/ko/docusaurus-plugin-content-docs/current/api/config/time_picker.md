---
sidebar_label: time_picker
title: time_picker config
description: "라이트박스 내 시간 드롭다운 선택기의 형식을 정의합니다"
---

# time_picker

### Description

@short: 라이트박스 내 시간 드롭다운 선택기의 형식을 정의합니다

@signature: time_picker: string

### Example

~~~jsx
gantt.config.time_picker = "%H:%s";

gantt.init("gantt_here");
~~~

**Default value:** "%H:%i"

### Related API
- [time_picker](api/template/time_picker.md)

### Related Guides
- [날짜 형식 지정](guides/date-format.md)

