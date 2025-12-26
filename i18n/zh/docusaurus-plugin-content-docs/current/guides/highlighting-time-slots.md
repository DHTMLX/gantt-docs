---
title: "高亮显示时间段"
sidebar_label: "高亮显示时间段"
---

# 高亮显示时间段

为了突出显示特定的时间段，您可以对其进行高亮处理。

- 若要高亮显示时间线区域内的单元格，请使用 [timeline_cell_class](api/template/timeline_cell_class.md) 模板。
- 若要高亮显示时间线时间刻度上的单元格，请使用 [scale_cell_class](api/template/scale_cell_class.md) 模板。

这些模板是函数，会遍历所有日期，并为相应的单元格分配指定的 CSS 类。

![highlighting_weekends](/img/highlighting_weekends.png)

例如，高亮显示周末可以帮助将刻度在视觉上分隔为一周一组:

~~~js
<style>
.weekend{ background: #f4f7f4 !important;}
</style>
~~~


~~~js
gantt.templates.scale_cell_class = function(date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
gantt.templates.timeline_cell_class = function(task,date){
    if(date.getDay()==0||date.getDay()==6){ 
        return "weekend" ;
    }
};
gantt.init("gantt_here");
~~~

在使用 [工作时间计算](guides/working-time.md) 时，建议使用 [isWorkTime](api/method/isworktime.md)，而不是直接写死具体的值:

~~~js
gantt.config.work_time = true;

gantt.templates.scale_cell_class = function(date){
    if(!gantt.isWorkTime(date)){
        return "weekend";
    }
};
gantt.templates.timeline_cell_class = function(task,date){
    if(!gantt.isWorkTime({task:task, date:date})){
        return "weekend" ;
    }
};
gantt.init("gantt_here");
~~~


[Highlighting weekends](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)


:::note
包含 'important' 关键字可以确保 CSS 属性按预期应用到单元格上。
:::

