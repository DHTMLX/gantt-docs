---
sidebar_label: confirm
title: confirm method
description: "显示一个 confirm 消息框"
---

# confirm

### Description

@short: 显示一个 confirm 消息框

@signature: confirm: (config: ConfirmBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *ConfirmBoxConfig | string | number* -            可以是 confirm 消息框的配置对象，也可以只是要显示的文本内容

### Returns
- ` div` - (HTMLElement) - 包含 confirm 消息框的 div 元素

### Example

~~~jsx
var box = gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        if(result){
            gantt.message("Yes!");
        }else{
            gantt.message("No...");
        }
    }
});

// or
var box = gantt.confirm("Do you want to continue?");
~~~

### Details

配置对象包括以下属性:

- **id?** - (*number | string*) - confirm 消息框的可选标识符
- **text** - (*number | string*) - confirm 消息框内显示的主要文本
- **title?** - (*number | string*) - 可选的头部文本
- **ok?** - (*number | string*) - "确定"按钮的可选标签
- **cancel?** - (*number | string*) - "取消"按钮的可选标签
- **position?** - (*string*) - confirm 消息框的可选位置；当前仅支持 "top"，否则默认为"居中对齐"
- **width?** - (*string*) - confirm 消息框的可选宽度，使用 CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 或 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 值，例如 "100px"、"50%"
- **height?** - (*string*) - confirm 消息框的可选高度，使用 CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 或 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 值，例如 "100px"、"50%"
- **callback? (result): void** - 可选的回调函数，在按钮被点击时触发。根据按下的按钮接收 *true* 或 *false*
    - **_result_** - (*boolean*) - 表示点击的按钮:点击"确定"为 **true**，点击"取消"为 **false**。

有关 confirm 消息框可用配置选项的更多详细信息，请参阅 [弹出消息与模态框](guides/message-boxes.md) 文章。

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [弹出消息与模态框](guides/message-boxes.md)

### Change log
- 版本 4.0 中新增

