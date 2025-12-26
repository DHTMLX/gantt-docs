---
title: "任务着色"
sidebar_label: "任务着色"
---

# 任务着色

为任务着色有助于突出显示特定任务，使其更容易引起注意。

![coloring_tasks](/img/coloring_tasks.png)

有几种自定义任务样式的方法:

1. [重定义默认任务模板](guides/colouring-tasks.md#chongdingyirenwumoban)
2. [直接在任务对象属性中设置样式值](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject)
3. [从数据动态生成样式](guides/colouring-tasks.md#tongguoshujujiazaiyanse)

## 重定义任务模板

要通过模板自定义任务样式，可以使用 [task_class](api/template/task_class.md) 模板。例如，如果你想根据任务优先级为任务着色，可以使用如下代码:

**根据优先级为任务着色**
~~~css
<style>

    /* high */
    .gantt_task_line.high {
        --dhx-gantt-task-background: #d96c49;
        --dhx-gantt-task-color: #fff;
    }

    /* medium */
    .gantt_task_line.medium {
        --dhx-gantt-task-background: #f57730;
        --dhx-gantt-task-color: #fff;
    }

    /* low */
    .gantt_task_line.low {
        --dhx-gantt-task-background: #fff;
        --dhx-gantt-task-color: #fff;
    }

</style>
~~~

~~~js
gantt.templates.task_class  = function(start, end, task){
    switch (task.priority){
        case "1":
            return "high";
            break;
        case "2":
            return "medium";
            break;
        case "3":
            return "low";
            break;
    }
};
~~~

[Task styles](https://docs.dhtmlx.com/gantt/samples/04_customization/04_task_styles.html)


:::note
如需为任务的其他部分设置样式，请参考 [타임라인 영역의 템플릿](guides/timeline-templates.md) 文章中列出的模板。
:::

类似的方法也可以用于链接。更多详情见[此处](guides/colouring-lines.md#chongdingyilianjiemoban)。

## 在任务对象属性中指定样式

你可以通过在任务数据对象中添加最多三个特殊属性，来自定义任务的外观:

- **color** - 设置任务条的背景色
- **textColor** - 设置任务条内文本的颜色（不影响类型为 "milestone" 的任务）
- **progressColor** - 设置进度条的颜色（默认情况下，进度条为任务颜色的略深色，样式为 'background-color: rgb(54, 54, 54); opacity: 0.2'）

![task_color_properties](/img/task_color_properties.png)

:::note
这些属性是特殊处理的。如果任务存在这些属性，Gantt 会自动应用它们的值，否则使用默认颜色。
:::

**在数据对象中设置任务颜色**
~~~js
var tasks = {
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18, color:"red"},
     {id:2, text:"Task #1", start_date:"02-04-2013", 
         duration:8, color:"blue", parent:1},
     {id:3, text:"Task #2", start_date:"11-04-2013", 
         duration:8, color:"blue", parent:1}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getTask(1).color = "red";
~~~


[Specify inline colors for Tasks and Links](https://docs.dhtmlx.com/gantt/samples/04_customization/16_inline_task_colors.html)


:::note
当你通过 **color** 属性添加自定义颜色时，会应用内联样式，这将覆盖其他样式。这意味着关键路径高亮以及任何其他自定义背景或文本颜色样式都不会被应用。
:::

如需让任务显示为关键任务，可以使用以下 CSS:

~~~css
.gantt_critical_task {
  --dhx-gantt-task-background: #e63030 !important;
}
~~~


**Related example:** [为关键任务和链接着色](https://snippet.dhtmlx.com/xipdml7a)


如果某个任务设置了这些属性中的任意一个，任务会额外获得一个类 **"gantt_task_inline_color"**。


可以通过该类来覆盖其他样式，例如使用选择器 "*.gantt_task_line.gantt_task_inline_color*":

~~~css
.gantt_task_line.gantt_task_inline_color .gantt_task_progress {
    background-color: rgb(54, 54, 54);
    opacity: 0.2;
}
~~~

这些属性支持任何有效的 CSS 颜色格式，例如:

~~~js
task.color = "#FF0000";
task.color = "red";
task.color = "rgb(255,0,0)";
~~~

类似的方法同样适用于链接。更多信息见[这里](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject)。

## 通过数据加载颜色

当任务颜色来自后端数据--比如颜色与任务阶段或分配的资源相关，无法硬编码时，可以根据数据动态生成样式。

例如，假设你有一个可分配给任务的用户列表，每个用户有相关的颜色:

~~~js
[
    {"key":1, "label":"John", "backgroundColor":"#03A9F4", "textColor":"#FFF"},
    {"key":2, "label":"Mike", "backgroundColor":"#f57730", "textColor":"#FFF"},
    {"key":3, "label":"Anna", "backgroundColor":"#e157de", "textColor":"#FFF"},
    {"key":4, "label":"Bill", "backgroundColor":"#78909C", "textColor":"#FFF"},
    {"key":7, "label":"Floe", "backgroundColor":"#8D6E63", "textColor":"#FFF"}
]
~~~

在这种情况下，用户及其颜色是独立管理的，gantt 事先并不知道他们的 ID 或颜色。

你可以这样处理:

- 为该集合定义一个命名的 serverList:

~~~js
gantt.serverList("people");
~~~

- 通过 [gantt 数据格式](guides/supported-data-formats.md#daijihedejson) 或自定义 XHR 请求将选项加载到页面。

- 选项加载后，根据数据生成 CSS 样式:

~~~js
gantt.attachEvent("onLoadEnd", function(){
    // 为样式元素使用任意 id
    var styleId = "dynamicGanttStyles";
    
    // 如果重新加载带颜色的选项，则复用已有样式元素
    
    var element = document.getElementById(styleId);
    if(!element){
        element = document.createElement("style");
        element.id = styleId;
        document.querySelector("head").appendChild(element);
    }
    var html = [];
    var resources = gantt.serverList("people");

    // 为每个选项创建 CSS 样式并插入样式元素
    
    resources.forEach(function(r){
        if(r.backgroundColor && r.textColor){
            html.push(".gantt_task_line.gantt_resource_" + r.key + "{" +
                "--dhx-gantt-task-background:"+r.backgroundColor+"; " +
                "--dhx-gantt-task-color:"+r.textColor+"; " +
            "}");

        }
    });
    element.innerHTML = html.join("");
});
~~~

如果你使用的是 [resource datastore](api/config/resource_store.md)，请用 *r.id* 替换 *r.key* 作为资源 ID。

- 之后，可以通过 task_class 模板将生成的类分配给任务:

~~~js
gantt.templates.task_class = function (start, end, task) {
    var css = [];

    if(task.owner_id){
        css.push("gantt_resource_" + task.owner_id);
    }

    return css.join(" ");
};
~~~


[Assigning owners to tasks](https://docs.dhtmlx.com/gantt/samples/11_resources/01_assigning_resources.html)

