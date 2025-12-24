---
title: "타임라인 내에서 작업 드래그하기"
sidebar_label: "타임라인 내에서 작업 드래그하기"
---

# 타임라인 내에서 작업 드래그하기


드래그 기능을 사용하면 작업의 시작일이나 종료일, 그리고 작업 기간을 쉽게 조정할 수 있습니다.  
기본적으로 드래그 앤 드롭이 활성화되어 있어, 사용자는 타임라인의 각 행에서 작업을 이동할 수 있습니다.

드래그 앤 드롭 동작을 세부적으로 제어하려면 다음 이벤트들을 사용할 수 있습니다:

- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) - 특정 작업의 드래그를 차단
- [onTaskDrag](api/event/ontaskdrag.md) - 드래그 가능 영역 제한 또는 드래그 중 커스텀 로직 적용
- [onAfterTaskDrag](api/event/onaftertaskdrag.md) - 작업 이동 후 처리 로직 실행

아래는 기본 드래그 동작을 커스터마이징하는 것이 유용한 일반적인 상황입니다:


1. [특정 작업의 드래그 차단](#denyingdraggingofspecifictasks)
2. [작업을 특정 날짜 범위 밖으로 드래그하지 못하게 하기](#denyingdraggingtasksoutofspecificdates)
3. [부모 작업과 함께 자식 작업도 같이 드래그하기](#draggingchildrentogetherwiththeparent)
4. [프로젝트와 하위 작업을 함께 드래그하기](#draggingprojectswithsubtasks)
5. [최소 작업 기간 설정하기](#settingminimaltaskduration)
6. [작업 드래그 시 자동 스크롤 활성화](#autoscrollduringtasksdragging)



## 특정 작업의 드래그 차단 {#denyingdraggingofspecifictasks}


특정 작업의 드래그를 비활성화하려면 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 이벤트를 사용하세요:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(gantt.getGlobalTaskIndex(id)%2==0){
        return false;      // 글로벌 작업 인덱스가 홀수일 경우 드래그 차단
    }
    return true;           // 글로벌 작업 인덱스가 짝수일 경우 드래그 허용
});
~~~


## 작업을 특정 날짜 범위 밖으로 드래그하지 못하게 하기 {#denyingdraggingtasksoutofspecificdates}

작업이 특정 날짜 범위를 벗어나지 않도록 제한하려면 [onTaskDrag](api/event/ontaskdrag.md) 이벤트를 사용하세요.

<p style="margin-top: 20px; font-weight: bold;"> onTaskDrag 이벤트: </p>

<ul style="margin-top:5px;">
    <li>사용자가 타임라인에서 작업을 드래그, 리사이즈, 혹은 진행률을 업데이트할 때마다 트리거됩니다.</li>
    <li>드래그 동작의 유형은 두 번째 인자인 <b>mode</b>로 전달됩니다.</li> 
    <li>가능한 모든 드래그 모드는 [drag_mode](api/config/drag_mode.md) 속성에 나열되어 있습니다.</li>
</ul>

<p style="margin-top: 20px; font-weight: bold;">요약하면, 동작 순서는 다음과 같습니다:</p>

<ol style="margin-top:5px;">
    <li>사용자가 작업을 드래그합니다.</li>
    <li>dhtmlxGantt가 새 위치를 기준으로 작업의 날짜를 재계산합니다.</li>
    <li>dhtmlxGantt가 [onTaskDrag](api/event/ontaskdrag.md) 이벤트를 발생시킵니다.</li>
    <li>dhtmlxGantt가 차트에서 작업을 다시 그립니다. <i>[onTaskDrag](api/event/ontaskdrag.md) 이벤트는 재계산 후에 발생하므로, 이벤트 핸들러 내에서 드래그된 작업에 커스텀 값을 안전하게 설정할 수 있습니다. 이렇게 하면 작업이 원하는 위치에 정확히 표시됩니다.</i></li>
</ol>





예를 들어, 사용자가 작업을 **"2020년 3월 31일 - 2020년 4월 11일"** 범위 밖으로 드래그하지 못하도록 하려면:

![custom_dnd](/img/custom_dnd.png)

다음 코드를 사용할 수 있습니다:

[Denying dragging tasks out of interval - [31.03.2020, 11.04.2020]](Denying dragging tasks out of interval - [31.03.2020, 11.04.2020])
~~~js
var leftLimit = new Date(2020, 2 ,31), rightLimit = new Date(2020, 3 ,12);

gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move || mode == modes.resize){
    
        var diff = original.duration*(1000*60*60*24);
       
        if(+task.end_date > +rightLimit){
            task.end_date = new Date(rightLimit);
            if(mode == modes.move)
                task.start_date = new Date(task.end_date - diff);
            }
        if(+task.start_date < +leftLimit){
            task.start_date = new Date(leftLimit);
            if(mode == modes.move)
                task.end_date = new Date(+task.start_date + diff);
        }
    }
});
~~~


[Drag parent task with its children](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)



## 부모 작업과 함께 자식 작업도 같이 드래그하기 {#draggingchildrentogetherwiththeparent}


부모 작업을 이동할 때 자식 작업도 함께 이동하도록 하려면 [onTaskDrag](api/event/ontaskdrag.md) 이벤트를 사용하세요. (이 이벤트에 대한 자세한 내용은 [위](guides/dnd.md#preventingdraggingtasksoutsidecertaindates)에서 확인할 수 있습니다):

~~~js
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move){
        var diff = task.start_date - original.start_date;
        gantt.eachTask(function(child){
            child.start_date = new Date(+child.start_date + diff);
            child.end_date = new Date(+child.end_date + diff);
            gantt.refreshTask(child.id, true);
        },id );
    }
});
// 자식 작업의 위치를 현재 스케일에 맞게 반올림
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
        var state = gantt.getState();
        gantt.eachTask(function(child){          
            child.start_date = gantt.roundDate({
                date:child.start_date, 
                unit:state.scale_unit, 
                step:state.scale_step
              });            
              child.end_date = gantt.calculateEndDate(child.start_date, 
                child.duration, gantt.config.duration_unit);
              gantt.updateTask(child.id);
        },id );
    }
});
~~~

