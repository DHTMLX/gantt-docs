---
title: "配置树形列"
sidebar_label: "配置树形列"
---

# 配置树形列

有关可用的树相关方法的详细信息，请参阅 [Task Parent/Child](guides/task-tree-operations.md) 文章。

## 展开/折叠任务分支

- 要展开任务分支，请使用 [open](api/method/open.md) 方法:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.open("p_1"); /*!*/
~~~

- 要折叠任务分支，请使用 [close](api/method/close.md) 方法:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.close("p_1"); /*!*/
~~~ 

## 展开/折叠多个分支

当需要同时展开或折叠多个任务分支时，最快的方法是通过代码将相关任务的 *.$open* 属性赋值为布尔值（true 为展开，false 为折叠），然后刷新 gantt。

- 展开所有任务:

~~~js
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();
~~~

- 折叠所有任务:

~~~js
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

:::note
如需添加一个按钮以一次性折叠或展开所有任务，请参见 [How to expand/collapse all tasks with a button](guides/how-to.md#ruhetongguoanniuzhankaishouqisuoyourenwu) 部分。
:::

## 获取任务的子节点

要获取某个分支任务的子节点，请使用 [getChildren](api/method/getchildren.md) 方法:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"] /*!*/
~~~

*更多树相关方法，请参阅 [Task Parent/Child](guides/task-tree-operations.md) 文章。*

## 更改树的图标

###父节点
如需自定义父节点的图标，请使用 [grid_folder](api/template/grid_folder.md) 模板:

~~~js
gantt.templates.grid_folder = function(item) {
    return "<div class='gantt_tree_icon gantt_folder_" +
    (item.$open ? "open" : "closed") + "'></div>";
};
~~~


###子节点
如需自定义子节点的图标，请使用 [grid_file](api/template/grid_file.md) 模板:

~~~js
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~


###展开/折叠标识
如需自定义展开/折叠标识的图标，请使用 [grid_open](api/template/grid_open.md) 模板:

~~~js
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~


## 设置分支中子节点的缩进

要调整分支中子任务的缩进，请通过修改 **width** CSS 属性，使用 [grid_indent](api/template/grid_indent.md) 模板:

~~~js
gantt.templates.grid_indent="function(task){"
    return "<div style='width:20px; float:left; height:100%'></div>"
};
~~~


## 为树节点添加复选框

如需在树节点内添加复选框（或其他 HTML 内容），请使用 [grid_blank](api/template/grid_blank.md) 模板:

~~~js
gantt.templates.grid_blank="function(task){"
    return "<input id='ch1' type='checkbox' onClick='someFunc()'></input>"
};
~~~


## 设置树节点的模板

要为树节点设置模板，请在 [columns](api/config/columns.md) 属性中使用 **template** 属性。

 **template** 函数的返回值将作为 inner HTML 添加，因此该属性可包含任意 HTML 结构。

:::note
请注意，如果你没有使用 [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) 进行 [server-side integration](guides/server-side.md)，加载到 Gantt 图的数据需要进行安全处理，以避免潜在的 XSS 漏洞（dhtmlxConnector 会自动处理此问题）。
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

