---
sidebar_label: confirm
title: confirm 方法
description: "调用一个确认消息框"
---

# confirm

### Description

@short: 调用一个确认消息框

@signature: confirm: (config: ConfirmBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *ConfirmBoxConfig | string | number* -            要么是包含确认框配置的对象，要么是要显示的文本

### Returns
- `div` - (HTMLElement) - 确认框的 div 容器

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

- **id?** - (*number | string*) - 可选，确认框的 ID
- **text** - (*number | string*) - 确认框主体的文本
- **title?** - (*number | string*) - 可选，头部文本
- **ok?** - (*number | string*) - 可选，"OK" 按钮的文本
- **cancel?** - (*number | string*) - 可选，"Cancel" 按钮的文本
- **position?** - (*string*) - 可选，目前仅支持一个值 - "top"，其他值将导致显示为 "center-align"
- **width?** - (*string*) - 可选，确认框的宽度（以 CSS \<length\> 或 \<percentage\> 值设置，例如 "100px"、"50%"）
- **height?** - (*string*) - 可选，确认框的高度（以 CSS \<length\> 或 \<percentage\> 值设置，例如 "100px"、"50%"）
- **callback? (result): void** - 可选，在按钮点击时调用的函数。参数为 *true* 或 *false*，取决于所点击的按钮
    - **_result_** - (*boolean*) - 点击按钮的结果：**true** 表示 "OK"，**false** 表示 "Cancel"。

有关 confirm 消息框可用配置选项的更多详细信息，请参阅 [弹出消息与模态框](guides/message-boxes.md) 文章。

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [弹出消息和模态框](guides/message-boxes.md)

### Change log
- 新增于 4.0 版本