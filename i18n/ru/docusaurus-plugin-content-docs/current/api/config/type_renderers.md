---
sidebar_label: type_renderers
title: type_renderers config
description: "переопределяет функции, отвечающие за отображение различных типов задач"
---

# type_renderers
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Переопределяет функции, отвечающие за отображение различных типов задач

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

Эта возможность позволяет настраивать отображение различных типов задач, определяя собственные функции рендеринга.

Функция рендеринга принимает два аргумента:

- **typeRenderer (task, defaultRender): HTMLElement | boolean | void | undefined** - функция, которая принимает объект задачи и возвращает DOM-элемент, заменяющий стандартную панель задачи.
    - **_task_** - (*Task*) - объект задачи
    - **_defaultRender?_** - (*TaskLayerRender*) - необязательный, функция рендеринга по умолчанию, предоставляемая dhtmlxGantt

Доступные type_renderers включают:

- **type_renderers** - (*object*) - пользовательские функции рендеринга для разных типов задач
    - **_task?_** - (*typeRenderer*) - необязательный, пользовательская функция рендеринга для стандартных задач
    - **_project?_** - (*typeRenderer*) - необязательный, пользовательская функция рендеринга для проектных задач
    - **_milestone?_** - (*typeRenderer*) - необязательный, пользовательская функция рендеринга для вех
    - **_[typeName: string]_** - (*typeRenderer | undefined*) - необязательный, пользовательская функция рендеринга для любого кастомного типа задачи


Этот параметр позволяет создавать индивидуальный внешний вид для конкретных типов задач. Например, можно сделать более классический вид для проектных или сводных задач.


![custom_look](/img/custom_look.png)


:::note
sample
[Classic Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)
 
:::

### Related API
- [getTaskPosition](api/method/gettaskposition.md)

