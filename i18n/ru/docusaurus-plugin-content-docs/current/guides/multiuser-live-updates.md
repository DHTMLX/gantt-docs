---
title: "Multi-User Live Updates"
sidebar_label: "Multi-User Live Updates"
---

# Обновления в реальном времени для нескольких пользователей

Эта статья описывает, как реализовать поддержку на стороне сервера для модуля обновлений в реальном времени DHTMLX Gantt.

## Принцип

DHTMLX Gantt предоставляет вспомогательный элемент `RemoteEvents` для синхронизации изменений между несколькими пользователями в реальном времени.

### Основной рабочий процесс

- Клиент `RemoteEvents` открывает соединение WebSocket при инициализации Gantt.
- Изменения пользователей (события "create", "edit" или "delete") отправляются на сервер через `DataProcessor` с использованием REST API.
- Сервер рассылает обновления всем подключенным клиентам через WebSocket после обработки.
- Клиент `RemoteEvents` принимает обновления и применяет их к Gantt, обеспечивая синхронизацию между пользователями.

Дизайн позволяет этому бэкенд-модулю поддерживать несколько виджетов DHTMLX (например, Kanban, Gantt, Scheduler) в рамках одного приложения. Общий формат упрощает синхронизацию данных без необходимости иметь отдельные бекенды для каждого виджета.

## Интеграция на клиентской стороне

Инициализируйте `RemoteEvents` и настройте `DataProcessor` в той же секции кода, где загружаются данные Gantt.

~~~js
const AUTH_TOKEN = "token";
gantt.init("gantt_here");
gantt.parse("/data");

const dp = gantt.createDataProcessor({
    url: "/data",
    mode: "REST-JSON",
    headers: {
        "Remote-Token": AUTH_TOKEN,
    },
});

const { RemoteEvents, remoteUpdates } = gantt.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~


### Ключевые детали

- Конструктор `RemoteEvents` требует авторизационный токен, который отправляется в заголовке **"Remote-Token"** для проверки на сервере.
- Первый аргумент задаёт конечную точку `WebSocket` (например, **/api/v1**).
- Хелпер `remoteUpdates` обрабатывает входящие сообщения `WebSocket` и синхронизирует данные Gantt.

## Реализация на стороне сервера

Этот раздел описывает, как построить бекенд, поддерживающий обновления в реальном времени.

### Упрощённый пример

