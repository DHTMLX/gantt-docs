---
sidebar_label: getConnectedGroup
title: getConnectedGroup method
description: "특정 작업에 연결된 모든 작업과 링크를 반환합니다."
---

# getConnectedGroup

### Description

@short: 특정 작업에 연결된 모든 작업과 링크를 반환합니다.

@signature: getConnectedGroup: (id?: string | number) =\> any

### Parameters

- `id` - (optional) *id* - 선택 사항, 특정 작업의 ID

### Returns
- ` connections` - (object) - 지정된 작업과 연결된 작업 및 링크를 포함하는 객체

### Example

~~~jsx
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~

### Details

매개변수 없이 호출하면 이 메서드는 연결을 형성하는 작업 및 링크 그룹 전체를 반환합니다.

:::note
pronote 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

:::note
note 이 메서드를 사용하려면 페이지에 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인이 포함되어 있어야 합니다. 
:::

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)