## 프로젝트와 하위 작업을 함께 드래그하기 {#draggingprojectswithsubtasks}


:::info
이 기능은 Gantt PRO 에디션에서만 제공됩니다.
:::

기본적으로 [프로젝트 타입](api/config/types.md)으로 표시된 작업은 드래그할 수 없습니다.
프로젝트 드래그를 활성화하려면 [drag_project](api/config/drag_project.md) 옵션을 설정하세요:

~~~js
gantt.config.drag_project = true;
~~~


[Draggable projects](https://docs.dhtmlx.com/gantt/samples/08_api/19_draggable_projects.html)


## 종속 작업을 독립 작업과 함께 드래그하기 {#draggingdependenttaskstogetherwithindependenttasks}


종속된 작업과 함께 작업을 이동하는 방법에는 여러 가지가 있습니다.
자세한 내용은 별도의 문서에서 확인할 수 있습니다: [종속 작업과 함께 작업 드래그하기](guides/dragging-dependent-tasks.md).


## 최소 작업 기간 설정하기 {#settingminimaltaskduration}


[min_duration](api/config/min_duration.md) 설정을 사용해 최소 작업 기간을 지정할 수 있습니다.

이 옵션은 리사이즈 시 허용되는 가장 작은 작업 크기를 지정하며, 작업의 기간이 0이 되는 것을 방지합니다.

값은 밀리초 단위로 지정합니다:
~~~js
// 1일
gantt.config.min_duration = 24*60*60*1000;

//또는

// 1시간
gantt.config.min_duration = 60*60*1000;
~~~

## 작업 드래그 시 자동 스크롤 {#autoscrollduringtasksdragging}


대형 Gantt 차트에서 작업을 멀리 드래그하거나, 멀리 떨어진 작업 사이에 링크를 생성하는 것은 어려울 수 있습니다.

**자동 스크롤(autoscroll)** 기능은 드래그 중 차트를 자동으로 스크롤하여 이러한 작업을 쉽게 도와줍니다. 기본적으로 활성화되어 있으며, [autoscroll](api/config/autoscroll.md) 옵션으로 제어할 수 있습니다.

~~~js
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

또한 [autoscroll_speed](api/config/autoscroll_speed.md) 속성으로 자동 스크롤 속도를 밀리초 단위로 조정할 수 있습니다:

~~~js
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;
 
gantt.init("gantt_here");
~~~

## 특정 작업의 리사이즈 비활성화 {#disablingresizeofspecifictasks}


특정 작업의 리사이즈를 막으려면 다음 두 가지 방법이 있습니다:

1. CSS를 사용해 UI에서 리사이즈 핸들을 숨기기  
**task_class** 템플릿을 사용해 특정 작업에 커스텀 CSS 클래스를 추가하세요:

~~~js
gantt.templates.task_class = function(start, end, task){
    if(task.no_resize) { // no_resize는 데모용 커스텀 속성입니다
        return "no_resize";
    }
    return "";
~~~

이후, 아래 CSS로 리사이즈 핸들을 숨길 수 있습니다:

~~~css
.no_resize .gantt_task_drag{
   display: none !important;
}
~~~

2. [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 이벤트를 사용해 프로그래밍적으로 리사이즈 차단  
핸들러에서 *false*를 반환하면 리사이즈가 차단됩니다:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize" && gantt.getTask(id).no_resize){
        return false;
    }
    return true;
});
~~~

## 작업의 어느 쪽이 리사이즈되는지 확인하기 {#whichsideofataskisbeingresized}


드래그 앤 드롭에서 "resize" 모드는 사용자가 작업의 시작일 또는 종료일을 변경하는 경우입니다.

어느 날짜가 변경되는지 확인하려면 **gantt.getState().drag_from_start** 플래그를 확인하세요:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize"){
        if(gantt.getState().drag_from_start === true) {
            // 시작일이 변경됨
        } else {
            // 종료일이 변경됨
        }
    }
    return true;
});
~~~

## 작업의 시작일 또는 종료일 리사이즈 비활성화 {#disablingresizeofthestartortheenddateofatask}


리사이즈 핸들은 다음 선택자를 통해 타겟팅할 수 있습니다:

- .gantt_task_drag[data-bind-property="start_date"]
- .gantt_task_drag[data-bind-property="end_date"]

시작일 리사이즈를 비활성화하려면 아래 CSS를 사용하세요:

~~~css
.gantt_task_drag[data-bind-property="start_date"]{
   display: none !important;
}
~~~

마찬가지로, 종료일 리사이즈를 비활성화하려면:

~~~css
.gantt_task_drag[data-bind-property="end_date"]{
   display: none !important;
}
~~~

또는 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 이벤트를 통해 리사이즈를 차단할 수도 있습니다.
핸들러에서 *false*를 반환하면 리사이즈가 차단됩니다:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize"){
        if(gantt.getState().drag_from_start === true) {
             return false;
        } else {
             // 종료일 리사이즈는 허용
        }
    }
    return true;
});
~~~

