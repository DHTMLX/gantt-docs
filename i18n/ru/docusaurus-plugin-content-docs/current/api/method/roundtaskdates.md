---
sidebar_label: roundTaskDates
title: метод roundTaskDates
description: "округляет даты начала и конца задачи до ближайших дат в шкале времени"
---

# roundTaskDates

### Description

@short: Округляет даты начала и конца задачи до ближайших дат в шкале времени

@signature: roundTaskDates: (task: Task) => void

### Parameters

- `task` - (обязательный) *Task* - объект задачи

### Example

~~~jsx
//dragging childs together with the parent
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

//rounds the positions of child items to the scale
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

- Метод учитывает заданное рабочее время.
- Метод может изменить продолжительность задачи.
- Если метод вызывается из onbeforedragend, даты будут округлены с учетом типа операции перетаскивания (например, 
операция "move" изменит даты задачи без влияния на продолжительность, операция 'resize' изменит продолжительность задачи и одну из дат задачи: начало или конец в зависимости от направления изменения размера)