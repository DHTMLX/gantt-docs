---
sidebar_label: container_resize_timeout
title: container_resize_timeout config
description: "컨테이너를 크기 조정할 때 간트 차트를 다시 그리기까지의 지연 시간(밀리초 단위)을 지정합니다"
---

# container_resize_timeout

### Description

@short: 컨테이너를 크기 조정할 때 간트 차트를 다시 그리기까지의 지연 시간(밀리초 단위)을 지정합니다

@signature: container_resize_timeout: number

### Example

~~~jsx
gantt.config.container_resize_timeout = 300;
~~~

**기본값:** 20

### Change log
- v7.0.11에서 추가됨