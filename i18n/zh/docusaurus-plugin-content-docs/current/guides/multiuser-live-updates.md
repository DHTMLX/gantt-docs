--- 
title: "多用户实时更新"
sidebar_label: "多用户实时更新"
---

# 多用户实时更新

本文介绍如何为 DHTMLX Gantt 的实时更新模块实现服务器端支持。

## 原理

DHTMLX Gantt 提供了 `RemoteEvents` 助手，用于在多人之间实现实时同步。

### 关键工作流

- 当 Gantt 初始化时，`RemoteEvents` 客户端会打开一个 WebSocket 连接。
- 用户的变更（即 "create"、"edit" 或 "delete" 事件）通过 `DataProcessor` 使用 REST API 发送到服务器。
- 服务器在处理完变更后，通过 WebSocket 将更新广播给所有已连接的客户端。
- `RemoteEvents` 客户端接收这些更新并将其应用到 Gantt，以确保跨用户的同步。

该设计使该后端模块能够在同一个应用中支持多个 DHTMLX 小部件（例如 Kanban、Gantt、Scheduler）。共享的格式简化了数据同步，而无需为每个小部件设置独立的后端。

## 前端集成

在加载 Gantt 数据的同一段代码中初始化 `RemoteEvents` 并设置 `DataProcessor`。

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


### 关键细节

- `RemoteEvents` 构造函数需要一个授权令牌，该令牌将在服务器验证时通过 **"Remote-Token"** 头部发送。  
- 第一个参数指定 `WebSocket` 端点（例如，**/api/v1**）。  
- `remoteUpdates` 助手处理来自 WebSocket 的消息并同步 Gantt 数据。


## 后端实现

本节描述如何构建支持实时更新的后端。

### 简化示例

