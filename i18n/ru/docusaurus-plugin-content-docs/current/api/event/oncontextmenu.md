---
sidebar_label: onContextMenu
title: onContextMenu event
description: "срабатывает, когда пользователь кликает правой кнопкой мыши внутри диаграммы Ганта (подробности см. ниже)"
---

# onContextMenu

### Description

@short: Срабатывает, когда пользователь кликает правой кнопкой мыши внутри диаграммы Ганта (подробности см. ниже)

@signature: onContextMenu: (taskId: string | number, linkId: string | number, e: Event) =\> void;

### Parameters

- `taskId` - (required) *string | number* - идентификатор задачи
- `linkId` - (required) *string | number* - идентификатор связи
- `e` - (required) *Event* - объект нативного события

### Example

~~~jsx
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
      var element = event.target;
    console.log("Вы кликнули по элементу ", element)
    return true;
});
~~~

### Related samples
- [Context menu to control tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/10_context_menu.html)

### Details

Щелчок правой кнопкой мыши внутри диаграммы Ганта обычно открывает стандартное контекстное меню браузера, если не выполняются другие условия. 
В примере ниже, при клике правой кнопкой по задаче показывается [DHTMLX контекстное меню](https://docs.dhtmlx.com/menu__index.html), что предотвращает появление стандартного меню браузера.

~~~
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

Обязательно подключите на страницу либо [файлы DHTMLX Menu, либо DHTMLX Suite](https://docs.dhtmlx.com/menu__how_to_start.html), так как пример зависит от них.
<br>

Для чисто JavaScript решения по добавлению кастомного контекстного меню смотрите [этот пример](https://snippet.dhtmlx.com/xuvxhjbc).
