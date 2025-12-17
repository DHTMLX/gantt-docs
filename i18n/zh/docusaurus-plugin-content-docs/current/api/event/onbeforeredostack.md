---
sidebar_label: onBeforeRedoStack
title: onBeforeRedoStack event
description: "在操作被推入重做栈之前触发"
---

# onBeforeRedoStack

### Description

@short: 在操作被推入重做栈之前触发

@signature: onBeforeRedoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - 表示用户操作的命令对象数组

### Returns
- ` result` - (boolean) - 指示事件的默认行为是否继续执行（true）或被阻止（false）

### Example

~~~jsx
gantt.attachEvent("onBeforeRedoStack", function(action){
    // 在此处编写您的代码
    return true;
});
~~~

### Details

:::note
 此事件属于 **undo** 扩展的一部分，请确保已启用 [undo](guides/extensions-list.md) 插件。更多信息请参见 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::


- 通过返回 false 可以阻止该事件，停止后续处理。
- 阻止该事件会防止重做记录事件参数中传递的操作。
- 您可以在事件中修改这些操作。

### Related API
- [onBeforeUndoStack](api/event/onbeforeundostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 版本 5.2 中新增

