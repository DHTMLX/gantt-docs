---
title: "弹出消息与模态对话框"
sidebar_label: "弹出消息与模态对话框"
---

# 弹出消息与模态对话框

消息在甘特图中用于在出现错误、确认或拒绝某个操作、选择一个选项等情况下通知用户。甘特图消息以 [the fork of the dhtmlxMessage repository](https://github.com/DHTMLX/message) 的分支为基础。因此，dhtmlxMessage 的所有功能对于 dhtmlxGantt 的消息同样适用。

共有两种主要类型的消息：一个 [简单弹出消息框](guides/message-boxes.md#basic-popup-message) 和一个带按钮的 [模态消息框](guides/message-boxes.md#modal-message-boxes)，后者会阻塞应用程序的工作。

模态消息框可以归属于三种可能的类型之一：

- [警报消息框](#alert)
- [确认消息框](#confirm)
- [Modalbox](#modal)


## 基本弹出消息

要创建一个基本模态消息框，请使用 [gantt.message](api/method/message.md) 方法。该方法的必选参数是消息文本：

~~~js
gantt.message("The task is updated");
~~~

共有三种类型的消息框：

- 默认消息框 (**type:"info"**)

![default_message](/img/default_message.png)

- 错误消息框 (**type:"error"**)

![error_message](/img/error_message.png)

- 警告消息框 (**type:"warning"**)

![warning_message](/img/warning_message.png)

要创建所需的消息框，需要用相应的值来定义 *type* 属性：

~~~js
// 创建一个错误消息框
gantt.message({type:"error", text:"Invalid data format"});
~~~


[Gantt message types](https://docs.dhtmlx.com/gantt/samples/04_customization/20_message_types.html)


要对消息框应用不同的样式，需要通过 type 参数指定一个 CSS 类，如这里所述 [here](guides/message-boxes.md#styling)。

### 消息框定位

默认情况下，弹出消息框出现在窗口的右上角。与会遮盖父应用并阻塞其工作的 [模态消息框](guides/message-boxes.md#modal-message-boxes) 不同。你可以通过使用 **gantt.message.position** 属性来改变消息框的位置：

~~~js
gantt.message.position = 'bottom';
~~~

**相关示例**  [Message position](https://snippet.dhtmlx.com/tte3rx78)

消息位置有四个可能的取值：

- **top** - 显示在窗口右上角，默认设置

- **bottom** - 显示在窗口右下角

- **left** -  显示在窗口左侧，甘特下方

- **right** - 显示在窗口右侧，甘特下方

### 过期间隔

可以通过 *expire* 参数来定制消息框的过期间隔。它表示消息框在多长时间后消失的时间段（以毫秒为单位）。默认情况下，过期间隔为 4000 毫秒。

你可以修改该值，或通过将 expire 参数设置为 "-1" 来完全取消过期。在这种情况下，消息框仅在鼠标单击时消失。

~~~js
gantt.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### 使用 API 隐藏消息框

若要手动隐藏指定的消息框，不等待其自动消失，可以使用 **gantt.message.hide(boxId)** 方法。它接收一个参数：

- **boxId** - 在消息框构造函数中指定的框的 id

~~~js
gantt.message({
    id:"myBox",
    text:"Page is loaded"
});

gantt.message.hide("myBox");
~~~


## 模态消息框

模态消息框会阻塞父应用的工作，直到执行必要的操作（通常是按钮点击）。单击按钮时会关闭它们，若有回调函数则会执行。

存在三种类型的模态消息框：

- [警报消息框](#alert) - 带一个按钮的警报框；
- [确认消息框](#confirm) - 带有两个按钮（确认或取消）的确认框；
- [Modalbox](#modal) - 带有无限数量按钮的模态消息框。

这些框的常见属性包括：

- **id** - 消息框的 ID；
- **title** - 标题文本；
- **type** - 消息框的类型（例如警告或错误）；
- **text** - 消息框主体的文本；
- **ok** - “OK” 按钮的文本；
- **cancel** - “Cancel” 按钮的文本（用于 confirm 框）；
- **callback** - 按钮点击时调用的函数。参数为按下的按钮所对应的 true/false 值（具体取决于所点击的按钮）；
- **position** - 目前仅支持一个值 - "top"，其他值将导致居中对齐；
- **width** - 模态框的宽度（用 CSS 的 \<length\> 或 \<percentage\> 值设置，例如 "100px", "50%"）；
- **height** - 模态框的高度（用 CSS 的 \<length\> 或 \<percentage\> 值设置，例如 "100px", "50%"）。

## 警报消息框 {#alert}

![alert](/img/alert.png)

警报消息框包含一个 "OK" 按钮。要设置 "OK" 按钮的文本，请使用 *ok* 参数并将文本作为值传入：

- 简短形式

~~~js
gantt.alert("Text");
~~~

- 完整形式

~~~js
gantt.alert({
    text:"some text",
    title:"Error!",
    ok:"Yes",
    callback:function(){...}
});
~~~


## 确认消息框 {#confirm}

![confirm](/img/confirm.png)

确认消息框有两个按钮：一个 "OK" 按钮和一个 "Cancel" 按钮。按钮的文本在相应的属性中定义。

- 简短形式

~~~js
gantt.confirm("ConfirmText");
~~~

- 完整形式

~~~js
gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        gantt.message("Result: "+result);
    }
});
~~~


## 模态框 {#modal}

![modalbox](/img/modalbox.png)

模态框具备一些特性：

- 其 *text* 可以包含任意 *HTML* 内容；
- 它可以在 *buttons* 数组中指定多枚按钮，按钮文本即为按钮文本值；
- *callback* 函数将以所选按钮的 *index* 作为参数。

~~~js
gantt.modalbox({
    title:"Settings",
    text: " ... html code here... ",
    buttons:["Save", "Defaults", "Cancel"],
    callback: function(result){
        gantt.alert(result);
    }
});
~~~


### 配置 modalbox 按钮

定义 modalbox 按钮配置有两种主要方式：

- 简短形式： 

~~~js
gantt.modalbox({
    // other settings
    buttons:["Save", "Delete", "Cancel"],
    callback: function(result){
           switch(result){
            case "0":
                //Save
                break;
            case "1":
                //Delete
                break;
            case "2":
                //Cancel
                break;
        }    
    }
});
~~~

回调函数的结果将等于按钮数组中被按下的按钮的索引的字符串形式（"0","1","2",...）。每个按钮将从其标签转换为小写后获得一个 CSS 类，例如 gantt_save_button、gantt_delete_button、gantt_cancel_button。这些类可用于为按钮设置样式：

~~~js
.gantt_delete_button div{
    background:red;
}
~~~

如果同一个按钮名称被多个弹出框使用且需要不同样式，可以使用 **type** 配置：

~~~js
gantt.modalbox({
    // other settings
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~

该 **type** 将在前面加上 "gantt_" 前缀并作为类名添加到弹出框元素上：

~~~js
.gantt_special_popup .gantt_delete_button div{
      background:red;
}
~~~

- 完整表单：

可以使用更长的配置形式显式定义按钮的 CSS 类和回调值：

~~~js
gantt.modalbox({
    // other settings
    buttons: [
        { label:"Save",   css:"link_save_btn",   value:"save" },
        { label:"Cancel", css:"link_cancel_btn", value:"cancel" },
        { label:"Delete", css:"link_delete_btn", value:"delete" }
    ],
    callback: function(result){
        switch(result){
            case "save":
                //Save
                break;
            case "cancel":
                //Cancel
                break;
            case "delete":
                //Delete
                break;
        }
    }
});
~~~

其中 **label** 参数是必填项，而 **css** 和 **value** 选项可以省略。缺失的参数将按照按钮配置的短形式来计算：CSS 将从按钮标签的小写形式继承，按钮索引将用作值。

**css** 将以 "gantt_" 前缀并添加到按钮元素上作为类名：

~~~js
.gantt_link_delete_btn div{
      background:red;
}
~~~

## 隐藏模态消息框

要手动隐藏模态消息框，可以使用 **gantt.modalbox.hide()** 方法。作为参数，它接收模态框的 div 容器：

~~~js
var box = gantt.modalbox({    
    title:"Settings",
    text: " ... html code here... ",
    buttons:["Save", "Defaults", "Cancel"],
    callback: function(result){
        gantt.alert(result);
    }
});

gantt.modalbox.hide(box);
~~~

对于 **alert** 和 **confirm** 模态框，你也需要使用 **gantt.modalbox.hide()** 方法：

~~~js
var box = gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        gantt.message("Result: "+result);
    }
});

gantt.modalbox.hide(box);
~~~


## Gantt 如何与 Modalbox 按钮协作

默认情况下，按钮的名称以文本形式显示。如果按钮的名称被设为一个 HTML 元素（例如使字体变粗，或添加材料图标），点击按钮时回调函数的结果将为 *null*。

这是因为 Gantt 会监控所单击元素父元素的某些属性。如果缺少预期的属性，Gantt 将返回 *null*。此外，Gantt 会把所有你为按钮指定的元素都包裹在 `<div>` 标签中。

因此如果在文本被点击时返回一个字符串元素，其父元素将是一个空的 `<div>`，你将得到 `null`。但当在文本外部点击按钮时，其父元素是具有所有必要属性的元素，因此你将得到一些更可预期的结果：

- 对确认框，返回 *true* / *false*
- 对模态框：
  - 数组中按钮的索引号（对于 [configuring-modalbox-buttons](#configuring-modalbox-buttons) 的短表单）
  - `value` 参数的值（对于 [full form](#configuring-modalbox-buttons)）

这意味着如果你想把 HTML 元素设为按钮名称，你需要把所有内容包装在两个具有 `data-result` 属性的 div 元素中。示例：

~~~js
gantt.confirm({
    ok:`<div data-result="yes"><div data-result="yes"><i>Yes</i></div></div>`,
    cancel:`<div data-result="no"><div data-result="no"><i>No</i></div></div>`,
});

gantt.modalbox({
  buttons: [
   { label:`<div data-result="yes">
           <div data-result="yes"><i>Yes</i></div>
     </div>`,   
     css:"link_save_btn", value:"yes" },
   { label:`<div data-result="no">
           <div data-result="no"><i>No</i></div>
     </div>`, 
     css:"link_cancel_btn", value:"no" },
   { label:`<div data-result="cancel">
           <div data-result="cancel"><i>Cancel</i></div>
     </div>`, 
     css:"link_cancel_btn", value:"cancel" },
  ],
});
~~~

如果你需要为按钮使用其他元素，所有的父元素也应具有 `data-result` 属性。在下面的示例中，`<u>` 标签被用作按钮的名称，因此它们也具备与其他两个 `<div>` 父元素相同的 `data-result` 属性：

~~~js
gantt.confirm({
  ok:`<div data-result="yes">
      <div data-result="yes"><u data-result="yes"><i>Yes</i></u></div>
  </div>`,
  cancel:`<div data-result="no">
      <div data-result="no"><u data-result="no"><i>No</i></u></div>
  </div>`,
});

gantt.modalbox({
  buttons: [
    { label:`<div data-result="yes">
        <div data-result="yes">
            <u data-result="yes"><i>Yes</i></u>
           </div>
      </div>`,   
      css:"link_save_btn",  value:"yes" },
    { label:`<div data-result="no">
        <div data-result="no">
            <u data-result="no"><i>No</i></u>
        </div>
      </div>`, 
      css:"link_cancel_btn", value:"no" },
    { label:`<div data-result="cancel">
        <div data-result="cancel">
            <u data-result="cancel"><i>Cancel</i></u>
        </div>
      </div>`, 
      css:"link_cancel_btn", value:"cancel" },
  ],
});
~~~


## 样式

对于任何类型的消息框，你都可以定义自定义样式以实现所需外观。通常，通过 *type* 参数来指定合适的 CSS 类：你定义一个 CSS 类并将该参数设置为它的名称。

在设置 'type' 参数时，需要记住以下规则：

- 要为警报和确认框设置 CSS 类，必须使用“与窗口相关的”初始化方式来初始化这类框；
- 要为消息框设置 CSS 类，必须使用“通用的”初始化方式来初始化；
- CSS 类名应带有 'gantt-' 前缀；
- 为了正确应用样式，需将类名写成 **.gantt-some div**，以指明它是为甘特消息中的元素而设。

~~~js
<style type="text/css">
.gantt-myCss div{
    font-weight:bold;
    color:wheat;
    background-color:crimson;
}
</style>


gantt.message({ type:"myCss", text:"some text" });
~~~

**相关示例** [Styling message boxes](https://snippet.dhtmlx.com/p950vym3)
## 模态窗口与键盘交互

模态框的键盘功能由 **gantt.message.keyboard** 属性控制。初始时，它被设置为 *true*。

默认情况下，模态框会阻塞页面的键盘事件。可用的按键只有：

- "space" 与 "enter" - 将 *true* 设为模态框的结果；
- "escape" - 将 *false* 设为模态框的结果。

通过将 **keyboard** 属性设为 *false*，你将启用键盘事件（并禁用上述按键）：

~~~js
gantt.message.keyboard = false; 
gantt.modalbox({...});
~~~

这允许使用完整的键盘，例如在模态框内的输入框中输入值。