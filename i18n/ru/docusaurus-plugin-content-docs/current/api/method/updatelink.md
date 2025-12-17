---
sidebar_label: updateLink
title: updateLink method
description: "обновляет указанный dependency link"
---

# updateLink

### Description

@short: Обновляет указанный dependency link

@signature: updateLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    идентификатор задачи

### Example

~~~jsx
gantt.addLink({
    id:5, 
    source:1, 
    target:2, 
    type:1
});

gantt.getLink(5).type = 2; // изменяет данные ссылки
gantt.updateLink(5); // применяет обновленную ссылку визуально и функционально
~~~

### Details

:::note
 Метод вызывает событие [onAfterLinkUpdate](api/event/onafterlinkupdate.md). 
:::
:::note
 Если включен dataProcessor, этот метод активирует [DataProcessor](guides/server-side.md). 
:::

Этот метод следует использовать после любых изменений объекта ссылки, чтобы обновить внутреннее состояние Gantt, обновить соответствующие UI компоненты и отправить изменения на сервер.

Вызов этой функции инициирует событие [onAfterLinkUpdate](api/event/onafterlinkupdate.md), что может привести к дополнительным перерасчетам.

При использовании [DataProcessor](guides/server-side.md) этот метод инициирует запрос **update** на сервер.

Для визуального обновления, которое не требует сохранения, лучше использовать метод [refreshLink](api/method/refreshlink.md). Он просто перерисует ссылку в Gantt без запуска дополнительных расчетов или общения с сервером.

~~~js
let selectedLink = null;
gantt.templates.link_class = function(link){
    if(link.id == selectedLink) {
        return "selected_link";
    }
};

gantt.attachEvent("onLinkClick", function(id,e){
    selectedLink = id;
    gantt.refreshLink(id); /*!*/
});
~~~

### Related API
- [updateTask](api/method/updatetask.md)
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)
- [onAfterLinkUpdate](api/event/onafterlinkupdate.md)

### Related Guides
- [Интеграция с серверной стороной](guides/server-side.md#updatingdataontheserver)

