---
sidebar_label: start_date
title: start_date config
description: "设置时间刻度的起始值"
---

# start_date

### Description

@short: 设置时间刻度的起始值

@signature: start_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);
 
gantt.init("gantt_here");
~~~

### Details

:::note
 要正确使用 **start_date** 选项，应与 [end_date](api/config/end_date.md) 选项配合使用。 
:::

- 如果同时指定 **start_date** 和 **end_date** 选项，并且你创建一个超出范围的任务，该任务将从图表中消失。
- [init](api/method/init.md) 方法的可选参数可用作 [start_date](api/config/start_date.md) 与 [end_date](api/config/end_date.md) 的初始值。
- [start_date](api/config/start_date.md) 与 [end_date](api/config/end_date.md) 会覆盖 [fit_tasks](api/config/fit_tasks.md)。如果你想一起使用这些设置，你需要 [从代码中管理时间刻度](guides/configuring-time-scale.md#range)。

在这种情况下，我们可以扩展范围：

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 var taskStart = task.start_date;
 var taskEnd = task.end_date;
 var scaleStart = gantt.config.start_date;
 var scaleEnd = gantt.config.end_date;

 // 如果任务超出当前范围
 if(scaleStart > taskEnd || scaleEnd < taskStart ){
  // 更新时间刻度边界
  gantt.config.end_date=new Date(Math.max(taskEnd.valueOf(), scaleEnd.valueOf()));
  gantt.config.start_date=new Date(Math.min(taskStart.valueOf(),scaleStart.valueOf()));
  gantt.render();
 }    
 return true;
});
~~~

或者，你也可以在 lightbox 中添加校验，阻止范围外的任务:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
     var taskStart = task.start_date;
     var taskEnd = task.end_date;
     var scaleStart = gantt.config.start_date;
     var scaleEnd = gantt.config.end_date;

    // 验证任务是否超出允许的范围
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
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)
- [init](api/method/init.md)
- [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md)

### Related Guides
- [Setting up Scale](guides/configuring-time-scale.md)