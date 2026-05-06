---
sidebar_label: end_date
title: end_date Konfiguration
description: "Legt den Endwert der Zeitachse fest"
---

# end_date

### Description

@short: Legt den Endwert der Zeitachse fest

@signature: end_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);

gantt.init("gantt_here");
~~~

### Details

:::note
Um die **end_date**-Option anzuwenden, müssen Sie sie zusammen mit der [start_date](api/config/start_date.md) Option verwenden.
:::

- Wenn sowohl die Optionen **start_date** und **end_date** angegeben sind und Sie eine Aufgabe erstellen, die außerhalb des Bereichs liegt, wird die Aufgabe im Diagramm nicht angezeigt.
- Optionale Parameter der Methode [init](api/method/init.md) können als Anfangswerte der Konfigurationen [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) verwendet werden.
- [start_date](api/config/start_date.md) und [end_date](api/config/end_date.md) überschreiben [fit_tasks](api/config/fit_tasks.md). Wenn Sie diese Einstellungen gemeinsam verwenden möchten, müssen Sie [die Zeitachse aus dem Code verwalten](guides/configuring-time-scale.md#range).

In diesem Fall können wir den Bereich erweitern:

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
- [Skala konfigurieren](guides/configuring-time-scale.md)