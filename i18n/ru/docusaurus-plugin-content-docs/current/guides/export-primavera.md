---
title: "Экспорт и импорт из Primavera P6"
sidebar_label: "Экспорт и импорт из Primavera P6"
---

# Экспорт и импорт из Primavera P6


Библиотека dhtmlxGantt поддерживает экспорт данных из Gantt-диаграммы в Primavera P6, а также импорт данных из Primavera P6 в Gantt-диаграмму.

:::note
Этот сервис предоставляется бесплатно, однако экспортируемый файл будет содержать водяной знак библиотеки по лицензии GPL.
Покупка лицензии удаляет водяной знак на период действия поддержки (12 месяцев для всех PRO-лицензий).
:::

Доступно несколько экспортных сервисов для локальной установки на вашем компьютере, что позволяет экспортировать Gantt-диаграмму напрямую в Primavera P6.
Обратите внимание, что экспортные сервисы не входят в комплект поставки Gantt.
Подробную информацию об условиях использования смотрите в [соответствующей статье](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml).

## Ограничения онлайн-сервиса экспорта


:::note
Сервис экспорта имеет ограничения по времени обработки и размеру запроса.
:::

### Ограничения по времени

Если процесс экспорта занимает более 20 секунд, он будет отменён и появится следующая ошибка:

~~~html
Error: Timeout trigger 20 seconds
~~~

Когда несколько пользователей одновременно экспортируют Gantt-диаграммы, обработка может занять больше времени, чем обычно. Однако время обработки каждого запроса считается отдельно для каждого пользователя - это ожидаемое поведение.

### Ограничения по размеру запроса

Общий API-эндпоинт **https://export.dhtmlx.com/gantt** обрабатывает все методы экспорта (*exportToPDF*, *exportToPNG*, *exportToMSProject* и др.) с **максимальным размером запроса 10 МБ**.

