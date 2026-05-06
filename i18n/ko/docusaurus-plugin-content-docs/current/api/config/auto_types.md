---
sidebar_label: auto_types
title: auto_types config
description: "하위 작업을 가진 작업을 자동으로 프로젝트로 변환하고, 하위 작업이 없는 프로젝트를 다시 작업으로 변환합니다"
---

# auto_types

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

### Description

@short: 하위 작업을 가진 작업을 자동으로 프로젝트로 변환하고, 하위 작업이 없는 프로젝트를 다시 작업으로 변환합니다

@signature: auto_types: boolean

### Example

~~~jsx
gantt.config.auto_types = true;
~~~

**Default value:** false


### Related samples
- [요약 작업을 동적으로 생성 (auto_types)](https://docs.dhtmlx.com/gantt/samples/04_customization/19_task_type.html)

### Related Guides
- [그리드에서의 인라인 편집](guides/inline-editing.md#inline-editing-modes)
- [작업 유형](guides/task-types.md)