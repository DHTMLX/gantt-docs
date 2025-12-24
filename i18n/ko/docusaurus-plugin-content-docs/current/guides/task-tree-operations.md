---
title: "Task Parent/Child"
sidebar_label: "Task Parent/Child"
---

# Task Parent/Child  


이 문서에서는 Gantt 차트에서 작업의 계층 구조를 다루는 메서드들을 설명합니다.

*작업 객체나 ID를 조회하는 기본적인 작업에 대해서는 [Task Object/Id](guides/task-object-operations.md) 문서를 참고하세요.*

## 작업의 부모 찾기  

작업의 부모를 찾으려면 [getParent](api/method/getparent.md) 메서드를 사용하거나, 작업 객체의 "**parent**" 속성에 접근할 수 있습니다:

~~~js
gantt.getParent("t1");//->"pr_2"
//또는
var taskObj = gantt.getTask("t1");//-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~
작업에 부모가 없는 경우, 이 메서드는 [root id](api/config/root_id.md)를 반환합니다.

## 작업의 자식 찾기  

브랜치 작업의 자식들을 조회하려면 [getChildren](api/method/getchildren.md) 메서드를 사용하세요:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"]
~~~

작업의 모든 자식(직계만이 아닌 전체 자식)을 얻으려면 [eachTask()](api/method/eachtask.md) 메서드를 부모 작업의 ID와 함께 사용하세요:

~~~js
const children = [];
// 작업의 모든 자식을 순회합니다
gantt.eachTask(function(child){
    children.push(child)
}, 11);
~~~

## 작업에 자식이 있는지 확인하기  

작업에 자식 작업이 있는지 확인하려면 [hasChild](api/method/haschild.md) 메서드를 사용하세요:

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

## 트리 내에서 다음 작업 찾기  

특정 작업 다음에 오는 작업 객체를 얻으려면 [getNext](api/method/getnext.md) 메서드를 사용하세요:

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

gantt는 트리 레벨과 상관없이 작업을 동일하게 처리한다는 점에 유의하세요.

## 트리 내에서 이전 작업 찾기  

특정 작업 앞에 오는 작업 객체를 얻으려면 [getPrev](api/method/getprev.md) 메서드를 사용하세요:

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

여기서도 작업은 트리 레벨에 상관없이 처리됩니다.

## 작업의 형제 찾기  

특정 작업의 형제(같은 부모를 가진 작업)를 얻으려면 [getSiblings](api/method/getsiblings.md) 메서드를 사용하세요:

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

## 작업의 다음 형제 찾기  

작업의 다음 형제를 찾으려면 [getNextSibling](api/method/getnextsibling.md) 메서드를 사용하세요:

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
gantt.getNextSibling("t_2"); ->  null (다음 형제가 없는 경우) /*!*/
~~~

## 작업의 이전 형제 찾기  

작업의 이전 형제를 얻으려면 [getPrevSibling](api/method/getprevsibling.md) 메서드를 사용하세요:

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
gantt.getPrevSibling("t_1"); ->  null (이전 형제가 없는 경우) /*!*/
~~~

