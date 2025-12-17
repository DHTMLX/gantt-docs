---
sidebar_label: onBeforeUndoStack
title: onBeforeUndoStack event
description: "在操作被推入撤销栈之前触发。"
---

# onBeforeUndoStack

### Description

@short: 在操作被推入撤销栈之前触发。

@signature: onBeforeUndoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - 表示用户操作的一组命令对象数组

### Returns
- ` result` - (boolean) - 决定事件的默认行为是否继续执行（true）或被阻止（false）

### Example

~~~jsx
gantt.attachEvent("onBeforeUndoStack",function(action){
    // 在这里编写你的代码
    return true;
});
~~~

### Details

:::note
 此事件属于**undo**扩展的一部分，因此请确保已启用 [undo](guides/extensions-list.md) 插件。更多信息请参见 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::


- 此事件可以被阻止；返回 false 将停止后续处理。
- 阻止此事件会阻止撤销捕获事件参数中的操作。
- 你可以修改事件中的操作数组。

### Related API
- [onBeforeRedoStack](api/event/onbeforeredostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 版本 5.2 中新增

