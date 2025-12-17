---
sidebar_label: roundTaskDates
title: roundTaskDates method
description: "корректирует даты начала и окончания задачи, выравнивая их по ближайшим датам на шкале timeline"
---

# roundTaskDates

### Description

@short: Корректирует даты начала и окончания задачи, выравнивая их по ближайшим датам на шкале timeline

@signature: roundTaskDates: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - объект задачи

### Example

~~~jsx
//перетаскивание дочерних задач вместе с родительской
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

//округление позиций дочерних элементов по шкале
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

- Этот метод учитывает настройки рабочего времени.
- Может изменять длительность задачи в процессе корректировки.
- При использовании внутри события onbeforedragend поведение округления адаптируется в зависимости от действия drag-and-drop: например, при действии "move" даты задачи корректируются без изменения длительности, а при "resize" изменяются и длительность, и либо дата начала, либо дата окончания, в зависимости от направления изменения размера.
