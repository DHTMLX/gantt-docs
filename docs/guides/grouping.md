---
title: "Grouping Tasks"
sidebar_label: "Grouping Tasks"
---

Grouping Tasks
=========================

:::info
This functionality is available only in the PRO edition
:::

The library provides the **grouping** extension that allows you to group tasks by any of task's attributes.

<div style="text-align:center;">![grouping_tasks](/img/grouping_tasks.png)</div>


:::note
To start using the extension, enable it using the [gantt.plugins](api/method/plugins.md) method.
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
    //your code will be here
</body>
</html>
~~~

[Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)


## Grouping tasks {#groupingtasks}

To group tasks by some criterion, use the [groupBy](api/method/groupby.md) method: 

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

where: 

- **relation_property** - (*mandatory*) a property of a task object that will be used to group items. For example:

~~~js
var data =  {
    tasks:[{id:1, priority:1, start_date:"02-04-2020 00:00", ...}, ...] /*!*/
};
gantt.groupBy({
    relation_property: "priority", /*!*/
    ...
});
~~~

The property can be also used to organize groups in a multi-level structure:

~~~js
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
        //multi level groups
        {key:1, label: "Give High Attention", "priority":0},
        {key:2, label: "Resolve Immediately", "priority":0},
        {key:3, label: "Keep For Next Release", "priority":5}
    ],
    group_id: "key",
    group_text: "label"
});
~~~  

- **groups** - (*mandatory*) an array of the groups (summary) items. 

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

Please, note:

1. Each 'group' object must contain at least 2 properties (but any number of additional ones): the id and text description, specified by the 'group_id', 'group_text' parameters respectively. By default these parameters have the *key* and *label* values, correspondingly. You can use any other values for these parameters (**except for "id"**), provided that they are specified in the group array. 
:::note
The "id" value is not allowed, since when Gantt is grouping tasks, it creates virtual group tasks and adds the 'group_id' and 'group_text' parameters into these tasks. 
It means that by default the grouped tasks will have the 'key' and 'value' properties. At the same time, each task already has the 'id' property and changing the default ids of tasks will lead to the breakage of the tree structure.
:::

2. Group items are added into the data set as items with the type 'project' and the 'readonly' property enabled. They can be detected by the '$virtual' property, and handled as regular data items:

~~~js
gantt.templates.task_class="function(start," end, task){
    if(task.$virtual)
    return "summary-bar";
};
~~~

3. The 'project' tasks from the original dataset won't be displayed in the grouping mode, however they will be available via API.


- **group_id** - (*optional*) the group's id. The default value - 'key'. 
- **group_text** - (*optional*) the group's label. The default value - 'label'.  
- **delimiter** - (*optional*) the delimiter is used for automatic creation of groups for tasks with multiple resources. "," by default.
- **default_group_label** - (<i>string</i>) the name of the default group. Optional. The default value is 'None'.
- **save_tree_structure** - (<i>boolean</i>) defines whether the gantt should save its tree structure inside groups. If not specified or is set to *false*, the tasks will be displayed in a flat list view.

Note, that the default group includes tasks which are not included into the other groups. The default group doesn't include tasks if they have **relation_property** specified as a <i>string|number</i> value.

 

Ungrouping tasks
------------------------------

To reset grouping, call the [groupBy](api/method/groupby.md) method and pass *false* as a parameter:

**Resetting the current grouping**
~~~js
gantt.groupBy(false);
~~~

Using collections for specifying groups
------------------------------------------

Usually, groups are used by multiple elements on the page and to avoid repetitions, you can present groups as a named collection.

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


Keeping original task hierarchy in groups
---------------------------------------

In the group mode, the Gantt tree's original structure isn't displayed by default, and all tasks appear as first-level children of their respective groups.

To maintain the original subtask structure within groups, use the **save_tree_structure** setting:

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

