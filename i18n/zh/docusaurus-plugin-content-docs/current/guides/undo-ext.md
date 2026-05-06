---
title: "撤销扩展"
sidebar_label: "撤销扩展"
---

# 撤销扩展

The *Undo* 对象拥有一组方法，允许你撤销/重做所做的修改。


有关撤销扩展的更多信息，请参阅 [Undo/Redo 기능](guides/undo-redo.md) 文章。

## 方法

可以通过 **gantt.ext.undo** 对象使用以下方法：

### Undo() / Redo()

- <span class="submethod">**undo (): void**</span> - 撤销在甘特图中所做的修改

~~~js
gantt.ext.undo.undo();
~~~

- <span class="submethod">**redo (): void**</span> - 将已还原的修改再次应用到甘特图中

~~~js
gantt.ext.undo.redo();
~~~

### getUndoStack() / getRedoStack()

- <span class="submethod">**getUndoStack (): UndoRedoAction[]**</span> - 返回存储的撤销用户操作的栈

~~~js
var stack = gantt.ext.undo.getUndoStack();
~~~

- <span class="submethod">**getRedoStack (): UndoRedoAction[]**</span> - 返回存储的重做用户操作的栈

~~~js
var stack = gantt.ext.undo.getRedoStack();
~~~

返回的栈是撤销用户操作的数组。每个用户操作包含一组命令。一个命令是具有以下属性的对象：

- **_type_** - (*string*) 命令的类型: "add/remove/update"
- **_entity_** - (*string*) 被修改对象的类型: "task" 或 "link"
- **_value_** - (*object*) 被修改的 task/link 对象
- **_oldValue_** - (*object*) 修改前的 task/link 对象

### setUndoStack() / setRedoStack()

- <span class="submethod">**setUndoStack (stack): void**</span> - 设置存储的撤销用户操作的栈
  - **_stack_** - (*UndoRedoAction[]*) - 撤销栈

~~~js
gantt.ext.undo.setUndoStack(stack);
~~~

- <span class="submethod">**setRedoStack (stack): void**</span> - 设置存储的重做用户操作的栈
  - **_stack_** - (*UndoRedoAction[]*) - 重做栈

~~~js
gantt.ext.undo.setRedoStack(stack);
~~~

### clearUndoStack() / clearRedoStack()

- <span class="submethod">**clearUndoStack (): void**</span> - 清空存储的撤销命令栈

~~~js
gantt.ext.undo.clearUndoStack();
~~~

- <span class="submethod">**clearRedoStack (): void**</span> - 清空存储的重做命令栈

~~~js
gantt.ext.undo.clearRedoStack();
~~~

### saveState()

- <span class="submethod">**saveState (id, entityType): boolean**</span> - 在进行修改之前保存任务/链接的当前状态
    - **_id_** - (*string | number*) - 任务/链接的 id
    - **_type_** - (*string*) - 提供第一参数的条目类型。

支持的值："task"、"link"。

~~~js
gantt.ext.undo.saveState(1, "task");
gantt.ext.undo.saveState(1, "link");
~~~

Read the details in the [Undoing/Redoing changes made from code](guides/undo-redo.md#undoingredoingchangesmadefromcode) article.