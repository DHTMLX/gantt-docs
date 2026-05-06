---
title: "Управление длительностью"
sidebar_label: "Управление длительностью"
---

# Управление длительностью

Набор селекторов для установки длительности задачи путем указания даты начала задачи и количества дней.

![duration_control](/img/duration_control.png)

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"} /*!*/
];
~~~

[Начальная инициализация](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


## Инициализация

По умолчанию в lightbox добавлен один контроль **duration**. Чтобы добавить ещё один, выполните ниже приведённые шаги:

1) Добавьте секцию в конфигурацию lightbox:

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea",focus:true},
    {name:"time2",       height:72, map_to:"auto", type:"duration"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

2) Установите метку для секции:

~~~js
gantt.locale.labels.section_time2 = "Actual duration";
~~~


## Свойства

Следующие свойства в большей части важны и обычно задаются для управления **time** (см. полный список [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя секции
- **height** - (*number*) высота секции
- **map_to** - (*string,object*) "auto" или объект, определяющий свойства данных, которые будут сопоставлены секции
- **formatter** - (object) экземпляр объекта [durationFormatter](guides/working-time.md#taskdurationindecimalformat)
- **type** - (*string*) тип [контрола секции](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) если установлен в *true*, секция получит фокус при открытии lightbox
- **readonly** - (*boolean*) если задать значение *true*, секция будет только для чтения
- **year_range** - (*array,number*) задаёт диапазон для селектора года. Диапазон можно задать двумя способами:
    - *year_range: [2005, 2025]* - период с 2005 по 2025 год
    - *year_range: 10*  - период [текущий год - 10 лет; текущий год + 10 лет]
- **single_date** - (*boolean*) если установить значение *true*, в секции будет отображаться только селектор *start_date*. Отредактированные задачи будут описываться только по дате начала и иметь нулевую длительность. Это имеет смысл только для [вех](guides/task-types.md#milestones)
- **time_format** - (*string*) задаёт порядок селекторов даты и времени


## Конфигурация селекторов даты-времени

Чтобы настроить селекторы в разделе "Time period", используйте свойство [time_format](api/config/lightbox.md) (см. [Спецификация формата даты](guides/date-format.md)):

**Добавление селектора времени в раздел 'Time period'**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"duration",map_to:"auto",time_format:["%d","%m","%Y","%H:%i"]}/*!*/
];
~~~


Обратите внимание: допустимые элементы массива [time_format](api/config/lightbox.md) следующие:

- *"%d"* - селектор дня
- *"%m"* - селектор месяца
- *"%Y"* - селектор года
- *"%H:%i"* - селектор времени (формат задаётся шаблоном [time_picker](api/template/time_picker.md))

Можно изменить лишь порядок и количество этих элементов в массиве, но не формат отображения данных.

Например, можно изменить формат как в примерах ниже:

~~~js
// время идёт первым
time_format:["%H:%i", "%m", "%d", "%Y"] 
// месяц идёт первым
time_format:["%m","%d", "%Y", "%H:%i"]
// селектор года удалён
time_format:["%H:%i", "%m", "%d"]
// неверно
time_format:["%H:%i", "%M", "%d", "%Y"] //"%m" изменён на "%M"
~~~


## Сопоставление с пользовательскими start/end date-time свойствами

### По умолчанию сопоставление

Как правило, контролы time и duration сопоставляются обязательным свойствам данных start_date и end_date, устанавливая свойство **map_to** в значение "auto" (**map_to:"auto"**).

### Пользовательское сопоставление

Чтобы сопоставить контролы с пользовательскими свойствами дат (вместо 'start_date', 'end_date'), используйте объектную нотацию свойства **map_to**:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 72, type: "textarea", map_to:"text", focus: true},
    {name: "time",           height: 72, type: "duration", map_to:"auto"},
    {name: "baseline",    height: 72, type: "duration", /*!*/
     map_to:{start_date:"planned_start",end_date:"planned_end"}} /*!*/
];
~~~


[Отображение базовых линий](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


Как объект, у **map_to** есть 3 свойства: 

1. **start_date**- имя свойства данных, в котором будет храниться дата начала, установленная во вводе
2. **end_date** - необязательное, имя свойства данных, которое будет хранить дату окончания, установленную во вводе 
3. **duration** - необязательное, имя свойства данных, которое будет хранить длительность, определённую во вводе

:::note
Если какое-либо свойство не указано, управление принимает значение соответствующего обязательного свойства даты.
:::

## Переключение видимости секции

Можно управлять видимостью секции длительности, если указать **type:"duration_optional"** и **button: true** при настройке секции для lightbox:

~~~js
gantt.config.lightbox.sections = [
  {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
  {name: "time", map_to: "auto", button: true, type: "duration_optional"} /*!*/
];
~~~

и задать подписи для двух состояний кнопки:

~~~js
gantt.locale.labels.time_enable_button = 'Schedule';
gantt.locale.labels.time_disable_button = 'Unschedule';
~~~

Переключатель, позволяющий изменять видимость секции, будет появляться рядом с секцией. Если секция видимая, поведение будет таким же, как если бы указан **type:"duration"**.

![duration_optional](/img/duration_optional.png)

Если отключить кнопку, секция станет невидимой, но ничего не произойдёт. После нажатия кнопки «Сохранить» значения свойств задачи, сопоставленных с контролем длительности через свойство **map_to** секции, станут равны `null`.

~~~js
gantt.getTask(1);

// return value
{
    id: '1', text: 'Task #1', unscheduled: true, 
    duration: 0, parent: '10',
    end_date: null, start_date: null,
    ...
}
~~~

Эта функциональность может быть полезна, если вам нужно сделать задачу несостоявшейся или определить задачи, для которых базовые линии не должны отображаться на странице прямо из UI. Ознакомьтесь с соответствующими примерами:

Связанный пример [Несостоявшиеся задачи](https://snippet.dhtmlx.com/5/81f51a96d)

Связанный пример [Базовые линии](https://snippet.dhtmlx.com/6qvjoa7i)