- [在 GitHub 上查看示例](https://github.com/DHTMLX/gantt-multiuser-backend-demo)

要测试实现：

- 使用 `npm install` 和 `npm run start` 命令提取并运行后端项目。
- 在两个独立的浏览器标签页中打开前端示例。
- 在其中一个标签页修改任务，修改应出现在第二个标签页中。

### 服务器端工作流

#### 1. 握手请求

初始化时，`RemoteEvents` 向服务器发送一个 **GET** 请求以建立连接。

示例：
~~~
GET /api/v1
Remote-Token: AUTH_TOKEN
~~~

响应：
~~~js
{"api":{},"data":{},"websocket":true}
~~~

#### 2. WebSocket 连接

收到响应后，`RemoteEvents` 使用提供的端点建立 websocket 连接。

示例：
~~~
ws://${URL}?token=${token}&ws=1
~~~

服务器验证令牌并返回如下消息：
~~~js
{"action":"start","body":"connectionId"}
~~~

示例实现：
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

#### 3. 订阅

连接建立后，`RemoteEvents` 会订阅 Gantt 的特定实体（在 Task 和 Links 的情况下）：

- 对于 tasks
~~~js
{"action":"subscribe","name":"tasks"}
~~~

- 对于 links
~~~js
{"action":"subscribe","name":"links"}
~~~

如要取消订阅：

- 对于 tasks
~~~js
{"action":"unsubscribe","name":"tasks"}
~~~

- 对于 links
~~~js
{"action":"unsubscribe","name":"links"}
~~~

:::note
  该格式支持应用程序同时使用多个 DHTMLX 小部件的场景。每个小部件仅订阅其数据相关的更新。
:::

示例：
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

#### 4. 广播更新

服务器通过 WebSocket 发送有关创建、更新或删除 tasks 和 links 等变更的更新，采用如下格式。收到这些消息后，Gantt 将自动使用 `remoteUpdates` 助手进行数据同步。

**Task Created**

~~~js
{"action":"event","body":{"name":"tasks",
   "value":{"type":"add-task","task":TASK_OBJECT}}}
~~~

示例：
~~~js
app.post("/data/task", (req, res) => {
    const bodyPayload = sanitize(req.body);
    const result = crud.insertTask(bodyPayload);

    // 广播变更给已连接的客户端
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

示例：
~~~js
app.put("/data/task/:id", (req, res) => {
    const id = req.params.id;
    const event = sanitize(req.body);

    const result = crud.updateTask(id, event);
    
    // 广播变更给已连接的客户端
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

示例：
~~~js
app.delete("/data/task/:id", (req, res) => {
    const id = req.params.id;
    const result = crud.deleteTask(id);

    // 广播变更给已连接的客户端
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

示例：
~~~js
app.post("/data/link", (req, res) => {
    const bodyPayload = sanitize(req.body);
    const result = crud.insertLink(bodyPayload);

    // 广播变更给已连接的客户端
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

示例：
~~~js
app.put("/data/link/:id", (req, res) => {
    const id = req.params.id;
    const event = sanitize(req.body);

    const result = crud.updateLink(id, event);

    // 广播变更给已连接的客户端
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

示例：
~~~js
app.delete("/data/link/:id", (req, res) => {
    const id = req.params.id;
    const result = crud.deleteLink(id);

    // 广播变更给已连接的客户端
    wsManager.broadcast("event", {
        name: "links",
        value: { type: "delete-link", link: { id } },
    });

    res.status(200).send();
});
~~~

## 高级自定义

### 自定义处理程序

在所描述的格式中，`RemoteEvents` 助手负责建立 WebSocket 连接的初始握手并接收消息。该模块的第二部分是负责解析通过 WebSocket 收到的消息并将相应变更应用到 Gantt 的 `remoteUpdates` 助手。

~~~js
const { RemoteEvents, remoteUpdates } = gantt.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~

通常，这些助手可以在不做任何额外配置的情况下使用。但也可以通过添加自定义助手来扩展现有协议，或为远端更新实现自定义处理程序。

`RemoteEvents.on` 方法需要一个对象参数，该参数可以为一个或多个实体指定处理程序：

~~~js
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on({ 
    tasks: function(message) {
        const { type, task } = message;
        switch (type) {
            case "add-task":
                // 处理添加事件
                break;
            case "update-task":
                // 处理更新事件
                break;
            case "delete-task":
                // 处理删除事件
                break;
        }
    }
});
~~~


如果你需要添加自定义动作，可以通过为 `remoteEvents` 添加额外的处理程序来实现：

~~~js
const { RemoteEvents, remoteUpdates } = gantt.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
remoteEvents.on({ 
    tasks: function(message) {
        const { type, task } = message;
        switch (type) {
            case "custom-action":
                // 处理自定义动作
                break;
        }
    }
});
~~~

处理程序将由以下消息触发：
~~~js
{"action":"event","body":{"name":"tasks",
   "value":{"type":"custom-action","task":value}}}
~~~

如果你希望使用 `RemoteEvents` 接收自定义实体的更新，可以通过添加一个处理程序来实现：

~~~js
const { RemoteEvents, remoteUpdates } = gantt.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);

// 订阅自定义实体
remoteEvents.on({ 
    resources: function(message) {
        const { type, value } = message;
        switch (type) {
            case "custom-action":
                // 处理自定义动作
                break;
        }
    }
});

~~~

以这种方式初始化后，`remoteEvents` 对象将向 websocket 发送如下格式的订阅消息：

~~~js
{"action":"subscribe","name":"resources"}
~~~

当收到指向指定实体的消息时，处理程序将被调用：

~~~js
{"action":"event","body":{"name":"resources",
   "value":{"type":"custom-action","value":value}}}
~~~

本指南为在 DHTMLX Gantt 中实现和自定义实时更新奠定了基础。要查看完整示例，请 [参考 GitHub 仓库](https://github.com/DHTMLX/gantt-multiuser-backend-demo)。

## Remote Updates API

`RemoteUpdates` 模块可用于将 Gantt 连接到任何外部变更源，便于集成远程变更。

~~~js
const { remoteUpdates } = gantt.ext.liveUpdates;

// 将任务插入到 Gantt 中，但不触发更新钩子
remoteUpdates.tasks({ type: "add-task", task: TASK_OBJECT });

// 将任务在 Gantt 中更新，但不触发更新钩子
remoteUpdates.tasks({ type: "update-task", task: TASK_OBJECT });

// 从 Gantt 中删除任务，但不触发更新钩子
remoteUpdates.tasks({ type: "delete-task", task: {id: TASK_ID}});

// 链接操作
remoteUpdates.links({ type: "add-link", link: LINK_OBJECT });
remoteUpdates.links({ type: "update-link", link: LINK_OBJECT });
remoteUpdates.links({ type: "delete-link", link: {id: LINK_ID}});
~~~

请查看 GitHub 仓库中的示例，了解 Gantt 如何连接到 Firestore 更新：https://github.com/DHTMLX/firebase-gantt-demo/。