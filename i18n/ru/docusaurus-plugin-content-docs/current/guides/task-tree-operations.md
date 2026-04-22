---
title: "Task Parent/Child"
sidebar_label: "Task Parent/Child"
---

# Родитель/Дочерняя задача

В этой статье описаны методы, связанные с древовидной природой задач диаграммы Gantt.

*Чтобы узнать базовые операции получения объекта задачи/идентификатора, смотрите статью [Task Object/Id](guides/task-object-operations.md).*

## Родитель задачи

Чтобы получить родителя задачи, используйте метод [getParent](api/method/getparent.md) или свойство "**parent**" объекта задачи:

~~~js
gantt.getParent("t1");//->"pr_2"
//or
var taskObj = gantt.getTask("t1");//-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~
Примечание: если у указанной задачи родителя не существует, метод возвращает [root id](api/config/root_id.md).

## Дочерние задачи

Чтобы получить дочерние элементы ветвевой задачи, используйте метод [getChildren](api/method/getchildren.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"]
~~~

Чтобы получить всех потомков задачи (не только дочерние задачи первого уровня), примените метод [eachTask()](api/method/eachtask.md) и передайте идентификатор родительской задачи во второй параметр:

~~~js
const children = [];

// перебор всех дочерних элементов задачи
gantt.eachTask(function(child){
    children.push(child)
}, 11);
~~~

## Проверка наличия у задачи дочернего элемента

Чтобы проверить, есть ли у какой-либо задачи дочерняя задача, используйте метод [hasChild](api/method/haschild.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2020", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2020", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(data);
 
gantt.hasChild("p_1"); //-> true  /*!*/
gantt.hasChild("t_1"); //-> false /*!*/
~~~


## Следующая задача в дереве

Чтобы получить объект задачи, следующей за указанной, используйте метод [getNext](api/method/getnext.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2020", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2020", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(data);
 
gantt.getNext("p_1"); -> "t_1"   /*!*/
gantt.getNext("t_1"); -> "t_2"   /*!*/
gantt.getNext("t_2"); -> null    /*!*/
~~~

Примечание: диаграмма Gantt рассматривает задачи независимо от уровня дерева

## Предыдущая задача в дереве

Чтобы получить объект предыдущей задачи по отношению к указанной, используйте метод [getPrev](api/method/getprev.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2020", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2020", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(data);
 
gantt.getPrev("p_1"); ->  null   /*!*/
gantt.getPrev("t_1"); -> "p_1"   /*!*/
gantt.getPrev("t_2"); -> "t_1"   /*!*/
~~~

Примечание: диаграмма Gantt рассматривает задачи независимо от уровня дерева

## Соседние задачи

Чтобы получить соседей указанной задачи, используйте метод [getSiblings](api/method/getsiblings.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2020", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2020", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(data);
 
gantt.getSiblings("t_1"); ->  ["t_1", "t_2] /*!*/
~~~


## Следующий сосед задачи

Чтобы получить следующего соседа указанной задачи, используйте метод [getNextSibling](api/method/getnextsibling.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2020", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2020", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(data);
 
gantt.getNextSibling("t_1"); ->  "t_2" /*!*/
gantt.getNextSibling("t_2"); ->  null (if no next sibling) /*!*/
~~~

## Предыдущий сосед задачи

Чтобы получить предыдущего соседа указанной задачи, используйте метод [getPrevSibling](api/method/getprevsibling.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2020", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2020", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(data);
 
gantt.getPrevSibling("t_2"); ->  "t_1" /*!*/
gantt.getPrevSibling("t_1"); ->  null (if no previous sibling) /*!*/
~~~