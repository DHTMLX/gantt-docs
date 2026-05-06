---
sidebar_label: addTask
title: addTask 메서드
description: "새로운 작업을 추가합니다"
---

# addTask

### Description

@short: 새로운 작업을 추가합니다

@signature: addTask: (task: NewTask, parent?: string | number, index?: number) => string | number

### Parameters

- `task` - (필수) *NewTask* - 작업 객체
- `parent` - (선택적) *string | number* - 부모의 id
- `task` - (선택적) *number* - 태스크가 추가될 위치(0 이상)

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

만약 *index* 매개변수를 0 이상으로 설정하면, 지정된 위치에 태스크가 해당 분기에 추가됩니다. 
그렇지 않으면 태스크는 작업 분기의 끝에 추가됩니다.

메서드는 [onBeforeTaskAdd](api/event/onbeforetaskadd.md) 및 [onAfterTaskAdd](api/event/onaftertaskadd.md) 이벤트를 호출합니다.

참고로, 예를 들어 사용자가 라이트박스에서 "취소" 버튼을 클릭하여 태스크를 저장하지 않으려는 경우, [createTask](api/method/createtask.md) 메서드와 이 메서드가 호출하는 [onTaskCreated](api/event/ontaskcreated.md) 이벤트를 사용하십시오.


### 특정 레벨에 태스크 추가를 차단하는 방법
사용자가 특정 태스크에 하위 태스크를 추가하지 못하도록 하는 아주 쉬운 방법은 CSS를 이용해 'Add' 버튼을 숨기는 것입니다.

먼저, [grid_row_class](api/template/grid_row_class.md) 템플릿을 사용하여 각 태스크 행에 CSS 클래스를 할당합니다:
~~~js
gantt.templates.grid_row_class = (start, end, task) => {
    if (task.$level > 1) {
        return "nested_task";
    }
    return "";
};
~~~

그런 행에서의 'Add' 버튼을 숨깁니다:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~

:::note
샘플 [Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)
:::

### 관련 API
- [createTask](api/method/createtask.md)
- [addLink](api/method/addlink.md)
- [onAfterTaskAdd](api/event/onaftertaskadd.md)
- [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related Guides
- [작업의 기본 작업](guides/crud-task.md)

