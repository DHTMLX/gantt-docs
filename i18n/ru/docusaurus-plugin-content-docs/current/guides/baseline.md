---
title: "Контроль базовых линий"
sidebar_label: "Контроль базовых линий"
---

# Контроль базовых линий

:::info
Эта функциональность доступна только в PRO-версии.
:::

Набор селекторов для настройки [baselines] для задачи путём указания даты начала задачи и количества дней.

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "time", type: "duration", map_to: "auto" },
    { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~


[Показать базовые линии](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


## Инициализация

Чтобы добавить управление **baselines** к lightbox, выполните следующие шаги:

1) Добавьте секцию в конфигурацию lightbox:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"baselines", type:"baselines" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~
  
2) Установите подпись для секции:

~~~js
gantt.locale.labels.section_baselines = "Базовые линии";
~~~

## Свойства

Следующие свойства в большинстве случаев являются наиболее важными и часто используются для **baselines** (см. полный список [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя секции
- **height** - (*number*) высота секции
- **map_to** - (*string*) установите значение в "baselines"
- **formatter** - (object) экземпляр объекта [durationFormatter](guides/working-time.md#taskdurationindecimalformat)
- **type** - (*string*) тип [контроля секции](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) если установлен в *true*, секция получит фокус при открытии lightbox
- **readonly** - (*boolean*) если установить значение "true", секция будет доступна только для чтения
- **year_range** - (*array,number*) задаёт диапазон для выбора года. Диапазон можно задать двумя способами: 
    - *year_range: [2005, 2025]* - период с 2005 по 2025
    - *year_range: 10*  - период [текущий год - 10 лет; текущий год + 10 лет]
- **single_date** - (*boolean*) если значение "true" установлено, в секции будет представлен только селектор даты начала. 
Редактируемые задачи будут задаваться только по дате начала и будут иметь нулевую продолжительность. Имеет смысл только для [вех](guides/task-types.md#milestones)
- **time_format** - (*string*) устанавливает порядок селекторов даты и времени

## Локализация

Вы можете локализовать подписи следующих элементов контроля **baselines**:

- **gantt.locale.labels.baselines_section_placeholder** - текст, отображаемый, когда базовых линий нет
- **gantt.locale.labels.baselines_remove_button** - текст кнопки удаления базовой линии (*"Remove"*, по умолчанию)
- **gantt.locale.labels.baselines_add_button** - текст кнопки добавления новой базовой линии (*"Add Baseline"*, по умолчанию)
- **gantt.locale.labels.baselines_remove_all_button** - текст кнопки удаления всех базовых линий (*"Remove All"*, по умолчанию)