---
title: "Textarea Control"
sidebar_label: "Textarea Control"
---

# Textarea Control


Это многострочное текстовое поле.

![textarea_control](/img/textarea_control.png)

## Инициализация


По умолчанию в лайтбоксе уже присутствует один контрол **textarea**. Чтобы добавить дополнительный контрол, выполните следующие шаги:

1) Добавьте секцию в конфигурацию лайтбокса:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"desc", type:"textarea",focus:true},
    {name:"details",     height:38, map_to:"text", type:"textarea"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

2) Задайте метку для новой секции:

~~~js
gantt.locale.labels.section_details = "Details";
~~~

## Свойства


Ниже приведены основные свойства, которые обычно используются с контролом **textarea** (полный список смотрите [здесь](api/config/lightbox.md)):

- **name** - (*string*) идентификатор секции
- **height** - (*number*) высота секции
- **map_to** - (*string*) свойство данных, связанное с секцией
- **type** - (*string*) тип [контрола секции](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) если установлено *true*, данная секция будет в фокусе при открытии лайтбокса
- **default_value** - (*any*) начальное значение для контрола, применяется только если ввод не определён. Обратите внимание, что это не работает с *map_to:"text"*

