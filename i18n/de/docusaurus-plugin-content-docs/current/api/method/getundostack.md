---
sidebar_label: getUndoStack
title: getUndoStack method
description: "liefert den Stack der gespeicherten Undo-Benutzeraktionen"
---

# getUndoStack

### Description

@short: Liefert den Stack der gespeicherten Undo-Benutzeraktionen

@signature: getUndoStack: () =\> UndoRedoAction[]

### Returns
- ` stack` - (UndoRedoAction[]) - ein Array, das die Undo-Benutzeraktionen enthält

### Example

~~~jsx
var stack = gantt.getUndoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Diese Methode ist Teil der **undo**-Erweiterung, daher muss das [undo](guides/extensions-list.md#undo) Plugin aktiviert sein. Weitere Details finden Sie im Artikel ["Undo/Redo-Funktionalität"](guides/undo-redo.md). 
:::


Der zurückgegebene Stack besteht aus Undo-Benutzeraktionen, wobei jede Aktion eine Reihe von Commands enthält. Ein Command ist ein Objekt mit folgenden Eigenschaften:
 
- **type** - (*string*) gibt den Command-Typ an: "add/remove/update"
- **entity** - (*string*) gibt den Typ des Objekts an, das geändert wurde: "task" oder "link"
- **value** - (*object*) das Task- oder Link-Objekt nach der Änderung
- **oldValue** - (*object*) das Task- oder Link-Objekt vor der Änderung

Hier ein Beispiel zur Veranschaulichung:

![get_undo_stack](/img/get_undo_stack.png)

Die Methode **getUndoStack()** liefert einen Stack, der 2 Undo-Benutzeraktionen enthält. Die erste Aktion umfasst 3 Commands, die zweite Aktion enthält einen einzelnen Command.

### Related API
- [getRedoStack](api/method/getredostack.md)
- [undo](api/method/undo.md)
- [clearUndoStack](api/method/clearundostack.md)

### Related Guides
- ["Undo/Redo-Funktionalität"](guides/undo-redo.md#gettingthestackofstoredundoredocommands)

### Change log
- hinzugefügt in Version 4.0

