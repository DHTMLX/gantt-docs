--- 
title: "文本区域控件"
sidebar_label: "文本区域控件"
---

# 文本区域控件

一个多行文本字段。

![textarea_control](/img/textarea_control.png)

## 初始化

默认情况下，lightbox 中会添加一个 **textarea** 控件。若要再添加一个，请按下列步骤：

1) 将一个 section 添加到 lightbox 配置中：

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"desc", type:"textarea",focus:true},
    {name:"details",     height:38, map_to:"text", type:"textarea"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

2) 为该 section 设置标签：

~~~js
gantt.locale.labels.section_details = "Details";
~~~

## 属性

以下属性对 **textarea** 控件来说最重要且常用（完整列表请参阅 here: [api/config/lightbox.md](api/config/lightbox.md)）：

- **name** - (*string*) 区段名称 
- **height** - (*number*) 区段高度
- **map_to** - (*string*) 将映射到该区段的数据属性的名称
- **type** - (*string*) [section control](guides/default-edit-form.md#lightboxcontrols) 的类型
- **focus** - (*boolean*) 如果设置为 *true*，在打开 lightbox 时该区段将获得焦点
- **default_value** - (*any*) 该区段控件的默认值。仅当输入值未定义时应用。与 *map_to:"text"* 不兼容。