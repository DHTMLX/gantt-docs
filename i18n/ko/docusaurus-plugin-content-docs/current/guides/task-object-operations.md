---
title: "작업 객체/ID"
sidebar_label: "작업 객체/ID"
---

# 작업 객체/ID

Gantt 차트에서 데이터를 다루려면 데이터 아이템의 객체나 ID를 얻는 방법을 알아야 합니다. 첫째로, 대부분의 메서드는 데이터 객체/ID를 매개변수로 받습니다. 둘째로, 데이터 관련 코드를 구현하려면 데이터 객체/ID를 참조하지 않으면 불가능합니다.

*작업에 대해 사용할 수 있는 트리 관련 메서드를 보려면 [Task Parent/Child](guides/task-tree-operations.md) 기사를 참조하십시오.*

## Task object

작업 객체를 얻으려면 [getTask](api/method/gettask.md) 메서드를 사용하세요:

~~~js
gantt.getTask("t1");
//->{id:"t1", text:"Task #5", start_date:"02-09-2020", duration:28, 
// progress:0.6, parent:"pr_2", $source:[3,5], $target:[2,1], ...}
~~~

## Parent of a task

작업의 부모를 얻으려면 [getParent](api/method/getparent.md) 메서드 또는 작업 객체의 **parent** 속성을 사용하세요:

~~~js
gantt.getParent("t1"); //->"pr_2".부모가 없으면 메서드는 루트 ID를 반환합니다
//또는
var taskObj = gantt.getTask("t1"); //-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~

*작업의 트리 특성에 관련된 모든 메서드를 보려면 [Task Parent/Child](guides/task-tree-operations.md) 기사를 읽으십시오.*

## Links connected to a task

특정 작업과 연결된 모든 링크를 얻는 방법에 대한 자세한 내용은 [Getting the Link Object/Id](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task) 기사를 참조하십시오.


## Task duration

작업의 지속 시간을 얻으려면 [calculateDuration](api/method/calculateduration.md) 메서드를 사용하세요:

~~~js
gantt.calculateDuration(new Date(2020,03,30),new Date (2020,04,02)); // ->16
~~~

매개변수의 **duration**만 바꾸고 작업 객체를 업데이트해도 메서드는 작동하지 않습니다. 작동하도록 하려면 [calculateEndDate](api/method/calculateenddate.md) 메서드를 통해 **end_date** 매개변수도 업데이트해야 합니다. [예제 확인](https://snippet.dhtmlx.com/f6keqhy5).

참고로 [work_time](api/config/work_time.md) 옵션이 활성화되어 있으면 [calculateDuration](api/method/calculateduration.md) 메서드는 작업의 지속 시간을 근무 시간으로 계산합니다. 

## Task height

작업의 DOM 요소 높이를 얻으려면 [getTaskBarHeight](api/method/gettaskbarheight.md) 메서드를 사용하세요:

~~~js
gantt.config.bar_height = 45;
gantt.render();
 
gantt.getTaskBarHeight(1); // -> 45
~~~

반환 값은 또한 작업 객체의 **bar_height** 속성에 지정된 값과 일치할 수 있습니다:

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

참고로 **bar_height** 속성이 "full"로 지정된 경우 메서드는 태스크 바의 높이를 픽셀 단위로 계산합니다.

## Task end date

작업의 종료 날짜를 얻으려면 [calculateEndDate](api/method/calculateenddate.md) 메서드를 사용하세요:

~~~js
gantt.calculateEndDate(new Date(2020,03,30),48,"hour"); //-> Thu May 07 2020 17:00:00
~~~

참고로 [work_time](api/config/work_time.md) 옵션이 활성화되어 있으면 이 메서드는 지속 시간을 근무 시간으로 간주합니다. 


## Selected task

현재 선택된 작업을 얻으려면 [getSelectedId](api/method/getselectedid.md) 메서드를 사용하세요: 

~~~js
gantt.selectTask("t_1"); 
gantt.getSelectedId();  //-> "t_1" - 선택된 작업의 ID
~~~

## Tasks from a specific period

지정된 기간 동안 발생하는 작업의 컬렉션을 얻으려면 [getTaskByTime](api/method/gettaskbytime.md) 메서드를 사용하세요:

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,03,05),new Date(2020,03,15)); 
// where tasks is an array of tasks' objects
~~~

