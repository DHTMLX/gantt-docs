---
title: "链接着色与样式"
sidebar_label: "链接着色与样式"
---

# 链接着色与样式

你可以改变连接任务的链接的样式，以获得甘特图所需的外观与体验。
以不同颜色着色依赖链接，可以让用户在视觉上对它们进行区分。

![coloring_links](/img/coloring_links.png)

要为链接设置自定义样式，你可以使用以下两种方法之一：

1. [重新定义默认链接模板](guides/colouring-lines.md#redefiningthelinkstemplate)
2. [在链接对象的属性中设置样式值](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject)

首先，让我们先了解链接结构的要素，从而掌握它们的定位、尺寸、功能以及默认样式的逻辑。

## 链接 DOM 元素结构 {#structureofthelinkdomelement}

链接的 DOM 元素具有以下结构：

- **.gantt_task_link**  - 静态定位，尺寸为零
    - **.gantt_line_wrapper/gantt_link_arrow/gantt_link_corner** - 绝对定位
        - **.gantt_link_line_down(/up/right/left)** - 包装元素内的静态定位
  
DOM 看起来如下：

~~~html
<div class="gantt_task_link" link_id="3">
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_left"></div>
      </div>
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_left"></div>
      </div>
    <div class="gantt_link_corner gantt_link_corner_left_down"></div>
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_down"></div>
      </div>
    <div class="gantt_link_corner gantt_link_corner_down_right"></div>
    <div class="gantt_line_wrapper">
        <div class="gantt_link_line_right"></div>
      </div>
    <div class="gantt_link_arrow gantt_link_arrow_right"></div>
</div>
~~~

其中：

- **gantt_task_link** - 具有零尺寸且静态定位的元素。它被用作链接所有部分的公共父级，例如应用样式：

~~~css
.gantt_task_link{
   --dhx-gantt-link-background:red;
} 
~~~

你可以将来自 [link_class](api/template/link_class.md) 模板的类应用于此元素。

#### 关键链接

关键链接的样式通过向 **gantt_task_link** 元素添加 **gantt_critical_link** 类来定义。

- **gantt_line_wrapper** 负责链接的位置和尺寸。它是透明、绝对定位，并略大于链接线，这使得用鼠标选取链接时更加方便。

该元素的宽度由 [link_wrapper_width](api/config/link_wrapper_width.md) 配置属性定义。

~~~js
gantt.config.link_wrapper_width = 30;
~~~

- **gantt_link_arrow** - 链接箭头。它是绝对定位的。根据箭头指向的方向，元素可以带有相应的附加类：
    - **gantt_link_arrow_right**,
    - **gantt_link_arrow_left**,
    - **gantt_link_arrow_up**, 或
    - **gantt_link_arrow_down**。

现在仅使用 **gantt_link_arrow_right** 与 **gantt_link_arrow_down**。

**gantt_link_arrow** 元素的大小由 [link_arrow_size](api/config/link_arrow_size.md) 配置属性定义。

~~~js
gantt.config.link_arrow_size = 8;
~~~

- **gantt_link_line_(dir)** - 链接的可见元素。请使用 left/right/up/down 来替代元素名称中的 **dir** 部分。

该元素的宽度可以通过 [link_line_width](api/config/link_line_width.md) 配置属性进行修改：

~~~js
gantt.config.link_line_width = 3;
~~~

- **gantt_link_corner** - 链接线的圆角。圆角半径由 [link_radius](api/config/link_radius.md) 定义：

~~~js
gantt.config.link_radius = 2;
~~~

设置 **gantt.config.link_radius = 1** 将移除圆角。

## 重新定义链接的模板 {#redefiningthelinkstemplate}

要为依赖链接设定样式，请使用 [link_class](api/template/link_class.md) 模板。例如，要根据任务的优先级为链接着色，请使用如下代码：

按依赖类型着色链接
~~~js
gantt.templates.link_class = function(link){
    var types = gantt.config.links;
    switch (link.type){
        case types.finish_to_start:
            return "finish_to_start";
            break;
        case types.start_to_start:
            return "start_to_start";
            break;
        case types.finish_to_finish:
            return "finish_to_finish";
            break;
        case types.start_to_finish:
            return "start_to_finish";
            break;
    }
};
~~~


[Link styles](https://docs.dhtmlx.com/gantt/samples/04_customization/03_link_styles.html)


:::note
要为依赖链接的其他元素进行样式化，请使用 [Templates of Dependency Links](guides/dependency-templates.md) 文章中列出的模板。
:::

类似的方法也可以应用于任务。想了解更多，请在此处阅读 [guides/colouring-tasks.md#redefiningthetaskstemplate](guides/colouring-tasks.md#redefiningthetaskstemplate)。

## 在链接对象的属性中指定颜色 {#specifyingcolorinthepropertiesofthelinkobject}

要为一个依赖链接指定自定义颜色，可以向数据对象添加额外的属性：

- **color** - 链接的颜色

![link_color_property](/img/link_color_property.png)

:::note
注意，这是一个特殊属性。默认情况下，Gantt 会检查链接是否具有该属性；如果有，则将相关值应用到链接。否则，将应用预定义的颜色。
:::

在数据对象中设置链接颜色
~~~js
var tasks = {
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18},
     {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8, parent:1},
     {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8, parent:1}
  ],
  links:[
     {id:1, source:1, target:2, type:"1", color:"red"}, /*!*/
     {id:2, source:2, target:3, type:"0", color:"blue"},/*!*/
     {id:3, source:3, target:4, type:"0", color:"blue"},/*!*/
     {id:4, source:2, target:5, type:"2", color:"green"}/*!*/
  ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getLink(4).color = "green";
~~~

[Related sample] [Link colors from the "color" property](https://snippet.dhtmlx.com/e5utei5g)

:::note
通过 color 属性添加自定义颜色后，紧接着会添加行内样式，该样式在所有样式中拥有最高优先级。因此，关键路径将不会被高亮显示，任何你添加以更改链接颜色的自定义样式也不会被应用。
:::

为使链接看起来是关键路径，可以使用以下代码：

~~~css
.gantt_critical_link {
  --dhx-gantt-link-background: #e63030 !important;
}
~~~

[Related sample] [Coloring critical tasks and links](https://snippet.dhtmlx.com/xipdml7a)

如果为链接对象的属性中任意一个属性赋值，则链接将获得额外的类 **"gantt_link_inline_color"**。你可以使用此类覆盖链接的其他样式：

~~~css
.gantt_link_inline_color {
    opacity:0.4
}
~~~

这些属性可以具有任何有效的 CSS 颜色值，例如以下所有记法都是有效的：

~~~js
link.color = "#FF0000";
link.color = "red";
link.color = "rgb(255,0,0)";
~~~


类似的方法也可应用于任务。更多信息请在此处阅读 [guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)。