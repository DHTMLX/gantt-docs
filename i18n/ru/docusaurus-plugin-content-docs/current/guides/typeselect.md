---
title: "Typeselect Контроль"
sidebar_label: "Typeselect Контроль"
---

# Typeselect Контроль


:::info
Эта функциональность доступна только в PRO Edition.
:::

Поле выбора для изменения [типа задачи](guides/task-types.md).

Контроль загружает варианты из объекта [types](api/config/types.md) и имеет обработчик onchange по умолчанию. Всё остальное идентично [Select Control](guides/select.md).

![typeselect_control](/img/typeselect_control.png)

~~~js
gantt.config.lightbox секции = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name: "type", type: "typeselect", map_to: "type"},                             /*!*/
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


## Инициализация


Чтобы добавить typeselect-контроль к lightbox, просто добавьте секцию в конфигурацию lightbox, как в примере:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name: "type", type: "typeselect", map_to: "type"},                             /*!*/
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


- [Каждый тип задачи имеет свой lightbox](guides/task-types.md#specificlightboxpertasktype). Вы можете создать новый тип задач и определить специфическую структуру lightbox для этого типа.
- Как только пользователь изменит [тип задачи](guides/task-types.md) через контроль, контроль обновит структуру lightbox в соответствии с выбранным значением. 
- Контроль загружает варианты из объекта [types](api/config/types.md) и имеет обработчик onchange по умолчанию.
- Раздел с **name="type"** уже имеет метку, указанную как "Type". Если хотите задать другой ярлык для раздела, используйте следующий код: 

~~~js
gantt.locale.labels.section_type = "New label for the section";
~~~
  

## Свойства


Следующие свойства в основном важны и обычно устанавливаются для контрола **typeselect** (см. полный список [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя секции
- **height** - (*number*) высота секции
- **map_to** - (*string*) имя свойства данных, которое будет сопоставлено секции
- **type** - (*string*) тип [типа элемента управления секцией](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) если установлено в *true*, секция получит фокус при открытии lightbox
- **filter** - (*функция*) устанавливает функцию фильтрации по типам задач. Принимает имя типа в качестве параметра