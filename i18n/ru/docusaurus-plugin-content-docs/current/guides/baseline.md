---
title: "Контроль базовых планов"
sidebar_label: "Контроль базовых планов"
---

# Контроль базовых планов

:::info
Эта функция доступна только в редакции PRO.
:::

Это набор селекторов, предназначенных для установки [базовых планов](guides/inbuilt-baselines.md) задачи путем задания её даты начала и длительности в днях.

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "time", type: "duration", map_to: "auto" },
    { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


## Инициализация

Чтобы добавить элемент управления **baselines** в lightbox, выполните следующие шаги:

1) Добавьте секцию в конфигурацию lightbox:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"baselines", type:"baselines" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~
  
2) Задайте метку для этой секции:

~~~js
gantt.locale.labels.section_baselines = "Baselines";
~~~

## Свойства

Ниже приведены основные свойства, которые часто используются с элементом управления **baselines** (полный список смотрите [здесь](api/config/lightbox.md)):

- **name** - (*string*) идентификатор секции 
- **height** - (*number*) высота секции
- **map_to** - (*string*) должно быть установлено в "baselines"
- **formatter** - (object) экземпляр объекта [durationFormatter](guides/working-time.md#taskdurationindecimalformat)
- **type** - (*string*) тип [элемента управления секцией](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) если true, эта секция будет в фокусе при открытии lightbox
- **readonly** - (*boolean*) если true, секция будет только для чтения
- **year_range** - (*array,number*) определяет диапазон для выбора года. Можно задать двумя способами: 
    - *year_range: [2005, 2025]* - с 2005 по 2025 год 
    - *year_range: 10*  - от (текущий год - 10) до (текущий год + 10)
- **single_date** - (*boolean*) если true, будет отображаться только селектор *start Date*. Задачи, отредактированные таким образом, будут иметь нулевую длительность, что полезно в основном для [вех](guides/task-types.md#milestones)
- **time_format** - (*string*) задаёт порядок селекторов даты и времени

## Локализация

Вы можете настроить метки для следующих частей элемента управления **baselines**:

- **gantt.locale.labels.baselines_section_placeholder** - текст, отображаемый, когда базовые планы не добавлены
- **gantt.locale.labels.baselines_remove_button** - подпись для кнопки удаления базового плана (по умолчанию: *"Remove"*)
- **gantt.locale.labels.baselines_add_button** - подпись для кнопки добавления нового базового плана (по умолчанию: *"Add Baseline"*)
- **gantt.locale.labels.baselines_remove_all_button** - подпись для кнопки удаления всех базовых планов (по умолчанию: *"Remove All"*)

