---
title: "트리 열 구성"
sidebar_label: "트리 열 구성"
---

# 트리 열 구성

사용 가능한 트리 관련 메서드에 대해 알아보려면 [Task Parent/Child](guides/task-tree-operations.md) 문서를 참조하십시오.

## 작업 분기 확장/축소

- 작업 분기를 열려면 [open](api/method/open.md) 메서드를 사용하십시오:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.open("p_1"); /*!*/
~~~

- 작업 분기를 닫으려면 [close](api/method/close.md) 메서드를 사용하십시오:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.close("p_1"); /*!*/
~~~ 

## 여러 분기 확장/축소

여러 개의 작업 분기를 열거나 닫아야 하는 경우 가장 빠른 방법은 필요한 작업의 해당 불리언 값을 프로그래밍 방식으로 설정하고(true는 열림, false는 닫힘) 필요한 작업의 *.$open* 속성에 적용한 다음 간트 차트를 다시 렌더링하는 것입니다.

- 모든 작업 확장:

~~~js
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();
~~~

- 모든 작업 축소:

~~~js
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

:::note
한 버튼으로 모든 작업을 확장/축소하려면 [How to expand/collapse all tasks with a button](guides/how-to.md#how-to-expandcollapse-all-tasks-with-a-button) 섹션으로 이동하십시오.
:::

## 작업의 자식 가져오기

브랜치 작업의 자식을 가져오려면 [getChildren](api/method/getchildren.md) 메서드를 사용하십시오:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"] /*!*/
~~~

*트리 관련 추가 메서드에 대해서는 [Task Parent/Child](guides/task-tree-operations.md) 문서를 읽어 보십시오.*

## 트리 아이콘 변경

### 상위 아이템
상위 아이템의 아이콘을 설정하려면 [grid_folder](api/template/grid_folder.md) 템플릿을 사용하십시오:

~~~js
gantt.templates.grid_folder = function(item) {
    return "<div class='gantt_tree_icon gantt_folder_" +
    (item.$open ? "open" : "closed") + "'></div>";
};
~~~


### 자식 아이템
자식 아이템의 아이콘을 설정하려면 [grid_file](api/template/grid_file.md) 템플릿을 사용하십시오:

~~~js
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~


### 열기/닫기 기호
열기/닫기 기호의 아이콘을 설정하려면 [grid_open](api/template/grid_open.md) 템플릿을 사용하십시오:

~~~js
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~


## 가지 분기에서 자식의 들여쓰기 설정

가지 분기에 있는 자식 작업의 들여쓰기를 설정하려면 [grid_indent](api/template/grid_indent.md) 템플릿을 사용하십시오(**width** CSS 속성 변경):

~~~js
gantt.templates.grid_indent="function(task){"
    return "<div style='width:20px; float:left; height:100%'></div>"
};
~~~


## 트리 노드에 체크박스 추가

트리 노드에 체크박스(또는 기타 HTML 콘텐츠)를 추가하려면 [grid_blank](api/template/grid_blank.md) 템플릿을 사용하십시오:

~~~js
gantt.templates.grid_blank="function(task){"
    return "<input id='ch1' type='checkbox' onClick='someFunc()'></input>"
};
~~~


## 트리 노드의 템플릿 설정

트리 노드의 템플릿을 설정하려면 [columns](api/config/columns.md) 속성에서 **template** 속성을 사용하십시오. 

 **template** 함수의 반환 값은 내부 HTML로 추가됩니다. 따라서 속성 안에서 어떤 HTML 구조든 사용할 수 있습니다.

:::note
[If you don't use [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) to [integrate with the server side](guides/server-side.md), you have to sanitize the data 
you load into the Gantt chart in order to prevent possible XSS attacks ([dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) does it automatically)
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


[Tree 노드 템플릿](https://docs.dhtmlx.com/gantt/samples/04_customization/05_tree_template.html)