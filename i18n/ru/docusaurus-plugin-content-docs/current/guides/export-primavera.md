---
title: "Экспорт и импорт из Primavera P6" 
sidebar_label: "Экспорт и импорт из Primavera P6" 
---

# Экспорт и импорт из Primavera P6

Библиотека dhtmlxGantt позволяет экспортировать данные из диаграммы Ганта в Primavera P6. Также вы можете импортировать данные в Gantt из Primavera P6.

:::note
Сервис бесплатный, но выходной файл будет содержать водяной знак библиотеки в соответствии с лицензией GPL. 
Если вы приобретете лицензию, результат экспорта будет доступен без водяного знака в течение действующего срока поддержки (12 месяцев для всех PRO лицензий).
:::

Существует несколько сервисов экспорта. Их можно установить на ваш компьютер и локально экспортировать диаграмму Ганта в Primavera P6. Обратите внимание, что сервисы экспорта не входят в пакет Gantt; прочитайте [соответствующую статью](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml), чтобы узнать условия использования каждого из них.

## Ограничения онлайн-сервиса экспорта

:::note
У онлайн-сервиса экспорта существуют ограничения по времени и размеру запроса.
:::

### Ограничения по времени

Если процесс занимает более 20 секунд, экспорт будет отменен и произойдет следующая ошибка:

~~~html
Error: Timeout trigger 20 seconds
~~~

Если несколько человек экспортируют Gantt одновременно, процесс может занять больше обычного. Но это нормально, потому что время, затраченное на запрос экспорта от конкретного пользователя, считается отдельно.

### Ограничения на размер запроса

Существует общий API-эндпойнт `https://export.dhtmlx.com/gantt`, который обслуживает все методы экспорта (*exportToPDF*, *exportToPNG*, *exportToMSProject* и т. д.). **Максимальный размер запроса — 10 МБ**.

