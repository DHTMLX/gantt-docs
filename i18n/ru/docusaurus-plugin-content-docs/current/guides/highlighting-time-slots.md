---
title: "Выделение временных слотов"
sidebar_label: "Выделение временных слотов"
---

# Подсветка временных интервалов

Чтобы привлечь внимание пользователя к конкретным временным интервалам, можно их подсветить.

- Чтобы подсветить ячейку области таймлайна, используйте шаблон [timeline_cell_class](api/template/timeline_cell_class.md).
- Чтобы подсветить ячейку масштаба времени на таймлайне, используйте шаблон [scale_cell_class](api/template/scale_cell_class.md).

Шаблон — это функция, которая перебирает все даты и применяет указанный CSS-класс к соответствующим ячейкам.

![highlighting_weekends](/img/highlighting_weekends.png)

Например, можно подсветить выходные, чтобы визуально разделить масштаб на недели:

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

Обратите внимание, что при использовании расчётов рабочего времени вы можете использовать [isWorkTime](api/method/isworktime.md) вместо жестко заданных значений:

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

[Подсветка выходных](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)


:::note
Используйте ключевое слово 'important', чтобы гарантировать, что указанное CSS-свойство будет применено к ячейке.
:::