---
sidebar_label: onLightbox
title: onLightbox event
description: "срабатывает один раз, когда пользователь открывает lightbox (форму редактирования)"
---

# onLightbox

### Description

@short: Срабатывает один раз, когда пользователь открывает lightbox (форму редактирования)

@signature: onLightbox: (task_id: string | number) =\> void;

### Parameters

- `task_id` - (required) *string | number* - ID задачи, которая была открыта в lightbox

### Example

~~~jsx
gantt.attachEvent("onLightbox", function (task_id){
    // здесь можно добавить кастомную логику
});
~~~
