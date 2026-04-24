---
sidebar_label: roundTaskDates
title: roundTaskDates 메서드
description: "시작 및 종료 작업의 날짜를 타임스케일에서 가장 가까운 날짜로 반올림합니다"
---

# roundTaskDates

### Description

@short: 시작 및 종료 작업의 날짜를 타임스케일에서 가장 가까운 날짜로 반올림합니다

@signature: roundTaskDates: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - 작업 객체

### Example

~~~jsx
//부모와 함께 자식들을 드래그
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
    return true;
});

//자식 아이템의 위치를 타임스케일에 맞춰 반올림
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
     var modes = gantt.config.drag_mode;
     if(mode == modes.move ){
         gantt.eachTask(function(child){
            gantt.roundTaskDates(child);  /*!*/
            gantt.refreshTask(child.id, true);
         },id );
     }
});
~~~

### Details

- 메서드는 지정된 작업 시간을 고려합니다.
- 메서드는 작업의 지속 시간을 변경할 수 있습니다.
- 이 메서드가 onbeforedragend에서 호출되면 날짜는 드래그-앤-드롭 작업의 유형을 고려하여 반올림됩니다(예: "move" 연산은 지속 시간에 영향을 주지 않고 작업의 날짜를 변경하고, 'resize' 연산은 작업의 지속 시간을 변경하며, 크기 조정 방향에 따라 시작 날짜나 종료 날짜 중 하나를 변경합니다).