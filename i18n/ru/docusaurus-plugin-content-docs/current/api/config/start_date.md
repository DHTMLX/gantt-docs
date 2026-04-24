---
sidebar_label: start_date
title: start_date конфигурация
description: "устанавливает начальное значение шкалы времени"
---

# start_date

### Description

@short: Устанавливает начальное значение шкалы времени

@signature: start_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);
 
gantt.init("gantt_here");
~~~

### Details

:::note
Чтобы применить опцию **start_date**, вы должны использовать её в паре с опцией [end_date](api/config/end_date.md).
:::

- Если обе опции **start_date** и **end_date** указаны и вы создаете задачу, выходящую за пределы диапазона, задача исчезнет с диаграммы.
- Необязательные параметры метода [init](api/method/init.md) можно использовать в качестве начальных значений [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md).
- [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md) перезаписывают [fit_tasks](api/config/fit_tasks.md). Если вы хотите использовать эти параметры вместе, вам нужно [управлять шкалой времени из кода](guides/configuring-time-scale.md#range).

В этом случае мы можем расширить диапазон:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 var taskStart = task.start_date;
 var taskEnd = task.end_date;
 var scaleStart = gantt.config.start_date;
 var scaleEnd = gantt.config.end_date;

 // if the task is out of the range
 if(scaleStart > taskEnd || scaleEnd  taskEnd || scaleEnd < taskStart ){
        gantt.message({
            type:"warning", 
            text:"Warning! The task is outside the date range!",
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
- [Настройка масштаба](guides/configuring-time-scale.md)