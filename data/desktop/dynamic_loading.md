Dynamic Loading (on demand)
=========================================
By default, dhtmlxGantt loads all data at once. It may become problematic when you have a big number of tasks.

In such situation you may use the dynamic loading mode and load data by branches (sub-projects), level by level as the user opens them. 


To enable the dynamic loading in the Gantt chart you need to deal with both the client- and the server-side.

<ul>
	<li>Client-side (use the api/gantt_branch_loading_config.md option):
~~~js
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
gantt.init("gantt_here");
gantt.config.branch_loading = true;
		
gantt.load("../common/connector_dynamic_loading.php");

var dp = new dataProcessor("../common/connector_dynamic_loading.php");
dp.init(gantt);
~~~
	</li>
    <li>Server-side:
~~~php
<?php

include ('config.php');

$gantt = new JSONGanttConnector($res, $dbtype);

$parent_id = isset($_GET["parent_id"]) ? $_GET["parent_id"] : 0;

$gantt->mix("open", 0);
$gantt->mix("deep", 1);

$gantt->render_links("gantt_links", "id", "source,target,type");
$gantt->render_table(
	"gantt_tasks",
    "id",
    "start_date,duration,text,progress,parent",
    "", 
    "parent"
);
~~~
	</li>
</ul>
{{sample
02_extensions/06_dynamic_loading.html
}}

<br>

Generally, the client-side has no information about children of the displayed data items (as such children were not loaded from the server-side). 

To pass this information, you can use a special data property '$has_children' (the name is mandatory) that indicates the number of the child elements for the task.

~~~php
function check_children($row){
    global $gantt;
    $task_id = $row->get_value('id');
    $sql = "SELECT COUNT(id) AS has_children FROM gantt_tasks WHERE parent='{$task_id}'";
    $children = $gantt->sql->query($sql);
    
    $child = $gantt->sql->get_next($children);
    $children_qty = $child['has_children'];

    $row->set_userdata('$has_child',$children_qty);
}
$gantt->event->attach("beforeRender","check_children");
~~~

{{sample
02_extensions/06_dynamic_loading.html
}}


Dynamic loading format of data
-----------------------

The format of data for dynamic loading is the following:

~~~js
{
	"data":[
	{
		"id":13,
		"start_date":"2013-04-02 00:00:00",
		"duration":10,
		"text":"Task #1",
		"progress":0.2,
		"parent":12,
		"open":0,
		"$has_child":0
	},
	{
		"id":14,
		"start_date":"2013-04-04 00:00:00",
		"duration":4,
		"text":"Task #2",
		"progress":0.9,
		"parent":12,
		"open":0,
		"$has_child":4
	}],

	"links":[
		{"id":1,"source":1,"target":2,"type":"0"},
		{"id":2,"source":1,"target":3,"type":"0"},
		{"id":3,"source":1,"target":4,"type":"0"}
	]

}
~~~

As you can see, it's the same JSON as the one used for regular data loading. To compare, check the desktop/supported_data_formats.md article.

The only difference is the *$has_child* property which indicates whether a task will be displayed as a 'leaf' item (without the 'expand' toggle) or as an expandable node:

- if the *$has_child* property is specified and contains a ['truthy'](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value (a non-zero number, true, a non-empty string, etc.),
the item will be displayed with the expand/collapse toggle. On expanding the toggle, an ajax request will be sent to the server;
- if *$has_child* is not specified or contains a ['falsy'](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) value (zero, false, NaN, undefined, empty string, null),
the item will be displayed without toggle, as a task which has no child items.

If the request has the *parent_id* parameter, the response must contain children of the task with the specified id. If *parent_id* is not specified, the request must contain root level tasks:

- loading children of the 'id' task:

**HTTP Method**: GET<br>
**URL**: /loadUrl?parent_id=id

- loading root level tasks:

**HTTP Method**: GET<br>
**URL**: /loadUrl







@edition:pro