---
title: "任务的父子关系"
sidebar_label: "任务父子关系"
---

# 任务的父子关系

在本文中，您将找到与甘特图任务树结构相关的方法。

*要了解获取任务对象或 ID 的基本操作，请参阅 [Task Object/Id](guides/task-object-operations.md) 文章。*

## 任务的父任务 {#parent-of-a-task}

要获取任务的父任务，请使用 [`getParent()`](api/method/getparent.md) 方法，或任务对象的 "parent" 属性：

~~~js
gantt.getParent("t1"); // -> "pr_2"
// 或
const task = gantt.getTask("t1"); // -> { id: "t1", text: "Task #5", parent: "pr_2", ... }
const parentId = task.parent; // -> "pr_2"
~~~

如果指定任务没有父任务，该方法将返回 [root ID](api/config/root_id.md)。

## 任务的子任务

要获取分支任务的子任务，请使用 [`getChildren()`](api/method/getchildren.md) 方法：

~~~js
const taskData = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18 },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};

gantt.getChildren("p_1"); // -> ["t_1"]
~~~

要获取任务的所有子任务（不仅限于第一层子任务），请使用 [`eachTask()`](api/method/eachtask.md) 方法，并将父任务 ID 作为第二个参数传入：

~~~js
const childTasks = [];

// Iterate through all children of a task.
gantt.eachTask((childTask) => {
    childTasks.push(childTask);
}, 11);
~~~

## 检查任务是否有子任务

要检查一个任务是否有子任务，请使用 [`hasChild()`](api/method/haschild.md) 方法：

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

## 树中的下一个任务

要获取指定任务旁边的下一个任务的 ID，请使用 [`getNext()`](api/method/getnext.md) 方法：

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

Gantt 会忽略树结构中的层级，按任务进行处理。

## 树中的上一个任务

要获取指定任务之前的任务的 ID，请使用 [`getPrev()`](api/method/getprev.md) 方法：

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

Gantt 会忽略树结构中的层级，按任务进行处理。

## 任务的同级任务

要获取指定任务的同级任务，请使用 [`getSiblings()`](api/method/getsiblings.md) 方法：

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

## 同级任务中的下一个任务

要获取指定任务的下一个同级任务，请使用 [`getNextSibling()`](api/method/getnextsibling.md) 方法：

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

## 同级任务中的上一个任务

要获取指定任务的上一个同级任务，请使用 [`getPrevSibling()`](api/method/getprevsibling.md) 方法：

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