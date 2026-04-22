---
title: "Расширение Tooltips"
sidebar_label: "Расширение Tooltips"
---

# Расширение тултипов

Подробнее об расширении тултипов читайте в статье [Тултипы для элементов Gantt](guides/tooltips.md).

## Объект тултипа

Вы можете получить доступ к объекту тултипа как **gantt.ext.tooltips.tooltip**. Этот объект позволяет управлять позицией, содержимым и видимостью тултипа с помощью набора методов:

- <span class="submethod">**getNode (): HTMLElement**</span> - возвращает HTML-элемент тултипа  
- <span class="submethod">**setViewport (node): object**</span> - фиксирует положение тултипа в границах указанного HTML-элемента
    - **_node_** - (*HTMLElement*) - HTML-элемент под вопросом
- <span class="submethod">**show (config, top): object**</span> - отображает тултип в заданных координатах (относительно document.body). Метод может принимать различные параметры в зависимости от положения, в котором вы хотите показать тултип. Чтобы отобразить тултип в конкретных координатах (относительно document.body), передайте координаты x, y. Чтобы отобразить тултип по координатам события мыши — передайте объект Event. Значения *tooltip_offset_x/y* и viewport будут учтены.
    - **_config?_** - (*number | Event*) - X-координата или объект события мыши
    - **_top?_** - (*number*) - Y-координата 
- <span class="submethod">**hide (): object**</span> - скрывает элемент тултипа
- <span class="submethod">**setContent (html): object**</span> - помещает HTML-содержимое в тултип. В качестве параметра принимает:
    - **_html_** - (*string*) - строка с HTML-содержимым для тултипа

## Методы

Существует несколько методов, которые позволяют управлять поведением тултипа при наведении на элементы DOM.

### gantt.ext.tooltips.attach()

- <span class="submethod">**attach (config): void**</span> - добавляет тултип с расширенной конфигурацией. Метод принимает один параметр:
    - **_config_** - (*object*) - объект с настройками тултипа. Настройки следующие:
        - **_selector_** - (*string*) - CSS-селектор для элементов, на которых будет слушаться событие мыши
        - **_onmouseenter_** - (*Function*): void - обработчик, вызываемый, когда указатель мыши входит в элемент. Параметры:
            - **_event_** - (*MouseEvent*) - нативное событие мыши
            - **_node_** -  (*HTMLElement*) - HTML-узел
        - **_onmousemove?_** - (*Function*): void - необязательный обработчик, вызываемый при перемещении указателя мыши внутри элемента. Параметры:
            - **_event_** - (*MouseEvent*) - нативное событие мыши
            - **_node_** -  (*HTMLElement*) - HTML-узел
        - **_onmouseleave_** - (*Function*): void - обработчик, вызываемый, когда указатель мыши покидает элемент. Параметры:    
            - **_event_** - (*MouseEvent*) - нативное событие мыши
            - **_node_** -  (*HTMLElement*) - HTML-узел
        - **_global?_** - (*boolean*) - необязательный, определяет, слушает ли модуль события мыши по всей странице (*true*) или только внутри элемента Gantt (*false*). По умолчанию значение *false*. 
  
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

- <span class="submethod">**tooltipFor (config): void**</span> - добавляет тултип к указанному элементу Gantt. Это более упрощенная версия метода **attach()**. Метод принимает один параметр:
    - **_config_** - (*object*) - объект с настройками тултипа. Настройки следующие:
        - **_selector_** - (*string*) - CSS-селектор элемента Gantt, к которому нужно добавить тултип
        - **_html_** - (*Function*): HTMLElement | string | number | void - шаблон для тултипа. Функция-шаблон принимает два параметра в свою очередь:
            - **_event_** - (*Event*) - нативное событие мыши
            - **_node_** -  (*HTMLElement*) - HTML-узел и возвращает строку-шаблон.
        - **_global?_** - (*boolean*) - необязательный, определяет, слушает ли модуль события мыши по всей странице (*true*) или только внутри элемента Gantt (*false*). По умолчанию значение *false*. 
  
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

- <span class="submethod">**detach (selector): void**</span> - удаляет тултип. В качестве параметра метод принимает:
    - **_selector_** - (*string*) - CSS-селектор элемента Gantt