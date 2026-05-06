---
sidebar_label: getTaskRowNode
title: getTaskRowNode method
description: "테이블에서 태스크 태스크의 HTML 요소를 반환합니다"
---

# getTaskRowNode

### Description

@short: 테이블의 태스크 행 HTML 요소를 반환합니다

@signature: getTaskRowNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (필수) *string | number* - 태스크 ID

### Returns
- `node` - (HTMLElement) - 태스크 행의 HTML 요소

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

다음 사항에 유의하십시오. 태스크가 다시 그려질 때 기존의 DOM 요소는 폐기되고 새 요소로 대체됩니다. 이는 다음 재도색 후에 요소에 대해 수행한 모든 변경 사항이 초기화됨을 의미합니다.

요소의 표시 모양을 수정해야 하는 경우 템플릿 사용을 권장합니다. 템플릿은 Gantt 요소의 모양을 커스터마이즈하는 기본 방법이기 때문입니다.

### Related API
- [getTaskNode](api/method/gettasknode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)

### Related Guides
- [컬럼 지정하기](guides/specifying-columns.md#datamappingandtemplates)

