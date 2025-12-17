---
sidebar_label: lightbox
title: lightbox config
description: "определяет объект lightbox"
---

# lightbox

### Description

@short: Определяет объект lightbox

@signature: lightbox: LightboxSections

### Example

~~~jsx
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name:"priority", height:22, map_to:"priority",type:"select",options:opts},                                                                        
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.init("gantt_here");
~~~

### Details

Объект lightbox включает одно основное свойство:

- **sections** - (*array*) - определяет секции внутри lightbox

~~~js
// стандартное определение lightbox   
gantt.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

Каждый объект внутри массива **sections** может иметь разные свойства в зависимости от [типа секции](guides/default-edit-form.md#lightboxstructure):

#### Общие для всех секций

- **name** - (*string*) - идентификатор секции (используется dhtmlxGantt для получения label из коллекции *locale.labels*). Например, секция **time** будет использовать label из **gantt.locale.labels.section_time**.
- **map_to** - (*string*) - имя свойства данных, к которому привязана секция.
- **type** - (*string*) - [тип контрола](guides/default-edit-form.md#lightboxcontrols), используемый в секции.
- **height?** - (*number*) - опционально, задаёт высоту секции. Это свойство не применяется к секциям типа [checkbox](guides/checkbox.md) и [radio](guides/radio.md).
- **focus?** - (*boolean*) - опционально, если true, секция получает фокус при открытии lightbox.
- **formatter?** - (*DurationFormatter | LinkFormatter*) - опционально, задаёт форматтер для секции.

#### Контролы времени и длительности

- **readonly?** - (*boolean*) - опционально, если true, секция становится доступной только для чтения.
- **year_range?** - (*number | number[]*) - опционально, определяет диапазон для селектора года. Может быть задано двумя способами: 
    - *year_range: [2005, 2025]* - выбираются годы с 2005 по 2025.
    - *year_range: 10* - выбирается диапазон от 10 лет до текущего года и 10 лет после.
- **single_date?** - (*boolean*) - опционально, если true, отображается только селектор 'start Date'. Отредактированные задачи будут иметь только дату начала с нулевой длительностью. Это полезно в основном для [milestones](guides/task-types.md#milestones).
- **time_format?** - (*string[]*) - опционально, определяет порядок селекторов даты и времени.
- **autofix_end?** - (*boolean*) - опционально, контролирует автоматическую корректировку даты окончания, если дата начала установлена позже. Включено по умолчанию. Отключение позволяет ручную валидацию, но без неё задачи могут получить нулевую длительность, если дата начала позже даты окончания.

#### Контрол Select

- **onchange? (*e*): any** - опционально, задаёт обработчик события 'onChange' для контрола секции.
    - **_e_** - (*Event*) - нативный объект события.

#### Контролы Select, Checkbox, Radio и Resources

- **options?** - (*object[]*) - опционально, список опций для контрола. Каждый объект в массиве представляет опцию с такими свойствами:
    - **_key_** - (*number | string*) - идентификатор опции, используется для сопоставления со свойством данных задачи.
    - **_label_** - (*string*) - отображаемая метка опции.
    - **_unit?_** - (*string | number*) - опционально, единица измерения для ресурсов (используется в контроле Resources).
- **default_value?** - (*any*) - опционально, значение по умолчанию, если входное значение undefined. Для контроля Resources применяется, если значение ресурса undefined.

#### Контрол Parent

- **allow_root?** - (*boolean*) - опционально, если true, добавляется дополнительная опция для выбора корневого уровня в качестве родительской задачи. Работает вместе со свойством **root_label**.
- **root_label?** - (*string*) - опционально, задаёт метку для опции корневого уровня. Используется вместе с **allow_root**.
- **sort? (task1, task2): number** - опционально, задаёт функцию сортировки для опций select.
    - **_task1_** - (*Task*) - первый объект задачи для сравнения.
    - **_task2_** - (*Task*) - второй объект задачи для сравнения.
- **filter? (id, task): boolean** - опционально, задаёт функцию фильтрации для опций select, получает id задачи и объект задачи.
    - **_id_** - (*string | number*) - ID задачи.
    - **_task_** - (*Task*) - объект задачи.
- **template? (start_date, end_date, task): string|number** - опционально, задаёт шаблон для опций select.
    - **_start_date_** - (*Date | number*) - дата начала задачи.
    - **_end_date_** - (*Date | number*) - дата окончания задачи.
    - **_task_** - (*Task*) - объект задачи.

#### Контрол Typeselect

- **filter** - (*function*) - задаёт функцию фильтрации для типов задач, получает имя типа в качестве параметра.

### Related API
- [wide_form](api/config/wide_form.md)

### Related Guides
- - [Textarea Control](guides/textarea.md)
- - [Управление длительностью](guides/duration.md)
- - [Контрол 'Время'](guides/time.md)
- - [Select Control](guides/select.md)
- - [Типовой контрол](guides/typeselect.md)
- - [Родительский контрол](guides/parent.md)
- - [Контрол Template](guides/template.md)
- - [Контрол Checkbox](guides/checkbox.md)
- - [Переключатель (Radio Button)](guides/radio.md)
- - [Настройка элементов Lightbox](guides/default-edit-form.md)
- - [Работа с элементами Lightbox](guides/lightbox-manipulations.md)
- - [Создание пользовательского элемента](guides/custom-editor.md)
- - [Кастомный Lightbox](guides/custom-edit-form.md)
- - [Изменение кнопок в Lightbox](guides/custom-button.md)

### Change log
- Когда [gantt.config.csp](api/config/csp.md) установлен в *true* или если Gantt работает в среде Salesforce, lightbox рендерится внутри контейнера Gantt, начиная с версии 7.1.13

