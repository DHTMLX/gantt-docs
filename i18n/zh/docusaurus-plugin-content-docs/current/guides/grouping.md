---
title: "分组任务"
sidebar_label: "分组任务"
---

# 分组任务

:::info
此功能仅在 PRO 版中可用
:::

库提供了 **grouping** 扩展，允许你按任务的任意属性对任务进行分组。

<div style="text-align:center;">![grouping_tasks](/img/grouping_tasks.png)</div>


:::note
要开始使用此扩展，请使用 [gantt.plugins](api/method/plugins.md) 方法启用它。
:::


~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({
        grouping: true
    });
    //你的代码将在这里
</body>
</html>
~~~

[Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)


## Grouping tasks {#groupingtasks}

要按某个条件对任务进行分组，请使用 [groupBy](api/method/groupby.md) 方法： 

~~~js
var data =  {
    tasks:[{id:1, priority:1, start_date:"02-04-2020 00:00", ...}, ...] 
};

gantt.groupBy({
    relation_property: "priority",
    groups: [{key:1, label: "High"},{key:2, label: "Normal"},{key:3, label: "Low"}],
    group_id: "key",
    group_text: "label"
});
~~~

其中： 

- **relation_property** - (*mandatory*) 将用于分组项的任务对象属性。例如：

~~~js
var data =  {
    tasks:[{id:1, priority:1, start_date:"02-04-2020 00:00", ...}, ...] /*!*/
};
gantt.groupBy({
    relation_property: "priority", /*!*/
    ...
});
~~~

该属性也可用于在多级结构中组织分组：

~~~js
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
        //多级分组
        {key:1, label: "Give High Attention", "priority":0},
        {key:2, label: "Resolve Immediately", "priority":0},
        {key:3, label: "Keep For Next Release", "priority":5}
    ],
    group_id: "key",
    group_text: "label"
});
~~~  

- **groups** - (*mandatory*) 一个分组（汇总）项的数组。 

~~~js
gantt.groupBy({
    groups: [
        {key:1, label: "High"}, 
        {key:2, label: "Normal"},
        {key:3, label: "Low"}
    ],
    group_id: "key",
    group_text: "label"
});
~~~   

请注意：

1. 每个 'group' 对象至少必须包含 2 个属性（但还可以包含任意数量的附加属性）：由 'group_id'、'group_text' 参数分别指定的 id 与文本描述。默认情况下，这些参数分别具有 *key* 与 *label* 的值。你可以对这些参数使用其他值（**但不能是 "id"**），前提是它们在分组数组中有所指定。 
:::note
当 Gantt 进行分组时，会创建虚拟的分组任务并向这些任务中添加 'group_id' 与 'group_text' 参数，因此默认分组任务将具有 'key' 与 'value' 属性。同时，每个任务已经具备 'id' 属性，改变默认的任务 id 将破坏树形结构。
:::

2. 将组项作为类型为 'project'、且开启了 'readonly' 属性的数据项添加到数据集中。它们可通过 '$virtual' 属性进行检测，并按常规数据项处理：

~~~js
gantt.templates.task_class="function(start," end, task){
    if(task.$virtual)
    return "summary-bar";
};
~~~

3. 原始数据集中的 'project' 任务在分组模式下不会显示，但仍可通过 API 获取。


- **group_id** - (*optional*) 分组的 id。默认值为 'key'。 
- **group_text** - (*optional*) 分组的标签。默认值为 'label'。  
- **delimiter** - (*optional*) 用于为具有多资源的任务自动创建分组的分隔符。默认是 ","。
- **default_group_label** - (<i>string</i>) 默认分组的名称。可选。默认值为 'None'。
- **save_tree_structure** - (<i>boolean</i>) 定义 Gantt 是否在分组内保存其树结构。如果未指定或设为 *false*，任务将以扁平列表形式显示。

请注意，默认分组包含未包含在其他分组中的任务。若某些任务的 **relation_property** 指定为一个 <i>string|number</i> 值，则默认分组不包含这些任务。

 

## Ungrouping tasks

要重置分组，请调用 [groupBy](api/method/groupby.md) 方法并传入 *false* 作为参数：

**重置当前分组**
~~~js
gantt.groupBy(false);
~~~

## Using collections for specifying groups

通常，分组会被页面上的多个元素使用，为避免重复，可以将分组作为一个具名集合进行表示。

~~~js
gantt.serverList("priority", [
    {key:1, label: "High"},
    {key:2, label: "Normal"},
    {key:3, label: "Low"}
]);
gantt.groupBy({
    groups: gantt.serverList("priority"),
    relation_property: "priority",
    group_id: "key",
    group_text: "label"
});
~~~


## Keeping original task hierarchy in groups

在分组模式下，默认不会显示 Gantt 树的原始结构，所有任务都作为各自分组的一级子项出现。

若要在分组中保持原始子任务结构，请使用 **save_tree_structure** 设置：

~~~js
gantt.groupBy({
    groups: [
        { key: 1, label: "Ilona" },
        { key: 2, label: "John" },
        { key: 3, label: "Mike" }
    ],
    relation_property: "owner",
    group_id: "key",
    group_text: "label",
    default_group_label: "Not Assigned",
    save_tree_structure: true /* ! */
});
~~~


[Save tree structure when grouping tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html)