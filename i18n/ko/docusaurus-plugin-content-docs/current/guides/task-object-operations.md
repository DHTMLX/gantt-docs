---
title: "Task Object/Id"
sidebar_label: "Task Object/Id"
---

# Task Object/Id


간트 차트에서 데이터를 다룰 때, 데이터 항목의 객체 또는 id에 접근하는 방법을 아는 것이 중요합니다. 대부분의 메서드는 데이터 객체나 id를 매개변수로 필요로 합니다. 또한, 모든 데이터 관련 작업은 데이터 객체나 id를 참조하여 수행됩니다.

*작업과 관련된 트리 관련 메서드에 대한 정보는 [Task Parent/Child](guides/task-tree-operations.md) 문서를 참고하세요.*

## Task object


작업 객체를 가져오려면 [getTask](api/method/gettask.md) 메서드를 사용하세요:

~~~js
gantt.getTask("t1");
//->{id:"t1", text:"Task #5", start_date:"02-09-2020", duration:28, 
// progress:0.6, parent:"pr_2", $source:[3,5], $target:[2,1], ...}
~~~

## Parent of a task


작업의 상위(parent)를 찾으려면 [getParent](api/method/getparent.md) 메서드를 사용하거나 작업 객체의 **parent** 속성에 접근할 수 있습니다:

~~~js
gantt.getParent("t1"); //->"pr_2". 상위가 없으면 이 메서드는 루트 id를 반환합니다
//또는
var taskObj = gantt.getTask("t1"); //-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~

*간트 차트 트리 구조와 관련된 모든 메서드는 [Task Parent/Child](guides/task-tree-operations.md) 문서를 참고하세요.*

## Links connected to a task


특정 작업에 연결된 모든 링크를 가져오는 방법은 [링크 객체/ID 가져오기](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask) 문서를 참고하세요.

## Task duration


작업의 기간을 확인하려면 [calculateDuration](api/method/calculateduration.md) 메서드를 사용하세요:

~~~js
gantt.calculateDuration(new Date(2020,03,30),new Date (2020,04,02)); // ->16
~~~

