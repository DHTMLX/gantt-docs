---
title: "Выделение временных слотов"
sidebar_label: "Выделение временных слотов"
---

# Выделение временных слотов


Чтобы привлечь внимание к определённым временным слотам, вы можете их выделить.

- Для выделения ячейки внутри области временной шкалы используйте шаблон [timeline_cell_class](api/template/timeline_cell_class.md).
- Для выделения ячейки в шкале времени используйте шаблон [scale_cell_class](api/template/scale_cell_class.md).

Эти шаблоны представляют собой функции, которые перебирают все даты и назначают указанную CSS-класс соответствующим ячейкам.

![highlighting_weekends](/img/highlighting_weekends.png)

Например, выделение выходных дней помогает визуально разделить шкалу на недели:

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

При использовании [расчёта рабочего времени](guides/working-time.md) рекомендуется применять [isWorkTime](api/method/isworktime.md) вместо жёстко заданных значений:

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
Использование ключевого слова 'important' гарантирует, что CSS-свойство будет применено к ячейке как задумано.
:::

