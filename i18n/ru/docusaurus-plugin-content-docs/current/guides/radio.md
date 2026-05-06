---
title: "Переключатель (Radio Button)"
sidebar_label: "Переключатель (Radio Button)"
---

# Управление радиокнопкой

Блок вариантов, позволяющий выбрать только один из них за раз.

![Радиокнопка](/img/radiobutton_control.png)

[Управление радиокнопкой](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_radio.html)

## Инициализация

Чтобы добавить управление радиокнопкой в lightbox, выполните следующие шаги:

1) Добавьте раздел в конфигурацию lightbox:

~~~js
var opts = [
    {key: 1, label: "High"},
    {key: 2, label: "Normal"},
    {key: 3, label: "Low"}                                        
];

gantt.config.lightbox.sections = [
    {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    {name: "priority", height: 22, map_to: "priority", type: "radio", options: [opts]}, /*!*/
    {name: "time", type: "duration", map_to: "auto"}
];
~~~ 

2) Задайте подпись для раздела:

~~~js
gantt.locale.labels.section_priority = "Priority";
~~~


[Управление радиокнопкой](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_radio.html)


## Свойства

Следующие свойства в основном важны и обычно задаются для управления **радиокнопкой** (полный список см. здесь: [api/config/lightbox.md](api/config/lightbox.md)):

- **name** - (*string*) имя секции 
- **map_to** - (*string*) имя свойства данных, которое будет сопоставлено с секцией
- **type** - (*string*) тип элемента управления секции [guides/default-edit-form.md#lightboxcontrols]
- **options** - (*array*) массив объектов. Определяет варианты выбора элемента управления (используется для контролов **select**, **checkbox** и **radio** контролов). Каждый объект в массиве задает один вариант и имеет следующие свойства:
    - **key** - (*string*) идентификатор варианта
    - **label** - (*string*) подпись варианта
- **focus** - (*boolean*) если установлен в *true*, раздел будет получать фокус при открытии lightbox
- **default_value** - (*any*) значение по умолчанию элемента управления секцией. Применяется только если входное значение неопределено            


## Заполнение управления данными

Обычно, чтобы задать значения для управления **радиокнопкой**, используйте параметр [options](api/config/lightbox.md):

~~~js
gantt.config.lightbox.sections = [        
    {name: "priority", map_to: "priority", type: "radio", options: [
        {key: 1, label: "High"},
        {key: 2, label: "Normal"},
        {key: 3, label: "Low"},
    ]}        
];
~~~

Элементы в параметре [options](api/config/lightbox.md) имеют 2 обязательных свойства:

- **key** - (*string*) идентификатор варианта
- **label** - (*string*) подпись варианта