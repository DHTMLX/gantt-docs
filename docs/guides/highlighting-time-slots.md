---
title: "Highlighting Time Slots"
sidebar_label: "Highlighting Time Slots"
---

# Highlighting Time Slots


To pay user's attention to specific time slot(s), you may highlight them. 

- To highlight a cell of the timeline area, use the [timeline_cell_class](api/template/timeline_cell_class.md) template.
- To highlight a cell of the timeline's time scale, use the [scale_cell_class](api/template/scale_cell_class.md) template.

The template is a function that goes over all the dates and applies the specified CSS class to the related cells.

![highlighting_weekends](/img/highlighting_weekends.png)

For example, you can highlight weekends to visually divide the scale into weeks:

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

Note that while using [work time calculations](guides/working-time.md), you can use [isWorkTime](api/method/isworktime.md) instead of hardcoded values:

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
Use the 'important' keyword to guarantee that the specified CSS property will be applied to the cell.
:::

