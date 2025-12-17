---
sidebar_label: onAfterUndo
title: onAfterUndo event
description: "在执行 undo() 方法后立即触发"
---

# onAfterUndo

### Description

@short: 在执行 undo() 方法后立即触发

@signature: onAfterUndo: (action: any[]) =\> void;

### Parameters

- `action` - (required) *array* - 包含命令对象的数组

### Example

~~~jsx
gantt.attachEvent("onAfterUndo",function(action){
    // 你的代码写在这里
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 该事件是 **undo** 扩展的一部分，因此请确保已启用 [undo](guides/extensions-list.md) 插件。更多详细信息请参阅 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::


**action** 参数是一个命令对象数组，每个对象包含以下属性:
 
- **type** - (*string*) 描述命令类型:"add"、"remove" 或 "update"
- **entity** - (*string*) 指示被修改的对象类型:"task" 或 "link"
- **value** - (*object*) 变更后的任务或链接对象 
- **oldValue** - (*object*) 变更前的任务或链接对象


如果没有发生任何更改，**action** 参数将为 === null。此情况可能发生在调用 [gantt.undo()](api/method/undo.md) 但操作被 [onBeforeUndo](api/event/onbeforeundo.md) 取消，或撤销栈为空时。

### Related API
- [undo](api/method/undo.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Change log
- 版本 4.0 中新增
- 版本 5.2 中引入了 **action** 参数

