---
sidebar_label: onBeforeTaskMove
title: onBeforeTaskMove event
description: "wird ausgelöst kurz bevor sich die vertikale Position einer Aufgabe ändert"
---

# onBeforeTaskMove

### Description

@short: Wird ausgelöst kurz bevor sich die vertikale Position einer Aufgabe ändert

@signature: onBeforeTaskMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID der verschobenen Aufgabe
- `parent` - (required) *string | number* - die ID des neuen übergeordneten Elements
- `tindex` - (required) *number* - der neue Positionsindex innerhalb des übergeordneten Zweigs

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Events fortgesetzt werden soll (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
//Bewegung in einen anderen Unterzweig blockieren:
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    const task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

### Details

Dieses Event kann blockiert werden. Wenn *false* zurückgegeben wird, wird das Verschieben der Aufgabe verhindert.

Beachte, dass dieses Event in zwei Szenarien ausgelöst wird:

1. Wenn die Methode [moveTask](api/method/movetask.md) aufgerufen wird
2. Wenn die Option [order_branch](api/config/order_branch.md) mit der Standardeinstellung (*gantt.config.order_branch = true;*) aktiv ist und ein Nutzer Aufgaben per Drag & Drop verschiebt

### Related API
- [moveTask](api/method/movetask.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)

