---
sidebar_label: updateLink
title: Метод updateLink
description: "обновляет указанную зависимую связь"
---

# updateLink

### Description

@short: Обновляет указанную зависимую связь

@signature: updateLink: (id: string | number) =\> void

### Parameters

- `id` - (обязателен) *string | number* - идентификатор задачи

### Example

~~~jsx
gantt.addLink({
    id:5, 
    source:1, 
    target:2, 
    type:1
});

gantt.getLink(5).type = 2; //changes link's data
gantt.updateLink(5); //renders the updated link
~~~

### Details

:::note
Метод вызывает событие [onAfterLinkUpdate](api/event/onafterlinkupdate.md). 
::: 

:::note
Метод инициирует DataProcessor, если dataProcessor включён. 
:::

Этот метод следует вызывать после изменения объекта ссылки, чтобы обновить состояние Gantt, перекрасить связанные элементы интерфейса и отправить изменения на сервер.

Вызов этого метода вызовет событие onAfterLinkUpdate, которое может привести к дополнительным перерасчётам.

Если вы используете [DataProcessor](guides/server-side.md), вызов этого метода инициирует запрос на **обновление** на сервер.

Для внесения визуальных изменений, которые не требуют сохранения, используйте метод [refreshLink](api/method/refreshlink.md) вместо этого. Это перерисует запись в Gantt без дополнительных вычислений или запросов к серверу.

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
- [Server-Side Integration](guides/server-side.md)