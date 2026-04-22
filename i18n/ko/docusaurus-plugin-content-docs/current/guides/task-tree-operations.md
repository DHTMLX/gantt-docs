---
title: "작업의 상위/하위"
sidebar_label: "작업의 상위/하위"
---

# 작업의 상위/하위

이 문서에서는 간트 차트 작업의 트리 구조와 관련된 메서드를 찾을 수 있습니다.

*작업 객체/ID를 얻는 기본 작업에 대해 알아보려면 [Task Object/Id](guides/task-object-operations.md) 문서를 참조하십시오.*

## 작업의 부모

작업의 부모를 얻으려면 [getParent](api/method/getparent.md) 메서드 또는 작업 객체의 "**parent**" 속성을 사용하세요:

~~~js
gantt.getParent("t1");//->"pr_2"
//or
var taskObj = gantt.getTask("t1");//-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~
참고: 지정된 작업에 부모가 없으면 메서드는 [root id](api/config/root_id.md)를 반환합니다.

## 작업의 자식

브랜치 작업의 자식을 얻으려면 [getChildren](api/method/getchildren.md) 메서드를 사용하세요:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"]
~~~

어떤 작업의 모든 자식(1단계 자식뿐만 아니라 모든 계층의 자식)을 얻으려면 두 번째 매개변수로 부모 작업의 ID를 전달하고 [eachTask()](api/method/eachtask.md) 메서드를 적용하세요:

~~~js
const children = [];
// iterate through all children of a task
gantt.eachTask(function(child){
    children.push(child)
}, 11);
~~~

## 작업에 자식이 있는지 확인

일부 작업에 자식 작업이 있는지 확인하려면 [hasChild](api/method/haschild.md) 메서드를 사용하세요:

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

## 트리에서의 다음 작업

특정 작업 옆에 있는 객체를 얻으려면 [getNext](api/method/getnext.md) 메서드를 사용하세요:

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

참고: 간트 차트는 트리 레벨과 상관없이 작업을 간주합니다


## 트리에서의 이전 작업

지정된 작업 옆에 있는 이전 작업의 객체를 얻으려면 [getPrev](api/method/getprev.md) 메서드를 사용하세요:

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

참고: 간트 차트는 트리 레벨과 상관없이 작업을 간주합니다


## 작업의 형제

지정된 작업의 형제를 얻으려면 [getSiblings](api/method/getsiblings.md) 메서드를 사용하세요:

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


## 다음 형제

특정 작업의 다음 형제를 얻으려면 [getNextSibling](api/method/getnextsibling.md) 메서드를 사용하세요:

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


## 이전 형제

지정된 작업의 이전 형제를 얻으려면 [getPrevSibling](api/method/getprevsibling.md) 메서드를 사용하세요:

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