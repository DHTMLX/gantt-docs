---
title: "Контрол Checkbox"
sidebar_label: "Контрол Checkbox"
---

# Контрол Checkbox

Это простой двухпозиционный контрол checkbox, используемый для переключения опций или нескольких значений в режимах включено/выключено.

Он может быть полезен в следующих ситуациях:

- [назначение ресурсов задачам](guides/resource-management.md)

![Контрол Checkbox](/img/checkbox_control.png)


[Checkbox control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_checkbox.html)


- переключение [между split и tree режимами для разделённых задач](guides/split-tasks.md)

![Checkbox для split-задачи](/img/split_task_checkbox.png)


~~~js
gantt.config.lightbox.project_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:[    /*!*/
        {key:"split", label:"Split Task"}                            /*!*/                        
    ]},                                                                /*!*/
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~


[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## Инициализация

Чтобы добавить контрол **checkbox** в lightbox, необходимо:

1) Добавить секцию в конфигурацию lightbox:

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

2) Определить label для этой секции:

~~~js
gantt.locale.labels.section_split = "Display";
~~~
  

[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## Свойства

Ниже приведены основные свойства, которые часто используются с контролом **checkbox** (полный список можно найти [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя секции 
- **map_to** - (*string*) имя свойства данных, с которым связана эта секция
- **type** - (*string*) [тип контрола секции](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) массив объектов, определяющих доступные для выбора опции (*используется с контролами **select**, **checkbox** и **radio***). Каждый объект включает:
    - **key** - (*string*) ID опции, используется для сопоставления с данными задачи
    - **label** - (*string*) отображаемое название опции
- **focus** - (*boolean*) если true, секция получит фокус при открытии lightbox
- **default_value** - (*any*) значение по умолчанию для контрола, применяется только если значение ввода не определено
  


## Заполнение контрола данными

Для задания значений контрола **checkbox** обычно используется параметр [options](api/config/lightbox.md):

~~~js
gantt.config.lightbox.sections = [
    {name: "split", type:"checkbox", map_to: "render", options:[
        {key:"split", label:"Split Task"}
    ]}                                                                
];
~~~

Каждый элемент массива [options](api/config/lightbox.md) должен содержать два свойства:

- **key** - ID опции
- **label** - название опции

