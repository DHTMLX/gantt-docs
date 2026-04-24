---
title: "Контроль ограничений"
sidebar_label: "Контроль ограничений"
---

## Контроль ограничений

:::info
Эта функциональность доступна только в PRO-версии.
:::

Сложный элемент управления, используемый для задания [временных ограничений для задач Gantt](guides/auto-scheduling.md#timeconstraintsfortasks).

![Контроль ограничений](/img/constraint_control.png)

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

[Авто-планирование от начала проекта и ограничений](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## Инициализация

Чтобы добавить элемент управления **constraint** в lightbox, выполните следующие шаги:

1. Добавьте секцию в конфигурацию lightbox:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

2. Задайте метку для секции:

~~~js
gantt.locale.labels.section_constraint = "Constraint";
~~~


[Авто-планирование от начала проекта и ограничений](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## Свойства

Следующие свойства в основном важны и обычно устанавливаются для элемента управления **constraint** (см. полный список [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя секции 
- **type** - (*string*) тип [контроля секции](guides/default-edit-form.md#lightboxcontrols)