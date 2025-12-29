---
title: "与 JQuery 集成"
sidebar_label: "与 JQuery 集成"
---

# 与 JQuery 集成

在使用 JQuery 库时，可以通过熟悉的语法将甘特图添加到页面中。

以下是使用 JQuery 初始化基本甘特图的示例:

**使用 JQuery 初始化甘特图**
~~~js
$(".mygantt").dhx_gantt({
    data:demo_tasks,
    scales:[
        { unit:"year",step:1,format:"%Y"}
    ]
});
$("#gantt1").dhx_gantt().parse(tasksA);
~~~

~~~html
<div class="mygantt" id='gantt1' style='width:100%; height:30%;'></div>
~~~


[jQuery integration](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)


详细说明:

- **".mygantt"** - 一个兼容 jQuery 的 CSS 选择器，用于标识甘特图渲染的容器
- **dhx_gantt()** 方法用于创建 dhtmlxGantt 实例。它接收一个配置对象作为参数:
  - **data** - (*object*) 要加载到甘特图的数据集
  - **[scales](api/config/scales.md)** - (*array*) 定义时间刻度的设置列表
  
:::note
通过 jQuery 初始化的甘特图，与直接用 JavaScript 创建的甘特图使用相同的配置选项和 API。
:::


[jQuery integration](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)

