---
sidebar_label: onAfterTaskMove
title: onAfterTaskMove-Ereignis
description: "Wird ausgelöst, nachdem eine Aufgabe an eine neue vertikale Position verschoben wurde"
---

# onAfterTaskMove

### Description

@short: Wird ausgelöst, nachdem eine Aufgabe an eine neue vertikale Position verschoben wurde

@signature: onAfterTaskMove: (id: string | number, parent: string | number, tindex: number) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe, die verschoben werden soll
- `parent` - (required) *string | number* - die Eltern-ID
- `tindex` - (required) *number* - der Index der Position im Eltern-Zweig, zu dem die Aufgabe verschoben wird

### Example

~~~jsx
// verhindern, dass in einen anderen Unterbaum verschoben wird
gantt.attachEvent("onAfterTaskMove", function(id, parent, tindex){
    // beliebige benutzerdefinierte Logik hier
});
~~~

### Details

Hinweis: Das Ereignis wird in zwei Fällen ausgelöst:

1. Beim Aufruf der Methode [moveTask](api/method/movetask.md)
2. Wenn die Option [order_branch](api/config/order_branch.md) im Standardmodus aktiviert ist (*gantt.config.order_branch = true;*) und der Benutzer Aufgaben zieht

### Related API
- [moveTask](api/method/movetask.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)