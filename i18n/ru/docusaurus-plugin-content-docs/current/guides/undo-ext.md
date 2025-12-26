---
title: "Undo Extension"
sidebar_label: "Undo Extension"
---

# Undo Extension

Объект *Undo* предоставляет набор методов для отмены или возврата изменений, которые были внесены. 


Для получения дополнительной информации о расширении Undo ознакомьтесь со статьёй [Отмена и повтор изменений (Undo/Redo)](guides/undo-redo.md).

## Методы

Объект **gantt.ext.undo** предоставляет следующие методы:

### Undo() / Redo() 

- <span class="submethod">**undo (): void**</span> - отменяет изменения, применённые в Gantt

~~~js
gantt.ext.undo.undo();
~~~

- <span class="submethod">**redo (): void**</span> - повторно применяет изменения, которые ранее были отменены

~~~js
gantt.ext.undo.redo();
~~~

### getUndoStack() / getRedoStack() 

- <span class="submethod">**getUndoStack (): UndoRedoAction[]**</span> - возвращает стек действий пользователя для отмены

~~~js
var stack = gantt.ext.undo.getUndoStack();
~~~

- <span class="submethod">**getRedoStack (): UndoRedoAction[]**</span> - возвращает стек доступных действий для возврата

~~~js
var stack = gantt.ext.undo.getRedoStack();
~~~

Возвращаемые стеки - это массивы пользовательских действий отмены. Каждое действие содержит несколько команд. Команда - это объект со следующими свойствами:
 
- **_type_** - (*string*) указывает тип команды: "add", "remove" или "update"
- **_entity_** - (*string*) указывает тип изменяемого объекта: "task" или "link"
- **_value_** - (*object*) объект задачи или связи после изменения 
- **_oldValue_** - (*object*) объект задачи или связи до изменения

### setUndoStack() / setRedoStack()

- <span class="submethod">**setUndoStack (stack): void**</span> - устанавливает стек пользовательских действий отмены
  - **_stack_** - (*UndoRedoAction[]*) - стек отмены, который нужно установить

~~~js
gantt.ext.undo.setUndoStack(stack);
~~~

- <span class="submethod">**setRedoStack (stack): void**</span> - устанавливает стек пользовательских действий возврата
  - **_stack_** - (*UndoRedoAction[]*) - стек возврата, который нужно установить

~~~js
gantt.ext.undo.setRedoStack(stack);
~~~

### clearUndoStack() / clearRedoStack()

- <span class="submethod">**clearUndoStack (): void**</span> - очищает стек команд отмены

~~~js
gantt.ext.undo.clearUndoStack();
~~~

- <span class="submethod">**clearRedoStack (): void**</span> - очищает стек команд возврата

~~~js
gantt.ext.undo.clearRedoStack();
~~~

### saveState()

- <span class="submethod">**saveState (id, entityType): boolean**</span> - сохраняет текущее состояние задачи или связи перед изменением
    - **_id_** - (*string | number*) - идентификатор задачи или связи
    - **_type_** - (*string*) - указывает тип элемента, соответствующего id; поддерживаемые значения: "task" или "link"

~~~js
gantt.ext.undo.saveState(1, "task");
gantt.ext.undo.saveState(1, "link");
~~~

Дополнительную информацию можно найти в статье [Undoing/Redoing changes made from code](guides/undo-redo.md#undoingredoingchangesmadefromcode).
