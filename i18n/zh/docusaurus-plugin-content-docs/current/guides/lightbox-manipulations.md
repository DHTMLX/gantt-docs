---
title: "使用 Lightbox 元素"
sidebar_label: "使用 Lightbox 元素"
---

# 使用 Lightbox 元素

## 获取/设置控件值

要获取/设置 lightbox 控件的值，请使用 [getLightboxSection](api/method/getlightboxsection.md) 方法，如下所示：

~~~js
// 获取值
var value = gantt.getLightboxSection('description').getValue();

// 设置值
gantt.getLightboxSection('description').setValue('abc');
~~~


## 检查 lightbox 是否打开

要检查当前 lightbox 是处于打开还是关闭状态，请使用由 [getState](api/method/getstate.md) 方法返回的状态对象中的 **lightbox** 属性。

 如果 lightbox 打开 - 该方法将返回打开任务的 id，
否则返回 'null' 或 'undefined'

~~~js
if (gantt.getState().lightbox){
    // lightbox 打开时的代码
} else {
    // lightbox 关闭时的代码
}
~~~

## 将数据属性映射到 lightbox 的各个部分

要将数据属性映射到 lightbox 的某个部分，请使用 section 对象的 **map_to** 属性：

~~~js
// 将 "holders" 区块映射到名为 "holder" 的数据属性
gantt.config.lightbox.sections = [
    {name:"description",height:38, type:"textarea", map_to:"text", focus:true},
    {name:"holders",     height:22, type:"textarea", map_to:"holder"},      /*!*/                                                                
    {name:"time",         height:72, type:"duration", map_to:"auto"}
];
~~~


## 为 lightbox 的控件设置默认值

要为 lightbox 的某个 section 设置默认值，请使用该 section 对象的 **default_value** 属性。

例如，你添加了一个自定义 section 到 lightbox —— "Priority" —— 用来显示任务优先级。 当用户创建一个新事件时，该字段将保持空白。若要纠正此行为并默认设为低优先级，例如，将 lightbox 设为如下：

~~~js
var opts = [
    { key:1, label: "High" },                                            
    { key:2, label: "Normal" },                                         
    { key:3, label: "Low" }                                            
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, type:"textarea", map_to:"text",    focus:true},
    {name:"priority",      height:22, type:"select",      map_to:"priority",  /*!*/  
    options:opts, default_value:3},      /*!*/                                                                
    {name:"time",          height:72, type:"duration", map_to:"auto"}
];
~~~

:::note
**default_value** 属性只设置 lightbox 区块的初始值。这意味着新建事件只有在用户打开 lightbox 并保存事件后才会获得该值。
:::

要直接为新事件设置默认值，请使用 [onTaskCreated](api/event/ontaskcreated.md) 事件：

~~~js
gantt.attachEvent("onTaskCreated", function(id, task){
    task.priority = "Low";
    return true;
});
~~~

## 让某些事件隐藏某个 section

要使某个 section 对特定事件隐藏，请重新定义其 **set_value** 方法，如下所示：


~~~js
gantt.form_blocks.textarea.set_value = function(node, value, ev){
    node.firstChild.value = value || "";
    var style = ev.some_property ? "" : "none";
    node.style.display = style; // 编辑区域
    node.previousSibling.style.display = style; // 区块标题
    gantt.resizeLightbox(); // 调整 lightbox 尺寸
}
~~~

## 将 section 与其标签放在同一行显示

可以通过将 [wide_form](api/config/wide_form.md) 配置选项设为 *true*，将 lightbox 的 section 与标签放在同一行显示：

~~~js
gantt.config.wide_form = true; /*!*/

gantt.locale.labels.section_priority = "Priority";
gantt.locale.labels.section_status = "Status";


gantt.config.lightbox.sections = [
    {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    {name: "status", height:22, map_to: "status", type: "select", options: [         
        {key:1, label: "New"},                                                       
          {key:2, label: "Open"},                                                     
          {key:3, label: "Done"}                                                      
    ]},                                                                            
    {name: "priority", map_to: "priority", type: "radio", options: [
        {key: 1, label: "High"},
        {key: 2, label: "Normal"},
        {key: 3, label: "Low"},
    ]},
    {name: "time", type: "duration", map_to: "auto"}
];

gantt.init("gantt_here");
~~~

**相关示例** [Aligning Lightbox](https://snippet.dhtmlx.com/hf45hvr3)

## 按钮在 section header 中

可以在 section header 中放置自定义按钮。要向某个 section 的 header 添加按钮，请执行以下步骤：

- 在 section 对象中指定 **button** 属性：

~~~js
{name:"description", height:130, map_to:"text", type:"textarea", button:"help"}
~~~
- 设置按钮的标签文本：

~~~js
//'help' 对应于 'button' 属性的值
gantt.locale.labels.button_help = "Help label";
~~~

- 指定按钮点击的处理程序：

~~~
gantt.form_blocks.textarea.button_click = function(index,button,shead,sbody){
    // any custom logic
}
~~~
其中：

- **index** - (*number*) 节段索引。从 0 开始编号
- **button** - (*HTMLElement*) 按钮的 HTML 元素
- **shead** - (*HTMLElement*) 区段头部的 HTML 元素
- **sbody** - (*HTMLElement*) 区段主体的 HTML 元素

你可以通过以下 CSS 类定义按钮所使用的图片：

~~~js
.dhx_custom_button_help{
    background-image:url(imgs/but_help.gif);
}
~~~