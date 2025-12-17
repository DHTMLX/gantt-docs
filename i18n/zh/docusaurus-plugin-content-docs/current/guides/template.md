---
title: "模板控件"
sidebar_label: "模板控件"
---

模板控件
=====================================

这是一个用于容纳部分 HTML 内容的容器。

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

[Template control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/05_template.html)


初始化
-----------------

要在 lightbox 中包含 **template** 控件，需要完成以下步骤:

1) 在 lightbox 配置中添加一个 section:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"template", height:16, type:"template", map_to:"my_template"}, /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

2) 为该 section 定义一个标签:

~~~js
gantt.locale.labels.section_template = "Details";
~~~

3) 通过事件（如 [onBeforeLightbox](api/event/onbeforelightbox.md) 事件）为控件填充内容:

~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
      var task = gantt.getTask(id);
       task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
    return true;
});
~~~


属性
--------------

以下是 **template** 控件常用的一些属性（完整列表请参见 [这里](api/config/lightbox.md)）:

- **name** - (*string*) 指定 section 的名称
- **height** - (*number*) 设置 section 的高度
- **map_to** - (*string*) 该 section 映射的数据属性
- **type** - (*string*) 定义[section 控件](guides/default-edit-form.md#lightboxcontrols)的类型
- **focus** - (*boolean*) 当设置为 *true* 时，lightbox 打开时该 section 会获得焦点

