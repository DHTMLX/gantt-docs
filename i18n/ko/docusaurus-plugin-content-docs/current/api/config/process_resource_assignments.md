---
sidebar_label: process_resource_assignments
title: process_resource_assignments config
description: "리소스 할당 파싱을 켜거나 끕니다"
---

# process_resource_assignments
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 리소스 할당 파싱을 켜거나 끕니다

@signature: process_resource_assignments: boolean

### Example

~~~jsx
gantt.config.process_resource_assignments = false;
~~~

**Default value:** true

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

작업 내 특정 시간에 리소스를 할당할 때, 이 기능은 **process_resource_assignments** 속성이 활성화되어 있어야 합니다.
이 속성은 작업의 [gantt.config.resource_property](api/config/resource_property.md)에서 값을 파싱하여 내부 리소스 할당 객체로 변환하는 역할을 합니다.

이를 통해 DataStore 객체를 통해 리소스 할당을 조회하거나 업데이트하는 등 리소스 할당 작업을 수행할 수 있습니다.


만약 리소스 할당에 대해 특정 시간이나 기간을 설정하지 않고 단순히 작업에 리소스를 할당하는 것이 목적이라면, 이 설정으로 할당 파싱을 비활성화할 수 있습니다:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### Related Guides
- [리소스 관리](guides/resource-management.md#managingresourceassignments)

### Change log
- v7.1에 추가됨

