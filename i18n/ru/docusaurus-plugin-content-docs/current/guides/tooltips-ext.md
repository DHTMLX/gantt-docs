---
title: "Расширение Tooltips"
sidebar_label: "Расширение Tooltips"
---

Расширение Tooltips
======================

Более подробная информация о расширении Tooltips доступна в статье [Тултипы для элементов Gantt](guides/tooltips.md).

## Объект tooltip

Объект tooltip доступен через **gantt.ext.tooltips.tooltip**. Он предоставляет методы для управления позицией, содержимым и видимостью тултипа:

- <span class="submethod">**getNode (): HTMLElement**</span> - возвращает HTML-элемент тултипа  
- <span class="submethod">**setViewport (node): object**</span> - ограничивает позицию тултипа границами указанного HTML-элемента  
    - **_node_** - (*HTMLElement*) - HTML-элемент, в пределах которого будет отображаться тултип  
- <span class="submethod">**show (config, top): object**</span> - отображает тултип по заданным координатам (относительно document.body). Метод принимает различные параметры в зависимости от требуемой позиции. Для отображения тултипа по определённым координатам укажите значения x и y. Чтобы позиционировать тултип в месте события мыши, передайте объект Event. Параметры *tooltip_offset_x/y* и настройки viewport применяются автоматически.  
    - **_config?_** - (*number | Event*) - x-координата или объект события мыши  
    - **_top?_** - (*number*) - y-координата  
- <span class="submethod">**hide (): object**</span> - скрывает тултип  
- <span class="submethod">**setContent (html): object**</span> - задаёт HTML-содержимое тултипа  
    - **_html_** - (*string*) - HTML-строка для отображения в тултипе  

## Методы

Доступно несколько методов для управления поведением тултипа при наведении на элементы DOM.

### gantt.ext.tooltips.attach()

- <span class="submethod">**attach (config): void**</span> - добавляет тултип с подробной конфигурацией. Принимает один параметр:  
    - **_config_** - (*object*) - объект конфигурации тултипа, включая:  
        - **_selector_** - (*string*) - CSS-селектор для элементов, на которых отслеживаются события мыши  
        - **_onmouseenter_** - (*Function*): void - вызывается при наведении мыши на элемент, параметры:  
            - **_event_** - (*MouseEvent*) - нативное событие мыши  
            - **_node_** - (*HTMLElement*) - целевой HTML-элемент  
        - **_onmousemove?_** - (*Function*): void - необязательно, вызывается при движении мыши внутри элемента, параметры:  
            - **_event_** - (*MouseEvent*) - нативное событие мыши  
            - **_node_** - (*HTMLElement*) - целевой HTML-элемент  
        - **_onmouseleave_** - (*Function*): void - вызывается при уходе мыши с элемента, параметры:  
            - **_event_** - (*MouseEvent*) - нативное событие мыши  
            - **_node_** - (*HTMLElement*) - целевой HTML-элемент  
        - **_global?_** - (*boolean*) - необязательно, если true - слушает события мыши на всей странице; если false - только внутри элемента Gantt. По умолчанию *false*.  
  
~~~js
gantt.ext.tooltips.attach({
    selector: ".gantt_task_cell",
    onmouseenter: function (e, node) {
        const id = node.parentNode.attributes['task_id'].nodeValue;
        const task = gantt.getTask(id);

        if (typeof task.text == "string") {
            gantt.ext.tooltips.tooltip.setContent(task.text);
            gantt.ext.tooltips.tooltip.show(e.clientX + 20, e.clientY + 20)
        }
    },
    onmousemove: function (e, node) {
        gantt.ext.tooltips.tooltip.show(e.clientX + 20, e.clientY + 20)
    },
    onmouseleave: function (e, node) {
        gantt.ext.tooltips.tooltip.hide()
    },
})
~~~

### gantt.ext.tooltips.tooltipFor()

- <span class="submethod">**tooltipFor (config): void**</span> - добавляет тултип к определённому элементу Gantt. Это упрощённая альтернатива **attach()**. Принимает один параметр:  
    - **_config_** - (*object*) - объект конфигурации, включает:  
        - **_selector_** - (*string*) - CSS-селектор элемента Gantt для привязки тултипа  
        - **_html_** - (*Function*): HTMLElement | string | number | void - функция, возвращающая содержимое тултипа. Получает:  
            - **_event_** - (*Event*) - нативное событие мыши  
            - **_node_** - (*HTMLElement*) - HTML-элемент, возвращает строку с содержимым тултипа  
        - **_global?_** - (*boolean*) - необязательно, если true - слушает на всей странице; если false - только внутри элемента Gantt. По умолчанию *false*.  
  
~~~js
gantt.ext.tooltips.tooltipFor({
    selector: ".gantt_task_cell",
    html: function (e, domElement) {
        const id = domElement.parentNode.attributes['task_id'].nodeValue;
        const task = gantt.getTask(id);
        return task.text;
    }
});
~~~  

### gantt.ext.tooltips.detach()

- <span class="submethod">**detach (selector): void**</span> - удаляет тултип для указанного элемента. Принимает один параметр:  
    - **_selector_** - (*string*) - CSS-селектор элемента Gantt
