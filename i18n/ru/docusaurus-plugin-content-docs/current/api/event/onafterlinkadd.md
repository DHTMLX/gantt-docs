---
sidebar_label: onAfterLinkAdd
title: onAfterLinkAdd событие
description: "Срабатывает после добавления новой связи на диаграмме Ганта"
---

# onAfterLinkAdd

### Description

@short: Срабатывает после добавления новой связи на диаграмме Ганта

@signature: onAfterLinkAdd: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор связи
- `link` - (required) *Link* - объект связи

### Example

~~~jsx
gantt.attachEvent("onAfterLinkAdd", function(id,link){
    //место для вашей кастомной логики
});
~~~

### Related API
- [addLink](api/method/addlink.md)