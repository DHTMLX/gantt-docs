---
title: "Экспорт и импорт из MS Project" 
sidebar_label: "MS Project" 
--- 

# Экспорт и импорт из MS Project

Библиотека dhtmlxGantt позволяет экспортировать данные из диаграммы Gantt в MS Project. Также можно импортировать данные в Gantt из MS Project.

:::note
Онлайн-сервис экспорта бесплатный. Условия лицензии см. в разделе [Лицензия и водяной знак](guides/export-common.md#license-and-watermark).
:::

Существуют несколько сервисов экспорта. Их можно устанавливать на ваш компьютер и экспортировать диаграмму Gantt в MS Project локально.
Обратите внимание, что сервисы экспорта не включены в пакет Gantt, 
прочитайте [соответствующую статью](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml), чтобы узнать условия использования каждого из них.

:::info
Если вам нужен готовый инструмент, попробуйте GanttPRO - [программное обеспечение для управления проектами с диаграммой Ганта](https://ganttpro.com/), которое использует наш компонент Gantt.
:::

## Ограничения онлайн-сервиса экспорта

:::note
У онлайн-сервиса экспорта есть ограничения по времени и размеру запроса. См. [Ограничения онлайн-сервиса экспорта](guides/export-common.md#service-limits).
:::

## Использование экспортных модулей

Чтобы экспортировать большие диаграммы, экспортировать без ограничений онлайн-сервиса экспорта или хранить данные в своей сети, установите [модуль экспорта](guides/export-modules.md) на собственный сервер. Подробнее об использовании [модуля экспорта для MS Project и Primavera P6](guides/msp-export-module.md).

## Экспорт в MS Project {#export-to-ms-project}

Компонент Gantt позволяет экспортировать связи, задачи и ресурсы в MS Project.

Чтобы экспортировать данные из диаграммы Gantt в MS Project, выполните следующее:

- Чтобы использовать функциональность экспорта/импорта, включите плагин <b>export_api</b> через метод [plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    export_api: true
});
~~~

Он позволяет использовать либо онлайн-сервис экспорта, либо локальный модуль экспорта.

:::note
Если вы используете версию Gantt старше 8.0, вам нужно включить на странице `https://export.dhtmlx.com/gantt/api.js`, чтобы включить функциональность экспорта, например:

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Вызовите метод [exportToMSProject](api/method/exporttomsproject.md) для экспорта данных из диаграммы Gantt в MS Project.

~~~js
gantt.exportToMSProject();
~~~

Метод отправит запрос к удалённому сервису, который либо создаст XML-файл проекта, либо вернёт URL для загрузки сгенерированного файла.


**Связанный пример**: [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


### Настройки экспорта {#export-settings}

Метод **exportToMSProject()** принимает в качестве параметра объект с набором свойств (все свойства являются необязательными):

- **name** - (string) имя полученного файла ('gantt.xml' по умолчанию).

~~~js
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) задаёт режим планирования задач в экспортируемом проекте. **true** пометит задачи как автоматизированно запланированные, **false** пометит задачи как вручную запланированные (по умолчанию).

~~~js
gantt.exportToMSProject({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) указывает, будут ли удалены циклические связи (true — удалятся (режим по умолчанию), false — не удаляются).

~~~js
gantt.exportToMSProject({
    skip_circular_links: false
});
~~~

- **project** - (object) позволяет задать пользовательские свойства экспортируемого проекта

~~~js
gantt.exportToMSProject({
    project: {
        'Author': 'I am!',
        'MinutesPerDay': () => gantt.config.hours_per_day * 60
    }
});
~~~

Свойства этого объекта соответствуют соответствующим свойствам [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)).
Список поддерживаемых свойств можно найти [здесь](guides/msp-import-properties.md#project-properties). Свойства могут содержать фиксированные значения или функции, которые будут выполнены при вызове экспорта.

- **tasks** - (object) позволяет задать пользовательские свойства экспортируемых элементов задач

~~~js
gantt.exportToMSProject({
    tasks: {
        'StartVariance': (task) => {
            if (task.startVariance) {
                return task.startVariance;
            }

            return 0;
        },
        'PercentWorkComplete': (task) => task.progress + 0.1,
        'Custom': (task) => 'Custom value',
        'Custom 2': 'My Custom value'
    }
});
~~~

Свойства этого объекта соответствуют соответствующим свойствам [Task entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)), 
здесь приведён список поддерживаемых [properties](guides/msp-import-properties.md#task-properties).
Свойства могут содержать либо фиксированные значения, либо функции, которые будут вызываться для каждой задачи в наборе данных при вызове экспорта.

- **data** - (object) позволяет задать пользовательский источник данных, который будет представлен в выходной диаграмме Gantt

:::note
Ожидается, что свойства **start_date** и **end_date** будут указаны в формате, включающем дату и время.
:::

~~~js
const customData = {
    tasks: [
        { id: "10", text: "Project #5", start_date: "2027-04-01 00:00", duration: 3, parent: 0 },
        { id: "1", text: "Task #67", start_date: "2027-04-02 00:00", duration: 2, parent: "10" },
        { id: "2", text: "Task #89", start_date: "2027-04-01 00:00", duration: 2, parent: "10" }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: "1" }
    ]
};

gantt.exportToMSProject({
    data: customData
});
~~~

**Связанный пример**: [Gantt. Export custom data](https://snippet.dhtmlx.com/10ytgdxs)

- **callback** - (function) Если вы хотите получить URL для загрузки сгенерированного XML, свойство *callback* можно использовать. Оно получает JSON-объект с свойством *url*:

~~~js
gantt.exportToMSProject({
    callback: (response) => {
        alert(response.url);
    }
});
~~~

- **resources** - (array) позволяет экспортировать список ресурсов в файл MS Project

~~~js
gantt.exportToMSProject({
    resources: [
        { id: "1", name: "John", type: "work" },
        { id: "2", name: "Mike", type: "work" },
        { id: "3", name: "Anna", type: "work" }
    ]
});
~~~

Возможные типы ресурсов — "work", "cost", "material". Назначения ресурсов задаются с использованием свойства **ResourceAssignments** конфигурации задач:

~~~js {13}
const users = [// resources
    { key: '0', label: "N/A" },
    { key: '1', label: "John" },
    { key: '2', label: "Mike" },
    { key: '3', label: "Anna" }
];

gantt.exportToMSProject({
    resources: users
        .filter((user) => user.key !== '0') //skip the default option
        .map((user) => ({ id: user.key, name: user.label, type: "work" })),
    tasks: {
        ResourceAssignments: (task) => task.user
    }
});
~~~

Свойство **ResourceAssignments** задаётся как функция, которая принимает объект задачи в качестве параметра и возвращает либо строковое/числовое значение, либо массив значений строк/чисел:

~~~js
tasks: {
    ResourceAssignments: (task) => [task.user, task.office]
}
~~~

Возможна настройка параметра *units* для назначений ресурсов путём возврата следующего объекта в свойстве **ResourceAssignments**:

~~~js
{
    resource_id: "id",
    units: "units value"
}
~~~

- **resource calendars**

По умолчанию каждой задаче сопутствует некоторый календарь. Если используются календари ресурсов, необходимо указать -1 для задачи в свойстве
*CalendarUID* во время экспорта (в объекте [tasks](#export-settings)). Тогда задача будет использовать календарь ресурса.

Во время экспорта [resource calendars](api/config/resource_calendars.md) можно указать календарь ресурса внутри объекта массива [resources](#export-settings):

~~~js
gantt.exportToMSProject({
    resources: [
        {
            id: "10",
            name: "John",
            type: "work",
            calendar: gantt.config.resource_calendars[10]
        }
    ]
});
~~~

- **server** - (string) конечная точка API для запроса. Может использоваться с локальной установкой сервиса экспорта. Значение по умолчанию: `https://export.dhtmlx.com/gantt`.

~~~js
gantt.exportToMSProject({
    server: "https://myapp.com/myexport/gantt"
});
~~~

## Импорт из MS Project {#import-from-ms-project}

Чтобы конвертировать XML или MPP файл MS Project, нужно отправить следующий запрос к сервису экспорта:

 - URL запроса - `https://export.dhtmlx.com/gantt`
 - Метод запроса - **POST**
 - Content-Type - **multipart/form-data**

Параметры запроса:

 - **file** - файл MS Project в формате MPP или XML
 - **type** - "msproject-parse"
 - **data** - (*необязательно*) строка JSON с настройками

Например:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <button type="submit">Get</button>
</form>
~~~

Либо можно использовать клиентский API [`importFromMSProject()`](api/method/importfrommsproject.md), например так:

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: (project) => {
        if (project) {
            gantt.clearAll();
            if (project.config.duration_unit) {
                gantt.config.duration_unit = project.config.duration_unit;
            }
            gantt.parse(project.data);
        }
    }
});
~~~


**Связанный пример**: [Import MSP файла](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_mpp.html)


Где *file* — это экземпляр [File](https://developer.mozilla.org/en-US/docs/Web/API/File), который должен содержать либо XML, либо файл проекта MPP.

:::note
**gantt.importFromMSProject** требует поддержки HTML5 File API.
:::

### Ответ

Ответ будет содержать JSON следующей структуры:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {},
   calendars: []
}
~~~


- **data** - (*object*) gantt [data object](guides/supported-data-formats.md). У каждой задачи есть следующие свойства: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Даты приведены в строковом формате "%Y-%m-%d %H:%i". 
- **config** - (*object*) объект конфигурации [Gantt](api/overview/properties-overview.md) с настройками, полученными из файла проекта.
- **resources** - (*array*) массив объектов (каждый имеет свойства: (*id: string, name: string, type: string, calendar: string*) ), которые представляют список ресурсов из файла проекта.
- **worktime** - (*object*) объект, содержащий настройки рабочего времени из календаря проекта. Может содержать следующие атрибуты:
    - **id** - (*string | number*) необязательно, идентификатор календаря
    - **hours** - (*array*) массив глобальных рабочих часов, устанавливает начало и конец рабочего времени задачи
    - **dates** - (*array*) массив дат, который может содержать:
        - 7 дней недели (от 0 — воскресенье до 6 — суббота), где 1/true обозначает рабочий день, 0/false — нерабочий день
        - другие записи — даты 
- **calendars** - (*array*) массив конфигурационных объектов календарей для создания нового календаря. 
    - **calendarConfig** - (*object*) конфигурационный объект календаря, который может содержать следующие атрибуты:
        - **id** - (*string | number*) необязательно, идентификатор календаря
        - **name** - (*string*) имя календаря
        - **hours** - (*array*) массив глобальных рабочих часов, устанавливает начало и конец рабочего времени задач
        - **dates** - (*array*) массив дат, который может содержать:
            - 7 дней недели (от 0 — воскресенье до 6 — суббота), где 1/true обозначает рабочий день и 0/false — нерабочий день
            - другие записи — даты
  
### Настройки импорта {#import-settings}

#### Установка единицы продолжительности

Чтобы задать ожидаемую единицу продолжительности, строка **durationUnit** ("minute", "hour", "day", "week", "month", "year") также может быть отправлена на сервер.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data"
        value='{ "durationUnit": "hour" }' />
    <button type="submit">Get</button>
</form>
~~~

или

~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    callback: (project) => {}
});
~~~

#### Получение свойств проекта

Чтобы получить поля проекта, можно отправить на сервер входной параметр **projectProperties** с массивом необходимых полей.
Он извлекает произвольные свойства [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))
во входящую в выходной объект конфигурации (**config**). Ниже приведён список поддерживаемых [properties](guides/msp-import-properties.md#project-properties).

 - **projectProperties** - задаёт массив свойств проекта, которые должны попасть в ответ.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data"
        value='{ "projectProperties": ["Author", "Title"] }' />
    <button type="submit">Get</button>
</form>
~~~

или

~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    projectProperties: ["Author", "Title"],
    callback: (project) => {
        const projectConfig = project.config;
        alert(projectConfig.$custom_properties.Author);
    }
});
~~~

