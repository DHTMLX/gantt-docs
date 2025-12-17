---
sidebar_label: getTaskRowNode
title: getTaskRowNode method
description: "테이블에서 작업 행을 나타내는 HTML 요소를 반환합니다"
---

# getTaskRowNode

### Description

@short: 테이블에서 작업 행을 나타내는 HTML 요소를 반환합니다

@signature: getTaskRowNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    작업 ID

### Returns
- `node` - (HTMLElement) - 작업 행에 해당하는 HTML 요소

### Example

~~~jsx
const taskId = gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.getTaskRowNode(10);//-><div class=​"gantt_row" task_id=​"2">​…​</div>​
~~~

### Details

작업이 업데이트되어 다시 그려질 때 이전의 DOM 요소는 폐기되고 새로운 요소로 교체된다는 점을 유의하세요. 따라서 요소에 직접 적용한 수정사항은 다음 리페인트 시 사라집니다.

요소의 외관을 커스터마이징하려면 템플릿을 사용하는 것이 가장 좋으며, 이는 간트 컴포넌트의 모양을 조정하는 권장 방법입니다.

### Related API
- [getTaskNode](api/method/gettasknode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)

### Related Guides
- [컬럼 지정하기](guides/specifying-columns.md#datamappingandtemplates)