- [См. пример на GitHub](https://github.com/DHTMLX/gantt-multiuser-backend-demo)

Чтобы протестировать реализацию:

- Распакуйте и запустите проект бекенд, выполнив команды `npm install` и `npm run start`.
- Откройте фронтенд-пример в двух отдельных вкладках браузера.
- Измените задачу в одной вкладке; изменения должны отображаться во второй вкладке.

### Серверный рабочий процесс

#### 1. Запрос рукопожатия

При инициализации `RemoteEvents` отправляет на сервер **GET**-запрос для установления соединения.

Пример:
~~~
GET /api/v1
Remote-Token: AUTH_TOKEN
~~~

Ответ:

~~~js
{"api":{},"data":{},"websocket":true}
~~~

#### 2. Подключение WebSocket

После получения ответа `RemoteEvents` устанавливает соединение `websocket` по предоставленной конечной точке.

Пример:

~~~
ws://${URL}?token=${token}&ws=1
~~~

Сервер проверяет токен и отвечает сообщением:

~~~js
{"action":"start","body":"connectionId"}
~~~

Пример реализации:

~~~js
app.get('/api/v1', (req, res) => {
    const token = req.headers['remote-token'];
    if (!token || !verifyAuthHeader(token)) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    res.json({ api: {}, data: {}, websocket: true });
});

wss.on('connection', (ws, req) => {
    const token = new URLSearchParams(req.url.split('?')[1]).get('token');
    if (!token || !verifyAuthToken(token)) {
        ws.close(1008, 'Unauthorized');
        return;
    }
    const connectionId = generateConnectionId();
    ws.send(JSON.stringify({ action: 'start', body: connectionId }));
});
~~~

#### 3. Подписка

После установления соединения `RemoteEvents` подписывается на обновления для конкретных сущностей, `tasks` и `links` в случае Gantt:

- для задач

~~~js
{"action":"subscribe","name":"tasks"}
~~~

- для связей

~~~js
{"action":"subscribe","name":"links"}
~~~

Чтобы отписаться:

- для задач

~~~js
{"action":"unsubscribe","name":"tasks"}
~~~

- для связей

~~~js
{"action":"unsubscribe","name":"links"}
~~~

:::note
 Этот формат поддерживает сценарии, когда приложение использует несколько виджетов DHTMLX одновременно. Каждый виджет подписывается только на обновления, относящиеся к его данным.
:::

Пример:

~~~js
ws.on('message', function(message) {
    try {
        const msg = JSON.parse(message);
        const client = clients.get(connectionId);

        if (!client) return;

        if (msg.action === 'subscribe') {
            client.subscriptions.add(msg.name);
        } else if (msg.action === 'unsubscribe') {
            client.subscriptions.delete(msg.name);
        }
    } catch (err) {
        console.error('Error parsing WebSocket message:', err);
    }
});
~~~

#### 4. Рассылка обновлений

Сервер отправляет обновления через WebSocket для изменений, таких как создание, обновление или удаление задач и связей в формате, описанном ниже.

При получении этих сообщений Gantt автоматически синхронизирует данные с использованием хелпера `remoteUpdates`.


**Task Created**

~~~js
{"action":"event","body":{"name":"tasks",
   "value":{"type":"add-task","task":TASK_OBJECT}}}
~~~

Пример реализации:

~~~js
app.post("/data/task", (req, res) => {
    const bodyPayload = sanitize(req.body);
    const result = crud.insertTask(bodyPayload);

    // Broadcast changes to connected clients
    wsManager.broadcast("event", {
        name: "tasks",
        value: { type: "add-task", task: result.item },
    });

    res.status(200).json(result);
});
~~~

**Task Updated**

~~~js
{"action":"event","body":{"name":"tasks",
   "value":{"type":"update-task","task":TASK_OBJECT}}}
~~~

Пример реализации:

~~~js
app.put("/data/task/:id", (req, res) => {
    const id = req.params.id;
    const event = sanitize(req.body);

    const result = crud.updateTask(id, event);
    
    // Broadcast changes to connected clients
    wsManager.broadcast("event", {
        name: "tasks",
        value: { type: "update-task", task: result.item },
    });

    res.status(200).send(result);
});
~~~

**Task Deleted**

~~~js
{"action":"event","body":{"name":"tasks",
   "value":{"type":"delete-task","task":{"id":ID}}}}
~~~

Пример реализации:

~~~js
app.delete("/data/task/:id", (req, res) => {
    const id = req.params.id;
    const result = crud.deleteTask(id);

    // Broadcast changes to connected clients
    wsManager.broadcast("event", {
        name: "tasks",
        value: { type: "delete-task", task: { id } },
    });

    res.status(200).send();
});
~~~

**Link Created**

~~~js
{"action":"event","body":{"name":"links",
   "value":{"type":"add-link","link":LINK_OBJECT}}}
~~~

Пример реализации:

~~~js
app.post("/data/link", (req, res) => {
    const bodyPayload = sanitize(req.body);
    const result = crud.insertLink(bodyPayload);

    // Broadcast changes to connected clients
    wsManager.broadcast("event", {
        name: "links",
        value: { type: "add-link", link: result.item },
    });

    res.status(200).json(result);
});
~~~

**Link Updated**

~~~js
{"action":"event","body":{"name":"links",
   "value":{"type":"update-link","link":LINK_OBJECT}}}
~~~

Пример реализации:

~~~js
app.put("/data/link/:id", (req, res) => {
    const id = req.params.id;
    const event = sanitize(req.body);

    const result = crud.updateLink(id, event);

    // Broadcast changes to connected clients
    wsManager.broadcast("event", {
        name: "links",
        value: { type: "update-link", link: result.item },
    });

    res.status(200).send(result);
});
~~~

**Link Deleted**

~~~js
{"action":"event","body":{"name":"links",
   "value":{"type":"delete-link","link":{"id":ID}}}}
~~~

Пример реализации:

~~~js
app.delete("/data/link/:id", (req, res) => {
    const id = req.params.id;
    const result = crud.deleteLink(id);

    // Broadcast changes to connected clients
    wsManager.broadcast("event", {
        name: "links",
        value: { type: "delete-link", link: { id } },
    });

    res.status(200).send();
});
~~~

## Расширенная настройка

### Пользовательские обработчики

В описанном формате помощник `RemoteEvents` отвечает за начальный handshake для установления соединения WebSocket с сервером и получение сообщений. Вторая часть этого модуля — обработчик `remoteUpdates`, который отвечает за разбор сообщений, получаемых через websocket и применение соответствующих изменений к Gantt.

~~~js
const { RemoteEvents, remoteUpdates } = gantt.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~

Обычно эти помощники можно использовать без дополнительной конфигурации. Но возможно расширить существующий протокол, добавив пользовательский помощник или реализовав пользовательский обработчик удалённых обновлений.

Метод `RemoteEvents.on` принимает объект-аргумент, который может определить обработчики для одной или нескольких сущностей:

~~~js
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on({ 
    tasks: function(message) {
        const { type, task } = message;
        switch (type) {
            case "add-task":
                // обработать событие добавления
                break;
            case "update-task":
                // обработать событие обновления
                break;
            case "delete-task":
                // обработать событие удаления
                break;
        }
    }
});
~~~


Если нужно добавить настраиваемое действие, можно сделать это, добавив дополнительный обработчик для `remoteEvents`:

~~~js
const { RemoteEvents, remoteUpdates } = gantt.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
remoteEvents.on({ 
    tasks: function(message) {
        const { type, task } = message;
        switch (type) {
            case "custom-action":
                // обработать пользовательское действие
                break;
        }
    }
});
~~~

Обработчик будет вызываться по следующему сообщению:

~~~js
{"action":"event","body":{"name":"tasks",
   "value":{"type":"custom-action","task":value}}}
~~~

Если хотите использовать `RemoteEvents` для получения обновлений для настраиваемых сущностей, вы можете сделать это, добавив обработчик:

~~~js
const { RemoteEvents, remoteUpdates } = gantt.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);

