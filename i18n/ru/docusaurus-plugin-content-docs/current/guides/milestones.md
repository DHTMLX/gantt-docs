---
title: "Вехи"
sidebar_label: "Вехи"
---

# Вехи

:::info
Эта функциональность доступна только в версии PRO
:::

Вехи — это задачи нулевой продолжительности, которые используются для обозначения важных дат проекта, некоторых ключевых событий или целей.
Например, вы можете использовать вехи, чтобы выделить даты контрольных встреч или даты ожидаемого завершения фаз проекта.

С программной точки зрения, веха является одним из предопределённых типов задач. Но она обрабатывается как обычная задача, т.е. вызывает те же события и шаблоны.

![type_milestone](/img/type_milestone.png)

**Связанный пример**: [Проекты и вехи](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)

**В целом, чтобы обеспечить возможность добавлять вехи на диаграмму:**

Добавьте дополнительный раздел в лайтбокс — [Typeselect Control](guides/typeselect.md) — который позволит вашим пользователям изменять тип задач и выбирать вехи.

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea"},
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~
Определите шаблон [rightside_text](api/template/rightside_text.md) или [leftside_text](api/template/leftside_text.md) для установки текстовой метки для вехи. <i> Примечание: метка, установленная с помощью шаблона [task_text](api/template/task_text.md), не отображается, так как вехи имеют нулевую продолжительность.</i>


~~~js
gantt.templates.rightside_text = function(start, end, task){
    if(task.type == gantt.config.types.milestone){
        return task.text;
    }
    return "";
};
~~~
Включите свойство [order_branch](api/config/order_branch.md), чтобы упростить работу ваших конечных пользователей. <i>Опция позволяет перетаскивать задачи внутри родственной ветки и позволит вашим пользователям создавать вехи в любом месте, а затем перетаскивать их на нужные позиции.</i> 

~~~js
gantt.config.order_branch = true;
~~~


После выполнения этих шагов ваш график Gantt полностью готов к работе с вехами.

![milestone_lightbox](/img/milestone_lightbox.png)


**Связанный пример**: [Проекты и вехи](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


## Определение вех в наборе данных

Чтобы определить вехи в исходном наборе данных, установите свойство [type](guides/loading.md#dataproperties) элемента данных в значение **'milestone'** (*значения хранятся в объекте [types](api/config/types.md)*):
~~~js
var data = {
    tasks:[
        {id:1, text:"Project #1",    type:gantt.config.types.project,    open:true}, 
        {id:2, text:"Task #1",       start_date:"12-04-2020", duration:3, parent:1},
        {id:3, text:"Alpha release", type:gantt.config.types.milestone,   parent:1, /*!*/
            start_date:"14-04-2020"}],                                              /*!*/
    links:[]
};
~~~

## Rollup задач и вех {#rolluptasksandmilestones}

Начиная с версии v7.1, появилась возможность отображать задачи и вехи на их родительских проектах. Для этого нужно установить свойство **rollup** элемента данных в значение *true*:

~~~js
var data = {
    tasks:[
        {id:11, text:"Project #1", type:"project", progress: 0.6, open: true},
        {id:12, text:"Task #1", start_date:"03-04-2018", duration:"3",
            parent:"11", progress: 1, open: true},
        {id:13, text:"Task #2", start_date:"03-04-2018", type:"project", 
            parent:"11", progress: 0.5, open: true},
        {id:16, text:"Final milestone", start_date:"08-04-2018", type:"milestone",  /*!*/
            rollup: true, parent:"11", progress: 0, open: true},  /*!*/
        {id:17, text:"Task #2.1", start_date:"03-04-2018", duration:"2", 
            parent:"13", progress: 1, open: true},
        {id:18, text:"Task #2.2", start_date:"06-04-2018", duration:"1",   
            parent:"13", progress: 0.8, open: true}],  
    links:[]
};
~~~

Результат будет таким же, как на изображении:

![rollup_milestone](/img/rollup_milestone.png)

Также есть возможность переключать функциональность rollup через чекбокс Rollup в лайтбоксе:

~~~js
gantt.config.lightbox.milestone_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "rollup", type: "checkbox", map_to: "rollup"},/*!*/
    {name: "hide_bar", type: "checkbox", map_to: "hide_bar"},
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", type: "duration", map_to: "auto"}
];
~~~

