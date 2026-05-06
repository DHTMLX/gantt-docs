---
sidebar_label: lightbox
title: конфигурация lightbox
description: "задает объект lightbox"
---

# lightbox

### Description

@short: Определяет объект lightbox

@signature: lightbox: LightboxSections

### Example

~~~jsx
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "priority", height: 22, map_to: "priority", type: "select", options: opts },
    { name: "time", height: 72, type: "duration", map_to: "auto" }
];

gantt.init("gantt_here");
~~~

### Details

Объект lightbox имеет 1 свойство:

- **sections** - (*array*) - задаёт секции lightbox

~~~js
// default lightbox definition
gantt.config.lightbox.sections = [
    { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
    { name: "time", height: 72, map_to: "auto", type: "duration" }
];
~~~

Объекты в массиве **sections** могут иметь следующие свойства, в зависимости от типа секции (см. [тип секции](guides/default-edit-form.md#lightbox-structure)):

#### Common for all sections

- **name** - (*string*) - имя секции. dhtmlxGantt возьмёт метку секции из коллекции *locale.labels* в соответствии с этим именем. Например, для секции **time** dhtmlxGantt возьмёт метку, хранящуюся как **gantt.locale.labels.section_time**. Если для секции указано свойство **label**, метка секции будет взята из него вместо локали. <br>Свойство **name** также можно использовать для получения объекта управления через метод [](api/method/getlightboxsection.md).
- **map_to** - (*string*) - название свойства данных, которое будет сопоставлено секции.
- **type** - (*string*) - [тип элемента управления секцией](guides/default-edit-form.md#lightboxcontrols) (редактор).
- **label** - (*string*) - метка секции.
- **height?** - (*number*) - необязательно, высота секции. Не используется с секциями [checkbox] и [radio].
- **focus?** - (*boolean*) - необязательно, если установлено значение *true*, секция получит фокус при открытии lightbox
- **formatter?** - (*DurationFormatter | LinkFormatter*) - необязательно, форматтер для секции

#### Time and Duration controls

- **readonly?** - (*boolean*) - необязательно, если установлено значение *true*, секция будет доступна только для чтения
- **year_range?** - (*number | number[]*) - необязательно, задаёт диапазон для выбора года. Может быть задан двумя способами:
    - *year_range: [2005, 2025]* - период с 2005 по 2025 год
    - *year_range: 10*  - период [текущий год - 10 лет; текущий год + 10 лет]
- **single_date?** - (*boolean*) - необязательно, если установить значение *true*, в секции будет представлен только выбор даты начала. Отредактированные задачи будут указаны только датой начала и иметь нулевую продолжительность. Имеет смысл только для [milestones].
- **time_format?** - (*string[]*) - необязательно, задаёт порядок селекторов даты и времени
- **autofix_end?** - (*boolean*) - необязательно, определяет, будет ли конечная дата автоматически исправляться, если выбранная дата начала больше даты конца, по умолчанию true. Отключённый режим позволяет валидировать даты, но если включить режим и не валидировать даты, можно получить задачи с нулевой продолжительностью, когда *start_date* больше *end_date*.

#### Select control

- **onchange? (*e*): any** - необязательно, задаёт функцию обработчика события изменения (onChange) для элемента управления секции
    - **_e_** - (*Event*) - нативный объект события.

#### Select, Checkbox, Radio and Resources controls

- **options?** - (*object[]*) - необязательно, определяет варианты выбора элемента управления. Каждый объект в массиве задаёт один вариант и имеет следующие свойства:
    - **_key_** - (*number | string*) - идентификатор варианта. Это свойство сравнивается со свойством данных задачи для привязки вариантов к задачам
    - **_label_** - (*string*) - метка варианта
    - **_unit?_** - (*string | number*) - необязательно, единица измерения ресурса (для элемента управления Resources)
- **default_value?** - (*any*) - необязательно, значение по умолчанию для элемента управления секции. Применяется только если входное значение не определено. Для элемента управления Resources применяется, если значение ресурса не определено.

#### Resource Assignments control

- **config** - (*object*) конфигурация грида ресурсов в lightbox для отображения нужных колонок
- **templates** - (*object*) шаблоны для грида ресурсов в lightbox
- **resource_default_assignment** - (*object*) конфигурационный объект назначения по умолчанию (который будет добавлен кнопкой "Add Assignment")
    - **start_date** - (*Date | string | null*) дата начала назначения
    - **end_date** - (*Date | string | null*) дата завершения назначения
    - **value** - (*number | string*) количество ресурса, назначенного задаче
    - **duration** - (*number | null*) продолжительность назначения
    - **mode** - (*string*) режим расчета времени назначения ресурса: "default" | "fixedDates" | "fixedDuration"

#### Parent control

- **allow_root?** - (*boolean*) - необязательно, если установить значение "true", в списке опций будет дополнительный пункт, который позволит установить корневой уровень как родителя для задач. Используется вместе со свойством **root_label**
- **root_label?** - (*string*) - необязательно, задаёт метку для корневого уровня родителя. Используется вместе со свойством **allow_root**
- **sort? (task1, task2): number** - необязательно, задаёт функцию сортировки для вариантов выбора
    - **_task1_** - (*Task*) - объект первой задачи, по которому будет выполняться сортировка
    - **_task2_** - (*Task*) - объект второй задачи, по которому будет выполняться сортировка
- **filter? (id, task): boolean** - необязательно, задаёт функцию фильтрации для вариантов выбора. Принимает id задачи и объект задачи в качестве параметров
    - **_id_** - (*string | number*) - ID объекта задачи
    - **_task_** - (*Task*) - Объект задачи
- **template? (start_date, end_date, task): string|number** - необязательно, задаёт шаблон для вариантов выбора
    - **_start_date_** - (*Date | number*) - дата начала задачи
    - **_end_date_** - (*Date | number*) - дата окончания задачи
    - **_task_** - (*Task*) - задача

#### Typeselect control

- **filter** - (*function*) - задаёт функцию фильтрации по типам задач. Принимает имя типа в качестве параметра

### Related API
- [wide_form](api/config/wide_form.md)

### Related Guides
- [Textarea Control]
- [Duration Control]
- [Time Control]
- [Select Control]
- [Typeselect Control]
- [Parent Control]
- [Template Control]
- [Checkbox Control]
- [Radio Button Control]
- [Configuring Lightbox Elements]
- [Working with Lightbox Elements]
- [Creating Custom Element]
- [Custom Lightbox]
- [Changing Buttons in the Lightbox]

### Change log
- If either [gantt.config.csp](api/config/csp.md) is set to *true* or Gantt works in the Salesforce environment, the lightbox will be rendered inside the Gantt container (from v7.1.13)