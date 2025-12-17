---
sidebar_label: updateTask
title: updateTask method
description: "aktualisiert die angegebene Aufgabe"
---

# updateTask

### Description

@short: Aktualisiert die angegebene Aufgabe

@signature: updateTask: (id: string | number, newState?: Task) =\> void

### Parameters

- `id` - (required) *string | number* - die Aufgaben-ID
- `newState` - (required) *Task* - die neuen Werte der Aufgabe

### Example

~~~jsx
var taskId = gantt.addTask({
    id:10,
    text:"Task #10",
    start_date:"02-04-2013",
    duration:8,
    parent:1
});

gantt.getTask(taskId).text = "Task #13"; //ändert die Daten der Aufgabe
gantt.updateTask(taskId); //wendet die Änderungen an und aktualisiert die Aufgabe
~~~

### Details

:::note
 Die Methode löst das Event [onAfterTaskUpdate](api/event/onaftertaskupdate.md) aus. 
:::
:::note
 Wenn dataProcessor aktiviert ist, wird diese Methode diesen ebenfalls aktivieren. 
:::

Diese Methode sollte aufgerufen werden, nachdem Änderungen am Aufgabenobjekt vorgenommen wurden. Sie aktualisiert den internen Zustand des Gantt, aktualisiert die relevanten UI-Teile und sendet die aktualisierten Informationen an das Backend.

Beim Aufruf wird das Event [onAfterTaskUpdate](api/event/onaftertaskupdate.md) ausgelöst, das weitere Neuberechnungen initiieren kann.

Wenn Sie mit dem [DataProcessor](guides/server-side.md) arbeiten, sendet der Aufruf dieser Methode eine **update**-Anfrage an den Server.

Für visuelle Aktualisierungen, die nicht gespeichert werden müssen, **verwenden Sie stattdessen die Methode [refreshTask](api/method/refreshtask.md)**. Diese aktualisiert das Aussehen der Aufgabe, ohne zusätzliche Berechnungen auszulösen.

~~~js
gantt.templates.task_class = function(start, end, task){
    if(task.$active) {
        return "active_task";
    }
};

gantt.attachEvent("onTaskClick", function(id,e){
    gantt.getTask(id).$active = true;
    gantt.refreshTask(id); /*!*/
});
~~~


Alternativ können Sie eine Aufgabe aktualisieren, indem Sie ein neues Aufgabenobjekt als zweiten Parameter an die **updateTask**-Methode übergeben:

~~~js
var task = {
    id: 2, text: 'Neuer Aufgabentext', 
    start_date: new Date(2025,03,02), 
    end_date: new Date(2025,03,04), 
    $source: [1], 
    $target: [2]
}
gantt.updateTask(2,task);
~~~

:::note
Sample: [Updating task](https://snippet.dhtmlx.com/fnfpoiik) 
:::

### Related API
- [updateLink](api/method/updatelink.md)
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- ["Serverseitige Integration"](guides/server-side.md#updatingdataontheserver)

