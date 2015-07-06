Dynamic Loading (on demand)
=========================================
By default, dhtmlxGantt loads all data at once. It may become problematic when you have a big number of tasks.

In such situation you may use the dynamic loading mode and load data  by branches (sub-projects), level by level as the user opens them. 


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
$gantt->render_table("gantt_tasks","id","start_date,duration,text,progress,parent","", "parent");
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


@edition:pro