---
sidebar_label: onBeforeUndo
title: onBeforeUndo event
description: "在 undo() 方法执行之前触发"
---

# onBeforeUndo

### Description

@short: 在 undo() 方法执行之前触发

@signature: onBeforeUndo: (action: any[]) =\> boolean;

### Parameters

- `action` - (required) *array* - 包含命令对象的数组

### Returns
- ` result` - (boolean) - 决定事件的默认操作是否继续执行（true）或被阻止（false）

### Example

~~~jsx
gantt.attachEvent("onBeforeUndo", function(action){
    // 在这里编写你的代码
    return true;
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 该事件属于 **undo** 扩展的一部分，因此请确保启用了 [undo](guides/extensions-list.md) 插件。更多详情请参阅 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::

该事件可以被阻止。返回 *false* 将停止后续的任何处理。

**action** 参数是一个命令对象数组，每个对象包含以下属性:

- **type** - (*string*) 命令类型:"add"、"remove" 或 "update"
- **entity** - (*string*) 被更改对象的类型:"task" 或 "link"
- **value** - (*object*) 变更后的任务或链接对象
- **oldValue** - (*object*) 变更前的任务或链接对象

### Related API
- [undo](api/method/undo.md)
- [onAfterUndo](api/event/onafterundo.md)
- [onBeforeUndoStack](api/event/onbeforeundostack.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 版本 4.0 中新增

