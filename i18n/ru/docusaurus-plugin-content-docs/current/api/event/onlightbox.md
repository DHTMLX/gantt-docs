---
sidebar_label: onLightbox
title: Событие onLightbox
description: "срабатывает после того, как пользователь открыл lightbox (форма редактирования)"
---

# onLightbox

### Description

@short: Срабатывает после того, как пользователь открыл lightbox (форма редактирования)

@signature: onLightbox: (task_id: string | number) =\> void;

### Parameters

- `task_id` - (required) *string,number* - идентификатор задачи, открытой в lightbox

### Example

~~~jsx
gantt.attachEvent("onLightbox", function (task_id){
    // здесь любая пользовательская логика
});
~~~