---
title: "Настройка древовидной колонки"
sidebar_label: "Настройка древовидной колонки"
---

# Настройка древовидной колонки

Для получения информации о доступных методах, связанных с деревом, ознакомьтесь со статьёй [Task Parent/Child](guides/task-tree-operations.md).

## Разворачивание/сворачивание ветки задачи

- Чтобы развернуть ветку задачи, используйте метод [open](api/method/open.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.open("p_1"); /*!*/
~~~

- Чтобы свернуть ветку задачи, используйте метод [close](api/method/close.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.close("p_1"); /*!*/
~~~ 

## Разворачивание/сворачивание нескольких веток

Если необходимо открыть или закрыть сразу несколько веток задач, самый быстрый способ - программно присвоить булево значение (true для открытия, false для закрытия) свойству *.$open* нужных задач, а затем обновить Gantt.

- разворачивание всех задач:

~~~js
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();
~~~

- сворачивание всех задач:

~~~js
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

:::note
Чтобы добавить кнопку, которая будет сворачивать или разворачивать все задачи сразу, смотрите раздел [Решения: Как развернуть/свернуть все задачи кнопкой](guides/how-to.md#howtoexpandcollapsealltaskswithabutton).
:::

## Получение дочерних задач

Чтобы получить дочерние элементы ветки, используйте метод [getChildren](api/method/getchildren.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"] /*!*/
~~~

*Дополнительные методы для работы с деревом описаны в статье [Task Parent/Child](guides/task-tree-operations.md).*

## Изменение иконок дерева

### Родительские элементы
Чтобы изменить иконку для родительских элементов, используйте шаблон [grid_folder](api/template/grid_folder.md):

~~~js
gantt.templates.grid_folder = function(item) {
    return "<div class='gantt_tree_icon gantt_folder_" +
    (item.$open ? "open" : "closed") + "'></div>";
};
~~~


### Дочерние элементы
Чтобы изменить иконку для дочерних элементов, используйте шаблон [grid_file](api/template/grid_file.md):

~~~js
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~


### Знак открытия/закрытия
Чтобы изменить иконку для знака открытия/закрытия, используйте шаблон [grid_open](api/template/grid_open.md):

~~~js
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~


## Настройка отступа дочерних задач в ветке

Чтобы изменить отступ дочерних задач внутри ветки, используйте шаблон [grid_indent](api/template/grid_indent.md), изменяя CSS-свойство **width**:

~~~js
gantt.templates.grid_indent="function(task){"
    return "<div style='width:20px; float:left; height:100%'></div>"
};
~~~


## Добавление чекбоксов в узлы дерева

Чтобы добавить чекбоксы (или любой другой HTML-контент) в узлы дерева, используйте шаблон [grid_blank](api/template/grid_blank.md):

~~~js
gantt.templates.grid_blank="function(task){"
    return "<input id='ch1' type='checkbox' onClick='someFunc()'></input>"
};
~~~


## Настройка шаблона узлов дерева

Чтобы задать шаблон для узлов дерева, используйте атрибут **template** в свойстве [columns](api/config/columns.md). 

 Возвращаемое значение функции **template** будет добавлено как inner HTML, поэтому вы можете использовать любую HTML-разметку.

:::note
Обратите внимание: если вы не используете [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) для [серверной интеграции](guides/server-side.md), важно очищать данные, загружаемые в диаграмму Gantt, чтобы избежать возможных XSS-уязвимостей (dhtmlxConnector делает это автоматически).
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

