---
sidebar_label: end_date
title: end_date config
description: "устанавливает конечное значение шкалы времени"
---

# end_date

### Description

@short: Устанавливает конечное значение шкалы времени

@signature: end_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);
 
gantt.init("gantt_here");
~~~

### Details

:::note
Чтобы применить опцию **end_date**, необходимо использовать её в паре с опцией [start_date](api/config/start_date.md).
:::

- Если заданы оба параметра **start_date** и **end_date**, и вы создаёте задачу, выходящую за пределы диапазона, задача не будет отображаться на графике.
- Необязательные параметры метода [init](api/method/init.md) можно использовать в качестве начальных значений конфигураций [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md).
- [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md) перезаписывают [fit_tasks](api/config/fit_tasks.md). Если вы хотите использовать эти настройки вместе, вам потребуется [управлять шкалой времени из кода](guides/configuring-time-scale.md#range).

В этом случае можно расширить диапазон:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 const taskStart = task.start_date;
 const taskEnd = task.end_date;
 const scaleStart = gantt.config.start_date;
 const scaleEnd = gantt.config.end_date;

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
- [start_date](api/config/start_date.md)
- [fit_tasks](api/config/fit_tasks.md)
- [init](api/method/init.md)
- [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md)

### Related Guides
- [Setting up Scale](guides/configuring-time-scale.md)