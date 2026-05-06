---
sidebar_label: onAfterLightbox
title: onAfterLightbox событие
description: "срабатывает после того, как пользователь закрыл lightbox (форма редактирования)"
---

# onAfterLightbox

### Description

@short: Срабатывает после того, как пользователь закрыл lightbox (форма редактирования)

@signature: onAfterLightbox: () => void;

### Example

~~~jsx
gantt.attachEvent("onAfterLightbox", function (){
    //любая пользовательская логика здесь
});
~~~