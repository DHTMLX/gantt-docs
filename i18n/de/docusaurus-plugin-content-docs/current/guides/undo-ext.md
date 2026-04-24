---
title: "Rückgängig-Erweiterung"
sidebar_label: "Rückgängig-Erweiterung"
---

# Rückgängig-Erweiterung

Das *Undo*-Objekt bietet eine Reihe von Methoden, die es ermöglichen, Änderungen rückgängig zu machen bzw. erneut anzuwenden.

Lesen Sie Details zur Undo-Erweiterung im Artikel [Undo/Redo Functionality](guides/undo-redo.md).

## Methoden

Folgende Methoden stehen über das **gantt.ext.undo**-Objekt zur Verfügung:

### Undo() / Redo()

- <span class="submethod">**undo (): void**</span> - kehrt die im Gantt vorgenommenen Änderungen zurück

~~~js
gantt.ext.undo.undo();
~~~

- <span class="submethod">**redo (): void**</span> - wendet die rückgängig gemachten Änderungen erneut am Gantt an

~~~js
gantt.ext.undo.redo();
~~~

### getUndoStack() / getRedoStack()

- <span class="submethod">**getUndoStack (): UndoRedoAction[]**</span> - gibt den Stack der gespeicherten Undo-Benutzeraktionen zurück

~~~js
var stack = gantt.ext.undo.getUndoStack();
~~~

- <span class="submethod">**getRedoStack (): UndoRedoAction[]**</span> - gibt den Stack der gespeicherten Redo-Benutzeraktionen zurück

~~~js
var stack = gantt.ext.undo.getRedoStack();
~~~

Der zurückgegebene Stack ist ein Array der Undo-Benutzeraktionen. Jede Benutzeraktion enthält eine Reihe von Befehlen. Ein Befehl ist ein Objekt mit den folgenden Attributen:

- **_type_** - (*string*) der Typ eines Befehls: "add/remove/update"
- **_entity_** - (*string*) der Typ des Objekts, das geändert wurde: "task" oder "link"
- **_value_** - (*object*) das geänderte Task-/Link-Objekt
- **_oldValue_** - (*object*) das Task-/Link-Objekt vor den Änderungen

### setUndoStack() / setRedoStack()

- <span class="submethod">**setUndoStack (stack): void**</span> - setzt den Stack gespeicherter Undo-Benutzeraktionen
  - **_stack_** - (*UndoRedoAction[]*) - der Undo-Stack

~~~js
gantt.ext.undo.setUndoStack(stack);
~~~

- <span class="submethod">**setRedoStack (stack): void**</span> - setzt den Stack gespeicherter Redo-Benutzeraktionen
  - **_stack_** - (*UndoRedoAction[]*) - der Redo-Stack

~~~js
gantt.ext.undo.setRedoStack(stack);
~~~

### clearUndoStack() / clearRedoStack()

- <span class="submethod">**clearUndoStack (): void**</span> - löscht den Stack gespeicherter Undo-Befehle

~~~js
gantt.ext.undo.clearUndoStack();
~~~

- <span class="submethod">**clearRedoStack (): void**</span> - löscht den Stack gespeicherter Redo-Befehle

~~~js
gantt.ext.undo.clearRedoStack();
~~~

### saveState()

- <span class="submethod">**saveState (id, entityType): boolean**</span> - speichert den aktuellen Zustand einer Aufgabe/Verknüpfung, bevor Änderungen vorgenommen werden
    - **_id_** - (*string | number*) - die ID einer Aufgabe bzw. Verknüpfung,
    - **_type_** - (*string*) - der Typ eines Eintrags, für den die ID als Erstargument übergeben wird.

Unterstützte Werte: "task", "link".

~~~js
gantt.ext.undo.saveState(1, "task");
gantt.ext.undo.saveState(1, "link");
~~~

Lesen Sie die Details im [Undoing/Redoing changes made from code](guides/undo-redo.md#undoingredoingchangesmadefromcode) Artikel.