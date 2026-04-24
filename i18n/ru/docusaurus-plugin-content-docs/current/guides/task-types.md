---
title: "Типы задач"
sidebar_label: "Типы задач"
---

# Типы задач

:::info
Эта функциональность доступна только в версии PRO.
:::

Существует 3 заранее определённых типа задач, которые можно представить в диаграмме Гantt ([вы также можете добавить свой собственный тип](guides/task-types.md#creating-a-custom-type)):

1. [Обычная задача (по умолчанию)](guides/task-types.md#regular-tasks).
2. [Задача проекта](guides/task-types.md#project-tasks).
3. [Веха](guides/task-types.md#milestones).


![task_types](/img/task_types.png)


Чтобы задать тип задачи, используйте свойство [type](guides/loading.md#dataproperties) элемента данных (*значения хранятся в объекте [`types`](api/config/types.md)*:)

~~~jsx title="Specifying the type of a task in the data set"
const data = {
    tasks: [
        { id: 1, text: "Project #1", type: "project", open: true },
        { id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1 },
        { id: 3, text: "Alpha release", start_date: "16-04-2025", type: "milestone", parent: 1 },
        { id: 4, text: "Task #2", start_date: "17-04-2025", duration: 3, parent: 1 },
    ],
    links: [
        { id: 1, source: "1", target: "2", type: "1" },
        { id: 2, source: "2", target: "3", type: "0" },
        { id: 3, source: "3", target: "4", type: "0" },
    ],
};
~~~

**Связанный пример**: [Проекты и вехи](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


## Регулярные задачи

По умолчанию dhtmlxGantt обеспечивает создание обычных задач (задач с **type="task"**).

![type_task](/img/type_task.png)

~~~jsx title="Specifying regular tasks"
const data = { 
    tasks: [
        { id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1 }, 
    ],
    links: [],
};
 //or
const data = {
    tasks: [
        { id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1, type: "task" }, 
    ],
    links: [],
};
~~~

**Связанный пример**: [Проекты и вехи](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Задачи с **type="task"** можно охарактеризовать следующим образом:

- Может иметь 1 родителя и любое количество дочерних задач.
- Можно перетаскивать и изменять размер.
- Не зависят от дочерних задач, т.е. если пользователь перетаскивает дочернюю задачу обычной задачи, сама задача не изменяет свою длительность или прогресс соответственно.
- Может появляться на родительских проектах. См. [детали](guides/milestones.md#rolluptasksandmilestones).
- Может быть скрыта на таймлайне. См. [детали](guides/milestones.md#hiding-tasks-and-milestones).


## Задачи проекта

Задача проекта — это задача, которая начинается, когда начинается её самая ранняя дочерняя задача, и заканчивается, когда заканчивается её самая поздняя дочерняя задача.

:::note
Различие между задачей проекта и обычной задачей состоит в том, что длительность задачи проекта зависит от её дочерних задач и изменяется соответственно.
:::

![type_project](/img/type_project.png)

~~~jsx title="Specifying project tasks"
const data = {
    tasks: [
        { id: 1, text: "Project #1", type: "project", open: true }, 
        { id: 2, text: "Task #1", start_date: "12-04-2025", duration: 3, parent: 1 },
        { id: 3, text: "Alpha release", start_date: "16-04-2025", type: "milestone", parent: 1 },
        { id: 4, text: "Task #2", start_date: "17-04-2025", duration: 3, parent: 1 },
    ],
    links: [],
};
~~~

**Связанный пример**: [Проекты и вехи](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Задачи с **type="project"** можно охарактеризовать следующим образом:

- Может иметь 1 родителя и любое количество дочерних задач.
- Не может быть перетаскиваема и изменяема по размеру, если явно не включено перетаскивание через конфигурацию [drag_project](api/config/drag_project.md).
- Зависит от дочерних задач, т.е. если пользователь перетаскивает дочернюю задачу задач проекта, длительность этой задачи изменяется.
- Игнорируются свойства **start_date**, **end_date**, **duration**.
- Не может быть перетащена, если у неё нет дочерних задач.
- Прогресс проекта задаётся явно и по умолчанию не зависит от подзадач. Если хотите, чтобы он считывался автоматически — нужно написать код. [См. примеры](guides/how-to.md#how-to-calculate-task-progress-depending-on-child-tasks).

:::note
Чтобы обеспечить возможность добавления задач проекта, прочитайте статью [Milestone](guides/milestones.md). Возможность добавлять вехи гарантирует, что ваши конечные пользователи смогут добавлять задачи проекта.
:::

## Вехи {#milestones}

[Milestone](guides/milestones.md) — задача нулевой продолжительности, которая используется для отметки важных дат проекта ([подробнее](guides/milestones.md)).

![type_milestone](/img/type_milestone.png)

~~~jsx title="Specifying milestones"
const data = {
    tasks: [
        { id: 3, text: "Alpha release", start_date: "16-04-2025", type: "milestone", parent: 1 }, 
    ],
    links: [],
};
~~~

**Связанный пример**: [Проекты и вехи](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Задачи с **type="milestone"** можно охарактеризовать следующим образом:

- Может иметь 1 родителя и любое количество дочерних задач.
- Не может быть перетаскнута и изменяема.
- Имеют нулевую продолжительность и сохраняют её всё время.
- Игнорируются свойства **end_date**, **duration**, **progress**.
- Может появляться на родительских проектах. См. [детали](guides/milestones.md#rolluptasksandmilestones).
- Может быть скрыта на таймлайне. См. [детали](guides/milestones.md#hiding-tasks-and-milestones).

:::note
Чтобы обеспечить возможность добавления вех, прочитайте статью [Milestone](guides/milestones.md).
:::

## Специфический lightbox для каждого типа задачи {#specificlightboxpertasktype}

Каждый тип задачи имеет свой набор характеристик. Поэтому для каждого типа можно определить индивидуальную конфигурацию формы деталей (lightbox).
Все конфигурации хранятся в объекте [lightbox](api/config/lightbox.md).

Они:

- **gantt.config.lightbox.sections** - для обычных задач.
- **gantt.config.lightbox.project_sections** - для задач проекта.
- **gantt.config.lightbox.milestone_sections** - для вех.

Настройки конфигурации по умолчанию следующие:

~~~jsx
gantt.config.lightbox.sections = [
    { name: "description", type: "textarea", map_to: "text", height: 70, focus: true },
    { name: "time", type: "duration", map_to: "auto" }
];

gantt.config.lightbox.project_sections = [
    { name: "description", type: "textarea", map_to: "text", height: 70, focus: true },
    { name: "type", type: "typeselect", map_to: "type" },
    { name: "time", type: "duration", map_to: "auto", readonly: true }
];

gantt.config.lightbox.milestone_sections = [
    { name: "description", type: "textarea", map_to: "text", height: 70, focus: true },
    { name: "type", type: "typeselect", map_to: "type" },
    { name: "time", type: "duration", map_to: "auto", single_date: true }
];
~~~

Когда пользователь изменяет тип задачи в соответствующем выпадающем списке, соответствующая конфигурация применяется к открывающемуся lightbox и он обновляется динамически.

Вы можете [добавить собственный тип](guides/task-types.md#creating-a-custom-type) и указать соответствующую структуру lightbox для него.

Чтобы углубиться в детали конфигурации lightbox, можно прочитать раздел [Configuring Edit Form](guides/edit-form.md).


## Создание пользовательского типа

Все типы задач определяются в объекте [types](api/config/types.md).

Как правило, чтобы добавить пользовательский тип задач, нужно:

1. Добавить новое значение в объект [types](api/config/types.md).
2. Определить индивидуальные настройки для нового типа.

Предположим, вы хотите добавить новый тип задач — **meeting**.
Meeting будет обычной задачей, но окрашен в другой цвет и будет иметь другие поля в lightbox.

![custom_task_type](/img/custom_task_type.png)


Чтобы определить новый тип с именем **meeting** и задать для него индивидуальный lightbox, используйте следующую технику:

Добавьте новый тип в объект [types](api/config/types.md):

~~~jsx
gantt.config.types.meeting = "type_id";
~~~

где "meeting" — программируемое имя типа. Оно ничего не влияет на функциональность. Единственная цель программируемого имени типа — сделать работу с типами более читаемой.
"type_id" — идентификатор типа, который будет храниться в базе данных. Идентификатор типа должен быть уникальным внутри объекта [types](api/config/types.md).

Задайте метку нового типа в элементе управления "typeselect":

~~~jsx
gantt.locale.labels.type_meeting = "Meeting";
~~~

Укажите новую структуру lightbox для вновь созданного типа:

~~~jsx
gantt.config.lightbox.meeting_sections = [
    { name: "title", type: "textarea", map_to: "text", height: 20, focus: true },
    { name: "details", type: "textarea", map_to: "details", height: 70 },
    { name: "type", type: "typeselect", map_to: "type" },
    { name: "time", type: "time", map_to: "auto", height: 72 }
];

gantt.locale.labels.section_title = "Subject";
gantt.locale.labels.section_details = "Details";
~~~

Укажите стиль для нового типа и примените его с помощью шаблона [task_class](api/template/task_class.md):

~~~css
.meeting_task{
    border:2px solid #BFC518;
    color:#6ba8e3;
    background: #F2F67E;
}

.meeting_task .gantt_task_progress{
    background:#D9DF29;
}
~~~

~~~jsx
gantt.templates.task_class = (start, end, task) => {
    return task.type === gantt.config.types.meeting 
        ? "meeting_task" 
        : "";
};
~~~

Установите шаблон для текста задач типа "meeting" с использованием шаблона [task_text](api/template/task_text.md):

~~~jsx
gantt.templates.task_text = (start, end, task) =>
    task.type === gantt.config.types.meeting
        ? `Meeting: <b>${task.text}</b>`
        : task.text;
~~~

**Связанный пример**: [Custom task type](https://docs.dhtmlx.com/gantt/samples/04_customization/12_custom_task_type.html)


## Пользовательское отображение типов задач

Чтобы настроить внешний вид существующих типов задач, используйте опцию [type_renderers](api/config/type_renderers.md). Эта опция позволяет переопределять функции, отвечающие за отображение разных типов задач на странице.

![custom_look](/img/custom_look.png)

~~~jsx
gantt.config.type_renderers["project"] = (task, defaultRender) => {
    const taskBar = document.createElement("div");
    taskBar.setAttribute(gantt.config.task_attribute, task.id);
    taskBar.className = "custom-project";

    const taskSize = gantt.getTaskPosition(task);
    taskBar.innerHTML = [
        "<div class='project-left'></div>",
        "<div class='project-right'></div>"
    ].join('');

    taskBar.style.left = `${taskSize.left}px`;
    taskBar.style.top = `${taskSize.top + 7}px`;
    taskBar.style.width = `${taskSize.width}px`;

    return taskBar;
};
~~~

**Связанный пример**: [Classic Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)