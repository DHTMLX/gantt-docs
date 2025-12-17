---
sidebar_label: groupBy
title: groupBy method
description: "groups tasks by the specified task's attribute"
---

# groupBy

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Groups tasks by the specified task's attribute

@signature: groupBy: (config: GroupConfig | boolean) =\> void

### Parameters

- `config` - (required) *GroupConfig | boolean* -        the grouping configuration object, or false to ungroup tasks

### Example

~~~jsx
// one-level grouping
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
    ],
    group_id: "key",
    group_text: "label",
    save_tree_structure: true
});

//multi-level grouping
gantt.groupBy({
    relation_property: "priority",
    groups: [
        {key:0, label: "High"},
        {key:4, label: "Normal"},
        {key:5, label: "Low"},
        // multi level groups
        {key:1, label: "Give High Attention", "priority":0},
        {key:2, label: "Resolve Immediately", "priority":0},
        {key:3, label: "Keep For Next Release", "priority":5}
    ],
    group_id: "key",
    group_text: "label"
});

// using collections
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

// ungrouping tasks
gantt.groupBy(false);
~~~

### Related samples
- [Tasks grouping](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)

### Details

:::note
This method is defined in the **grouping** extension, so you need to activate the [grouping](guides/extensions-list.md#grouping) plugin. Read the details in the [Grouping Tasks](guides/grouping.md) article. 
:::


The grouping configuration object has the following properties:

- **relation_property** - (*string*) - a property of a task object that will be used to group items.
- **groups** - (*СollectionItem[]*) - an array of the groups (summary) items. Each item should have the properties set in the **group_id** and **group_text** parameters (by default, *key* and *label*).
- **group_id?** - (*string*) - optional, the group's id. The default value is 'key'.
- **group_text?** - (*string*) - optional, the group's label. The default value is 'label'.
- **delimiter?** - (*string*) - optional, the delimiter is used for automatic creation of groups for tasks with multiple resources. The default value is ",".
- **default_group_label?** - (*string*) - optional, the name of the default group. Optional. The default value is 'None'.
- **save_tree_structure?** - (*boolean*) - optional, defines whether the gantt should save its tree structure inside groups. If not specified or set to *false*, gantt tasks will be displayed in a flat list view.


Please, note:

- Each 'group' object must contain at least 2 properties (but any number of additional ones): the id and text description, specified by the 'group_id' and 'group_text' parameters respectively. By default these parameters have the *key* and *label* values, correspondingly. You can use any other values for these parameters (**except for "id"**), provided that they are specified in the group array. 

:::note
The "id" value is not allowed, since when Gantt is grouping tasks, it creates virtual group tasks and adds the 'group_id' and 'group_text' parameters into these tasks. 
It means that by default the grouped tasks will have the 'key' and 'value' properties. At the same time, each task already has the 'id' property and changing the default ids of tasks will lead to the breakage of the tree structure. 
:::

- The 'project' tasks from the original dataset won't be displayed in the grouping mode, however they will be available via api.
- Group items are added into the data set as items with the type 'project' and the 'readonly' property enabled. They can be detected by the '$virtual' property, and handled as regular data items:

~~~js
gantt.templates.task_class=function(start, end, task){
  if(task.$virtual)
    return "summary-bar";
};
~~~

- The default group includes tasks which are not included into the other groups. The default group doesn't include tasks if they have **relation_property** specified as a string|number value. 

:::note
[Save tree structure when grouping tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html) 
:::

### Related Guides
- [Grouping Tasks](guides/grouping.md)

### Change log
- the **save_tree_structure** parameter was added in v8.0
