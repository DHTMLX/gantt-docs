---
title: "작업의 기본 조작"
sidebar_label: "작업의 기본 조작"
---

# 작업의 기본 조작

이 챕터에서는 작업에 대한 기본 조작을 배우게 됩니다: 작업을 생성하거나 삭제하고, 작업의 속성을 동적으로 업데이트하는 방법.


## 새 작업 추가

간트 차트에 새 작업을 추가하려면 [addTask](api/method/addtask.md) 메서드를 사용하세요:

~~~js
var taskId = gantt.addTask({
    id:10,
    text:"Project #1",
    start_date:"02-09-2020",
    duration:28
});
~~~

### 특정 수준에서의 작업 추가 방지

특정 수준의 작업에 하위 작업을 추가하지 못하도록(또는 다른 조건에 따라) 사용자가 'Add' 버튼을 CSS로 숨기면 방지하는 쉽고 간단한 방법이 있습니다.

각 작업 행에 CSS 클래스를 할당하려면 [grid_row_class](api/template/grid_row_class.md) 템플릿을 사용하세요:

~~~js
gantt.templates.grid_row_class = function( start, end, task ){
    if ( task.$level > 1 ){
        return "nested_task"
    }
    return "";
};
~~~

그리고 이러한 행에 대해 'Add' 버튼을 숨기려면:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~

[미리 정의된 프로젝트 구조](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## 작업 속성 업데이트

작업 객체의 속성을 동적으로 업데이트하려면 [updateTask](api/method/updatetask.md) 메서드를 사용하세요:

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1";/*!*/ 
gantt.updateTask(10); /*!*/
~~~

데이터 프로세서(Data Processor)가 활성화되어 있다면 [updateTask()](api/method/updatetask.md) 메서드는 서버로 변경 사항을 전송합니다. 

작업이 업데이트되면 [onAfterTaskUpdate](api/event/onaftertaskupdate.md) 이벤트가 발생합니다. 자동 스케줄링이 활성화된 경우 자동으로 작업과 모든 후속 작업의 스케줄링이 수행될 수 있습니다. 

변경 사항을 다시 렌더링하기만 원하면 [refreshTask()](api/method/refreshtask.md) 메서드를 호출하세요. 대신 [updateTask()](api/method/updatetask.md)을 사용하지 않아도 됩니다.

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1"; 
gantt.refreshTask(10);
~~~

## 작업 다시 그리기

간트 차트의 모든 작업을 다시 그리려면 [refreshData](api/method/refreshdata.md) 메서드를 사용하세요:

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
var task2 = gantt.getTask(11);//->{id:11,text:"Task #11",start_date:"05-09-2020",...}
 
task.text = "Task #10_1"; /*!*/ 
task2.text = "Task #11_1";/*!*/ 
gantt.refreshData(); /*!*/ 
~~~

## 작업 삭제

작업을 삭제하려면 [deleteTask](api/method/deletetask.md) 메서드를 사용하세요:

~~~js
gantt.deleteTask(taskId);
~~~

## 중첩 작업의 연쇄 삭제

간트에서 작업을 삭제하는 과정을 관리하는 [cascade_delete](api/config/cascade_delete.md) 설정이 있습니다. 기본값은 *true*로 되어 있어, 작업을 삭제하면 삭제된 작업의 각 중첩 작업과 링크에 대해 서버로 요청을 보냅니다.

여러 번 서버에 요청하는 것이 필요하지 않다면 [cascade_delete](api/config/cascade_delete.md) 설정을 비활성화할 수 있습니다:

~~~js
gantt.config.cascade_delete = false;
~~~

이 경우 Gantt는 상위 작업만 삭제하는 한 번의 서버 요청만 보냅니다. 중첩 작업과 링크는 서버에서 삭제합니다. 

[cascade_delete](api/config/cascade_delete.md) 옵션은 백엔드 구현 방식에 영향을 미칩니다. 서버 측 통합(Server-side Integration) 문서의 관련 섹션을 참조하십시오.


## 간트 차트에서 모든 작업 제거

간트 차트의 모든 작업을 제거하려면 [clearAll](api/method/clearall.md) 메서드를 호출하세요:

~~~js
gantt.clearAll();
~~~