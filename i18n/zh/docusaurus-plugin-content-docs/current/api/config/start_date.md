---
sidebar_label: start_date
title: start_date config
description: "定义时间刻度的起始点"
---

# start_date

### Description

@short: 定义时间刻度的起始点

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

- 当同时设置了 **start_date** 和 **end_date** 时，位于该时间范围之外的任务将不会显示在图表上。
- 你可以使用 [init](api/method/init.md) 方法的可选参数作为 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 的初始值。
- 请注意，[start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 优先于 [fit_tasks](api/config/fit_tasks.md)。如果计划同时使用它们，需要[通过编程方式控制时间刻度](guides/configuring-time-scale.md#fanwei)。

下面示例展示了如何动态扩展时间范围:

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
- [设置时间刻度](guides/configuring-time-scale.md)

