---
sidebar_label: utils
title: конфигурация utils
description: "различные вспомогательные модули"
---

# Утилиты

### Description

@short: Различные вспомогательные модули

@signature: utils: \{ dom: DomHelpers \}

### Example

~~~jsx
var tooltips = gantt.ext.tooltips;
tooltips.tooltipFor({
    selector: ".gantt_scale_cell",
    html: function (event, node) {
        const domHelper = gantt.utils.dom;
        const pos = domHelper.getRelativeEventPosition(event, gantt.$task_scale);
        return gantt.templates.task_date(gantt.dateFromPos(pos.x));
}
});
~~~


### Details

В данный момент модуль содержит только помощник для операций с DOM, доступный как **gantt.utils.dom**


~~~js
var domHelpers = gantt.utils.dom;
~~~


Который имеет следующие методы:

- **getNodePosition (node): object** - возвращает положение элемента на экране в формате объекта `{x:number, y:number, width:number, height:number}`
  - **_node_** - (*HTMLElement*) - DOM-элемент, который будет проверяться

- **getRelativeEventPosition (e, node): object** - возвращает координаты мыши относительно DOM-элемента в формате объекта `{x:number, y:number}`
  - **_e_** - (*Event*) - событие, которое произошло
  - **_node_** - (*HTMLElement*) - DOM-элемент, который будет проверяться


~~~js
gantt.message({
    expire: -1,
    text: ""
});

const formatDate = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.attachEvent("onMouseMove", function (id, e){
    const helper = gantt.utils.dom;
    if(helper.isChildOf(e.target, gantt.$task_data)){
        const textContainer = document.querySelector("#pointer-date");
        const pos = helper.getRelativeEventPosition(e, gantt.$task_data);
        const pointerDate = gantt.dateFromPos(pos.x);
        textContainer.innerText = formatDate(pointerDate);
    }
});
~~~

- **isChildOf (child, parent): boolean** - возвращает `true`, если узел, переданный в качестве первого аргумента, является DOM-элементом-потомком узла, переданного как второй аргумент
  - **_child_** - (*HTMLElement*) - дочерний узел, который будет проверяться
  - **_parent_** - (*HTMLElement*) - родительский узел, который будет проверяться

- **hasClass (node, className): boolean** - возвращает `true`, если список классов переданного `node` содержит указанный CSS-класс
  - **_node_** - (*HTMLElement*) - DOM-элемент, который будет проверяться
  - **_className_** - (*string*) - имя CSS-класса, которое будет проверяться

- **closest (node, cssSelector): HTMLElement**> - возвращает первый узел, который соответствует заданному CSS-селектору, начиная с указанного узла и поднимаясь вверх по дереву DOM к родительским узлам
  - **_node_** - (*HTMLElement*) - DOM-элемент, который будет проверяться
  - **_cssSelector_** - (*string*) - CSS-селектор для целевого узла

~~~js
gantt.attachEvent("onEmptyClick", function (e) {
  const domHelpers = gantt.utils.dom;
  if(!domHelpers.closest(e.target, `[${gantt.config.link_attribute}]`)){
    gantt.message("not a link");
  }else{
    gantt.message("link!"); 
  }
});
~~~


### Related samples
- [Пользовательские подсказки](https://docs.dhtmlx.com/gantt/samples/02_extensions/22_tooltip_api.html)