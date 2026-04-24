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

- `id` - (erforderlich) *string | number* - die ID der Aufgabe

### Returns
- `obj` - (Task) - das Task-Objekt

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

Das von der **getTask()**-Methode zurückgegebene Task-Objekt enthält zwei wichtige Eigenschaften, die Sie verwenden können, um Verbindungen zur Aufgabe abzurufen:

- **$source** - ausgehende Links der Aufgabe
- **$target** - eingehende Links der Aufgabe

Die Eigenschaften werden automatisch generiert und speichern die IDs der eingehenden und ausgehenden Links.

~~~js
const taskObj = gantt.getTask("t1");
 
const sourceLinks = taskObj.$source;        //-> ["l1","l4"] - ids of coming-out links  
const targetLinks = taskObj.$target;       //-> ["l5","l8"] - ids of coming-into links
~~~

## Error

Die **getTask**-Methode erwartet, dass eine Aufgabe mit einer erforderlichen 'id' in Gantt geladen ist. Daher wird, falls keine Aufgabe mit dieser 'id' gefunden wird, die Methode eine Fehlermeldung erzeugen: "Aufgabe nicht gefunden id = ID". 

~~~js
const task = gantt.getTask("fake-id");
...
~~~

Wir empfehlen Ihnen, die Ursachen dieses Fehlers zu beheben, bevor Sie versuchen, das Task-Objekt abzurufen. Dazu müssen Sie prüfen, ob die Aufgabe existiert, über die [isTaskExists](api/method/istaskexists.md) Methode:

~~~js
if(gantt.isTaskExists("fake-id")){
   const task = gantt.getTask("fake-id");
   ...
}
~~~

Aber Sie können diese Meldungen auch deaktivieren, bevor Sie Ihre Anwendung an Endbenutzer freigeben, über die [show_errors](api/config/show_errors.md) Konfigurationsoption:

~~~js
gantt.config.show_errors = false;
~~~

### Related API
- [getTaskByTime](api/method/gettaskbytime.md)
- [getTaskNode](api/method/gettasknode.md)
- [isTaskExists](api/method/istaskexists.md)

### Related Guides
- [Task Object/Id](guides/task-object-operations.md)
- [Getting the Link Object/Id](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task)