Grouping Tasks
=========================

{{pronote This functionality is available only in the PRO edition}}


Starting from version 3.2, the library provides the **ext/dhtmlxgantt_grouping.js** extension that allows you to group tasks by any of task's attributes.

<div style="text-align:center;"><img src="desktop/grouping_tasks.png"/></div>


{{note
To start using the extension, include the ext/dhtmlxgantt_grouping.js file on the page.
}}


~~~js
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
   <script src="codebase/ext/dhtmlxgantt_grouping.js"></script>  /*!*/
</head>
<body>
    //your code will be here
</body>
</html>
~~~
{{sample
02_extensions/08_tasks_grouping.html
}}

Grouping tasks
-----------------------------------------------------
To group tasks by some criterion, use the api/gantt_groupby.md method: 

~~~js
var tasks =  {
	data:[{id:1, priority:1, start_date:"02-04-2013 00:00", ...}, ...] 
};

gantt.groupBy({
	relation_property: "priority",
	groups: [{key:1, label: "High"},{key:2, label: "Normal"},{key:3, label: "Low"}],
	group_id: "key",
	group_text: "label"
});
~~~

where 


<ul>
	<li> <b>relation_property</b> - (<i>mandatory</i>) a property of a task object that will be used to group items. For example, 
~~~js
var tasks =  {
	data:[{id:1, priority:1, start_date:"02-04-2013 00:00", ...}, ...] /*!*/
};
gantt.groupBy({
	relation_property: "priority", /*!*/
	...
});
~~~
<br>
The property can be also used to organize groups in a multi-level structure:

~~~js
gantt.groupBy({
	relation_property: "priority",
	groups: [{key:0, label: "High"},
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
<br>
<br>
</li>
    <li><b>groups</b> - (<i>mandatory</i>) an array of the groups (summary) items. 
~~~js
gantt.groupBy({
	groups: [{key:1, label: "High"}, {key:2, label: "Normal"},{key:3, label: "Low"}],
	group_id: "key",
	group_text: "label",
    ...
});
~~~    
Please, note:
<ol>
	<li>Each 'group' object must contain at least 2 properties (but any number of additional ones): the id and text description (specified by the 'group_id', 'group_text' parameters respectively)</li>
    <li>Group items are added into the data set as items with the type 'project' and the 'readonly' property enabled. They can be detected by the '$virtual' property, and handled as regular data items:
~~~js
gantt.templates.task_class=function(start, end, task){
	if(task.$virtual)
	return "summary-bar";
};
~~~
    </li>
    <li>The 'project' tasks from the original dataset won't be displayed in the grouping mode, however they will be available via API.</li>
</ol>
    </li>
    <br>
	<br>
    <li><b>group_id</b> - (<i>optional</i>) the group's id. The default value - 'key'.  </li>
     <li><b>group_text</b> - (<i>optional</i>) the group's label. The default value - 'label'.  </li>
</ul>


Ungrouping tasks
------------------------------
To reset grouping - call the api/gantt_groupby.md method without parameters:

{{snippet
Resetting the current grouping
}}
~~~js
//calling  
gantt.groupBy();
~~~

Using collections for specifying groups
------------------------------------------
Usually, groups are used by multiple elements on the page and to avoid repetitions you can present groups as a named collection.

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


@edition: pro




