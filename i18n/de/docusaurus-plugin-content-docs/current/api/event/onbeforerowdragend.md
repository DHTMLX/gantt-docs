---
sidebar_label: onBeforeRowDragEnd
title: onBeforeRowDragEnd event
description: "feuert, wenn der Benutzer eine Zeile im Grid ablegt"
---

# onBeforeRowDragEnd

### Description

@short: Wird ausgelöst, wenn der Benutzer eine Zeile in der Grid ablegt

@signature: onBeforeRowDragEnd: (sid: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `sid` - (required) *string | number* - die ID der Aufgabe, die verschoben werden soll
- `parent` - (required) *string | number* - die Parent-ID. Siehe unten die Details
- `tindex` - (required) *number* - der Index der Position, von der aus die Aufgabe verschoben wird <br/> (der Index im gesamten Baum). Falls angegeben, bezieht sich der <b>tindex</b> auf den Index im 'parent'-Zweig. Siehe unten die Details

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex){
    const task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
Das Ereignis wird ausgelöst, wenn eine Aufgabe mit der Maus im linken Grid verschoben wird, während die Einstellung [order_branch](api/config/order_branch.md) aktiviert ist. Wenn die Reihung der Zweige deaktiviert ist, wird das Ereignis nie ausgelöst.
:::

- Wenn das Ereignis ausgelöst wird, ist die Aufgabe bereits an eine neue Position verschoben, aber die Änderungen können noch rückgängig gemacht werden
- Das Ereignis ist blockierbar. Geben Sie *false* zurück, um die Operation abzubrechen und die Aufgabe an ihren ursprünglichen Ort zu verschieben
- Die ursprüngliche Position (Parent und Index) ist aus den Handler-Argumenten verfügbar
- Die Zielposition kann aus einem Task-Objekt als [task.parent](guides/task-tree-operations.md#parent-of-a-task) und [gantt.getGlobalTaskIndex(taskId)](api/method/getglobaltaskindex.md) abgerufen werden
- Die Parameter **parent** und **tindex** hängen vom gesetzten [order_branch](api/config/order_branch.md) Modus ab: 
    - Im regulären Modus ("true"):
        - der **parent** Parameter bezieht sich auf das *originale* Parent des Tasks (das Parent eines Tasks, bevor er an eine neue Position verschoben wurde)
        - der **tindex** Parameter bezieht sich auf den *originall*en lokalen Index
    - Im "marker"-Modus:
        - der **parent** Parameter bezieht sich auf das neue Parent des Tasks
        - der **tindex** Parameter bezieht sich auf den neuen lokalen Index

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [onRowDragStart](api/event/onrowdragstart.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Neuordnung von Aufgaben](guides/reordering-tasks.md)