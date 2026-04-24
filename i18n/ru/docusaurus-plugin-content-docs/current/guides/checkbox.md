--- 
title: "Элемент управления чекбоксом" 
sidebar_label: "Контроль чекбоксов" 
---

# Элемент управления чекбоксом

Флажок с двумя состояниями. Элемент управления используется для переключения одного параметра или нескольких значений в состояние включено/выключено.

Например, это полезно для:

- [назначение ресурсов для задач](guides/resource-management.md) 

![Контроль флажка](/img/checkbox_control.png)


[Контроль чекбокса](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_checkbox.html)


- переключения между режимами split и tree для разделённых задач

![Флажок разделённой задачи](/img/split_task_checkbox.png)


~~~js
gantt.config.lightbox.project_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:[    /*!*/
        {key:"split", label:"Split Task"}                            /*!*/                        
    ]},                                                                /*!*/
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~


[Задача со сплитом](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## Инициализация

Чтобы добавить элемент управления **checkbox** к lightbox, выполните следующие шаги:

1) Добавьте раздел в конфигурацию lightbox:

~~~js
var opts = [
    {key:"split", label:"Split Task"}                                        
];

gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:opts},            /*!*/
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~ 

2) Установите подпись к разделу:

~~~js
gantt.locale.labels.section_split = "Display";
~~~


[Задача со сплитом](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## Свойства

Следующие свойства в значительной степени важны и обычно устанавливаются для элемента управления **checkbox** (см. полный список [здесь](api/config/lightbox.md)):

- **name** - (*string*) название раздела 
- **map_to** - (*string*) имя свойства данных, которое будет сопоставлено разделу
- **type** - (*string*) тип элемента управления раздела [тип элемента управления раздела](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) массив объектов. Определяет опции выбора элемента управления (*используется для элементов управления **select**, **checkbox** и **radio**). Каждый объект в массиве задаёт одну опцию и имеет следующие свойства:
    - **key** - (*string*) идентификатор опции. Этот атрибут сравнивается со свойством данных задачи для привязки опций к задачам
    - **label** - (*string*) название опции
- **focus** - (*boolean*) если установлен в *true*, раздел получает фокус при открытии lightbox
- **default_value** - (*any*) значение по умолчанию элемента управления раздела. Применяется только если входное значение неопределено


## Заполнение элемента управления данными

Обычно, чтобы задать значения для элемента управления **checkbox**, используйте параметр [options](api/config/lightbox.md):

~~~js
gantt.config.lightbox.sections = [
    {name: "split", type:"checkbox", map_to: "render", options:[
        {key:"split", label:"Split Task"}
    ]}                                                                
];
~~~ 

Элементы параметра [options](api/config/lightbox.md) имеют 2 обязательных свойства:

- **key** - идентификатор опции
- **label** - название опции