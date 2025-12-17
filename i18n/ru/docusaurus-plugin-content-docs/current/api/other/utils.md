---
sidebar_label: utils
title: utils config
description: "различные вспомогательные модули"
---

# utils

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

В настоящее время этот модуль в основном предоставляет помощники для работы с DOM через **gantt.utils.dom**.


~~~js
var domHelpers = gantt.utils.dom;
~~~

Он включает в себя следующие методы:

- **getNodePosition (node): object** - возвращает позицию элемента на экране в виде объекта `{x:number, y:number,width:number, height:number}`
  - **_node_** - (*HTMLElement*) - DOM-элемент для проверки

- **getRelativeEventPosition (e, node): object** - получает координаты мыши относительно указанного DOM-элемента, возвращает объект `{x:number, y:number}`
  - **_e_** - (*Event*) - событие, которое произошло
  - **_node_** - (*HTMLElement*) - DOM-элемент, относительно которого нужно получить координаты


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

- **isChildOf (child, parent): boolean** - проверяет, является ли первый узел DOM-потомком второго, возвращает `true`, если да
  - **_child_** - (*HTMLElement*) - дочерний узел для проверки
  - **_parent_** - (*HTMLElement*) - родительский узел для проверки

- **hasClass (node, className): boolean** - определяет, содержит ли указанный `node` заданный CSS класс, возвращает `true`, если содержит
  - **_node_** - (*HTMLElement*) - DOM-элемент для проверки
  - **_className_** - (*string*) - имя CSS класса для поиска

- **closest (node, cssSelector): HTMLElement** - находит ближайший предок (включая сам узел), соответствующий заданному CSS селектору
  - **_node_** - (*HTMLElement*) - начальный DOM-элемент
  - **_cssSelector_** - (*string*) - CSS селектор для поиска

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
- [Custom Tooltips](https://docs.dhtmlx.com/gantt/samples/02_extensions/22_tooltip_api.html)
