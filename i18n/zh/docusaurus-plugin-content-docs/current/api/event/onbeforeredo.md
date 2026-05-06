---
sidebar_label: onBeforeRedo
title: onBeforeRedo 事件
description: "在调用 redo() 方法之前触发"
---

# onBeforeRedo

### Description

@short: 在调用 redo() 方法之前触发

@signature: onBeforeRedo: (action: any[]) =\> boolean;

### Parameters

- `action` - (required) *array* - 作为命令对象数组的用户操作

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否会被触发（true）还是被取消（false）

### Example

~~~jsx
gantt.attachEvent("onBeforeRedo",function(action){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Related samples
- [Gantt中的撤销/重做变更](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
此事件在 **undo** 扩展中定义，因此您需要启用 [undo](guides/extensions-list.md#undo) 插件。请在 [Undo/Redo Functionality](guides/undo-redo.md) 文章中阅读详细信息。
:::

此事件是可阻塞的。返回 *false* 将取消后续处理。

**action** 参数表示一个命令对象的数组，每个对象包含以下属性集：
 
- **type** - (*string*) 命令的类型："add/remove/update"
- **entity** - (*string*) 被修改对象的类型： "task" 或 "link"
- **value** - (*object*) 更改后的任务/链接对象 
- **oldValue** - (*object*) 修改前的任务/链接对象

### Related API
- - [redo](api/method/redo.md)
- - [onAfterRedo](api/event/onafterredo.md)
- - [onBeforeRedoStack](api/event/onbeforeredostack.md)

### Related Guides
- [撤销/重做功能](guides/undo-redo.md)

### Change log
- 新增于版本 4.0