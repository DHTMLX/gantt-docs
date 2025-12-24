---
title: "Экспорт и импорт из MS Project"
sidebar_label: "Экспорт и импорт из MS Project"
---

# Экспорт и импорт из MS Project


Библиотека dhtmlxGantt поддерживает экспорт данных из диаграммы Gantt в MS Project, а также импорт данных из MS Project в диаграмму Gantt.

:::note
Сервис экспорта предоставляется бесплатно, однако итоговый файл будет содержать водяной знак библиотеки при использовании по лицензии GPL. 
Если у вас есть приобретённая лицензия, экспорт будет выполняться без водяных знаков в течение активного периода поддержки (12 месяцев для всех PRO-лицензий).
:::

Существует несколько сервисов экспорта, которые можно установить локально на ваш компьютер для экспорта диаграмм Gantt в MS Project. 
Обратите внимание, что эти сервисы экспорта не входят в комплект поставки Gantt. 
Подробнее об условиях использования каждого сервиса смотрите в [соответствующей статье](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml).

## Ограничения онлайн-сервиса экспорта


:::note
Сервис экспорта имеет ограничения по времени обработки и размеру запроса.
:::

### Ограничения по времени

Если процесс экспорта занимает больше 20 секунд, он будет прерван, и вы увидите следующую ошибку:

~~~html
Error: Timeout trigger 20 seconds
~~~

Когда несколько пользователей одновременно экспортируют диаграммы Gantt, общая обработка может занять больше времени. Однако для каждого отдельного запроса пользователя отслеживается время отдельно.

### Ограничения на размер запроса

Общий API-эндпоинт **https://export.dhtmlx.com/gantt** обрабатывает все типы экспорта (*exportToPDF*, *exportToPNG*, *exportToMSProject* и др.) с максимальным размером запроса в **10 МБ**.

Также существует отдельный API-эндпоинт **https://export.dhtmlx.com/gantt/project** специально для сервисов экспорта/импорта [MSProject](#limitsonrequestsizeandimportoflargefiles) и 
[Primavera P6](guides/export-primavera.md) (*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*). Этот эндпоинт позволяет отправлять запросы размером до **40 МБ**.

## Использование модулей экспорта


:::note
Для экспорта крупных диаграмм рекомендуется использовать [отдельный модуль экспорта](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml). 
Этот модуль предоставляется бесплатно при наличии лицензии [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) или [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), либо может быть приобретён отдельно [здесь](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).
:::

[Подробнее об использовании модуля экспорта для MS Project](guides/msp-export-module.md). 


## Экспорт в MS Project


Компонент Gantt поддерживает экспорт связей, задач и ресурсов в MS Project.

Чтобы экспортировать данные из диаграммы Gantt в MS Project, выполните следующие шаги:

- Включите плагин <b>export_api</b> через метод [plugins](api/method/plugins.md) для использования онлайн-сервиса экспорта:

~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
Для версий Gantt ниже 8.0 необходимо подключить **https://export.dhtmlx.com/gantt/api.js** на вашей странице для активации онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- Используйте метод [exportToMSProject](api/method/exporttomsproject.md) для экспорта данных из вашей диаграммы Gantt.

~~~js
gantt.exportToMSProject();
~~~

Этот метод отправляет запрос на удалённый сервис, который либо сгенерирует XML-файл Project, либо предоставит ссылку для его загрузки.


[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


### Ответ

Ответ содержит JSON-объект следующей структуры:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktimes: []
}
~~~

