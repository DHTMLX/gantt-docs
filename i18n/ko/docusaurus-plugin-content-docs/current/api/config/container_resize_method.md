--- 
sidebar_label: container_resize_method
title: container_resize_method config
description: "Gantt가 컨테이너의 크기 조정을 시간 간격으로 추적할지 여부를 정의합니다"
---

# container_resize_method

### Description

@short: Gantt 차트가 컨테이너의 리사이즈를 시간 간격으로 추적할지 여부를 정의합니다.

@signature: container_resize_method: string | undefined

### Example

~~~jsx
gantt.config.container_resize_method = "timeout";
~~~

**기본값:** undefined

### Details

기본적으로 Gantt는 창의 'resize' 이벤트와 Gantt 내부에 배치된 iframe 요소의 크기 조정 이벤트를 수신합니다. 때때로 이러한 이벤트가 발생하지 않을 수 있습니다(예: Salesforce에서).

컨테이너의 크기 조정을 시간 간격으로 추적해야 하는 경우, **container_resize_method**를 *"timeout"*으로 설정하십시오:

~~~js
gantt.config.container_resize_method = "timeout";
~~~

### Related API
- [container_resize_timeout](api/config/container_resize_timeout.md)

### Change log
- v7.1에서 추가됨