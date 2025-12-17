---
title: "Интеграция с серверной стороной"
sidebar_label: "Интеграция с серверной стороной"
---

Интеграция с серверной стороной
==============================

Лучший способ подключить dhtmlxGantt к серверу - настроить RESTful API на серверной стороне и использовать модуль [dataprocessor](api/other/dataprocessor.md) на стороне клиента.

DataProcessor - это встроенная функция, которая отслеживает изменения данных в Gantt и отправляет обновления в REST API в необходимом формате. Это делает [интеграцию с серверными платформами](integrations/howtostart-guides.md) простой и удобной. При работе с объектным источником данных DataProcessor может быть настроен для предоставления callback-функций при изменении данных, что удобно для data binding.

Также есть видеоурок, демонстрирующий, как создать диаграмму Gantt и загрузить в неё данные на примере Node.js.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Техника {#technique}
----------------------------------------------

В целом, чтобы загрузить данные с сервера с помощью REST API, необходимо:

### Клиентская сторона

1) Используйте метод [load](api/method/load.md) для загрузки данных Gantt, указав URL, который возвращает данные в формате [JSON](guides/supported-data-formats.md#json).

2) Создайте экземпляр DataProcessor одним из двух способов:

- Инициализируйте DataProcessor и свяжите его с объектом dhtmlxGantt:

~~~js
gantt.init("gantt_here");
gantt.load("apiUrl");

// сохраняйте порядок строк ниже
const dp = new gantt.dataProcessor("apiUrl");
dp.init(gantt);
dp.setTransactionMode("REST");
dp.deleteAfterConfirmation = true;
~~~

:::note
Рекомендуется использовать второй способ.
:::

- Используйте метод [createDataProcessor](api/method/createdataprocessor.md), передав объект с параметрами конфигурации:

