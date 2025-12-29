---
sidebar_label: addLinkLayer
title: addLinkLayer method
description: "отображает дополнительный слой с кастомными элементами для связей в области timeline"
---

# addLinkLayer
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Отображает дополнительный слой с кастомными элементами для связей в области timeline

@signature: addLinkLayer: (func: AdditionalLinkLayer['LinkLayerRender'] | AdditionalLinkLayer['LinkLayerConfig']) =\> string

### Parameters

- `func` - (required) *LinkLayerRender | LinkLayerConfig* -        функция рендера или объект конфигурации

### Returns
- ` layerId` - (string) - DOM-элемент, представляющий слой, который будет отображён

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

Аргумент может иметь один из следующих типов:

- **linkLayerRender (link, timeline, config, viewport): HTMLElement|boolean|void** - функция, которая принимает объект связи и возвращает DOM-элемент для отображения в слое.
    - **_link_** - (*Link*) - объект связи
    - **_timeline?_** - (*any*) - необязательно, представление timeline
    - **_config?_** - (*GanttConfigOptions*) - необязательно, объект конфигурации Gantt
    - **_viewport?_** - (*LayerViewport*) - необязательно, объект viewport


- **linkLayerConfig** - (*object*) - объект конфигурации для дополнительного слоя связей, со следующими свойствами:
    - **_id?_** - (*string | number*) - необязательно, ID слоя
    - **_renderer_** - (*object*) - обязательно, объект, отвечающий за рендеринг элементов слоя
        - **_render_** - (*LinkLayerRender*) - функция, возвращающая HTML-элемент для рендера
        - **_update?_** - (*Function*): void - необязательно, функция для обновления отрендеренных HTML-элементов
            - **_link_** - (*Link*) - объект связи
            - **_node_** - (*HTMLElement*) - контейнер отрендеренного узла
            - **_timeline?_** - (*any*) - необязательно, представление timeline
            - **_config?_** - (*GanttConfigOptions*) - необязательно, объект конфигурации Gantt
            - **_viewport?_** - (*LayerViewport*) - необязательно, объект viewport
        - **_onrender?_** - (*Function*): void - необязательно, вызывается после завершения рендера, полезно для рендера нативных компонентов (например, с помощью `ReactDOM.render`)
            - **_link_** - (*Link*) - объект связи
            - **_node_** - (*HTMLElement*) - контейнер отрендеренного узла
            - **_view?_** - (*any*) - необязательно, ячейка layout, куда добавлен слой (по умолчанию: timeline)
        - **_getRectangle?_** - (*Function*): \{ left: number, top: number, height: number, width: number \} | void - необязательно, возвращает координаты прямоугольника viewport
            - **_link_** - (*Link*) - объект связи
            - **_view?_** - (*any*) - необязательно, ячейка layout, куда добавлен слой (по умолчанию: timeline)
            - **_config?_** - (*GanttConfigOptions*) - необязательно, объект конфигурации Gantt
            - **_gantt?_** - (*GanttStatic*) - необязательно, экземпляр Gantt
        - **_getVisibleRange_** - (*Function*): \{start: number, end: number\} | undefined | void - необязательно, возвращает объект видимого диапазона
            - **_gantt?_** - (*GanttStatic*) - необязательно, экземпляр Gantt
            - **_view?_** - (*any*) - необязательно, ячейка layout, куда добавлен слой (по умолчанию: timeline)
            - **_config?_** - (*GanttConfigOptions*) - необязательно, объект конфигурации Gantt
            - **_datastore?_** - (*any*) - необязательно, объект хранилища связей
            - **_viewport?_** - (*LayerViewport*) - необязательно, объект viewport
    - **_container?_** - (*HTMLElement*) - необязательно, контейнер для слоя
    - **_topmost?_** - (*boolean*) - необязательно, если true, элемент слоя будет отображаться поверх связи
    - **_filter?_** - (*Function*): boolean - необязательно, функция, которая принимает объект связи и возвращает false, чтобы пропустить рендеринг для этой связи
        - **_link_** - (*Link*) - объект связи


- Имейте в виду, что кастомные слои будут очищены после повторного вызова [gantt.init](api/method/init.md)  
- Также вызов [gantt.resetLayout()](api/method/resetlayout.md) сбросит кастомные слои. Чтобы они оставались видимыми, необходимо повторно применить **gantt.addLinkLayer** после вызова [resetLayout](api/method/resetlayout.md).

:::note
Sample: [ Gantt. Дополнительный слой с типами связей](https://snippet.dhtmlx.com/6mmt1nvw) 
:::

### Related API
- [removeLinkLayer](api/method/removelinklayer.md)
- [addTaskLayer](api/method/addtasklayer.md)

