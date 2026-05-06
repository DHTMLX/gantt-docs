---
sidebar_label: start_on_monday
title: start_on_monday 설정
description: "주간의 시작 요일을 설정합니다"
---

# start_on_monday

### Description

@short: 주간의 시작 요일을 설정합니다

@signature: start_on_monday: boolean

### Example

~~~jsx
// 주간이 일요일부터 시작하도록 설정
gantt.config.start_on_monday = false;
gantt.init("gantt_here");
~~~

**기본값:** true

### Details

매개변수가 true로 설정되면 주 시작 요일은 월요일이 되며, 그렇지 않으면 일요일부터 시작합니다.