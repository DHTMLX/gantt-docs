--- 
title: "单选按钮控件" 
sidebar_label: "单选按钮控件" 
---

# 单选按钮控件

一组选项，一次只能从中选择一个。

![单选按钮](/img/radiobutton_control.png)

[单选控件](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_radio.html)

## 初始化

要将 **单选按钮控件** 添加到 lightbox，请按照以下步骤：

1) 将一个区域添加到 lightbox 的配置中：

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

2) 为该区域设置标签：

~~~js
gantt.locale.labels.section_priority = "Priority";
~~~

[单选控件](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_radio.html)


## 属性

以下属性对 **单选按钮控件** 非常重要并且常被设置（完整列表请参见此处 [api/config/lightbox.md](api/config/lightbox.md)）：

- **name** - (*string*) 区段名称 
- **map_to** - (*string*) 将映射到该区段的数据属性的名称
- **type** - (*string*) [区段控件的类型](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) 一个对象数组。定义控件的可选项（用于 **select**、**checkbox** 和 **radio** 控件）。数组中的每个对象指定一个选项，具有以下属性：
    - **key** - (*string*) 选项的标识符
    - **label** - (*string*) 选项标签
- **focus** - (*boolean*) 若设置为 *true*，打开 lightbox 时该区段将获得焦点
- **default_value** - (*any*) 区段控件的默认值。仅在输入值未定义时应用


## 使用数据填充控件

通常，要为 **单选按钮控件** 设置值，请使用 [options](api/config/lightbox.md) 参数：

~~~js
gantt.config.lightbox.sections = [        
    {name: "priority", map_to: "priority", type: "radio", options: [
        {key: 1, label: "High"},
        {key: 2, label: "Normal"},
        {key: 3, label: "Low"},
    ]}        
];
~~~

在 [options](api/config/lightbox.md) 参数中的项有 2 个必填属性：

- **key** - (*string*) 选项的标识符
- **label** - (*string*) 选项标签