---
sidebar_label: getRedoStack
title: getRedoStack-Methode
description: "liefert den Stack der gespeicherten Redo-Benutzeraktionen"
---

# getRedoStack

### Description

@short: Gibt den Stack der gespeicherten Redo-Benutzeraktionen zurück

@signature: getRedoStack: () =\> UndoRedoAction[]

### Returns
- ` stack` - (UndoRedoAction[]) - ein Array der Redo-Benutzeraktionen

### Example

~~~jsx
var stack = gantt.getRedoStack();
~~~

### Related samples
- [Undo/Redo Änderungen in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
Diese Methode ist in der **undo**-Erweiterung definiert, daher müssen Sie das [undo](guides/extensions-list.md#undo) Plugin aktivieren. Lesen Sie die Details im Artikel [Undo/Redo Functionality](guides/undo-redo.md).
:::

Der zurückgegebene Stack ist ein Array der Redo-Benutzeraktionen. Jede Benutzeraktion enthält eine Gruppe von Befehlen. Ein Befehl ist ein Objekt mit den folgenden Attributen:
 
- **type** - (*string*) der Typ eines Befehls: "add/remove/update"
- **entity** - (*string*) der Typ des Objekts, das geändert wurde: "task" oder "link"
- **value** - (*object*) das geänderte Task-/Link-Objekt 
- **oldValue** - (*object*) das Task-/Link-Objekt vor den Änderungen

Schauen Sie sich das untenstehende Beispiel an:

Die Methode **getRedoStack()** gibt einen Stack mit 3 Redo-Benutzeraktionen zurück. Die erste und zweite Aktion enthalten jeweils 1 Befehl, während die dritte 3 Befehle enthält.

### Related API
- [getUndoStack](api/method/getundostack.md)
- [redo](api/method/redo.md)
- [clearRedoStack](api/method/clearredostack.md)

### Related Guides
- [Undo/Redo-Funktionalität](guides/undo-redo.md)

### Change log
- hinzugefügt in Version 4.0