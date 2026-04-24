---
sidebar_label: alert
title: alert 方法
description: "调用一个警报消息框"
---

# alert

### Description

@short: 调用一个警报消息框

@signature: alert: (config: AlertBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (必填) *AlertBoxConfig | string | number* -            要么是包含警报框配置的对象，要么是要显示的文本

### Returns
- ` div` - (HTMLElement) - 警报框的 div 容器

### Example

~~~jsx
var box = gantt.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});

// or
var box = gantt.alert("This is an alert box");
~~~

### Details

警报消息框的配置对象使用以下属性：

- **id?** - (*number | string*) - 可选，警报框的 ID
- **text** - (*number | string*) - 警报框主体的文本
- **title?** - (*number | string*) - 可选，标题的文本
- **ok?** - (*number | string*) - 可选，"OK" 按钮的文本
- **position?** - (*string*) - 可选，警报框的位置，目前仅支持一个值 - "top"，任意其他值将显示为 "center-align"（居中对齐）
- **width?** - (*string*) - 可选，警报框的宽度（以 CSS \<length\> 或 \<percentage\> 值设置，例如 "100px", "50%"）
- **height?** - (*string*) - 可选，警报框的高度（以 CSS \<length\> 或 \<percentage\> 值设置，例如 "100px", "50%"）
- **callback? (result): void** - 可选，在按钮点击时调用的函数。接受参数 *true*（取决于所点击的按钮）
    - **_result_** - (*boolean*) - 所点击按钮的结果，总是返回 **true**（因为只有一个 "OK" 按钮）

对于支持的警报消息框配置选项的更多详细信息，请参阅 [弹出消息和模态对话框](guides/message-boxes.md) 文章。

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [弹出消息和模态对话框](guides/message-boxes.md)

### Change log
- 在版本 4.0 中新增