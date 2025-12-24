---
title: "Serverseitige Integration"
sidebar_label: "Serverseitige Integration"
---

# Serverseitige Integration



Die beste Methode, um dhtmlxGantt mit einem Backend zu verbinden, besteht darin, eine RESTful API auf dem Server einzurichten und das Modul [dataprocessor](api/other/dataprocessor.md) auf der Clientseite zu verwenden.

DataProcessor ist eine integrierte Funktion, die Änderungen an den Gantt-Daten überwacht und Aktualisierungen im benötigten Format an die REST API sendet. Dadurch wird die [Integration mit serverseitigen Plattformen](integrations/howtostart-guides.md) besonders einfach. Bei der Arbeit mit einer Objekt-Datenquelle kann DataProcessor so eingerichtet werden, dass Callbacks für Datenänderungen bereitgestellt werden, was für das Data Binding nützlich ist.

Es gibt auch ein Video-Tutorial, das zeigt, wie man ein Gantt-Diagramm erstellt und Daten darin lädt. Als Beispiel wird Node.js verwendet.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Vorgehensweise {#technique}


Im Allgemeinen müssen Sie folgende Schritte ausführen, um Daten mithilfe einer REST API vom Server zu laden:

### Client-Seite

1) Verwenden Sie die Methode [load](api/method/load.md), um Gantt-Daten zu laden, indem Sie eine URL angeben, die Daten im [JSON](guides/supported-data-formats.md#json)-Format zurückgibt.

2) Erstellen Sie eine DataProcessor-Instanz auf eine der folgenden Arten:

- Initialisieren Sie DataProcessor und verknüpfen Sie ihn mit dem dhtmlxGantt-Objekt:

~~~js
gantt.init("gantt_here");
gantt.load("apiUrl");

// belassen Sie die Reihenfolge der folgenden Zeilen
const dp = new gantt.dataProcessor("apiUrl");
dp.init(gantt);
dp.setTransactionMode("REST");
dp.deleteAfterConfirmation = true;
~~~

:::note
Es wird empfohlen, die zweite Methode zu verwenden.
:::

- Verwenden Sie die Methode [createDataProcessor](api/method/createdataprocessor.md), indem Sie ein Objekt mit Konfigurationsoptionen übergeben:

~~~js
const dp = gantt.createDataProcessor({
    url: "apiUrl",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

Weitere Details finden Sie im folgenden Abschnitt.


###  DataProcessor erstellen {#createdp}

Beim Erstellen eines DataProcessor über die API-Methode [createDataProcessor](api/method/createdataprocessor.md) gibt es verschiedene Möglichkeiten, Parameter zu übergeben.

1. Verwenden Sie einen der vordefinierten Request-Modi, wie folgt:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST",
    deleteAfterConfirmation: true
});
~~~

wobei:

- **url** - das Endpoint auf der Serverseite
- **mode** - die Methode zum Senden von Daten an den Server: "GET" | "POST" | "REST" | "JSON" | "REST-JSON"
- **deleteAfterConfirmation** - bestimmt, ob eine Aufgabe erst nach Bestätigung der Löschung durch den Server aus dem Gantt entfernt werden soll. Abhängigkeiten und Unteraufgaben werden gelöscht, sobald das Löschen der übergeordneten Aufgabe bestätigt wurde.

2. Übergeben Sie ein benutzerdefiniertes **router**-Objekt:

~~~js
const dp = gantt.createDataProcessor(router);
~~~

- wobei **router** eine Funktion sein kann:

~~~js
// entity - "task"|"link"|"resource"|"assignment"
// action - "create"|"update"|"delete"
// data - ein Objekt mit Task- oder Link-Daten
// id – die ID des verarbeiteten Objekts (Task oder Link)
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

- oder ein Objekt, das wie folgt aufgebaut ist:

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

Alle Funktionen im **router**-Objekt sollten entweder ein Promise oder ein Data-Response-Objekt zurückgeben. Dadurch kann der dataProcessor die Datenbank-ID anwenden und das **onAfterUpdate**-Event auslösen.

~~~js
const router = (entity, action, data, id) => {
    return new gantt.Promise((resolve, reject) => {
        // … Logik
        return resolve({ tid: databaseId });
    });
};
~~~

Diese Flexibilität ermöglicht es, DataProcessor zum Speichern von Daten in localStorage oder jedem anderen Speicher zu verwenden, der nicht an eine bestimmte URL gebunden ist, oder wenn Erstellung und Löschung von verschiedenen Servern bearbeitet werden.


