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

- `task` - (required) *NewTask* - das Task-Objekt
- `parent` - (optional) *string | number* - die ID des Elternteils
- `task` - (optional) *number* - die Position, in die die Aufgabe hinzugefügt wird (0 oder größer)

### Returns
- ` id` - (string, number) - die ID der Aufgabe

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

Wenn Sie den *index*-Parameter mit dem Wert von 0 oder größer setzen, wird eine Aufgabe an der angegebenen Position im Zweig hinzugefügt. 
Andernfalls wird die Aufgabe am Ende des Aufgaben-Zweigs hinzugefügt.

Die Methode löst die Ereignisse [onBeforeTaskAdd](api/event/onbeforetaskadd.md) und [onAfterTaskAdd](api/event/onaftertaskadd.md) aus.

Hinweis: Falls Sie die Aufgabe in dem Fall, z. B. falls der Benutzer im Lightbox-Dialog auf 'Abbrechen' klickt, nicht speichern möchten, verwenden Sie die [createTask](api/method/createtask.md) Methode und das [onTaskCreated](api/event/ontaskcreated.md) Ereignis, das von dieser Methode ausgelöst wird.

### Preventing from adding tasks to certain levels
Eine einfache Möglichkeit, Benutzer daran zu hindern, Unteraufgaben zu bestimmten Aufgaben hinzuzufügen, besteht darin, die 'Add'-Schaltfläche per CSS auszublenden.

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
Beispiel [Vordefinierte Projektstruktur](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)
:::

### Related API
- [createTask](api/method/createtask.md)
- [addLink](api/method/addlink.md)
- [onAfterTaskAdd](api/event/onaftertaskadd.md)
- [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related Guides
- [Grundlegende Operationen mit Aufgaben](guides/crud-task.md)