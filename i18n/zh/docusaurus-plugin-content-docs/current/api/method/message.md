---
sidebar_label: message
title: message method
description: "调用指定类型的消息框"
---

# message

### Description

@short: 调用指定类型的消息框

@signature: message: MessagePopupObject

### Parameters

- `config` - (required) *object | string | number* -            要么是包含消息框配置的对象，要么是要显示的文本

### Returns
- ` id` - (string | number) - message 框的标识符

### Example

~~~jsx
let box = gantt.message({ 
    type:"warning", 
    text:"Are you sure you want to do it?"
});

// or
box = gantt.message("This is the message");
~~~

### Details

配置对象支持以下属性:

- **id?** - (*number | string*) - 可选，弹出消息的 ID
- **text** - (*number | string*) - 弹出消息的内容
- **type?** - (*string*) - 可选，弹出消息的 CSS 类名
- **expire?** - (*number*) - 可选，弹出消息消失前的时间。-1 表示不会自行隐藏。


**message** 属性也可以是一个函数，或用作弹出 message 的配置对象，包含以下属性:

- **position** - (*string*) - 弹出消息的位置。可能的取值为： "top", "bottom", "left", "right"

~~~js
gantt.message.position = "left";
~~~
- **keyboard** - (*boolean*) - 指定 Gantt 是否应阻止键盘事件。默认值为 true。

~~~js
gantt.message.keyboard = false;
~~~
- **hide (id): any** - 一个用于隐藏弹出消息的函数。以 **id** 作为参数：
    - **_id_** - (*number | string*) - 弹出消息的 ID
~~~js
gantt.message.hide("popupId");
~~~

有关消息框支持的配置选项的更多详细信息，请参阅文章 [弹出消息与模态框](guides/message-boxes.md)。

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [弹出消息与模态框](guides/message-boxes.md)

### Change log
- 在 4.0 版本中新增