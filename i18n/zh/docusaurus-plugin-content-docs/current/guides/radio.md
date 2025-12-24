---
title: "单选按钮控件"
sidebar_label: "单选按钮控件"
---

# 单选按钮控件


该控件用于呈现一组选项，同一时间只能选择其中一个。

![Radio Button](/img/radiobutton_control.png)


[Radio control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_radio.html)


## 初始化


要在 lightbox 中包含**单选按钮**控件，需要进行以下设置:

1) 在 lightbox 配置中添加一个 section:

~~~js
var opts = [
    {key: 1, label: "High"},
    {key: 2, label: "Normal"},
    {key: 3, label: "Low"}                                        
];

gantt.config.lightbox.sections = [
    {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    {name: "priority", height: 22, map_to: "priority", type: "radio", options: [opts]}, /*!*/
    {name: "time", type: "duration", map_to: "auto"}
];
~~~

2) 为该 section 定义标签:

~~~js
gantt.locale.labels.section_priority = "Priority";
~~~
  

[Radio control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_radio.html)


## 属性


以下是**单选按钮**控件常用的一些关键属性（完整列表请参见[这里](api/config/lightbox.md)）:

- **name** - (*string*) section 的名称
- **map_to** - (*string*) section 对应的数据属性
- **type** - (*string*) [section 控件的类型](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) 定义可选项的对象数组（*用于 **select**、**checkbox** 和 **radio** 控件*）。每个对象代表一个选项，并包含:
    - **key** - (*string*) 选项的标识符，会与任务数据进行匹配以分配选项
    - **label** - (*string*) 选项显示的文本
- **focus** - (*boolean*) 如果设为 *true*，lightbox 打开时该 section 会自动获得焦点
- **default_value** - (*any*) 控件的默认值，仅在输入值未定义时应用            


## 为控件填充数据


要为**单选按钮**控件指定选项，请使用 [options](api/config/lightbox.md) 参数:

~~~js
gantt.config.lightbox.sections = [        
    {name: "priority", map_to: "priority", type: "radio", options: [
        {key: 1, label: "High"},
        {key: 2, label: "Normal"},
        {key: 3, label: "Low"},
    ]}        
];
~~~

[options](api/config/lightbox.md) 数组中的每一项都需要两个属性:

- **key** - 选项的标识符
- **label** - 选项显示的文本