Существует также отдельный API-эндпоинт **https://export.dhtmlx.com/gantt/project** для сервисов экспорта/импорта [MSProject](guides/export-msproject.md) и
[Primavera P6](#limitsonrequestsizeandimportoflargefiles)
(*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*). Этот эндпоинт поддерживает **максимальный размер запроса 40 МБ**.

## Использование экспортных модулей


:::note
Для экспорта больших диаграмм доступен [отдельный экспортный модуль](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml).
Этот модуль бесплатен, если у вас есть лицензия [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), [Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) или [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing), либо может быть приобретён отдельно по [этой ссылке](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210).
:::

Более подробную информацию об использовании экспортного модуля с MS Project можно найти в [этом руководстве](guides/msp-export-module.md). Модуль поддерживает экспорт/импорт для MS Project и Primavera P6.

## Экспорт в Primavera P6 {#exporttoprimaverap6}


Компонент Gantt может экспортировать связи, задачи и ресурсы в Primavera P6.

Чтобы экспортировать данные из Gantt-диаграммы в Primavera P6, выполните следующие шаги:

- Включите плагин <b>export_api</b>, как описано в документации [plugins](api/method/plugins.md):

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

- Используйте метод [exportToPrimaveraP6()](api/method/exporttoprimaverap6.md) для экспорта данных из Gantt-диаграммы:

~~~js
gantt.exportToPrimaveraP6();
~~~

Этот метод отправляет запрос на удалённый сервис, который либо сгенерирует и вернёт XML-файл проекта, либо предоставит ссылку для его скачивания.


[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


При экспорте данных в Primavera важно, чтобы свойство **Summary** для проектных задач возвращало *true*, чтобы обеспечить корректную работу:

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


**Related example:** [Custom properties for WBS tasks (PrimaveraP6's Summary tasks)](https://snippet.dhtmlx.com/r90hjlvo?tag="gantt")


### Ответ

Ответ от сервиса экспорта будет JSON-объектом следующей структуры:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {}
}
~~~

- **data** - [объект данных](guides/supported-data-formats.md#json) Gantt, содержащий задачи со свойствами *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Даты представлены строками в формате "%Y-%m-%d %H:%i".
- **config** - [объект конфигурации](api/overview/properties-overview.md) Gantt с настройками, извлечёнными из файла проекта.
- **resources** - массив объектов ресурсов, каждый из которых содержит (*id: string, name:string, type:string*), соответствующих ресурсам из файла проекта.
- **worktime** - объект с настройками рабочего времени из календаря проекта.

### Настройки экспорта

Метод **exportToPrimaveraP6()** принимает объект с несколькими необязательными свойствами:

- **name** - (string) задаёт имя файла для экспорта (по умолчанию 'gantt.xml').

~~~js
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) определяет режим планирования задач в экспортируемом проекте. Значение **true** помечает задачи как автоматически планируемые, **false** - вручную (по умолчанию).

~~~js
gantt.exportToPrimaveraP6({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) определяет, будут ли удаляться циклические связи. **true** (по умолчанию) удаляет их, **false** - сохраняет.

~~~js
gantt.exportToPrimaveraP6({
    skip_circular_links: false
});
~~~

- **project** - (object) позволяет назначить пользовательские свойства экспортируемой сущности проекта.

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

Эти свойства соответствуют [свойствам проекта](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))." Список поддерживаемых свойств доступен [здесь](guides/properties.md). Значения могут быть как фиксированными, так и функциями, выполняемыми во время экспорта.

- **tasks** - (object) позволяет определить пользовательские свойства экспортируемых задач.

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

Эти свойства относятся к [сущности задачи](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12));" список поддерживаемых [свойств](guides/properties.md#tasksproperties) доступен. Значения могут быть фиксированными или функциями, вызываемыми для каждой задачи при экспорте.

- **data** - (object) позволяет указать собственный источник данных для выводимой Gantt-диаграммы.

:::note
Ожидается, что **start_date** и **end_date** будут содержать дату и время (*%d-%m-%Y %H:%i*).
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


**Related example:** [Gantt. Export custom data](https://snippet.dhtmlx.com/10ytgdxs)

))

- **callback** - (function) позволяет получить URL для скачивания сгенерированного XML-файла. Функция обратного вызова получает JSON-объект с полем *url*:

~~~js
gantt.exportToPrimaveraP6({
    callback: function(res){
        alert(res.url);
    }
});
~~~

- **resources** - (array) позволяет экспортировать список ресурсов в файл Primavera P6.

~~~js
gantt.exportToPrimaveraP6({
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

gantt.exportToPrimaveraP6({
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

Свойство **ResourceAssignments** может быть функцией, получающей объект задачи и возвращающей строку/число или массив строк/чисел:

~~~js
tasks: {
    ResourceAssignments: function(task){
        return [task.user, task.office];
    }
}
~~~


**Related example:** [Export Gantt with resources to Primavera P6](https://snippet.dhtmlx.com/6bfbwp8g)


- **server** - (string) задаёт API-эндпоинт для запроса экспорта. Это может быть полезно, если у вас установлен локальный сервис экспорта. По умолчанию - **https://export.dhtmlx.com/gantt**.

~~~js
gantt.exportToPrimaveraP6({
    server:"https://myapp.com/myexport/gantt"
});
~~~

## Импорт из Primavera P6


Для преобразования XML или XER-файла отправьте POST-запрос к сервису экспорта со следующими параметрами:

 - URL запроса: **https://export.dhtmlx.com/gantt**
 - Метод: **POST**
 - Content-Type: **multipart/form-data**

Параметры запроса:

 - **file** - файл Primavera P6 в формате XER или XML
 - **type** - значение "primaveraP6-parse"
 - **data** - (*необязательно*) JSON-строка с настройками импорта

Пример:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST"
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <button type="submit">Get</button>
</form>
~~~

Кроме того, можно использовать [клиентский API](api/method/importfromprimaverap6.md) следующим образом:

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


[Import Primavera P6 file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_primaverap6.html)


Здесь *file* должен быть объектом [File](https://developer.mozilla.org/en-US/docs/Web/API/File), содержащим XML или XER-файл проекта.

:::note
**gantt.importFromPrimaveraP6** требует поддержки HTML5 File API.
:::

### Ответ

Ответ возвращает JSON-объект со следующей структурой:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {}
}
~~~

- **data** - [объект данных](guides/supported-data-formats.md#json) Gantt. Каждая задача содержит такие свойства, как *id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*. Даты представлены в формате "%Y-%m-%d %H:%i".
- **config** - объект [конфигурации](api/overview/properties-overview.md) Gantt с настройками, извлечёнными из проектного файла.
- **resources** - массив объектов ресурсов (каждый с *id*, *name* и *type*), представляющих ресурсы из проектного файла.
- **worktime** - объект, содержащий настройки рабочего времени из календаря проекта.


### Настройки импорта

#### Указание единицы измерения длительности

Ожидаемую единицу измерения длительности можно указать, отправив строку **durationUnit** ("minute", "hour", "day", "week", "month", "year") на сервер.

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

Чтобы получить определённые поля проекта, отправьте на сервер параметр **projectProperties** с массивом нужных полей. Это извлечёт свойства из [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))" в свойство **config** ответа. Список поддерживаемых [свойств](guides/properties.md#projectproperties) приведён в документации.

 - **projectProperties** - массив, определяющий, какие свойства проекта включить в ответ.

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

Чтобы импортировать определённые поля задач, отправьте на сервер параметр **taskProperties** с массивом нужных полей. Это позволит извлечь свойства из [Task entities](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))." Доступные [свойства](guides/properties.md#tasksproperties) перечислены в документации.

 - **taskProperties** - массив, определяющий дополнительные свойства задач для импорта.

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

Определить тип задачи можно следующим образом: задачи с пометкой **Project** имеют свойство `Summary: "1"`, а задачи с пометкой **Milestone** - свойство `Milestone: "1"`. При импорте данных эти свойства позволяют определить тип задачи.

Вызов функции импорта выглядит так:

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

После импорта вы можете задать типы задач на основе этих свойств, как показано ниже:

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


**Related example:** [Gantt. Import Primavera P6 files. Get task type from properties](https://snippet.dhtmlx.com/y95rsxor)

))

## Ограничения на размер запроса и импорт больших файлов

Существует два API-эндпойнта для сервисов экспорта/импорта Primavera P6:

- **https://export.dhtmlx.com/gantt** - основной эндпойнт, используемый для всех методов экспорта (*exportToPDF*, *exportToPNG*, *exportToPrimaveraP6*, *importFromPrimaveraP6* и др.). Максимальный размер запроса - **10 МБ**.
- **https://export.dhtmlx.com/gantt/project** - эндпойнт, предназначенный для сервисов экспорта/импорта [MSProject](guides/export-msproject.md) и [Primavera P6](guides/export-primavera.md) (*exportToMSProject*, *importFromMSProject*, *exportToPrimaveraP6*, *importFromPrimaveraP6*). Этот эндпойнт поддерживает запросы до **40 МБ**.

Указать эндпойнт можно через свойство **server** в объекте конфигурации экспорта:

~~~js
gantt.importFromPrimaveraP6({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

Если эндпойнт не указан, по умолчанию используется <b>https://export.dhtmlx.com/gantt</b>. Следующий вызов работает аналогично:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    callback: function(project){
       // some logic
    }
});
~~~

Для обработки больших проектов, превышающих лимит в 4 МБ, используйте второй эндпойнт:

~~~js
gantt.importFromPrimaveraP6({
    server:"https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

Этот эндпойнт принимает запросы до 40 МБ и поддерживает как экспорт, так и импорт для Primavera P6. Он предназначен специально для экспорта и импорта Primavera P6.

Обратите внимание, что другие методы, например *gantt.exportToPDF((server:"https://export.dhtmlx.com/gantt/project"))*, приведут к ошибке сервера.

