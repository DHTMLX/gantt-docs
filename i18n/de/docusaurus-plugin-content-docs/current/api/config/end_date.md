---
sidebar_label: end_date
title: end_date config
description: "definiert den Endpunkt der Zeitskala"
---

# end_date

### Description

@short: Definiert den Endpunkt der Zeitskala

@signature: end_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);
 
gantt.init("gantt_here");
~~~

### Details

:::note
 Die **end_date** Option sollte zusammen mit der [start_date](api/config/start_date.md) Option verwendet werden, damit sie wirksam wird. 
:::

- Wenn sowohl **start_date** als auch **end_date** gesetzt sind, erscheinen Aufgaben, die außerhalb dieses Bereichs liegen, nicht im Chart.
- Anfangswerte für [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) können über optionale Parameter der [init](api/method/init.md) Methode bereitgestellt werden.
- Die Einstellungen in [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) haben Vorrang vor [fit_tasks](api/config/fit_tasks.md). Um diese Konfigurationen zu kombinieren, müssen Sie die Zeitskala [programmgesteuert steuern](guides/configuring-time-scale.md#range).

Hier ist ein Beispiel, wie man den Zeitbereich dynamisch erweitern kann:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 const taskStart = task.start_date;
 const taskEnd = task.end_date;
 const scaleStart = gantt.config.start_date;
 const scaleEnd = gantt.config.end_date;

 // wenn die Aufgabe außerhalb des aktuellen Bereichs liegt
 if(scaleStart > taskEnd || scaleEnd < taskStart ){
  // passe die Grenzen der Zeitskala an
  gantt.config.end_date=new Date(Math.max(taskEnd.valueOf(), scaleEnd.valueOf()));
  gantt.config.start_date=new Date(Math.min(taskStart.valueOf(),scaleStart.valueOf()));
  gantt.render();
 }    
 return true;
});
~~~

Alternativ können Sie eine Validierung hinzufügen, um das Speichern von Aufgaben außerhalb des Bereichs zu verhindern:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
  const taskStart = task.start_date;
  const taskEnd = task.end_date;
  const scaleStart = gantt.config.start_date;
  const scaleEnd = gantt.config.end_date;

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
- [start_date](api/config/start_date.md)
- [fit_tasks](api/config/fit_tasks.md)
- [init](api/method/init.md)
- [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md)

### Related Guides
- ["Einrichten der Skala"](guides/configuring-time-scale.md#settingtheminmasvaluesofthescale)

