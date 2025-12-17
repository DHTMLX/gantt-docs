---
sidebar_label: alert
title: alert method
description: "调用 alert 消息框"
---

# alert

### Description

@short: 调用 alert 消息框

@signature: alert: (config: AlertBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *AlertBoxConfig | string | number* -           可以是包含 alert 框设置的对象，也可以是直接显示的文本内容

### Returns
- ` div` - (HTMLElement) - 包含 alert 框的 div 元素

### Example

~~~jsx
var box = gantt.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});

// 或者
var box = gantt.alert("This is an alert box");
~~~

### Details

配置对象支持以下属性:

- **id?** - (*number | string*) - 可选，alert 框的 ID
- **text** - (*number | string*) - alert 框中的主要文本内容
- **title?** - (*number | string*) - 可选，标题文本
- **ok?** - (*number | string*) - 可选，"确定"按钮的标签
- **position?** - (*string*) - 可选，alert 框的位置；目前仅支持 "top"，其他值默认为 "center-align"
- **width?** - (*string*) - 可选，alert 框的宽度，使用 CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 或 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 格式，例如 "100px"、"50%"
- **height?** - (*string*) - 可选，alert 框的高度，使用 CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 或 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 格式，例如 "100px"、"50%"
- **callback? (result): void** - 可选，按钮点击时触发的函数。参数 *result* 始终为 *true*（因为只有一个"确定"按钮）
    - **_result_** - (*boolean*) - 表示点击按钮的结果，始终为 **true**


有关 alert 框配置选项的更多详情，请参阅 [弹出消息与模态框](guides/message-boxes.md) 文章。

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [弹出消息与模态框](guides/message-boxes.md)

### Change log
- 版本 4.0 中新增

