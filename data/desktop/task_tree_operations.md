Getting the Task Parent/Child
============================================
In this article you will find methods related to the tree nature of the Gantt chart tasks.<br> *To know about basic operations of getting the task object/id, please, refer to the desktop/task_object_operations.md article.*

Parent of a task
---------------------------------------
To get the parent of a task, use the api/gantt_getparent.md method or the "**parent**" property of the task's object:

~~~js
gantt.getParent("t1");//->"pr_2"
//or
var taskObj = gantt.getTask("t1");//-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~
Note, if there is no parent for the specified task, the method returns the [root id](api/gantt_root_id_config.md).



Children of a task
--------------------------
To get children of a branch task, use the api/gantt_getchildren.md method:

~~~js
var tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2013", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"]
~~~



Checking if a task has a child
----------------------------------------
To check if some task has a child task, use the api/gantt_haschild.md method:

~~~js
var tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.hasChild("p_1"); //-> true  /*!*/
gantt.hasChild("t_1"); //-> false /*!*/
~~~

Next task in a tree
--------------------------------------
To get the object of a task next to the specified one, use the api/gantt_getnext.md method:

~~~js
var tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getNext("p_1"); -> "t_1"   /*!*/
gantt.getNext("t_1"); -> "t_2"   /*!*/
gantt.getNext("t_2"); -> null    /*!*/
~~~

Note, the gantt considers tasks regardless of the tree level


Previous task in a tree
--------------------------------------
To get the object of a task next to the specified one, use the api/gantt_getprev.md method:

~~~js
var tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getNext("p_1"); ->  null 
gantt.getNext("t_1"); -> "p_1" 
gantt.getNext("t_2"); -> "t_1"
~~~

Note, the gantt considers tasks regardless of the tree level


Siblings of a task
---------------------------------------
To get siblings of the specified task, use the  api/gantt_getsiblings.md method:

~~~js
var tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getSiblings("t_1"); ->  ["t_1", "t_2] /*!*/
~~~


Next sibling of a task
---------------------------------------
To get the next sibling of the specified task, use the  api/gantt_getnextsibling.md method:

~~~js
var tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getNextSibling("t_1"); ->  "t_2" /*!*/
gantt.getNextSibling("t_2"); ->  null (if no next sibling) /*!*/
~~~


Previous sibling of a task
---------------------------------------
To get the previous sibling of the specified task, use the  api/gantt_getprevsibling.md method:

~~~js
var tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, 
     open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8,
     parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getPrevSibling("t_2"); ->  "t_1" /*!*/
gantt.getPrevSibling("t_1"); ->  null (if no previous sibling) /*!*/
~~~