이 메서드는 **duration** 매개변수만 변경하고 작업 객체를 업데이트할 경우 올바르게 동작하지 않습니다. 정상적으로 동작하려면 [calculateEndDate](api/method/calculateenddate.md) 메서드를 사용해 **end_date** 파라미터도 함께 업데이트해야 합니다. [예제 보기](https://snippet.dhtmlx.com/f6keqhy5).

[work_time](api/config/work_time.md) 옵션이 활성화된 경우, [calculateDuration](api/method/calculateduration.md) 메서드는 작업 기간을 근무 시간 기준으로 계산합니다.

## Task height


작업의 DOM 요소 높이를 가져오려면 [getTaskBarHeight](api/method/gettaskbarheight.md) 메서드를 사용하세요:

~~~js
gantt.config.bar_height = 45;
gantt.render();
 
gantt.getTaskBarHeight(1); // -> 45
~~~

반환된 값은 작업 객체에 설정된 **bar_height** 속성에 해당할 수도 있습니다:

~~~js
var tasks = {
      data:[
         { id: 1, text: "Project #2", start_date: "01-04-2018", duration: 18, 
             progress: 0.4, open: true, bar_height: "full", row:height: 50 }, 
        { id: 2, text: "Task #1", start_date: "02-04-2018", duration: 8, 
            progress: 0.6, parent: 1, bar_height: 25, row:height: 50 },
       ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getTaskBarHeight(1); // -> 45
gantt.getTaskBarHeight(2); // -> 25
~~~

**bar_height** 속성이 "full"로 설정된 경우, 이 메서드는 작업 바의 높이를 픽셀 단위로 계산합니다.

## Task end date


작업의 종료일을 가져오려면 [calculateEndDate](api/method/calculateenddate.md) 메서드를 사용하세요:

~~~js
gantt.calculateEndDate(new Date(2020,03,30),48,"hour"); //-> Thu May 07 2020 17:00:00
~~~

[work_time](api/config/work_time.md) 옵션이 활성화된 경우, 이 메서드는 기간을 근무 시간으로 처리합니다.

## Selected task


현재 선택된 작업을 얻으려면 [getSelectedId](api/method/getselectedid.md) 메서드를 사용하세요:

~~~js
gantt.selectTask("t_1"); 
gantt.getSelectedId();  //-> "t_1" - 선택된 작업의 id
~~~

## Tasks from a specific period


특정 기간 내에 있는 작업 목록을 가져오려면 [getTaskByTime](api/method/gettaskbytime.md) 메서드를 사용하세요:

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,03,05),new Date(2020,03,15)); 
// tasks는 작업 객체들의 배열입니다
~~~

## All tasks of Gantt 


간트 차트에 표시된 모든 작업을 가져오려면 [getTaskByTime](api/method/gettaskbytime.md) 메서드를 파라미터 없이 호출하세요:

~~~js
var tasks = gantt.getTaskByTime();  //모든 작업을 객체 배열로 반환
~~~

또는 [serialize](api/method/serialize.md) 메서드를 사용할 수 있습니다.

## Links of a certain task


특정 작업과 관련된 링크를 가져오려면 작업 객체의 **$source** 및 **$target** 속성을 사용하세요. 이 속성들은 자동 생성되며 관련 링크의 id를 포함합니다:

- **$source** - 해당 작업에서 시작되는 링크
- **$target** - 해당 작업을 가리키는 링크

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;  //-> ["l1","l4"] - 아웃고잉 링크의 id  /*!*/
var targetLinks = taskObj.$target;  //-> ["l5","l8"] - 인커밍 링크의 id  /*!*/
~~~

## Nearest oncoming task


가장 가까운 예정된 작업을 찾으려면 [getTaskByTime](api/method/gettaskbytime.md) 메서드를 다음과 같이 사용하세요:

~~~js
var tasks = gantt.getTaskByTime(new Date(), new Date(9999,1,1));    
// tasks는 모든 예정된 작업을 포함
tasks.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
// tasks[0]이 가장 가까운 예정된 작업입니다
~~~

## Task id


일반적으로 작업의 id는 데이터셋의 "data" 객체에 포함되어 있습니다:

~~~js
{
    tasks:[
        {id:1, text:"Task #1", start_date:"01-04-2020", duration:18, progress:0.4}, /*!*/
        {id:2, text:"Task #2", start_date:"02-04-2020", duration:8,  progress:0.6}  /*!*/
    ],
    links:[...]
}
~~~

만약 데이터셋에서 작업의 id를 접근할 수 없다면, [getTaskByTime](api/method/gettaskbytime.md) 메서드를 다음과 같이 사용하세요:

~~~js
var tasks = gantt.getTaskByTime();   //모든 작업 반환
for(var i="0;i" < tasks.length; i++){  //필요한 작업을 찾기 위해 반복
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

*작업이 발생하는 대략적인 시점을 알고 있다면, 검색 속도를 높이기 위해 시간 범위를 제한하는 것이 더 효율적입니다:*

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,05,01),new Date(2020,05,10)); 
for(var i="0;i" < tasks.length; i++){  
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

### 작업 id 변경하기

작업의 id를 업데이트하려면 [changeTaskId](api/method/changetaskid.md) 메서드를 사용하세요:

~~~js
gantt.changeTaskId("t1", "t11");  //작업 id를 "t1"에서 "t11"로 변경
~~~

## Opening/Closing task branches


작업 브랜치의 열림(open) 상태는 **task.$open** 속성으로 제어할 수 있으며, 이 속성은 작업이 간트에 로드된 후에 사용 가능합니다. 이 값을 변경하면 다음 간트 리렌더링 시 반영됩니다:

~~~js
// 모든 브랜치 확장
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();

// 모든 브랜치 축소
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

단일 작업을 열거나 닫으려면 [open](api/method/open.md) 및 [close](api/method/close.md) 메서드를 사용할 수 있습니다. 이 메서드는 내부 상태를 업데이트하고 다시 그리기를 트리거합니다. 여러 작업을 수정할 때는 **task.$open**을 직접 변경하는 것이 불필요한 리렌더링을 피할 수 있어 더 효율적입니다.

## Copying/pasting tasks


작업 복사 및 붙여넣기 예제는 [How to copy and paste tasks](guides/how-to.md#howtocopyandpastetasks) 섹션을 참고하세요.

