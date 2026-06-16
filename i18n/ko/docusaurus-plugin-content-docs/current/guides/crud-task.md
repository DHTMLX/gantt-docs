---
title: "작업의 기본 조작"
sidebar_label: "작업의 기본 조작"
---

# 작업의 기본 조작

이 챕터에서는 작업에 대한 기본 조작을 배우게 됩니다: 작업을 생성하거나 삭제하고, 작업의 속성을 동적으로 업데이트하는 방법.

## 새 작업 추가하기

Gantt 차트에 새 작업을 추가하려면 [`addTask()`](api/method/addtask.md) 메서드를 사용합니다:

~~~js
const taskId = gantt.addTask({
    id: 10,
    text: "Project #1",
    start_date: "2027-09-02",
    duration: 28
});
~~~

### 특정 레벨에서의 작업 추가 방지

사용자가 특정 레벨의 작업에 하위 작업을 추가하지 못하게 하거나, 다른 조건에 따라 하기를 원하지 않는 경우 CSS로 'Add' 버튼을 숨길 수 있습니다.

각 작업 행에 대해 CSS 클래스를 할당하려면 [`grid_row_class`](api/template/grid_row_class.md) 템플릿을 사용합니다:

~~~js
gantt.templates.grid_row_class = (start, end, task) => {
    if (task.$level > 1) {
        return "nested_task";
    }
    return "";
};
~~~

그리고 이러한 행에서 'Add' 버튼을 숨깁니다:

~~~css
.nested_task .gantt_add {
    display: none !important;
}
~~~

[미리 정의된 프로젝트 구조](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)

## 작업의 속성 업데이트하기

작업 객체의 속성을 동적으로 업데이트하려면 [`updateTask()`](api/method/updatetask.md) 메서드를 사용합니다:

~~~js {3-4}
const task = gantt.getTask(10); // -> { id: 10, text: "Task #10", start_date: "2027-09-02", ... }

task.text = "Task #10_1";
gantt.updateTask(10);
~~~

데이터 프로세서가 활성화되어 있다면 [`updateTask()`](api/method/updatetask.md) 메서드는 변경 내용을 서버로 전송합니다.

작업이 업데이트된 후 [`onAfterTaskUpdate`](api/event/onaftertaskupdate.md) 이벤트가 발생합니다. 이는 다른 변경을 초래할 수 있습니다. 예를 들어 자동 일정 설정이 활성화된 경우 Gantt가 작업과 모든 후속 작업을 자동으로 일정화합니다.

변경 내용을 다시 렌더링하기만 하면 된다면 [`updateTask()`](api/method/updatetask.md) 대신 [`refreshTask()`](api/method/refreshtask.md) 메서드를 호출합니다.

~~~js
const task = gantt.getTask(10); // -> { id: 10, text: "Task #10", start_date: "2027-09-02", ... }

task.text = "Task #10_1";
gantt.refreshTask(10);
~~~

## 작업 다시 그리기

GMCnt 차트의 모든 작업을 다시 그리려면 [`refreshData()`](api/method/refreshdata.md) 메서드를 사용합니다:

~~~js {4-6}
const firstTask = gantt.getTask(10); // -> { id: 10, text: "Task #10", start_date: "2027-09-02", ... }
const secondTask = gantt.getTask(11); // -> { id: 11, text: "Task #11", start_date: "2027-09-05", ... }

firstTask.text = "Task #10_1";
secondTask.text = "Task #11_1";
gantt.refreshData();
~~~

## 작업 삭제하기

작업을 삭제하려면 [`deleteTask()`](api/method/deletetask.md) 메서드를 사용합니다:

~~~js
gantt.deleteTask(taskId);
~~~

## 중첩 작업의 연쇄 삭제

Gantt에서 작업 삭제 과정을 제어하는 [cascade_delete](api/config/cascade_delete.md) 설정이 있습니다. 기본값은 *true*이며, 이는 작업을 삭제할 때 삭제된 작업의 모든 중첩 작업 및 연결에 대해 서버로 요청을 보낸다는 뜻입니다.

서버로 여러 요청을 보내지 않으려면 [cascade_delete](api/config/cascade_delete.md) 구성을 간단히 비활성화할 수 있습니다:

~~~js
gantt.config.cascade_delete = false;
~~~

이 경우 부모 작업을 삭제하기 위해 서버에 단일 요청만 전송되고, 하위 작업과 링크는 서버에서 삭제됩니다.

[cascade_delete](api/config/cascade_delete.md) 옵션은 백엔드 구현 방식에 영향을 미칩니다. Server-side Integration 문서의 관련 섹션인 [서버 측 통합 가이드의 cascade-deletion 부분](guides/server-side.md#cascade-deletion)을 참고하십시오.

## Gantt 차트에서 모든 작업 제거하기

Gantt 차트에서 모든 작업을 제거하려면 [`clearAll()`](api/method/clearall.md) 메서드를 호출합니다:

~~~js
gantt.clearAll();
~~~