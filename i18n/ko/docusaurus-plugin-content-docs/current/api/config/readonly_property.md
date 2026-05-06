---
sidebar_label: readonly_property
title: readonly_property config
description: "작업/링크의 읽기 전용 동작에 영향을 주는 속성의 이름을 변경합니다"
---

# readonly_property

### Description

@short: 작업/링크의 읽기 전용 동작에 영향을 주는 속성의 이름을 변경합니다

@signature: readonly_property: string

### Example

~~~jsx
gantt.config.readonly_property = "property_name";
~~~

### Details

옵션의 기본 값은 "readonly"입니다.

### Related API
- [editable_property](api/config/editable_property.md)

### Related Guides
- [Read-Only Mode](guides/readonly-mode.md)