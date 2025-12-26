---
title: "Контрол 'Время'"
sidebar_label: "Контрол 'Время'"
---

# Контрол "Время"

Этот контрол предоставляет два селектора для установки длительности задачи путём задания её даты начала и окончания.

![time_control](/img/time_control.png)

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"time"} /*!*/
];
~~~


[Time control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/07_time.html)


## Инициализация

Чтобы добавить контрол **time** в lightbox, выполните следующие действия:

1) Добавьте секцию в конфигурацию lightbox:

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea",focus:true},
    {name:"period",      height:72, map_to:"auto", type:"time"}, /*!*/
];
~~~

2) Задайте метку для секции:

~~~js
gantt.locale.labels.section_period = "Time period";
~~~


## Свойства

Ниже приведены основные свойства, часто используемые с контролом 'time' (полный список смотрите [здесь](api/config/lightbox.md)):

- **name** - (*string*) имя секции 
- **height** - (*number*) высота секции
- **map_to** - (*string,object*) либо "auto", либо объект, указывающий свойство(-ва) данных, связанные с секцией
- **type** - (*string*) тип [контрола секции](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) если установлено в *true*, секция получит фокус при открытии lightbox
- **readonly** - (*boolean*) если установлено в *true*, секция становится только для чтения
- **year_range** - (*array,number*) определяет диапазон селектора года. Может быть задано двумя способами: 
    - *year_range: [2005, 2025]* - с 2005 по 2025 год
    - *year_range: 10*  - от (текущий год - 10) до (текущий год + 10)
- **single_date** - (*boolean*) если установлено в *true*, отображается только селектор *start Date*. Редактируемые задачи будут иметь только дату начала и нулевую длительность, что полезно для [milestones](guides/task-types.md#milestones)
- **time_format** - (*string*) управляет порядком селекторов даты и времени
- **autofix_end** - (*boolean*) определяет, будет ли дата окончания автоматически корректироваться, если дата начала превышает её. По умолчанию *true*. Отключение этой опции позволяет валидировать даты, но если она включена без валидации, задачи могут иметь нулевую длительность, если *start_date* позже *end_date*.
 
## Настройка селекторов даты и времени 

Чтобы настроить селекторы в секции "duration" или "time", используйте свойство [time_format](api/config/lightbox.md) (см. [Спецификация формата даты](guides/date-format.md)):

**Добавление селектора времени в секцию 'Time period'**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"time", map_to:"auto", time_format:["%d","%m","%Y","%H:%i"]}/*!*/
];
~~~

Допустимые элементы массива [time_format](api/config/lightbox.md):

- *"%d"* - селектор дня 
- *"%m"* - селектор месяца
- *"%Y"* - селектор года
- *"%H:%i"* - селектор времени (форматируется по шаблону [time_picker](api/template/time_picker.md)) 

Вы можете изменить порядок или опустить эти элементы в массиве, но не менять сам формат.

 Например:

~~~js
// сначала время
time_format:["%H:%i", "%m", "%d", "%Y"] 
// сначала месяц
time_format:["%m","%d", "%Y", "%H:%i"]
// без селектора года
time_format:["%H:%i", "%m", "%d"]
// некорректный пример
time_format:["%H:%i", "%M", "%d", "%Y"] // "%m" заменено на "%M"
~~~


## Связывание с пользовательскими свойствами даты/времени начала и окончания

### Стандартное связывание

По умолчанию, контролы времени и длительности связываются с обязательными свойствами 'start_date' и 'end_date' при установке **map_to** в "auto" (**map_to:"auto"**).

### Пользовательское связывание

Чтобы связать контролы с пользовательскими свойствами даты вместо 'start_date' и 'end_date', используйте объект для **map_to**:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 72, type: "textarea", map_to:"text", focus: true},
    {name: "time",           height: 72, type: "duration", map_to:"auto"},
    {name: "deadline",    height: 72, type: "time", /*!*/
     map_to:{start_date:"planned_start",end_date:"planned_end"}} /*!*/
];
~~~


[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


Объектная форма **map_to** поддерживает:

1. **start_date** - свойство данных, в которое записывается дата начала из ввода
2. **end_date** - (необязательно) свойство данных, в которое записывается дата окончания из ввода 
3. **duration** - (необязательно) свойство данных, в которое записывается длительность из ввода 

:::note
Если свойство не указано, контрол использует соответствующее обязательное свойство даты.
:::


## Переключение видимости секции

Вы можете управлять видимостью секции времени, установив **type:"time_optional"** и **button: true** в конфигурации секции lightbox:

~~~js
gantt.config.lightbox.sections = [
  {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
  {name: "time", map_to: "auto", button: true, type: "time_optional"} /*!*/
];
~~~

Также задайте метки для состояний кнопки-переключателя:

~~~js
gantt.locale.labels.time_enable_button = 'Schedule';
gantt.locale.labels.time_disable_button = 'Unschedule';
~~~

Рядом с секцией появится кнопка-переключатель, позволяющая показывать или скрывать её. При отображении она ведёт себя как **type:"time"**.

![](/img/time_optional.png)

Если кнопка отключена, секция скрывается, но никаких изменений сразу не происходит. После нажатия "Save" свойства задачи, связанные с контролом времени через **map_to**, будут установлены в `null`.

~~~js
gantt.getTask(1);

// возвращаемое значение
{
    id: '1', text: 'Task #1', unscheduled: true, 
    duration: 0, parent: '10',
    end_date: null, start_date: null,
    ...
}
~~~

Эта возможность полезна для пометки задач как незапланированных. Смотрите соответствующий пример:


**Related example:** [Unscheduled tasks](https://snippet.dhtmlx.com/5/81f51a96d)

