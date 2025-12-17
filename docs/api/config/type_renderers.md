---
sidebar_label: type_renderers
title: type_renderers config
description: "redefines functions responsible for displaying different types of tasks"
---

# type_renderers
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Redefines functions responsible for displaying different types of tasks

@signature: type_renderers: CustomTypeRenderers["type_renderers"]

### Example

~~~jsx
gantt.config.type_renderers[gantt.config.types.project] = function(task,defaultRender){
    var main_el = document.createElement("div");
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

**Default value:** \{\}

### Related samples
- [Classic Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)

### Details

A function that renders tasks takes 2 parameters:

- **typeRenderer (task, defaultRender): HTMLElement | boolean | void | undefined** - a function takes a task's object as a parameter and must return a DOM element that will be displayed instead of the task bar.
    - **_task_** - (*Task*) - the task object
    - **_defaultRender?_** - (*TaskLayerRender*) - optional, the default render function used in the dhtmlxGantt

Here are the possible type_renderers types:

- **type_renderers** - (*object*) - a custom render function for the *task* type
    - **_task?_** - (*typeRenderer*) - optional, a custom render function for the *task* type
    - **_project?_** - (*typeRenderer*) - optional, a custom render function for the *project* type
    - **_milestone?_** - (*typeRenderer*) - optional, a custom render function for the *milestone* type
    - **_[typeName: string]_** - (*typeRenderer | undefined*) - optional, a custom render function for the custom task type


You can use this option to define a custom display for certain types of tasks.
For example, the setting allows you to implement a more conservative view for the project or summary tasks.


:::note
sample [Classic Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)
:::

### Related API
- [getTaskPosition](api/method/gettaskposition.md)

