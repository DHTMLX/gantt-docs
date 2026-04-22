---
sidebar_label: onBeforeRedoStack
title: onBeforeRedoStack 事件
description: "在将动作加入到重做栈之前触发"
---

# onBeforeRedoStack

### Description

@short: 在将动作加入到重做栈之前触发

@signature: onBeforeRedoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - 一个用户操作，作为命令对象数组

### Returns
- ` result` - (boolean) - 定义事件的默认操作是触发（true）还是取消（false）

### Example

~~~jsx
gantt.attachEvent("onBeforeRedoStack", function(action){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

:::note
此事件在 **undo** 扩展中定义，因此你需要启用 [undo](guides/extensions-list.md#undo) 插件。请在 [Undo/Redo Functionality](guides/undo-redo.md) 文章中阅读详细信息。
:::

- 事件是可阻止的，返回 false 将取消后续处理。
- 如果事件被阻塞，重做将不会从事件参数中捕获动作。
- 事件动作可以被修改。

### Related API
- [onBeforeUndoStack](api/event/onbeforeundostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- 已在版本 5.2 中新增