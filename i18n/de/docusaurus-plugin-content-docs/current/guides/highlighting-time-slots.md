---
title: "Hervorheben von Zeitfenstern"
sidebar_label: "Hervorheben von Zeitfenstern"
---

# Hervorheben von Zeitfenstern

Um bestimmte Zeitfenster hervorzuheben, können Sie diese markieren.

- Um eine Zelle im Bereich der Zeitleiste hervorzuheben, verwenden Sie die [timeline_cell_class](api/template/timeline_cell_class.md)-Vorlage.
- Um eine Zelle in der Zeitskala der Zeitleiste hervorzuheben, verwenden Sie die [scale_cell_class](api/template/scale_cell_class.md)-Vorlage.

Diese Vorlagen sind Funktionen, die alle Daten durchlaufen und der entsprechenden Zelle die angegebene CSS-Klasse zuweisen.

![highlighting_weekends](/img/highlighting_weekends.png)

Zum Beispiel kann das Hervorheben von Wochenenden helfen, die Skala visuell in Wochen zu unterteilen:

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

Wenn Sie [Arbeitszeitberechnungen](guides/working-time.md) verwenden, empfiehlt es sich, [isWorkTime](api/method/isworktime.md) zu nutzen, statt Werte fest zu kodieren:

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
Die Verwendung des 'important'-Schlüsselworts stellt sicher, dass die CSS-Eigenschaft wie vorgesehen auf die Zelle angewendet wird.
:::

