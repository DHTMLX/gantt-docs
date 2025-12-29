---
title: "Undo-Erweiterung"
sidebar_label: "Undo-Erweiterung"
---

# Undo-Erweiterung

Das *Undo*-Objekt bietet eine Reihe von Methoden, um Änderungen rückgängig zu machen oder wiederherzustellen. 


Weitere Informationen zur Undo-Erweiterung finden Sie im Artikel [Undo/Redo Functionality](guides/undo-redo.md).

## Methoden

Das **gantt.ext.undo**-Objekt stellt folgende Methoden zur Verfügung:

### Undo() / Redo()

- <span class="submethod">**undo (): void**</span> - macht die im Gantt-Diagramm vorgenommenen Änderungen rückgängig

~~~js
gantt.ext.undo.undo();
~~~

- <span class="submethod">**redo (): void**</span> - stellt zuvor rückgängig gemachte Änderungen wieder her

~~~js
gantt.ext.undo.redo();
~~~

### getUndoStack() / getRedoStack()

- <span class="submethod">**getUndoStack (): UndoRedoAction[]**</span> - ruft den Stapel der vom Benutzer ausgeführten Undo-Aktionen ab

~~~js
var stack = gantt.ext.undo.getUndoStack();
~~~

- <span class="submethod">**getRedoStack (): UndoRedoAction[]**</span> - ruft den Stapel der verfügbaren Redo-Aktionen ab

~~~js
var stack = gantt.ext.undo.getRedoStack();
~~~

Die zurückgegebenen Stapel sind Arrays von Undo-Benutzeraktionen. Jede Aktion enthält mehrere Befehle. Ein Befehl ist ein Objekt mit folgenden Eigenschaften:
 
- **_type_** - (*string*) gibt den Befehlstyp an: "add", "remove" oder "update"
- **_entity_** - (*string*) gibt die Art des geänderten Objekts an: "task" oder "link"
- **_value_** - (*object*) das Aufgaben- oder Verbindungsobjekt nach der Änderung 
- **_oldValue_** - (*object*) das Aufgaben- oder Verbindungsobjekt vor der Änderung

### setUndoStack() / setRedoStack()

- <span class="submethod">**setUndoStack (stack): void**</span> - setzt den Stapel der Undo-Benutzeraktionen
  - **_stack_** - (*UndoRedoAction[]*) - der zu setzende Undo-Stapel

~~~js
gantt.ext.undo.setUndoStack(stack);
~~~

- <span class="submethod">**setRedoStack (stack): void**</span> - setzt den Stapel der Redo-Benutzeraktionen
  - **_stack_** - (*UndoRedoAction[]*) - der zu setzende Redo-Stapel

~~~js
gantt.ext.undo.setRedoStack(stack);
~~~

### clearUndoStack() / clearRedoStack()

- <span class="submethod">**clearUndoStack (): void**</span> - leert den Stapel der Undo-Befehle

~~~js
gantt.ext.undo.clearUndoStack();
~~~

- <span class="submethod">**clearRedoStack (): void**</span> - leert den Stapel der Redo-Befehle

~~~js
gantt.ext.undo.clearRedoStack();
~~~

### saveState()

- <span class="submethod">**saveState (id, entityType): boolean**</span> - speichert den aktuellen Zustand einer Aufgabe oder Verbindung, bevor Änderungen vorgenommen werden
    - **_id_** - (*string | number*) - die Kennung der Aufgabe oder Verbindung
    - **_type_** - (*string*) - gibt den Typ des Eintrags an, der der id entspricht; unterstützte Werte sind "task" oder "link"

~~~js
gantt.ext.undo.saveState(1, "task");
gantt.ext.undo.saveState(1, "link");
~~~

Weitere Einzelheiten finden Sie im Artikel [Undoing/Redoing changes made from code](guides/undo-redo.md#undoingredoingchangesmadefromcode).
