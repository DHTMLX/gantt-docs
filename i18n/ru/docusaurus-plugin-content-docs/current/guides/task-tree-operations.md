---
title: "Task Parent/Child"
sidebar_label: "Task Parent/Child"
---

Task Parent/Child
=============================

В этой статье рассматриваются методы, работающие с иерархической структурой задач в диаграмме Gantt.

*Для базовых операций, таких как получение объекта задачи или её ID, ознакомьтесь со статьёй [Task Object/Id](guides/task-object-operations.md).*

Родитель задачи
---------------------------------------
Чтобы найти родителя задачи, используйте метод [getParent](api/method/getparent.md) или обратитесь к свойству "**parent**" объекта задачи:

~~~js
gantt.getParent("t1");//->"pr_2"
//или
var taskObj = gantt.getTask("t1");//-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~
Имейте в виду, если у задачи нет родителя, метод вернёт [root id](api/config/root_id.md).

Дочерние задачи
--------------------------
Чтобы получить дочерние задачи для ветвевой задачи, используйте метод [getChildren](api/method/getchildren.md):

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"]
~~~

Если необходимо получить все дочерние задачи (не только непосредственные), воспользуйтесь методом [eachTask()](api/method/eachtask.md) с ID родительской задачи в качестве второго аргумента:

~~~js
const children = [];
// перебор всех дочерних задач
gantt.eachTask(function(child){
    children.push(child)
}, 11);
~~~

Проверка наличия дочерних задач
----------------------------------------
Чтобы узнать, есть ли у задачи дочерние задачи, используйте метод [hasChild](api/method/haschild.md):

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

Следующая задача в дереве
--------------------------------------
Чтобы получить объект задачи, которая идёт после заданной, используйте метод [getNext](api/method/getnext.md):

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

Обратите внимание, что Gantt рассматривает задачи одинаково, независимо от их уровня в дереве.

Предыдущая задача в дереве
--------------------------------------
Чтобы получить объект задачи, которая идёт перед заданной, используйте метод [getPrev](api/method/getprev.md):

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

Опять же, задачи рассматриваются без учёта их уровня в дереве.

Соседние задачи (сиблинги)
---------------------------------------
Чтобы получить сиблингов (соседние задачи) определённой задачи, используйте метод [getSiblings](api/method/getsiblings.md):

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
 
gantt.getSiblings("t_1"); ->  ["t_1", "t_2"] /*!*/
~~~


Следующий сиблинг задачи
---------------------------------------
Чтобы найти следующего сиблинга задачи, используйте метод [getNextSibling](api/method/getnextsibling.md):

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
gantt.getNextSibling("t_2"); ->  null (если нет следующего сиблинга) /*!*/
~~~


Предыдущий сиблинг задачи
---------------------------------------
Чтобы получить предыдущего сиблинга задачи, используйте метод [getPrevSibling](api/method/getprevsibling.md):

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
gantt.getPrevSibling("t_1"); ->  null (если нет предыдущего сиблинга) /*!*/
~~~

