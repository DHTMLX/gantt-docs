---
sidebar_label: addTask
title: addTask method
description: "fügt eine neue Aufgabe hinzu"
---

# addTask

### Description

@short: Fügt eine neue Aufgabe hinzu

@signature: addTask: (task: NewTask, parent?: string | number, index?: number) =\> string | number

### Parameters

- `task` - (required) *NewTask* - das Aufgabenobjekt
- `parent` - (optional) *string | number* - die ID des übergeordneten Elements
- `index` - (optional) *number* - die Position, an der die Aufgabe eingefügt wird (0 oder höher)

### Returns
- ` id` - (string | number) - die ID der Aufgabe

### Example

~~~jsx
const taskId = gantt.addTask({
    id: 10,
    text: "Task #5",
    start_date: "02-09-2025",
    duration: 28
}, "project_2", 1);
~~~

### Details

Wenn Sie den Parameter *index* mit einem Wert von 0 oder höher angeben, wird die Aufgabe an dieser bestimmten Stelle innerhalb des Zweigs eingefügt. 
Lassen Sie ihn weg, wird die Aufgabe einfach am Ende des Zweigs hinzugefügt.

Diese Methode löst die Events [onBeforeTaskAdd](api/event/onbeforetaskadd.md) und [onAfterTaskAdd](api/event/onaftertaskadd.md) aus.

Beachten Sie, dass wenn Sie das Speichern einer Aufgabe vermeiden möchten - zum Beispiel wenn ein Benutzer im Lightbox-Dialog abbricht - Sie stattdessen die Methode [createTask](api/method/createtask.md) verwenden sollten, welche das Event [onTaskCreated](api/event/ontaskcreated.md) auslöst.


## Verhindern, dass Aufgaben auf bestimmten Ebenen hinzugefügt werden
Eine einfache Möglichkeit, Benutzern das Hinzufügen von Unteraufgaben unter bestimmten Aufgaben zu verwehren, besteht darin, den 'Add'-Button per CSS auszublenden.

1. Weisen Sie zunächst jeder Aufgabenzeile eine CSS-Klasse mit der Vorlage [grid_row_class](api/template/grid_row_class.md) zu:
~~~js
gantt.templates.grid_row_class = (start, end, task) => {
    if (task.$level > 1) {
        return "nested_task";
    }
    return "";
};
~~~
2. Blenden Sie anschließend den 'Add'-Button für diese Zeilen aus:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~

:::note
sample
  [Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)
 
:::

### Related API
- [createTask](api/method/createtask.md)
- [addLink](api/method/addlink.md)
- [onAfterTaskAdd](api/event/onaftertaskadd.md)
- [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related Guides
- [Grundlegende Operationen mit Aufgaben](guides/crud-task.md)

