---
sidebar_label: type_renderers
title: type_renderers config
description: "重新定义负责显示不同类型任务的函数"
---

# type_renderers
:::info
 此功能仅在 PRO 版本中可用。 
::: 
### Description

@short: 重新定义负责显示不同类型任务的函数

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

此功能允许您通过定义自定义渲染函数，定制不同类型任务的显示方式。

渲染函数接收两个参数:

- **typeRenderer (task, defaultRender): HTMLElement | boolean | void | undefined** - 一个函数，接收一个任务对象并返回一个 DOM 元素，用以替代默认的任务条。  
    - **_task_** - (*Task*) - 任务对象  
    - **_defaultRender?_** - (*TaskLayerRender*) - 可选，由 dhtmlxGantt 提供的默认渲染函数  

可用的 type_renderers 包括:

- **type_renderers** - (*object*) - 针对不同任务类型的自定义渲染函数  
    - **_task?_** - (*typeRenderer*) - 可选，标准任务的自定义渲染函数  
    - **_project?_** - (*typeRenderer*) - 可选，项目任务的自定义渲染函数  
    - **_milestone?_** - (*typeRenderer*) - 可选，里程碑任务的自定义渲染函数  
    - **_[typeName: string]_** - (*typeRenderer | undefined*) - 可选，任意自定义任务类型的渲染函数  

此选项允许您为特定任务类型创建定制外观。例如，您可以为项目或汇总任务设计更传统的显示风格。

![custom_look](/img/custom_look.png)

:::note
sample 
[Classic Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html) 
 
:::

### Related API
- [getTaskPosition](api/method/gettaskposition.md)

