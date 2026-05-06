---
sidebar_label: addLinkLayer
title: метод addLinkLayer
description: "отображает дополнительный слой с пользовательскими элементами для ссылки в области временной шкалы"
---

# addLinkLayer

:::info
Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: Отображает дополнительный слой с пользовательскими элементами для ссылки в области временной шкалы

@signature: addLinkLayer: (func: AdditionalLinkLayer['LinkLayerRender'] | AdditionalLinkLayer['LinkLayerConfig']) => string

### Parameters

- `func` - (required) *LinkLayerRender | LinkLayerConfig* -        a render function or a config object

### Returns
- ` layerId` - (string) - DOM-элемент, который будет отображаться в слое

### Example

~~~jsx
gantt.attachEvent("onGanttReady", function () {
    const link_types = ["FS", "SS", "FF", "SF"]
    gantt.addLinkLayer(function (link) {
        const node = gantt.getLinkNode(link.id);
        if (node){
            const el = document.createElement('div');
            el.className = 'link_layer';
            el.style.left = (node.childNodes[2].offsetLeft + 20) + 'px'
            el.style.top = (node.childNodes[2].offsetTop - 6) + 'px'
            el.innerHTML = link_types[link.type];
            return el;
        }
        return false;
    });
});
~~~

### Details

The argument can have these types:

- **linkLayerRender (link, timeline, config, viewport): HTMLElement|boolean|void** - функция отрисовки принимает объект ссылки в качестве параметра и должна возвращать DOM-элемент, который будет отображаться в слое.
    - **_link_** - (*Link*) - объект ссылки
    - **_timeline?_** - (*any*) - необязательный, представление временной шкалы
    - **_config?_** - (*GanttConfigOptions*) - необязательный, объект конфигурации Gantt
    - **_viewport?_** - (*LayerViewport*) - необязательный, объект viewport


- **linkLayerConfig** - (*object*) - конфигурационный объект для дополнительного слоя ссылки. Содержит следующие свойства:
    - **_id?_** - (*string | number*) - необязательный, идентификатор слоя
    - **_renderer_** - (*object*) - обязательный, функция, отвечающая за отрисовку элементов слоя
        - **_render_** - (*LinkLayerRender*) - функция, возвращающая HTML-элемент, который должен быть отрисован
        - **_update?_** - (*Function*): void - необязательная функция, в которой можно обновлять отрисованные HTML-элементы
            - **_link_** - (*Link*) - объект ссылки
            - **_node_** - (*HTMLElement*) - контейнер отрисованного узла
            - **_timeline?_** - (*any*) - необязательный, представление временной шкалы
            - **_config?_** - (*GanttConfigOptions*) - необязательный, объект конфигурации Gantt
            - **_viewport?_** - (*LayerViewport*) - необязательный, объект viewport
        - **_onrender?_** - (*Function*): void - необязательная функция, вызываемая после завершения отрисовки. Можно использовать для внедрения нативных компонентов (например, через ReactDOM.render)
            - **_link_** - (*Link*) - объект ссылки
            - **_node_** - (*HTMLElement*) - контейнер отрисованного узла
            - **_view?_** - (*any*) - необязательный, область макета, куда добавлен слой (timeline, по умолчанию)
        - **_getRectangle?_** - (*Function*): \{ left: number, top: number, height: number, width: number \} | void - необязательная функция, возвращающая координаты прямоугольника области просмотра
            - **_link_** - (*Link*) - объект ссылки
            - **_view?_** - (*any*) - необязательный, область макета, куда добавлен слой (timeline, по умолчанию)
            - **_config?_** - (*GanttConfigOptions*) - необязательный, объект конфигурации Gantt
            - **_gantt?_** - (*GanttStatic*) - необязательный, объект Gantt
        - **_getVisibleRange_** - (*Function*): \{start: number, end: number\} | undefined | void - функция, возвращающая видимый диапазон
            - **_gantt?_** - (*GanttStatic*) - необязательный, объект Gantt
            - **_view?_** - (*any*) - необязательная область макета, куда добавлен слой (timeline, по умолчанию)
            - **_config?_** - (*GanttConfigOptions*) - необязательный, объект конфигурации Gantt
            - **_datastore?_** - (*any*) - необязательный, объект хранилища ссылок
            - **_viewport?_** - (*LayerViewport*) - необязательный, объект viewport
    - **_container?_** - (*HTMLElement*) - необязательный, контейнер слоя
    - **_topmost?_** - (*boolean*) - необязательный, если true, элемент будет отображаться поверх ссылки
    - **_filter?_** - (*Function*): boolean - необязательная функция, которая принимает объект ссылки в качестве параметра. Если возвращает 'false', функция 'renderer' не будет вызываться для ссылки
        - **_link_** - (*Link*) - объект ссылки


- Будьте осторожны: пользовательские слои будут сброшены после следующего вызова gantt.init
- Вызов метода [gantt.resetLayout()](api/method/resetlayout.md) также сбрасывает пользовательские слои. Чтобы пользовательские слои отображались на странице, необходимо заново определить метод **gantt.addLinkLayer** после вызова [gantt.resetLayout()](api/method/resetlayout.md).

:::note
пример: [Gantt. Дополнительный слой с типами ссылок](https://snippet.dhtmlx.com/6mmt1nvw) 
 :::

### Related API
- [removeLinkLayer](api/method/removelinklayer.md)
- [addTaskLayer](api/method/addtasklayer.md)