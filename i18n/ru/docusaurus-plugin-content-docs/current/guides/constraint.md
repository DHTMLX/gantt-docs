---
title: "Управление ограничениями"
sidebar_label: "Управление ограничениями"
---

# Управление ограничениями

:::info
Эта функция доступна только в редакции PRO.
:::

Это специализированный контрол, предназначенный для задания [временных ограничений для задач Gantt](guides/auto-scheduling.md#timeconstraintsfortasks).

![Constraint control](/img/constraint_control.png)

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## Инициализация

Чтобы добавить контрол **constraint** в лайтбокс, выполните следующие шаги:

1. Добавьте секцию в конфигурацию лайтбокса:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

2. Установите метку для секции:

~~~js
gantt.locale.labels.section_constraint = "Constraint";
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## Свойства

Ниже приведены основные свойства, которые обычно используются с контролом **constraint** (полный список смотрите [здесь](api/config/lightbox.md)):

- **name** - (*string*) идентификатор названия секции
- **type** - (*string*) определяет тип [контрола секции](guides/default-edit-form.md#lightboxcontrols)

