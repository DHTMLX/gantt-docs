---
sidebar_label: editable_property
title: editable_property config
description: "읽기 전용 간트 차트에서 작업이나 링크를 수정할 수 있는지 여부를 제어하는 속성 이름을 변경합니다."
---

# editable_property

### Description

@short: 읽기 전용 간트 차트에서 작업이나 링크를 수정할 수 있는지 여부를 제어하는 속성 이름을 변경합니다.

@signature: editable_property: string

### Example

~~~jsx
gantt.config.editable_property = "property_name";
~~~

### Details

기본적으로 이 옵션은 "editable"로 설정되어 있습니다.

### Related API
- [readonly_property](api/config/readonly_property.md)

### Related Guides
- [읽기 전용 모드](guides/readonly-mode.md#readonlymodefortheentiregantt)

