---
title: "Настройка древовидной колонки"
sidebar_label: "Настройка древовидной колонки"
---

# Настройка столбца дерева

Чтобы узнать о доступных методах, связанных с деревом, ознакомьтесь со статьей [Родитель/Дочерний узел задачи](guides/task-tree-operations.md).

## Развертывание/сворачивание ветви задачи

- Чтобы открыть ветвь задачи, используйте метод [`open()`](api/method/open.md):

~~~js {7}
const data = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18 },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};
gantt.open("p_1");
~~~

- Чтобы закрыть ветвь задачи, используйте метод [`close()`](api/method/close.md):

~~~js {7}
const data = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18 },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};
gantt.close("p_1");
~~~ 

## Развертывание/сворачивание нескольких ветвей

Если нужно открыть или закрыть несколько ветвей задач, самый быстрый способ — программно установить соответствующее булево значение (`true` для открытия, `false` для закрытия) в свойство `.$open` нужных задач и затем перерисовать Gantt.

- развёртывание всех задач:

~~~js
gantt.eachTask((task) => {
    task.$open = true;
});
gantt.render();
~~~

- сворачивание всех задач:

~~~js
gantt.eachTask((task) => {
    task.$open = false;
});
gantt.render();
~~~

:::note
Если вы хотите одновременно свернуть/развернуть все задачи с помощью кнопки, перейдите к разделу [Решение: как разворачивать/сворачивать все задачи с кнопкой](guides/how-to.md#how-to-expandcollapse-all-tasks-with-a-button).
:::

## Получение дочерних элементов ветви задачи

Чтобы получить дочерние элементы ветви задачи, используйте метод [`getChildren()`](api/method/getchildren.md):

~~~js {7}
const data = {
    tasks: [
        { id: "p_1", text: "Project #1", start_date: "2027-04-01", duration: 18 },
        { id: "t_1", text: "Task #1", start_date: "2027-04-02", duration: 8, parent: "p_1" }
    ]
};
gantt.getChildren("p_1"); // -> ["t_1"]
~~~

*Чтобы увидеть больше методов, связанных с деревом, прочитайте статью [Родитель/Дочерний узел задачи](guides/task-tree-operations.md).*

## Изменение иконок дерева

### Элементы-родители
Чтобы задать иконку для родительских элементов, используйте шаблон [`grid_folder`](api/template/grid_folder.md):

~~~js
gantt.templates.grid_folder = (item) => `<div class="gantt_tree_icon gantt_folder_${item.$open ? "open" : "closed"}"></div>`;
~~~

### Дочерние элементы
Чтобы задать иконку для дочерних элементов, используйте шаблон [`grid_file`](api/template/grid_file.md):

~~~js
gantt.templates.grid_file = (item) => `<div class="gantt_tree_icon gantt_file"></div>`;
~~~

### Значок открытия/закрытия
Чтобы задать иконку для знака открытия/закрытия, используйте шаблон [`grid_open`](api/template/grid_open.md):

~~~js
gantt.templates.grid_open = (item) => `<div class="gantt_tree_icon gantt_${item.$open ? "close" : "open"}"></div>`;
~~~

## Установка отступа дочерних элементов в ветви

Чтобы задать отступ дочерних задач в ветви, используйте шаблон [`grid_indent`](api/template/grid_indent.md) и измените свойство CSS `width`:

~~~js
gantt.templates.grid_indent = (task) => `<div style="width:20px; float:left; height:100%"></div>`;
~~~

## Добавление флажков к узлам дерева

Чтобы добавить флажки (checkbox) или любой другой HTML-контент к узлам дерева, используйте шаблон [`grid_blank`](api/template/grid_blank.md):

~~~js
gantt.templates.grid_blank = (task) => `<input id="ch1" type="checkbox" onclick="someFunc()">`;
~~~

## Установка шаблона узлов дерева

Чтобы задать шаблон узлов дерева, используйте атрибут `template` в свойстве [columns](api/config/columns.md).

Возвращаемое значение функции `template` будет добавлено как внутренний HTML. Поэтому вы можете использовать любые HTML-структуры в атрибуте.

:::note
Если вы не используете [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) для [интеграции с серверной стороной](guides/server-side.md), вам нужно будет очистить данные, загружаемые в диаграмму Ганта, чтобы предотвратить возможные атаки XSS. [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) делает это автоматически.
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


**Связанный пример**: [Шаблон для узлов дерева](https://docs.dhtmlx.com/gantt/samples/04_customization/05_tree_template.html)