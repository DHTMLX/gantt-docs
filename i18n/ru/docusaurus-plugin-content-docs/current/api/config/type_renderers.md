---
sidebar_label: type_renderers
title: type_renderers конфигурация
description: "переопределяет функции, отвечающие за отображение различных типов задач"
---

# type_renderers
:::info
This functionality is available in the PRO edition only. 
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

Функция, которая рендерит задачи, принимает 2 параметра:

- **typeRenderer (task, defaultRender): HTMLElement | boolean | void | undefined** - функция принимает объект задачи в качестве параметра и должна вернуть DOM-элемент, который будет отображаться вместо полосы задачи.
    - **_task_** - (*Task*) - объект задачи
    - **_defaultRender?_** - (*TaskLayerRender*) - необязательная, функция рендера по умолчанию, используемая в dhtmlxGantt

Вот возможные типы type_renderers:

- **type_renderers** - (*object*) - пользовательская функция рендера для типа *task*
    - **_task?_** - (*typeRenderer*) - необязательная, пользовательская функция рендера для типа *task*
    - **_project?_** - (*typeRenderer*) - необязательная, пользовательская функция рендера для типа *project*
    - **_milestone?_** - (*typeRenderer*) - необязательная, пользовательская функция рендера для типа *milestone*
    - **_[typeName: string]_** - (*typeRenderer | undefined*) - необязательная, пользовательская функция рендера для настраиваемого типа задачи


Вы можете использовать эту опцию для определения пользовательского отображения для определённых типов задач.
Например, настройка позволяет реализовать более консервативный вид для задач проекта или сводных задач.


:::note
пример [Classic Look](https://docs.dhtmlx.com/gantt/samples/04_customization/17_classic_gantt_look.html)
:::

### Related API
- [getTaskPosition](api/method/gettaskposition.md)