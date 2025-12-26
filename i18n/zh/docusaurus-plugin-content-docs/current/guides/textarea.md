---
title: "Textarea 控件"
sidebar_label: "Textarea 控件"
---

# Textarea 控件

这是一个多行文本字段。

![textarea_control](/img/textarea_control.png)

## 初始化

默认情况下，弹出框（lightbox）中包含一个 **textarea** 控件。若需添加额外的 textarea 控件，请按照以下步骤操作:

1) 在 lightbox 配置中添加一个 section:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"desc", type:"textarea",focus:true},
    {name:"details",     height:38, map_to:"text", type:"textarea"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

2) 为新添加的 section 定义一个标签:

~~~js
gantt.locale.labels.section_details = "Details";
~~~

## 属性

以下是 **textarea** 控件常用的主要属性（完整列表请参见 [这里](api/config/lightbox.md)）:

- **name** - (*string*) section 的标识符
- **height** - (*number*) section 的高度
- **map_to** - (*string*) 绑定到 section 的数据属性
- **type** - (*string*) [section 控件](guides/default-edit-form.md#lightboxcontrols)的类型
- **focus** - (*boolean*) 若设置为 *true*，在弹出框打开时该 section 会获得焦点
- **default_value** - (*any*) 控件的初始值，仅在输入值为 undefined 时应用。注意，若 *map_to:"text"*，此属性无效

