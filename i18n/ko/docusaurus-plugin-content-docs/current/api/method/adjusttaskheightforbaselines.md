--- 
sidebar_label: adjustTaskHeightForBaselines
title: adjustTaskHeightForBaselines method
description: "베이스라인 요소가 올바르게 표시되도록 태스크의 행 높이를 조정합니다"
--- 

# adjustTaskHeightForBaselines

### Description

@short: 베이스라인 요소가 올바르게 표시되도록 태스크의 행 높이를 조정합니다

@signature: adjustTaskHeightForBaselines: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - `row_height` 를 조정할 태스크 객체

### Example

~~~jsx
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task);
gantt.render();
~~~

### Related samples
- [베이스라인 표시](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

이 메서드는 지정된 작업의 [`row_height`](guides/resizing-rows.md)를 업데이트하여 baseline 요소가 제대로 표시되도록 합니다.

보통 이 메서드를 호출할 필요는 없습니다. 주로 [gantt.config.baselines](api/config/baselines.md) 설정을 동적으로 변경할 때 사용됩니다.

### Related API
- [baselines](api/config/baselines.md)

### Related Guides
- [타임라인의 추가 요소](guides/inbuilt-baselines.md)

### Change log
- v9.0에서 추가됨