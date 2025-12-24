---
title: "트리 컬럼 구성하기"
sidebar_label: "트리 컬럼 구성하기"
---

# 트리 컬럼 구성하기

트리 관련 사용 가능한 메서드에 대한 자세한 내용은 [Task Parent/Child](guides/task-tree-operations.md) 문서를 참고하세요.

## 작업 브랜치 확장/축소하기

- 작업 브랜치를 확장하려면 [open](api/method/open.md) 메서드를 사용하세요:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.open("p_1"); /*!*/
~~~

- 작업 브랜치를 축소하려면 [close](api/method/close.md) 메서드를 사용하세요:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.close("p_1"); /*!*/
~~~ 

## 여러 브랜치 확장/축소하기

여러 작업 브랜치를 한 번에 열거나 닫아야 할 경우, 관련 작업의 *.$open* 속성에 true(열기) 또는 false(닫기) 값을 프로그래밍적으로 할당한 후 gantt를 새로 고치는 것이 가장 빠른 방법입니다.

- 모든 작업 확장하기:

~~~js
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();
~~~

- 모든 작업 축소하기:

~~~js
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

:::note
모든 작업을 한 번에 확장하거나 축소하는 버튼을 추가하려면 [How to expand/collapse all tasks with a button](guides/how-to.md#howtoexpandcollapsealltaskswithabutton) 섹션을 참고하세요.
:::

## 작업의 자식 가져오기

브랜치 작업의 자식 항목을 가져오려면 [getChildren](api/method/getchildren.md) 메서드를 사용하세요:

~~~js
var data = {
  tasks:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:"t_1", text:"Task #1",    start_date:"02-04-2020", duration:8,
     parent:"p_1"}
]};
gantt.getChildren("p_1");//->["t_1"] /*!*/
~~~

*추가적인 트리 관련 메서드는 [Task Parent/Child](guides/task-tree-operations.md) 문서를 참고하세요.*

## 트리 아이콘 변경하기

### 부모 항목
부모 항목의 아이콘을 사용자 정의하려면 [grid_folder](api/template/grid_folder.md) 템플릿을 사용하세요:

~~~js
gantt.templates.grid_folder = function(item) {
    return "<div class='gantt_tree_icon gantt_folder_" +
    (item.$open ? "open" : "closed") + "'></div>";
};
~~~

### 자식 항목
자식 항목의 아이콘을 사용자 정의하려면 [grid_file](api/template/grid_file.md) 템플릿을 사용하세요:

~~~js
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~

### 열기/닫기 표시 아이콘
열기/닫기 표시 아이콘을 사용자 정의하려면 [grid_open](api/template/grid_open.md) 템플릿을 사용하세요:

~~~js
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~

## 브랜치 내 자식 들여쓰기 설정

브랜치 내 자식 작업의 들여쓰기를 조정하려면 [grid_indent](api/template/grid_indent.md) 템플릿에서 **width** CSS 속성을 수정하세요:

~~~js
gantt.templates.grid_indent="function(task){"
    return "<div style='width:20px; float:left; height:100%'></div>"
};
~~~

## 트리 노드에 체크박스 추가하기

트리 노드 내부에 체크박스(또는 기타 HTML 콘텐츠)를 추가하려면 [grid_blank](api/template/grid_blank.md) 템플릿을 사용하세요:

~~~js
gantt.templates.grid_blank="function(task){"
    return "<input id='ch1' type='checkbox' onClick='someFunc()'></input>"
};
~~~

## 트리 노드의 템플릿 설정하기

트리 노드의 템플릿을 정의하려면 [columns](api/config/columns.md) 속성의 **template** 속성을 사용하세요. 

 **template** 함수의 반환 값은 내부 HTML로 추가되므로, 이 속성 내에서 어떤 HTML 구조도 사용할 수 있습니다.

:::note
[dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html)를 사용하지 않고 [server-side integration](guides/server-side.md)을 구현하는 경우, Gantt 차트에 로드되는 데이터를 반드시 sanitize 하여 잠재적인 XSS 취약점을 방지해야 합니다(dhtmlxConnector는 이를 자동으로 처리합니다).
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

