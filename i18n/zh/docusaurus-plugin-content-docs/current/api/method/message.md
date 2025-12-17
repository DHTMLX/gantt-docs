---
sidebar_label: message
title: message method
description: "打开指定类型的 message 框"
---

# message

### Description

@short: 打开指定类型的 message 框

@signature: message: MessagePopupObject

### Parameters

- `config` - (required) *object | string | number* -            可以是 message 框的配置对象，也可以是要显示的文本内容

### Returns
- ` id` - (string | number) - message 框的标识符

### Example

~~~jsx
let box = gantt.message({ 
    type:"warning", 
    text:"Are you sure you want to do it?"
});

// 或者
box = gantt.message("This is the message");
~~~

### Details

配置对象支持以下属性:

- **id?** - (*number | string*) - 可选，分配给弹出 message 的 ID
- **text** - (*number | string*) - 弹出 message 中显示的内容
- **type?** - (*string*) - 可选，应用于弹出 message 的 CSS 类名
- **expire?** - (*number*) - 可选，弹出 message 自动消失前的持续时间。值为 -1 表示保持可见直到手动关闭


**message** 属性也可以是一个函数，或用作弹出 message 的配置对象，包含以下属性:

- **position** - (*string*) - 弹出 message 显示的位置。可选值包括:"top", "bottom", "left", "right"

~~~js
gantt.message.position = "left";
~~~
- **keyboard** - (*boolean*) - 决定 Gantt 是否阻止键盘事件。默认值为 *true*。

~~~js
gantt.message.keyboard = false;
~~~
- **hide (id): any** - 隐藏弹出 message 的方法，接受 **id** 作为参数:
    - **_id_** - (*number | string*) - 要隐藏的弹出 message 的 ID
~~~js
gantt.message.hide("popupId");
~~~

有关 message 框可用配置选项的更多信息，请参阅 [弹出消息与模态框](guides/message-boxes.md) 文章。

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [弹出消息与模态框](guides/message-boxes.md)

### Change log
- 版本 4.0 新增

