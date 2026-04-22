---
sidebar_label: end_date
title: end_date 配置
description: "设置时间刻度的结束值"
---

# end_date

### Description

@short: 设置时间刻度的结束值

@signature: end_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);
 
gantt.init("gantt_here");
~~~

### Details

:::note
 **end_date** 选项应与 [start_date](api/config/start_date.md) 选项一起使用才能生效。 
:::

- 当同时指定了 **start_date** 与 **end_date** 选项，且你创建的任务超出时间范围时，该任务将不会在图表中显示。
- [init](api/method/init.md) 方法的可选参数可用作 [start_date](api/config/start_date.md) 与 [end_date](api/config/end_date.md) 配置的初始值。
- [start_date](api/config/start_date.md) 与 [end_date](api/config/end_date.md) 会覆盖 [fit_tasks](api/config/fit_tasks.md)。如果要将这些设置一起使用，您需要 [从代码中管理时间刻度](guides/configuring-time-scale.md#range)。

在这种情况下，我们可以扩展时间范围：

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 const taskStart = task.start_date;
 const taskEnd = task.end_date;
 const scaleStart = gantt.config.start_date;
 const scaleEnd = gantt.config.end_date;

 // 如果任务超出当前范围
 if(scaleStart > taskEnd || scaleEnd < taskStart ){
  // 调整时间刻度边界
  gantt.config.end_date=new Date(Math.max(taskEnd.valueOf(), scaleEnd.valueOf()));
  gantt.config.start_date=new Date(Math.min(taskStart.valueOf(),scaleStart.valueOf()));
  gantt.render();
 }    
 return true;
});
~~~

或者，您也可以添加校验以防止保存超出范围的任务:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
  const taskStart = task.start_date;
  const taskEnd = task.end_date;
  const scaleStart = gantt.config.start_date;
  const scaleEnd = gantt.config.end_date;

  // 验证任务是否超出允许范围
  if(scaleStart > taskEnd || scaleEnd < taskStart ){
    gantt.message({
      type:"warning", 
      text:"警告！任务超出日期范围！",
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