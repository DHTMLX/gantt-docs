---
sidebar_label: getTaskNode
title: getTaskNode method
description: "작업 바에 해당하는 HTML 요소를 가져옵니다"
---

# getTaskNode

### Description

@short: 작업 바에 해당하는 HTML 요소를 가져옵니다

@signature: getTaskNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    작업 식별자

### Returns
- `node` - (HTMLElement) - 작업 바를 나타내는 HTML 요소

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

작업이 다시 그려질 때마다 이전의 DOM 요소는 버려지고 새 요소로 교체된다는 점을 기억하세요. 즉, 요소에 직접 수행한 변경 사항은 다음 업데이트 후 사라지게 됩니다.

요소의 모양을 커스터마이징할 때는 템플릿을 사용하는 것이 가장 좋습니다. 템플릿은 Gantt 컴포넌트의 외관을 안정적으로 조정할 수 있는 방법을 제공합니다.

### Related API
- [getTaskRowNode](api/method/gettaskrownode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)

