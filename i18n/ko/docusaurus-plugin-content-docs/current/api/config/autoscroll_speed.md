---
sidebar_label: autoscroll_speed
title: autoscroll_speed config
description: "작업(task)이나 링크(link)를 현재 브라우저 뷰를 벗어나 드래그할 때 자동 스크롤이 발생하는 속도(밀리초 단위)를 정의합니다."
---

# autoscroll_speed

### Description

@short: 작업(task)이나 링크(link)를 현재 브라우저 뷰를 벗어나 드래그할 때 자동 스크롤이 발생하는 속도(밀리초 단위)를 정의합니다.

@signature: autoscroll_speed: number

### Example

~~~jsx
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;

gantt.init("gantt_here");
~~~

**Default value:** 30

### Details

버전 4.2에서 도입됨

"autoscroll" 기능은 [autoscroll](api/config/autoscroll.md) 옵션을 통해 제어됩니다.

### Related API
- [autoscroll](api/config/autoscroll.md)