~~~js
const dp = gantt.createDataProcessor({
    url: "apiUrl",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

Подробнее см. в следующем разделе.


###  Создание DataProcessor {#createdp}

При создании DataProcessor через API-метод [createDataProcessor](api/method/createdataprocessor.md) есть несколько способов передачи параметров.

1. Используйте один из предопределённых режимов запроса, например:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

где:

- **url** - конечная точка на сервере
- **mode** - способ отправки данных на сервер: "GET" | "POST" | "REST" | "JSON" | "REST-JSON"
- **deleteAfterConfirmation** - определяет, должен ли таск быть удалён из Gantt только после подтверждения удаления сервером. Связи и подзадачи будут удалены после подтверждения удаления родительской задачи.

2. Передайте собственный объект **router**:

~~~js
const dp = gantt.createDataProcessor(router);
~~~

- где **router** может быть функцией:

~~~js
// entity - "task"|"link"|"resource"|"assignment"
// action - "create"|"update"|"delete"
// data - объект с данными задачи или связи
// id – id обрабатываемого объекта (задача или связь)
const dp = gantt.createDataProcessor((entity, action, data, id) => { 
    switch(action) {
        case "create":
        return gantt.ajax.post(
                server + "/" + entity,
                data
        );
        break;
        case "update":
        return gantt.ajax.put(
                server + "/" + entity + "/" + id,
                data
            );
        break;
        case "delete":
        return gantt.ajax.del(
                server + "/" + entity + "/" + id
        );
        break;
    }
});
~~~

- или объект, структурированный следующим образом:

~~~js
const dp = gantt.createDataProcessor({
    task: {
        create: (data) => {},
        update: (data, id) => {},
        delete: (id) => {}
    },
    link: {
        create: (data) => {},
        update: (data, id) => {},
        delete: (id) => {}
    }
});
~~~

Все функции в объекте **router** должны возвращать либо Promise, либо объект с данными ответа. Это позволяет dataProcessor применить id из базы данных и вызвать событие **onAfterUpdate**.

~~~js
const router = (entity, action, data, id) => {
    return new gantt.Promise((resolve, reject) => {
        // … некоторая логика
        return resolve({ tid: databaseId });
    });
};
~~~

Такая гибкость позволяет использовать DataProcessor для сохранения данных в localStorage или любое другое хранилище, не привязанное к конкретному URL, либо когда создание и удаление обрабатываются разными серверами.


[Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### Детали запросов и ответов {#requestresponsedetails}

URL-адреса имеют следующий шаблон:

- api/link/id
- api/task/id
- api/resource/id
- api/assignment/id

где "api" - это URL, указанный в конфигурации dataProcessor.

Вот список возможных запросов и ответов:

<table class="dp_table">
  <tr>
  <th><b>Действие</b></th><th><b>HTTP-метод</b></th><th><b>URL</b></th><th><b>Ответ</b></th>
  </tr>
  <tr>
  <td>загрузка данных</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON формат](guides/supported-data-formats.md#json)</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Задачи</td></tr>
  <tr>
  <td>добавить новую задачу</td>
  <td>POST</td>
  <td>/apiUrl/task</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>обновить задачу</td>
  <td>PUT</td>
  <td>/apiUrl/task/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>удалить задачу</td>
  <td>DELETE</td>
  <td>/apiUrl/task/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Связи</td></tr>
  <tr>
  <td>добавить новую связь</td>
  <td>POST</td>
  <td>/apiUrl/link</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>обновить связь</td>
  <td>PUT</td>
  <td>/apiUrl/link/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>удалить связь</td>
  <td>DELETE</td>
  <td>/apiUrl/link/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Ресурсы</td></tr>
  <tr>
  <td>добавить новый ресурс</td>
  <td>POST</td>
  <td>/apiUrl/resource</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>обновить ресурс</td>
  <td>PUT</td>
  <td>/apiUrl/resource/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>удалить ресурс</td>
  <td>DELETE</td>
  <td>/apiUrl/resource/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Назначения ресурсов</td></tr>
  <tr>
  <td>добавить новое назначение</td>
  <td>POST</td>
  <td>/apiUrl/assignment</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>обновить назначение</td>
  <td>PUT</td>
  <td>/apiUrl/assignment/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>удалить назначение</td>
  <td>DELETE</td>
  <td>/apiUrl/assignment/id</td>
  <td>("action":"deleted")</td>
  </tr>
</table>

:::note
По умолчанию ресурсы и назначения ресурсов не включаются в запросы DataProcessor. Чтобы включить их, необходимо явно это разрешить.
Подробнее см. [здесь](guides/server-side.md#resources_crud).
:::


### Параметры запроса {#requestparams}

Запросы на создание, обновление и удаление включают все публичные свойства клиентского объекта задачи или связи:

Задача:

- **start_date**: 2025-04-08 00:00:00
- **duration**: 4
- **text**: Task #2.2
- **parent**: 3
- **end_date**: 2025-04-12 00:00:00

Связь:

- **source**: 1
- **target**: 2
- **type**: 0

Примечание:

- Формат **start_date** и **end_date** задаётся конфигурацией [date_format](api/config/date_format.md).
- Клиент отправляет все публичные свойства задачи или связи, поэтому запросы могут содержать дополнительные параметры.
- Если вы добавляете новые колонки или свойства в свою модель данных, gantt автоматически отправит их на сервер.

:::note
Публичные свойства - это те, чьи имена не начинаются с подчёркивания (**_**) или знака доллара (**$**),
поэтому свойства вроде **task._owner** или **link.$state** не будут отправлены на сервер.
:::


### Режим REST-JSON {#restjson}

Помимо режимов "POST", "GET", "REST" и "JSON", Gantt DataProcessor также поддерживает режим "REST-JSON".

~~~js
gantt.load("apiUrl");

const dp = gantt.createDataProcessor({
    url: "/apiUrl",
    mode: "REST-JSON"
});
~~~

Используются те же [URL для запросов](#requestresponsedetails), но способ передачи параметров отличается.

В режиме REST данные отправляются как form data:

~~~
Content-Type: application/x-www-form-urlencoded
~~~

В режиме REST-JSON данные отправляются в формате JSON:

**Headers**
~~~
Content-type: application/json
~~~

Параметры передаются как JSON-объект:

**Request Payload**

- Задача

~~~
{
    "start_date": "20-09-2025 00:00",
    "text": "New task",
    "duration": 1,
    "end_date": "21-09-2025 00:00",
    "parent": 0,
    "usage": [
        { "id": "1", "value": "30" },
        { "id": "2", "value": "20" }
    ]
}
~~~

- Связь

~~~js
{
    "source": 1,
    "target": 2,
    "type": "0"
}
~~~

Этот формат упрощает обработку сложных записей на сервере.


### Серверная сторона {#loadserverside}

При каждом изменении в Gantt (добавление, обновление или удаление задач или связей) dataProcessor отправляет AJAX-запрос на сервер.

Каждый запрос содержит все необходимые данные для обновления базы данных.
Поскольку dataProcessor работает в режиме REST, используются различные HTTP-методы в зависимости от операции.

REST API позволяет реализовать серверную часть с помощью различных фреймворков и языков программирования.
Вот некоторые готовые серверные реализации для интеграции с Gantt:

- [dhtmlxGantt с ASP.NET Core 2](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)


## Сохранение порядка задач {#storingtheorderoftasks}
-------------------------------------------------

Gantt отображает задачи в том порядке, в котором они приходят из источника данных. Если пользователи могут [перемещать задачи вручную](guides/reordering-tasks.md#draganddropacrosstheentireganttstructure),
вам нужно сохранять этот порядок в базе данных и возвращать задачи отсортированными в вашем фиде данных.

Клиентская настройка:

~~~js
// перемещение задач по всему gantt
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
gantt.load("/api");

const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

Есть несколько способов сохранить порядок; вот один из примеров.

- Добавьте числовую колонку в таблицу задач, например, 'sortorder'.
- При обработке GET-запроса сортируйте задачи по этой колонке по возрастанию.
- При добавлении новой задачи присваивайте ей `MAX(sortorder) + 1`.
- При изменении порядка на клиенте gantt отправляет PUT (или POST, если не используется REST-режим) со всеми свойствами задачи плюс значениями, описывающими положение задачи в структуре проекта.

<table class="dp_table">
  <tr>
  <th><b>HTTP-метод</b></th><th><b>URL</b></th><th><b>Параметры</b></th><th><b>Ответ</b></th>
  </tr>
  <tr>
  <td>PUT</td>
  <td>/apiUrl/task/taskId</td>
  <td><b>target=</b>adjacentTaskId</td>
  <td>("action":"updated")</td>
  </tr>
</table>

Параметр <b>target</b> содержит id ближайшей задачи - непосредственно перед или после текущей.

Его значение может быть в двух форматах:

 - *target="targetId*"  - поместить текущую задачу прямо <b>перед</b> задачей с targetId
 - *target="next:targetId*" - поместить текущую задачу прямо <b>после</b> задачи с targetId

Применение изменений порядка обычно требует обновления нескольких задач. Вот пример псевдокода:

~~~js
const target = request["target"];
const currentTaskId = request["id"];
let nextTask;
let targetTaskId;

// Определяем, помещается ли задача до или после соседней
if (target.startsWith("next:")) {
  targetTaskId = target.substr("next:".length);
  nextTask = true;
} else {
  targetTaskId = target;
  nextTask = false;
}

const currentTask = tasks.getById(currentTaskId);
const targetTask = tasks.getById(targetTaskId);

if (!targetTaskId) return;

// Присваиваем sortorder соседней задачи обновляемой задаче
let targetOrder = targetTask.sortorder;

// Если помещаем после соседней задачи - увеличиваем sortorder
if (nextTask) targetOrder++;

// Увеличиваем sortorder у задач, следующих за обновляемой
tasks.where(task => task.sortorder >= targetOrder)
    .update(task => task.sortorder++);

// Обновляем задачу с новым sortorder
currentTask.sortorder = targetOrder;

tasks.save(currentTask);
~~~

Подробные примеры сохранения порядка задач для конкретных серверных платформ: 
[plain PHP](integrations/php/howtostart-php.md#storingtheorderoftasks), [Laravel](integrations/php/howtostart-php-laravel.md#storingtheorderoftasks),
[Node.js](integrations/node/howtostart-nodejs.md#storingtheorderoftasks), [ASP.NET Web API](integrations/dotnet/howtostart-dotnet.md#storingtheorderoftasks) и
[Rails](integrations/other/howtostart-ruby.md#storingtheorderoftasks).


## Пользовательские заголовки и параметры запроса {#customrequestheadersandparameters}
----------------

### Добавление пользовательских заголовков запроса

Можно добавить дополнительные заголовки в запросы, отправляемые на ваш backend. Например, вы можете добавить токен авторизации в ваши запросы:

~~~js
gantt.init("gantt_here");
gantt.load("/api");
 
const dp = gantt.createDataProcessor({
    url: "/api",
    mode:"REST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

В настоящее время [load](api/method/load.md) не поддерживает передачу заголовков или параметров payload для GET-запросов, поэтому если вам нужно их добавить, потребуется отправить xhr вручную и затем загрузить данные в Gantt с помощью [parse](api/method/parse.md), например так:

~~~js
gantt.ajax.get({
    url: "/api",
    headers: {
        "Authorization": "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
}).then(xhr => {
    gantt.parse(xhr.responseText);
});
~~~


### Добавление пользовательских параметров в запрос

Существует несколько способов добавить дополнительные параметры в ваши запросы.

Поскольку Gantt отправляет все свойства объекта данных обратно на backend, вы можете просто добавить новое свойство непосредственно в объект данных, и оно будет включено в запрос:

~~~js
gantt.attachEvent("onTaskCreated", (task) => {
    task.userId = currentUser;
    return true;
});
~~~

Другой вариант - добавить пользовательские параметры ко всем запросам, отправляемым data processor, используя свойство **payload**:

~~~js
gantt.init("gantt_here");
gantt.load("/api");

const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
    payload: {
        token: "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
    }
});
~~~

Также можно добавить пользовательские параметры к запросам с помощью события [onBeforeUpdate](api/other/dataprocessor.md#onbeforeupdate) объекта DataProcessor:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
});

dp.attachEvent("onBeforeUpdate", (id, state, data) => {
    data.projectId = "1";
    return true;
});
~~~


## Инициирование сохранения данных из скрипта {#triggeringdatasavingfromscript}
------------------------------------------

Когда dataProcessor инициализирован, любые изменения, внесённые пользователями или программно, автоматически сохраняются в источник данных.

Для программного обновления определённой задачи или зависимости обычно используются методы [updateTask](api/method/updatetask.md) и [updateLink](api/method/updatelink.md):

~~~js
gantt.parse([
    { id: 1, text: "Task 1", start_date: "2025-05-13 06:00", duration: 2 },
    { id: 2, text: "Task 2", start_date: "2025-05-19 08:00", duration: 3 }
]);

const task = gantt.getTask(1);
task.text = "Task 37"; // обновить данные задачи
gantt.updateTask(1); // перерисовать обновлённую задачу
~~~

Другие методы, которые инициируют отправку обновлений на backend:

- [addTask](api/method/addtask.md)
- [updateTask](api/method/updatetask.md)
- [deleteTask](api/method/deletetask.md)
- [addLink](api/method/addlink.md)
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)


## Пользовательская маршрутизация {#customrouting}
------------------------------

Если RESTful AJAX API не соответствует вашим требованиям backend или вы хотите полностью контролировать содержимое отправляемого на сервер, можно использовать пользовательскую маршрутизацию.

Например, в таких фреймворках, как Angular или React, компонент может не отправлять изменения напрямую на сервер, а передавать их другому компоненту, отвечающему за сохранение данных.

Для настройки пользовательской маршрутизации DataProcessor используйте метод [**createDataProcessor()**](#createdp):

~~~js
gantt.createDataProcessor(function(entity, action, data, id) {
    const services = {
        "task": this.taskService,
        "link": this.linkService
    };
    const service = services[entity];

    switch (action) {
        case "update":
            return service.update(data);
        case "create":
            return service.insert(data);
        case "delete":
            return service.remove(id);
    }
});
~~~


[Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### Использование AJAX для настройки пользовательских роутеров

[AJAX-модуль Gantt](api/other/ajax.md) может быть полезен при настройке пользовательских маршрутов. Gantt ожидает, что пользовательский роутер будет возвращать объект Promise из операции, что позволяет определить, когда действие завершено. 
AJAX-модуль поддерживает promises, что делает его подходящим для использования внутри пользовательских роутеров. Gantt обработает Promise и выполнит необходимые действия после его завершения.

В примере ниже создается новая задача. Если в ответе сервера содержится id только что созданной задачи, Gantt применит его соответствующим образом.

~~~js
gantt.createDataProcessor((entity, action, data, id) => {
    ...
    switch (action) {
        case "create":
            return gantt.ajax.post({
                headers: {
                    "Content-Type": "application/json"
                },
                url: `${server}/task`,
                data: JSON.stringify(data)
            });
    }
});
~~~


<span id="resources_crud"></span>

## Маршрутизация CRUD-операций над ресурсами и назначениями ресурсов {#resources_crud}

Начиная с версии 8.0, изменения назначений ресурсов могут отправляться в DataProcessor как отдельные записи с постоянными ID, что упрощает интеграцию с backend API. Изменения самих объектов ресурсов также могут отправляться в DataProcessor.

Обратите внимание, что эта функция отключена по умолчанию. По умолчанию DataProcessor принимает изменения только задач и связей. Чтобы включить обработку ресурсов, установите следующие параметры:

~~~js
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
};
~~~

Когда режим ресурсов включён и DataProcessor работает в режиме REST, ресурсы и назначения ресурсов отправляются на backend отдельными запросами.

Если DataProcessor использует режим пользовательской маршрутизации, вы можете обрабатывать изменения назначений ресурсов и ресурсов в вашем обработчике:

~~~js
gantt.createDataProcessor({
    task: {
        create: (data) => {
            return createRecord({type: "task", ...data}).then((res) => {
                return { tid: res.id, ...res };
            });
        },
        update: (data, id) => {
            return updateRecord({type: "task", ...data}).then(() => ({}));
        },
        delete: (id) => {
            return deleteRecord({type: "task:", id: id}).then(() => ({}));
        }
    },
    link: {
        create: (data) => {
            ...
        },
        update: (data, id) => {
            ...
        },
        delete: (id) => {
            ...
        }
    },
    assignment: {
        create: (data) => {
            ...
        },
        update: (data, id) => {
            ...
        },
        delete: (id) => {
            ...
        }
    },
    resource: {
        create: (data) => {
            ...
        },
        update: (data, id) => {
            ...
        },
        delete: (id) => {
            ...
        }
    }
});
~~~

Альтернативно, с использованием объявления функции:

~~~js
gantt.createDataProcessor((entity, action, data, id) => {
    switch (entity) {
        case "task":
            break;
        case "link":
            break;
        case "resource":
            break;
        case "assignment":
            break;
    }
});
~~~


## Обработка ошибок {#errorhandling}
----------------------

Если сервер сообщает о неудачном выполнении действия, он может вернуть ответ с `"action":"error"`:

~~~js
{"action":"error"}
~~~

Вы можете отловить такие ответы на клиенте с помощью gantt.dataProcessor:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});

dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        // обработка ошибки здесь
    }
});
~~~

Объект ответа может содержать дополнительные свойства, доступные через аргумент `response` в обработчике onAfterUpdate.

:::note
Это событие срабатывает только для управляемых ошибок, возвращающих JSON-ответ, как показано выше.
Для обработки HTTP-ошибок используйте событие [onAjaxError](api/event/onajaxerror.md).
:::

Если сервер вернул ошибку, но изменения на клиенте были сохранены, лучший способ синхронизировать состояния - очистить состояние клиента и загрузить корректные данные с сервера:

~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        gantt.clearAll();
        gantt.load("url1");
    }
});
~~~

Если вы хотите синхронизировать состояния клиента и сервера без обращения к серверу, используйте метод [silent()](api/method/silent.md), чтобы предотвратить внутренние события или обращения к серверу во время операции:

~~~js
gantt.silent(() => {
    gantt.deleteTask(item.id);
});

gantt.render();
~~~


## Каскадное удаление {#cascadedeletion}
------------------

По умолчанию при удалении задачи происходит каскадное удаление её вложенных задач и связанных связей. Gantt отправляет *delete*-запрос для каждой удаляемой задачи и связи. 
Это означает, что целостность данных на backend не нужно поддерживать вручную, так как Gantt делает это автоматически.

Однако такой подход может привести к большому количеству AJAX-запросов на backend, поскольку dhtmlxGantt не поддерживает пакетные запросы, а количество задач и связей может быть большим.

При необходимости каскадное удаление можно отключить с помощью настройки [cascade_delete](api/config/cascade_delete.md). 
В этом случае при удалении ветки проекта будет отправлен delete-запрос только для верхнего элемента, и backend должен будет самостоятельно удалить связанные связи и подзадачи.


## XSS, CSRF и SQL-инъекции {#xsscsrfandsqlinjectionattacks}
----------------------------

Важно отметить, что Gantt не предоставляет встроенной защиты от угроз, таких как SQL-инъекции, XSS или CSRF-атаки. 
Обеспечение безопасности приложения лежит на разработчиках, реализующих backend.

См. статью [Безопасность приложения](guides/app-security.md), чтобы узнать о наиболее уязвимых местах компонента и рекомендуемых мерах по повышению безопасности вашего приложения. 

