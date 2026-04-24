---
sidebar_label: task_attribute
title: task_attribute config
description: "태스크의 HTML 요소 ID를 지정할 속성의 이름을 설정합니다"
---

# task_attribute

### Description

@short: 태스크의 HTML 요소 ID를 지정할 속성의 이름을 설정합니다

@signature: task_attribute: string

### Example

~~~jsx
gantt.config.task_attribute = "data-task-id"
~~~

**Default value:** "data-task-id"

### Details

![data_task_id](/img/data_task_id.png)

기본값인 **task_attribute** (*data-task-id*)를 가진 작업의 HTML 요소는 아래와 같이 보입니다:

*task_id* 속성은 이전 버전과의 호환성을 유지하기 위해 포함되어 있습니다.

### Related API
- [locate](api/method/locate.md)