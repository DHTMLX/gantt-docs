---
sidebar_label: onBeforeTaskMove
title: onBeforeTaskMove-Ereignis
description: "wird ausgelöst, bevor eine Aufgabe in eine neue vertikale Position verschoben wird"
---

# onBeforeTaskMove

### Description

@short: Wird ausgelöst, bevor eine Aufgabe in eine neue vertikale Position verschoben wird

@signature: onBeforeTaskMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID der zu verschiebenden Aufgabe
- `parent` - (required) *string | number* - die Eltern-ID
- `tindex` - (required) *number* - der Index der Position im Elternzweig, zu dem die Aufgabe verschoben wird

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Ereignisses ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

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

Das Ereignis ist blockierbar. Geben Sie *false* zurück, um das Verschieben der Aufgabe zu verhindern.

Beachten Sie, dass das Ereignis in zwei Fällen ausgelöst wird:

1. Beim Aufruf der Methode [moveTask](api/method/movetask.md) 
2. Wenn die Option [order_branch](api/config/order_branch.md) im Standardmodus aktiviert ist (*gantt.config.order_branch = true;*) und ein Benutzer Aufgaben verschiebt

### Related API
- [moveTask](api/method/movetask.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)