---
title: "Типовой контрол"
sidebar_label: "Типовой контрол"
---

Типовой контрол
======================

:::info
Эта функция доступна только в PRO-версии.
:::

Это выпадающий список, предназначенный для изменения [типа задачи](guides/task-types.md). 

 Он получает опции из объекта [types](api/config/types.md) и использует обработчик по умолчанию для события onchange. В остальном он работает так же, как контрол, описанный в [Select Control](guides/select.md).
 

![typeselect_control](/img/typeselect_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name: "type", type: "typeselect", map_to: "type"},                             /*!*/
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


Инициализация
---------------------

Чтобы добавить контрол **typeselect** в lightbox, просто добавьте секцию в конфигурацию lightbox следующим образом:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name: "type", type: "typeselect", map_to: "type"},                             /*!*/
    {name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


[Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)


- Для каждого типа задачи можно задать свой lightbox, как описано в разделе [индивидуальный lightbox для каждого типа](guides/task-types.md#specificlightboxpertasktype). Можно создавать новые типы задач и определять для них собственную структуру lightbox.
- Когда пользователь меняет [тип задачи](guides/task-types.md) с помощью этого контрола, lightbox обновляет свою структуру в соответствии с выбранным типом.
- Контрол получает опции из объекта [types](api/config/types.md) и использует обработчик onchange по умолчанию.
- Секция с **name="type"** имеет стандартную метку "Type". Чтобы изменить эту метку, используйте следующий код:

~~~js
gantt.locale.labels.section_type = "Новая метка для секции";
~~~
  

Свойства
----------------

Ниже приведены основные свойства, которые часто используются с контролом **typeselect** (полный список смотрите [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя секции
- **height** - (*number*) высота секции
- **map_to** - (*string*) свойство данных, с которым связана секция
- **type** - (*string*) [тип контрола секции](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) если установлено в *true*, секция получит фокус при открытии lightbox
- **filter** - (*function*) функция фильтрации типов задач, которая получает имя типа в качестве аргумента

