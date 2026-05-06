---
title: "撤销/重做功能"
sidebar_label: "撤销/重做功能"
---

# 撤销/重做功能

dhtmlxGantt Chart 允许您对所做的更改进行撤销/重做。要启用此功能，需要通过 [gantt.plugins](api/method/plugins.md) 方法启用 **undo** 插件。

~~~js
gantt.plugins({
    undo: true
});
~~~

默认情况下，撤销和重做功能均已启用。要控制撤销/重做功能，请使用 [undo](api/config/undo.md) / [redo](api/config/redo.md) 配置选项。 

您可以通过关闭其中一个选项来分别使用 Undo 和 Redo：

~~~js
// 仅启用 Redo 功能
gantt.config.undo = false;
gantt.config.redo = true;
~~~


[Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)


## Undo/Redo API


要还原 Gantt 图中的更改，请使用 [undo](api/method/undo.md) 方法：

~~~js
gantt.undo();
~~~

若要重做之前已撤销的更改，请使用 [redo](api/method/redo.md) 方法：

~~~js
gantt.redo();
~~~

从 v6.3 开始，**undo()/redo()** 方法也可通过 **gantt.ext.undo** 对象使用。请参阅 [Undo Extension](guides/undo-ext.md) 文章。 

## 获取存储的 Undo/Redo 操作栈

Gantt 图中的所有用户操作都实现为包含命令对象集合的数组。Gantt 会存储最近执行的命令栈。
**undo** 扩展可以从中进行反向操作并在 Gantt 中执行它们。 

当你需要撤销或重做一个命令时，扩展会获取最近的命令对象并执行相应的方法。

要获取存储的 undo 操作栈，请使用 [getUndoStack](api/method/getundostack.md) 方法：

~~~js
var stack = gantt.getUndoStack();
~~~

要返回存储的 redo 操作栈，请使用 [getRedoStack](api/method/getredostack.md) 方法：

~~~js
var stack = gantt.getRedoStack();
~~~

返回的栈是用户操作的数组。每个用户操作包含一组命令：

- <span class="subproperty">**UndoRedoAction**</span> - (*object*) - 存储 Undo 或 Redo 操作命令的对象
    - **_commands_** - (*UndoRedoCommand[]*) - 存储 Undo 或 Redo 操作的变更（命令）的数组


一个命令是具有以下属性的对象：

- <span class="subproperty">**UndoRedoCommand**</span> - (*object*) - 存储 **Task** 或 **Link** 对象的初始状态和更新状态的对象：
    - **_type_** - (*string*) - 命令的类型：“add/remove/update”
    - **_entity_** - (*string*) - 被更改对象的类型："task" 或 "link"
    - **_value_** - (*Task | Link*) - 已更改的 task/link 对象 
    - **_oldValue_** - (*Task | Link*) - 变更前的 task/link 对象


请看下面的示例：

![get_undo_stack](/img/get_undo_stack.png)

The **getUndoStack()** 方法返回一个包含 2 个 undo 用户操作的栈。第一项包含 3 条命令，第二项包含 1 条命令。

从 v6.3 开始，**getUndoStack()/getRedoStack()** 方法也可通过 **gantt.ext.undo** 对象使用。请参阅 [Undo Extension](guides/undo-ext.md) 文章。 

## 清除存储的 Undo/Redo 命令栈


可以通过相关的 Gantt API 清除 Undo/Redo 命令的栈。 

要清除存储的 undo 命令栈，请使用 [clearUndoStack](api/method/clearundostack.md) 方法：

~~~js
gantt.clearUndoStack();
~~~

要清除存储的 redo 命令栈，请使用 [clearRedoStack](api/method/clearredostack.md) 方法：

~~~js
gantt.clearRedoStack();
~~~

从 v6.3 开始，**clearUndoStack()/clearRedoStack()** 方法也可通过 **gantt.ext.undo** 对象使用。请参阅 [Undo Extension](guides/undo-ext.md) 文章。

## 通过代码进行的撤销/重做变更 {#undoingredoingchangesmadefromcode}

可以对你在代码中所做的变更进行撤销/重做。要实现这一点，需要将 **undo()/redo()** 方法与 **gantt.ext.undo** 对象的 **saveState()** 方法结合使用。 

Gantt 本身不会跟踪你直接对代码所做的变更，因此 Gantt 无法保存任务/链接的前一个状态。要让 Gantt 在对任务/链接进行代码变更之前保存其初始值，需要应用 **saveState()** 方法。该方法必须在你开始修改任务之前调用。

不过，Gantt 无法自行判断你通过 API 完成修改的时机。要向 Gantt 指示你已完成更新任务或链接，需要应用 **updateTask()** 或 **updateLink()** 方法。然后先前的状态和新状态将被保存到 undo 用户操作的栈中。

例如，以下演示如何在代码将任务的文本重新分配为另一个值后，回滚初始文本：

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

saveState() 方法在将 id = 1 的任务文本更新为 "modified" 之前，保存了任务的 "task 1" 文本。然后 gantt.ext.undo.undo() 方法将代码中的修改恢复到初始值。 

有关 saveState() 方法的详细信息，请参阅 [Undo Extension](guides/undo-ext.md) 文章。

## 配置 Undo 功能


有若干设置可帮助调整 Undo 操作。

要指定 Undo 将应用的操作，请使用 [undo_actions](api/config/undo_actions.md) 参数：

~~~js
gantt.config.undo_actions = {
    update:"update",
    remove:"remove", // 从数据存储中移除一个项
    add:"add"
};
~~~

要定义可以被还原的步骤数量，请应用 [undo_steps](api/config/undo_steps.md) 参数：

~~~js
gantt.config.undo_steps = 10;
~~~

默认情况下，可以撤销 10 个操作。

您还可以在 [undo_types](api/config/undo_types.md) 参数中指定 Undo 操作将应用的实体：

~~~js
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~


## API 事件列表


这里有一组有用的 Undo/Redo 相关事件：

- [onBeforeUndo](api/event/onbeforeundo.md) - 在调用 [undo] 方法之前触发
- [onAfterUndo](api/event/onafterundo.md) - 在调用 [undo] 方法之后触发
- [onBeforeRedo](api/event/onbeforeredo.md) - 在调用 [redo] 方法之前触发
- [onAfterRedo](api/event/onafterredo.md) - 在调用 [redo] 方法之后触发
- [onBeforeRedoStack](api/event/onbeforeredostack.md) - 在一个操作被添加到重做栈之前触发
- [onBeforeUndoStack](api/event/onbeforeundostack.md) - 在一个操作被添加到撤销栈之前触发