---  
title: "Mehrbenutzer-Live-Updates"  
sidebar_label: "Mehrbenutzer-Live-Updates"  
---  

# Mehrbenutzer-Live-Updates

Dieser Artikel beschreibt, wie man serverseitige Unterstützung für das Real-Time-Updates-Modul von DHTMLX Gantt implementiert.

## Prinzip

DHTMLX Gantt bietet den `RemoteEvents`-Hilfsmitteln, um Änderungen zwischen mehreren Benutzern in Echtzeit zu synchronisieren.

### Kern-Workflow

- Der `RemoteEvents`-Client öffnet eine WebSocket-Verbindung, wenn Gantt initialisiert wird.  
- Die Benutzeränderungen (das „create“, „edit“ oder „delete“-Ereignis) werden über `DataProcessor` mittels REST-API an den Server gesendet.  
- Der Server broadcastet Updates an alle verbundenen Clients über WebSocket, nachdem er sie verarbeitet hat.  
- Der `RemoteEvents`-Client empfängt die Updates und wendet sie in Gantt an, um die Synchronisierung zwischen den Benutzern sicherzustellen.

Dieses Design ermöglicht es dem Backend-Modul, mehrere DHTMLX-Widgets (z. B. Kanban, Gantt, Scheduler) innerhalb derselben Anwendung zu unterstützen. Das gemeinsame Format vereinfacht die Daten-Synchronisation, ohne separate Backends für jedes Widget zu benötigen.

## Front-End-Integration

Initialisieren Sie `RemoteEvents` und richten Sie `DataProcessor` im gleichen Codeteil ein, in dem Gantt-Daten geladen werden.

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

### Wichtige Details

- Der `RemoteEvents`-Konstruktor erfordert ein Autorisierungstoken, das im **"Remote-Token"**-Header zur Server-Validierung gesendet wird.  
- Das erste Argument gibt den `WebSocket`-Endpunkt an (z. B. **/api/v1**).  
- Der `remoteUpdates`-Helper verarbeitet eingehende `WebSocket`-Nachrichten und synchronisiert die Gantt-Daten.

## Backend-Implementierung

Dieser Abschnitt beschreibt, wie man ein Backend erstellt, das Live-Updates unterstützt.

### Vereinfachtes Beispiel

