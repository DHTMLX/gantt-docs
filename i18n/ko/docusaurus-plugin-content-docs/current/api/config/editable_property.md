---
sidebar_label: editable_property
title: editable_property config
description: "읽기 전용 간트 차트에서 작업/링크의 편집 가능성에 영향을 주는 속성의 이름을 변경합니다"
---

# editable_property

### Description

@short: 읽기 전용 간트 차트에서 작업/링크의 편집 가능성에 영향을 주는 속성의 이름을 변경합니다

@signature: editable_property: string

### Example

~~~jsx
gantt.config.editable_property = "property_name";
~~~

### Details

옵션의 기본값은 "editable"입니다.

### Related API
- [readonly_property](api/config/readonly_property.md)

### Related Guides
- [Read-Only Mode](guides/readonly-mode.md#readonlymodefortheentiregantt)