## All tasks of Gantt 

간트 차트에 표시된 모든 작업을 얻으려면 위와 같이 [getTaskByTime](api/method/gettaskbytime.md) 메서드를 사용하세요:

~~~js
var tasks = gantt.getTaskByTime();  //returns all tasks as an array of objects
~~~

또한 [serialize](api/method/serialize.md) 메서드를 호출할 수 있습니다.


## Links of a certain task

특정 작업과 연결된 링크를 얻으려면 작업 객체의 **$source**, **$target** 속성을 사용하세요. 이 속성은 자동으로 생성되며 관련 링크의 ID를 저장합니다:

- **$source** - 작업에서 나오는 링크.
- **$target** - 작업으로 들어오는 링크.

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;  //-> ["l1","l4"] - 나오는 링크의 ID  /*!*/
var targetLinks = taskObj.$target;  //-> ["l5","l8"] - 들어오는 링크의 ID  /*!*/
~~~


## Nearest oncoming task

가장 가까운 들어오는 작업을 얻으려면 [getTaskByTime](api/method/gettaskbytime.md) 메서드를 아래와 같이 사용합니다:

~~~js
var tasks = gantt.getTaskByTime(new Date(), new Date(9999,1,1);    
// tasks - 가장 가까운 들어오는 작업들의 목록
tasks.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
// tasks[0] - 가장 가까운 들어오는 사건
~~~

## Task id

일반적으로 데이터 세트의 "data" 오브젝트에서 작업의 ID를 얻을 수 있습니다. 

~~~js
{
    tasks:[
        {id:1, text:"Task #1", start_date:"01-04-2020", duration:18, progress:0.4}, /*!*/
        {id:2, text:"Task #2", start_date:"02-04-2020", duration:8,  progress:0.6}  /*!*/
    ],
    links:[...]
}
~~~

데이터 세트에서 작업의 id를 얻을 수 없다면 아래와 같이 [getTaskByTime](api/method/gettaskbytime.md) 메서드를 사용하세요:

~~~js
var tasks = gantt.getTaskByTime();   //returns all tasks
for(var i="0;i" < tasks.length; i++){  //필요한 작업을 찾기 위해 모든 작업 순회
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

*필요한 작업이 발생하는 대략적인 시간이 있다면 앱 속도를 높이기 위해 반환되는 작업 컬렉션을 제한하는 것이 좋습니다:*

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,05,01),new Date(2020,05,10)); 
for(var i="0;i" < tasks.length; i++){  
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

### Changing id of a task

현재 작업의 ID를 변경하려면 [changeTaskId](api/method/changetaskid.md) 메서드를 사용하세요:

~~~js
gantt.changeTaskId("t1", "t11");  //changes the task id from "t1" to "t11" 
~~~


## Opening/Closing task branches

작업 가지의 열림 상태는 로드된 작업 이후에 사용할 수 있는 **task.$open** 속성으로 정의됩니다. 값이 수정되면 다음 재페인트 이후에 변경 내용이 표시됩니다:

~~~js
// 모든 가지 확장
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();

// 모든 가지 축소
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

단일 작업을 열거나 닫으려면 [open](api/method/open.md) 및 [close](api/method/close.md) 메서드를 사용할 수 있습니다. 이들은 작업의 내부 상태를 변경하고 재페인팅을 호출합니다. 그러나 여러 작업을 수정하려면 불필요한 재페인팅을 피하기 위해 **task.$open**를 직접 사용하는 것이 좋습니다.

## Copying/pasting tasks

다음은 [How to copy and paste tasks](guides/how-to.md#how-to-copy-and-paste-tasks) 섹션의 예제를 따르십시오.