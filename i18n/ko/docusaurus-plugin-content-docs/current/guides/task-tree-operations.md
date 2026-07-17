---
title: "작업의 상위/하위"
sidebar_label: "작업의 상위/하위"
---

# 작업의 상위/하위

이 문서에서는 간트 차트 작업의 트리 구조와 관련된 메서드를 다룹니다.

*작업 객체나 ID를 얻기 위한 기본 연산에 대해 알아보려면 [Task Object/Id](guides/task-object-operations.md) 문서를 참조하세요.*

## 작업의 상위 {#parent-of-a-task}

작업의 상위를 얻으려면 [`getParent()`](api/method/getparent.md) 메서드 또는 작업 객체의 `"parent"` 속성을 사용하세요:

~~~js
gantt.getParent("t1"); // -> "pr_2"
// or
const task = gantt.getTask("t1"); // -> { id: "t1", text: "Task #5", parent: "pr_2", ... }
const parentId = task.parent; // -> "pr_2"
~~~

지정된 작업에 상위가 없으면 메서드는 [root ID](api/config/root_id.md)를 반환합니다.

## 작업의 자식

브랜치 작업의 자식을 얻으려면 [`getChildren()`](api/method/getchildren.md) 메서드를 사용하세요:

~~~js
const taskData = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18 },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};

gantt.getChildren("p_1"); // -> ["t_1"]
~~~

하나의 작업의 모든 자식(최상위 자식뿐 아니라 모든 자식)을 얻으려면 두 번째 매개변수에 상위 작업 ID를 전달하고 [`eachTask()`](api/method/eachtask.md) 메서드를 사용하세요:

~~~js
const childTasks = [];

// Iterate through all children of a task.
gantt.eachTask((childTask) => {
    childTasks.push(childTask);
}, 11);
~~~

## 작업에 자식이 있는지 확인

작업에 자식 작업이 있는지 확인하려면 [`hasChild()`](api/method/haschild.md) 메서드를 사용하세요:

~~~js {11-12}
const taskData = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18, open: true },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};
gantt.init("gantt_here");
gantt.parse(taskData);

gantt.hasChild("p_1"); // -> true
gantt.hasChild("t_1"); // -> false
~~~

## 트리에서의 다음 작업

지정된 작업의 옆에 있는 다음 작업의 ID를 얻으려면 [`getNext()`](api/method/getnext.md) 메서드를 사용하세요:

~~~js {11-13}
const taskData = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18, open: true },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" },
        { id: "t_2", text: "Task #2", start_date: "2027-04-11", duration: 8, parent: "p_1" }
    ]
};
gantt.init("gantt_here");
gantt.parse(taskData);

gantt.getNext("p_1"); // -> "t_1"
gantt.getNext("t_1"); // -> "t_2"
gantt.getNext("t_2"); // -> null
~~~

간트 차트는 트리의 계층에 관계없이 작업을 간주합니다.

## 트리에서의 이전 작업

지정된 작업 이전의 작업의 ID를 얻으려면 [`getPrev()`](api/method/getprev.md) 메서드를 사용하세요:

~~~js {11-13}
const taskData = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18, open: true },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" },
        { id: "t_2", text: "Task #2", start_date: "2027-04-11", duration: 8, parent: "p_1" }
    ]
};
gantt.init("gantt_here");
gantt.parse(taskData);

gantt.getPrev("p_1"); // -> null
gantt.getPrev("t_1"); // -> "p_1"
gantt.getPrev("t_2"); // -> "t_1"
~~~

간트 차트는 트리의 계층에 관계없이 작업을 간주합니다.

## 작업의 형제

지정된 작업의 형제 작업을 얻으려면 [`getSiblings()`](api/method/getsiblings.md) 메서드를 사용하세요:

~~~js {11}
const taskData = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18, open: true },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" },
        { id: "t_2", text: "Task #2", start_date: "2027-04-11", duration: 8, parent: "p_1" }
    ]
};
gantt.init("gantt_here");
gantt.parse(taskData);

gantt.getSiblings("t_1"); // -> ["t_1", "t_2"]
~~~

## 다음 형제 작업

지정된 작업의 다음 형제 작업을 얻으려면 [`getNextSibling()`](api/method/getnextsibling.md) 메서드를 사용하세요:

~~~js {11-12}
const taskData = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18, open: true },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" },
        { id: "t_2", text: "Task #2", start_date: "2027-04-11", duration: 8, parent: "p_1" }
    ]
};
gantt.init("gantt_here");
gantt.parse(taskData);

gantt.getNextSibling("t_1"); // -> "t_2"
gantt.getNextSibling("t_2"); // -> null
~~~

## 이전 형제 작업

지정된 작업의 이전 형제 작업을 얻으려면 [`getPrevSibling()`](api/method/getprevsibling.md) 메서드를 사용하세요:

~~~js {11-12}
const taskData = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18, open: true },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" },
        { id: "t_2", text: "Task #2", start_date: "2027-04-11", duration: 8, parent: "p_1" }
    ]
};
gantt.init("gantt_here");
gantt.parse(taskData);

gantt.getPrevSibling("t_2"); // -> "t_1"
gantt.getPrevSibling("t_1"); // -> null
~~~