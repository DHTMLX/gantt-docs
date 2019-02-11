groupBy
=============

@short:groups tasks by the specified task's attribute

@params:
- config	object	the grouping configuration object 

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
	group_text: "label"
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

@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note This method is defined in the **ext/dhtmlxgantt_grouping.js** extension, so you need to include it on the page. Read the details in the desktop/grouping.md article.}}



The grouping configuration object has the following properties:

- **relation_property** - (<i>string</i>) a property of a task object that will be used to group items. Mandatory.
- **groups** - (<i>array</i>) an array of the groups (summary) items. Mandatory.
- **group_id** - (<i>string</i>) the group's id. Optional. The default value is 'key'.
- **group_text** - (<i>string</i>) the group's label. Optional. The default value is 'label'.
- **delimiter** - (*string*) the delimiter is used for automatic creation of groups for tasks with multiple resources. Optional. The default value is ",".

Please, note:

- Each 'group' object must contain at least 2 properties (but any number of additional ones): the id and text description (specified by the 'group_id', 'group_text' parameters respectively).
- The 'project' tasks from the original dataset won't be displayed in the grouping mode, however they will be available via api.
- Group items are added into the data set as items with the type 'project' and the 'readonly' property enabled. They can be detected by the '$virtual' property, and handled as a regular data items:

~~~js
gantt.templates.task_class=function(start, end, task){
	if(task.$virtual)
	return "summary-bar";
};
~~~