// подписка на настраиваемые сущности
remoteEvents.on({ 
    resources: function(message) {
        const { type, value } = message;
        switch (type) {
            case "custom-action":
                // обработать пользовательское действие
                break;
        }
    }
});

~~~

При инициализации таким образом объект `remoteEvents` будет отправлять через WebSocket сообщение подписки в следующем формате:

~~~js
{"action":"subscribe","name":"resources"}
~~~

А обработчик будет вызываться каждый раз, когда будет получено сообщение, адресованное указанной сущности:

~~~js
{"action":"event","body":{"name":"resources",
   "value":{"type":"custom-action","value":value}}}
~~~

Данное руководство закладывает основу для реализации и настройки обновлений в реальном времени в DHTMLX Gantt. Для полного примера, 
[обратитесь к репозиторию GitHub](https://github.com/DHTMLX/gantt-multiuser-backend-demo).

## API удалённых обновлений

Модуль `RemoteUpdates` можно использовать для подключения Gantt к любому источнику внешних изменений, что позволяет легко интегрировать удалённые обновления.

~~~js
const { remoteUpdates } = gantt.ext.liveUpdates;

// вставить задачу в Gantt без вызова хуков обновления
remoteUpdates.tasks({ type: "add-task", task: TASK_OBJECT });

// обновить задачу в Gantt без вызова хуков обновления
remoteUpdates.tasks({ type: "update-task", task: TASK_OBJECT });

// удалить задачу из Gantt без вызова хуков обновления
remoteUpdates.tasks({ type: "delete-task", task: {id: TASK_ID}});

// операции со связями
remoteUpdates.links({ type: "add-link", link: LINK_OBJECT });
remoteUpdates.links({ type: "update-link", link: LINK_OBJECT });
remoteUpdates.links({ type: "delete-link", link: {id: LINK_ID}});
~~~

См. пример того, как Gantt может быть подключен к обновлениям Firestore в [репозитории GitHub](https://github.com/DHTMLX/firebase-gantt-demo/).