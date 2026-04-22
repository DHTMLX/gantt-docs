---
sidebar_label: process_resource_assignments
title: process_resource_assignments 설정
description: "리소스 할당 구문 분석 활성화/비활성화"
---

# process_resource_assignments

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

### Description

@short: 리소스 할당의 구문 분석 활성화/비활성화

@signature: process_resource_assignments: boolean

### Example

~~~jsx
gantt.config.process_resource_assignments = false;
~~~

**Default value:** true

### Related samples
- [- [특정 날짜에 리소스 값을 할당하기](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)]

### Details

When you [작업의 특정 시점에 리소스를 할당하는 경우](guides/resource-management.md#resourceassignmenttime), 이 기능은 **process_resource_assignments** 속성을 활성화해야 합니다.

이 속성은 작업의 [gantt.config.resource_property](api/config/resource_property.md) 값을 내부 리소스 할당 객체로 구문 분석하도록 제공한다는 사실과 관련이 있습니다. 

그 결과 DataStore 객체를 통해 리소스 할당을 조작할 수 있으며, 예를 들어 필요한 할당 객체를 얻거나 이를 업데이트할 수 있습니다.


하지만 할당의 시간이나 지속 시간을 지정하지 않고 작업에 리소스를 할당하기만 하면, 구성(config)을 사용하여 할당의 구문 분석을 비활성화할 수 있습니다:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### Related Guides
- [- [리소스 관리](guides/resource-management.md)]

### Change log
- v7.1에 추가됨