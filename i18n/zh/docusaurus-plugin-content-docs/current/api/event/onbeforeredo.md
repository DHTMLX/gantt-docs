---
sidebar_label: onBeforeRedo
title: onBeforeRedo event
description: "在 redo() 方法执行之前触发"
---

# onBeforeRedo

### Description

@short: 在 redo() 方法执行之前触发

@signature: onBeforeRedo: (action: any[]) =\> boolean;

### Parameters

- `action` - (required) *array* - 表示用户操作的数组，由命令对象组成

### Returns
- ` result` - (boolean) - 决定事件的默认行为是否继续执行（true）或被阻止（false）

### Example

~~~jsx
gantt.attachEvent("onBeforeRedo",function(action){
    // 在这里编写你的代码
    return true;
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 此事件来自 **undo** 扩展，因此请确保已启用 [undo](guides/extensions-list.md#chexiao) 插件。更多细节请参见 [撤销/重做功能](guides/undo-redo.md) 文章。 
:::


此事件可以被阻止。返回 *false* 将阻止任何后续操作。

**action** 参数是一个命令对象数组，每个对象包含以下属性:
 
- **type** - (*string*) 命令类型:"add"、"remove" 或 "update"
- **entity** - (*string*) 被更改对象的类型:"task" 或 "link"
- **value** - (*object*) 变更后的任务或链接对象
- **oldValue** - (*object*) 变更前的任务或链接对象

### Related API
- [redo](api/method/redo.md)
- [onAfterRedo](api/event/onafterredo.md)
- [onBeforeRedoStack](api/event/onbeforeredostack.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 版本 4.0 新增

