---
title: "Configuring the Tree Column"
sidebar_label: "Configuring the Tree Column"
---

# Configuring the Tree Column

To know about available tree-related methods, please, refer to the [Task Parent/Child](guides/task-tree-operations.md) article.

## Expanding/collapsing a task branch

- To open a task branch, use the [open](api/method/open.md) method:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.open("p_1"); /*!*/
~~~

- To close a task branch, use the [close](api/method/close.md) method:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.close("p_1"); /*!*/
~~~ 

## Expanding/collapsing several branches

If you need to open/close several task branches, the fastest way is to programatically set the corresponding boolean value (true - to open, false - to close)
to the *.$open* property of the needed tasks and then redraw the gantt.

- expanding all tasks:

~~~js
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();
~~~

- collapsing all tasks:

~~~js
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

:::note
If you want to collapse/expand all tasks at once with a button, go to the [How to expand/collapse all tasks with a button](guides/how-to.md#how-to-expandcollapse-all-tasks-with-a-button) section.
:::

## Getting the children of a task

To get the children of a branch task, use the [getChildren](api/method/getchildren.md) method:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"] /*!*/
~~~

*To see more tree-related methods, please, read the [Task Parent/Child](guides/task-tree-operations.md) article.*

## Changing the tree's icons

### Parent items
To set the icon for the parent items, use the [grid_folder](api/template/grid_folder.md) template:

~~~js
gantt.templates.grid_folder = function(item) {
    return "<div class='gantt_tree_icon gantt_folder_" +
    (item.$open ? "open" : "closed") + "'></div>";
};
~~~


### Child items
To set the icon for the child items, use the [grid_file](api/template/grid_file.md) template:

~~~js
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~


### Open/close sign
To set the icon for the open/close sign, use the [grid_open](api/template/grid_open.md) template:

~~~js
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~


## Setting the indent of children in a branch

To set the indent of child tasks in a branch, use the [grid_indent](api/template/grid_indent.md) template (change the **width** CSS property):

~~~js
gantt.templates.grid_indent="function(task){"
    return "<div style='width:20px; float:left; height:100%'></div>"
};
~~~


## Adding checkboxes to tree nodes

To add the checkboxes (or any other HTML content) to tree nodes, use the [grid_blank](api/template/grid_blank.md) template:

~~~js
gantt.templates.grid_blank="function(task){"
    return "<input id='ch1' type='checkbox' onClick='someFunc()'></input>"
};
~~~


## Setting the template of tree nodes

To set the template for tree nodes, use the **template** attribute in the [columns](api/config/columns.md) property. 

 The return value of the **template'**s function will be added as an inner HTML. That's why, you can use any HTML structures in the attribute.

:::note
Note, if you don't use [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) to [integrate with the server side](guides/server-side.md), you have to sanitize the data 
you load into the Gantt chart in order to prevent possible XSS attacks ([dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) does it automatically)
:::
~~~js
gantt.config.columns="["
    {name:"text",       label:"Task name",  tree:true, width:230, template:myFunc },
    {name:"start_date", label:"Start time", align: "center" },
    {name:"duration",   label:"Duration",   align: "center" }
];
gantt.init("gantt_here");
    
function myFunc(task){
    if(task.priority ==1)
        return "<div class='important'>"+task.text+" ("+task.users+") </div>";
    return task.text+" ("+task.users+")";
};
~~~


[Template for tree nodes](https://docs.dhtmlx.com/gantt/samples/04_customization/05_tree_template.html)

