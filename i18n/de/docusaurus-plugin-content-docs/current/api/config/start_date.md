---
sidebar_label: start_date
title: start_date config
description: "definiert, wo die Zeitskala beginnt"
---

# start_date

### Description

@short: Definiert, wo die Zeitskala beginnt

@signature: start_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);
 
gantt.init("gantt_here");
~~~

### Details

:::note
 Um die **start_date**-Option korrekt zu verwenden, sollte sie mit der [end_date](api/config/end_date.md)-Option kombiniert werden. 
:::

- Wenn sowohl **start_date** als auch **end_date** gesetzt sind, werden Aufgaben, die außerhalb dieses Bereichs liegen, im Diagramm nicht angezeigt.
- Sie können optionale Parameter der [init](api/method/init.md)-Methode als Anfangswerte für [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) verwenden.
- Beachten Sie, dass [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) Vorrang vor [fit_tasks](api/config/fit_tasks.md) haben. Wenn Sie diese zusammen verwenden möchten, müssen Sie die Zeitskala [programmgesteuert steuern](guides/configuring-time-scale.md#range).

So können Sie den Zeitbereich dynamisch erweitern:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 var taskStart = task.start_date;
 var taskEnd = task.end_date;
 var scaleStart = gantt.config.start_date;
 var scaleEnd = gantt.config.end_date;

 // wenn die Aufgabe außerhalb des aktuellen Bereichs liegt
 if(scaleStart > taskEnd || scaleEnd < taskStart ){
  // aktualisiere die Grenzen der Zeitskala
  gantt.config.end_date=new Date(Math.max(taskEnd.valueOf(), scaleEnd.valueOf()));
  gantt.config.start_date=new Date(Math.min(taskStart.valueOf(),scaleStart.valueOf()));
  gantt.render();
 }    
 return true;
});
~~~

Alternativ können Sie eine Validierung im Lightbox hinzufügen, um Aufgaben außerhalb des Bereichs zu verhindern:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
     var taskStart = task.start_date;
     var taskEnd = task.end_date;
     var scaleStart = gantt.config.start_date;
     var scaleEnd = gantt.config.end_date;

    // prüfen, ob die Aufgabe außerhalb des erlaubten Bereichs liegt
    if(scaleStart > taskEnd || scaleEnd < taskStart ){
        gantt.message({
            type:"warning", 
            text:"Warnung! Die Aufgabe liegt außerhalb des Datumsbereichs!",
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
- ["Einrichten der Skala"](guides/configuring-time-scale.md#settingtheminmasvaluesofthescale)

