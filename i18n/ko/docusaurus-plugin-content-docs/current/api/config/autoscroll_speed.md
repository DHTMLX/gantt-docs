---
sidebar_label: autoscroll_speed
title: autoscroll_speed 설정
description: "드래그 중 현재 브라우저 화면 밖으로 태스크나 링크를 이동할 때 자동 스크롤 속도(ms 단위)를 정의합니다"
---

# autoscroll_speed

### Description

@short: 드래그 중 현재 브라우저 화면 밖으로 태스크나 링크를 이동할 때 자동 스크롤 속도(ms 단위)를 정의합니다

@signature: autoscroll_speed: number

### Example

~~~jsx
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;

gantt.init("gantt_here");
~~~

**기본값:** 30


### Details

버전 4.2에서 추가되었습니다

The "autoscroll" functionality is enabled by the [autoscroll](api/config/autoscroll.md) option.

### Related API
- [autoscroll](api/config/autoscroll.md)