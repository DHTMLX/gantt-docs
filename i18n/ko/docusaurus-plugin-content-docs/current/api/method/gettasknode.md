---
sidebar_label: getTaskNode
title: getTaskNode method
description: "태스크 바의 HTML 요소를 반환합니다."
---

# getTaskNode

### Description

@short: 작업 바의 HTML 요소를 반환합니다

@signature: getTaskNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    작업 ID

### Returns
- `node` - (HTMLElement) - 작업 바의 HTML 요소

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.getTaskNode(10);//-><div task_id=​"2" class=​"gantt_task_line" ​…​​>​​…​</div>​
~~~

### Details

작업이 다시 그려질 때, 이전 DOM 요소가 폐기되고 새 요소로 대체됩니다. 이는 다음 리페인트 이후에 요소에 대해 수행한 모든 변경 사항이 초기화됨을 의미합니다.

요소의 외관을 수정해야 하는 경우 템플릿 사용을 권장합니다. 템플릿은 Gantt 요소의 모양을 커스터마이즈하는 선호 방법입니다.

### Related API
- [getTaskRowNode](api/method/gettaskrownode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)