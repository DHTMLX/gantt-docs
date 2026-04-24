---
sidebar_label: onBeforeUndo
title: onBeforeUndo 事件
description: "在调用 undo() 方法之前触发"
---

# onBeforeUndo

### Description

@short: 在调用 undo() 方法之前触发

@signature: onBeforeUndo: (action: any[]) =\> boolean;

### Parameters

- `action` - (required) *array* - 一个命令对象数组

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否会被触发（true）或取消（false）

### Example

~~~jsx
gantt.attachEvent("onBeforeUndo", function(action){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
本事件在 **undo** 扩展中定义，因此您需要激活 [undo](guides/extensions-list.md#undo) 插件。有关详细信息，请参阅 [Undo/Redo Functionality](guides/undo-redo.md) 文章。
:::

该事件是可阻止的。返回 *false* 将取消后续处理。

The **action** parameter presents an array of command objects, each of which includes the following set of attributes:
 
- **type** - (*string*) 命令的类型： "add/remove/update"
- **entity** - (*string*) 被更改对象的类型： "task" 或 "link"
- **value** - (*object*) 已变更的任务/链接对象 
- **oldValue** - (*object*) 变更前的任务/链接对象

### Related API
- [undo](api/method/undo.md)
- [onAfterUndo](api/event/onafterundo.md)
- [onBeforeUndoStack](api/event/onbeforeundostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Update log
- 于 4.0 版本新增