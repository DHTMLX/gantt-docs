---
title: "Интеграция с серверной стороной"
sidebar_label: "Интеграция с серверной стороной"
---

# Серверная интеграция

<style>
.dp_table td (
  width: 100%;
)
</style>

Рекомендуемый подход к подключению dhtmlxGantt к серверу — реализовать RESTful API на сервере и использовать модуль [](api/other/dataprocessor.md) на клиенте.

DataProcessor — встроенный модуль, который отслеживает изменения данных в Gantt и отправляет обновления в REST API в заданном формате, обеспечивая легкую [интеграцию с серверными платформами](integrations/howtostart-guides.md). При использовании источника данных в виде объекта DataProcessor можно настроить callbacks для изменений данных, которые можно использовать для привязки данных.

Вы можете посмотреть видеоруководство, которое показывает, как создать диаграмму Gantt на странице и загрузить данные в нее на примере платформы Node.js.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Методика

Вообще, чтобы загрузить данные со стороны сервера с использованием REST API, нужно:

### Клиентская сторона

1) Вызвать метод [](api/method/load.md), в качестве параметра указать URL, возвращающий данные Gantt в формате [JSON](/guides/supported-data-formats/).

2) Создать экземпляр DataProcessor одним из двух способов:

- Инициализировать DataProcessor и привязать его к объекту dhtmlxGantt:

~~~js
gantt.init("gantt_here");
gantt.load("apiUrl");

// сохранить порядок строк ниже
const dp = new gantt.dataProcessor("apiUrl");
dp.init(gantt);
dp.setTransactionMode("REST");
dp.deleteAfterConfirmation = true;
~~~

:::note
Рекомендуется использовать второй метод.
:::

- Вызвать метод [](api/method/createdataprocessor.md) и передать объект с настройками в качестве параметра:

