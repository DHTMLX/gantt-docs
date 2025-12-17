---
sidebar_label: modalbox
title: modalbox method
description: "打开一个 modalbox"
---

# modalbox

### Description

@short: 打开一个 modalbox

@signature: modalbox: (config: ModalBoxConfig) =\> HTMLElement

### Parameters

- `config` - (required) *ModalBoxConfig* - modal box 的配置设置

### Returns
- ` div` - (HTMLElement) - 包含 modalbox 的 div 元素

### Example

~~~jsx
let box = gantt.modalbox({
    title: "Close",
     type: "alert-warning"
});
~~~

### Details

配置对象包含以下属性:

- **id?** - (*number | string*) - 可选，modal box 的唯一标识符
- **text** - (*number | string*) - modal box 内显示的内容文本
- **title?** - (*number | string*) - 可选，modal box 的标题文本
- **position?** - (*string*) - 可选，控制 modal box 的位置；目前仅支持 "top"，其他值默认居中对齐 ("center-align")
- **buttons** - (*string[] | number[] | ModalboxButton[]*) - 指定要显示按钮的数组
- **width?** - (*string*) - 可选，使用 CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 或 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 单位设置 modal box 宽度，例如 "100px" 或 "50%"
- **height?** - (*string*) - 可选，使用 CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 或 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 单位设置 modal box 高度，例如 "100px" 或 "50%"
- **callback? (result): void** - 可选，按钮点击时触发的函数。函数接收根据点击按钮返回的 *true* 或 *false*
    - **_result_** - (*string | number | boolean*) - 回调接收来自数组中被点击按钮的字符串化索引 ("0", "1", "2", ...)

ModalboxButton 类型包含以下属性:

- **label** - (*string | number*) - 按钮的标签文本
- **value?** - (*string | number | boolean*) - 可选，作为 *callback* 函数中 *result* 返回的值
- **css?** - (*string | number*) - 可选，按钮的自定义 CSS 类，需以 "gantt_" 前缀开头

有关 modalbox 配置选项的更多信息，请参阅 [弹出消息与模态框](guides/message-boxes.md) 文章。

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)

### Related Guides
- [弹出消息与模态框](guides/message-boxes.md)

### Change log
- 4.0 版本新增

