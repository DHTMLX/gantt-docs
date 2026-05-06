---
sidebar_label: onBeforeRollupTaskDisplay
title: onBeforeRollupTaskDisplay 이벤트
description: "상위 프로젝트에서 롤업 태스크가 표시되기 전에 발생합니다"
---

# onBeforeRollupTaskDisplay

### Description

@short: 롤업 태스크가 상위 프로젝트에 표시되기 전에 발생합니다

@signature: onBeforeRollupTaskDisplay: (taskId: number | string, task: Task, parentId: number | string) =\> boolean;

### Parameters

- `taskId` - (required) *number | string* - 롤업 태스크 ID
- `task` - (required) *Task* - 롤업 태스크 객체
- `parentId` - (required) *number | string* - 상위(프로젝트) 태스크의 ID

### Returns
- ` result` - (boolean) - 상위 프로젝트에 롤업 태스크가 표시될지 여부를 정의합니다 (<b>true</b>) 또는 표시되지 않을지 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // 여기에 코드 작성
    return false;
});
~~~

### Related Guides
- [Milestones](guides/milestones.md#rolluptasksandmilestones)

### Change log
- v8.0에 추가됨