~~~js
const dp = gantt.createDataProcessor({
    url: "apiUrl",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

Ознакомьтесь с подробной информацией в следующем разделе.


###  Создание DataProcessor {#createdp}

При создании DataProcessor через API-метод [](api/method/createdataprocessor.md) у вас есть несколько вариантов передачи параметров. 
  
1. Используйте один из предустановленных режимов запроса, например:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

где:

- **url** - URL к серверной стороне
- **mode** - режим отправки данных на сервер:  "GET" | "POST" | "REST" | "JSON" | "REST-JSON"
- **deleteAfterConfirmation** - определяет, должен ли элемент быть удалён из gantt только после успешного ответа от сервера. Зависимости и подпроекты будут удалены после подтверждения удаления родительской задачи.

2. Укажите настраиваемый **router**-объект:

~~~js
const dp = gantt.createDataProcessor(router);
~~~

- где **router** может быть функцией:

~~~js
// entity - "task"|"link"|"resource"|"assignment"
// action - "create"|"update"|"delete"
// data - объект с данными задачи или связи
// id – id обрабатываемого объекта (задачи или связи)
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

- или объект следующей структуры:

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

Все функции объекта **router** должны возвращать либо Promise, либо объект ответа данных. Это необходимо для того, чтобы dataProcessor мог применить идентификатор базы данных и подключить событие **onAfterUpdate** в обработчике data processor.

~~~js
const router = (entity, action, data, id) => {
    return new gantt.Promise((resolve, reject) => {
        // … некоторая логика
        return resolve({ tid: databaseId });
    });
};
~~~

Таким образом, вы можете использовать DataProcessor для сохранения данных в localStorage, или в любое другое хранилище, которое не привязано к определённому URL, или в случае, если существуют два различных сервера (URLs), ответственных за создание и удаление объектов.


**Связанный пример**: [Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### Детали запроса и ответа {#requestresponsedetails}

URL формируется по следующему правилу:

- api/link/id
- api/task/id
- api/resource/id
- api/assignment/id

где "api" — URL, который вы указали в конфигурации dataProcessor.

Перечень возможных запросов и ответов:

<table class="dp_table">
  <tr>
  <th><b>Действие</b></th><th><b>HTTP-метод</b></th><th><b>URL</b></th><th><b>Ответ</b></th>
  </tr>
  <tr>
  <td>load data</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON формат](/guides/supported-data-formats/)</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Задачи</td></tr>
  <tr>
  <td>add a new task</td>
  <td>POST</td>
  <td>/apiUrl/task</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update a task</td>
  <td>PUT</td>
  <td>/apiUrl/task/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete a task</td>
  <td>DELETE</td>
  <td>/apiUrl/task/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Ссылки</td></tr>
  <tr>
  <td>add a new link</td>
  <td>POST</td>
  <td>/apiUrl/link</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update a link</td>
  <td>PUT</td>
  <td>/apiUrl/link/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete a link</td>
  <td>DELETE</td>
  <td>/apiUrl/link/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Ресурсы</td></tr>
  <tr>
  <td>add a new resource</td>
  <td>POST</td>
  <td>/apiUrl/resource</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update a resource</td>
  <td>PUT</td>
  <td>/apiUrl/resource/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete a resource</td>
  <td>DELETE</td>
  <td>/apiUrl/resource/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Назначения ресурсов</td></tr>
  <tr>
  <td>add a new assignment</td>
  <td>POST</td>
  <td>/apiUrl/assignment</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>update an assignment</td>
  <td>PUT</td>
  <td>/apiUrl/assignment/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>delete an assignment</td>
  <td>DELETE</td>
  <td>/apiUrl/assignment/id</td>
  <td>("action":"deleted")</td>
  </tr>
</table>

:::note
По умолчанию ресурсы и назначения ресурсов не отправляются в DataProcessor. При необходимости эту возможность нужно включать явно.
Узнайте больше [здесь](guides/server-side.md#resources_crud).
:::


### Параметры запросов {#requestparams}

Запросы на создание/обновление/удаление будут содержать все публичные свойства клиентского объекта задачи или ссылки:

Задача:

- **start_date**: 2025-04-08 00:00:00
- **duration**: 4
- **text**: Task #2.2
- **parent**: 3
- **end_date**: 2025-04-12 00:00:00

Ссылка:

- **source**: 1
- **target**: 2
- **type**: 0

Примечание:

- Формат параметров **start_date** и **end_date** определяется конфигурацией [](api/config/date_format.md).
- Клиентская сторона отправляет все публичные свойства объекта задачи или ссылки. Таким образом, запрос может содержать любое количество дополнительных параметров.
- Если вы расширяете модель данных, добавляя новые столбцы/свойства, никаких дополнительных действий для отправки их на бэкэнд не потребуется.

:::note
Под публичными свойствами здесь мы имеем в виду свойства, имена которых не начинаются с символа подчеркивания (_) или знака доллара ($),
например, свойства с именами task._owner или link.$state не будут отправлены на бэкэнд.
:::


### Режим REST-JSON {#restjson}

Помимо режимов транзакций "POST","GET","REST" и "JSON" DataProcessor можно использовать в режиме "REST-JSON".

~~~js
gantt.load("apiUrl");

const dp = gantt.createDataProcessor({
    url: "/apiUrl",
    mode: "REST-JSON"
});
~~~

Он использует те же [URLs for requests](#requestresponsedetails), но [параметры запроса](#requestparams) для задач и ссылок и форма их отправки на сервер различаются.

В режиме REST данные отправляются на сервер в форме:

~~~jsx
Content-Type: application/x-www-form-urlencoded
~~~

в то время как в режиме REST-JSON данные отправляются в формате JSON:

~~~jsx title="Headers"
Content-type: application/json
~~~

Таким образом параметры отправляются как объект JSON:

**Request Payload**

- Задача

~~~jsx
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

~~~jsx
{
    "source": 1,
    "target": 2,
    "type": "0"
}
~~~

Этот формат упрощает обработку сложных записей на любой серверной платформе. 


### Серверная сторона {#loadserverside}

При каждом действии в Gantt (добавление, обновление или удаление задач или связей) dataProcessor реагирует отправкой AJAX-запроса на сервер.

Каждый запрос содержит все данные, необходимые для сохранения изменений в базе данных.
Поскольку мы инициализировали dataProcessor в REST-режиме, он будет использовать разные HTTP-методы для каждого типа операции.

Поскольку мы используем REST API, возможно реализовать серверную сторону с использованием различных фреймворков и языков программирования.
Ниже приведён список доступных реализаций на стороне сервера, которые можно использовать для интеграции бэкенда Gantt:

- [dhtmlxGantt с ASP.NET Core 2](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)


### Хранение порядка задач {#storingtheorderoftasks}

Gantt отображает задачи в том же порядке, в котором они поступают из источника данных. Если вы позволяете пользователям [перемещать задачи вручную](guides/reordering-tasks.md#drag-n-drop-within-the-whole-gantt-structure), вам также нужно сохранить этот порядок в базе данных и убедиться, что ваша подача данных возвращает данные, отсортированные соответствующим образом.

Клиентская конфигурация:

~~~js
// перераспределение задач внутри всего gantt
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
gantt.load("/api");

const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

Сохранение порядка можно реализовать несколькими способами, покажем один из них.

- Вы добавляете числовой столбец в таблицу задач, назовём его 'sortorder'.
- При обработке действия GET вы сортируете задачи по этому столбцу по возрастанию.
- Когда добавляется новая задача, ей присваивается sortorder = MAX(sortorder) + 1
- Когда порядок меняется на клиентской стороне, Gantt отправит PUT (POST, если вы не используете REST-режим) со всеми свойствами задачи, а также значениями, описывающими положение задачи в дереве проекта.

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

Параметр <b>target</b> будет содержать id ближайшей задачи, которая находится слева от текущей задачи, или справа от неё.

Его значение может принимать два формата:

 - *target="targetId"*  — текущая задача должна располагаться прямо <b>перед</b> задачей с targetId
 - *target="next:targetId"* - текущая задача должна располагаться прямо <b>после</b> задачи с targetId

Применение изменений порядка обычно включает обновление нескольких задач; приведён псевдокод, демонстрирующий возможную реализацию:

~~~js
const target = request["target"];
const currentTaskId = request["id"];
let nextTask;
let targetTaskId;

// Получаем id соседней задачи и проверяем, должна ли обновленная задача идти перед ней или после неё
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

// Обновленная задача получит значение sortorder ближайшей задачи
let targetOrder = targetTask.sortorder;

// Если задача должна идти после соседней, она получает больший sortorder
if (nextTask) targetOrder++;

// Повышаем sortorder задач, которые должны идти после обновленной задачи
tasks.where(task => task.sortorder >= targetOrder)
    .update(task => task.sortorder++);

// Обновляем текущую задачу с её новым sortorder
currentTask.sortorder = targetOrder;

tasks.save(currentTask);
~~~

Вы можете ознакомиться с подробными примерами реализации хранения порядка задач для конкретных серверных платформ:
[plain PHP](integrations/php/howtostart-php.md#storingtheorderoftasks), [Laravel](integrations/php/howtostart-php-laravel.md#storingtheorderoftasks),
[Node.js](integrations/node/howtostart-nodejs.md#storingtheorderoftasks), [ASP.NET Web API](integrations/dotnet/howtostart-dotnet.md#storingtheorderoftasks) и 
[Rails](integrations/other/howtostart-ruby.md#storingtheorderoftasks).


## Пользовательские заголовки и параметры запроса 

### Добавление пользовательских заголовков запроса

Вы можете отправлять дополнительные заголовки на ваш бэкенд. Например, предположим, что вам нужно добавить токен авторизации к вашим запросам:

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

На данный момент [](api/method/load.md) не поддерживает параметры заголовков/полезной нагрузки, поэтому если вам нужны они для GET-запроса, вам придётся отправлять xhr вручную и загружать данные в gantt с помощью [](api/method/parse.md), например:

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


### Добавление пользовательских параметров к запросу

Существует несколько способов отправки дополнительных параметров в запросах.

Как известно, gantt отправляет все свойства объекта данных обратно в бэкенд. Таким образом, вы можете добавить дополнительное свойство непосредственно к объекту данных, и оно будет отправлено на бэкенд:

~~~js
gantt.attachEvent("onTaskCreated", (task) => {
    task.userId = currentUser;
    return true;
});
~~~


Или можно добавить пользовательские параметры ко всем запросам, отправляемым data processor, используя свойство **payload**:

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

Еще один способ добавить пользовательские параметры к запросу — использовать событие [onBeforeUpdate](api/other/dataprocessor.md) DataProcessor:

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


## Вызов сохранения данных из скрипта

Если DataProcessor инициализирован, любое изменение, сделанное пользователем или программно, будет автоматически сохранено в источнике данных.

В общем случае, чтобы программно обновить конкретную задачу или зависимость, используйте методы [](api/method/updatetask.md) и [](api/method/updatelink.md) соответственно:

~~~js
gantt.parse([
    { id: 1, text: "Task 1", start_date: "2025-05-13 06:00", duration: 2 },
    { id: 2, text: "Task 2", start_date: "2025-05-19 08:00", duration: 3 }
]);

const task = gantt.getTask(1);
task.text = "Task 37"; //изменяет данные задачи
gantt.updateTask(1); // визуализирует обновлённую задачу
~~~ 

Другие методы, которые вызывают отправку обновления на backend:

- [addTask](api/method/addtask.md)
- [updateTask](api/method/updatetask.md)
- [deleteTask](api/method/deletetask.md)
- [addLink](api/method/addlink.md)
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)

## Пользовательская маршрутизация {#customrouting}

В случае, если RESTful AJAX API не подходит вам на бэкенде, или если вы хотите вручную контролировать, что отправляется на сервер, можно воспользоваться пользовательской маршрутизацией.

Например, если вы используете Angular, React или любой другой фреймворк, где компонент на странице не отправляет изменения напрямую на сервер, а передает их в другой компонент, отвечающий за сохранение данных.

Чтобы предоставить настройки пользовательской маршрутизации для DataProcessor, следует использовать метод [**createDataProcessor()**](#createdp):

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

**Связанный пример**: [Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### Использование AJAX для настройки пользовательских маршрутизаторов

[Gantt AJAX модуль](api/other/ajax.md) может быть полезен для настройки пользовательских маршрутов. Gantt ожидает, что пользовательский маршрутизатор вернёт объект Promise в результате операции, что позволяет отловить завершение действия. 
Модуль AJAX поддерживает promises и подходит для использования внутри пользовательских маршрутизаторов. Gantt получит Promise и обработает содержимое Promise после его разрешения. 

В приведённом ниже примере создаётся новая задача. Если сервер вернёт id только что созданной задачи, Gantt сможет применить его.

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


## Маршрутизация CRUD действий ресурсов и назначений ресурсов {#resources_crud}

С версии 8.0 изменённые назначения ресурсов могут отправляться в DataProcessor как отдельные записи с постоянными ID, что упрощает подключение к API бэкенда. Изменения объектов ресурсов также могут отправляться в DataProcessor.

Заметим, что эта функция отключена по умолчанию. По умолчанию DataProcessor получает только изменения задач и связей. Чтобы включить эту возможность, воспользуйтесь настройками:

~~~js
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
};
~~~

Как только режим ресурсов DataProcessor включён и если DataProcessor настроен на REST-режим, ресурсы и назначения ресурсов будут отправляться на бэкэнд в отдельных запросах.

Если вы используете DataProcessor в режиме Custom Routing, вы сможете перехватывать изменения назначений ресурсов и самих ресурсов в обработчике:

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

Или, используя объявление функции:

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


## Обработка ошибок

Сервер может уведомлять Gantt о неудачном выполнении действия, вернув ответ типа "action":"error":

~~~js
{"action":"error"}
~~~

Такой ответ можно перехватить на клиенте с помощью gantt.dataProcessor:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});

dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        // выполнить какие-то действия
    }
});
~~~

Объект ответа может содержать любое количество дополнительных свойств, их можно получить через аргумент `response` обработчика onAfterUpdate.

:::note
Это событие будет вызвано только для управляемых ошибок, возвращающих JSON-ответ, как показано выше.
Если вам нужно обработать HTTP-ошибки, пожалуйста, ознакомьтесь со API-событием [](api/event/onajaxerror.md).
:::

Если сервер вернул ошибку по одному из ваших действий, но изменения были сохранены на клиенте, лучший способ синхронизировать их состояния — очистить состояние клиента и заново загрузить корректные данные с серверной стороны:

~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        gantt.clearAll();
        gantt.load("url1");
    }
});
~~~

