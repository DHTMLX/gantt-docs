---
sidebar_label: onBeforeRowDragEnd
title: onBeforeRowDragEnd event
description: "Wird ausgelöst, wenn ein Benutzer eine Zeile innerhalb des Grids fallen lässt."
---

# onBeforeRowDragEnd

### Description

@short: Wird ausgelöst, wenn ein Benutzer eine Zeile innerhalb des Grids fallen lässt.

@signature: onBeforeRowDragEnd: (sid: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `sid` - (required) *string | number* - die ID der verschobenen Aufgabe
- `parent` - (required) *string | number* - die Eltern-ID. Weitere Details siehe unten
- `tindex` - (required) *number* - der Index der Position, von der die Aufgabe verschoben wird <br> (der Index innerhalb des gesamten Baums). Wenn angegeben, entspricht der <b>tindex</b> dem Index im 'parent'-Zweig. Siehe Details unten

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

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

Dieses Event tritt auf, wenn eine Aufgabe per Maus im linken Grid verschoben wird, vorausgesetzt, die Einstellung [order_branch](api/config/order_branch.md) ist aktiviert. Wenn die Zweig-Neuanordnung deaktiviert ist, wird dieses Event nicht ausgelöst.
 
:::

- Zum Zeitpunkt des Events wurde die Aufgabe bereits an die neue Position verschoben, aber die Änderung kann noch rückgängig gemacht werden
- Das Event kann blockiert werden. Wird *false* zurückgegeben, wird die Operation abgebrochen und die Aufgabe an ihre ursprüngliche Position zurückversetzt
- Die ursprüngliche Position (Parent und Index) wird als Argumente an den Handler übergeben
- Die Zielposition kann über das Task-Objekt über [task.parent](guides/task-tree-operations.md#parentofatask) und [gantt.getGlobalTaskIndex(taskId)](api/method/getglobaltaskindex.md) abgerufen werden
- Die Parameter **parent** und **tindex** variieren je nach [order_branch](api/config/order_branch.md) Modus:
    - Im Standardmodus ("true"):
        - bezieht sich der **parent** Parameter auf den *ursprünglichen* Parent der Aufgabe (vor der Verschiebung)
        - bezieht sich der **tindex** Parameter auf den *ursprünglichen* lokalen Index
    - Im "marker"-Modus:
        - bezieht sich der **parent** Parameter auf den neuen Parent der Aufgabe
        - bezieht sich der **tindex** Parameter auf den neuen lokalen Index

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [onRowDragStart](api/event/onrowdragstart.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- ["Aufgaben neu anordnen"](guides/reordering-tasks.md)

