---
title: "撤销扩展"
sidebar_label: "撤销扩展"
---

撤销扩展
=================

*Undo* 对象提供了一组用于撤销或重做已进行更改的方法。


有关撤销扩展的更多信息，请参阅 [Undo/Redo 기능](guides/undo-redo.md) 文章。

方法
----------

**gantt.ext.undo** 对象提供以下方法:

### Undo() / Redo() 

- <span class="submethod">**undo (): void**</span> - 撤销在 gantt 中应用的更改

~~~js
gantt.ext.undo.undo();
~~~

- <span class="submethod">**redo (): void**</span> - 重新应用之前已撤销的更改

~~~js
gantt.ext.undo.redo();
~~~

### getUndoStack() / getRedoStack() 

- <span class="submethod">**getUndoStack (): UndoRedoAction[]**</span> - 获取用户执行的撤销操作栈

~~~js
var stack = gantt.ext.undo.getUndoStack();
~~~

- <span class="submethod">**getRedoStack (): UndoRedoAction[]**</span> - 获取可用的重做操作栈

~~~js
var stack = gantt.ext.undo.getRedoStack();
~~~

返回的栈是撤销用户操作的数组。每个操作包含多个命令。命令是一个包含以下属性的对象:

- **_type_** - (*string*) 指定命令类型:"add"、"remove" 或 "update"
- **_entity_** - (*string*) 表示被更改对象的类型:"task" 或 "link"
- **_value_** - (*object*) 更改后的任务或链接对象
- **_oldValue_** - (*object*) 更改前的任务或链接对象

### setUndoStack() / setRedoStack()

- <span class="submethod">**setUndoStack (stack): void**</span> - 设置撤销用户操作的栈
  - **_stack_** - (*UndoRedoAction[]*) - 要设置的撤销栈

~~~js
gantt.ext.undo.setUndoStack(stack);
~~~

- <span class="submethod">**setRedoStack (stack): void**</span> - 设置重做用户操作的栈
  - **_stack_** - (*UndoRedoAction[]*) - 要设置的重做栈

~~~js
gantt.ext.undo.setRedoStack(stack);
~~~

### clearUndoStack() / clearRedoStack()

- <span class="submethod">**clearUndoStack (): void**</span> - 清空撤销命令栈

~~~js
gantt.ext.undo.clearUndoStack();
~~~

- <span class="submethod">**clearRedoStack (): void**</span> - 清空重做命令栈

~~~js
gantt.ext.undo.clearRedoStack();
~~~

### saveState()

- <span class="submethod">**saveState (id, entityType): boolean**</span> - 在更改发生前记录任务或链接的当前状态
    - **_id_** - (*string | number*) - 任务或链接的标识符
    - **_type_** - (*string*) - 指定与 id 对应的条目类型，支持的值为 "task" 或 "link"

~~~js
gantt.ext.undo.saveState(1, "task");
gantt.ext.undo.saveState(1, "link");
~~~

更多详情请参见 [Undoing/Redoing changes made from code](guides/undo-redo.md#chexiaochongzuodaimazhongjinxingdegenggai) 文章。
