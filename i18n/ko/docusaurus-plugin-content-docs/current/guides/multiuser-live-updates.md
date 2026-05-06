---
title: "다중 사용자 실시간 업데이트"
sidebar_label: "다중 사용자 실시간 업데이트"
---

# 다중 사용자 실시간 업데이트

이 문서는 DHTMLX Gantt의 실시간 업데이트 모듈에 대한 서버 측 지원을 구현하는 방법을 설명합니다.

## 원리

DHTMLX Gantt는 여러 사용자의 변경 사항을 실시간으로 동기화하기 위해 `RemoteEvents` 도우미를 제공합니다.

### 주요 워크플로우

- The `RemoteEvents` client opens a WebSocket connection when Gantt is initialized.
- The User changes (the "create", "edit", or "delete" events) are sent to the server via `DataProcessor` using the REST API.
- The server broadcasts updates to all connected clients via WebSocket after processing them.
- The `RemoteEvents` client receives the updates and applies them to Gantt, ensuring synchronization across users.

설계는 이 백엔드 모듈이 동일한 애플리케이션 내에서 여러 DHTMLX 위젯(예: Kanban, Gantt, Scheduler)을 지원하도록 허용합니다. 공유 포맷은 각 위젯에 대해 별도 백엔드가 필요 없도록 데이터 동기화를 간소화합니다.

## 프런트엔드 통합

`RemoteEvents`를 초기화하고 Gantt 데이터가 로드되는 동일한 코드 구간에서 `DataProcessor`를 설정합니다.

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

### 주요 세부사항

- `RemoteEvents` 생성자는 인증 토큰이 필요하며, 서버 검증을 위해 **"Remote-Token"** 헤더로 전송됩니다.
- 첫 번째 인수는 `WebSocket` 엔드포인트를 지정합니다(예: **/api/v1**).
- `remoteUpdates` 도우미는 수신된 `WebSocket` 메시지를 처리하고 Gantt 데이터를 동기화합니다.

## 백엔드 구현

이 섹션은 실시간 업데이트를 지원하는 백엔드를 구현하는 방법을 설명합니다.

### 간단한 예제

