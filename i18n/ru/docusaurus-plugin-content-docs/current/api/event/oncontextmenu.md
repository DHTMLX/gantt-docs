---
sidebar_label: onContextMenu
title: onContextMenu event
description: "срабатывает, когда пользователь нажимает правую кнопку мыши внутри диаграммы Ганта (см. детали)"
---

# onContextMenu

### Description

@short: срабатывает, когда пользователь нажимает правую кнопку мыши внутри диаграммы Ганта (см. детали)

@signature: onContextMenu: (taskId: string | number, linkId: string | number, e: Event) =\> void;

### Parameters

- `taskId` - (required) *string | number* - идентификатор задачи
- `linkId` - (required) *string | number* - идентификатор связи
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
    const element = event.target;
    console.log("You've clicked on the ", element)
    return true;
});
~~~

### Related samples
- [Контекстное меню для управления задачами](https://docs.dhtmlx.com/gantt/samples/04_customization/10_context_menu.html)

### Details

Правые клики в диаграмме Ганта открывают меню контекстного меню браузера по умолчанию, если не выполняются другие условия.
В следующем примере клик по задаче вызывает отображение [контекстного меню DHTMLX](https://docs.dhtmlx.com/menu__index.html) и скрывает стандартное контекстное меню браузера.

~~~js
//требуется компонент меню DHTMLX
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
    const x = event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
    const y = event.clientY+document.body.scrollTop+document.documentElement.scrollTop;

    if (taskId) {
        menu.showContextMenu(x, y);
        return false;
    }

    return true;
});
~~~

Не забудьте подключить либо файлы DHTMLX Menu или DHTMLX Suite на страницу. В противном случае пример не будет работать.

Посмотрите [ещё один пример](https://snippet.dhtmlx.com/xuvxhjbc), если вам нужно добавить пользовательское контекстное меню на чистом JavaScript.