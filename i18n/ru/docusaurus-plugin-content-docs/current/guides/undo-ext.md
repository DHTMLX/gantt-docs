---
title: "Расширение Undo"
sidebar_label: "Расширение Undo"
---

# Расширение Undo

Объект *Undo* имеет набор методов, которые позволяют отменять/повторять сделанные изменения. 

Подробнее об расширении Undo см. статью [Undo/Redo Functionality](guides/undo-redo.md).

## Методы

Следующие методы доступны через объект **gantt.ext.undo**:

### Undo() / Redo()

- <span class="submethod">**undo (): void**</span> - отменяет изменения, внесённые в Gantt

~~~js
gantt.ext.undo.undo();
~~~

- <span class="submethod">**redo (): void**</span> - повторно применяет отменённые изменения к Gantt

~~~js
gantt.ext.undo.redo();
~~~

### getUndoStack() / getRedoStack() 

- <span class="submethod">**getUndoStack (): UndoRedoAction[]**</span> - возвращает стек сохранённых действий отмены

~~~js
var stack = gantt.ext.undo.getUndoStack();
~~~

- <span class="submethod">**getRedoStack (): UndoRedoAction[]**</span> - возвращает стек сохранённых действий повторного выполнения

~~~js
var stack = gantt.ext.undo.getRedoStack();
~~~

Возвращаемый стек представляет собой массив действий отмены пользователя. Каждое действие пользователя содержит набор команд. Команда — объект со следующими атрибутами:
 
- **_type_** - (*string*) тип команды: "add/remove/update"
- **_entity_** - (*string*) тип изменённого объекта: "task" или "link"
- **_value_** - (*object*) изменённый объект task/link
- **_oldValue_** - (*object*) исходный объект task/link до изменений

### setUndoStack() / setRedoStack()

- <span class="submethod">**setUndoStack (stack): void**</span> - устанавливает стек сохранённых действий отмены пользователя
  - **_stack_** - (*UndoRedoAction[]*) - стек Undo

~~~js
gantt.ext.undo.setUndoStack(stack);
~~~

- <span class="submethod">**setRedoStack (stack): void**</span> - устанавливает стек сохранённых действий повторного выполнения пользователя
  - **_stack_** - (*UndoRedoAction[]*) - стек повторного выполнения

~~~js
gantt.ext.undo.setRedoStack(stack);
~~~

### clearUndoStack() / clearRedoStack()

- <span class="submethod">**clearUndoStack (): void**</span> - очищает стек сохранённых команд отмены

~~~js
gantt.ext.undo.clearUndoStack();
~~~

- <span class="submethod">**clearRedoStack (): void**</span> - очищает стек сохранённых команд повторного выполнения

~~~js
gantt.ext.undo.clearRedoStack();
~~~

### saveState()

- <span class="submethod">**saveState (id, entityType): boolean**</span> - сохраняет текущее состояние задачи/ссылки перед внесением изменений
    - **_id_** - (*string | number*) - идентификатор задачи/ссылки, 
    - **_type_** - (*string*) - тип записи, для которой id передаётся как первый аргумент. 

Поддерживаемые значения: "task", "link". 

~~~js
gantt.ext.undo.saveState(1, "task");
gantt.ext.undo.saveState(1, "link");
~~~

Подробнее см. статью [Undoing/Redoing changes made from code](guides/undo-redo.md#undoingredoingchangesmadefromcode).