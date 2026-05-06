---
title: "与 JQuery 的集成"
sidebar_label: "与 JQuery 的集成"
---

# 与 JQuery 的集成

如果你使用的是 jQuery 库，可以使用常用的语法在页面上渲染甘特图。

通过 JQuery 的标准甘特图可以按如下方式初始化：

**通过 JQuery 初始化的甘特图**
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


其中：

- **".mygantt"** - 一个与 jQuery 兼容的容器 CSS 选择器，用于创建甘特图 
- **dhx_gantt()** 方法用于实例化 dhtmlxGantt。作为参数，该方法接收一个配置对象：
  - **data** - (*object*) 将被加载到甘特图的数据集
  - **[scales](api/config/scales.md)** - (*array*) 一个包含时间刻度配置信息的数组
  
:::note
通过 jQuery 调用初始化的甘特图使用的配置和 API，与通过 JavaScript 初始化的标准甘特图相同。
:::


[jQuery integration](https://docs.dhtmlx.com/gantt/samples/01_initialization/07_jquery.html)