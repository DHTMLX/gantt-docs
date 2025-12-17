---
sidebar_label: onAfterRedo
title: onAfterRedo event
description: "在 redo() 方法执行完毕后立即触发"
---

# onAfterRedo

### Description

@short: 在 redo() 方法执行完毕后立即触发

@signature: onAfterRedo: (action: any[]) =\> void;

### Parameters

- `action` - (required) *array* - 一个包含命令对象的数组，表示用户的操作动作

### Example

~~~jsx
gantt.attachEvent("onAfterRedo",function(action){
    // 在这里编写你的代码
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 此事件属于 **undo** 扩展的一部分，请确保已启用 [undo](guides/extensions-list.md#chexiao) 插件。更多详情请参阅 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::


**action** 参数包含一个命令对象数组，每个对象具有以下属性:
 
- **type** - (*string*) 指定命令类型:"add"、"remove" 或 "update"
- **entity** - (*string*) 表示被更改对象的类型:"task" 或 "link"
- **value** - (*object*) 更改后的任务或链接对象
- **oldValue** - (*object*) 更改前的任务或链接对象

如果没有需要应用的更改，**action** 参数将为 === null。这种情况可能发生在调用 [gantt.redo()](api/method/redo.md) 时，但更改被 [onBeforeRedo](api/event/onbeforeredo.md) 中的事件阻止，或者 redo 栈为空。

### Related API
- [redo](api/method/redo.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Change log
- 版本 4.0 中引入
- 版本 5.2 中新增 **action** 参数

