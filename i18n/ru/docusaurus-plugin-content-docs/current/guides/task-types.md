---
title: "Типы задач"
sidebar_label: "Типы задач"
---

# Типы задач

:::info
Эта функция доступна только в PRO-версии.
:::

В Gantt доступны три предопределённых типа задач ([вы также можете создать собственный тип](guides/task-types.md#creatingacustomtype)):

1. [Обычная задача (тип по умолчанию)](guides/task-types.md#regulartasks).
2. [Проектная задача](guides/task-types.md#projecttasks).
3. [Веха](guides/task-types.md#milestones).

![task_types](/img/task_types.png)

Чтобы назначить тип задачи, используйте свойство [type](guides/loading.md#dataproperties) внутри элемента данных (*значения соответствуют объекту [types](api/config/types.md)*):

**Указание типа задачи в наборе данных**
~~~js
var data = {
    task:[
        {id:1, text:"Project #1",    type:"project",    open:true},   /*!*/
        {id:2, text:"Task #1",          start_date:"12-04-2020", duration:3, parent:1},
        {id:3, text:"Alpha release", type:"milestone",   parent:1, /*!*/
            start_date:"14-04-2020"},                                                /*!*/
        {id:4, text:"Task #2",          start_date:"17-04-2020", duration:3, parent:1}],
    links:[]
};
~~~

[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


## Обычные задачи {#regulartasks}

По умолчанию dhtmlxGantt создаёт обычные задачи (tasks с **type="task"**).

![type_task](/img/type_task.png)

**Указание обычных задач**
~~~js
var data = {
    tasks:[{id:2, text:"Task #1", start_date:"12-04-2020", duration:3}],  /*!*/
    links:[]
};
//или
var data = {
     tasks:[{id:2, text:"Task #1", start_date:"12-04-2020", duration:3, /*!*/
            type:"task"}],  /*!*/
    links:[]
};
~~~

[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Задачи с **type="task"** обладают следующими особенностями:

- Могут иметь одного родителя и несколько дочерних задач.
- Перетаскиваются и изменяют размер.
- Не изменяются в зависимости от дочерних задач; перемещение дочерней задачи не влияет на длительность или прогресс родителя.
- Могут отображаться в родительских проектах. См. [подробнее](guides/milestones.md#rolluptasksandmilestones).
- Могут быть скрыты на временной шкале. См. [подробнее](guides/milestones.md#hidingtasksandmilestones).

## Проектные задачи {#projecttasks}

Проектная задача охватывает период от начала самой ранней дочерней задачи до завершения самой поздней дочерней задачи.

:::note
Ключевое отличие проектной задачи от обычной - длительность проектной задачи зависит от дочерних задач и автоматически обновляется.
:::

![type_project](/img/type_project.png)

**Указание проектных задач**
~~~js
var data = {
    tasks:[
        {id:1, text:"Project #1",    type:"project",    open:true}, /*!*/
        {id:2, text:"Task #1",       start_date:"12-04-2020", duration:3, parent:1},
        {id:3, text:"Alpha release", type:"milestone",   parent:1,
            start_date:"14-04-2020"}],
    links:[]
};
~~~


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Задачи с **type="project"** имеют следующие характеристики:

- Могут иметь одного родителя и несколько дочерних задач.
- Не перетаскиваются и не изменяют размер, если только drag and drop не включён явно через [drag_project](api/config/drag_project.md).
- Зависят от дочерних задач; перемещение дочерней задачи изменяет длительность проекта.
- Игнорируют свойства **start_date**, **end_date** и **duration**.
- Не могут быть перетянуты, если не имеют дочерних задач.
- Прогресс проекта (**progress**) по умолчанию задаётся вручную и не отражает автоматически прогресс подзадач. Для автоматического расчёта требуется пользовательский код. [См. пример](guides/how-to.md#howtocalculatetaskprogressdependingonchildtasks).

:::note
Для включения добавления проектных задач обратитесь к [Вехи](guides/milestones.md). Включение создания вех также позволит пользователям добавлять проектные задачи.
:::

## Вехи {#milestones}

[Веха](guides/milestones.md) - это задача с нулевой длительностью, предназначенная для выделения ключевых дат проекта ([подробнее](guides/milestones.md)).

![type_milestone](/img/type_milestone.png)

**Указание вех**
~~~js
var data = {
    tasks:[
        {id:1, text:"Project #1",    type:"project",    open:true},
        {id:2, text:"Task #1",       start_date:"12-04-2020", duration:3, parent:1},
        {id:3, text:"Alpha release", type:"milestone",   parent:1, /*!*/
            start_date:"14-04-2020"}],/*!*/
    links:[]
};
~~~

[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Задачи с **type="milestone"** имеют следующие особенности:

- Могут иметь одного родителя и несколько дочерних задач.
- Не перетаскиваются и не изменяют размер.
- Всегда имеют нулевую длительность.
- Игнорируют свойства **end_date**, **duration** и **progress**.
- Могут отображаться в родительских проектах. См. [подробнее](guides/milestones.md#rolluptasksandmilestones).
- Могут быть скрыты на временной шкале. См. [подробнее](guides/milestones.md#hidingtasksandmilestones).

:::note
Для включения создания вех см. [Вехи](guides/milestones.md).
:::

## Отдельная форма lightbox для каждого типа задачи {#specificlightboxpertasktype}

Каждый тип задачи обладает уникальными свойствами, поэтому форма редактирования (lightbox) может быть настроена индивидуально для каждого типа. Конфигурации хранятся в объекте [lightbox](api/config/lightbox.md).

Включают:

- **gantt.config.lightbox.sections** - для обычных задач.
- **gantt.config.lightbox.project_sections** - для проектных задач.
- **gantt.config.lightbox.milestone_sections** - для вех.

Конфигурация по умолчанию выглядит так:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "time", type: "duration", map_to: "auto"}
];
gantt.config.lightbox.project_sections= [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
gantt.config.lightbox.milestone_sections= [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", type: "duration", single_date: true, map_to: "auto"}
];
~~~

Если тип задачи изменяется в select-контроле, lightbox динамически обновляется в соответствии с новой конфигурацией.

Вы можете [создать собственный тип задачи](guides/task-types.md#creatingacustomtype) и определить для него структуру lightbox.

Подробнее о настройке lightbox см. в разделе [Настройка формы редактирования](guides/edit-form.md).

## Создание пользовательского типа {#creatingacustomtype}

Все типы задач определяются в объекте [types](api/config/types.md). 

Чтобы добавить пользовательский тип задачи, выполните следующие шаги:

1. Добавьте новую запись в объект [types](api/config/types.md).
2. Определите параметры, специфичные для нового типа.

Например, чтобы добавить новый тип **meeting**, который ведёт себя как обычная задача, но с отличным цветом и индивидуальными полями lightbox:

![custom_task_type](/img/custom_task_type.png)

Определите новый тип **meeting** и его lightbox следующим образом:

1. Добавьте новый тип в объект [types](api/config/types.md):

~~~js
gantt.config.types.meeting = "type_id";
~~~
<i>
Здесь "meeting" - программное имя для удобства и читаемости.
"type_id" - уникальный идентификатор, который хранится в базе данных и в объекте [types](api/config/types.md).
</i>

2. Задайте метку для нового типа в контроле "typeselect":

~~~js
gantt.locale.labels.type_meeting = "Meeting";
~~~
3. Определите структуру lightbox для нового типа:

~~~js
gantt.config.lightbox.meeting_sections = [
    {name:"title", height:20, map_to:"text", type:"textarea", focus:true},
    {name:"details", height:70, map_to: "details", type: "textarea"},
    {name:"type", type:"typeselect", map_to:"type"},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
gantt.locale.labels.section_title = "Subject";
gantt.locale.labels.section_details = "Details";
~~~

4. Определите стили для нового типа и примените их через шаблон [task_class](api/template/task_class.md):

~~~html
.meeting_task{
    border:2px solid #BFC518;
    color:#6ba8e3;
    background: #F2F67E;
}
.meeting_task .gantt_task_progress{
    background:#D9DF29;
}
~~~

~~~js
gantt.templates.task_class = function(start, end, task){
    if(task.type == gantt.config.types.meeting){
        return "meeting_task";
    }
    return "";
};
~~~

5. Настройте отображение текста задачи для "meeting" с помощью шаблона [task_text](api/template/task_text.md): 


~~~js
gantt.templates.task_text = function(start, end, task){
    if(task.type == gantt.config.types.meeting){
        return "Meeting: <b>" + task.text + "</b>";
    }
    return task.text;
};
~~~

[Custom task type](https://docs.dhtmlx.com/gantt/samples/04_customization/12_custom_task_type.html)


## Пользовательское отображение типов задач {#customdisplayoftasktypes}

Чтобы изменить внешний вид существующих типов задач, используйте опцию [type_renderers](api/config/type_renderers.md). Это позволяет переопределить функции, управляющие отрисовкой типов задач на странице.

![custom_look](/img/custom_look.png)

~~~js
gantt.config.type_renderers["project"]=function(task, defaultRender){
    var main_el = document.createElement("div");
    main_el.setAttribute(gantt.config.task_attribute, task.id);
    var size = gantt.getTaskPosition(task);
    main_el.innerHTML = [
        "<div class='project-left'></div>",
        "<div class='project-right'></div>"
    ].join('');
    main_el.className = "custom-project";

    main_el.style.left = size.left + "px";
    main_el.style.top = size.top + 7 + "px";
    main_el.style.width = size.width + "px";

    return main_el;
};
~~~

[Classic Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)

