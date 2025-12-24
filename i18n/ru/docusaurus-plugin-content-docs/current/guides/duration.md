---
title: "Управление длительностью"
sidebar_label: "Управление длительностью"
---

# Управление длительностью


В этом разделе представлен набор селекторов, предназначенных для задания длительности задачи путем указания её даты начала и количества дней.

![duration_control](/img/duration_control.png)

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"} /*!*/
];
~~~


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


## Инициализация


По умолчанию в lightbox присутствует один элемент управления **duration**. Чтобы добавить дополнительные, выполните следующие шаги:

1) Добавьте новый раздел в конфигурацию lightbox:

~~~js
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea",focus:true},
    {name:"time2",       height:72, map_to:"auto", type:"duration"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~
  
2) Задайте метку для нового раздела:

~~~js
gantt.locale.labels.section_time2 = "Фактическая длительность";
~~~


## Свойства


Ниже приведены основные свойства, которые обычно используются с элементом управления **time** (полный список см. [здесь](api/config/lightbox.md)):

- **name** - (*string*) идентификатор раздела
- **height** - (*number*) высота раздела
- **map_to** - (*string,object*) либо "auto", либо объект, указывающий свойство(-а) данных, сопоставленных с разделом
- **formatter** - (object) экземпляр [durationFormatter](guides/working-time.md#taskdurationindecimalformat)
- **type** - (*string*) тип [элемента управления разделом](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) если установлено в *true*, раздел получает фокус при открытии lightbox
- **readonly** - (*boolean*) если установлено в *true*, раздел становится только для чтения
- **year_range** - (*array,number*) определяет диапазон выбора года, который может быть:
    - *year_range: [2005, 2025]* - с 2005 по 2025 год
    - *year_range: 10*  - от текущего года минус 10 до текущего года плюс 10
- **single_date** - (*boolean*) если установлено в *true*, отображается только селектор *start Date*. Редактируемые задачи будут определяться только датой начала и иметь нулевую длительность. Это полезно в основном для [вех](guides/task-types.md#milestones)
- **time_format** - (*string*) определяет порядок селекторов даты и времени

  

## Настройка селекторов даты и времени


Селекторы в разделе "Период времени" можно настроить с помощью свойства [time_format](api/config/lightbox.md) (см. также [Спецификация формата даты](guides/date-format.md)):

**Добавление селектора времени в раздел 'Период времени'**
~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"duration",map_to:"auto",time_format:["%d","%m","%Y","%H:%i"]}/*!*/
];
~~~

Допустимые элементы массива [time_format](api/config/lightbox.md):

- *"%d"* - селектор дня 
- *"%m"* - селектор месяца
- *"%Y"* - селектор года
- *"%H:%i"* - селектор времени (формат определяется шаблоном [time_picker](api/template/time_picker.md)) 

Вы можете изменить порядок или исключить некоторые элементы из массива, однако сам формат данных изменить нельзя.

 Например, возможны такие варианты:

~~~js
// сначала время
time_format:["%H:%i", "%m", "%d", "%Y"] 
// сначала месяц
time_format:["%m","%d", "%Y", "%H:%i"]
// селектор года не используется
time_format:["%H:%i", "%m", "%d"]
// некорректное использование
time_format:["%H:%i", "%M", "%d", "%Y"] // "%m" заменено на "%M"
~~~

## Сопоставление с пользовательскими свойствами даты начала/окончания


### Сопоставление по умолчанию

Обычно элементы управления временем и длительностью связаны с обязательными свойствами 'start_date' и 'end_date' с помощью **map_to** со значением "auto" (**map_to:"auto"**).

### Пользовательское сопоставление

Чтобы связать элементы управления с пользовательскими свойствами дат вместо 'start_date' и 'end_date', используйте объект для свойства **map_to**:

~~~js
gantt.config.lightbox.sections = [
    {name: "description", height: 72, type: "textarea", map_to:"text", focus: true},
    {name: "time",           height: 72, type: "duration", map_to:"auto"},
    {name: "baseline",    height: 72, type: "duration", /*!*/
     map_to:{start_date:"planned_start",end_date:"planned_end"}} /*!*/
];
~~~


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


Объект **map_to** поддерживает следующие свойства: 

1. **start_date** - свойство данных, в котором хранится дата начала из ввода
2. **end_date** - необязательно, свойство данных, в котором хранится дата окончания из ввода 
3. **duration** - необязательно, свойство данных, в котором хранится длительность, определенная во вводе 

:::note
Если свойство не указано, элемент управления по умолчанию использует связанное обязательное свойство даты.
:::


## Переключение видимости раздела


Вы можете переключать видимость раздела длительности, установив **type:"duration_optional"** и **button: true** в конфигурации раздела lightbox:

~~~js
gantt.config.lightbox.sections = [
  {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
  {name: "time", map_to: "auto", button: true, type: "duration_optional"} /*!*/
];
~~~

Также определите метки для двух состояний кнопки-переключателя:

~~~js
gantt.locale.labels.time_enable_button = 'Запланировать';
gantt.locale.labels.time_disable_button = 'Снять с планирования';
~~~

Рядом с разделом появится кнопка-переключатель, позволяющая управлять его видимостью. При видимости раздел ведет себя как обычный с **type:"duration"**.

![](/img/duration_optional.png)

Если выключить кнопку, раздел исчезнет без немедленного эффекта. После сохранения свойства задачи, сопоставленные с контролом длительности через **map_to**, будут установлены в `null`.

~~~js
gantt.getTask(1);

// пример возвращаемого значения
{
    id: '1', text: 'Task #1', unscheduled: true, 
    duration: 0, parent: '10',
    end_date: null, start_date: null,
    ...
}
~~~

Эта возможность полезна для пометки задач как незапланированных или для управления задачами без базовых дат прямо из интерфейса. См. соответствующие примеры:


**Related example:** [Unscheduled tasks](https://snippet.dhtmlx.com/5/81f51a96d)


**Related example:** [Baselines](https://snippet.dhtmlx.com/6qvjoa7i)

