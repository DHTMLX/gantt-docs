---
title: "Загрузка данных"
sidebar_label: "Загрузка данных"
---

# Загрузка данных

dhtmlxGantt может принимать данные в двух форматах:

- [XML](guides/supported-data-formats.md#xmldhtmlxgantt20);
- [JSON](guides/supported-data-formats.md).

Чтобы загрузить данные в диаграмму Ганта, используйте метод [parse] или [load].

~~~js
gantt.init("gantt_here");
gantt.load("tasks.json"); 
~~~

**Связанный пример**: [Базовая инициализация](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)

:::note
Если вы передадите неверные данные в Gantt, его древовидная структура станет циклической, что вызывает [cyclic reference error](faq.md#cyclic-reference-error).
:::

## Загрузка из объекта

Чтобы загрузить данные из объекта, используйте метод [parse]:

~~~jsx title="Загрузка из встроенного источника данных"
const data = {
    tasks: [
        { id: 1, text: "Project #1", start_date: "01-12-2025", duration: 18 },
        { id: 2, text: "Task #1",    start_date: "02-12-2025", duration: 8, parent: 1 },
        { id: 3, text: "Task #2",    start_date: "11-12-2025", duration: 8, parent: 1 }
    ]
};

gantt.init("gantt_here");
gantt.parse(data); /*!*/ 
~~~


**Связанный пример**: [Базовая инициализация](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)

:::note
Если ваши объекты данных содержат как значения start_date, так и end_date и даты содержат только часть даты (т.е. 01-12-2025, без 00:00) — может потребоваться дополнительная настройка. Обязательно ознакомьтесь со статьей [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates).
:::

## Загрузка с сервера

### Клиентская сторона

Чтобы загрузить данные с сервера, используйте метод [load]:

~~~jsx title="gantt.html"
gantt.init("gantt_here");
gantt.load("data.json"); /*!*/   
~~~

Метод *load* отправит AJAX-запрос на указанный URL и ожидает ответ с данными в одном из поддерживаемых форматов ([guides/supported-data-formats.md](guides/supported-data-formats.md)).
Например:

~~~jsx title="data.json"
{
    "tasks": [
        { "id": 1, "text": "Project #1", "start_date": "01-12-2025", "duration": 18 },
        { "id": 2, "text": "Task #1", "start_date": "02-12-2025", "duration": 8,"parent": 1 },
        { "id": 3, "text": "Task #2", "start_date": "11-12-2025", "duration": 8, "parent": 1 }
    ],
    "links": [
        { "id": 1, "source": 1, "target": 2, "type": "1" },
        { "id": 2, "source": 2, "target": 3, "type": "0" }
    ]
}
~~~

Формат задаётся вторым аргументом метода: "json", "xml" или "oldxml".

~~~js
gantt.load("data.xml", "xml");
~~~

### Серверная сторона

На сервере вы можете иметь либо статический файл с данными, либо скрипт, который будет собирать данные из источника данных и записывать их в ответ.
Реализация на стороне сервера зависит от выбранного вами фреймворка. 

:::note
Смотрите подробные инструкции и примеры кода для различных платформ в статье [](guides/server-side.md#loadserverside).
:::

Например, в случае Node.js следует добавить маршрут сервера для URL, по которому Gantt будет отправлять AJAX-запрос за данными.

~~~js
gantt.load("/data"); 
~~~

Он сгенерирует соответствующий ответ в формате JSON. 

~~~js
app.get("/data", (req, res) => {
    db.query("SELECT * FROM gantt_tasks", (err, tasks) => {
        if (err) console.log(err);

        db.query("SELECT * FROM gantt_links", (err, links) => {
            if (err) console.log(err);

            tasks.forEach((task) => {
                task.start_date = task.start_date.format("YYYY-MM-DD");
                task.open = true;
            });

            res.send({ tasks, links });
        });
    });
});
~~~

:::note
См. все поддерживаемые форматы данных в статье [Supported Data Formats](guides/supported-data-formats.md).
:::

## Загрузка дат задач {#loadingtaskdates}

### Установка графика задачи

Существует три способа задать график задачи в наборе данных:

- start_date + duration
- start_date + end_date
- duration + end_date

Свойство, которое не указано, будет вычислено на основе заданных в объекте данных.

**Связанный пример**: [Backward planning](https://docs.dhtmlx.com/gantt/samples/01_initialization/18_backward_planning.html)

Глобальная концепция: у end_date выше приоритет над параметром duration. Если в задаче указаны три параметра, Gantt проигнорирует параметр duration и задача загрузится с другим значением длительности. Например:

~~~js {4,13}
{
    "id": "20", "text": "Project #2",
    "start_date": "01-12-2025",
    "duration": 3, 
    "end_date": "05-12-2025",
}

// задача выше будет загружена с длительностью, вычисленной в соответствии
// с указанными 'start_date' и 'end_date'
{
    "id": "20", "text": "Project #2",
    "start_date": "01-12-2025",
    "duration": 4, 
    "end_date": "05-12-2025",
}
~~~

## Загрузка дат в ISO-формате

С версии 9.1.3 Gantt автоматически распознаёт и парсит даты ISO 8601. Конфигурация не требуется.

Поддерживаемые форматы:

- `2026-01-06` - только дата
- `2026-01-06T10:30:00` - дата и время
- `2026-01-06T10:30:00.000` - дата и время с миллисекундами
- `2026-01-06T10:30:00.000Z` - UTC
- `2026-01-06T10:30:00+02:00` - с часовым поясом

~~~js
gantt.parse({
    tasks: [
        { id: 2, text: "Task #1", start_date: "2026-01-06T10:30:00Z", duration: 3 }
    ],
    links: []
});
— ISO-даты распознаются автоматически — отключения шаблонов не требуются
~~~

Когда на входе обнаружены ISO-даты, они автоматически сериализуются обратно в ISO-строки, когда передаются в [DataProcessor](guides/server-side.md). Строки с только датой (например, `"2026-01-06"`) сериализуются обратно как строки даты, сохраняя исходный формат. Если вход содержит смесь строк только даты и полных дат и времени, все даты сериализуются как полные дату и время.

:::note
Строки только даты (например, `"2026-01-06"`) парсятся как локальная полночь, когда `server_utc` установлен в `false` (значение по умолчанию).
:::

:::note
Если вы явно переопределите `gantt.templates.parse_date` или `gantt.templates.format_date`, ваши функции получают приоритет над автоматическим обнаружением ISO и автоматической сериализацией.
:::

:::tip Gantt v9.1.2 и ранее
В версиях до v9.1.3 ISO-даты не распознавались автоматически. Если вы используете более старую версию, вам нужно переопределить шаблоны `parse_date` и `format_date`, чтобы обрабатывать ISO-строки:

~~~js
gantt.templates.parse_date = (date) => {
    return new Date(date);
};

gantt.templates.format_date = (date) => {
    return date.toISOString();
};
~~~

В версиях 9.1.3+ эти шаблоны всё ещё используются как запасной вариант для не-ISO строк дат. См. [gantt.date.parseDate()](api/other/date.md#parsedatedate-format) для полного конвейера разбора.
:::

## Динамическое изменение формата даты

Если вам нужно динамически изменить [date format](api/config/date_format.md), необходимо изменить шаблон [parse_date](api/template/parse_date.md) следующим образом:

~~~js
const cfg = gantt.config;
const strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = (date) => {
    return strToDate(date);
};
~~~

## Отображение конечной даты задачи и Инклюзивная конечная дата {#taskenddatedisplayampinclusiveenddates}

Этот раздел ответит на вопрос: «Как правильно сохранить и отобразить конечную дату задачи?».

Во-первых, рассмотрим два возможных сценария, с которыми вы можете столкнуться при работе с датами задач:

#### Сценарий 1

- Когда продолжительность задачи измеряется целыми днями (duration_unit="day")
- Когда объекты данных задачи содержат начальные и конечные даты в формате "%Y-%m-%d" или "%d-%m-%Y" (то есть без части часа)

Из-за нюансов того, как dhtmlxGantt интерпретирует и сохраняет конечные даты задач, результат может оказаться неожиданным.

Посмотрите следующий пример:

~~~js
gantt.parse({
    tasks: [
        { 
            id: 1,
            text: "Task 1",
            start_date: "22-12-2025",
            end_date: "22-12-2025"
        }
    ],
    links: []
});

console.log(gantt.getTask(1).end_date);
// 22 December 2025 00:00:00

console.log(gantt.getTask(1).duration);
// 0
~~~

В этом примере и начальная, и конечная даты относятся к одной точке времени, и длительность задачи будет равна 0.

#### Сценарий 2

- Когда конечная дата задачи отображается в гриде
- И формат конечной даты не содержит части часа и минут

~~~js
gantt.config.columns = [
    { name: "text", label: "Name", tree: true, width: 200, resize: true },
    { name: "duration", label: "Duration", width: 80, align: "center", resize: true },
    { name: "start_date", label: "Start", width: 80, align: "center", resize: true },
    { name: "end_date", label: "Finish", width: 80, align: "center", resize: true }
];

gantt.init("gantt_here");

gantt.parse({
    tasks: [
        { 
            id: 1,
            text: "Task 1",
            start_date: "22-12-2025",
            end_date: "23-12-2025"
        }
    ],
    links: []
});
~~~

В этом примере дата окончания (end_date) указана как 23 декабря, тогда как задача заканчивается в конце 22 декабря.

![end_date](/img/end_date.png)

Далее мы поясним, как Gantt хранит конечные даты.

### Как Gantt хранит конечные даты

Даже если не задавать часть часа и минуты для даты задачи (duration_unit = "day"), dhtmlxGantt всегда сохраняет её как JS Date, который имеет часть часов, минут, секунд и миллисекунд на клиентской стороне.

Текущий формат конечных дат следующий:

- секунды и миллисекунды даты всегда равны 0; Gantt не поддерживает единицы менее минуты
- конец даты задачи задаётся как начало дня ("day-hour-minute") следующего за последним рабочим днём ("day-hour-minute"). То есть:
  - задача, которая начинается 22 декабря и длится 1 день, будет иметь начало и конец: "22-12-2025 00:00:00 - 23-12-2025 00:00:00". Конечная дата совпадает с началом следующего дня после 22 декабря
  - задача, которая начинается 22 декабря в 13:00 и длится 1 час, будет иметь начало и конец: "22-12-2025 13:00:00 - 22-12-2025 14:00:00". Конечная дата совпадает с началом следующего часа

Если показывать конечную дату на экране без указания части часа и минут, результат может быть введён в заблуждение. В примере из **сценария 2** начальная и конечная даты будут выглядеть как *"22-12-2025 - 23-12-2025"*. Это может заставить подумать, что задача длится не 1 день, а 2 (с 22 по 23 декабря).

Это поведение по умолчанию и может запутать, но есть возможность исправить его через конфигурацию. В следующей части мы покажем несколько способов решения.

### Как изменить поведение по умолчанию

**1)** Первое, что вы *не должны делать*, — изменять фактические даты задач, которые хранятся в Gantt.

Также можно изменить даты задач, которые загружаются в диаграмму Gantt, например, задать окончания как 22-12-2025 23:59:59. Но *лучше так не делать*, потому что такие решения могут конфликтовать с вычислением длительности задач и автоматическим планированием.

**Вместо этого рекомендуем использовать следующие методы:**

**2a)** Чтобы изменить формат конечных дат задач в диаграмме Gantt (то есть включать конечную дату в длительность задач), вы можете переопределить шаблон [task_end_date](api/template/task_end_date.md).

Возьмём задачу, которая начинается 22 декабря 2025 года и длится один день, и рассмотрим, как шаблон может изменить конечную дату.

По умолчанию конечная дата этой задачи должна отображаться как 23 декабря 2025 года (`23-12-2025 00:00:00`):

- [Live demo: Default format](https://snippet.dhtmlx.com/kht2sx3z)

![task_end_date_template_default](/img/task_end_date_template_default.png)

Но если вы примените шаблоны [task_end_date](api/template/task_end_date.md) и [grid_date_format](api/template/grid_date_format.md), та же задача будет завершена 22 декабря 2025 года:

- [Live demo: Inclusive end date format](https://snippet.dhtmlx.com/t1k1rwo7)

![task_end_date_template](/img/task_end_date_template.png)

Код выглядит так:

~~~js
// Переопределение шаблона
gantt.templates.task_end_date = (date) => {
    return gantt.templates.task_date(new Date(date.valueOf() - 1));
};

const gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");

gantt.templates.grid_date_format = (date, column) =>  {
    if (column === "end_date") {
        return gridDateToStr(new Date(date.valueOf() - 1));
    } else {
        return gridDateToStr(date);
    }
};

gantt.init("gantt_here");
~~~ 

Такой подход позволяет изменить дату окончания задачи, отображаемую в гриде, заголовке лайтбокса и в любых других местах, где нужно показывать конечную дату.

Если вы используете [format for inclusive end dates](api/template/task_end_date.md) для задач и хотите корректной работы с [inline editing](guides/inline-editing.md) в гриде, вам нужно создать специальный редактор для редактирования инклюзивных конечных дат задач, например:

~~~js
// Inclusive editor for end dates
// Use the default editor, but override the set_value/get_value methods
const dateEditor = gantt.config.editor_types.date;

gantt.config.editor_types.end_date = gantt.mixin(
    {
        set_value: (value, id, column, node) => {
            const correctedValue = gantt.date.add(value, -1, "day");
            return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
        },
        get_value: (id, column, node) => {
            const selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
            return gantt.date.add(selectedValue, 1, "day");
        },
    },
    dateEditor
);

const textEditor = { type: "text", map_to: "text" };
const startDateEditor = { type: "date", map_to: "start_date" };
const endDateEditor = { type: "end_date", map_to: "end_date" };
const durationEditor = { type: "number", map_to: "duration", min: 0, max: 100 };

gantt.config.columns = [
    { name: "text", label: "Name", tree: true, width: 200, editor: textEditor, resize: true },
    { name: "duration", label: "Duration", width: 80, align: "center", editor: durationEditor, resize: true },
    { name: "start_date", label: "Start", width: 140, align: "center", editor: startDateEditor, resize: true },
    { name: "end_date", label: "Finish", width: 140, align: "center", editor: endDateEditor, resize: true }
];

// Change lightbox and grid templates to display dates of tasks in an inclusive format
gantt.templates.task_end_date = (date) => {
    return gantt.templates.task_date(new Date(date.valueOf() - 1));
};

const gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");

gantt.templates.grid_date_format = (date, column) => {
    if (column === "end_date") {
        return gridDateToStr(new Date(date.valueOf() - 1));
    } else {
        return gridDateToStr(date);
    }
};
~~~

**2b)** Если другие части приложения требуют хранения конечных дат в формате "inclusive" — т.е. задача, начинающаяся 22 декабря 2025 года и длительная 1 день, должна храниться как start_date: "22-12-2025", end_date: "22-12-2025" — вам необходимо реализовать дополнительную обработку конечных дат, а именно:

- прибавлять один день к конечным датам перед загрузкой данных в Gantt
- вычитать один день из конечных дат перед сохранением изменений, полученных из Gantt, обратно в хранилище данных

## Свойства данных {#dataproperties}

Источник данных для диаграммы Гantt — это объект, который хранит 2 типа информации:

- **tasks** - элементы задач.
- **links** - элементы зависимостей.

### Свойства объекта задачи {#task_properties}

:::note
Полный список свойств объекта задачи приведён в статье [Свойства задачи](guides/task-properties.md).
::: 

Формат даты по умолчанию для данных JSON и XML — **"%d-%m-%Y %H:%i"** (см. [спецификация формата даты](/guides/date-format/)).

Чтобы изменить его, используйте настройку [date_format](api/config/date_format.md).

~~~js
gantt.config.date_format="%Y-%m-%d";
gantt.init("gantt_here");
~~~

После загрузки в Gantt свойства **start_date** и **end_date** будет разобраны как тип Date. 

Форматы дат, не поддерживаемые конфигурацией [date_format], можно разобрать вручную через шаблон [parse_date](api/template/parse_date.md).

### Свойства объекта ссылки {#link_properties}

:::note
Полный перечень свойств объекта ссылки приведён в статье [Свойства ссылки](guides/link-properties.md).
::: 

### Пользовательские свойства

Вы не ограничены обязательными свойствами, указанными выше, и можете добавлять любые пользовательские свойства к элементам данных. 
Дополнительные свойства данных будут разобраны как строки и загружены на клиентскую сторону, где вы сможете использовать их по мере необходимости.

См. примеры данных с пользовательскими свойствами [здесь](/guides/supported-data-formats#custom-properties-in-data).

## Структура базы данных {#databasestructure}

Если вы используете базу данных, рекомендуется иметь 2 отдельные таблицы для хранения данных: одну для задач и одну для связей. 

![tutorial_db_tables](/img/tutorial_db_tables.png)

Структура стандартной базы данных для загрузки задач и связей в диаграмму Гantt:

<ul>
  <li><b>gantt_tasks</b> таблица - содержит задачи диаграммы Ганта</li>
  <ul>
  <li><b>id</b> - (<i>string,number</i>) идентификатор события.</li>
  <li><b>start_date</b> - (<i>Date</i>) дата, когда задача должна начаться. </li>
  <li><b>text</b> - (<i>string</i>) описание задачи.</li>
  <li><b>progress</b> - (<i>number</i>) число от 0 до 1, показывающее, какой процент задачи закончен. </li>
  <li><b>duration</b> - (<i>number</i>) длительность задачи в единицах текущей временной шкалы. </li>
  <li><b>parent</b> - (<i>number</i>) идентификатор родительской задачи. </li>
  <li><b>type</b> - (<i>string</i>) необязателен, [тип задачи](guides/task-types.md). </li>
  <li><b>readonly</b> - (<i>boolean</i>) необязателен, можно пометить задачу как [readonly](guides/readonly-mode.md#readonlymodeforspecifictaskslinks). </li>
  <li><b>editable</b> - (<i>boolean</i>) необязателен, можно пометить задачу как [editable](guides/readonly-mode.md#readonlymodeforspecifictaskslinks). </li>
  </ul>
  <li><b>gantt_links</b> таблица - задаёт связи зависимостей диаграммы Гantt</li>
  <ul>
  <li><b>id</b> - (<i>string</i>) идентификатор события.</li>
  <li><b>source</b> - (<i>number</i>) идентификатор исходной задачи. </li>
  <li><b>target</b> - (<i>number</i>) идентификатор целевой задачи. </li>
  <li><b>type</b> - (<i>string</i>) тип зависимости:<ul><li>0 - 'finish_to_start'</li><li>1 - 'start_to_start'</li> <li>2 - 'finish_to_finish'</li><li>3 - 'start_to_finish'</li></ul> </li> 
  <li><b>lag</b> - (<i>number</i>) необязателен, [задержка задачи](/guides/auto-scheduling#settinglagandleadtimesbetweentasks). </li>
  <li><b>readonly</b> - (<i>boolean</i>) необязателен, можно пометить связь как [readonly](guides/readonly-mode.md). </li>
  <li><b>editable</b> - (<i>boolean</i>) необязателен, можно пометить связь как [editable](guides/readonly-mode.md). </li>
  </ul>
</ul> 

Используйте следующий SQL-запрос для создания базы данных с двумя упомянутыми таблицами:

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

## Потоки событий {#eventsflow}

Методы загрузки имеют следующий поток событий:

#### [gantt.parse()](api/method/parse.md):

- [onBeforeParse](api/event/onbeforeparse.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onParse](api/event/onparse.md)
- [render](api/method/render.md)

#### [gantt.load()](api/method/load.md):

- [onLoadStart](api/event/onloadstart.md)
- [parse](api/method/parse.md)
- [onLoadEnd](api/event/onloadend.md)

#### [gantt.refreshData()](api/method/refreshdata.md):

- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)
- [onDataRender](api/event/ondatarender.md)

#### [gantt.render()](api/method/render.md):

- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [refreshData](api/method/refreshdata.md)
- [onGanttRender](api/event/onganttrender.md)