---
title: "Загрузка данных"
sidebar_label: "Загрузка данных"
---

# Загрузка данных


dhtmlxGantt поддерживает два формата данных для загрузки информации:

- [XML](guides/supported-data-formats.md#xmldhtmlxgantt20);
- [JSON](guides/supported-data-formats.md#json).

Для заполнения диаграммы Gantt данными вы можете использовать методы [parse](api/method/parse.md) или [load](api/method/load.md).

~~~js
gantt.init("gantt_here");
gantt.load("tasks.json"); 
~~~


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


:::note
Предоставление некорректных данных в Gantt может привести к тому, что его древовидная структура станет циклической, что вызовет [ошибку циклической ссылки](faq.md#cyclicreferenceerror).
:::

## Загрузка из объекта {#loadingfromobject}


Если вы хотите загрузить данные напрямую из объекта, используйте метод [parse](api/method/parse.md):

**Loading from an inline data source**
~~~js
var data = {
  tasks:[
     {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:2, text:"Task #1", start_date:"02-04-2020", duration:8, parent:1},
     {id:3, text:"Task #2", start_date:"11-04-2020", duration:8, parent:1}
   ]
};
gantt.init("gantt_here");
gantt.parse(data); /*!*/   
~~~


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


:::note
Если ваши объекты данных содержат одновременно "start_date" и "end_date", но значения дат включают только дату (например, 01-12-2021, без времени), может потребоваться дополнительная настройка. Подробнее смотрите в разделе [Отображение даты окончания задачи и включительно конец периода](guides/loading.md#taskenddatedisplayampinclusiveenddates).
:::

## Загрузка с сервера {#loadingfromserver}


### На стороне клиента

Для получения данных с сервера используйте метод [load](api/method/load.md):

**gantt.html**
~~~js
gantt.init("gantt_here");
gantt.load("data.json"); /*!*/   
~~~

Метод *load* отправляет AJAX-запрос по указанному URL и ожидает ответ с данными в [одном из поддерживаемых форматов](guides/supported-data-formats.md).
Например:

**data.json**
~~~js
{
  "tasks":[
     {"id":1, "text":"Project #1", "start_date":"01-04-2020", "duration":18},
     {"id":2, "text":"Task #1", "start_date":"02-04-2020","duration":8, "parent":1},
     {"id":3, "text":"Task #2", "start_date":"11-04-2020","duration":8, "parent":1}
  ],
  "links":[
     {"id":1, "source":1, "target":2, "type":"1"},
     {"id":2, "source":2, "target":3, "type":"0"}
  ]
}
~~~

Вы можете указать формат во втором аргументе метода: "json", "xml" или "oldxml".

~~~js
gantt.load("data.xml", "xml");
~~~

### На стороне сервера

На сервере у вас может быть статический файл с данными или скрипт, который собирает данные из источника и отправляет их в ответе.
Настройка на сервере зависит от используемого вами фреймворка.

:::note
Подробные инструкции и примеры кода для различных платформ смотрите в [Интеграция с серверной стороной](guides/server-side.md#loadserverside).
:::

Например, в Node.js вы настраиваете маршрут сервера, который обрабатывает URL, по которому Gantt отправляет AJAX-запрос за данными.

~~~js
gantt.load("/data"); 
~~~

Этот маршрут должен возвращать JSON примерно такого вида:

~~~js
app.get("/data", function(req, res){
    db.query("SELECT * FROM gantt_tasks", function(err, rows){
        if (err) console.log(err);
        db.query("SELECT * FROM gantt_links", function(err, links){
            if (err) console.log(err);
            for (var i = 0; i < rows.length; i++){
                rows[i].start_date = rows[i].start_date.format("YYYY-MM-DD");
                rows[i].open = true;
            }
 
            res.send({ tasks:rows, links : links });
        });
    });
});
~~~

:::note
Все поддерживаемые форматы данных перечислены в [Поддерживаемые форматы данных](guides/supported-data-formats.md).
::: 


## Загрузка дат задач {#loadingtaskdates}


### Определение расписания задачи

Есть три способа задать расписание задачи в данных:

- start_date + duration
- start_date + end_date
- duration + end_date

Свойство, которое не указано, будет вычислено на основе двух других.


[Backward planning](https://docs.dhtmlx.com/gantt/samples/01_initialization/18_backward_planning.html)


Свойство **end_date** имеет приоритет над **duration**. Если указаны все три параметра, Gantt проигнорирует **duration** и вычислит его на основе дат начала и окончания. Например:

~~~js
{
    "id":"20", "text":"Project #2", 
    "start_date":"01-04-2025", 
    "duration":3, 
    "end_date":"05-04-2025", 
    "order":10,"progress":0.4, 
    "type": "project", "open": true
}

// На самом деле задача будет загружена с duration, вычисленным по датам начала и окончания:
{
    "id":"20", "text":"Project #2", 
    "start_date":"01-04-2025", 
    "duration":4, 
    "end_date":"05-04-2025", 
    "order":10,"progress":0.4, 
    "type": "project", "open": true
}
~~~

## Использование ISO-формата даты {#loadingdatesinisoformat}

Gantt поддерживает ISO-формат даты. Для его использования необходимо переопределить функции парсинга и форматирования дат:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

## Динамическое изменение формата даты {#changingthedateformatdynamically}

Если вы хотите изменить [формат даты](api/config/date_format.md) на лету, обновите шаблон [parse_date](api/template/parse_date.md) следующим образом:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

## Отображение даты окончания задачи и включительно конец периода {#taskenddatedisplayampinclusiveenddates}

В этом разделе объясняется, как правильно сохранять и отображать дату окончания задачи.

Сначала рассмотрим два распространённых сценария при работе с датами задач:

#### Сценарий 1

- Длительность задачи измеряется в целых днях (duration_unit="day")
- Данные задачи содержат даты начала и окончания в формате "%Y-%m-%d" или "%d-%m-%Y" (без времени)

Из-за того, как dhtmlxGantt интерпретирует и хранит даты окончания задач, результат может отличаться от ожидаемого.

Пример:

~~~js
gantt.parse({ tasks: [
    { 
        id: 1,
        text: "Task 1",
        start_date: "22-12-2021",
        end_date: "22-12-2021"
    }
]}, links:[]);

console.log(gantt.getTask(1).end_date);
// 22 декабря 2021 00:00:00

console.log(gantt.getTask(1).duration);
// 0
~~~

В этом случае даты начала и окончания совпадают, поэтому длительность задачи равна нулю.

#### Сценарий 2

- В гриде отображается End Date
- Формат даты окончания не содержит времени

~~~js
gantt.config.columns = [
    {name: "text", label: "Name", tree: true, width: 200, resize: true},
    {name: "duration", label: "Duration", width:80, align: "center", resize: true},
    {name: "start_date", label: "Start", width:80, align: "center", resize: true},
    {name: "end_date", label: "Finish", width:80, align: "center", resize: true}
];

gantt.init("gantt_here");

gantt.parse({ tasks: [
    { 
        id: 1,
        text: "Task 1",
        start_date: "02-04-2020",
        end_date: "02-04-2020"
    }
]}, links:[]);
~~~

Здесь в гриде дата окончания (end_date) отображается как 3 апреля, хотя задача фактически завершается в конце 2 апреля.

![](/img/end_date.png)

Далее объясняется, как Gantt хранит даты окончания.

### Как Gantt хранит даты окончания

Даже если часть времени не указана (duration_unit = "day"), dhtmlxGantt всегда хранит даты как объекты JavaScript Date, которые содержат компоненты времени.

Формат хранения дат окончания:

- Секунды и миллисекунды всегда равны нулю, так как Gantt не поддерживает единицы меньше одной минуты
- Дата окончания указывает на начало дня (или часа), следующего за последним активным днём (или часом). Например:
  - Задача, начинающаяся 2 апреля и длящаяся 1 день, будет иметь даты начала и окончания: "02-04-2022 00:00:00 - 03-04-2022 00:00:00". Дата окончания указывает на начало 3 апреля.
  - Задача, начинающаяся 2 апреля в 13:00 и длящаяся 1 час, будет иметь даты: "02-04-2022 13:00:00 - 02-04-2022 14:00:00". Дата окончания указывает на начало следующего часа.

Если дата окончания отображается без времени, это может ввести в заблуждение. В примере из **Сценария 2** даты выглядят как "02-04-2022 - 03-04-2022", что можно ошибочно интерпретировать как двухдневную задачу вместо однодневной.

Это стандартное поведение. Хотя оно может сбивать с толку, доступны настройки, позволяющие это изменить, о чём рассказывается в следующих разделах.

### **Как изменить поведение по умолчанию?**

**1)** Первое, чего следует избегать - это изменение фактических дат задач, хранящихся в Gantt.

Возможно, вы захотите изменить даты задач при загрузке в Gantt, например, устанавливая дату окончания как 02-04-2022 23:59:59. Тем не менее, лучше не использовать этот подход, так как это может привести к конфликтам в расчетах длительности задач и авто-планировании.

**Вместо этого рекомендуем использовать следующие методы:**

**2a)** Чтобы изменить формат отображения дат окончания задач в Gantt (например, чтобы включить дату окончания в длительность задачи), вы можете переопределить шаблон [task_end_date](api/template/task_end_date.md).

Рассмотрим задачу, начинающуюся 2 апреля 2020 года, с длительностью один день, и посмотрим, как шаблон влияет на дату окончания.

По умолчанию дата окончания задачи отображается как 3 апреля 2020 года (`03-04-2020 00:00:00`):

- [Live demo: Default format](https://snippet.dhtmlx.com/5/24f73d6ec)

![task_end_date_template_default](/img/task_end_date_template_default.png)

Но если использовать шаблон [task_end_date](api/template/task_end_date.md), та же задача будет отображаться как завершающаяся 2 апреля 2020 года:

- [Live demo: Inclusive end date format](https://snippet.dhtmlx.com/t1k1rwo7)

![task_end_date_template](/img/task_end_date_template.png)

Пример кода:

~~~js
// переопределяем конфигурацию колонок
gantt.config.columns = [
  {name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode},
  {name: "text", label: "Name", tree: true, width: 200, resize: true},
  {name: "start_date", label: "Start", width:80, align: "center", resize: true},
  {name: "end_date", label: "Finish", width:80, align: "center", resize: true}, 
  {name:"add"}
];

// переопределяем шаблон
gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};
 
var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
   if(column === "end_date"){
     return gridDateToStr(new Date(date.valueOf() - 1)); 
   }else{
     return gridDateToStr(date); 
   }
}
gantt.init("gantt_here");
~~~

Этот способ меняет отображение даты окончания задачи в гриде, заголовке lightbox и других местах, где отображается дата окончания.

Если вы используете [формат включающей даты окончания](api/template/task_end_date.md) и хотите, чтобы он корректно работал с [inline editing](guides/inline-editing.md) в гриде, потребуется создать собственный редактор для редактирования включающих дат окончания, например:

~~~js
// редактор для включающих дат окончания
// используем стандартный редактор, но переопределяем методы set_value/get_value
var dateEditor = gantt.config.editor_types.date;
gantt.config.editor_types.end_date = gantt.mixin({
    set_value: function(value, id, column, node){
        var correctedValue = gantt.date.add(value, -1, "day");
        return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
    },
    get_value: function(id, column, node) {
        var selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
        return gantt.date.add(selectedValue, 1, "day");
    },
}, dateEditor);

var textEditor = {type: "text", map_to: "text"};
var startDateEditor = {type: "date", map_to: "start_date"};
var endDateEditor = {type: "end_date", map_to: "end_date"};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};

gantt.config.columns = [
    {name: "text", label: "Name", tree: true, width: 200, editor: textEditor, 
        resize: true},
    {name: "duration", label: "Duration", width:80, align: "center", 
        editor: durationEditor, resize: true},
    {name: "start_date", label: "Start", width:140, align: "center", 
        editor: startDateEditor, resize: true},
    {name: "end_date", label: "Finish", width:140, align: "center", 
        editor: endDateEditor, resize: true}
];

// изменяем шаблоны lightbox и грида для отображения дат задач во включающем формате
gantt.templates.task_end_date = function(date){
    return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};

var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
    if(column === "end_date"){
        return gridDateToStr(new Date(date.valueOf() - 1)); 
    }else{
        return gridDateToStr(date); 
    }
}
~~~


**Related example:** [Редактор включающей даты окончания](https://snippet.dhtmlx.com/ds28tk3c)


**2b)** Если другим частям вашего приложения нужны даты окончания, сохранённые во "включающем" формате (т.е. задача, начинающаяся 2 апреля 2020 года и длящаяся один день, хранится с start_date: "02-04-2022", end_date: "02-04-2022"), потребуется дополнительная обработка дат окончания:

- добавляйте один день к датам окончания перед загрузкой данных в Gantt
- вычитайте один день из дат окончания перед сохранением изменений из Gantt обратно в хранилище данных

## Свойства данных {#dataproperties}


Источник данных для диаграммы Gantt - это объект, содержащий два основных типа информации:

- **tasks** - элементы задач.
- **links** - связи-зависимости.

### Свойства объекта задачи {#task_properties}

:::note
Полный список свойств объекта задачи приведён в статье [Task properties](guides/task-properties.md).
:::

Формат дат по умолчанию для JSON и XML данных - **"%d-%m-%Y %H:%i"** (см. [спецификацию формата даты](guides/date-format.md)).


Чтобы изменить его, используйте опцию конфигурации [date_format](api/config/date_format.md).

~~~js
gantt.config.date_format="%Y-%m-%d";
gantt.init("gantt_here");
~~~

После загрузки в Gantt свойства **start_date** и **end_date** преобразуются в объекты Date.

Если ваши форматы дат не поддерживаются конфигом [date_format](api/config/date_format.md), вы можете выполнить парсинг вручную с помощью шаблона [parse_date](api/template/parse_date.md).

### Свойства объекта связи {#link_properties}

:::note
Полный список свойств объекта связи доступен в статье [Link properties](guides/link-properties.md).
:::

### Пользовательские свойства

Вы не ограничены обязательными свойствами и можете добавлять любые пользовательские свойства в ваши элементы данных. Дополнительные свойства будут распознаны как строки и отправлены на клиентскую сторону, где вы сможете использовать их по своему усмотрению.

Примеры данных с пользовательскими свойствами смотрите [здесь](guides/supported-data-formats.md#custompropertiesindata).

## Структура базы данных {#databasestructure}


Для работы с базой данных рекомендуется использовать две отдельные таблицы: одну для задач, другую - для связей.

![tutorial_db_tables](/img/tutorial_db_tables.png)

Типичная структура базы данных для загрузки задач и связей в диаграмму Gantt выглядит так:

<ul>
  <li><b>gantt_tasks</b> - таблица для хранения задач Gantt</li>
  <ul>
  <li><b>id</b> - (<i>string,number</i>) идентификатор задачи.</li>
  <li><b>start_date</b> - (<i>Date</i>) дата начала задачи.</li>
  <li><b>text</b> - (<i>string</i>) описание задачи.</li>
  <li><b>progress</b> - (<i>number</i>) от 0 до 1, процент выполнения задачи.</li>
  <li><b>duration</b> - (<i>number</i>) длительность задачи в текущих единицах времени.</li>
  <li><b>parent</b> - (<i>number</i>) идентификатор родительской задачи.</li>
  <li><b>type</b> - (<i>string</i>) необязательное, [тип задачи](guides/task-types.md).</li>
  <li><b>readonly</b> - (<i>boolean</i>) необязательное, помечает задачу как [только для чтения](guides/readonly-mode.md#readonlymodeforspecifictaskslinks).</li>
  <li><b>editable</b> - (<i>boolean</i>) необязательное, помечает задачу как [доступную для редактирования](guides/readonly-mode.md#readonlymodeforspecifictaskslinks).</li>
  </ul>
  <li><b>gantt_links</b> - таблица для хранения связей Gantt</li>
  <ul><li><b>id</b> - (<i>string,number</i>) идентификатор связи.</li><li><b>source</b> - (<i>number</i>) идентификатор исходной задачи.</li><li><b>target</b> - (<i>number</i>) идентификатор целевой задачи.</li><li><b>type</b> - (<i>string</i>) тип зависимости:<ul><li>0 - 'finish_to_start'</li><li>1 - 'start_to_start'</li> <li>2 - 'finish_to_finish'</li><li>3 - 'start_to_finish'</li></ul> </li> <li><b>lag</b> - (<i>number</i>) необязательное, [лаг задачи](guides/auto-scheduling.md#settinglagandleadtimesbetweentasks).</li><li><b>readonly</b> - (<i>boolean</i>) необязательное, помечает связь как [только для чтения](guides/readonly-mode.md).</li><li><b>editable</b> - (<i>boolean</i>) необязательное, помечает связь как [доступную для редактирования](guides/readonly-mode.md).</li></ul>
</ul> 

Для создания этих двух таблиц используйте следующий SQL:

~~~js
CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
)
CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL,
  `sortorder` int(11) NOT NULL,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
)
~~~


## Поток событий {#eventsflow}


Ниже представлен поток событий, связанных с методами загрузки:


### [gantt.parse()](api/method/parse.md):

- событие [onBeforeParse](api/event/onbeforeparse.md) 
- событие [onTaskLoading](api/event/ontaskloading.md) 
- событие [onParse](api/event/onparse.md)  
- [gantt.render()](api/method/render.md)

### [gantt.load()](api/method/load.md)

- событие [onLoadStart](api/event/onloadstart.md) 
- [gantt.parse()](api/method/parse.md)
- событие [onLoadEnd](api/event/onloadend.md) 

### [gantt.refreshData()](api/method/refreshdata.md):

- событие [onBeforeDataRender](api/event/onbeforedatarender.md) 
- событие [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 
- событие [onDataRender](api/event/ondatarender.md) 

### [gantt.render()](api/method/render.md):

- событие [onBeforeGanttRender](api/event/onbeforeganttrender.md) 
- [gantt.refreshData()](api/method/refreshdata.md)
- событие [onGanttRender](api/event/onganttrender.md)

