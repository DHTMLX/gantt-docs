---
sidebar_label: readonly_property
title: readonly_property config
description: "작업과 링크의 읽기 전용 상태를 제어하는 프로퍼티 이름을 설정합니다."
---

# readonly_property

### Description

@short: 작업과 링크의 읽기 전용 상태를 제어하는 프로퍼티 이름을 설정합니다.

@signature: readonly_property: string

### Example

~~~jsx
gantt.config.readonly_property = "property_name";
~~~

### Details

기본적으로 이 옵션은 "readonly"로 설정되어 있습니다.

### Related API
- [editable_property](api/config/editable_property.md)

### Related Guides
- [읽기 전용 모드](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)

