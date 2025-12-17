---
sidebar_label: task_attribute
title: task_attribute config
description: "작업의 HTML 요소 ID를 지정하는 데 사용되는 속성 이름을 정의합니다."
---

# task_attribute

### Description

@short: 작업의 HTML 요소 ID를 지정하는 데 사용되는 속성 이름을 정의합니다.

@signature: task_attribute: string

### Example

~~~jsx
gantt.config.task_attribute = "data-task-id"
~~~

**Default value:** "data-task-id"

### Details

기본 **task_attribute** (*data-task-id*)가 적용된 작업 HTML 요소는 다음과 같이 표시됩니다:

![data_task_id](/img/data_task_id.png)

이전 버전과의 호환성을 유지하기 위해 *task_id* 속성도 여전히 포함되어 있습니다.

### Related API
- [locate](api/method/locate.md)

