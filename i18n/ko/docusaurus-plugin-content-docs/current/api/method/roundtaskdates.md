---
sidebar_label: roundTaskDates
title: roundTaskDates method
description: "작업의 시작일과 종료일을 타임라인 스케일의 가장 가까운 날짜에 맞춰 조정합니다."
---

# roundTaskDates

### Description

@short: 작업의 시작일과 종료일을 타임라인 스케일의 가장 가까운 날짜에 맞춰 조정합니다.

@signature: roundTaskDates: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - 작업 객체

### Example

~~~jsx
//부모 작업과 함께 자식 작업을 드래그할 때
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

//자식 항목의 위치를 스케일에 맞춰 반올림
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

- 이 메서드는 구성된 근무 시간 설정을 준수합니다.
- 조정 과정에서 작업 기간이 변경될 수 있습니다.
- onbeforedragend 이벤트 내에서 사용될 경우, 드래그 앤 드롭 동작에 따라 반올림 동작이 달라집니다. 예를 들어, "move" 동작은 작업 기간을 변경하지 않고 작업 날짜만 조정하며, "resize" 동작은 크기 조절 방향에 따라 기간과 시작일 또는 종료일을 모두 변경합니다.
