---
title: "Переключатель (Radio Button)"
sidebar_label: "Переключатель (Radio Button)"
---

# Переключатель (Radio Button)

Этот контрол предоставляет набор вариантов, из которых можно выбрать только один одновременно.

![Radio Button](/img/radiobutton_control.png)


[Radio control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_radio.html)


## Инициализация

Чтобы добавить контрол **переключатель** в lightbox, выполните следующие действия:

1) Добавьте секцию в конфигурацию lightbox:

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

2) Определите заголовок для этой секции:

~~~js
gantt.locale.labels.section_priority = "Priority";
~~~
  

[Radio control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_radio.html)


## Свойства

Ниже приведены основные свойства, которые часто используются с контролом **переключатель** (полный список смотрите [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя секции
- **map_to** - (*string*) свойство данных, с которым связана секция
- **type** - (*string*) [тип контрола секции](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) массив объектов, определяющих доступные варианты выбора (*используется с контролами **select**, **checkbox** и **radio***). Каждый объект описывает вариант и включает:
    - **key** - (*string*) идентификатор варианта, сопоставляется с данными задачи для выбора значения
    - **label** - (*string*) текст, отображаемый для варианта
- **focus** - (*boolean*) если установлено в *true*, секция автоматически получает фокус при открытии lightbox
- **default_value** - (*any*) значение по умолчанию для контрола, применяется только если входное значение не определено            


## Заполнение контрола данными

Чтобы задать варианты для контрола **переключатель**, используйте параметр [options](api/config/lightbox.md):

~~~js
gantt.config.lightbox.sections = [        
    {name: "priority", map_to: "priority", type: "radio", options: [
        {key: 1, label: "High"},
        {key: 2, label: "Normal"},
        {key: 3, label: "Low"},
    ]}        
];
~~~

Каждый элемент массива [options](api/config/lightbox.md) должен содержать два свойства:

- **key** - идентификатор варианта
- **label** - текст, отображаемый для варианта

