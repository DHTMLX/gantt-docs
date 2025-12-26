---
sidebar_label: getTask
title: getTask method
description: "gibt das Task-Objekt zurück"
---

# getTask

### Description

@short: Gibt das Task-Objekt zurück

@signature: getTask: (id: string | number) =\> Task

### Parameters

- `id` - (required) *string | number* -     die Task-ID

### Returns
- ` obj` - (Task) - das Task-Objekt

### Example

~~~jsx
gantt.addTask({
    id:7,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "pr_2");

gantt.getTask(7);
//->{id:7, text:"Task #5", start_date:"02-09-2013", duration:28, 
//   parent:"pr_2", $source:[1,5], $target:[8,13], ...}
~~~

### Details

Wenn Sie **getTask()** aufrufen, gibt es das Task-Objekt zurück, das zwei nützliche Eigenschaften enthält, die Ihnen helfen, Links zu identifizieren, die mit diesem Task verbunden sind:

- **$source** - dies sind Links, die vom Task ausgehen.
- **$target** - dies sind Links, die auf den Task zeigen.

Diese Eigenschaften werden automatisch generiert und enthalten die IDs der Links, die vom Task ausgehen bzw. zu ihm führen.

~~~js
const taskObj = gantt.getTask("t1");
 
const sourceLinks = taskObj.$source;        //-> ["l1","l4"] - IDs der ausgehenden Links  
const targetLinks = taskObj.$target;       //-> ["l5","l8"] - IDs der eingehenden Links
~~~


## Fehler

Die Methode **getTask** setzt voraus, dass ein Task mit der angegebenen "id" bereits im Gantt-Diagramm geladen ist. Falls kein Task mit dieser "id" existiert, wird eine Fehlermeldung ausgegeben: "Task not found id = ID". 

~~~js
const task = gantt.getTask("fake-id");
...
~~~

![gettask_error](/img/gettask_error.png)

Um diesen Fehler zu vermeiden, empfiehlt es sich, zuerst mit der Methode [isTaskExists](api/method/istaskexists.md) zu prüfen, ob der Task existiert:

~~~js
if(gantt.isTaskExists("fake-id")){
   const task = gantt.getTask("fake-id");
   ...
}
~~~

Alternativ können Sie [diese Fehlermeldungen vor dem Deployment Ihrer App deaktivieren](faq.md#anerroralertappearsintherighttopcorner) durch Setzen der Konfigurationsoption [show_errors](api/config/show_errors.md):

~~~js
gantt.config.show_errors = false;
~~~

### Related API
- [getTaskByTime](api/method/gettaskbytime.md)
- [getTaskNode](api/method/gettasknode.md)
- [isTaskExists](api/method/istaskexists.md)

### Related Guides
- ["Task-Objekt/Id"](guides/task-object-operations.md)
- ["Abrufen des Link-Objekts/der Link-ID"](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask)

