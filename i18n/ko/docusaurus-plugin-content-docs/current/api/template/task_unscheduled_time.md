---
sidebar_label: task_unscheduled_time
title: task_unscheduled_time template
description: "예정되지 않은 작업의 날짜를 지정합니다."
---

# task_unscheduled_time

### Description

@short: 예정되지 않은 작업의 날짜를 지정합니다.

@signature: task_unscheduled_time: (task: Task) =\> string | void;

### Parameters

- `task` - (required) *Task* - 작업 객체

### Returns
- ` text` - (string | void) - 날짜 값이 있는 컬럼의 그리드에 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.task_unscheduled_time = function(task){
   return "";
};
~~~

### Related samples
- [Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

### Details

기본적으로 빈 문자열을 반환합니다.

작업이 구성 객체에 `unscheduled:true` 속성을 포함하여 [예정되지 않은 작업](guides/unscheduled-tasks.md)으로 표시되면, 모든 날짜 필드가 빈 행으로 표시됩니다. 
아래 예제를 참고하세요:

:::note

**Related example:** [예정되지 않은 작업의 날짜 렌더링](https://snippet.dhtmlx.com/t6skfgjx)

:::

예정되지 않은 작업에 대해 일부 날짜를 표시해야 하는 경우, [date_grid](api/template/date_grid.md) 템플릿을 사용하여 이를 구현할 수 있습니다.

### Related API
- [show_unscheduled](api/config/show_unscheduled.md)

### Related Guides
- [작업의 기본 작업](guides/unscheduled-tasks.md)