- [GitHub의 예제 확인](https://github.com/DHTMLX/gantt-multiuser-backend-demo)

구현을 테스트하려면:

- 백엔드 프로젝트를 추출하고 `npm install` 및 `npm run start` 명령으로 실행합니다.
- 프런트엔드 예제를 두 개의 서로 다른 브라우저 탭에서 엽니다.
- 한 탭에서 작업을 수정하면 변경 내용이 두 번째 탭에 나타납니다.

### 서버 측 워크플로우

#### 1. 핸드셰이크 요청

초기화될 때, `RemoteEvents`는 연결을 설정하기 위해 서버에 **GET** 요청을 보냅니다.

예:
~~~
GET /api/v1
Remote-Token: AUTH_TOKEN
~~~

응답:

~~~js
{"api":{},"data":{},"websocket":true}
~~~

#### 2. WebSocket 연결

응답을 받은 후, `RemoteEvents`는 제공된 엔드포인트로 WebSocket 연결을 설정합니다.

예:
~~~
ws://${URL}?token=${token}&ws=1
~~~

서버는 토큰을 검증하고 다음과 같은 메시지로 응답합니다:

~~~js
{"action":"start","body":"connectionId"}
~~~

예제 구현:

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

#### 3. 구독

연결이 확립된 후, `RemoteEvents`는 Gantt의 경우 특정 엔티티들인 `tasks`와 `links`의 업데이트를 구독합니다.

- 작업에 대해

~~~js
{"action":"subscribe","name":"tasks"}
~~~

- 링크에 대해

~~~js
{"action":"subscribe","name":"links"}
~~~

구독 취소하려면:

- 작업에 대해

~~~js
{"action":"unsubscribe","name":"tasks"}
~~~

- 링크에 대해

~~~js
{"action":"unsubscribe","name":"links"}
~~~

:::note
 이 포맷은 애플리케이션이 여러 DHTMLX 위젯을 동시에 사용하는 시나리오를 지원합니다. 각 위젯은 데이터에 관련된 업데이트에만 구독합니다.
:::

예:

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

#### 4. 업데이트 브로드캐스팅

서버는 아래 형식으로 작업을 만들거나 수정하거나 삭제하는 등의 변경에 대한 업데이트를 WebSocket으로 보냅니다.

이 메시지를 수신하면 Gantt는 `remoteUpdates` 도우미를 사용해 데이터를 자동으로 동기화합니다.

**Task Created**

~~~js
{"action":"event","body":{"name":"tasks",
   "value":{"type":"add-task","task":TASK_OBJECT}}}
~~~

예:

~~~js
app.post("/data/task", (req, res) => {
    const bodyPayload = sanitize(req.body);
    const result = crud.insertTask(bodyPayload);

    // 연결된 클라이언트에 변경사항 브로드캐스트
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

예:

~~~js
app.put("/data/task/:id", (req, res) => {
    const id = req.params.id;
    const event = sanitize(req.body);

    const result = crud.updateTask(id, event);
    
    // 연결된 클라이언트에 변경사항 브로드캐스트
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

예:

~~~js
app.delete("/data/task/:id", (req, res) => {
    const id = req.params.id;
    const result = crud.deleteTask(id);

    // 연결된 클라이언트에 변경사항 브로드캐스트
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

예:

~~~js
app.post("/data/link", (req, res) => {
    const bodyPayload = sanitize(req.body);
    const result = crud.insertLink(bodyPayload);

    // 연결된 클라이언트에 변경사항 브로드캐스트
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

예:

~~~js
app.put("/data/link/:id", (req, res) => {
    const id = req.params.id;
    const event = sanitize(req.body);

    const result = crud.updateLink(id, event);

    // 연결된 클라이언트에 변경사항 브로드캐스트
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

예:

~~~js
app.delete("/data/link/:id", (req, res) => {
    const id = req.params.id;
    const result = crud.deleteLink(id);

    // 연결된 클라이언트에 변경사항 브로드캐스트
    wsManager.broadcast("event", {
        name: "links",
        value: { type: "delete-link", link: { id } },
    });

    res.status(200).send();
});
~~~

## 고급 커스터마이제이션

### 커스텀 핸들러

설명된 형식에서 `RemoteEvents` 도우미는 서버와의 WebSocket 연결의 초기 핸드셰이크 및 메시지 수신을 담당합니다.
이 모듈의 두 번째 부분은 WebSocket으로 수신된 메시지를 파싱하고 Gantt에 적절한 변경을 적용하는 역할을 하는 `remoteUpdates` 도우미입니다.

~~~js
const { RemoteEvents, remoteUpdates } = gantt.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~

일반적으로 이러한 도우미는 추가 구성 없이 사용할 수 있습니다. 그러나 기존 프로토콜을 확장하기 위해 사용자 정의 도우미를 추가하거나 원격 업데이트를 위한 사용자 정의 핸들러를 구현하는 것도 가능합니다.

`RemoteEvents.on` 메서드는 하나 또는 여러 엔티티에 대해 핸들러를 지정할 수 있는 객체 인수를 기대합니다:

~~~js
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on({ 
    tasks: function(message) {
        const { type, task } = message;
        switch (type) {
            case "add-task":
                // 추가 이벤트 처리
                break;
            case "update-task":
                // 업데이트 이벤트 처리
                break;
            case "delete-task":
                // 삭제 이벤트 처리
                break;
        }
    }
});
~~~

사용자 정의 작업을 추가해야 하는 경우, `remoteEvents`에 추가 핸들러를 정의해 이를 수행할 수 있습니다:

~~~js
const { RemoteEvents, remoteUpdates } = gantt.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
remoteEvents.on({ 
    tasks: function(message) {
        const { type, task } = message;
        switch (type) {
            case "custom-action":
                // 커스텀 작업 처리
                break;
        }
    }
});
~~~

다음 메시지에 의해 핸들러가 호출됩니다:

~~~js
{"action":"event","body":{"name":"tasks",
   "value":{"type":"custom-action","task":value}}}
~~~

`RemoteEvents`를 사용해 커스텀 엔티티의 업데이트를 수신하고자 한다면 핸들러를 추가하여 이를 달성할 수 있습니다:

~~~js
const { RemoteEvents, remoteUpdates } = gantt.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);

// 커스텀 엔티티 구독
remoteEvents.on({ 
    resources: function(message) {
        const { type, value } = message;
        switch (type) {
            case "custom-action":
                // 커스텀 작업 처리
                break;
        }
    }
});

~~~

이와 같이 초기화하면, `remoteEvents` 객체는 다음과 같은 형식의 구독 메시지를 WebSocket에 보냅니다:

~~~js
{"action":"subscribe","name":"resources"}
~~~

그리고 지정된 엔티티로 향하는 메시지가 수신될 때 핸들러가 호출됩니다:

~~~js
{"action":"event","body":{"name":"resources",
   "value":{"type":"custom-action","value":value}}}
~~~

이 가이드는 DHTMLX Gantt에서 실시간 업데이트를 구현하고 커스터마이즈하는 데 필요한 기반을 제공합니다. 전체 예제는 
[GitHub 저장소를 참조하십시오](https://github.com/DHTMLX/gantt-multiuser-backend-demo).

## 원격 업데이트 API

`RemoteUpdates` 모듈을 사용하면 Gantt를 외부 변경 소스에 연결하여 원격 변경의 통합을 쉽게 할 수 있습니다.

~~~js
const { remoteUpdates } = gantt.ext.liveUpdates;

// 업데이트 훅을 호출하지 않고 Gantt에 작업 삽입
remoteUpdates.tasks({ type: "add-task", task: TASK_OBJECT });

// 업데이트 훅을 호출하지 않고 Gantt에서 작업 수정
remoteUpdates.tasks({ type: "update-task", task: TASK_OBJECT });

// 업데이트 훅을 호출하지 않고 Gantt에서 작업 삭제
remoteUpdates.tasks({ type: "delete-task", task: {id: TASK_ID}});

// 링크 작업
remoteUpdates.links({ type: "add-link", link: LINK_OBJECT });
remoteUpdates.links({ type: "update-link", link: LINK_OBJECT });
remoteUpdates.links({ type: "delete-link", link: {id: LINK_ID}});
~~~

Gantt를 Firestore 업데이트에 연결하는 방법의 예제는 [GitHub 저장소](https://github.com/DHTMLX/firebase-gantt-demo/)를 참고하십시오.