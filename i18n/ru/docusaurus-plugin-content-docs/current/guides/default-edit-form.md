---
title: "Настройка элементов Lightbox"
sidebar_label: "Настройка элементов Lightbox"
---

# Настройка элементов Lightbox


Lightbox служит формой редактирования для обновления данных задачи. 

 Ниже приведён стандартный вид Lightbox.

![lightbox](/img/lightbox.png)

Lightbox может отличаться в зависимости от типа задачи и её особенностей. Параметры конфигурации для каждого типа задачи задаются в объекте [lightbox](api/config/lightbox.md). В их число входят:

- **gantt.config.lightbox.sections** - для обычных задач.
- **gantt.config.lightbox.project_sections** - для проектных задач.
- **gantt.config.lightbox.milestone_sections** - для вех.

Также возможно [добавить собственный тип](guides/task-types.md#creatingacustomtype) и определить структуру Lightbox для него.
Подробности можно найти в [Типы задач](guides/task-types.md#specificlightboxpertasktype).

Общая структура типа выглядит следующим образом:

- <span class="subproperty">**sections?**</span> - (*LightboxSection[]*) - необязательный, массив секций Lightbox для обычных задач
- <span class="subproperty">**project_sections?**</span> - (*LightboxSection[]*) - необязательный, массив секций Lightbox для проектных задач
- <span class="subproperty">**milestone_sections?**</span> - (*LightboxSection[]*) - необязательный, массив секций Lightbox для вех
- <span class="subproperty">**[lightboxType: string]**</span> - (*LightboxSection[] | undefined*) - массив секций Lightbox для пользовательских типов


:::note
Начиная с версии v7.1.13, если либо [gantt.config.csp](api/config/csp.md) установлен в *true*, либо Gantt работает в среде Salesforce, Lightbox будет отображаться внутри контейнера Gantt.
:::

## Структура Lightbox {#lightboxstructure}


### Секции

Макет Lightbox определяется свойством **sections** внутри объекта Lightbox:

~~~js
// стандартное определение lightbox   
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",          height:72, map_to:"auto", type:"duration"}
];
~~~

Каждый элемент массива **sections** представляет собой секцию Lightbox, описываемую объектом с доступными свойствами секции.


### Управление секциями {#lightboxcontrols}

Каждая секция в Lightbox строится на определённом типе элемента управления. Доступны следующие элементы управления:

- [Textarea](guides/textarea.md) - многострочное текстовое поле
- [Time](guides/time.md) - селекторы для задания дат начала и окончания задачи
- [Duration](guides/duration.md) - селекторы для задания даты начала задачи и длительности в днях
- [Select](guides/select.md) - выпадающий список
- [Typeselect](guides/typeselect.md) - выпадающий список для смены типа задачи
- [Parent](guides/parent.md) - выпадающий список для выбора родительской задачи
- [Template](guides/template.md) - контейнер для отображения пользовательского HTML-контента
- [Checkbox](guides/checkbox.md) - чекбокс для включения или выключения опций
- [Radio button](guides/radio.md) - переключатели для выбора одного варианта из набора
- [Resources](guides/resources.md) - сложный элемент управления для назначения нескольких ресурсов задаче
- [Constraint](guides/constraint.md) - сложный элемент управления для задания ограничений задачи
- [Baselines](guides/baseline.md) - сложный элемент управления для управления базовыми планами задачи

~~~js
var opts = [
    { key: 1, label: 'High' },
    { key: 2, label: 'Normal' },
    { key: 3, label: 'Low' }
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority",      height:22, map_to:"priority", type:"select", options:opts},
    {name:"time",          height:72, map_to:"auto", type:"duration"}
];
~~~

