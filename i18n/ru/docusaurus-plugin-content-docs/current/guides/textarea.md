---
title: "Textarea Control"
sidebar_label: "Textarea Control"
---

# Многострочное текстовое поле

Многострочное текстовое поле.

![textarea_control](/img/textarea_control.png)

## Инициализация

По умолчанию в lightbox добавлен один элемент управления **textarea**. Чтобы добавить ещё один, выполните ниже приведённые шаги:

1) Добавьте секцию в конфигурацию lightbox:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"desc", type:"textarea",focus:true},
    {name:"details",     height:38, map_to:"text", type:"textarea"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~


2) Установите подпись к секции:

~~~js
gantt.locale.labels.section_details = "Details";
~~~
  

## Свойства

Следующие свойства являются наиболее важными и обычно устанавливаются для элемента управления **textarea** (см. полный список [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя секции
- **height** - (*number*) высота секции
- **map_to** - (*string*) имя свойства данных, которое будет отображено на секции
- **type** - (*string*) тип [контрола секции](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) если установить в *true*, секция будет получать фокус при открытии lightbox
- **default_value** - (*any*) значение по умолчанию элемента управления секцией. Применяется только если входное значение неопределено. Не будет работать с *map_to:"text"*