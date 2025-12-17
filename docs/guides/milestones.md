---
title: "Milestones"
sidebar_label: "Milestones"
---

Milestones
============

:::info
This functionality is available only in the PRO edition
:::

Milestones are tasks with zero duration that are used to mark out important dates of the project, some key events or goals.
You may use milestones, for example, to highlight dates of review meetings or dates of expected completion of project's phases. 


Programmatically, a milestone is one of [predefined types of tasks](guides/task-types.md). But it's handled as [a regular task](guides/task-types.md), i.e. it triggers the same events and templates. 

![type_milestone](/img/type_milestone.png)

**Related sample**: [Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)

**Generally, to provide a possibility to add milestones to a chart:**

Add an extra section to the lightbox - [Typeselect Control](guides/typeselect.md) - that will let your users to change the type of tasks and select milestones. 

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea"},
    {name: "type", type: "typeselect", map_to: "type"},
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~
Define the [rightside_text](api/template/rightside_text.md) or [leftside_text](api/template/leftside_text.md) template to set a text label for a milestone. <i> Note, the label set with the [task_text](api/template/task_text.md) template is not displayed as milestones have zero duration.</i>


~~~js
gantt.templates.rightside_text = function(start, end, task){
    if(task.type == gantt.config.types.milestone){
        return task.text;
    }
    return "";
};
~~~
Enable the [order_branch](api/config/order_branch.md) property to simplify things for your end users. <i>The option enables dragging tasks within the parent branch and will let your users create milestones at any place but then drag them to the right positions. </i> 

~~~js
gantt.config.order_branch = true;
~~~


After you have been completed these steps, your Gantt chart is fully ready to work with milestones.

![milestone_lightbox](/img/milestone_lightbox.png)


**Related sample**: [Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Specifying milestones in a data set
----------------------------------------------

To define milestones in the initial data set, set the [type](guides/loading.md#dataproperties) property of a data item to the **'milestone'** value (*values are stored in the [types](api/config/types.md) object*):
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

## Rollup tasks and milestones {#rolluptasksandmilestones}

Starting with v7.1, there is the ability to show [tasks](guides/task-types.md#regular-tasks) and [milestones](guides/task-types.md#milestones) on their parent projects. For that, you need to set the **rollup** property of a data item to *true*:

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

The result will be as in:

![rollup_milestone](/img/rollup_milestone.png)

There is also the ability to switch the rollup functionality via the **Rollup** checkbox in the lightbox:


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


**Related sample**: [Rollup tasks and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/21_rollup_tasks.html)


Hiding tasks and milestones
---------------------------

Starting with v7.1, you can hide [task bars](guides/task-types.md#regular-tasks) and [milestones](guides/task-types.md#milestones) in the timeline area via setting the **hide_bar: true** property of a data item:

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

The result will look like this:

![hide_milestone](/img/hide_milestone.png)

**Note**, that if both the **hide_bar:true** and **rollup:true** properties are specified for the data item, the item will be hidden in the timeline but shown on the parent project.

:::note
To hide all rollup items from the parent project, set **rollup:false** in the [project](guides/task-types.md#project-tasks) object (from v8.0):

~~~js
{ id:11, text:"Project #1", type:"project", rollup:false, open: true }
~~~
:::


You can hide the necessary task/milestone in the timeline area via switching the **Hide bar** checkbox in the lightbox:

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

**Related sample**: [Rollup tasks and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/21_rollup_tasks.html)

## API overview

There is an event that can be used to control the visibility of rollup tasks on their parent projects:

- [onBeforeRollupTaskDisplay](api/event/onbeforerolluptaskdisplay.md)

~~~js
// before the rollup task is displayed on its parent project 
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // any custom logic here
    return false;
});
~~~

## Styling separate rollup items {#stylingseparaterollupitems}

From v8.0, rollup items come into template functions with the *task.$rendered_at* property which contains the id of a row the rollup item is rendered at. Thus, to style specific rollup items based on the row they are displayed at, you may use the [task_class](api/template/task_class.md) template:

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