#### Получение свойств задач {#getting-tasks-properties}

Чтобы получить поля задач, можно отправить на сервер входной параметр **taskProperties** с массивом нужных полей.
Он извлекает произвольные свойства [Task entities](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)). Ниже приводён список поддерживаемых [properties](guides/msp-import-properties.md#task-properties):

 - **taskProperties** - указывает массив дополнительных свойств задач, которые нужно импортировать.


~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data"
        value='{ "taskProperties": ["Contact", "Priority"] }' />
    <button type="submit">Get</button>
</form>
~~~
или
~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    taskProperties: ["Contact", "Priority"],
    callback: (project) => {
        gantt.parse(project.data);
    }
});
gantt.attachEvent("onTaskLoading", (task) => {
    if (task.$custom_data) {
        task.contact = task.$custom_data["Contact"];
        task.priority = task.$custom_data["Priority"];
        delete task.$custom_data;
    }
    return true;
});
~~~

**Связанный пример**: [Gantt. Import and export MSP files with additional and extended task and resource properties](https://snippet.dhtmlx.com/rveo6ukz)

#### Получение типов задач

Следующая логика позволяет определить тип задачи: задачи типа Project имеют свойство Summary: "1", а задачи типа Milestone — Milestone: "1". Нужно импортировать данные с этими свойствами, а затем установить тип задачи в зависимости от этих свойств.

Вызов импортируемой функции будет выглядеть так:

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: [
        "Summary",
        "Milestone"
    ],
    callback: (project) => {
        if (project) {
            gantt.clearAll();
            if (project.config.duration_unit) {
                gantt.config.duration_unit = project.config.duration_unit;
            }
            gantt.parse(project.data);
        }
    }
});
~~~

