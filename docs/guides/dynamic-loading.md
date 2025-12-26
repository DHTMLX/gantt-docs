---
title: "Dynamic Loading (on demand)"
sidebar_label: "Dynamic Loading (on demand)"
---

# Dynamic Loading (on demand)

:::info
This functionality is available only in the PRO edition
:::

By default, dhtmlxGantt loads all data at once. It may become problematic when you have a big number of tasks.

In such a situation you may use the dynamic loading mode and load data by branches (sub-projects), level by level as the user opens them. 

## How it works

When dynamic loading is [enabled](#enablingdynamicloading), the [gantt.load("url")](api/method/load.md) call will send a GET request to the specified URL, 
expecting the response to contain only the top-level tasks, and all the nested branches displayed as closed.

When the user clicks on the Expand icon, gantt automatically calls the [load](api/method/load.md) method sending the id of a clicked task to the server:

~~~js
gantt.load("url?parent_id="123"");
~~~

And expects the response to contain subtasks of the expanded item.

:::note
You can use the [onBeforeBranchLoading](api/event/onbeforebranchloading.md) event in order to modify the request url or to add some extra parameters to it.
:::

## Enabling dynamic loading {#enablingdynamicloading}

To enable the dynamic loading in the Gantt chart, you need to deal with both the client- and the server side.

- Client side (use the [branch_loading](api/config/branch_loading.md) option):

~~~js
gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
gantt.config.branch_loading = true;

gantt.init("gantt_here");

gantt.load("/dynamic_loading");
~~~

- Server side:

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
  
**Related sample**: [Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)

Generally, the client side has no information about children of the displayed data items (as such children were not loaded from the server side). 

To pass this information, you can use a special data property '$has_child' (can be changed using [branch_loading_property](api/config/branch_loading_property.md)) that indicates the number of the child elements for the task.

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

**Related sample**: [Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)


## Data format for dynamic loading 

The format of data for dynamic loading is the following:

~~~js
{
    "tasks":[
    {
        "id":13,
        "start_date":"2020-04-02 00:00:00",
        "duration":10,
        "text":"Task #1",
        "progress":0.2,
        "parent":12,
        "open":0,
        "$has_child":0
    },
    {
        "id":14,
        "start_date":"2020-04-04 00:00:00",
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

As you can see, it's the same JSON as the one used for regular data loading. To compare, check the [Supported Data Formats](guides/supported-data-formats.md) article.

The only difference is the **$has_child** property which indicates whether a task will be displayed as a 'leaf' item (without the 'expand' toggle) or as an expandable node:

- if the *$has_child* property is specified and contains a ['truthy'](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value (a non-zero number, true, a non-empty string, etc.),
the item will be displayed with the expand/collapse toggle. On expanding the toggle, an Ajax request will be sent to the server;
- if *$has_child* is not specified or contains a ['falsy'](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) value (zero, false, NaN, undefined, empty string, null),
the item will be displayed without toggle, as a task which has no child items.

If the request has the *parent_id* parameter, the response must contain children of the task with the specified id. If *parent_id* is not specified, the request must contain root level tasks:

<table class="dp_table">
  <tr>
  <th><b>Action</b></th><th><b>HTTP Method</b></th><th><b>URL</b></th><th><b>Response</b></th>
  </tr>
  <tr>
  <td>load root level</td>
  <td>GET</td>
  <td>/loadUrl</td>
  <td>Dynamic loading format</td>
  </tr>
  <tr>
  <td>load children on the task</td>
  <td>GET</td>
  <td>/loadUrl?parent_id=id</td>
  <td>Dynamic loading format</td>
  </tr>

</table>

### Loading tasks dynamically

You may implement dynamic loading of tasks so that new tasks to load after you scroll to the last visible task. Read details in the [How to load tasks dynamically](guides/how-to.md#how-to-load-tasks-dynamically) article.

### Related API

- [branch_loading](api/config/branch_loading.md)
- [branch_loading_property](api/config/branch_loading_property.md)
- [onBeforeBranchLoading](api/event/onbeforebranchloading.md)
- [onAfterBranchLoading](api/event/onafterbranchloading.md)

