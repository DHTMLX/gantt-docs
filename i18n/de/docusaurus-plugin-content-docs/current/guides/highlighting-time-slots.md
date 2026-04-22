---
title: "Zeitfenster hervorheben"
sidebar_label: "Zeitfenster hervorheben"
---

# Zeitfenster hervorheben

Um die Aufmerksamkeit des Benutzers auf bestimmte Zeitfenster zu lenken, können Sie sie hervorheben.

- Um eine Zelle des Timeline-Bereichs hervorzuheben, verwenden Sie die Vorlage [timeline_cell_class](api/template/timeline_cell_class.md).
- Um eine Zelle der Timeline-Zeitskala hervorzuheben, verwenden Sie die Vorlage [scale_cell_class](api/template/scale_cell_class.md).

Die Vorlage ist eine Funktion, die alle Datumswerte durchläuft und die angegebene CSS-Klasse auf die entsprechenden Zellen anwendet.

![highlighting_weekends](/img/highlighting_weekends.png)

Beispielsweise können Sie Wochenenden hervorheben, um die Skala visuell in Wochen zu unterteilen:

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


Beachten Sie, dass, während Sie [Berechnungen der Arbeitszeit](guides/working-time.md) verwenden, Sie statt harter Werte auch [isWorkTime](api/method/isworktime.md) verwenden können:

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
Verwenden Sie das Stichwort 'important', um sicherzustellen, dass die angegebene CSS-Eigenschaft auf die Zelle angewendet wird.
:::