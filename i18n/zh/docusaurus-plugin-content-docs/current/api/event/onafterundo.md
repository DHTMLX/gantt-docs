---
sidebar_label: onAfterUndo
title: onAfterUndo event
description: "在调用 undo() 方法之后触发"
---

# onAfterUndo

### Description

@short: 在调用 undo() 方法之后触发

@signature: onAfterUndo: (action: any[]) =\> void;

### Parameters

- `action` - (required) *数组* - 一个命令对象数组

### Example

~~~jsx
gantt.attachEvent("onAfterUndo",function(action){
    // 在这里插入您的自定义逻辑
});
~~~

### Related samples
- [Gantt 的撤销/重做变更](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 该事件是 **undo** 扩展的一部分，因此请确保已启用 [undo](guides/extensions-list.md) 插件。更多详细信息请参阅 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::


**action** 参数是一个命令对象数组，每个对象包含以下属性:
 
- **type** - (*string*) 描述命令类型:"add"、"remove" 或 "update"
- **entity** - (*string*) 指示被修改的对象类型:"task" 或 "link"
- **value** - (*object*) 变更后的任务或链接对象 
- **oldValue** - (*object*) 变更前的任务或链接对象


如果没有应用任何变更，`action` 参数将等于 null。可能发生在调用 [gantt.undo()](api/method/undo.md) 时，但变更被 [onBeforeUndo](api/event/onbeforeundo.md) 取消或栈为空。

### Related API
- [undo](api/method/undo.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Change log
- 在版本 4.0 中新增
- 在版本 5.2 中新增了 **action** 参数