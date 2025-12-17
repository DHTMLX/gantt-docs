---
sidebar_label: addTask
title: addTask method
description: "새 작업 추가"
---

# addTask

### Description

@short: 새 작업 추가

@signature: addTask: (task: NewTask, parent?: string | number, index?: number) =\> string | number

### Parameters

- `task` - (required) *NewTask* - 작업 객체
- `parent` - (optional) *string | number* -           선택 사항, 부모 작업의 ID
- `index` - (optional) *number* - 선택 사항, 작업이 삽입될 위치 (0 이상)

### Returns
- ` id` - (string, number) - 작업의 ID

### Example

~~~jsx
const taskId = gantt.addTask({
    id: 10,
    text: "Task #5",
    start_date: "02-09-2025",
    duration: 28
}, "project_2", 1);
~~~

### Details

*index* 파라미터에 0 이상 값을 제공하면, 해당 작업이 그 분기(branch) 내 특정 위치에 삽입됩니다. 
만약 이 값을 생략하면, 작업은 분기 끝에 추가됩니다.

이 메서드는 [onBeforeTaskAdd](api/event/onbeforetaskadd.md) 와 [onAfterTaskAdd](api/event/onaftertaskadd.md) 이벤트를 트리거합니다.

사용자가 라이트박스에서 작업 추가를 취소하는 등 작업 저장을 막고 싶을 때는, 대신 [createTask](api/method/createtask.md) 메서드를 사용하는 것을 권장합니다. 이 메서드는 [onTaskCreated](api/event/ontaskcreated.md) 이벤트를 발생시킵니다.


## 특정 레벨에 작업 추가 방지하기
특정 작업 아래에 하위 작업 추가를 막는 간단한 방법은 CSS를 이용해 'Add' 버튼을 숨기는 것입니다.

1. 먼저 [grid_row_class](api/template/grid_row_class.md) 템플릿을 사용하여 각 작업 행에 CSS 클래스를 지정합니다:
~~~js
gantt.templates.grid_row_class = (start, end, task) => {
    if (task.$level > 1) {
        return "nested_task";
    }
    return "";
};
~~~
2. 그 다음, 해당 행의 'Add' 버튼을 숨깁니다:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~


:::note
sample
  [Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)
:::

### Related API
- [createTask](api/method/createtask.md)
- [addLink](api/method/addlink.md)
- [onAfterTaskAdd](api/event/onaftertaskadd.md)
- [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related Guides
- [작업의 기본 작업](guides/crud-task.md)

