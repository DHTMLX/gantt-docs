---
sidebar_label: start_on_monday
title: start_on_monday config
description: "주간 시작 요일 설정"
---

# start_on_monday

### Description

@short: 주간 시작 요일 설정

@signature: start_on_monday: boolean

### Example

~~~jsx
// 주간이 일요일부터 시작하도록 설정
gantt.config.start_on_monday = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

이 옵션이 활성화되어 있을 경우(<i>true</i>), 주간은 월요일부터 시작합니다. 비활성화하면 주간이 일요일부터 시작하게 됩니다.
