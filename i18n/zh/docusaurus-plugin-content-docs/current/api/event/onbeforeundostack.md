---
sidebar_label: onBeforeUndoStack
title: onBeforeUndoStack 事件
description: "在将操作添加到撤销栈之前触发"
---

# onBeforeUndoStack

### Description

@short: 在将操作添加到撤销栈之前触发

@signature: onBeforeUndoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (必需) *UndoRedoAction* - 以命令对象数组形式表示的用户操作

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否将被触发（true）或取消（false）

### Example

~~~jsx
gantt.attachEvent("onBeforeUndoStack",function(action){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

:::note
此事件在 **undo** 扩展中定义，因此你需要启用 [undo](guides/extensions-list.md#undo) 插件。请在 [Undo/Redo Functionality](guides/undo-redo.md) 文章中阅读详细信息。 
:::


- 该事件是可阻塞的，返回 false 将取消后续处理。
- 如果事件被阻塞，undo 将不会从事件参数中捕获操作。
- 事件中的操作可以被修改。

### Related API
- [onBeforeRedoStack](api/event/onbeforeredostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- 在版本 5.2 中新增