![rollup](/img/rollup.png)


**Связанный пример**: [Rollup задач и вех](https://docs.dhtmlx.com/gantt/samples/01_initialization/21_rollup_tasks.html)


## Скрытие задач и вех

Начиная с v7.1, можно скрывать [знаки задач](guides/task-types.md#regular-tasks) и [вехи](guides/task-types.md#milestones) на временной шкале, устанавливая свойство hide_bar: true у элемента данных:

~~~js
var data = {
    tasks:[
        {id:11, text:"Project #1", type:"project", progress: 0.6, open: true},
        {id:12, text:"Task #1", start_date:"03-04-2018", duration:"3",
            parent:"11", progress: 1},
        {id:13, text:"Task #2", start_date:"03-04-2018", type:"project", 
            parent:"11", progress: 0.5, open: true},
        {id:16, text:"Final milestone", start_date:"08-04-2018", type:"milestone",  /*!*/
            rollup: true, hide_bar: true, parent:"11", progress: 0},  /*!*/
        {id:17, text:"Task #2.1", start_date:"03-04-2018", duration:"2", 
            parent:"13", progress: 1},
        {id:18, text:"Task #2.2", start_date:"06-04-2018", duration:"1",   
            parent:"13", progress: 0.8}],  
    links:[]
};
~~~

Результат будет выглядеть так:

![hide_milestone](/img/hide_milestone.png)

Примечание, что если для элемента данных заданы одновременно свойства **hide_bar:true** и **rollup:true**, элемент будет скрыт на временной шкале, но отображаться на родительском проекте.

:::note
Чтобы скрыть все элементы rollup из родительского проекта, установите **rollup:false** в объекте [project](guides/task-types.md#project-tasks) (с версии v8.0):

~~~js
{ id:11, text:"Project #1", type:"project", rollup:false, open: true }
~~~
:::

Вы можете скрыть необходимую задачу/веху на временной шкале, переключив чекбокс Hide bar в лайтбоксе:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "rollup", type: "checkbox", map_to: "rollup"},
    {name: "hide_bar", type: "checkbox", map_to: "hide_bar"},  /*!*/
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", type: "duration", map_to: "auto"}
];

gantt.config.lightbox.milestone_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "rollup", type: "checkbox", map_to: "rollup"},
    {name: "hide_bar", type: "checkbox", map_to: "hide_bar"},  /*!*/
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", type: "duration", map_to: "auto"}
];

gantt.config.lightbox.project_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "hide_bar", type: "checkbox", map_to: "hide_bar"},  /*!*/
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", type: "duration", map_to: "auto"}
];

~~~

![hide_bar](/img/hide_bar.png)

**Связанный пример**: [Rollup задач и вех](https://docs.dhtmlx.com/gantt/samples/01_initialization/21_rollup_tasks.html)

## Обзор API

Существует событие, которое можно использовать для контроля видимости задач rollup на их родительских проектах:

- [onBeforeRollupTaskDisplay](api/event/onbeforerolluptaskdisplay.md)

~~~js
// до отображения задачи rollup на ее родительском проекте 
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // любая пользовательская логика здесь
    return false;
});
~~~

## Стилизация отдельных элементов rollup {#stylingseparaterollupitems}

С версии 8.0 элементы rollup попадают в функции шаблонов с свойством *task.$rendered_at*, которое содержит идентификатор строки, на которой элемент rollup отрендерен. Таким образом, чтобы стилизовать конкретные элементы rollup в зависимости от строки, на которой они отображаются, можно использовать шаблон [task_class](api/template/task_class.md):

~~~js
gantt.templates.task_class = function(start, end, task) {
    if(task.$rendered_at) {
        if(gantt.calculateTaskLevel(gantt.getTask(task.$rendered_at)) === 1) {
            return "phase-level-rollup";
        }
    }
    return "";
};
~~~