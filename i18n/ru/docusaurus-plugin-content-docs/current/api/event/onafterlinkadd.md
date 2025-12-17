---
sidebar_label: onAfterLinkAdd
title: onAfterLinkAdd event
description: "срабатывает сразу после добавления новой связи в диаграмму Ганта"
---

# onAfterLinkAdd

### Description

@short: Срабатывает сразу после добавления новой связи в диаграмму Ганта

@signature: onAfterLinkAdd: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - ID связи
- `link` - (required) *Link* - объект связи

### Example

~~~jsx
gantt.attachEvent("onAfterLinkAdd", function(id,link){
    //место для вашей кастомной логики
});
~~~

### Related API
- [addLink](api/method/addlink.md)