После этого можно преобразовать типы задач на основе полученных свойств следующим образом:

~~~js
gantt.attachEvent("onTaskLoading", (task) => {
    if (task.$custom_data) {
        if (task.$custom_data.Summary === "1") {
            task.type = "project";
        }
        if (task.$custom_data.Milestone === "1") {
            task.type = "milestone";
        }
        // delete task.$custom_data;
    }
    return true;
});
~~~

**Связанный пример**: [Gantt. Import MSP files. Get task type from properties](https://snippet.dhtmlx.com/sjka4br8)

#### Добавление и настройка календарей

Обратите внимание, что календари не добавляются автоматически во время импорта. Их нужно добавлять с помощью метода [addCalendar()](api/method/addcalendar.md). 
После этого следует задать настройки календаря через метод [setWorkTime()](api/method/setworktime.md). Например:

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: (project) => {
        if (project) {
            // настройки для добавления календарей
            project.calendars.forEach((calendar) => {
                let addedCalendar;
                // настройка рабочих часов для глобального календаря
                if (calendar.id === project.config.global_calendar_id) {
                    addedCalendar = gantt.getCalendar("global");
                } else {
                    // Gantt не добавляет календарь,
                    // если параметр `hours` пустой массив
                    let calendarHours = calendar.hours;
                    if (!calendarHours.length) {
                        calendarHours = undefined;
                    }
                    gantt.addCalendar({
                        id: calendar.id,
                        hours: calendarHours,
                        name: calendar.name
                    });

                    addedCalendar = gantt.getCalendar(calendar.id);
                }
                const worktimeDates = calendar.dates;
                for (const dateKey in worktimeDates) {
                    const calendarDate = new Date(+dateKey);
                    if (dateKey < 10) {
                        addedCalendar.setWorkTime({
                            day: dateKey,
                            hours: worktimeDates[dateKey]
                        });
                    } else {
                        addedCalendar.setWorkTime({
                            date: calendarDate,
                            hours: worktimeDates[dateKey]
                        });
                    }
                }
            });
        }
    }
});
~~~

