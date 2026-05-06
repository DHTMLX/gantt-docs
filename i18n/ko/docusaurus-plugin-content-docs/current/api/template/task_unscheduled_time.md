---
sidebar_label: task_unscheduled_time
title: task_unscheduled_time template
description: "예정되지 않은 작업의 날짜를 지정합니다."
---

# task_unscheduled_time

### Description

@short: 일정하지 않은 작업의 날짜를 지정합니다

@signature: task_unscheduled_time: (task: Task) =\> string | void;

### Parameters

- `task` - (required) *Task* - 작업 객체

### Returns
- ` text` - (string | void) - Date 값이 있는 열에서 렌더링될 HTML 텍스트

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

작업이 [unscheduled](guides/unscheduled-tasks.md)인 경우, 즉 해당 작업의 구성 객체에 `unscheduled:true` 속성이 포함되어 있으면 모든 날짜가 빈 행으로 렌더링됩니다.
아래 예제를 확인하십시오:

:::note
샘플: [Rendering dates in unscheduled tasks ](https://snippet.dhtmlx.com/t6skfgjx )
:::

일정되지 않은 작업에 대해 몇 가지 날짜를 표시해야 하는 경우, [date_grid](api/template/date_grid.md) 템플릿의 도움으로 이를 수행할 수 있습니다.

### Related API
- [show_unscheduled](api/config/show_unscheduled.md)

### Related Guides
- [작업의 기본 작업](guides/unscheduled-tasks.md)

