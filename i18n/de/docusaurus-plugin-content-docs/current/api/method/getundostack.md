---
sidebar_label: getUndoStack
title: getUndoStack method
description: "Gibt den Stapel der gespeicherten Undo-Benutzeraktionen zurück"
---

# getUndoStack

### Description

@short: Gibt den Stapel der gespeicherten Undo-Benutzeraktionen zurück

@signature: getUndoStack: () =\> UndoRedoAction[]

### Returns
- ` stack` - (UndoRedoAction[]) - ein Array der Undo-Benutzeraktionen

### Example

~~~jsx
var stack = gantt.getUndoStack();
~~~

### Related samples
- [Rückgängig-/Wiederherstellungsänderungen in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Diese Methode ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo) Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo-Funktionalität](guides/undo-redo.md). 
:::


Der zurückgegebene Stack ist ein Array der Undo-Benutzeraktionen. Jede Benutzeraktion enthält eine Reihe von Befehlen. Ein Befehl ist ein Objekt mit den folgenden Attributen:
 
- **type** - (*string*) der Typ eines Befehls: "add/remove/update"
- **entity** - (*string*) der Typ des geänderten Objekts: "task" oder "link"
- **value** - (*object*) das geänderte Task-/Link-Objekt 
- **oldValue** - (*object*) das Task-/Link-Objekt vor den Änderungen

Sehen Sie sich das untenstehende Beispiel an:
![get_undo_stack](/img/get_undo_stack.png)


Die Methode **getUndoStack()** gibt einen Stack mit 2 Undo-Benutzeraktionen zurück. Die erste Aktion enthält 3 Befehle, die zweite enthält 1 Befehl.

### Related API
- [getRedoStack](api/method/getredostack.md)
- [undo](api/method/undo.md)
- [clearUndoStack](api/method/clearundostack.md)

### Related Guides
- [Undo/Redo-Funktionalität](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 4.0

