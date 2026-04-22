---
sidebar_label: time_picker
title: time_picker 설정
description: "lightbox에서 시간 드롭다운 셀렉터의 포맷을 설정합니다"
---

# time_picker

### Description

@short: lightbox에서 시간 드롭다운 셀렉터의 포맷을 설정

@signature: time_picker: string

### Example

~~~jsx
gantt.config.time_picker = "%H:%s";

gantt.init("gantt_here");
~~~

**기본값:** "%H:%i"

### Related API
- [time_picker](api/template/time_picker.md)

### Related Guides
- [Date Format Specification](guides/date-format.md)