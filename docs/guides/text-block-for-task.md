---
title: "Displaying Contents of Tasks"
sidebar_label: "Displaying Contents of Tasks"
---

# Displaying Contents of Tasks

A text near a task bar allows you to show additional information related to the task. 
In most cases, it's some assigned resource - persons, materials etc. 

![assigned_text](/img/assigned_text.png)

## Customizing format of task bars

To change the default format of task bars, you can use the [task_text](api/template/task_text.md) template:

~~~js
gantt.templates.task_text="function(start,end,task){"
    return "<b>Text:</b> "+task.text+",<b> Holders:</b> "+task.users;
};
~~~

It can contain any HTML content that should be displayed inside of the task bar.


[Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)


![task_text](/img/task_text.png)

## Assigning a text to the left side of a bar

To place a text block on the left side of a task bar, use the [leftside_text](api/template/leftside_text.md) template:

~~~js
gantt.templates.leftside_text = function(start, end, task){
    return "<b>Priority: </b>" +task.priority;
};
~~~

[Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)


## Assigning a text to the right side of a bar

To place a text block on the right side of a task bar, use the [rightside_text](api/template/rightside_text.md) template:

~~~js
gantt.templates.rightside_text = function(start, end, task){
    return "<b>Holders: </b>" + task.users;
};
~~~


[Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

