---
sidebar_label: start_date
title: start_date Konfiguration
description: "Legt den Startwert der Zeitachse fest"
---

# start_date

### Description

@short: Legt den Startwert der Zeitachse fest

@signature: start_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);
 
gantt.init("gantt_here");
~~~

### Details

:::note
Um die Option **start_date** anzuwenden, müssen Sie sie zusammen mit der [end_date](api/config/end_date.md) verwenden.
:::

- Wenn sowohl die Optionen **start_date** und **end_date** angegeben sind und Sie eine Aufgabe erstellen, die außerhalb des Bereichs liegt, verschwindet die Aufgabe aus dem Diagramm.
- Optionale Parameter der Methode [init](api/method/init.md) können als Startwerte von [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) verwendet werden.
- [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) überschreiben [fit_tasks](api/config/fit_tasks.md). Wenn Sie diese Einstellungen gemeinsam verwenden möchten, müssen Sie die Zeitachse vom Code aus verwalten (guides/configuring-time-scale.md#range).

In diesem Fall können wir den Bereich erweitern:

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
- [Skala einrichten](guides/configuring-time-scale.md)