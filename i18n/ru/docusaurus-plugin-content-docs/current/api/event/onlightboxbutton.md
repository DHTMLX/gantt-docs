---
sidebar_label: onLightboxButton
title: onLightboxButton event
description: "срабатывает, когда пользователь нажимает на кастомную кнопку внутри lightbox"
---

# onLightboxButton

### Description

@short: Срабатывает, когда пользователь нажимает на кастомную кнопку внутри lightbox

@signature: onLightboxButton: (css: string, node: HTMLElement, e: Event) =\> void;

### Parameters

- `css` - (required) *string* - имя CSS класса, присвоенного кнопке
- `node` - (required) *HTMLElement* - HTML элемент, представляющий нажатую кнопку
- `e` - (required) *Event* - нативный объект события 'click'

### Example

~~~jsx
gantt.attachEvent("onLightboxButton", function (css, node, e){
    //место для вашей кастомной логики
});
~~~

### Details

Это событие срабатывает только для кастомных кнопок, расположенных внизу lightbox, и не применяется к стандартным кнопкам.
