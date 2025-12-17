---
title: "任务分组"
sidebar_label: "任务分组"
---

任务分组
=========================

:::info
此功能仅在 PRO 版本中提供
:::

该库包含一个**分组**扩展，可以让你根据任务的任意属性对任务进行组织。

<div style="text-align:center;">![grouping_tasks](/img/grouping_tasks.png)</div>

:::note
要开始使用此扩展，请通过 [gantt.plugins](api/method/plugins.md) 方法激活它。
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


## 任务分组 {#groupingtasks}

要根据特定条件对任务进行分组，请使用 [groupBy](api/method/groupby.md) 方法:

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

详细说明:

- **relation_property** - （*必填*）用于分组的任务对象属性。例如:

~~~js
var data =  {
    tasks:[{id:1, priority:1, start_date:"02-04-2020 00:00", ...}, ...] /*!*/
};
gantt.groupBy({
    relation_property: "priority", /*!*/
    ...
});
~~~

该属性也可用于创建多级分组结构:

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

- **groups** - （*必填*）分组（汇总）项的数组。

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

重要说明:

1. 每个分组对象必须至少包含两个属性（以及任何其他附加属性）:一个 id 和一个文本描述，分别由 'group_id' 和 'group_text' 参数定义。它们默认值分别是 *key* 和 *label*。你可以为这些参数选择其他值（**不能为 "id"**），只要这些属性在分组对象中存在即可。 
:::note
不允许使用 "id" 属性，因为在分组时 Gantt 会创建虚拟分组任务，并为其分配 'group_id' 和 'group_text' 属性。这意味着分组任务默认将拥有 'key' 和 'label' 属性。由于每个任务已经有 'id'，更改此项会破坏树结构。
:::

2. 分组项会作为类型为 'project' 且启用 'readonly' 标志的项添加到数据集中。这些项可以通过 '$virtual' 属性识别，并可像普通数据项一样处理:

~~~js
gantt.templates.task_class="function(start," end, task){
    if(task.$virtual)
    return "summary-bar";
};
~~~

3. 数据集中的原始 'project' 任务在分组模式下不会显示，但仍可通过 API 访问。

- **group_id** - （*可选*）用于分组 id 的属性，默认为 'key'。  
- **group_text** - （*可选*）用于分组标签的属性，默认为 'label'。  
- **delimiter** - （*可选*）用于为拥有多个资源的任务自动创建分组，默认为 ","。  
- **default_group_label** - (<i>string</i>) 默认分组的标签。可选，默认为 'None'。  
- **save_tree_structure** - (<i>boolean</i>) 控制 Gantt 是否在分组内保留原始树结构。如果省略或设为 *false*，任务将以平铺列表显示。

请注意，默认分组包含未属于任何其他分组的任务。指定为 <i>string|number</i> 类型的 **relation_property** 的任务不会被包含在默认分组中。

 

取消任务分组
------------------------------

要清除分组，调用 [groupBy](api/method/groupby.md) 方法并传入 *false* 作为参数:

**重置当前分组**
~~~js
gantt.groupBy(false);
~~~

使用集合指定分组
------------------------------------------

分组通常会在页面的多个组件间共享。为避免重复，可以将分组定义为命名集合。

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


在分组中保留原始任务层级结构
---------------------------------------

默认情况下，启用分组后，Gantt 树的原始层级结构不会显示，所有任务都作为分组的直接子项。

如需在分组内保留原有的子任务结构，请将 **save_tree_structure** 设置为 true:

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