**Связанный пример**: [Gantt. Calendars settings for export/import in MSProject and Primavera6](https://snippet.dhtmlx.com/668xqts7)

#### Календари ресурсов

Если есть календари ресурсов, укажите их через свойство [gantt.config.resource_calendars](api/config/resource_calendars.md):

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: (project) => {
        if (project) {
            // настройки для календарей
            project.calendars.forEach((calendar) => {
                // добавление календарей и настройка рабочего времени для них
            });

            // настройки для календарей ресурсов
            gantt.config.resource_calendars = {};

            project.resources.forEach((resource) => {
                if (resource.calendar) {
                    gantt.config.resource_calendars[resource.id] = resource.calendar;
                }
            });
        }
    }
});
~~~

**Связанный пример**: [Gantt. Resource calendars settings for export/import in MSProject and Primavera6](https://snippet.dhtmlx.com/10czv54b)

#### Ресурсы и назначения ресурсов

Если в файле есть ресурсы, они попадают в массив **resources** во время импорта. Параметр календаря у свойства 
**resources** задаёт календарь ресурса:

~~~js
{
    resources: [
        { id: "6", name: "John", type: "work", calendar: "8" },
        // другие ресурсы
    ]
}
~~~

Если есть назначения ресурсов, они будут импортированы во время массива **assignments**, где объект назначения содержит параметры
*resource_id: string* и *value: number*. Например:

~~~js
{
    tasks: [
        { id: "5", text: "Interior office", type: "task", start_date: "2027-04-03 00:00", duration: 7 },
        // другие задачи
    ],
    links: [],
    assignments: [
        { id: "1", task_id: 5, resource_id: 6, value: 3 },
        // другие назначения
    ],
    resources: [
        { id: "6", text: "John", unit: "hours/day" },
        { id: "7", text: "Mike", unit: "hours/day" },
        // другие ресурсы
    ]
}
~~~

## Ограничения по размеру запроса и импорт крупных файлов {#limits-on-request-size-and-import-of-large-files}

В онлайн-сервисе экспорта есть отдельный эндпойнт для больших файлов MS Project: `https://export.dhtmlx.com/gantt/project`. Он принимает запросы размером до 40 МБ, тогда как эндпойнт по умолчанию `https://export.dhtmlx.com/gantt` принимает запросы до 10 МБ. См. [Ограничения онлайн-сервиса экспорта](guides/export-common.md#service-limits).

Чтобы экспортировать или импортировать проект, превышающий ограничение в 10 МБ, укажите эндпойнт в свойстве `server` объекта конфигурации:

~~~js
gantt.importFromMSProject({
    server: "https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: (project) => {
        // некоторый код
    }
});
~~~

Эндпойнт поддерживает только экспорт и импорт MS Project и Primavera P6. Любые другие методы, например, `gantt.exportToPDF({server:"https://export.dhtmlx.com/gantt/project"})`, должны возвращать ошибку сервера.

Чтобы импортировать большие файлы с помощью собственного модуля экспорта, см. [Импорт больших файлов](guides/msp-export-module.md#import-of-large-files).

## dhtmlxGantt против расчета времени в MS Project

Существует принципиальная разница в том, как работают вычисления дат в dhtmlxGantt и MS Project, и в некоторых случаях это приводит к разным результатам.

Различия также зависят от сочетания настроек, применяемых в gantt. Но вы можете изменить настройки gantt, что может повлиять на результаты расчетов:

1. В первую очередь, различаются конверсии продолжительности между dhtmlxGantt и [MS Project](https://blog.epmainc.com/start-and-end-date-do-not-align-task-duration/).

Это можно обойти, указав *HoursPerDay* и *MinutesPerDay* при экспорте gantt в MS Project:

~~~js
gantt.exportToMSProject({
    project: {
        HoursPerDay: () => 24,
        MinutesPerDay: () => 24 * 60
    }
});
~~~

**Связанный пример**: [Export to MSProject без настроек "work_time"](https://snippet.dhtmlx.com/92fje5jq)

2. Во-вторых, ваш проект может иметь отключённую настройку [work_time](guides/working-time.md):

~~~js
gantt.config.work_time = false;
~~~

Обратите внимание, даже если вычисления рабочего времени отключены, gantt все равно имеет настройки календаря по умолчанию в конфигурации (8 часов в день, рабочая неделя с понедельника по пятницу).
И наш клиент экспорта всегда отправляет календарь по умолчанию в MS Project, даже если рабочее время отключено в gantt. Именно поэтому MS Project рассчитывает длительности задач по-разному.

Как обходной вариант можно очистить календарь по умолчанию, чтобы даже если он отправлен в MS Project, длительности задач рассчитывались так же, как в gantt:

~~~js
gantt.setWorkTime({ day: 0, hours: [0, 24] });
gantt.setWorkTime({ day: 1, hours: [0, 24] });
gantt.setWorkTime({ day: 2, hours: [0, 24] });
gantt.setWorkTime({ day: 3, hours: [0, 24] });
gantt.setWorkTime({ day: 4, hours: [0, 24] });
gantt.setWorkTime({ day: 5, hours: [0, 24] });
gantt.setWorkTime({ day: 6, hours: [0, 24] });
~~~

3. Кроме того, вы можете заметить расхождение между датами элементов резюме, если вы указали [gantt.config.duration_unit](api/config/duration_unit.md) как "day":

~~~js
gantt.config.duration_unit = "day";
~~~

В этом случае gantt будет округлять продолжительности до общего количества дней. Но MS Project не будет этого делать и покажет дробные продолжительности. Например, верхний проект в gantt может иметь длительность 439, а в MS Project — 438.58.

Единственным обходным вариантом будет переключение [duration_unit](api/config/duration_unit.md) на часы:

~~~js
gantt.config.duration_unit = "hour";
~~~

**Связанный пример**: [Export to MSProject без настроек "work_time"](https://snippet.dhtmlx.com/92fje5jq)