---
title: "Вехи"
sidebar_label: "Вехи"
---

Вехи
============

:::info
Эта функциональность доступна только в PRO-версии
:::

Вехи - это задачи с нулевой длительностью, предназначенные для обозначения важных дат проекта, ключевых событий или целей. Например, их можно использовать для выделения дат совещаний по обзору или ожидаемых сроков завершения этапов проекта. 


С точки зрения программирования, веха - это один из [предопределённых типов задач](guides/task-types.md). Однако она ведёт себя как [обычная задача](guides/task-types.md), вызывая те же события и шаблоны.

![type_milestone](/img/type_milestone.png)

[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


**Чтобы добавить возможность работы с вехами в диаграмме Gantt, выполните следующие шаги:**

1. Добавьте дополнительную секцию в лайтбокс - [Типовой контрол](guides/typeselect.md) - чтобы пользователи могли менять тип задач и выбирать вехи. 

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea"},
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~
2. Определите шаблон [rightside_text](api/template/rightside_text.md) или [leftside_text](api/template/leftside_text.md) для отображения подписи к вехе. <i>Обратите внимание, что подпись, заданная через шаблон [task_text](api/template/task_text.md), не будет отображаться, так как у вехи нулевая длительность.</i> 


~~~js
gantt.templates.rightside_text = function(start, end, task){
    if(task.type == gantt.config.types.milestone){
        return task.text;
    }
    return "";
};
~~~
3. Включите свойство [order_branch](api/config/order_branch.md) для удобства пользователей. <i>Эта опция позволяет перетаскивать задачи внутри родительской ветки, чтобы пользователи могли создавать вехи в любом месте и затем перемещать их в нужную позицию.</i> 

~~~js
gantt.config.order_branch = true;
~~~


После выполнения этих шагов диаграмма Gantt будет полностью готова к работе с вехами.

![milestone_lightbox](/img/milestone_lightbox.png)


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


## Указание вех в наборе данных {#specifyingmilestonesinadataset}
----------------------------------------------

Чтобы указать веху в исходных данных, задайте свойство [type](guides/loading.md#dataproperties) элемента как **'milestone'** (значения хранятся в объекте [types](api/config/types.md)):

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
-------------------------

Начиная с версии 7.1, задачи и вехи могут отображаться на их родительских проектах. Для этого установите свойство **rollup** элемента данных в *true*:

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

В результате получится следующее:

![rollup_milestone](/img/rollup_milestone.png)

Также вы можете включать или отключать rollup через чекбокс **Rollup** в лайтбоксе:

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


[Rollup tasks and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/21_rollup_tasks.html)


## Скрытие задач и вех {#hidingtasksandmilestones}
---------------------------

Начиная с версии 7.1, можно скрывать [бары задач](guides/task-types.md#regulartasks) и [вехи](guides/task-types.md#milestones) на временной шкале, установив свойство **hide_bar: true** для элемента данных:

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

Это будет выглядеть следующим образом:

![hide_milestone](/img/hide_milestone.png)

**Обратите внимание**, что если у элемента одновременно установлены **hide_bar:true** и **rollup:true**, он будет скрыт на временной шкале, но всё равно отображён на родительском проекте.

:::note
Чтобы скрыть все rollup-элементы на родительском проекте, установите **rollup:false** в объекте [project](guides/task-types.md#projecttasks) (доступно с версии 8.0):

~~~js
{ id:11, text:"Project #1", type:"project", rollup:false, open: true }
~~~
:::


Также вы можете скрывать задачи или вехи на временной шкале, используя чекбокс **Hide bar** в лайтбоксе:

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


[Rollup tasks and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/21_rollup_tasks.html)


## Обзор API {#apioverview}

Существует событие для управления отображением rollup-задач на их родительских проектах:

- [onBeforeRollupTaskDisplay](api/event/onbeforerolluptaskdisplay.md)

~~~js
// перед отображением rollup-задачи на родительском проекте 
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // любая пользовательская логика
    return false;
});
~~~

## Стилизация отдельных rollup-элементов {#stylingseparaterollupitems}

Начиная с версии 8.0, rollup-элементы содержат свойство *task.$rendered_at*, в котором хранится id строки, где отображается rollup-элемент. Это позволяет стилизовать отдельные rollup-элементы в зависимости от строки отображения с помощью шаблона [task_class](api/template/task_class.md):

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

