---
title: "트리 열 구성"
sidebar_label: "트리 열 구성"
---

# 트리 열 구성

사용 가능한 트리 관련 메서드에 대해 알아보려면 [Task Parent/Child](guides/task-tree-operations.md) 문서를 참조하십시오.

## 작업 가지 확장/축소

- 작업 가지를 열려면 [`open()`](api/method/open.md) 메서드를 사용합니다:

~~~js {7}
const data = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18 },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};
gantt.open("p_1");
~~~

- 작업 가지를 닫으려면 [`close()`](api/method/close.md) 메서드를 사용합니다:

~~~js {7}
const data = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18 },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};
gantt.close("p_1");
~~~ 

## 여러 가지 분기 확장/축소

여러 가지 작업 분기를 열거나 닫아야 하는 경우 가장 빠른 방법은 필요한 작업의 해당 불리언 값을 프로그래밍 방식으로 설정한 다음 Gantt를 다시 그리는 것입니다(열기: `true`, 닫기: `false`).

- 모든 작업 확장:

~~~js
gantt.eachTask((task) => {
    task.$open = true;
});
gantt.render();
~~~

- 모든 작업 축소:

~~~js
gantt.eachTask((task) => {
    task.$open = false;
});
gantt.render();
~~~

:::note
모든 작업을 버튼으로 한 번에 확장/축소하려면 [How to expand/collapse all tasks with a button](guides/how-to.md#how-to-expandcollapse-all-tasks-with-a-button) 섹션으로 가세요.
:::

## 작업의 자식 가져오기

계층 구조 작업의 자식 노드를 가져오려면 [`getChildren()`](api/method/getchildren.md) 메서드를 사용합니다:

~~~js {7}
const data = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18 },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};
gantt.getChildren("p_1"); // -> ["t_1"]
~~~

*더 많은 트리 관련 메서드를 보려면 [Task Parent/Child](guides/task-tree-operations.md) 문서를 읽으십시오.*

## 트리의 아이콘 변경

### 상위 아이템
상위 아이템의 아이콘을 설정하려면 [`grid_folder`](api/template/grid_folder.md) 템플릿을 사용합니다:

~~~js
gantt.templates.grid_folder = (item) => `<div class="gantt_tree_icon gantt_folder_${item.$open ? "open" : "closed"}"></div>`;
~~~

### 자식 아이템
자식 아이템의 아이콘을 설정하려면 [`grid_file`](api/template/grid_file.md) 템플릿을 사용합니다:

~~~js
gantt.templates.grid_file = (item) => `<div class="gantt_tree_icon gantt_file"></div>`;
~~~

### 열기/닫기 기호
열기/닫기 아이콘을 설정하려면 [`grid_open`](api/template/grid_open.md) 템플릿을 사용합니다:

~~~js
gantt.templates.grid_open = (item) => `<div class="gantt_tree_icon gantt_${item.$open ? "close" : "open"}"></div>`;
~~~

## 가지의 자식들에 대한 들여쓰기 설정

가지의 자식 작업 들여쓰기를 설정하려면 [`grid_indent`](api/template/grid_indent.md) 템플릿을 사용하고 `width` CSS 속성을 변경합니다:

~~~js
gantt.templates.grid_indent = (task) => `<div style="width:20px; float:left; height:100%"></div>`;
~~~

## 트리 노드에 체크박스 추가하기

트리 노드에 체크박스나 기타 HTML 콘텐츠를 추가하려면 [`grid_blank`](api/template/grid_blank.md) 템플릿을 사용합니다:

~~~js
gantt.templates.grid_blank = (task) => `<input id="ch1" type="checkbox" onclick="someFunc()">`;
~~~

## 트리 노드의 템플릿 설정

트리 노드의 템플릿을 설정하려면 [columns](api/config/columns.md) 속성의 `template` 속성을 사용합니다.

`template` 함수의 반환 값은 내부 HTML로 추가됩니다. 따라서 속성에 어떤 HTML 구조든 사용할 수 있습니다.

:::note
[dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html)를 사용하여 서버 측과의 통합을 하지 않는 경우, Gantt 차트에 로드하는 데이터를 XSS 공격으로부터 보호하기 위해 데이터를 소독해야 합니다. [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html)는 이를 자동으로 처리합니다.
:::

~~~js
gantt.config.columns = [
    { name: "text", label: "Task name", tree: true, width: 230, template: taskTemplate },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration", label: "Duration", align: "center" }
];
gantt.init("gantt_here");

function taskTemplate(task) {
    if (task.priority === 1) {
        return `<div class="important">${task.text} (${task.users})</div>`;
    }

    return `${task.text} (${task.users})`;
};
~~~


**Related sample**: [트리 노드 템플릿](https://docs.dhtmlx.com/gantt/samples/04_customization/05_tree_template.html)