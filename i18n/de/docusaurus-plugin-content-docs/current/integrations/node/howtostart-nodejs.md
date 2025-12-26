---
title: "dhtmlxGantt mit Node.js"
sidebar_label: "Node.js"
---

# dhtmlxGantt mit Node.js 

Dieses Tutorial zeigt Schritt für Schritt, wie man dhtmlxGantt mit Node.js und einer REST-API auf der Serverseite einrichtet. 
Wenn Sie mit einer anderen Technologie arbeiten, finden Sie unten weitere Integrationsoptionen:

- [dhtmlxGantt with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

Unsere Node.js-Implementierung nutzt eine REST-API für die Serverkommunikation. 
Da Node.js viele fertige Tools bietet, müssen wir nicht alles von Grund auf neu erstellen. Außerdem verwenden wir MySQL zur Datenspeicherung.

:::note
Der vollständige Quellcode ist [auf GitHub](https://github.com/DHTMLX/gantt-howto-node) verfügbar.
:::

Sie können sich auch ein Video-Tutorial ansehen, das zeigt, wie man ein Gantt-Diagramm mit Node.js erstellt.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Schritt 1. Erstellen eines Projekts

Zuerst erstellen Sie einen Projektordner und fügen die notwendigen Abhängigkeiten hinzu. Wir verwenden diese Module:

- [Express](http://expressjs.com/) - ein leichtgewichtiges Node.js-Framework
- [body-parser](https://www.npmjs.com/package/body-parser) - ein Tool zum Parsen eingehender Request-Bodies

Erstellen Sie einen Projektordner mit dem Namen "dhx-gantt-app":

~~~js
mkdir dhx-gantt-app
cd dhx-gantt-app
~~~

### Abhängigkeiten hinzufügen

Erzeugen Sie als Nächstes die Datei *package.json* mit folgendem Befehl:

~~~js
npm init -y
~~~

Nachdem die Datei erstellt wurde, öffnen Sie sie und fügen die oben genannten Abhängigkeiten hinzu. Die Datei sollte etwa so aussehen:

**package.json**
~~~js
{
  "name": "dhx-gantt-app",
  "version": "1.0.2",
  "description": "",
  "main": "server.js",
  "dependencies": {
    "body-parser": "^1.19.1",
    "express": "^4.17.2"
  },
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "MIT"
}
~~~

Installieren Sie dann die Abhängigkeiten mit folgendem Befehl:

~~~js
npm install
~~~

### Backend vorbereiten

Wir richten ein grundlegendes [express](https://expressjs.com/)-Backend ein: eine einzelne JavaScript-Datei für den Server ("server.js"), 
einen Ordner für statische Dateien ("public") und eine einzelne HTML-Seite.

Die Projektstruktur sieht folgendermaßen aus:

~~~html
dhx-gantt-app
├── node_modules
├── server.js 
├── package.json 
└── public 
    └── index.html 
~~~

Erstellen Sie eine Datei namens <b>server.js</b> und fügen Sie folgenden Code ein:

**server.js**
~~~js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = 1337;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () =>{
    console.log("Server is running on port "+port+"...");
});
~~~

Dieser Code macht Folgendes:

- Stellt statische Dateien aus dem 'public'-Ordner bereit
- Startet die App auf localhost Port 1337

Erstellen Sie als Nächstes den Ordner "public". Dieser enthält die Hauptseite der Anwendung, *index.html*.

:::note
In diesem Ordner würden Sie normalerweise auch die js- und css-Dateien von dhtmlxGantt ablegen. In diesem Tutorial laden wir gantt jedoch von einem CDN, sodass sich hier nur die HTML-Seite befindet.
:::

## Schritt 2. Gantt zur Seite hinzufügen

Erstellen Sie den *public*-Ordner und fügen Sie darin eine *index.html*-Datei hinzu. Öffnen Sie *index.html* und fügen Sie folgenden Inhalt ein:

**index.html**
~~~html
<!DOCTYPE html>
<head>
  <meta http-equiv="Content-type" content="text/html; charset="utf-8"">

  <script src="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
  <link href="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" rel="stylesheet">

  <style type="text/css">
    html, body{
      height:100%;
      padding:0px;
      margin:0px;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div id="gantt_here" style='width:100%; height:100%;'></div>
  <script type="text/javascript">
    gantt.init("gantt_here");
  </script>
</body>
~~~

Um das Ergebnis zu sehen, führen Sie im Projektordner Folgendes aus:

~~~js
node server.js
~~~

Öffnen Sie dann http://127.0.0.1:1337 in Ihrem Browser. Sie sollten ein leeres Gantt-Diagramm wie dieses sehen:

![gantt_init](/img/gantt_init.png)

## Schritt 3. Datenbank vorbereiten

Als Nächstes richten Sie die Datenbank ein. Wir erstellen eine einfache Datenbank mit zwei Tabellen: eine für Aufgaben (tasks) und eine für Verknüpfungen (links):

~~~js
CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);
~~~

Fügen Sie einige Beispieldaten hinzu:

~~~js
INSERT INTO `gantt_tasks` VALUES ('1', 'Project #1', '2017-04-01 00:00:00', 
  '5', '0.8', '0');
INSERT INTO `gantt_tasks` VALUES ('2', 'Task #1', '2017-04-06 00:00:00', 
  '4', '0.5', '1');
INSERT INTO `gantt_tasks` VALUES ('3', 'Task #2', '2017-04-05 00:00:00', 
  '6', '0.7', '1');
INSERT INTO `gantt_tasks` VALUES ('4', 'Task #3', '2017-04-07 00:00:00', 
  '2', '0', '1');
INSERT INTO `gantt_tasks` VALUES ('5', 'Task #1.1', '2017-04-05 00:00:00', 
  '5', '0.34', '2');
INSERT INTO `gantt_tasks` VALUES ('6', 'Task #1.2', '2017-04-11 13:22:17', 
  '4', '0.5', '2');
INSERT INTO `gantt_tasks` VALUES ('7', 'Task #2.1', '2017-04-07 00:00:00',
  '5', '0.2', '3');
INSERT INTO `gantt_tasks` VALUES ('8', 'Task #2.2', '2017-04-06 00:00:00', 
  '4', '0.9', '3');
~~~

Weitere Details finden Sie im Beispiel [hier](guides/loading.md#standarddatabasestructure).

## Schritt 4. Daten laden

Nun ist es Zeit, das Laden der Daten einzurichten.

Da wir MySQL nutzen, installieren Sie die benötigten Module für den Zugriff darauf. In diesem Tutorial werden Promises für CRUD-Operationen verwendet, daher nutzen wir [promise-mysql](https://www.npmjs.com/package/promise-mysql) für MySQL mit Promises und 
[bluebird](https://www.npmjs.com/package/bluebird) als Promise-Bibliothek.

Installieren Sie diese mit der Konsole und geben Sie kompatible Versionen an:

~~~js
npm install bluebird@3.7.2 --save
npm install promise-mysql@5.1.0 --save
npm install date-format-lite@17.7.0 --save
~~~

Sie können auch andere Module verwenden, da die Logik recht einfach ist.

Der Client erwartet Daten im [JSON-Format](guides/supported-data-formats.md#json). Wir erstellen daher eine Route, die Daten in diesem Format zurückgibt.

Da das Feld "start_date" ein Datumsobjekt ist, muss es im richtigen Format an den Client gesendet werden. Dafür nutzen wir [date-format-lite](https://github.com/litejs/date-format-lite). 

~~~js
npm install date-format-lite --save
~~~

Aktualisieren Sie nun *server.js* mit folgendem Inhalt:

**server.js**
~~~js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = 1337;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () =>{
    console.log("Server is running on port "+port+"...");
});

const Promise = require('bluebird');
require("date-format-lite");

const mysql = require('promise-mysql');
async function serverСonfig() {
    const db = await mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'gantt_howto_node'
    });
    app.get("/data", (req, res) => {
        Promise.all([
            db.query("SELECT * FROM gantt_tasks"),
            db.query("SELECT * FROM gantt_links")
        ]).then(results => {
            let tasks = results[0],
                links = results[1];

            for (let i = 0; i < tasks.length; i++) {
              tasks[i].start_date = tasks[i].start_date.format("YYYY-MM-DD hh:mm:ss");
              tasks[i].open = true;
            }

            res.send({
                data: tasks,
                collections: { links: links }
            });

        }).catch(error => {
            sendResponse(res, "error", null, error);
        });
    });

    function sendResponse(res, action, tid, error) {

        if (action == "error")
            console.log(error);

        let result = {
            action: action
        };
        if (tid !== undefined && tid !== null)
            result.tid = tid;

        res.send(result);
    }
};
serverСonfig();
~~~

Was macht dieser Code?

- Stellt die Verbindung zur MySQL-Datenbank her
- Definiert eine <b>GET /data</b>-Route, die Aufgaben und Verknüpfungen abruft, das start_date korrekt formatiert und die Daten an den Client sendet

Die *open*-Eigenschaft wird hinzugefügt, damit die Aufgabenstruktur standardmäßig aufgeklappt ist.

Rufen Sie nun clientseitig diese Route auf:

**public/index.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/
  
gantt.init("gantt_here");

gantt.load("/data");/*!*/
~~~

Die [date_format](api/config/date_format.md)-Konfiguration gibt an, wie gantt das Datumsformat vom Server interpretieren soll.

Starten Sie die App erneut und öffnen Sie http://127.0.0.1:1337. Das Gantt-Diagramm sollte nun die Testdaten aus der Datenbank anzeigen.

![load_data_nodejs](/img/load_data_nodejs.png)

## Schritt 5. Änderungen speichern

Abschließend richten wir das Speichern von Änderungen ein. 
Das bedeutet, dass Aktualisierungen, die im Client vorgenommen werden, an den Server gesendet werden.
Öffnen Sie *public/index.html* und fügen Sie [gantt.dataProcessor](guides/server-side.md#technique) hinzu:

**public/index.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
  
gantt.init("gantt_here");

gantt.load("/data");
  
const dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

Werfen wir einen genaueren Blick darauf, wie das funktioniert.

### Anfragen und Antworten

Immer wenn ein Benutzer eine Aufgabe oder eine Verknüpfung hinzufügt, ändert oder löscht, reagiert DataProcessor, indem es eine AJAX-Anfrage an die entsprechende URL sendet. Diese Anfrage enthält alle notwendigen Parameter, um die Änderungen in der Datenbank zu speichern.

Da DataProcessor im REST-Modus läuft, verwendet es je nach Operationstyp unterschiedliche HTTP-Verben. Eine Liste dieser HTTP-Verben sowie Details zu Anfragen und Antworten finden Sie im Artikel [Server-Side Integration](guides/server-side.md#technique).

Als Nächstes müssen wir die erforderlichen Routen und Handler in die Datei *server.js* einfügen. Diese übertragen die auf der Client-Seite vorgenommenen Änderungen in die Datenbank. Der resultierende Code sieht wie folgt aus:

**server.js**
~~~js
// add a new task
app.post("/data/task", (req, res) => {
    let task = getTask(req.body);

    db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
        + " VALUES (?,?,?,?,?)",
        [task.text, task.start_date, task.duration, task.progress, task.parent])
    .then(result => {
        sendResponse(res, "inserted", result.insertId);
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// update a task
app.put("/data/task/:id", (req, res) => {
    let sid = req.params.id,
        task = getTask(req.body);

    db.query("UPDATE gantt_tasks SET text = ?, start_date = ?, "
        + "duration = ?, progress = ?, parent = ? WHERE id = ?",
        [task.text, task.start_date, task.duration, task.progress, task.parent, sid])
    .then(result => {
        sendResponse(res, "updated");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});


// delete a task
app.delete("/data/task/:id", (req, res) => {
    let sid = req.params.id;
    db.query("DELETE FROM gantt_tasks WHERE id = ?", [sid])
    .then(result => {
        sendResponse(res, "deleted");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// add a link
app.post("/data/link", (req, res) => {
    let link = getLink(req.body);

    db.query("INSERT INTO gantt_links(source, target, type) VALUES (?,?,?)",
        [link.source, link.target, link.type])
    .then(result => {
        sendResponse(res, "inserted", result.insertId);
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// update a link
app.put("/data/link/:id", (req, res) => {
    let sid = req.params.id,
        link = getLink(req.body);

    db.query("UPDATE gantt_links SET source = ?, target = ?, type = ? WHERE id = ?",
        [link.source, link.target, link.type, sid])
    .then(result => {
        sendResponse(res, "updated");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});

// delete a link
app.delete("/data/link/:id", (req, res) => {
    let sid = req.params.id;
    db.query("DELETE FROM gantt_links WHERE id = ?", [sid])
    .then(result => {
        sendResponse(res, "deleted");
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});


function getTask(data) {
    return {
        text: data.text,
        start_date: data.start_date.date("YYYY-MM-DD"),
        duration: data.duration,
        progress: data.progress || 0,
        parent: data.parent
    };
}

function getLink(data) {
    return {
        source: data.source,
        target: data.target,
        type: data.type
    };
}
~~~

Hier wurden zwei Gruppen von Routen erstellt: eine für die Entität *tasks* und eine weitere für *links*. Die URL *"/data/task"* verarbeitet Anfragen, die sich auf Aufgaben beziehen, während *"/data/link"* für Anfragen zu Verknüpfungen verwendet wird.

Die Anfragetypen sind wie folgt:

- POST - fügt einen neuen Eintrag in die Datenbank ein
- PUT - aktualisiert einen bestehenden Datensatz
- DELETE - entfernt einen Eintrag

Antworten sind JSON-Objekte, die den Typ der durchgeführten Operation oder "error" anzeigen, falls etwas schiefgeht.

Bei POST-Anfragen enthält die Antwort zusätzlich die Datenbank-ID des neuen Eintrags. Dies hilft der Client-Seite, das neue Element mit dem entsprechenden Datenbankeintrag zu verknüpfen.

Das war's. Wenn Sie http://127.0.0.1:1337 öffnen, wird ein voll funktionsfähiges Gantt-Diagramm angezeigt.

![ready_gantt_nodejs](/img/ready_gantt_nodejs.png)


## Speichern der Aufgabenreihenfolge {#storingtheorderoftasks}

Das Gantt-Diagramm auf der Client-Seite unterstützt das [Verschieben der Aufgabenreihenfolge](guides/reordering-tasks.md) per Drag & Drop. Wird diese Funktion genutzt, muss die Reihenfolge in der Datenbank gespeichert werden. Einen allgemeinen Überblick finden Sie [hier](guides/server-side.md#storingtheorderoftasks).

Fügen wir diese Funktion zu unserer Anwendung hinzu.

### Aufgabenreihenfolge im Client aktivieren

Zunächst sollten Benutzer die Möglichkeit haben, Aufgaben in der Benutzeroberfläche umzuschichten. Öffnen Sie die "Index"-Ansicht und aktualisieren Sie die Gantt-Konfiguration:

**public/index.html**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Nun müssen wir diese Änderungen auch im Backend abbilden. Wir speichern die Reihenfolge in einer Spalte namens "sortorder". Die aktualisierte Tabelle *gantt_tasks* könnte wie folgt aussehen:

~~~js
CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL  AUTO_INCREMENT PRIMARY KEY,
  `text` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL DEFAULT 0,
  `parent` int(11) NOT NULL,
  `sortorder` int(11) NOT NULL /*!*/
) ENGINE="InnoDB" DEFAULT CHARSET="utf8" COLLATE="utf8_unicode_ci;"
~~~

Alternativ können Sie die Spalte zu Ihrer bestehenden Tabelle hinzufügen:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

Aktualisieren Sie dann die Datei *server.js* wie folgt:

1. Die <b>GET /data</b>-Route sollte Aufgaben nach der Spalte `sortorder` sortiert zurückgeben:

**server.js**
~~~js
app.get("/data", (req, res) => {
    Promise.all([
        db.query("SELECT * FROM gantt_tasks ORDER BY sortorder ASC"), /*!*/
        db.query("SELECT * FROM gantt_links")
    ]).then(results => {
        let tasks = results[0],
            links = results[1];

        for (let i = 0; i < tasks.length; i++) {
            tasks[i].start_date = tasks[i].start_date.format("YYYY-MM-DD hh:mm:ss");
            tasks[i].open = true;
        }

        res.send({
            data: tasks,
            collections: { links: links }
        });

    }).catch(error => {
        sendResponse(res, "error", null, error);
    });
});
~~~


2. Beim Hinzufügen einer neuen Aufgabe wird ein Anfangswert für `sortorder` zugewiesen:

**server.js**
~~~js
app.post("/data/task", (req, res) => { // adds new task to database
    let task = getTask(req.body);

    db.query("SELECT MAX(sortorder) AS maxOrder FROM gantt_tasks")
    .then(result => { /*!*/ 
        // assign max sort order to new task
        let orderIndex = (result[0].maxOrder || 0) + 1; /*!*/
        return db.query("INSERT INTO gantt_tasks(text, start_date, duration," 
          + "progress, parent, sortorder) VALUES (?,?,?,?,?,?)",
          [task.text, task.start_date, task.duration, task.progress, task.parent, 
            orderIndex]); /*!*/
    })
    .then(result => {
        sendResponse(res, "inserted", result.insertId);
    })
    .catch(error => {
        sendResponse(res, "error", null, error);
    });
});
~~~

3. Schließlich wird beim Umsortieren von Aufgaben deren Reihenfolge aktualisiert:

**server.js**
~~~js
// update task
app.put("/data/task/:id", (req, res) => {
  let sid = req.params.id,
    target = req.body.target,
    task = getTask(req.body);

  Promise.all([
    db.query("UPDATE gantt_tasks SET text = ?, start_date = ?," 
      + "duration = ?, progress = ?, parent = ? WHERE id = ?",
      [task.text, task.start_date, task.duration, task.progress, 
        task.parent, sid]),
    updateOrder(sid, target) /*!*/
  ])
    .then(result => {
      sendResponse(res, "updated");
    })
    .catch(error => {
      sendResponse(res, "error", null, error);
    });
});

function updateOrder(taskId, target) {
  let nextTask = false;
  let targetOrder;

  target = target || "";

  if (target.startsWith("next:")) {
    target = target.substr("next:".length);
    nextTask = true;
  }

  return db.query("SELECT * FROM gantt_tasks WHERE id = ?", [target])
    .then(result => {
      if (!result[0])
        return Promise.resolve();

      targetOrder = result[0].sortorder;
      if (nextTask)
        targetOrder++;

      return db.query("UPDATE gantt_tasks SET sortorder"+
        " = sortorder + 1 WHERE sortorder >= ?", [targetOrder])
      .then(result => {
        return db.query("UPDATE gantt_tasks SET sortorder = ? WHERE id = ?",
          [targetOrder, taskId]);
      });
    });
}
~~~

Eine fertige Demo finden Sie auf GitHub: [https://github.com/DHTMLX/gantt-howto-node](https://github.com/DHTMLX/gantt-howto-node).


## Anwendungssicherheit

Gantt selbst bietet keinen Schutz vor Bedrohungen wie SQL-Injections, XSS oder CSRF-Angriffen. Die Sicherstellung der Anwendungssicherheit liegt in der Verantwortung der Backend-Entwickler. Weitere Informationen finden Sie [in diesem Artikel](guides/app-security.md).

## Fehlerbehebung

Wenn Sie alle Schritte zur Integration von Gantt mit Node.js befolgt haben, aber Aufgaben und Verknüpfungen nicht angezeigt werden, lesen Sie den Artikel [Troubleshooting Backend Integration Issues](guides/troubleshooting.md). Dieser bietet Hinweise zur Identifizierung und Lösung häufiger Probleme.


## Wie geht es weiter?

An diesem Punkt ist das Gantt-Diagramm voll funktionsfähig. Der vollständige Code ist auf [GitHub](https://github.com/DHTMLX/gantt-howto-node) verfügbar und kann für eigene Projekte geklont oder heruntergeladen werden.

Sie können auch [Leitfäden zu verschiedenen Gantt-Funktionen](guides.md) oder Tutorials zur [Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md) entdecken.

