---
sidebar_label: eachTask
title: eachTask method
description: "특정 태스크나 전체 간트 차트의 모든 하위 태스크를 순회합니다"
---

# eachTask

### Description

@short: 특정 태스크나 전체 간트 차트의 모든 하위 태스크를 순회합니다

@signature: eachTask: (code: GanttCallback, parent?: string | number, master?: any) =\> void

### Parameters

- `code` - (required) *function* - 각 태스크마다 호출되는 함수입니다. 이 함수는 태스크 객체를 인자로 받습니다.
- `parent` - (optional) *string | number* -            부모 ID입니다. 지정된 경우, 해당 부모의 자식들만 순회합니다.    
- `master` - (optional) *object* - 함수 내에서 'this'로 사용될 객체입니다.

### Example

~~~jsx
gantt.eachTask(function(task){alert(task.text);})
~~~

### Details

이 메서드는 왼쪽에서 오른쪽으로 [깊이 우선 트리 순회](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR))를 수행하며, 각 태스크를 방문합니다. 부모 태스크가 자식 태스크보다 먼저 처리됩니다.

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)