Также существует отдельный API-эндпойнт `https://export.dhtmlx.com/gantt/project`, специфический для [MSProject](guides/export-msproject.md) и 
[Primavera P6](#limits-on-request-size-and-import-of-large-files) 
экспорта/импорта (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* только). **Максимальный размер запроса: 40 МБ**.

## Использование модулей экспорта

:::note
Если вам нужен экспорт больших диаграмм, вы можете использовать [независимый экспортный модуль](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml). 
Модуль экспорта предоставляется бесплатно, если у вас лицензия на Gantt по [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) или [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), или вы можете [приобрести модуль отдельно](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).
:::

[Подробнее об использовании экспортного модуля для MS Project](guides/msp-export-module.md). Этот экспортный модуль предоставляет функциональность экспорта/импорта для MS Project и 
Primavera P6.

## Экспорт в Primavera P6 {#exporttoprimaverap6}

Компонент Gantt позволяет экспортировать связи, задачи и ресурсы в Primavera P6.

Чтобы экспортировать данные из диаграммы Ганта в Primavera P6, выполните следующее:

- Чтобы использовать функциональность экспорта/импорта, включите плагин <b>export_api</b> через метод [plugins](api/method/plugins.md):

~~~js
gantt.plugins({
    export_api: true
});
~~~

Это позволяет использовать либо онлайн-сервис экспорта, либо локальный экспортный модуль.

:::note
Если вы используете версию Gantt старше 8.0, вам нужно включить на вашей странице `https://export.dhtmlx.com/gantt/api.js`, чтобы включить функциональность экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Вызовите метод [exportToPrimaveraP6()](api/method/exporttoprimaverap6.md) для экспорта данных из диаграммы Gantt.

~~~js
gantt.exportToPrimaveraP6();
~~~

Метод отправит запрос на удаленный сервис, который либо создаст XML-файл проекта, либо вернет URL для загрузки сгенерированного файла.


**Связанный пример**: [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)

Обратите внимание, что при экспорте данных в Primavera необходимо вернуть *true* для свойства **Summary** у задач проекта, чтобы эта функция работала корректно:

~~~js
gantt.exportToPrimaveraP6({
  tasks: {
    Summary: function (task) {
      return !!gantt.hasChild(task.id);
    },
    CustomProperty: function (task) {
      return task.custom_property;
    },
    SlateId: function (task) {
      return task.id + "";
    },
  }
});
~~~

**Связанный пример**: [Custom properties for WBS tasks (PrimaveraP6's Summary tasks)](https://snippet.dhtmlx.com/r90hjlvo?tag="gantt")

### Настройки экспорта

Метод **exportToPrimaveraP6()** принимает в качестве параметра объект с рядом свойств (все свойства являются необязательными):

- **name** - (string) имя полученного файла ('gantt.xml' по умолчанию).

~~~js
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) указывает режим планирования задач в экспортируемом проекте. **true** пометит задачи как автоматически запланированные, **false** — как вручную запланированные (состояние по умолчанию).

~~~js
gantt.exportToPrimaveraP6({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) указывает, будут ли удаляться циклические связи (true — будут удалены (режим по умолчанию), false — не будут удалены).

~~~js
gantt.exportToPrimaveraP6({
    skip_circular_links: false
});
~~~

- **project** - (object) позволяет задать дополнительные свойства экспортируемого проекта

~~~js
gantt.exportToPrimaveraP6({
    project: {
        'Author': 'I am!',
        'MinutesPerDay': function () {
            return gantt.config.hours_per_day * 60;
        }
    }
});
~~~

Свойства этого объекта соответствуют соответствующим свойствам [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)). Список поддерживаемых свойств можно найти [здесь](guides/properties.md). Свойства могут содержать либо фиксированные значения, либо функции, которые будут выполняться при вызове экспорта.

- **tasks** - (object) позволяет задать дополнительные свойства экспортируемых элементов задач

~~~js
gantt.exportToPrimaveraP6({
   tasks: {
        'StartVariance': function (task) {
           if (task.startVariance)
               return task.startVariance;
           else
               return 0;
        },
        'PercentWorkComplete': function (task) {
           return (task.progress + 0.1);
        },
        'Custom': function (task) {
           return 'Custom value';
        },
        'Custom 2': 'My Custom value'
    }
});
~~~

Свойства этого объекта соответствуют соответствующим свойствам [Task entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)), ниже приведен список поддерживаемых [properties](guides/properties.md#tasks-properties). Свойства могут содержать либо фиксированные значения, либо функции, которые будут вызываться для каждой задачи в наборе данных при вызове экспорта.

- **data** - (object) позволяет задать пользовательский источник данных, который будет представлен в выходной диаграмме Gantt. 

:::note
Ожидается, что свойства **start_date** и **end_date** будут указаны в формате, который включает дату и время (*%d-%m-%Y %H:%i*).
:::

~~~js
const customData = {
    "data": [
        { "id": "10", "text": "Project #5", "start_date": "01-04-2025 00:00", 
            "duration": 3, "order": 10, "progress": 0.4, "open": true, 
            "end_date": "04-04-2025 00:00", "parent": 0 
        },
        { "id": "1", "text": "Task #67", "start_date": "02-04-2025 00:00", 
            "duration": 2, "order": 10, "progress": 0.6, "parent": "10", 
            "end_date": "04-04-2025 00:00" 
        },
        { "id": "2", "text": "Task #89", "start_date": "01-04-2025 00:00", 
            "duration": 2, "order": 20, "progress": 0.6, "parent": "10", 
            "end_date": "03-04-2025 00:00" 
        },
    ],
    "links": [
        { "id": 1, "source": 1, "target": 2, "type": "1" },
    ]
}

gantt.exportToPrimaveraP6({
    data: customData
});
~~~

**Связанный пример**: [Gantt. Export custom data](https://snippet.dhtmlx.com/10ytgdxs)

- **callback** - (function) Если вы хотите получить URL для загрузки сгенерированного XML, можно использовать свойство *callback*. Он принимает JSON-объект с свойством *url*:

~~~js
gantt.exportToPrimaveraP6({
    callback: function(res){
        alert(res.url);
    }
});
~~~
 
- **resources** - (array) позволяет экспортировать список ресурсов в файл Primavera P6

~~~js
gantt.exportToPrimaveraP6({
    resources: [
        { "id": "1", "name": "John", "type": "work" },
        { "id": "2", "name": "Mike", "type": "work" },
        { "id": "3", "name": "Anna", "type": "work" }
    ]
});
~~~

Возможные типы ресурсов — "work", "cost", "material". Назначения ресурсов задаются с помощью свойства **ResourceAssignments** конфигурации задач:

~~~js {23-25}
var users = [// resources
    { key: '0', label: "N/A" },
    { key: '1', label: "John" },
    { key: '2', label: "Mike" },
    { key: '3', label: "Anna" }
];

gantt.exportToPrimaveraP6({
    resources: users
        .filter(function(u){
            if(u.key === '0')//skip the default option 
                return false;
            return true;
        })
        .map(function(u){
            return {
                id: u.key,
                name: u.label,
                type: "work"
               };
          }),
    tasks: {
        ResourceAssignments: function(task){  
            return task.user;                   
        }                                       
    }
});
~~~

Свойство **ResourceAssignments** устанавливается как функция, которая принимает объект задачи в качестве параметра и возвращает либо строковое/числовое значение, либо массив значений строк/чисел:

~~~js
tasks: {
    ResourceAssignments: function(task){
        return [task.user, task.office];
    }
}
~~~

**Связанный пример**: [Export Gantt with resources to Primavera P6](https://snippet.dhtmlx.com/6bfbwp8g)

Можно указать параметр *units* для назначений ресурсов, возвращая следующий объект в свойстве **ResourceAssignments**:

~~~js
{
    resource_id: "id",
    units: "units value"
}
~~~

- **resource calendars**

По умолчанию каждому заданию добавляется некоторый календарь. Если используются календари ресурсов, необходимо указать -1 для задачи в свойстве 
CalendarUID во время экспорта (в объекте [tasks](#export-settings)). Затем задача будет использовать календарь ресурса.

При экспорте [resource calendars](api/config/resource_calendars.md) можно указать календарь ресурса в объекте массива [resources](#export-settings):

~~~js
gantt.exportToPrimaveraP6({
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
gantt.exportToPrimaveraP6({
    server: "https://myapp.com/myexport/gantt"
});
~~~

## Импорт из Primavera P6

Чтобы преобразовать XML или XER файл, необходимо отправить следующий запрос на сервис экспорта:

 - URL запроса - `https://export.dhtmlx.com/gantt`
 - Метод запроса - **POST**
 - Content-Type - **multipart/form-data**

Параметры запроса:

 - **file** - файл Primavera P6 в формате XER или XML
 - **type** - "primaveraP6-parse"
 - **data** - (*опционально*) строка JSON с настройками

Например:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
        value="{ "durationUnit": "hour" }" />
    <button type="submit">Get</button>
</form>
~~~ 

Либо можно использовать [клиентское API](api/method/importfromprimaverap6.md), например так:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
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


**Связанный пример**: [Import Primavera P6 file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_primaverap6.html)


Где *file* — это экземпляр [File](https://developer.mozilla.org/en-US/docs/Web/API/File), который должен содержать либо XML- или XER-проект.

:::note
**gantt.importFromPrimaveraP6** требует поддержки HTML5 File API.
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

- **data** - (*object*) gantt [data object](guides/supported-data-formats.md). У каждой задачи есть следующие свойства: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Даты сериализованы в формате "%Y-%m-%d %H:%i". 
- **config** - (*object*) объект [configuration](api/overview/properties-overview.md) Gantt со настройками, полученными из файла проекта.
- **resources** - (*array*) массив объектов (у каждого из которых следующие свойства: 
(*id: string, name: string, type: string, calendar: string*)), представляющих список ресурсов из файла проекта.
- **worktime** - (*object*) объект, содержащий настройки рабочего времени из календаря проекта. Может содержать следующие атрибуты:
   - **id** - (*string | number*) необязательно, идентификатор календаря
   - **hours** - (*array*) массив с глобальными рабочими часами, задает начало и конец часов задачи
    - **dates** - (*array*) массив дат, который может содержать:
        - 7 дней недели (от 0 — воскресенье до 6 — суббота), где 1/true означает рабочий день, 0/false — нерабочий день
        - другие записи — даты 
- **calendars** - (*array*) массив объектов конфигурации календаря для создания нового календаря. 
    - **calendarConfig** - (*object*) объект конфигурации календаря, который может содержать следующие атрибуты:
      - **id** - (*string | number*) необязательно, идентификатор календаря
      - **name** - (*string*) имя календаря
      - **hours** - (*array*) массив с глобальными рабочими часами, задает начало и конец часов задачи
      - **dates** - (*array*) массив дат, который может содержать:
            - 7 дней недели (от 0 — воскресенье до 6 — суббота), где 1/true означает рабочий день и 0/false — нерабочий день
            - другие записи — даты

### Настройки импорта

#### Настройка единицы продолжительности

Чтобы задать ожидаемую единицу продолжительности, строка **durationUnit** ("minute", "hour", "day", "week", "month", "year") может также быть отправлена на сервер.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
        value="{ "durationUnit": "hour" }" />
    <button type="submit">Get</button>
</form>
~~~

или

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    durationUnit: "hour",
    callback: function(project){}
});
~~~

#### Получение свойств проекта

Чтобы получить поля проекта, на сервер можно отправить входной параметр **projectProperties** с массивом необходимых полей. Он извлекает произвольные свойства сущности [Project](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)) в свойство config выходного файла. Ниже приведен список поддерживаемых [свойств](guides/properties.md#project-properties).

 - **projectProperties** - задает массив свойств проекта, которые должны попасть в ответ.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
        value="{ "projectProperties": ["Author", "Title"] }" />
    <button type="submit">Get</button>
</form>
~~~

или

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    durationUnit: "hour",
    projectProperties: ["Author", "Title"],
    callback: function(project){
        var config = project.config;
        alert(config.$custom_properties.Author);
    }
});
~~~

#### Получение свойств задач

Чтобы получить поля задач, можно отправить на сервер входной параметр **taskProperties** с массивом необходимых полей. Он извлекает произвольные свойства сущностей [Task](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)). Ниже приведен список поддерживаемых [свойств](guides/properties.md#tasks-properties):

 - **taskProperties** - указывает массив дополнительных свойств задач для импорта.


~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
        value="{ "taskProperties": ["Contact", "Priority"] }" />
    <button type="submit">Get</button>
</form>
~~~
или
~~~js
gantt.importFromPrimaveraP6({
    data: file,
    durationUnit: "hour",
    taskProperties: ["Contact", "Priority"],
    callback: function(project){
        var config = project.config;
        alert(config.$custom_properties.Author);
        gantt.parse(project.data);
    }
});
gantt.attachEvent("onTaskLoading", function(task) {
    if (task.$custom_data) {
        task.contact = task.$custom_data["Contact"];
        task.priority = task.$custom_data["priority"];
        delete task.$custom_data;
    }
    return true;
});
~~~

#### Получение типов задач

Следующая логика позволяет получить тип задачи: задачи типа Project имеют свойство Summary: "1", а задачи типа Milestone — свойство Milestone: "1". Нужно импортировать данные с этими свойствами и затем установить тип задачи в зависимости от этих свойств.

Вызов функции импорта будет выглядеть так:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: [
        "Summary", 
        "Milestone",
    ],
    callback: function (project) {
        if (project) {
            console.log(project)
            gantt.clearAll();
            if (project.config.duration_unit) {
                gantt.config.duration_unit = project.config.duration_unit;
            }
            console.log('import: ', project.data);
            gantt.parse(project.data);
        }
    }
});
~~~

После этого можно привести типы задач в соответствие с полученными свойствами следующим образом:

~~~js
gantt.attachEvent("onTaskLoading", function (task) {
    if (task.$custom_data) {
        if (task.$custom_data.Summary == "1") {
            task.type = "project";
        }
        if (task.$custom_data.Milestone == "1") {
            task.type = "milestone";
        }
        // delete task.$custom_data;
    }
    return true;
});
~~~

**Связанный пример**: [Gantt. Import Primavera P6 files. Get task type from properties](https://snippet.dhtmlx.com/y95rsxor)

#### Добавление и настройка календарей

Обратите внимание, что календари не добавляются автоматически во время импорта. Их нужно добавить с помощью метода [addCalendar()](api/method/addcalendar.md). 
После этого следует задать настройки календаря через метод [setWorkTime()](api/method/setworktime.md). Например:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // настройки для добавления календарей
            project.calendars.forEach(function (calendar) {
                let addedCalendar;
                // добавление настроек рабочего времени для глобального календаря
                if (calendar.id == project.config.global_calendar_id) {
                    addedCalendar = gantt.getCalendar("global");
                }
                else {
                    // Gantt не добавляет календарь, 
                    // если параметр `hours` пустой массив
                    let calendarHours = calendar.hours;
                    if (!calendarHours.length) {
                        calendarHours = undefined
                    }
                    gantt.addCalendar({
                        id: calendar.id,
                        hours: calendarHours,
                        name: calendar.name
                    });

                    addedCalendar = gantt.getCalendar(calendar.id);
                }
                const worktimeDates = calendar.dates;
                for (let element in worktimeDates) {
                    const date = new Date(+element)
                    if (element < 10) {
                        addedCalendar.setWorkTime({ 
                            day: element, 
                            hours: worktimeDates[element] 
                        })
                    }
                    else {
                        addedCalendar.setWorkTime({ 
                            date: date, 
                            hours: worktimeDates[element] 
                        })
                    }
                }
            })
        }
    }
});
~~~

**Связанный пример**: [Gantt. Calendars settings for export/import in MSProject and Primavera P6](https://snippet.dhtmlx.com/668xqts7)

#### Календари ресурсов

Если есть календари ресурсов, их нужно задать через свойство gantt.config.resource_calendars:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // настройки календарей
            project.calendars.forEach(function (calendar) {
                // добавление календарей и настроек рабочего времени для них 
            })

            // настройки календарей ресурсов
            gantt.config.resource_calendars = {}

            project.resources.forEach(function (resource) {
                if (resource.calendar) {
                    gantt.config.resource_calendars[resource.id] = resource.calendar;
                }
            })
        }
    }
});
~~~

