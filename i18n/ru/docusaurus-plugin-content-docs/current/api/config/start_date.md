---
sidebar_label: start_date
title: start_date config
description: "определяет, с какого момента начинается временная шкала"
---

# start_date

### Description

@short: Определяет, с какого момента начинается временная шкала

@signature: start_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);
 
gantt.init("gantt_here");
~~~

### Details

:::note
note Чтобы правильно использовать опцию **start_date**, её следует использовать вместе с опцией [end_date](api/config/end_date.md). 
:::

- Когда установлены обе опции - **start_date** и **end_date**, задачи, выходящие за этот диапазон, не отображаются на диаграмме.
- Вы можете использовать необязательные параметры метода [init](api/method/init.md) в качестве начальных значений для [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md).
- Обратите внимание, что [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md) имеют приоритет над [fit_tasks](api/config/fit_tasks.md). Если вы планируете использовать их вместе, вам нужно будет [управлять временной шкалой программно](guides/configuring-time-scale.md#range).

Вот как можно динамически расширять временной диапазон:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 var taskStart = task.start_date;
 var taskEnd = task.end_date;
 var scaleStart = gantt.config.start_date;
 var scaleEnd = gantt.config.end_date;

 // если задача выходит за текущий диапазон
 if(scaleStart > taskEnd || scaleEnd < taskStart ){
  // обновляем границы временной шкалы
  gantt.config.end_date=new Date(Math.max(taskEnd.valueOf(), scaleEnd.valueOf()));
  gantt.config.start_date=new Date(Math.min(taskStart.valueOf(),scaleStart.valueOf()));
  gantt.render();
 }    
 return true;
});
~~~

Альтернативно, можно добавить в lightbox валидацию, чтобы запретить задачи вне диапазона:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
     var taskStart = task.start_date;
     var taskEnd = task.end_date;
     var scaleStart = gantt.config.start_date;
     var scaleEnd = gantt.config.end_date;

    // проверяем, выходит ли задача за допустимый диапазон
    if(scaleStart > taskEnd || scaleEnd < taskStart ){
        gantt.message({
            type:"warning", 
            text:"Внимание! Задача находится вне допустимого диапазона дат!",
            expire:5000
        });
          return false;
    } 
    return true;
});
~~~

### Related API
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)
- [init](api/method/init.md)
- [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md)

### Related Guides
- [Настройка шкалы](guides/configuring-time-scale.md#settingtheminmasvaluesofthescale)