- [Beispiel auf GitHub ansehen](https://github.com/DHTMLX/gantt-multiuser-backend-demo)

Zum Testen der Implementierung:

- Extrahieren Sie das Backend-Projekt und starten Sie es mit den Befehlen `npm install` und `npm run start`.  
- Öffnen Sie das Frontend-Beispiel in zwei separaten Browser-Tabs.  
- Bearbeiten Sie eine Aufgabe in einem Tab; die Änderungen sollten im zweiten Tab sichtbar werden.

### Server-Seitiger Arbeitsablauf

#### 1. Handshake-Anfrage

Beim Erstellen sendet `RemoteEvents` eine **GET**-Anfrage an den Server, um die Verbindung zu initialisieren.

Beispiel:  
~~~  
GET /api/v1  
Remote-Token: AUTH_TOKEN  
~~~

Antwort:

~~~js
{"api":{},"data":{},"websocket":true}
~~~

#### 2. WebSocket-Verbindung

Nach dem Empfang einer Antwort wird die WebSocket-Verbindung mit dem angegebenen Endpunkt hergestellt.

Beispiel:

~~~  
ws://${URL}?token=${token}&ws=1
~~~

Der Server überprüft das Token und antwortet mit einer Nachricht:

~~~js
{"action":"start","body":"connectionId"}
~~~

Beispiel-Implementierung:

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

#### 3. Abonnement

Nachdem die Verbindung hergestellt ist, abonniert `RemoteEvents` Updates für bestimmte Entitäten, `tasks` und `links` im Fall von Gantt:

- für Tasks

~~~js
{"action":"subscribe","name":"tasks"}
~~~

- für Links

~~~js
{"action":"subscribe","name":"links"}
~~~

Zum Abbestellen:

- für Tasks

~~~js
{"action":"unsubscribe","name":"tasks"}
~~~

- für Links

~~~js
{"action":"unsubscribe","name":"links"}
~~~

:::note
 Dieses Format unterstützt Szenarien, in denen eine Anwendung mehrere DHTMLX-Widgets gleichzeitig verwendet. Jedes Widget abonniert nur die Updates, die für seine Daten relevant sind.
:::

Beispiel:

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

#### 4. Verbreitung von Updates

Der Server sendet Updates über WebSocket für Änderungen wie das Erstellen, Aktualisieren oder Löschen von Tasks und Links im unten beschriebenen Format.

Beim Empfang dieser Nachrichten synchronisiert Gantt automatisch seine Daten mithilfe des `remoteUpdates`-Helpers.

**Task erstellt**

~~~js
{"action":"event","body":{"name":"tasks",
   "value":{"type":"add-task","task":TASK_OBJECT}}}
~~~

Beispiel:

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

**Task aktualisiert**

~~~js
{"action":"event","body":{"name":"tasks",
   "value":{"type":"update-task","task":TASK_OBJECT}}}
~~~

Beispiel:

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

**Task gelöscht**

~~~js
{"action":"event","body":{"name":"tasks",
   "value":{"type":"delete-task","task":{"id":ID}}}}
~~~

Beispiel:

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

**Link erstellt**

~~~js
{"action":"event","body":{"name":"links",
   "value":{"type":"add-link","link":LINK_OBJECT}}}
~~~

Beispiel:

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

**Link aktualisiert**

~~~js
{"action":"event","body":{"name":"links",
   "value":{"type":"update-link","link":LINK_OBJECT}}}
~~~

Beispiel:

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

**Link gelöscht**

~~~js
{"action":"event","body":{"name":"links",
   "value":{"type":"delete-link","link":{"id":ID}}}}
~~~

Beispiel:

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

## Erweiterte Anpassung

### Benutzerdefinierte Handler

Im beschriebenen Format ist der `RemoteEvents`-Helfer verantwortlich für den initialen Handshake zum Aufbau einer WebSocket-Verbindung mit dem Server und dem Empfangen von Nachrichten.  
Der zweite Teil dieses Moduls ist der `remoteUpdates`-Helper, der dafür zuständig ist, Nachrichten, die über einen WebSocket empfangen werden, zu parsen und entsprechende Änderungen in Gantt anzuwenden.

~~~js
const { RemoteEvents, remoteUpdates } = gantt.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~

Normalerweise können Sie diese Hilfsmittel ohne zusätzliche Konfiguration verwenden. Es ist jedoch möglich, das bestehende Protokoll zu erweitern, indem Sie einen benutzerdefinierten Helper hinzufügen oder einen benutzerdefinierten Handler für Remote-Updates implementieren.

Die Methode `RemoteEvents.on` erwartet das Objektargument, das Handler für eine oder mehrere Entitäten spezifizieren kann:

~~~js
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on({ 
    tasks: function(message) {
        const { type, task } = message;
        switch (type) {
            case "add-task":
                // Behandlung des Add-Ereignisses
                break;
            case "update-task":
                // Behandlung des Update-Ereignisses
                break;
            case "delete-task":
                // Behandlung des Delete-Ereignisses
                break;
        }
    }
});
~~~


Wenn Sie eine benutzerdefinierte Aktion hinzufügen müssen, können Sie dies tun, indem Sie einen zusätzlichen Handler für `remoteEvents` hinzufügen:

~~~js
const { RemoteEvents, remoteUpdates } = gantt.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
remoteEvents.on({ 
    tasks: function(message) {
        const { type, task } = message;
        switch (type) {
            case "custom-action":
                // benutzerdefinierte Aktion behandeln
                break;
        }
    }
});
~~~

Der Handler wird durch folgende Nachricht aufgerufen:

~~~js
{"action":"event","body":{"name":"tasks",
   "value":{"type":"custom-action","task":value}}}
~~~

Wenn Sie `RemoteEvents` verwenden möchten, um Updates für benutzerdefinierte Entitäten zu empfangen, können Sie dies erreichen, indem Sie einen Handler hinzufügen:

~~~js
const { RemoteEvents, remoteUpdates } = gantt.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);

// Subscribing to custom entities
remoteEvents.on({ 
    resources: function(message) {
        const { type, value } = message;
        switch (type) {
            case "custom-action":
                // benutzerdefinierte Aktion behandeln
                break;
        }
    }
});
~~~

Wenn er auf diese Weise initialisiert wird, sendet das `remoteEvents`-Objekt dem WebSocket eine Abonnement-Nachricht im folgenden Format:

~~~js
{"action":"subscribe","name":"resources"}
~~~

Und der Handler wird aufgerufen, wenn eine Nachricht, die an die angegebene Entität gerichtet ist, empfangen wird:

~~~js
{"action":"event","body":{"name":"resources",
   "value":{"type":"custom-action","value":value}}}
~~~

Diese Anleitung bietet die Grundlage für die Implementierung und Anpassung von Live-Updates in DHTMLX Gantt. Für ein vollständiges Beispiel verweisen Sie auf das GitHub-Repository.

## Remote Updates API

Das `RemoteUpdates`-Modul kann verwendet werden, um Gantt mit jeder Quelle externer Änderungen zu verbinden und eine einfache Integration von Remote-Änderungen zu ermöglichen.

~~~js
const { remoteUpdates } = gantt.ext.liveUpdates;

// fügt Task in Gantt ein, ohne Update-Hooks zu triggern
remoteUpdates.tasks({ type: "add-task", task: TASK_OBJECT });

// aktualisiert Task in Gantt, ohne Update-Hooks zu triggern
remoteUpdates.tasks({ type: "update-task", task: TASK_OBJECT });

// löscht Task aus Gantt, ohne Update-Hooks zu triggern
remoteUpdates.tasks({ type: "delete-task", task: {id: TASK_ID}});

// Link-Operationen
remoteUpdates.links({ type: "add-link", link: LINK_OBJECT });
remoteUpdates.links({ type: "update-link", link: LINK_OBJECT });
remoteUpdates.links({ type: "delete-link", link: {id: LINK_ID}});
~~~

Sehen Sie sich das Beispiel an, wie Gantt mit Firestore-Updates verbunden werden kann, im [GitHub-Repository](https://github.com/DHTMLX/firebase-gantt-demo/).