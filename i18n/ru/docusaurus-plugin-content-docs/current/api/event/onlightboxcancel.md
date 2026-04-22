---
sidebar_label: onLightboxCancel
title: onLightboxCancel event
description: "срабатывает, когда пользователь нажимает кнопку 'Cancel' в lightbox"
---

# onLightboxCancel

### Description

@short: Срабатывает, когда пользователь нажимает на кнопку 'Cancel' в lightbox

@signature: onLightboxCancel: (id: string | number) =\> void;

### Parameters

- `id` - (обязателен) *string | number* - идентификатор задачи (задача, открытая в lightbox)

### Example

~~~jsx
gantt.attachEvent("onLightboxCancel", function(id){
    // любая ваша логика здесь
})
~~~

### Related Guides
- [onLightboxSave](api/event/onlightboxsave.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)