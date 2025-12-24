---
title: "任务类型"
sidebar_label: "任务类型"
---

# 任务类型


:::info
本功能仅在 PRO 版本中提供。
:::

在甘特图中有三种预定义的任务类型可供展示（[你也可以创建自定义类型](guides/task-types.md#chuangjianzidingyileixing)）:

1. [常规任务（默认）](guides/task-types.md#changguirenwu)。
2. [项目任务](guides/task-types.md#xiangmurenwu)。
3. [里程碑](guides/task-types.md#lichengbei)。

![task_types](/img/task_types.png)

要分配任务类型，请在数据项中使用 [type](guides/loading.md#dataproperties) 属性（*对应 [types](api/config/types.md) 对象中的值*）:

**在数据集中指定任务类型**
~~~js
var data = {
    task:[
        {id:1, text:"Project #1",    type:"project",    open:true},   /*!*/
        {id:2, text:"Task #1",          start_date:"12-04-2020", duration:3, parent:1},
        {id:3, text:"Alpha release", type:"milestone",   parent:1, /*!*/
            start_date:"14-04-2020"},                                                /*!*/
        {id:4, text:"Task #2",          start_date:"17-04-2020", duration:3, parent:1}],
    links:[]
};
~~~

[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


## 常规任务


默认情况下，dhtmlxGantt 会创建常规任务（即 **type="task"** 的任务）。

![type_task](/img/type_task.png)

**指定常规任务**
~~~js
var data = {
    tasks:[{id:2, text:"Task #1", start_date:"12-04-2020", duration:3}],  /*!*/
    links:[]
};
// 或
var data = {
     tasks:[{id:2, text:"Task #1", start_date:"12-04-2020", duration:3, /*!*/
            type:"task"}],  /*!*/
    links:[]
};
~~~

[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


被标记为 **type="task"** 的任务具有以下特性:

- 可以有一个父任务和多个子任务。
- 支持拖动和调整大小。
- 不会根据子任务自动调整；拖动子任务不会影响父任务的工期或进度。
- 可以在父项目中展示。详见[说明](guides/milestones.md#huizongrenwuhelichengbei)。
- 可以在时间线上隐藏。详见[说明](guides/milestones.md#yincangrenwuhelichengbei)。

## 项目任务


项目任务的时间跨度为其最早子任务的开始时间到最晚子任务的结束时间。

:::note
项目任务与常规任务的主要区别在于，项目任务的工期取决于其子任务，并会随之更新。
:::

![type_project](/img/type_project.png)

**指定项目任务**
~~~js
var data = {
    tasks:[
        {id:1, text:"Project #1",    type:"project",    open:true}, /*!*/
        {id:2, text:"Task #1",       start_date:"12-04-2020", duration:3, parent:1},
        {id:3, text:"Alpha release", type:"milestone",   parent:1,
            start_date:"14-04-2020"}],
    links:[]
};
~~~


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


**type="project"** 的任务具有以下特点:

- 可以有一个父任务和多个子任务。
- 默认不可拖动和调整大小，除非通过 [drag_project](api/config/drag_project.md) 显式启用拖拽。
- 依赖于其子任务；拖动子任务会更新项目任务的工期。
- 忽略 **start_date**、**end_date** 和 **duration** 属性。
- 如果没有子任务，则不可拖动。
- 项目的 **progress** 默认需手动设置，不会自动反映子任务进度。如需自动计算进度，需要自定义代码。[参考示例](guides/how-to.md#ruhegenjuzirenwujisuanrenwujindu)。

:::note
如需启用项目任务的添加，请参见 [Milestones](guides/milestones.md)。启用里程碑创建后，用户也可添加项目任务。
:::

## 里程碑


[里程碑](guides/milestones.md) 是工期为零的任务，用于突出显示项目中的关键日期（[详细信息](guides/milestones.md)）。

![type_milestone](/img/type_milestone.png)

**指定里程碑**
~~~js
var data = {
    tasks:[
        {id:1, text:"Project #1",    type:"project",    open:true},
        {id:2, text:"Task #1",       start_date:"12-04-2020", duration:3, parent:1},
        {id:3, text:"Alpha release", type:"milestone",   parent:1, /*!*/
            start_date:"14-04-2020"}],/*!*/
    links:[]
};
~~~

[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


**type="milestone"** 的任务具有以下特性:

- 可以有一个父任务和多个子任务。
- 不可拖动或调整大小。
- 工期始终为零。
- 忽略 **end_date**、**duration** 和 **progress** 属性。
- 可以在父项目中展示。详见[说明](guides/milestones.md#huizongrenwuhelichengbei)。
- 可以在时间线上隐藏。详见[说明](guides/milestones.md#yincangrenwuhelichengbei)。

:::note
如需启用里程碑创建，请参见 [Milestones](guides/milestones.md)。
:::

## 针对不同任务类型的专属 lightbox


每种任务类型有其独特属性，因此详情表单（lightbox）可针对不同类型单独配置。
相关配置存储在 [lightbox](api/config/lightbox.md) 对象中。

包括以下内容:

- **gantt.config.lightbox.sections** - 针对常规任务。
- **gantt.config.lightbox.project_sections** - 针对项目任务。
- **gantt.config.lightbox.milestone_sections** - 针对里程碑。

默认配置如下:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "time", type: "duration", map_to: "auto"}
];
gantt.config.lightbox.project_sections= [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
gantt.config.lightbox.milestone_sections= [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", type: "duration", single_date: true, map_to: "auto"}
];
~~~

当在选择控件中更改任务类型时，lightbox 会动态切换至相应配置。

你也可以[创建自定义任务类型](guides/task-types.md#chuangjianzidingyileixing)并为其定义 lightbox 结构。

更多 lightbox 配置内容请参见 [편집 폼 구성하기](guides/edit-form.md) 章节。

## 创建自定义类型


所有任务类型均定义在 [types](api/config/types.md) 对象中。

要添加自定义任务类型，一般需遵循以下步骤:

1. 在 [types](api/config/types.md) 对象中添加新条目。
2. 定义该类型的专属设置。

例如，添加一个名为 **meeting** 的新类型，其行为类似常规任务，但拥有独特颜色和自定义 lightbox 输入:

![custom_task_type](/img/custom_task_type.png)

如下定义新类型 **meeting** 及其 lightbox:

1. 将新类型添加到 [types](api/config/types.md) 对象中:

~~~js
gantt.config.types.meeting = "type_id";
~~~
<i>这里，"meeting"是为了代码可读性而设的名称。"type_id"是在数据库和 [types](api/config/types.md) 对象中存储的唯一标识符。</i>

2. 在"typeselect"控件中为新类型设置标签:


~~~js
gantt.locale.labels.type_meeting = "Meeting";
~~~

3. 为新类型定义 lightbox 结构:


~~~js
gantt.config.lightbox.meeting_sections = [
    {name:"title", height:20, map_to:"text", type:"textarea", focus:true},
    {name:"details", height:70, map_to: "details", type: "textarea"},
    {name:"type", type:"typeselect", map_to:"type"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
gantt.locale.labels.section_title = "Subject";
gantt.locale.labels.section_details = "Details";
~~~
4. 为新类型定义样式，并通过 [task_class](api/template/task_class.md) 模板应用:


~~~html
.meeting_task{
    border:2px solid #BFC518;
    color:#6ba8e3;
    background: #F2F67E;
}
.meeting_task .gantt_task_progress{
    background:#D9DF29;
}
~~~

~~~js
gantt.templates.task_class = function(start, end, task){
    if(task.type == gantt.config.types.meeting){
        return "meeting_task";
    }
    return "";
};
~~~

5. 通过 [task_text](api/template/task_text.md) 模板自定义"meeting"任务的文本显示:


~~~js
gantt.templates.task_text = function(start, end, task){
    if(task.type == gantt.config.types.meeting){
        return "Meeting: <b>" + task.text + "</b>";
    }
    return task.text;
};
~~~


[Custom task type](https://docs.dhtmlx.com/gantt/samples/04_customization/12_custom_task_type.html)


## 自定义任务类型的显示方式


如需更改现有任务类型的外观，可使用 [type_renderers](api/config/type_renderers.md) 选项。此功能允许你重写控制任务类型在页面上渲染方式的函数。

![custom_look](/img/custom_look.png)

~~~js
gantt.config.type_renderers["project"]=function(task, defaultRender){
    var main_el = document.createElement("div");
    main_el.setAttribute(gantt.config.task_attribute, task.id);
    var size = gantt.getTaskPosition(task);
    main_el.innerHTML = [
        "<div class='project-left'></div>",
        "<div class='project-right'></div>"
    ].join('');
    main_el.className = "custom-project";

    main_el.style.left = size.left + "px";
    main_el.style.top = size.top + 7 + "px";
    main_el.style.width = size.width + "px";

    return main_el;
};
~~~

[Classic Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)

