---
sidebar_label: eachTask
title: eachTask 메서드
description: "특정 작업의 모든 하위 작업 또는 전체 간트 차트의 모든 자식 작업을 순회합니다"
---

# eachTask

### Description

@short: 특정 작업의 모든 하위 작업 또는 전체 간트 차트의 모든 자식 작업을 순회합니다

@signature: eachTask: (code: GanttCallback, parent?: string | number, master?: any) => void

### Parameters

- `code` - (필수) *function* - 작업들을 순회하는 함수. 매개변수로 작업 객체를 받습니다
- `parent` - (선택) *string | number* - 부모의 ID. 지정되면, 함수는 지정된 부모의 자식들을 순회합니다
- `master` - (선택) *object* - 'this'가 참조할 객체

### Example

~~~jsx
gantt.eachTask(function(task){alert(task.text);})
~~~

### Details

이 메서드는 왼쪽에서 오른쪽으로 깊이 우선 트리 순회(depth-first traversal)를 사용하여 모든 작업을 순회합니다. 각 부모 노드는 자식 노드보다 먼저 방문됩니다.

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)