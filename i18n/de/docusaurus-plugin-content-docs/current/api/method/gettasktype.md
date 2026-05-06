---
sidebar_label: getTaskType
title: getTaskType method
description: "Gibt den Typ einer Aufgabe zurück"
---

# getTaskType

### Description

@short: Gibt den Typ einer Aufgabe zurück

@signature: getTaskType: (task: Task) =\> string

### Parameters

- `task` - (erforderlich) *Task* - das Task-Objekt

### Returns
- ` type` - (string) - der Typ der Aufgabe

### Example

~~~jsx
var type = gantt.getTaskType(gantt.getTask(12));
~~~

### Details

- Wenn **task.type** property definiert ist und nicht leer ist, wird der Wert dieser Eigenschaft zurückgegeben.
- Andernfalls wird der Wert von **gantt.config.types.task** stattdessen zurückgegeben.

Da die **task.type** Eigenschaft optional ist, müssen Sie berücksichtigen, dass sie beim Prüfen des Typs der Aufgabe im Code leer sein kann, z. B.

~~~js
// SCHLECHT:
if (task.type === gantt.config.types.task){
    // Code spezifisch für Aufgaben-Items
}
~~~

- Items, die nicht die **type**-Eigenschaft besitzen, erfüllen diese Bedingung nicht. Dies wäre falsch, denn solche Items haben standardmäßig den *task* Typ.

Stattdessen können Sie entweder eine Bedingung für leere Werte hinzufügen:

~~~js
// GUT:
if (!task.type || task.type === gantt.config.types.task){
    // Code spezifisch für Aufgaben-Items
}
~~~

Oder verwenden Sie die **getTaskType**-Methode: 

~~~js
// NOCH BESSER:
if (gantt.getTaskType(task) === gantt.config.types.task){
    // Code spezifisch für Aufgaben-Items
}
~~~

Der Code funktioniert für alle Items, die explizit einen Typ haben, sowie für Items, denen durch die interne Logik von Gantt ein Standard-Typ zugewiesen wird.

Die folgende Methode kann als sichere Methode zum Ermitteln von Task-Typen verwendet werden, um dieselben Bedingungen für alle Typen von Items zu schreiben und potenzielle Fehler bei einer inkorrekten Typ-Erkennung zu vermeiden:

~~~js
switch (gantt.getTaskType(task)){
    case gantt.config.task:
        break;
    case gantt.config.project:
        break;
    case gantt.config.milestone:
        break;
}
~~~

### Related Guides
- [Aufgabentypen](guides/task-types.md)