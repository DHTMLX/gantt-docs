---
title: "使用 Lightbox 元素"
sidebar_label: "使用 Lightbox 元素"
---

使用 Lightbox 元素
====================================

## 获取/设置控件的值

要获取或更新 lightbox 控件的值，可以像这样使用 [getLightboxSection](api/method/getlightboxsection.md) 方法:

~~~js
// 获取值
var value = gantt.getLightboxSection('description').getValue();

// 设置值
gantt.getLightboxSection('description').setValue('abc');
~~~

## 检查 lightbox 是否打开

要判断 lightbox 当前是打开还是关闭，可以检查 [getState](api/method/getstate.md) 方法返回的 state 对象中的 **lightbox** 属性。

 如果 lightbox 已打开，该方法返回已打开任务的 id；否则，返回 'null' 或 'undefined'。

~~~js
if (gantt.getState().lightbox){
    // lightbox 打开时的代码
} else {
    // lightbox 关闭时的代码
}
~~~

## 将数据属性映射到 lightbox 区块

要将数据属性关联到 lightbox 的某个区块，可以在 section 对象中使用 **map_to** 属性:

~~~js
// 将 "holders" 区块映射到名为 "holder" 的数据属性
gantt.config.lightbox.sections = [
    {name:"description", height:38, type:"textarea", map_to:"text", focus:true},
    {name:"holders",     height:22, type:"textarea", map_to:"holder"},      /*!*/                                                                
    {name:"time",         height:72, type:"duration", map_to:"auto"}
];
~~~

## 设置 lightbox 控件的默认值

要为 lightbox 区块指定默认值，可以在 section 对象中使用 **default_value** 属性。

例如，如果你在 lightbox 中添加了一个自定义的 "Priority" 区块来显示任务优先级，新建事件时该字段默认为空。可以如下设置默认值（如低优先级）:

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

如果希望在新建事件时直接分配默认值，可以使用 [onTaskCreated](api/event/ontaskcreated.md) 事件:

~~~js
gantt.attachEvent("onTaskCreated", function(id, task){
    task.priority = "Low";
    return true;
});
~~~

## 针对某些事件隐藏区块

要在某些事件中隐藏区块，可以重写其 **set_value** 方法，如下所示:


~~~js
gantt.form_blocks.textarea.set_value = function(node, value, ev){
    node.firstChild.value = value || "";
    var style = ev.some_property ? "" : "none";
    node.style.display = style; // 编辑区域
    node.previousSibling.style.display = style; // 区块标题
    gantt.resizeLightbox(); // 调整 lightbox 尺寸
}
~~~

## 将区块及其标签放在同一行

通过启用 [wide_form](api/config/wide_form.md) 选项，可以将区块及其标签放在同一行:

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


**Related example:** [Aligning Lightbox](https://snippet.dhtmlx.com/hf45hvr3)


## 在区块标题中添加按钮

可以通过以下步骤在区块标题中添加自定义按钮:

- 在 section 对象中添加 **button** 属性:

~~~js
{name:"description", height:130, map_to:"text", type:"textarea", button:"help"}
~~~
- 定义按钮的标签:

~~~js
//'help' 对应于 'button' 属性的值
gantt.locale.labels.button_help = "Help label";
~~~

- 实现按钮点击处理函数:

~~~
gantt.form_blocks.textarea.button_click = function(index, button, shead, sbody){
    // 在这里编写自定义逻辑
}
~~~
参数说明:

- **index** - (*number*) 区块的从零开始的索引
- **button** - (*HTMLElement*) 按钮元素本身
- **shead** - (*HTMLElement*) 区块标题元素
- **sbody** - (*HTMLElement*) 区块内容元素

如需指定按钮的图片，可使用以下 CSS 类:

~~~js
.dhx_custom_button_help{
    background-image: url(imgs/but_help.gif);
}
~~~

