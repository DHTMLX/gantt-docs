---
title: "Настройка древовидной колонки"
sidebar_label: "Настройка древовидной колонки"
---

# Настройка столбца дерева

Чтобы узнать о доступных методах, связанных с деревом, пожалуйста, ознакомьтесь со статьей [«Родитель/Дочерний элемент задачи»](guides/task-tree-operations.md).

## Раскрытие/сворачивание ветви задачи

- Чтобы открыть ветку задачи, используйте метод [open](api/method/open.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.open("p_1"); /*!*/
~~~

- Чтобы закрыть ветку задачи, используйте метод [close](api/method/close.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.close("p_1"); /*!*/
~~~ 

## Раскрытие/сворачивание нескольких ветвей

Если вам нужно открыть/закрыть несколько ветвей задач, fastest способ — программно задать соответствующее логическое значение (true — открыть, false — закрыть) в свойство *.$open* нужных задач и затем перерисовать Gantt.

- раскрытие всех задач:

~~~js
Gantt.eachTask(function(task){
    task.$open = true;
});
Gantt.render();
~~~

- сворачивание всех задач:

~~~js
Gantt.eachTask(function(task){
    task.$open = false;
});
Gantt.render();
~~~

:::note
Если вы хотите сворачивать/разворачивать все задачи одновременно при помощи кнопки, перейдите к разделу [Как расширить/свернуть все задачи с кнопкой](guides/how-to.md#how-to-expandcollapse-all-tasks-with-a-button).
:::

## Получение детей задачи

Чтобы получить дочерние элементы ветви задачи, используйте метод [getChildren](api/method/getchildren.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"] /*!*/
~~~

*Чтобы увидеть больше методов, связанных с деревом, пожалуйста, прочитайте статью [«Родитель/Дочерний элемент задачи»](guides/task-tree-operations.md).*

## Изменение иконок дерева

### Элементы-родители
Чтобы задать иконку для элементов-родителей, используйте шаблон [grid_folder](api/template/grid_folder.md):

~~~js
gantt.templates.grid_folder = function(item) {
    return "<div class='gantt_tree_icon gantt_folder_" +
    (item.$open ? "open" : "closed") + "'></div>";
};
~~~

### Дочерние элементы
Чтобы задать иконку для дочерних элементов, используйте шаблон [grid_file](api/template/grid_file.md):

~~~js
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~

### Знак открытия/закрытия
Чтобы задать иконку для знака открытия/закрытия, используйте шаблон [grid_open](api/template/grid_open.md):

~~~js
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~

## Настройка отступа детей в ветви

Чтобы задать отступ дочерних задач в ветви, используйте шаблон [grid_indent](api/template/grid_indent.md) (измените свойство CSS **width**):

~~~js
gantt.templates.grid_indent="function(task){"
    return "<div style='width:20px; float:left; height:100%'></div>"
};
~~~

## Добавление флажков к узлам дерева

Чтобы добавить флажки (или любой другой HTML-контент) к узлам дерева, используйте шаблон [grid_blank](api/template/grid_blank.md):

~~~js
gantt.templates.grid_blank="function(task){"
    return "<input id='ch1' type='checkbox' onClick='someFunc()'></input>"
};
~~~

## Задание шаблона узлов дерева

Чтобы задать шаблон для узлов дерева, используйте атрибут **template** в свойстве [columns](api/config/columns.md). 

 Возвращаемое значение функции шаблона будет добавлено в качестве внутреннего HTML. Поэтому вы можете использовать любые HTML-структуры в этом атрибуте.

:::note
Примечание: если вы не используете [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) для интеграции с серверной стороной, вам нужно очистить данные, которые вы загружаете в диаграмму Gantt, чтобы предотвратить возможные XSS-атаки ([dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) делает это автоматически).
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

[Шаблон узлов дерева](https://docs.dhtmlx.com/gantt/samples/04_customization/05_tree_template.html)