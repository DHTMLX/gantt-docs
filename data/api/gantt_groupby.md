groupBy
=============

@short:groups tasks by the specified task's attribute

@params:
- config		GroupConfig | boolean		the grouping configuration object, or false to ungroup tasks

@edition: pro
@related:desktop/grouping.md
@relatedsample:
	02_extensions/08_tasks_grouping.html

@example:
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

@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note This method is defined in the **grouping** extension, so you need to activate the [grouping](desktop/extensions_list.md#grouping) plugin. Read the details in the desktop/grouping.md article.}}


The grouping configuration object has the following properties:

- <span class=subproperty>**relation_property**</span> - (*string*) - a property of a task object that will be used to group items.
- <span class=subproperty>**groups**</span> - (*СollectionItem[]*) - an array of the groups (summary) items. Each item should have the properties set in the **group_id** and **group_text** parameters (by default, *key* and *label*).
- <span class=subproperty>**group_id?**</span> - (*string*) - optional, the group's id. The default value is 'key'.
- <span class=subproperty>**group_text?**</span> - (*string*) - optional, the group's label. The default value is 'label'.
- <span class=subproperty>**delimiter?**</span> - (*string*) - optional, the delimiter is used for automatic creation of groups for tasks with multiple resources. The default value is ",".
- <span class=subproperty>**default_group_label?**</span> - (*string*) - optional, the name of the default group. Optional. The default value is 'None'.
- <span class=subproperty>**save_tree_structure?**</span> - (*boolean*) - optional, defines whether the gantt should save its tree structure inside groups. If not specified or set to *false*, gantt tasks will be displayed in a flat list view.



Please, note:

- Each 'group' object must contain at least 2 properties (but any number of additional ones): the id and text description, specified by the 'group_id' and 'group_text' parameters respectively. By default these parameters have the *key* and *label* values, correspondingly. You can use any other values for these parameters (**except for "id"**), provided that they are specified in the group array. 
{{note The "id" value is not allowed, since when Gantt is grouping tasks, it creates virtual group tasks and adds the 'group_id' and 'group_text' parameters into these tasks. 
It means that by default the grouped tasks will have the 'key' and 'value' properties. At the same time, each task already has the 'id' property and changing the default ids of tasks will lead to the breakage of the tree structure.}}
- The 'project' tasks from the original dataset won't be displayed in the grouping mode, however they will be available via api.
- Group items are added into the data set as items with the type 'project' and the 'readonly' property enabled. They can be detected by the '$virtual' property, and handled as regular data items:

~~~js
gantt.templates.task_class=function(start, end, task){
  if(task.$virtual)
    return "summary-bar";
};
~~~

- The default group includes tasks which are not included into the other groups. The default group doesn't include tasks if they have **relation_property** specified as a <i>string|number</i> value.<br> {{sample	02_extensions/28_tasks_grouping_save_tree_structure.html}}

@changelog: 
- the **save_tree_structure** parameter was added in v8.0