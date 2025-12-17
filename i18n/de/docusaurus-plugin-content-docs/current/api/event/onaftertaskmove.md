---
sidebar_label: onAfterTaskMove
title: onAfterTaskMove event
description: "wird unmittelbar ausgelöst, nachdem eine Aufgabe an eine neue vertikale Position verschoben wurde"
---

# onAfterTaskMove

### Description

@short: Wird unmittelbar ausgelöst, nachdem eine Aufgabe an eine neue vertikale Position verschoben wurde

@signature: onAfterTaskMove: (id: string | number, parent: string | number, tindex: number) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID der verschobenen Aufgabe
- `parent` - (required) *string | number* - die ID des neuen übergeordneten Elements
- `tindex` - (required) *number* - der neue Positionsindex innerhalb des übergeordneten Zweigs

### Example

~~~jsx
// Verhindert das Verschieben in einen anderen Unterzweig
gantt.attachEvent("onAfterTaskMove", function(id, parent, tindex){
    // eigene Logik hier
});
~~~

### Details

Beachten Sie, dass dieses Event in zwei Situationen ausgelöst wird:

1. Wenn die Methode [moveTask](api/method/movetask.md) aufgerufen wird
2. Wenn die Option [order_branch](api/config/order_branch.md) mit der Standardeinstellung (*gantt.config.order_branch = true;*) aktiviert ist und ein Benutzer Aufgaben per Drag & Drop verschiebt

### Related API
- [moveTask](api/method/movetask.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)

