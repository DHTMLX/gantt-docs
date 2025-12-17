---
sidebar_label: getTaskType
title: getTaskType method
description: "gibt den Typ einer Aufgabe zurück"
---

# getTaskType

### Description

@short: Gibt den Typ einer Aufgabe zurück

@signature: getTaskType: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - das Aufgabenobjekt

### Returns
- ` type` - (string) - der Typ der Aufgabe

### Example

~~~jsx
var type = gantt.getTaskType(gantt.getTask(12));
~~~

### Details

- Wenn die Eigenschaft **task.type** gesetzt und nicht leer ist, wird deren Wert zurückgegeben.
- Ist **task.type** nicht definiert oder leer, gibt die Methode stattdessen **gantt.config.types.task** zurück.

Da die Eigenschaft **task.type** optional ist, ist es wichtig, in Ihrem Code Fälle zu berücksichtigen, in denen sie leer sein könnte, wenn Sie den Typ einer Aufgabe prüfen, zum Beispiel:

~~~js
// SCHLECHT:
if (task.type === gantt.config.types.task){
    // Code spezifisch für Aufgaben-Items
}
~~~

- Aufgaben ohne die Eigenschaft **type** erfüllen diese Bedingung nicht, was falsch ist, da diese Aufgaben standardmäßig als vom Typ *task* angesehen werden.

Ein besserer Ansatz ist, auch auf leere Werte zu prüfen:

~~~js
// GUT:
if (!task.type || task.type === gantt.config.types.task){
    // Code spezifisch für Aufgaben-Items
}
~~~

Oder noch besser, verwenden Sie die Methode **getTaskType**:

~~~js
// NOCH BESSER:
if (gantt.getTaskType(task) === gantt.config.types.task){
    // Code spezifisch für Aufgaben-Items
}
~~~

Dies stellt sicher, dass der Code sowohl für Aufgaben mit explizit gesetztem Typ als auch für solche mit dem intern von Gantt zugewiesenen Standardtyp korrekt funktioniert.

Sie können die folgende Methode auch als zuverlässige Möglichkeit verwenden, um Aufgabentypen zu ermitteln und Bedingungen zu schreiben, die alle Item-Typen abdecken, um Probleme mit falscher Typenerkennung zu vermeiden:

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
- ["Aufgabentypen"](guides/task-types.md)
