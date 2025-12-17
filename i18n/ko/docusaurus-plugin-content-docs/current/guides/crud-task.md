---
title: "작업의 기본 작업"
sidebar_label: "작업의 기본 작업"
---

작업의 기본 작업
========================================

이 장에서는 작업의 기본적인 작업, 즉 작업 생성, 삭제, 속성 동적 업데이트 방법을 다룹니다.

새 작업 추가하기
----------------------------

Gantt 차트에 새 작업을 추가하려면 [addTask](api/method/addtask.md) 메서드를 사용하세요:

~~~js
var taskId = gantt.addTask({
    id:10,
    text:"Project #1",
    start_date:"02-09-2020",
    duration:28
});
~~~

### 특정 레벨에 작업 추가 방지하기

특정 레벨(또는 기타 조건)에 속한 작업에 하위 작업을 추가하지 못하도록 하려면, CSS를 이용해 'Add' 버튼을 숨기는 것이 가장 간단한 방법입니다.

[grid_row_class](api/template/grid_row_class.md) 템플릿을 사용하여 각 작업 행에 CSS 클래스를 지정할 수 있습니다:

~~~js
gantt.templates.grid_row_class = function( start, end, task ){
    if ( task.$level > 1 ){
        return "nested_task"
    }
    return "";
};
~~~

그런 다음 해당 행의 'Add' 버튼을 숨깁니다:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~

[Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


작업 속성 업데이트하기
------------------------------

작업 객체의 속성을 즉시 업데이트하려면 [updateTask](api/method/updatetask.md) 메서드를 사용하세요:

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1";/*!*/ 
gantt.updateTask(10); /*!*/
~~~

Data Processor가 활성화된 경우, [updateTask()](api/method/updatetask.md)를 호출하면 변경 사항이 서버로 전송됩니다.

작업이 업데이트되면 [onAfterTaskUpdate](api/event/onaftertaskupdate.md) 이벤트가 발생합니다. 이로 인해 자동 스케줄링 기능이 활성화된 경우 작업 및 후속 작업의 자동 스케줄링과 같은 추가 업데이트가 일어날 수 있습니다.

서버로 데이터를 보내지 않고 시각적 새로고침만 필요하다면, [updateTask()](api/method/updatetask.md) 대신 [refreshTask()](api/method/refreshtask.md) 메서드를 사용하세요:

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1"; 
gantt.refreshTask(10);
~~~

작업 다시 그리기
----------------------

Gantt 차트의 모든 작업을 다시 그리려면 [refreshData](api/method/refreshdata.md) 메서드를 사용하세요:

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
var task2 = gantt.getTask(11);//->{id:11,text:"Task #11",start_date:"05-09-2020",...}
 
task.text = "Task #10_1"; /*!*/ 
task2.text = "Task #11_1";/*!*/ 
gantt.refreshData(); /*!*/ 
~~~

작업 삭제하기
-------------------------------

작업을 제거하려면 [deleteTask](api/method/deletetask.md) 메서드를 사용하세요:

~~~js
gantt.deleteTask(taskId);
~~~

중첩된 작업의 연쇄 삭제
---------------------------

[cascade_delete](api/config/cascade_delete.md) 설정은 작업 삭제가 어떻게 처리되는지 제어합니다. 기본값은 *true*로, 작업을 삭제하면 해당 작업과 연결된 모든 하위 작업 및 링크에 대해 서버에 요청이 전송됩니다.

여러 개의 요청 전송을 원하지 않는 경우, [cascade_delete](api/config/cascade_delete.md) 옵션을 비활성화하세요:

~~~js
gantt.config.cascade_delete = false;
~~~

이 설정을 끄면 Gantt는 부모 작업 삭제 요청만 보내고, 서버가 하위 작업 및 링크 삭제를 처리합니다.

이 옵션은 백엔드 구현에 영향을 줍니다. 자세한 내용은 
[Server-side Integration 문서의 관련 섹션](guides/server-side.md#cascadedeletion)에서 확인할 수 있습니다.

Gantt 차트에서 모든 작업 제거하기
-------------------------------------------

Gantt 차트에서 모든 작업을 삭제하려면 [clearAll](api/method/clearall.md) 메서드를 호출하세요:

~~~js
gantt.clearAll();
~~~

