---
sidebar_label: end_date
title: end_date config
description: "определяет конечную точку временной шкалы"
---

# end_date

### Description

@short: Определяет конечную точку временной шкалы

@signature: end_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);

gantt.init("gantt_here");
~~~

### Details

:::note
 Опция **end_date** должна использоваться вместе с опцией [start_date](api/config/start_date.md) для вступления в силу. 
:::

- Когда заданы обе опции **start_date** и **end_date**, задачи, выходящие за пределы этого диапазона, не будут отображаться на диаграмме.
- Начальные значения для [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md) можно передать через необязательные параметры метода [init](api/method/init.md).
- Настройки в [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md) имеют приоритет над [fit_tasks](api/config/fit_tasks.md). Чтобы комбинировать эти конфигурации, необходимо [программно управлять временной шкалой](guides/configuring-time-scale.md#range).

Вот пример динамического расширения временного диапазона:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 const taskStart = task.start_date;
 const taskEnd = task.end_date;
 const scaleStart = gantt.config.start_date;
 const scaleEnd = gantt.config.end_date;

 // если задача выходит за текущий диапазон
 if(scaleStart > taskEnd || scaleEnd < taskStart ){
  // корректируем границы временной шкалы
  gantt.config.end_date=new Date(Math.max(taskEnd.valueOf(), scaleEnd.valueOf()));
  gantt.config.start_date=new Date(Math.min(taskStart.valueOf(),scaleStart.valueOf()));
  gantt.render();
 }    
 return true;
});
~~~

В качестве альтернативы, можно добавить проверку, чтобы запретить сохранение задач вне диапазона:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
  const taskStart = task.start_date;
  const taskEnd = task.end_date;
  const scaleStart = gantt.config.start_date;
  const scaleEnd = gantt.config.end_date;

  // проверяем, находится ли задача вне допустимого диапазона
  if(scaleStart > taskEnd || scaleEnd < taskStart ){
    gantt.message({
      type:"warning", 
      text:"Внимание! Задача находится вне диапазона дат!",
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
- [Настройка шкалы](guides/configuring-time-scale.md#settingtheminmasvaluesofthescale)

