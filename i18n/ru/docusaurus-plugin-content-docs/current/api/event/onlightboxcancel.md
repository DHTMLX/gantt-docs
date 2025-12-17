---
sidebar_label: onLightboxCancel
title: onLightboxCancel event
description: "срабатывает, когда пользователь нажимает кнопку «Cancel» в лайтбоксе"
---

# onLightboxCancel

### Description

@short: Срабатывает, когда пользователь нажимает кнопку «Cancel» в лайтбоксе

@signature: onLightboxCancel: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи (задача, которая в данный момент открыта в лайтбоксе)

### Example

~~~jsx
gantt.attachEvent("onLightboxCancel", function(id){
    //любая ваша логика здесь
})
~~~

### Related Guides
- [onLightboxSave](api/event/onlightboxsave.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)

