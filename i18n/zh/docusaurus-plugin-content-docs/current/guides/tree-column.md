---
title: "配置树形列"
sidebar_label: "配置树形列"
---

# 配置树形列

若要了解可用的树相关方法，请参考 [Task Parent/Child](guides/task-tree-operations.md) 文章。

## 展开/折叠一个任务分支

- 要打开一个任务分支，请使用 [open](api/method/open.md) 方法：

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.open("p_1"); /*!*/
~~~

- 要关闭一个任务分支，请使用 [close](api/method/close.md) 方法：

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.close("p_1"); /*!*/
~~~ 

## 展开/折叠若干分支

如果你需要打开/关闭多个任务分支，最快的方法是在所需任务的 *.$open* 属性上以编程方式设置相应的布尔值（true 表示打开，false 表示关闭），然后重新绘制甘特图。

- 展开所有任务：

~~~js
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();
~~~

- 折叠所有任务：

~~~js
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

:::note
如果你想通过按钮一次性折叠/展开所有任务，请前往 [How to expand/collapse all tasks with a button](guides/how-to.md#how-to-expandcollapse-all-tasks-with-a-button) 小节。
:::

## 获取一个任务的子节点

要获取分支任务的子节点，请使用 [getChildren](api/method/getchildren.md) 方法：

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"] /*!*/
~~~

*如需查看更多树相关方法，请阅读 [Task Parent/Child](guides/task-tree-operations.md) 文章。*

## 更改树的图标

### 父项
要为父项设置图标，请使用 [grid_folder](api/template/grid_folder.md) 模板：

~~~js
gantt.templates.grid_folder = function(item) {
    return "<div class='gantt_tree_icon gantt_folder_" +
    (item.$open ? "open" : "closed") + "'></div>";
};
~~~

### 子项
要为子项设置图标，请使用 [grid_file](api/template/grid_file.md) 模板：

~~~js
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~

### 打开/关闭符号
要为打开/关闭符号设置图标，请使用 [grid_open](api/template/grid_open.md) 模板：

~~~js
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~

## 设置分支中子任务的缩进

要设置分支中子任务的缩进，请使用 [grid_indent](api/template/grid_indent.md) 模板（修改 CSS 属性中的 **width**）：

~~~js
gantt.templates.grid_indent="function(task){"
    return "<div style='width:20px; float:left; height:100%'></div>"
};
~~~

## 向树节点添加复选框

要向树节点添加复选框（或任何其他 HTML 内容），请使用 [grid_blank](api/template/grid_blank.md) 模板：

~~~js
gantt.templates.grid_blank="function(task){"
    return "<input id='ch1' type='checkbox' onClick='someFunc()'></input>"
};
~~~

## 设置树节点的模板

要为树节点设置模板，请在 [columns](api/config/columns.md) 属性中使用 **template** 属性。

 模板函数的返回值将被添加为内部 HTML。因此，你可以在该属性中使用任何 HTML 结构。

:::note
注意，如果你没有使用 [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) 将服务器端集成，请在将数据加载到 Gantt 图表时进行清洗，以防止潜在的 XSS 攻击（[dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) 会自动处理）。
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

[树节点模板](https://docs.dhtmlx.com/gantt/samples/04_customization/05_tree_template.html)