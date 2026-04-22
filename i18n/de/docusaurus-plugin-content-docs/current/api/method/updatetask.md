---
sidebar_label: updateTask
title: updateTask-Methode
description: "aktualisiert die angegebene Aufgabe"
---

# updateTask

### Description

@short: Aktualisiert die angegebene Aufgabe

@signature: updateTask: (id: string | number, newState?: Task) =\> void

### Parameters

- `id` - (required) *string | number* - die Aufgaben-ID
- `newState` - (optional) *Task* - die neuen Werte der Aufgabe

### Example

~~~jsx
const taskId = gantt.addTask({
    id: 10,
    text: "Task #10",
    start_date: "2027-04-02",
    duration: 8,
    parent: 1
});

gantt.getTask(taskId).text = "Task #13"; // changes task data
gantt.updateTask(taskId); // renders the updated task
~~~

### Details

:::note
Die Methode löst das [`onAfterTaskUpdate`](api/event/onaftertaskupdate.md) Event aus.
:::

:::note
Die Methode löst den [DataProcessor](api/method/dataprocessor.md) aus, wenn der DataProcessor aktiviert ist.
:::

Diese Methode sollte aufgerufen werden, nachdem das Task-Objekt geändert wurde, um den Zustand des Gantt zu aktualisieren, relevante UI-Elemente neu zu zeichnen und die Änderungen an das Backend zu senden.

Wenn Sie diese Methode aufrufen, wird das [`onAfterTaskUpdate`](api/event/onaftertaskupdate.md) Event ausgelöst, was zusätzliche Neuberechnungen nach sich ziehen kann.

Wenn Sie den [DataProcessor](api/method/dataprocessor.md) verwenden, löst der Aufruf dieser Methode eine **Update**-Anfrage an den Server aus.

Für visuelle Änderungen, die kein Speichern erfordern, verwenden Sie stattdessen die Methode [`refreshTask()`](api/method/refreshtask.md). Dadurch wird die Aufgabe neu gezeichnet, ohne zusätzliche Berechnungen auszulösen.

~~~js {5}
gantt.templates.task_class = (startDate, endDate, task) => task.$active ? "active_task" : "";

gantt.attachEvent("onTaskClick", (taskId, event) => {
    gantt.getTask(taskId).$active = true;
    gantt.refreshTask(taskId);
});
~~~

Sie können auch die vorhandene Aufgabe durch Festlegen eines neuen Task-Objekts als zweiten Parameter der `updateTask()`-Methode ersetzen:

~~~js
const updatedTask = {
    id: 2,
    text: 'New task text',
    start_date: new Date(2025, 3, 2),
    end_date: new Date(2025, 3, 4),
    $source: [1],
    $target: [2]
};

gantt.updateTask(2, updatedTask);
~~~

:::note
Beispiel: [Aktualisieren der Aufgabe](https://snippet.dhtmlx.com/fnfpoiik)
:::

### Related API
- [updateLink](api/method/updatelink.md)
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [Serverseitige Integration](guides/server-side.md)