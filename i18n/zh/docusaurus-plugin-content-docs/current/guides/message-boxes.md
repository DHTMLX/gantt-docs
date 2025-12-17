---
title: "弹出消息与模态框"
sidebar_label: "弹出消息与模态框"
---

弹出消息与模态框
======================

在Gantt图中，消息用于告知用户错误、确认或否定操作、选择选项等。这些消息基于[a fork of the dhtmlxMessage repository](https://github.com/DHTMLX/message)实现，因此dhtmlxGantt的消息也支持dhtmlxMessage的所有功能。

主要有两类消息类型:[简单弹出消息框](guides/message-boxes.md#jibendanchuxiaoxi)和带有按钮、会阻止应用交互的[模态消息框](guides/message-boxes.md#motaixiaoxikuang)。

模态消息框分为三种类型:

- [警告消息框](#alert)
- [确认消息框](#confirm)
- [模态框](#modal)


## 基本弹出消息

要显示一个基本的模态消息框，可以使用 [gantt.message](api/method/message.md) 方法。必需的参数是消息文本:

~~~js
gantt.message("The task is updated");
~~~

消息框有三种样式:

- 默认消息框（**type:"info"**）

![default_message](/img/default_message.png)
  
- 错误消息框（**type:"error"**）

![error_message](/img/error_message.png)

- 警告消息框（**type:"warning"**）

![warning_message](/img/warning_message.png)

要创建所需类型的消息框，请通过 *type* 属性设置相应的值:

~~~js
// 创建一个错误消息框
gantt.message({type:"error", text:"Invalid data format"});
~~~


[Gantt message types](https://docs.dhtmlx.com/gantt/samples/04_customization/20_message_types.html)


如需自定义消息框样式，可通过type参数指定CSS类，具体说明见[这里](guides/message-boxes.md#yangshidingzhi)。

### 消息框位置

默认情况下，弹出消息框显示在窗口的右上角。与[模态消息框](guides/message-boxes.md#motaixiaoxikuang)不同，它们不会阻止与父应用的交互。可以通过设置 **gantt.message.position** 属性改变其位置:

~~~js
gantt.message.position = 'bottom';
~~~


**Related example:** [Message position](https://snippet.dhtmlx.com/tte3rx78)


可用的位置值有:

- **top** - 在右上角显示消息框（默认）
- **bottom** - 在右下角显示消息框
- **left** - 在甘特图下方左侧显示消息框
- **right** - 在甘特图下方右侧显示消息框

### 消息框显示时长

你可以通过 *expire* 参数自定义消息框的可见时间（以毫秒为单位），即消息框消失前的等待时间。默认值为4000毫秒。

如需更改时长或关闭自动消失功能，将expire参数设置为其他值或-1。设置为-1时，消息框只会在点击后消失。

~~~js
gantt.message({
    type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

### 通过API隐藏消息框

如需在消息框自动消失前手动隐藏它，可以使用 **gantt.message.hide(boxId)** 方法。它接受一个参数:

- **boxId** - 创建消息框时分配的id

~~~js
gantt.message({
    id:"myBox",
    text:"Page is loaded"
});

gantt.message.hide("myBox");
~~~

## 模态消息框

模态消息框会阻止与父应用的交互，直到用户采取操作（通常是点击按钮）。它们会在按钮点击后关闭，并在有回调函数时执行回调。

模态消息框有三种类型:

- [警告消息框](#alert):带有一个按钮的警告提示；
- [确认消息框](#confirm):带有"确定"和"取消"按钮的确认框；
- [模态框](#modal):可以拥有任意数量按钮的模态框。

常用属性包括:

- **id** - 消息框标识符；
- **title** - 标题文本；
- **type** - 消息框类型（如warning或error）；
- **text** - 消息内容；
- **ok** - "确定"按钮文本；
- **cancel** - "取消"按钮文本（仅限确认框）；
- **callback** - 按钮点击时调用的函数，根据点击的按钮返回*true*或*false*；
- **position** - 目前仅支持"top"，其他值会使消息框居中显示；
- **width** - 模态框宽度，可使用CSS [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length)或[percentage](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage)（如"100px"或"50%"）；
- **height** - 模态框高度，设置方式同宽度。

## 警告消息框 (#alert)

![alert](/img/alert.png)

警告消息框包含一个"确定"按钮。可以通过*ok*参数设置按钮文本:

- 简写形式（仅传递消息文本，其他参数使用默认值）:

~~~js
gantt.alert("Text");
~~~

- 完整形式（可指定多个选项，未指定的参数使用默认值）:

~~~js
gantt.alert({
    text:"some text",
    title:"Error!",
    ok:"Yes",
    callback:function(){...}
});
~~~


## 确认消息框 (#confirm)

![confirm](/img/confirm.png)

确认消息框有两个按钮:"确定"和"取消"。它们的文本可通过相应属性设置。

- 简写形式:

~~~js
gantt.confirm("ConfirmText");
~~~

- 完整形式:

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


## 模态框 (#modal)

![modalbox](/img/modalbox.png)

模态框具有以下特点:

- *text* 支持任意 *HTML* 内容；
- *buttons* 数组可定义多个按钮，数组项为按钮文本；
- *callback* 函数接收被点击按钮的*索引*。

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


### 配置模态框按钮 (#configuringmodalboxbuttons)

配置模态框按钮有两种主要方式:

- 简写形式:

~~~js
gantt.modalbox({
    // 其他设置
    buttons:["Save", "Delete", "Cancel"],
    callback: function(result){
           switch(result){
            case "0":
                //保存
                break;
            case "1":
                //删除
                break;
            case "2":
                //取消
                break;
        }    
    }
});
~~~

在这种形式下，回调函数接收被点击按钮的字符串索引（"0"、"1"、"2"等）。每个按钮会根据其小写标签自动生成CSS类，例如 *gantt_**save**_button*、*gantt_**delete**_button*、*gantt_**cancel**_button*。

你可以使用这些类自定义按钮样式:

~~~js
.gantt_delete_button div{
    background:red;
}
~~~

如果多个弹窗使用相同按钮名但需要不同样式，可以通过 **type** 配置实现:

~~~js
gantt.modalbox({
    // 其他设置
    type:"special_popup",
    buttons:["Save", "Delete", "Cancel"]
});
~~~

**type** 会被加上"gantt_"前缀，并作为类名添加到弹窗元素上:

~~~js
.gantt_special_popup .gantt_delete_button div{
      background:red;
}
~~~

- 完整形式:

你可以通过更详细的配置，显式定义按钮的CSS类和回调值:

~~~js
gantt.modalbox({
    // 其他设置
    buttons: [
        { label:"Save",   css:"link_save_btn",   value:"save" },
        { label:"Cancel", css:"link_cancel_btn", value:"cancel" },
        { label:"Delete", css:"link_delete_btn", value:"delete" }
    ],
    callback: function(result){
        switch(result){
            case "save":
                //保存
                break;
            case "cancel":
                //取消
                break;
            case "delete":
                //删除
                break;
        }
    }
});
~~~

**label** 是必需的，**css** 和 **value** 可选。如果省略，CSS类和回调值会像简写形式一样自动生成。

**css** 类会加上"gantt_"前缀，并添加到按钮元素上:

~~~js
.gantt_link_delete_btn div{
      background:red;
}
~~~


## 隐藏模态消息框

要手动关闭模态消息框，可使用 **gantt.modalbox.hide()** 方法，并传入模态框容器元素:

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

对于 **alert** 和 **confirm** 类型的模态框，同样适用 **gantt.modalbox.hide()** 方法:

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

## Gantt 如何处理模态框按钮

默认情况下，按钮名称仅为纯文本。当按钮名称被设置为HTML元素（如加粗字体或添加material icon）时，点击按钮所触发的回调函数会返回 *null*。

这是因为Gantt会监听被点击元素父节点上的特定属性。如果缺少这些预期属性，Gantt会返回 *null*。此外，Gantt会将你为按钮指定的所有元素包裹在`<div>`标签中。

因此，如果你点击文本时返回的是字符串元素，其父节点是空的`<div>`，结果就会是 `null`。而点击文本外的按钮时，其父节点具有必要属性，回调会返回预期结果:

- 确认框返回 *true/false*
- 对于模态框:
  - [简写形式](#configuringmodalboxbuttons)返回数组中的元素索引
  - [完整形式](#configuringmodalboxbuttons)返回 `value` 参数的值
  
这意味着，如果你想将HTML元素作为按钮名称，应将其包裹在两个带有`data-result`属性的`<div>`元素内。例如:

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

如果你希望按钮使用其他元素，请确保所有父元素也带有`data-result`属性。如下例中，按钮名称使用了`<u>`标签，并且它和它的两个父`<div>`都带有`data-result`属性:

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

## 样式定制

你可以通过自定义样式来调整任意消息框的外观。通常，可以通过 *type* 参数指定一个 CSS 类，即创建一个 CSS 类并将其名称赋值给该参数。

设置 'type' 参数时，请注意以下几点:

- 若要为 alert 和 confirm 框应用 CSS 类，请使用 'window-related' 方法初始化消息框。
- 若要为普通消息框应用 CSS 类，请使用 'common' 方法初始化消息框。
- CSS 类名应以 'gantt-' 作为前缀。
- 为确保样式正确应用，建议使用类似 **.gantt-some div** 的选择器来定位 gantt 消息框内部的元素。

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


**Related example:** [Styling message boxes](https://snippet.dhtmlx.com/p950vym3)


## 模态窗口与键盘交互

模态框的键盘支持由 **gantt.message.keyboard** 属性控制，该属性默认启用（*true*）。

默认情况下，模态框会阻止页面上的键盘事件，除了以下按键:

- "space" 和 "enter" 会将模态框结果设为 *true*
- "escape" 会将模态框结果设为 *false*

如果将 **gantt.message.keyboard** 设置为 *false*，则不再阻止键盘事件，这些按键也不会触发模态结果:

~~~js
gantt.message.keyboard = false; 
gantt.modalbox({...});
~~~

这样可以完全使用键盘，例如在模态框内输入内容。

