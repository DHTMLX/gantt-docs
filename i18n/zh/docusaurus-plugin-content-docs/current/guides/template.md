---
title: "模板控件"
sidebar_label: "模板控件"
---

# 模板控件

一个包含一些 HTML 内容的容器。

![template_control](/img/template_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"template", height:16, type:"template", map_to:"my_template"}, /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.locale.labels.section_template = "Details";

gantt.attachEvent("onBeforeLightbox", function(id) {
      var task = gantt.getTask(id);
       task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
    return true;
});
~~~

[模板控件](https://docs.dhtmlx.com/gantt/samples/05_lightbox/05_template.html)


## 初始化

要将 **template** 控件添加到 lightbox，请按以下步骤操作：

1) 向 lightbox 配置中添加一个段：

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"template", height:16, type:"template", map_to:"my_template"}, /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

2) 为该段设置标签：

~~~js
gantt.locale.labels.section_template = "Details";
~~~

3) 通过某个事件设置控件的内容，例如 [onBeforeLightbox](api/event/onbeforelightbox.md) 事件：

~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
      var task = gantt.getTask(id);
       task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
    return true;
});
~~~


## 属性

以下属性在 **template** 控件中通常较为重要且常被设置（完整列表请参见 [这里](api/config/lightbox.md)）：

- **name** - (*string*) 段名称
- **height** - (*number*) 段高度
- **map_to** - (*string*) 将映射到该段的数据属性的名称
- **type** - (*string*) [section control] 的类型（参见 guides/default-edit-form.md#lightboxcontrols）
- **focus** - (*boolean*) 如果设置为 *true*，打开 lightbox 时该段将获得焦点