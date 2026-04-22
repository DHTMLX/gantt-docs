---
title: "Server-seitige Integration"
sidebar_label: "Server-seitige Integration"
---

# Server-seitige Integration

Der empfohlene Ansatz, um dhtmlxGantt mit einem Backend zu verbinden, besteht darin, eine RESTful API auf dem Server zu implementieren und das [](api/other/dataprocessor.md) Modul auf dem Client zu verwenden.

DataProcessor ist ein integriertes Modul, das Datenänderungen in Gantt überwacht und Updates an die REST-API im angegebenen Format sendet, wodurch eine einfache Integration mit serverseitigen Plattformen ermöglicht wird. Wenn Sie eine Objekt-Datenquelle verwenden, kann DataProcessor so konfiguriert werden, dass Callback-Funktionen für Datenänderungen bereitgestellt werden, die Sie für die Datenbindung nutzen können.

Sie können sich das Video-Guide anschauen, der zeigt, wie man auf der Seite ein Gantt-Diagramm erstellt und die Daten am Beispiel einer Node.js-Plattform hineinlädt.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Technik

Generell benötigen Sie, um Daten von der Serverseite über REST API zu laden, Folgendes:

### Clientseitig

1) Rufen Sie die [](api/method/load.md) Methode auf, wobei als Parameter die URL spezifiziert wird, die Gantt-Daten im [JSON](/guides/supported-data-formats/) Format zurückgibt.

2) Erstellen Sie eine DataProcessor-Instanz auf eine der beiden Arten: 

- DataProcessor initialisieren und an das dhtmlxGantt-Objekt anhängen:
  
~~~js
gantt.init("gantt_here");
gantt.load("apiUrl");

// Reihenfolge der Zeilen beibehalten
const dp = new gantt.dataProcessor("apiUrl");
dp.init(gantt);
dp.setTransactionMode("REST");
dp.deleteAfterConfirmation = true;
~~~

:::note
Es wird empfohlen, die zweite Methode zu verwenden.
:::

- Die [](api/method/createdataprocessor.md) Methode aufrufen und ein Objekt mit Konfigurationsoptionen als Parameter übergeben:

~~~js
const dp = gantt.createDataProcessor({
    url: "apiUrl",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

Details finden Sie im nächsten Abschnitt.


###  Creating DataProcessor {#createdp}

Während der Erstellung eines DataProcessor über die API-Methode [](api/method/createdataprocessor.md) haben Sie mehrere Optionen, Parameter zu übergeben. 
  
1. Verwenden Sie eine der vordefinierten Request-Modi, wie z. B.:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

wobei:

- **url** - die URL zur Serverseite
- **mode** - der Modus zum Senden von Daten an den Server:  "GET" | "POST" | "REST" | "JSON" | "REST-JSON"
- **deleteAfterConfirmation** - definiert, ob die Aufgabe aus dem gantt erst nach einer erfolgreichen Serverantwort gelöscht werden darf. Abhängigkeitsverknüpfungen und Unteraufgaben werden nach Bestätigung der Löschung des übergeordneten Elements gelöscht.

2. Ein benutzerdefiniertes **router**-Objekt bereitstellen:

~~~js
const dp = gantt.createDataProcessor(router);
~~~

- wobei **router** entweder eine Funktion ist:

~~~js
// entity - "task"|"link"|"resource"|"assignment"
// action - "create"|"update"|"delete"
// data - ein Objekt mit Task- oder Link-Daten
// id – die id eines verarbeiteten Objekts (Task oder Link)
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

- oder ein Objekt der folgenden Struktur:

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

Alle Funktionen des **router**-Objekts sollten entweder eine Promise oder ein Datenantwort-Objekt zurückgeben. Dies wird benötigt, damit der dataProcessor die Datenbank-ID anwendet und das **onAfterUpdate**-Ereignis des Data Processor hooked.

~~~js
const router = (entity, action, data, id) => {
    return new gantt.Promise((resolve, reject) => {
        // … Logik
        return resolve({ tid: databaseId });
    });
};
~~~

So können Sie DataProcessor zum Speichern von Daten im LocalStorage verwenden oder in jedem anderen Speicher, der nicht mit einer bestimmten URL verknüpft ist, oder falls zwei verschiedene Server (URLs) für das Erstellen bzw. Löschen von Objekten verantwortlich sind.

**Beispiel**: [Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### Request and response details {#requestresponsedetails}

Die URL ergibt sich aus folgender Regel:

- api/link/id
- api/task/id
- api/resource/id
- api/assignment/id

wobei "api" die URL ist, die Sie in der dataProcessor-Konfiguration angegeben haben.

Die Liste möglicher Anfragen und Antworten ist:

<table class="dp_table">
  <tr>
  <th><b>Aktion</b></th><th><b>HTTP-Methode</b></th><th><b>URL</b></th><th><b>Antwort</b></th>
  </tr>
  <tr>
  <td>load data</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON format](/guides/supported-data-formats/)</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Tasks</td></tr>
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
  <tr><td colspan="4" style="font-weight:bold">Links</td></tr>
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
  <tr><td colspan="4" style="font-weight:bold">Resources</td></tr>
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
  <tr><td colspan="4" style="font-weight:bold">Resource Assignments</td></tr>
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
Standardmäßig werden Resources und Resource Assignments nicht an den DataProcessor gesendet. Falls benötigt, müssen Sie dieses Verhalten explizit aktivieren.
Lesen Sie mehr [hier](guides/server-side.md#resources_crud).
:::


### Request parameters {#requestparams}

Create/Update/Delete-Anfragen enthalten alle öffentlichen Eigenschaften eines clientseitigen Task- oder Link-Objekts:

Task:

- **start_date**: 2025-04-08 00:00:00
- **duration**: 4
- **text**: Task #2.2
- **parent**: 3
- **end_date**: 2025-04-12 00:00:00

Link:

- **source**: 1
- **target**: 2
- **type**: 0

Hinweis:

- Das Format der Parameter **start_date** und **end_date** wird durch die Konfiguration [](api/config/date_format.md) festgelegt.
- Der Client sendet alle öffentlichen Eigenschaften eines Task- oder Link-Objekts. Eine Anfrage kann daher eine Vielzahl zusätzlicher Parameter enthalten.
- Wenn Sie das Datenmodell durch das Hinzufügen neuer Spalten/Eigenschaften erweitern, sind keine zusätzlichen Maßnahmen erforderlich, damit gantt sie an das Backend sendet.

:::note
Mit öffentlichen Eigenschaften meinen wir hier Eigenschaften, deren Namen nicht mit einem Unterstrich (_) oder einem Dollarzeichen ($) beginnen, z. B. Eigenschaften mit dem Namen task._owner oder link.$state werden nicht an das Backend gesendet.
:::


### REST-JSON-Modus {#restjson}

Neben den Transaktionsmodi "POST","GET","REST" und "JSON" kann Gantt DataProcessor auch im Modus "REST-JSON" verwendet werden.

~~~js
gantt.load("apiUrl");

const dp = gantt.createDataProcessor({
    url: "/apiUrl",
    mode: "REST-JSON"
});
~~~

Er verwendet dieselben [URLs für Anfragen](#requestresponsedetails), aber die [Request-Parameter](#requestparams) für Tasks und Links sowie deren Form zum Senden an den Server unterscheiden sich.

Im REST-Modus werden Daten als Formular gesendet:

~~~jsx
Content-Type: application/x-www-form-urlencoded
~~~

während im REST-JSON-Modus Daten im JSON-Format gesendet werden:

~~~jsx title="Headers"
Content-type: application/json
~~~

Also werden Parameter als JSON-Objekt gesendet:

**Request Payload**

- Task

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

- Link

~~~jsx
{
    "source": 1,
    "target": 2,
    "type": "0"
}
~~~

Dieses Format erleichtert die Verarbeitung komplexer Datensätze auf jedem serverseitigen Plattform.

### Server-seitig {#loadserverside}

Bei jeder Aktion in Gantt (Hinzufügen, Aktualisieren oder Löschen von Tasks oder Links) reagiert dataProcessor, indem eine AJAX-Anfrage an den Server gesendet wird.

Jede Anfrage enthält alle Daten, die zum Speichern der Änderungen in der Datenbank benötigt werden.
Da wir dataProcessor im REST-Modus initialisiert haben, werden unterschiedliche HTTP-Verben für jeden Operationstyp verwendet.

Da wir die REST-API verwenden, ist es möglich, die Serverseite mit unterschiedlichen Frameworks und Programmiersprachen zu implementieren.
Hier ist eine Liste verfügbarer serverseitiger Implementierungen, die Sie für die Backend-Integration von Gantt verwenden können:

- [dhtmlxGantt mit ASP.NET Core 2](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt mit PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt mit PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt mit Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt mit ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt mit Ruby on Rails](integrations/other/howtostart-ruby.md)


### Speichern der Reihenfolge der Aufgaben {#storingtheorderoftasks}

Gantt zeigt Aufgaben in derselben Reihenfolge an, in der sie aus einer Datenquelle kommen. Wenn Sie es den Benutzern ermöglichen, Aufgaben manuell neu zu ordnen ([Drag&#39;n&#39;Drop innerhalb der gesamten Gantt-Struktur guidem](guides/reordering-tasks.md#drag-n-drop-within-the-whole-gantt-structure)), müssen Sie diese Reihenfolge auch in der Datenbank speichern und sicherstellen, dass Ihr Daten-Feed Daten in entsprechend sortierter Reihenfolge zurückgibt.

Client-seitige Konfiguration:

~~~js
// Neuordnung von Aufgaben innerhalb der gesamten gantt
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
gantt.load("/api");

const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

Die Speicherrichtung kann auf verschiedene Arten implementiert werden; wir zeigen eine davon.

- Sie fügen Ihrer Tasks-Tabelle eine numerische Spalte hinzu, nennen wir sie 'sortorder'.
- Beim Ausführen der GET-Aktion sortieren Sie Aufgaben nach dieser Spalte aufsteigend.
- Wenn eine neue Aufgabe hinzugefügt wird, sollte sie `MAX(sortorder) + 1` als sortorder erhalten.
- Wenn die Reihenfolge auf der Clientseite geändert wird, sendet gantt PUT (POST, wenn Sie den REST-Modus nicht verwenden) mit allen Eigenschaften einer Aufgabe sowie Werten, die die Position der Aufgabe im Projektbaum beschreiben.

<table class="dp_table">
  <tr>
  <th><b>HTTP-Methode</b></th><th><b>URL</b></th><th><b>Parameter</b></th><th><b>Antwort</b></th>
  </tr>
  <tr>
  <td>PUT</td>
  <td>/apiUrl/task/taskId</td>
  <td><b>target=</b>adjacentTaskId</td>
  <td>("action":"updated")</td>
  </tr>
</table>

Das <b>target</b>-Parameter wird die ID der nächstliegenden Aufgabe enthalten, die rechts vor der aktuellen Aufgabe oder danach liegt.

Sein Wert kann in zwei Formaten vorliegen:

 - *target="targetId"*  - Die aktuelle Aufgabe soll direkt vor der Zielaufgabe mit der ID targetId stehen
 - *target="next:targetId"* - Die aktuelle Aufgabe soll direkt nach der Zielaufgabe mit der ID targetId stehen

Die Anwendung von Positionsänderungen umfasst üblicherweise die Aktualisierung mehrerer Aufgaben. Hier ein Pseudo-Code-Beispiel, wie dies implementiert werden kann:

~~~js
const target = request["target"];
const currentTaskId = request["id"];
let nextTask;
let targetTaskId;

// Hole die ID der angrenzenden Aufgabe und prüfe, ob die aktualisierte Aufgabe vor oder nach ihr platziert werden soll
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

// Die aktualisierte Aufgabe erhält den sortorder-Wert der angrenzenden Aufgabe
let targetOrder = targetTask.sortorder;

// Falls sie nach der angrenzenden Aufgabe stehen soll, erhält sie einen größeren sortorder
if (nextTask) targetOrder++;

// Erhöhen der sortorder von Aufgaben, die nach der aktualisierten Aufgabe stehen
tasks.where(task => task.sortorder >= targetOrder)
    .update(task => task.sortorder++);

// Und aktualisiere die Aufgabe mit ihrer neuen sortorder
currentTask.sortorder = targetOrder;

tasks.save(currentTask);
~~~

Sie können sich die detaillierten Beispiele ansehen, wie die Speicherung der Aufgabenreihenfolge für bestimmte serverseitige Plattformen implementiert wird: 
[plain PHP](integrations/php/howtostart-php.md#storingtheorderoftasks), [Laravel](integrations/php/howtostart-php-laravel.md#storingtheorderoftasks),
[Node.js](integrations/node/howtostart-nodejs.md#storingtheorderoftasks), [ASP.NET Web API](integrations/dotnet/howtostart-dotnet.md#storingtheorderoftasks) und 
[Rails](integrations/other/howtostart-ruby.md#storingtheorderoftasks).


## Custom Request Headers and Parameters 

### Adding custom request headers

Sie können Ihrem Backend zusätzliche Header senden. Zum Beispiel nehmen wir an, Sie müssen ein Autorisierungstoken in Ihre Anfragen aufnehmen:

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

Derzeit unterstützt [](api/method/load.md) keine Header-/Payload-Parameter, sodass Sie sie ggf. für GET-Anfragen manuell per xhr senden müssen und Daten mittels [](api/method/parse.md) in gantt laden müssen, zum Beispiel:

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


### Adding custom parameters to the request

Es gibt mehrere Möglichkeiten, zusätzliche Parameter an die Anfragen anzuhängen.

Wie Sie wissen, sendet gantt alle Eigenschaften des Datenobjekts zurück an das Backend. Sie können daher direkt eine zusätzliche Eigenschaft zum Datenobjekt hinzufügen und sie wird an das Backend gesendet:

~~~js
gantt.attachEvent("onTaskCreated", (task) => {
    task.userId = currentUser;
    return true;
});
~~~

Alternativ können Sie benutzerdefinierte Parameter zu allen Anfragen hinzufügen, die vom Data Processor gesendet werden, indem Sie die payload-Eigenschaft verwenden:

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

Eine weitere Möglichkeit, benutzerdefinierte Parameter zu einer Anfrage hinzuzufügen, besteht darin, das onBeforeUpdate-Ereignis von DataProcessor zu verwenden:

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


## Auslösen der Datenspeicherung aus Skript

Wenn Sie DataProcessor initialisiert haben, werden Änderungen des Benutzers oder programmatisch vorgenommenen Änderungen automatisch in der Datenquelle gespeichert.

Generell verwenden Sie, um eine bestimmte Aufgabe oder Abhängigkeit programmatisch zu aktualisieren, die Methoden [](api/method/updatetask.md) und [](api/method/updatelink.md) bzw.:

~~~js
gantt.parse([
    { id: 1, text: "Task 1", start_date: "2025-05-13 06:00", duration: 2 },
    { id: 2, text: "Task 2", start_date: "2025-05-19 08:00", duration: 3 }
]);

const task = gantt.getTask(1);
task.text = "Task 37"; //ändert Task-Daten
gantt.updateTask(1); // rendert die aktualisierte Aufgabe
~~~

Weitere Methoden, die ein Update an das Backend senden, sind:

- [addTask](api/method/addtask.md)
- [updateTask](api/method/updatetask.md)
- [deleteTask](api/method/deletetask.md)
- [addLink](api/method/addlink.md)
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)

## Custom Routing {#customrouting}

Falls die RESTful AJAX-API nicht das ist, was Sie im Backend benötigen, oder wenn Sie manuell steuern möchten, was an den Server gesendet wird, können Sie benutzerdefinierte Routing-Optionen nutzen.

Zum Beispiel, wenn Sie Angular, React oder jedes andere Framework verwenden, bei dem eine Komponente auf einer Seite Änderungen nicht direkt an den Server sendet, sondern sie an eine andere Komponente weitergibt, die für das Speichern der Daten verantwortlich ist.

Um benutzerdefinierte Routing-Optionen für DataProcessor bereitzustellen, sollten Sie die Methode [**createDataProcessor()**](#createdp) verwenden:

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


**Beispiel**: [Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### Verwendung von AJAX zum Festlegen benutzerdefinierter Router

[Gantt AJAX-Modul](api/other/ajax.md) kann nützlich sein, um benutzerdefinierte Routen festzulegen. Gantt erwartet, dass ein benutzerdefinierter Router ein Promise-Objekt als Ergebnis einer Operation zurückgibt, wodurch das Ende einer Aktion erfasst werden kann. 
Das AJAX-Modul unterstützt Promises und eignet sich zur Verwendung innerhalb benutzerdefinierter Router. Gantt erhält das Promise und verarbeitet dessen Inhalt, sobald es aufgelöst wird. 

Im nachfolgenden Beispiel wird eine neue Aufgabe erstellt. Wenn die Serverantwort die ID einer neu erstellten Aufgabe enthält, kann Gantt diese anwenden.

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


## Routing von CRUD-Aktionen von Ressourcen und Ressourcen-Zuweisungen {#resources_crud}

Ab Version 8.0 können modifizierte Ressourcen-Zuweisungen dem DataProcessor als separate Einträge mit persistierenden IDs gesendet werden, was eine einfache Anbindung an die Backend-API ermöglicht. Änderungen an Ressourcenobjekten können ebenfalls an den DataProcessor gesendet werden.

Beachten Sie, dass dieses Feature standardmäßig deaktiviert ist. Standardmäßig erhält der DataProcessor nur Änderungen an Tasks und Links. Um das Feature zu aktivieren, verwenden Sie die folgenden Einstellungen:

~~~js
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
};
~~~

Sobald der Ressourcen-Modus des DataProcessor aktiviert ist und der DataProcessor im REST-Modus konfiguriert ist, werden Ressourcen und Ressourcen-Zuweisungen in separaten Anfragen an das Backend gesendet.

Verwenden Sie den DataProcessor im Custom Routing-Modus, können Sie Änderungen von Ressourcen-Zuweisungen und Ressourcen im Handler erfassen:

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

Oder, mittels Funktions-Deklaration:

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


## Fehlerbehandlung

Ein Server kann Gantt mitteilen, dass eine Aktion fehlgeschlagen ist, indem er die Antwort "action":"error" zurückgibt:

~~~js
{"action":"error"}
~~~

Eine solche Antwort kann auf dem Client mit Hilfe von gantt.dataProcessor erfasst werden:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});

dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        // hier etwas tun
    }
});
~~~

Das Antwortobjekt kann beliebig viele zusätzliche Eigenschaften enthalten, auf die über das `response`-Argument des onAfterUpdate-Handlers zugegriffen werden kann.

:::note
Dieses Ereignis wird nur für verwaltete Fehler aufgerufen, die eine JSON-Antwort wie oben gezeigt zurückgeben.
Wenn Sie HTTP-Fehler behandeln müssen, lesen Sie bitte die API-Event-Seite [](api/event/onajaxerror.md).
:::

Wenn der Server bei einer Ihrer Aktionen mit einem Fehler antwortete, die Änderungen jedoch auf dem Client gespeichert wurden, ist der beste Weg, deren Zustand zu synchronisieren, den Client-Zustand zu löschen und die korrekten Daten erneut vom Server zu laden:

~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        gantt.clearAll();
        gantt.load("url1");
    }
});
~~~

Wenn Sie Client- und Server-Seiten synchronisieren möchten, aber keine Serveraufrufe durchführen möchten, können Sie die [silent()](api/method/silent.md) Methode verwenden, die dafür sorgt, dass der Code darin keine internen Ereignisse oder Serveraufrufe auslöst:

~~~js
gantt.silent(() => {
    gantt.deleteTask(item.id);
});

gantt.render();
~~~


## Kaskadierte Löschung

Standardmäßig löst das Löschen einer Aufgabe eine Kaskadenlöschung ihrer verschachtelten Aufgaben und der zugehörigen Links aus. Gantt sendet für jede entfernte Aufgabe und jeden entfernten Link eine *delete*-Anfrage.
Daher müssen Sie die Datenintegrität auf dem Backend nicht separat sicherstellen; Gantt übernimmt dies relativ gut.

Auf der anderen Seite kann diese Strategie eine große Anzahl von AJAX-Anfragen an die Backend-API erzeugen, da dhtmlxGantt keine Batch-Request-Unterstützung für AJAX bietet und die Anzahl der Aufgaben und Links nicht begrenzt ist. 

In diesem Fall kann die kaskadierte Löschung über die cascade_delete-Konfiguration deaktiviert werden. 
Wenn also ein Projektzweig gelöscht wird, sendet der Client eine Löschanfrage nur für das oberste Element und erwartet, dass das Backend die zugehörigen Links und Unteraufgaben löscht.

## XSS-, CSRF- und SQL-Injection-Angriffe

Beachten Sie, dass Gantt keinerlei Mechanismen bietet, um eine Anwendung gegen verschiedene Bedrohungen wie SQL-Injektionen oder XSS- und CSRF-Angriffe zu schützen. 
Es liegt in der Verantwortung der Entwickler, die das Backend implementieren, dafür zu sorgen, dass eine Anwendung sicher bleibt.

Weitere Informationen zu den verwundbarsten Punkten der Komponente und empfohlenen Maßnahmen zur Verbesserung der Sicherheit Ihrer Anwendung finden Sie im Artikel [Application Security](guides/app-security.md). 