- **data** - [объект данных](guides/supported-data-formats.md#json) Gantt. Каждая задача содержит свойства, такие как *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Даты представлены в формате строки "%Y-%m-%d %H:%i".
- **config** - объект [конфигурации](api/overview/properties-overview.md) Gantt, содержащий параметры, извлечённые из project-файла.
- **resources** - массив объектов ресурсов, каждый из которых содержит свойства (*id: string, name:string, type:string*), соответствующих ресурсам из project-файла.
- **worktimes** - массив объектов, используемых для создания новых календарей. Каждый объект календаря может содержать:
    - **id** - (необязательно) идентификатор календаря
    - **hours** - (массив) глобальные рабочие часы, определяющие начало и конец задач
    - **dates** - (массив), который может включать:
        - Семь дней недели (0 = воскресенье, 6 = суббота), где 1/true - рабочий день, 0/false - выходной
        - Конкретные даты


### Настройки экспорта

Метод **exportToMSProject()** принимает необязательный объект с различными параметрами:

- **name** - (строка) имя экспортируемого файла (по умолчанию 'gantt.xml').

~~~js
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (логический) определяет режим планирования для экспортируемых задач. **true** - задачи автоматически планируются, **false** - вручную (по умолчанию).

~~~js
gantt.exportToMSProject({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - (логический) определяет, будут ли удаляться циклические связи (по умолчанию true).

~~~js
gantt.exportToMSProject({
    skip_circular_links: false
});
~~~

- **project** - (объект) позволяет задать пользовательские свойства для экспортируемого объекта проекта.

~~~js
gantt.exportToMSProject({
    project: {
        'Author': 'I am!',
        'MinutesPerDay': function () {
            return gantt.config.hours_per_day * 60;
        }
    }
});
~~~

Свойства соответствуют [свойствам Project](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))." 
Поддерживаемые свойства перечислены [здесь](guides/tags.md). Значения могут быть как фиксированными, так и функциями, выполняемыми во время экспорта.

- **tasks** - (объект) позволяет задать пользовательские свойства для экспортируемых задач.

~~~js
gantt.exportToMSProject({
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

Эти свойства соответствуют [свойствам Task](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)), поддерживаемые свойства перечислены [здесь](guides/tags.md#tasksproperties).
Значения могут быть фиксированными или функциями, вызываемыми для каждой задачи при экспорте.

- **data** - (объект) позволяет предоставить собственный источник данных для экспортируемой диаграммы Gantt.

:::note
**start_date** и **end_date** должны быть указаны в формате, включающем дату и время (*%d-%m-%Y %H:%i*).
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

gantt.exportToMSProject({
    data: customData
});
~~~


**Related example:** [Gantt. Export custom data](https://snippet.dhtmlx.com/10ytgdxs)

))

- **callback** - (функция) для получения URL для скачивания сгенерированного XML-файла. В функцию передаётся JSON-объект со свойством *url*:

~~~js
gantt.exportToMSProject({
    callback: function(res){
        alert(res.url);
    }
});
~~~
 
- **resources** - (массив) для добавления списка ресурсов в файл MS Project.

~~~js
gantt.exportToMSProject({
  resources: [
    {"id":"1","name":"John","type":"work"},
    {"id":"2","name":"Mike","type":"work"},
    {"id":"3","name":"Anna","type":"work"}
  ]
});
~~~

Типы ресурсов могут быть "work", "cost" или "material". Назначения ресурсов указываются через свойство **ResourceAssignments** в конфигурации задач:

~~~js
var users = [// ресурсы
  {key:'0', label: "N/A"},
  {key:'1', label: "John"},
  {key:'2', label: "Mike"},
  {key:'3', label: "Anna"}
];

gantt.exportToMSProject({
  resources: users
     .filter(function(u){
        if(u.key === '0')//пропустить вариант по умолчанию 
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
     ResourceAssignments: function(task){  /*!*/
        return task.user;                   /*!*/
     }                                       /*!*/
  }
});
~~~

Свойство **ResourceAssignments** - это функция, которая получает объект задачи и возвращает строку/число либо массив строк/чисел:

~~~js
tasks: {
    ResourceAssignments: function(task){
        return [task.user, task.office];
    }
}
~~~

- **server** - (строка) указывает API-эндпоинт для запроса экспорта. Используется при запуске локального сервиса экспорта. По умолчанию - **https://export.dhtmlx.com/gantt**.

~~~js
gantt.exportToMSProject({
   server:"https://myapp.com/myexport/gantt"
});
~~~


## Импорт из MS Project


Чтобы преобразовать XML- или MPP-файл MS Project, отправьте запрос на сервис экспорта со следующими параметрами:

 - URL запроса: **https://export.dhtmlx.com/gantt**
 - Метод запроса: **POST**
 - Content-Type: **multipart/form-data**

Параметры запроса:

 - **file** - MPP или XML-файл MS Project
 - **type** - "msproject-parse"
 - **data** - (*необязательно*) JSON-строка с настройками

Пример формы:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <button type="submit">Get</button>
</form>
~~~

Альтернативно вы можете использовать [клиентский API](api/method/importfrommsproject.md), как показано ниже:

~~~js
gantt.importFromMSProject({
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

Здесь *file* должен быть экземпляром [File](https://developer.mozilla.org/en-US/docs/Web/API/File), содержащим XML или MPP-файл Project.

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
   worktime: {}
}
~~~

- **data** - [объект данных](guides/supported-data-formats.md#json) Gantt. Каждая задача содержит свойства: *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Даты представлены строкой в формате "%Y-%m-%d %H:%i".
- **config** - объект [конфигурации](api/overview/properties-overview.md) Gantt, содержащий параметры, извлечённые из project-файла.
- **resources** - массив объектов, каждый из которых содержит свойства (*id:string, name:string, type:string*), соответствующие ресурсам из project-файла.
- **worktime** - объект с настройками рабочего времени, взятыми из календаря проекта.

### Настройки импорта

#### Установка единицы измерения длительности

Чтобы указать ожидаемую единицу измерения длительности, в отправляемых на сервер данных можно добавить строку **durationUnit** ("minute", "hour", "day", "week", "month", "year").

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
        value="{ "durationUnit": "hour" }" />
    <button type="submit">Get</button>
</form>
~~~

или

~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    callback: function(project){}
});
~~~

#### Получение свойств проекта

Чтобы получить поля проекта, в параметре **projectProperties** можно указать массив нужных полей, который будет отправлен на сервер. Это позволит получить произвольные свойства [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))" в свойство **config** ответа. Доступные [свойства](guides/tags.md#projectproperties) перечислены в документации.

- **projectProperties** - определяет массив свойств проекта, которые будут включены в ответ.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
        value="{ "projectProperties": ["Author", "Title"] }" />
    <button type="submit">Get</button>
</form>
~~~

или

~~~js
gantt.importFromMSProject({
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

Чтобы получить поля задач, в параметре **taskProperties** можно указать массив нужных полей, который будет отправлен на сервер. Это позволяет получить произвольные свойства [Task entities](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))." Доступные [свойства](guides/tags.md#tasksproperties) перечислены в документации.

- **taskProperties** - определяет массив дополнительных свойств задач для импорта.

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
        value="{ "taskProperties": ["Contact", "Priority"] }" />
    <button type="submit">Get</button>
</form>
~~~

или

~~~js
gantt.importFromMSProject({
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

Этот способ позволяет определить тип задачи: задачи с пометкой **Project** имеют свойство `Summary: "1"`, а задачи с пометкой **Milestone** - свойство `Milestone: "1"`. Импортируя эти свойства, можно соответствующим образом задать тип задачи.

Вызов импорта выглядит так:

~~~js
gantt.importFromMSProject({
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

Далее типы задач можно скорректировать на основе этих свойств следующим образом:

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


**Related example:** [Gantt. Import MSP files. Get task type from properties](https://snippet.dhtmlx.com/sjka4br8)


## Ограничения на размер запроса и импорт больших файлов

Существует два конечных API-адреса для сервисов экспорта/импорта MSProject:

- **https://export.dhtmlx.com/gantt** - основной адрес, обрабатывающий все методы экспорта (*exportToPDF*, *exportToPNG*, *exportToMSProject*, и др.). **Максимальный размер запроса - 10 МБ**.
- **https://export.dhtmlx.com/gantt/project** - адрес, предназначенный для сервисов экспорта/импорта [MSProject](guides/export-msproject.md) и [Primavera P6](guides/export-primavera.md) (*exportToMSProject*, *importFromMSProject*, *exportToPrimaveraP6*, *importFromPrimaveraP6*). **Максимальный размер запроса: 40 МБ**.

Конечный адрес можно указать через свойство **server** в объекте конфигурации экспорта:

~~~js
gantt.importFromMSProject({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

Если конечный адрес не указан, по умолчанию используется <b>*https://export.dhtmlx.com/gantt*</b>. Следующий вызов эквивалентен:

~~~js
gantt.importFromMSProject({
    data: file,
    callback: function(project){
       // some logic
    }
});
~~~

Для экспорта или импорта больших проектов, превышающих лимит в 4 МБ, используйте второй адрес:

~~~js
gantt.importFromMSProject({
    server:"https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

Этот адрес поддерживает запросы до 40 МБ и предназначен для экспорта и импорта MS Project. Он может использоваться только для экспорта MS Project.

Использование других методов, например *gantt.exportToPDF((server:"https://export.dhtmlx.com/gantt/project"))*, приведет к ошибке сервера.

## dhtmlxGantt vs MS Project: вычисление времени


Существуют ключевые различия в том, как dhtmlxGantt и MS Project рассчитывают даты, что иногда может приводить к разным результатам.

Эти различия зависят от используемых настроек gantt. Некоторые параметры gantt влияют на результаты вычислений:

1. Преобразование длительности отличается между dhtmlxGantt и [MS Project](https://blog.epmainc.com/start-and-end-date-do-not-align-task-duration/).

Это можно скорректировать, указав *HoursPerDay* и *MinutesPerDay* при экспорте в MS Project:

~~~js
gantt.exportToMSProject({
    project: {
        HoursPerDay: function () {
            return 24;
        },
        MinutesPerDay: function () {
            return 24 * 60;
        }
    }
});
~~~


**Related example:** [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)


2. В проекте может быть отключена настройка [work_time](guides/working-time.md):

~~~js
gantt.config.work_time = false;
~~~

Обратите внимание, что даже при отключенных расчетах рабочего времени gantt по-прежнему использует настройки календаря по умолчанию (8 часов в день, рабочая неделя - с понедельника по пятницу). Клиент экспорта всегда отправляет этот календарь MS Project, в результате чего MS Project рассчитывает длительность задач иначе.

В качестве обходного решения можно очистить календарь по умолчанию, чтобы длительности задач рассчитывались одинаково в gantt и MS Project:

~~~js
gantt.setWorkTime({day:0, hours:[0,24]});
gantt.setWorkTime({day:1, hours:[0,24]});
gantt.setWorkTime({day:2, hours:[0,24]});
gantt.setWorkTime({day:3, hours:[0,24]});
gantt.setWorkTime({day:4, hours:[0,24]});
gantt.setWorkTime({day:5, hours:[0,24]});
gantt.setWorkTime({day:6, hours:[0,24]});
~~~

3. Вы можете заметить различия в датах сводных элементов, если [gantt.config.duration_unit](api/config/duration_unit.md) установлен в "day":

~~~js
gantt.config.duration_unit = "day";
~~~

В этом случае gantt округляет длительности до целых дней, а MS Project показывает дробные значения. Например, длительность проекта может быть 439 дней в gantt, но 438.58 в MS Project.

Решение - переключить [duration_unit](api/config/duration_unit.md) на часы:

~~~js
gantt.config.duration_unit = "hour";
~~~


**Related example:** [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)

