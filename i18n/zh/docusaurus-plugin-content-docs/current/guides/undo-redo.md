---
title: "撤销/重做功能"
sidebar_label: "撤销/重做功能"
---

撤销/重做功能
======================================

dhtmlxGantt 图表支持在图表中撤销和重做所做的更改。要启用此功能，请通过 [gantt.plugins](api/method/plugins.md) 方法启用 **undo** 插件。

~~~js
gantt.plugins({
    undo: true
});
~~~

默认情况下，撤销和重做功能均为开启状态。您可以通过 [undo](api/config/undo.md) 和 [redo](api/config/redo.md) 配置项来管理撤销/重做的行为。

您也可以分别启用或禁用撤销和重做功能，例如:

~~~js
// 这里只启用了重做
gantt.config.undo = false;
gantt.config.redo = true;
~~~


[Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)


撤销/重做 API
----------------------------

要撤销在 Gantt 图表中的更改，请使用 [undo](api/method/undo.md) 方法:

~~~js
gantt.undo();
~~~

要重做已被撤销的更改，请使用 [redo](api/method/redo.md) 方法:

~~~js
gantt.redo();
~~~

从 6.3 版本开始，**undo()/redo()** 方法也可以通过 **gantt.ext.undo** 对象调用。详情请参阅 [Undo Extension](guides/undo-ext.md) 文章。

获取已存储的撤销/重做操作栈
--------------------------------------------

Gantt 图表中的用户操作会以包含命令对象的数组形式存储。Gantt 会维护一个最近执行命令的栈。**undo** 扩展会处理这些命令以执行相应的逆向操作。

在撤销或重做时，扩展会取出最近的命令对象并执行相应的方法。

要获取撤销操作的栈，请使用 [getUndoStack](api/method/getundostack.md) 方法:

~~~js
var stack = gantt.getUndoStack();
~~~

要获取重做操作的栈，请使用 [getRedoStack](api/method/getredostack.md) 方法:

~~~js
var stack = gantt.getRedoStack();
~~~

返回的栈是一个用户操作数组。每个操作包含一组命令:

- <span class="subproperty">**UndoRedoAction**</span> - (*object*) - 存储与撤销或重做操作相关的命令
    - **_commands_** - (*UndoRedoCommand[]*) - 包含撤销或重做操作变更（命令）的数组

每个命令对象包含以下属性:

- <span class="subproperty">**UndoRedoCommand**</span> - (*object*) - 保存 **Task** 或 **Link** 对象的初始和更新状态:
    - **_type_** - (*string*) - 命令类型:"add"、"remove" 或 "update"
    - **_entity_** - (*string*) - 被更改的对象类型:"task" 或 "link"
    - **_value_** - (*Task | Link*) - 被更改的任务或链接对象
    - **_oldValue_** - (*Task | Link*) - 变更前的任务或链接对象

以下是示例说明:

![get_undo_stack](/img/get_undo_stack.png)

**getUndoStack()** 方法返回一个包含 2 个撤销操作的栈。第一个操作包含 3 个命令，第二个操作包含 1 个命令。

从 6.3 版本开始，**getUndoStack()/getRedoStack()** 方法也可以通过 **gantt.ext.undo** 对象调用。更多信息请参阅 [Undo Extension](guides/undo-ext.md) 文章。

清空已存储的撤销/重做命令栈
------------------------------

您可以通过 Gantt API 方法清空撤销/重做命令栈。

要清空撤销栈，请使用 [clearUndoStack](api/method/clearundostack.md) 方法:

~~~js
gantt.clearUndoStack();
~~~

要清空重做栈，请使用 [clearRedoStack](api/method/clearredostack.md) 方法:

~~~js
gantt.clearRedoStack();
~~~

从 6.3 版本开始，**clearUndoStack()/clearRedoStack()** 方法也可以通过 **gantt.ext.undo** 对象调用。详情请参阅 [Undo Extension](guides/undo-ext.md) 文章。

撤销/重做代码中进行的更改
---------------------------------

通过结合使用 **undo()/redo()** 方法和 **gantt.ext.undo** 对象的 **saveState()** 方法，可以撤销或重做通过代码进行的更改。

由于 Gantt 不会自动跟踪直接在代码中进行的修改，因此需要在修改前告知其保存之前的状态。这可以在更改任务或链接之前调用 **saveState()** 来实现。

Gantt 还需要一个信号来表示更新已完成，这需要调用 **updateTask()** 或 **updateLink()**。这样，之前和之后的状态都会被保存到撤销栈中。

例如，以下代码演示了如何撤销通过代码更改任务文本的操作:

~~~js
const undoExtension = gantt.ext.undo;
const task = gantt.getTask(1);

console.log(task.text);
// ->  "task 1";

undoExtension.saveState(task.id, "task"); /*!*/

task.text = "modified"; /*!*/
gantt.updateTask(1); /*!*/

console.log(task.text);
// ->  "modified";

undoExtension.undo();

console.log(task.text);
// ->  "task 1";
~~~

在此示例中，**saveState()** 方法会在文本被更改为 "modified" 之前保存原始文本 "task 1"。之后调用 **gantt.ext.undo.undo()** 会将文本恢复为原来的值。

关于 **saveState()** 的更多信息，请参阅 [Undo Extension](guides/undo-ext.md) 文章。

配置撤销功能
----------------------------

有多个设置可以用于自定义撤销操作。

使用 [undo_actions](api/config/undo_actions.md) 参数可以指定撤销将覆盖哪些操作:

~~~js
gantt.config.undo_actions = {
    update:"update",
    remove:"remove", // 从数据存储中移除项
    add:"add"
};
~~~

要设置可撤销的步骤数，请使用 [undo_steps](api/config/undo_steps.md) 参数:

~~~js
gantt.config.undo_steps = 10;
~~~

默认情况下，最多可撤销 10 个操作。

您还可以通过 [undo_types](api/config/undo_types.md) 参数定义撤销适用于哪些实体:

~~~js
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~

API 事件列表
-------------------

与撤销/重做功能相关的事件包括:

- [onBeforeUndo](api/event/onbeforeundo.md) - 在执行 [undo](api/method/undo.md) 方法前触发
- [onAfterUndo](api/event/onafterundo.md) - 在 [undo](api/method/undo.md) 方法执行后触发
- [onBeforeRedo](api/event/onbeforeredo.md) - 在执行 [redo](api/method/redo.md) 方法前触发
- [onAfterRedo](api/event/onafterredo.md) - 在 [redo](api/method/redo.md) 方法执行后触发
- [onBeforeRedoStack](api/event/onbeforeredostack.md) - 在操作被添加到重做栈之前触发
- [onBeforeUndoStack](api/event/onbeforeundostack.md) - 在操作被添加到撤销栈之前触发

