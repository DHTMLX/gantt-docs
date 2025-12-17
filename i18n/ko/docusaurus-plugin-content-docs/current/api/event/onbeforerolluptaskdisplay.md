---
sidebar_label: onBeforeRollupTaskDisplay
title: onBeforeRollupTaskDisplay event
description: "롤업 태스크가 상위 프로젝트에 표시되기 직전에 트리거됩니다."
---

# onBeforeRollupTaskDisplay

### Description

@short: 롤업 태스크가 상위 프로젝트에 표시되기 직전에 트리거됩니다.

@signature: onBeforeRollupTaskDisplay: (taskId: number | string, task: Task, parentId: number | string) =\> boolean;

### Parameters

- `taskId` - (required) *number | string* - 롤업 태스크의 ID
- `task` - (required) *Task* - 롤업 태스크 객체 자체
- `parentId` - (required) *number | string* - 상위(프로젝트) 태스크의 ID

### Returns
- ` result` - (boolean) - 롤업 태스크가 상위 프로젝트에 보일지(<b>true</b>) 숨겨질지(<b>false</b>) 여부를 나타냅니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // 여기에 커스텀 로직 작성
    return false;
});
~~~

### Related Guides
- [Milestones](guides/milestones.md#rolluptasksandmilestones)

### Change log
- v8.0에 추가됨
