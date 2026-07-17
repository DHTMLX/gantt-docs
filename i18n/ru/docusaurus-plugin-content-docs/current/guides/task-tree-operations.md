---
title: "Task Parent/Child"
sidebar_label: "Task Parent/Child"
---

# Родитель/Дочерняя задача

В этой статье приведены методы, связанные с древовидной структурой задач на диаграмме Ганта.

*Чтобы узнать базовые операции по получению объекта задачи или его идентификатора, смотрите статью [Объект задачи/ИД](guides/task-object-operations.md).*

## Родитель задачи {#parent-of-a-task}

Чтобы получить родителя задачи, используйте метод [`getParent()`](api/method/getparent.md) или свойство `"parent"` объекта задачи:

~~~js
gantt.getParent("t1"); // -> "pr_2"
// или
const task = gantt.getTask("t1"); // -> { id: "t1", text: "Task #5", parent: "pr_2", ... }
const parentId = task.parent; // -> "pr_2"
~~~

Если у указанной задачи нет родителя, метод возвращает [идентификатор корня](api/config/root_id.md).

## Дочерние задачи

Чтобы получить дочерние задачи ветвевой задачи, используйте метод [`getChildren()`](api/method/getchildren.md):

~~~js
const taskData = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18 },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};

gantt.getChildren("p_1"); // -> ["t_1"]
~~~

Чтобы получить всех детей задачи, а не только дочерние задачи первого уровня, используйте метод [`eachTask()`](api/method/eachtask.md) и передайте идентификатор родительской задачи как второй параметр:

~~~js
const childTasks = [];

// Итерация по всем дочерним задачам задачи.
gantt.eachTask((childTask) => {
    childTasks.push(childTask);
}, 11);
~~~

## Проверка наличия у задачи дочернего элемента

Чтобы проверить, есть ли у задачи дочерняя задача, используйте метод [`hasChild()`](api/method/haschild.md):

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

## Следующая задача в дереве

Чтобы получить идентификатор задачи, следующей за указанной, используйте метод [`getNext()`](api/method/getnext.md):

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

Gantt учитывает задачи вне зависимости от уровня дерева.

## Предыдущая задача в дереве

Чтобы получить идентификатор задачи, предшествующей указанной, используйте метод [`getPrev()`](api/method/getprev.md):

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

Gantt учитывает задачи вне зависимости от уровня дерева.

## Соседи задачи

Чтобы получить соседние задачи указанной задачи, используйте метод [`getSiblings()`](api/method/getsiblings.md):

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

## Следующий сосед задачи

Чтобы получить следующего соседа указанной задачи, используйте метод [`getNextSibling()`](api/method/getnextsibling.md):

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

## Предыдущий сосед задачи

Чтобы получить предыдущего соседа указанной задачи, используйте метод [`getPrevSibling()`](api/method/getprevsibling.md):

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