**Связанный пример**: [Gantt. Resource calendars settings for export/import in MSProject and Primavera P6](https://snippet.dhtmlx.com/10czv54b)

#### Ресурсы и назначения ресурсов

Если в файле есть ресурсы, они приходят в массиве **resources** во время импорта. параметр *calendar* свойства 
**resources** задает календарь ресурса:

~~~js
{
    resources: [
        { id: 6, name: "John", type: "work", calendar: "8" },
        // more resources
    ]
}
~~~

Если есть назначения ресурсов, они будут импортированы в массиве **assignments**, где объект назначения содержит параметры *resource_id: string* и *value: number*. Например:

~~~js
{
    tasks: [
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2024 00:00",
            duration: 7,
            parent: "2",
            priority: 1
        },
        // more tasks
    ],
    links: [],
    assignments: [
        { id: 1, task_id: 5, resource_id: 6, value: 3},
        // more assignments
    ],
    resources: [
        { id: 6, text: "John", unit: "hours/day" },
        { id: 7, text: "Mike", unit: "hours/day" },
        // more resources
    ]
}
~~~



## Ограничения на размер запроса и импорт больших файлов

Существуют два API-эндпойнта для сервисов экспорта/импорта Primavera P6:

- `https://export.dhtmlx.com/gantt` - дефолтный эндпойнт, обслуживающий все методы экспорта (*exportToPDF*, *exportToPNG*, *exportToPrimaveraP6*, и т.д.). **Максимальный размер запроса — 10 МБ**.
- `https://export.dhtmlx.com/gantt/project` - эндпойнт, специфичный для [MSProject](guides/export-msproject.md) и 
[Primavera P6](guides/export-primavera.md) 
экспорта/импорта (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6* только). **Максимальный размер запроса: 40 МБ**.

Эндпойнт можно задать через свойство **server** конфигурационного объекта экспорта:

~~~js
gantt.importFromPrimaveraP6({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // какая-то логика
    }
}); 
~~~

Если эндпойнт не указан, по умолчанию используется `https://export.dhtmlx.com/gantt`. Следующий вызов эквивалентен приведённому выше:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    callback: function(project){
       // какая-то логика
    }
});
~~~

Чтобы экспортировать или импортировать крупные проекты, превышающие лимит 4 МБ, можно использовать второй эндпойнт:

~~~js
gantt.importFromPrimaveraP6({
    server: "https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // какая-то логика
    }
}); 
~~~

Он позволяет отправлять запросы размером до 40 МБ и поддерживает экспорты и импорты Primavera P6. Его можно использовать только для экспорта Primavera P6.

Любые другие методы, например, `gantt.exportToPDF({server:"https://export.dhtmlx.com/gantt/project"})` должны возвращать ошибку сервера.