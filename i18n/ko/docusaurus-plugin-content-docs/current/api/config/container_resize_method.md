---
sidebar_label: container_resize_method
title: container_resize_method config
description: "간트가 타임드 인터벌을 사용하여 컨테이너 크기 변경을 모니터링할지 지정합니다."
---

# container_resize_method

### Description

@short: 간트가 타임드 인터벌을 사용하여 컨테이너 크기 변경을 모니터링할지 지정합니다.

@signature: container_resize_method: string | undefined

### Example

~~~jsx
gantt.config.container_resize_method = "timeout";
~~~

**Default value:** undefined

### Details

기본적으로 Gantt는 윈도우와 간트 내부의 iframe에서 발생하는 "resize" 이벤트에 반응합니다. 하지만 이러한 이벤트는 Salesforce 환경과 같은 일부 상황에서는 항상 발생하지 않을 수 있습니다.

간트가 정기적으로 컨테이너 크기 변화를 확인하도록 하려면 **container_resize_method**를 *"timeout"*으로 설정하세요:

~~~js
gantt.config.container_resize_method = "timeout";
~~~

### Related API
- [container_resize_timeout](api/config/container_resize_timeout.md)

### Change log
- v7.1에 추가됨

