---
title: "任务的父子关系"
sidebar_label: "任务的父子关系"
---

任务的父子关系
=============================

本文介绍了处理甘特图中任务层级结构的方法。

*如需了解获取任务对象或ID等基本操作，请参考 [Task Object/Id](guides/task-object-operations.md) 文章。*

任务的父任务
---------------------------------------
要查找某个任务的父任务，可以使用 [getParent](api/method/getparent.md) 方法，或者访问任务对象的 "**parent**" 属性:

~~~js
gantt.getParent("t1");//->"pr_2"
//或
var taskObj = gantt.getTask("t1");//-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~
请注意，如果任务没有父任务，该方法会返回 [root id](api/config/root_id.md)。

任务的子任务
--------------------------
要获取某个分支任务的子任务，可以使用 [getChildren](api/method/getchildren.md) 方法:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"]
~~~

如果你想获取某个任务的所有子任务（不仅仅是直接子任务），可以使用 [eachTask()](api/method/eachtask.md) 方法，并将父任务的ID作为第二个参数:

~~~js
const children = [];
// 遍历某任务的所有子任务
gantt.eachTask(function(child){
    children.push(child)
}, 11);
~~~

检查任务是否有子任务
----------------------------------------
要判断某个任务是否有子任务，可以使用 [hasChild](api/method/haschild.md) 方法:

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

树中的下一个任务
--------------------------------------
要获取某个任务之后的任务对象，可以使用 [getNext](api/method/getnext.md) 方法:

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

请注意，gantt 无论任务的树层级如何，都会以相同方式处理任务。

树中的上一个任务
--------------------------------------
要获取某个任务之前的任务对象，可以使用 [getPrev](api/method/getprev.md) 方法:

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

同样，任务的处理不考虑其在树中的层级。

任务的同级任务（兄弟任务）
---------------------------------------
要获取某个任务的兄弟任务，可以使用 [getSiblings](api/method/getsiblings.md) 方法:

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

任务的下一个同级任务
---------------------------------------
要查找某个任务的下一个同级任务，可以使用 [getNextSibling](api/method/getnextsibling.md) 方法:

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
gantt.getNextSibling("t_2"); ->  null (如果没有下一个同级任务) /*!*/
~~~

任务的上一个同级任务
---------------------------------------
要获取某个任务的上一个同级任务，可以使用 [getPrevSibling](api/method/getprevsibling.md) 方法:

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
gantt.getPrevSibling("t_1"); ->  null (如果没有上一个同级任务) /*!*/
~~~