[Custom data api - using local storage](https://docs.dhtmlx.com/gantt/samples/08_api/22_data_processor.html)


### Details zu Requests und Responses {#requestresponsedetails}

Die URLs folgen diesem Muster:

- api/link/id
- api/task/id
- api/resource/id
- api/assignment/id

wobei "api" die in der DataProcessor-Konfiguration gesetzte URL ist.

Hier eine Liste möglicher Requests und Responses:

<table class="dp_table">
  <tr>
  <th><b>Aktion</b></th><th><b>HTTP-Methode</b></th><th><b>URL</b></th><th><b>Response</b></th>
  </tr>
  <tr>
  <td>Daten laden</td>
  <td>GET</td>
  <td>/apiUrl</td>
  <td>[JSON-Format](guides/supported-data-formats.md#json)</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Tasks</td></tr>
  <tr>
  <td>Neue Aufgabe hinzufügen</td>
  <td>POST</td>
  <td>/apiUrl/task</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>Aufgabe aktualisieren</td>
  <td>PUT</td>
  <td>/apiUrl/task/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>Aufgabe löschen</td>
  <td>DELETE</td>
  <td>/apiUrl/task/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Links</td></tr>
  <tr>
  <td>Neuen Link hinzufügen</td>
  <td>POST</td>
  <td>/apiUrl/link</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>Link aktualisieren</td>
  <td>PUT</td>
  <td>/apiUrl/link/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>Link löschen</td>
  <td>DELETE</td>
  <td>/apiUrl/link/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Ressourcen</td></tr>
  <tr>
  <td>Neue Ressource hinzufügen</td>
  <td>POST</td>
  <td>/apiUrl/resource</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>Ressource aktualisieren</td>
  <td>PUT</td>
  <td>/apiUrl/resource/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>Ressource löschen</td>
  <td>DELETE</td>
  <td>/apiUrl/resource/id</td>
  <td>("action":"deleted")</td>
  </tr>
  <tr><td colspan="4" style="font-weight:bold">Ressourcenzuweisungen</td></tr>
  <tr>
  <td>Neue Zuweisung hinzufügen</td>
  <td>POST</td>
  <td>/apiUrl/assignment</td>
  <td>("action":"inserted","tid":"id")</td>
  </tr>
  <tr>
  <td>Zuweisung aktualisieren</td>
  <td>PUT</td>
  <td>/apiUrl/assignment/id</td>
  <td>("action":"updated")</td>
  </tr>
  <tr>
  <td>Zuweisung löschen</td>
  <td>DELETE</td>
  <td>/apiUrl/assignment/id</td>
  <td>("action":"deleted")</td>
  </tr>
</table>

:::note
Standardmäßig sind Ressourcen und Ressourcenzuweisungen nicht in DataProcessor-Requests enthalten. Um sie einzubeziehen, müssen Sie dies explizit aktivieren.
Weitere Informationen finden Sie [hier](guides/server-side.md#resources_crud).
:::


### Request-Parameter {#requestparams}

Create-, Update- und Delete-Requests beinhalten alle öffentlichen Eigenschaften eines clientseitigen Task- oder Link-Objekts:

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

- Das Format für **start_date** und **end_date** wird durch die [date_format](api/config/date_format.md)-Konfiguration festgelegt.
- Der Client sendet alle öffentlichen Eigenschaften eines Tasks oder Links, daher können Requests zusätzliche Parameter enthalten.
- Wenn Sie neue Spalten oder Eigenschaften zu Ihrem Datenmodell hinzufügen, sendet gantt diese automatisch an das Backend.

:::note
Öffentliche Eigenschaften sind solche, deren Namen nicht mit einem Unterstrich (**_**) oder einem Dollarzeichen (**$**) beginnen,
Eigenschaften wie **task._owner** oder **link.$state** werden also nicht an das Backend gesendet.
:::


### REST-JSON-Modus {#restjson}

Neben den Modi "POST", "GET", "REST" und "JSON" unterstützt der Gantt DataProcessor auch den "REST-JSON"-Modus.

~~~js
gantt.load("apiUrl");

const dp = gantt.createDataProcessor({
    url: "/apiUrl",
    mode: "REST-JSON"
});
~~~

Er verwendet die gleichen [Request-URLs](#requestresponsedetails), aber die Übertragung der Parameter unterscheidet sich.

Im REST-Modus werden Daten als Formulardaten gesendet:

~~~
Content-Type: application/x-www-form-urlencoded
~~~

Im REST-JSON-Modus hingegen werden Daten als JSON gesendet:

**Headers**
~~~
Content-type: application/json
~~~

Parameter werden als JSON-Objekt übertragen:

**Request Payload**

- Task

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

- Link

~~~js
{
    "source": 1,
    "target": 2,
    "type": "0"
}
~~~

Dieses Format vereinfacht die Verarbeitung komplexer Datensätze auf der Serverseite.


### Server-Seite {#loadserverside}

Immer wenn sich im Gantt etwas ändert (Hinzufügen, Aktualisieren oder Löschen von Tasks oder Links), sendet der dataProcessor eine AJAX-Anfrage an den Server.

Jede Anfrage enthält alle notwendigen Daten, um die Datenbank zu aktualisieren.
Da der dataProcessor auf REST-Modus eingestellt ist, werden je nach Operation unterschiedliche HTTP-Verben verwendet.

Mit der REST-API kann die Serverseite mit verschiedenen Frameworks und Sprachen implementiert werden.
Hier einige serverseitige Implementierungen, die für die Gantt-Backend-Integration bereit sind:

- [dhtmlxGantt mit ASP.NET Core 2](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt mit PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt mit PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt mit Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt mit ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt mit Ruby on Rails](integrations/other/howtostart-ruby.md)


## Speichern der Aufgabenreihenfolge {#storingtheorderoftasks}


Gantt zeigt Aufgaben in der Reihenfolge an, in der sie aus der Datenquelle kommen. Falls Benutzer [Aufgaben manuell umsortieren](guides/reordering-tasks.md#draganddropacrosstheentireganttstructure) können,
sollten Sie diese Reihenfolge in Ihrer Datenbank speichern und sicherstellen, dass Ihr Datenfeed die Aufgaben entsprechend sortiert zurückgibt.

Clientseitige Konfiguration:

~~~js
// Aufgabenreihenfolge im gesamten Gantt umsortieren
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
gantt.load("/api");

const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});
~~~

Es gibt verschiedene Möglichkeiten, die Reihenfolge zu speichern; hier ein Beispiel.

- Fügen Sie Ihrer Tasks-Tabelle eine numerische Spalte hinzu, z.B. 'sortorder'.
- Sortieren Sie beim Bearbeiten eines GET-Requests die Aufgaben aufsteigend nach dieser Spalte.
- Weisen Sie beim Hinzufügen einer neuen Aufgabe den Wert `MAX(sortorder) + 1` zu.
- Wenn sich die Reihenfolge clientseitig ändert, sendet gantt ein PUT (oder POST, falls kein REST-Modus verwendet wird) mit allen Task-Eigenschaften sowie Werten, die die Position der Aufgabe im Projektbaum beschreiben.

<table class="dp_table">
  <tr>
  <th><b>HTTP-Methode</b></th><th><b>URL</b></th><th><b>Parameter</b></th><th><b>Response</b></th>
  </tr>
  <tr>
  <td>PUT</td>
  <td>/apiUrl/task/taskId</td>
  <td><b>target</b>= adjacentTaskId</td>
  <td>("action":"updated")</td>
  </tr>
</table>

Der <b>target</b>-Parameter enthält die ID der nächstgelegenen Aufgabe entweder unmittelbar vor oder nach der aktuellen Aufgabe.

Sein Wert kann zwei Formate haben:

 - *target="targetId*"  - platziert die aktuelle Aufgabe direkt <b>vor</b> der Aufgabe mit targetId
 - *target="next:targetId*" - platziert die aktuelle Aufgabe direkt <b>nach</b> der Aufgabe mit targetId

Das Anwenden von Änderungen an der Reihenfolge erfordert in der Regel das Aktualisieren mehrerer Aufgaben. Hier ein Pseudocode-Beispiel:

~~~js
const target = request["target"];
const currentTaskId = request["id"];
let nextTask;
let targetTaskId;

// Feststellen, ob die aktualisierte Aufgabe vor oder nach der benachbarten Aufgabe platziert wird
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

// Weisen Sie der aktualisierten Aufgabe die sortorder der benachbarten Aufgabe zu
let targetOrder = targetTask.sortorder;

// Falls nach der benachbarten Aufgabe, sortorder inkrementieren
if (nextTask) targetOrder++;

// Erhöhen Sie die sortorder-Werte der nachfolgenden Aufgaben
tasks.where(task => task.sortorder >= targetOrder)
    .update(task => task.sortorder++);

// Aktualisieren Sie die Aufgabe mit ihrer neuen sortorder
currentTask.sortorder = targetOrder;

tasks.save(currentTask);
~~~

Detaillierte Beispiele für das Speichern der Aufgabenreihenfolge auf bestimmten Server-Plattformen finden Sie unter:
[plain PHP](integrations/php/howtostart-php.md#storingtheorderoftasks), [Laravel](integrations/php/howtostart-php-laravel.md#storingtheorderoftasks),
[Node.js](integrations/node/howtostart-nodejs.md#storingtheorderoftasks), [ASP.NET Web API](integrations/dotnet/howtostart-dotnet.md#storingtheorderoftasks), und
[Rails](integrations/other/howtostart-ruby.md#storingtheorderoftasks).


## Eigene Request-Header und Parameter {#customrequestheadersandparameters}


### Hinzufügen benutzerdefinierter Request-Header

Es ist möglich, zusätzliche Header in Anfragen an Ihr Backend einzufügen. Beispielsweise möchten Sie vielleicht ein Autorisierungstoken zu Ihren Anfragen hinzufügen:

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

Derzeit unterstützt [load](api/method/load.md) keine Header- oder Payload-Parameter für GET-Anfragen. Falls Sie diese hinzufügen müssen, senden Sie die XHR-Anfrage manuell und laden dann die Daten mit [parse](api/method/parse.md) in Gantt, wie folgt:

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


### Hinzufügen benutzerdefinierter Parameter zur Anfrage

Es gibt mehrere Möglichkeiten, zusätzliche Parameter zu Ihren Anfragen hinzuzufügen.

Da gantt alle Eigenschaften des Datenobjekts an das Backend sendet, können Sie einfach eine zusätzliche Eigenschaft direkt zum Datenobjekt hinzufügen, die dann in die Anfrage aufgenommen wird:

~~~js
gantt.attachEvent("onTaskCreated", (task) => {
    task.userId = currentUser;
    return true;
});
~~~

Eine weitere Möglichkeit ist, benutzerdefinierte Parameter zu jeder vom DataProcessor gesendeten Anfrage über die **payload**-Eigenschaft hinzuzufügen:

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

Sie können benutzerdefinierte Parameter auch mithilfe des [onBeforeUpdate](api/other/dataprocessor.md#onbeforeupdate) Events von DataProcessor zu Anfragen hinzufügen:

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


## Auslösen der Datenspeicherung per Skript


Wenn der DataProcessor initialisiert ist, werden alle Änderungen, die von Nutzern oder programmatisch vorgenommen werden, automatisch an die Datenquelle gespeichert.

Um eine bestimmte Aufgabe oder Abhängigkeit programmatisch zu aktualisieren, verwenden Sie in der Regel die Methoden [updateTask](api/method/updatetask.md) und [updateLink](api/method/updatelink.md):

~~~js
gantt.parse([
    { id: 1, text: "Task 1", start_date: "2025-05-13 06:00", duration: 2 },
    { id: 2, text: "Task 2", start_date: "2025-05-19 08:00", duration: 3 }
]);

const task = gantt.getTask(1);
task.text = "Task 37"; // Aufgabendaten aktualisieren
gantt.updateTask(1); // Aktualisierte Aufgabe neu rendern
~~~

Weitere Methoden, die das Senden von Updates an das Backend auslösen, sind:

- [addTask](api/method/addtask.md)
- [updateTask](api/method/updatetask.md)
- [deleteTask](api/method/deletetask.md)
- [addLink](api/method/addlink.md)
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)


## Custom Routing {#customrouting}


Wenn die RESTful AJAX API nicht zu den Anforderungen Ihres Backends passt oder Sie genau steuern möchten, was an den Server gesendet wird, kann ein benutzerdefiniertes Routing verwendet werden.

In Frameworks wie Angular oder React sendet eine Komponente Änderungen möglicherweise nicht direkt an den Server, sondern gibt sie an eine andere Komponente weiter, die für das Speichern der Daten zuständig ist.

Um ein benutzerdefiniertes Routing für den DataProcessor einzurichten, verwenden Sie die Methode [**createDataProcessor()**](#createdp):

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


### AJAX zum Einrichten benutzerdefinierter Router verwenden

Das [Gantt AJAX Modul](api/other/ajax.md) kann beim Einrichten benutzerdefinierter Routen hilfreich sein. Gantt erwartet, dass der benutzerdefinierte Router ein Promise-Objekt von einer Operation zurückgibt, wodurch erkannt werden kann, wann die Aktion abgeschlossen ist. 
Das AJAX-Modul unterstützt Promises und eignet sich daher für den Einsatz in benutzerdefinierten Routern. Gantt verarbeitet das Promise und dessen Inhalt, sobald es aufgelöst wurde.

Im folgenden Beispiel wird eine neue Aufgabe erstellt. Wenn die Serverantwort die ID der neu erstellten Aufgabe enthält, wird diese von Gantt entsprechend übernommen.

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

## Routing von CRUD-Aktionen für Ressourcen und Ressourcenzuweisungen {#resources_crud}


Ab Version 8.0 können Änderungen an Ressourcenzuweisungen als separate Einträge mit persistierenden IDs an den DataProcessor gesendet werden, was die Integration mit Backend-APIs vereinfacht. Änderungen an Ressourcenobjekten selbst können ebenfalls an den DataProcessor gesendet werden.

Beachten Sie, dass diese Funktion standardmäßig deaktiviert ist. Standardmäßig empfängt der DataProcessor nur Änderungen an Aufgaben und Verknüpfungen. Um die Ressourcenverarbeitung zu aktivieren, stellen Sie Folgendes ein:

~~~js
gantt.config.resources = {
    dataprocessor_assignments: true,
    dataprocessor_resources: true,
};
~~~

Wenn der Ressourcenmodus aktiviert ist und der DataProcessor sich im REST-Modus befindet, werden Ressourcen und Ressourcenzuweisungen in separaten Anfragen an das Backend gesendet.

Wenn der DataProcessor im Custom Routing-Modus verwendet wird, können Sie Änderungen an Ressourcenzuweisungen und Ressourcen in Ihrem Handler erfassen:

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

Alternativ mit einer Funktionsdeklaration:

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


## Fehlerbehandlung {#errorhandling}


Wenn der Server meldet, dass eine Aktion fehlgeschlagen ist, kann er eine Antwort mit `"action":"error"` zurückgeben:

~~~js
{"action":"error"}
~~~

Solche Antworten können Sie auf der Clientseite mit gantt.dataProcessor abfangen:

~~~js
const dp = gantt.createDataProcessor({
    url: "/api",
    mode: "REST"
});

dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        // Fehler hier behandeln
    }
});
~~~

Das Antwortobjekt kann zusätzliche Eigenschaften enthalten, die über das Argument `response` im onAfterUpdate-Handler zugänglich sind.

:::note
Dieses Event wird nur für verwaltete Fehler ausgelöst, die JSON-Antworten wie oben gezeigt zurückgeben.
Für die Behandlung von HTTP-Fehlern siehe das API-Event [onAjaxError](api/event/onajaxerror.md).
:::

Wenn der Server mit einem Fehler antwortet, aber die Änderungen auf dem Client gespeichert wurden, ist es am besten, den Client-Status zu löschen und die korrekten Daten erneut vom Server zu laden:

~~~js
dp.attachEvent("onAfterUpdate", (id, action, tid, response) => {
    if (action === "error") {
        gantt.clearAll();
        gantt.load("url1");
    }
});
~~~

Falls Sie den Status von Client und Server synchronisieren möchten, ohne Serveraufrufe auszuführen, verwenden Sie die Methode [silent()](api/method/silent.md), um interne Events oder Serveraufrufe während der Operation zu verhindern:

~~~js
gantt.silent(() => {
    gantt.deleteTask(item.id);
});

gantt.render();
~~~


## Kaskadierende Löschung {#cascadedeletion}


Standardmäßig löst das Löschen einer Aufgabe eine kaskadierende Löschung ihrer verschachtelten Aufgaben und zugehörigen Verknüpfungen aus. Gantt sendet für jede entfernte Aufgabe und Verknüpfung eine *delete*-Anfrage. 
Das bedeutet, dass die Datenintegrität im Backend nicht manuell verwaltet werden muss, da Gantt dies effektiv übernimmt.

Dieses Vorgehen kann jedoch zu vielen AJAX-Anfragen an das Backend führen, da dhtmlxGantt keine Batch-Anfragen unterstützt und die Anzahl der Aufgaben und Verknüpfungen groß sein kann.

Falls erforderlich, kann die kaskadierende Löschung mit der [cascade_delete](api/config/cascade_delete.md) Konfiguration deaktiviert werden. 
Ist dies deaktiviert, führt das Löschen eines Projektzweigs nur zu einer Löschanfrage für das oberste Element und das Backend ist für das Löschen der zugehörigen Verknüpfungen und Unteraufgaben verantwortlich.


## XSS-, CSRF- und SQL-Injection-Angriffe


Es ist wichtig zu beachten, dass Gantt keinen eingebauten Schutz gegen Bedrohungen wie SQL-Injection, XSS oder CSRF-Angriffe bietet. 
Die Sicherstellung der Anwendungssicherheit liegt in der Verantwortung der Entwickler, die das Backend implementieren.

Weitere Informationen zu den verwundbarsten Punkten der Komponente und empfohlenen Maßnahmen zur Verbesserung der Sicherheit Ihrer Anwendung finden Sie im Artikel [Application Security](guides/app-security.md). 