Если вы хотите синхронизировать стороны клиента и сервера, но не хотите выполнять никаких запросов к серверу, можно воспользоваться методом [silent()](api/method/silent.md), который не вызывает внутренние события или обращения к серверу:

~~~js
gantt.silent(() => {
    gantt.deleteTask(item.id);
});

gantt.render();
~~~


## Каскадное удаление

По умолчанию удаление задачи инициирует каскадное удаление её вложенных задач и связанных с ними ссылок. Gantt будет отправлять запрос на удаление для каждой удаляемой задачи и ссылки.
Таким образом, вам не нужно поддерживать целостность данных на бэкенде: за это может ответственно взяться сам Gantt.

С другой стороны, такая стратегия может привести к большому количеству AJAX-запросов к API бэкенда, поскольку dhtmlxGantt не поддерживает пакетные запросы AJAX, и количество задач и связей не ограничено.

В этом случае каскадное удаление можно отключить с помощью конфигурации [](api/config/cascade_delete.md).
Таким образом, при удалении ветки проекта клиент будет отправлять запрос на удаление только для верхнего элемента и ожидать, что бэкэнд удалит связанные ссылки и подпроекты.


## XSS, CSRF и SQL-инъекции

Обратите внимание, что Gantt не предоставляет средств для предотвращения угроз в приложении, таких как SQL-инъекции или XSS и CSRF атаки.
Ответственность за обеспечение безопасности приложения лежит на разработчиках backend.
Ознакомьтесь со статьей [guides/app-security.md], чтобы узнать наиболее уязвимые точки компонента и меры, которые можно принять для повышения безопасности вашего приложения.