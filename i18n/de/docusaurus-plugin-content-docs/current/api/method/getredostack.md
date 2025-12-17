---
sidebar_label: getRedoStack
title: getRedoStack method
description: "liefert den Stapel der gespeicherten Redo-Benutzeraktionen"
---

# getRedoStack

### Description

@short: Liefert den Stapel der gespeicherten Redo-Benutzeraktionen

@signature: getRedoStack: () =\> UndoRedoAction[]

### Returns
- ` stack` - (UndoRedoAction[]) - ein Array, das Redo-Benutzeraktionen enthält

### Example

~~~jsx
var stack = gantt.getRedoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 Diese Methode gehört zur **undo**-Erweiterung, daher stellen Sie sicher, dass das [undo](guides/extensions-list.md#undo) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Undo/Redo-Funktionalität"](guides/undo-redo.md). 
:::


Der zurückgegebene Stapel besteht aus Redo-Benutzeraktionen. Jede Aktion umfasst eine Reihe von Befehlen. Ein Befehl ist ein Objekt mit folgenden Eigenschaften:
 
- **type** - (*string*) gibt den Befehlstyp an: "add/remove/update"
- **entity** - (*string*) gibt die Art des geänderten Objekts an: "task" oder "link"
- **value** - (*object*) das aktualisierte Task-/Link-Objekt 
- **oldValue** - (*object*) das Task-/Link-Objekt vor der Änderung

Siehe das folgende Beispiel:

![get_redo_stack](/img/get_redo_stack.png)

Die Methode **getRedoStack()** gibt einen Stapel mit 3 Redo-Benutzeraktionen zurück. Die erste und zweite Aktion enthalten jeweils 1 Befehl, die dritte enthält 3 Befehle.

### Related API
- [getUndoStack](api/method/getundostack.md)
- [redo](api/method/redo.md)
- [clearRedoStack](api/method/clearredostack.md)

### Related Guides
- ["Undo/Redo-Funktionalität"](guides/undo-redo.md#gettingthestackofstoredundoredocommands)

### Change log
- hinzugefügt in Version 4.0

