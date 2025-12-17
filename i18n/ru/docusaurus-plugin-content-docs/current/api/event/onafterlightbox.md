---
sidebar_label: onAfterLightbox
title: onAfterLightbox event
description: "срабатывает один раз, когда пользователь закрывает лайтбокс (форму редактирования)"
---

# onAfterLightbox

### Description

@short: Срабатывает один раз, когда пользователь закрывает лайтбокс (форму редактирования)

@signature: onAfterLightbox: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onAfterLightbox", function (){
    //любая пользовательская логика здесь
});
~~~
