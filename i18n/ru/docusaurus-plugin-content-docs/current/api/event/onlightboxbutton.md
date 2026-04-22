---
sidebar_label: onLightboxButton
title: onLightboxButton событие
description: "Срабатывает при клике пользователя по настраиваемой кнопке в lightbox"
---

# onLightboxButton

### Description

@short: Срабатывает, когда пользователь нажимает на настраиваемую кнопку в lightbox

@signature: onLightboxButton: (css: string, node: HTMLElement, e: Event) => void;

### Parameters

- `css` - (required) *string* - имя CSS класса, применяемого к кнопке
- `node` - (required) *HTMLElement* - HTML-элемент нажатой кнопки
- `e` - (required) *Event* - объект нативного события 'click'

### Example

~~~jsx
gantt.attachEvent("onLightboxButton", function (css, node, e){
    // любая ваша логика здесь
});
~~~

### Details

Событие срабатывает только для настраиваемых кнопок в нижней части lightbox и не срабатывает
для кнопок по умолчанию.