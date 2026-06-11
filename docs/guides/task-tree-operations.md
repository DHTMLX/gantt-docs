---
title: "Task Parent/Child"
sidebar_label: "Task Parent/Child"
---

# Task Parent/Child

In this article, you will find methods related to the tree structure of Gantt chart tasks.

*To learn about basic operations for getting the task object or ID, refer to the [Task Object/Id](guides/task-object-operations.md) article.*

## Parent of a task

To get the parent of a task, use the [`getParent()`](api/method/getparent.md) method or the `"parent"` property of the task object:

~~~js
gantt.getParent("t1"); // -> "pr_2"
// or
const task = gantt.getTask("t1"); // -> { id: "t1", text: "Task #5", parent: "pr_2", ... }
const parentId = task.parent; // -> "pr_2"
~~~

If there is no parent for the specified task, the method returns the [root ID](api/config/root_id.md).

## Children of a task

To get the children of a branch task, use the [`getChildren()`](api/method/getchildren.md) method:

~~~js
const taskData = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18 },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};

gantt.getChildren("p_1"); // -> ["t_1"]
~~~

To get all children of a task, not only first-level child tasks, use the [`eachTask()`](api/method/eachtask.md) method and pass the parent task ID as the second parameter:

~~~js
const childTasks = [];

// Iterate through all children of a task.
gantt.eachTask((childTask) => {
    childTasks.push(childTask);
}, 11);
~~~

## Checking if a task has a child

To check whether a task has a child task, use the [`hasChild()`](api/method/haschild.md) method:

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

## Next task in a tree

To get the ID of the task next to the specified one, use the [`getNext()`](api/method/getnext.md) method:

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

Gantt considers tasks regardless of the tree level.

## Previous task in a tree

To get the ID of the task previous to the specified one, use the [`getPrev()`](api/method/getprev.md) method:

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

Gantt considers tasks regardless of the tree level.

## Siblings of a task

To get the siblings of the specified task, use the [`getSiblings()`](api/method/getsiblings.md) method:

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

## Next sibling of a task

To get the next sibling of the specified task, use the [`getNextSibling()`](api/method/getnextsibling.md) method:

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

## Previous sibling of a task

To get the previous sibling of the specified task, use the [`getPrevSibling()`](api/method/getprevsibling.md) method:

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
