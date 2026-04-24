---
title: "dhtmlxGantt mit Node.js"
sidebar_label: "Node.js"
---

# dhtmlxGantt mit Node.js

Die aktuelle Anleitung richtet sich an die Erstellung von Gantt mit Node.js und einer REST-API auf der Serverseite. 
Wenn Sie eine andere Technologie verwenden, prüfen Sie unten die Liste der verfügbaren Integrationsvarianten:

- [dhtmlxGantt mit ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt mit ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt mit Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt mit PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt mit PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt mit Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt mit Ruby on Rails](integrations/other/howtostart-ruby.md)

Unsere Implementierung von Gantt mit Node.js basiert auf einer REST-API, die für die Kommunikation mit dem Server verwendet wird. 
Node.js bietet eine Reihe fertiger Lösungen, sodass wir nicht alles von Grund auf neu schreiben müssen. Wir verwenden außerdem MySQL als Datenspeicher.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/gantt-howto-node).
:::


Sie können sich die Video-Anleitung ansehen, die zeigt, wie man ein Gantt-Diagramm mit Node.js erstellt.

<iframe width="704" height="400" src="https://www.youtube.com/embed/D8YzyzBfyP8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Schritt 1. Projekt erstellen

Zu Beginn erstellen wir einen Projektordner und fügen anschließend die benötigten Abhängigkeiten hinzu. Wir verwenden die folgenden Module:

- [Express](https://expressjs.com/) - ein kleines Framework für Node.js
- [body-parser](https://www.npmjs.com/package/body-parser) - ein Node.js Parsing-Tool


Lassen Sie uns also einen Projektordner erstellen und ihn "dhx-gantt-app" benennen:

~~~js
mkdir dhx-gantt-app
cd dhx-gantt-app
~~~


### Die Abhängigkeiten hinzufügen

Nun erstellen wir die *package.json*-Datei. Wir geben die Abhängigkeiten mit dem folgenden Befehl darin an:

~~~js
npm init -y
~~~

Wenn die Datei fertig ist, öffnen Sie sie und fügen die oben aufgeführten Abhängigkeiten hinein. Das Ergebnis wird ungefähr so aussehen:


~~~js title="package.json"
{
  "name": "dhx-gantt-app",
  "version": "1.0.3",
  "description": "",
  "main": "server.js",
  "dependencies": {
    "body-parser": "^2.2.1",
    "express": "^5.2.1"
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

Schließlich müssen die hinzugefügten Abhängigkeiten mit dem folgenden Befehl installiert werden:

~~~js
npm install
~~~

### Vorbereitung des Backends

Wir folgen einem grundlegenden [Express]-Setup: Wir werden eine einzelne JS-Datei für unser Backend (nennen wir sie "server.js"),
einen Ordner für statische Dateien (namens "public") und eine einzelne HTML-Seite haben. 

Die gesamte Projektstruktur wird wie folgt aussehen:

~~~html
dhx-gantt-app
├── node_modules
├── server.js 
├── package.json 
└── public 
    └── index.html 
~~~


Erstellen Sie eine neue Datei namens <b>server.js</b> und fügen Sie den folgenden Code hinein:


~~~js title="server.js"
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

Was wir in diesem Code erreicht haben:

- definiert, dass statische Dateien aus dem Ordner 'public' bedient werden 
- die Anwendung an den Port 1337 des lokalen Hosts gebunden


Im nächsten Schritt erstellen wir den "public" Ordner. In diesem Ordner wird die Hauptseite unserer Anwendung – *index.html* – liegen.

:::note
Dieser Ordner ist auch der richtige Ort, um js/css-Dateien von dhtmlxGantt abzulegen. In diesem Tutorial laden wir Gantt jedoch von einem CDN, daher wird dort lediglich eine HTML-Seite vorhanden sein.
:::

## Schritt 2. Gantt zur Seite hinzufügen

Lassen Sie uns den *public*-Ordner erstellen und eine *index.html*-Datei hineinzufügen. Öffnen Sie anschließend die Datei *index.html* und füllen Sie sie mit dem folgenden Inhalt:


~~~html title="index.html"
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

Lassen Sie uns prüfen, was wir bisher haben. Wechseln Sie in das Projektverzeichnis und führen Sie den folgenden Befehl in der Kommandozeile aus:

~~~js
node server.js
~~~

Öffnen Sie dann http://127.0.0.1:1337 in einem Browser. Sie sollten eine Seite mit einem leeren Gantt sehen, wie hier gezeigt:

![gantt_init](/img/gantt_init.png)

## Schritt 3. Vorbereitung einer Datenbank

Der nächste Schritt besteht darin, eine Datenbank zu erstellen. Wir erstellen eine einfache Datenbank mit zwei Tabellen für Aufgaben (tasks) und Verknüpfungen (links):

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

und füge einige Beispiel-Daten hinzu:
~~~js
INSERT INTO `gantt_tasks` VALUES ('1', 'Projekt #1', '2026-04-01 00:00:00', 
  '5', '0.8', '0');
INSERT INTO `gantt_tasks` VALUES ('2', 'Aufgabe #1', '2026-04-06 00:00:00', 
  '4', '0.5', '1');
INSERT INTO `gantt_tasks` VALUES ('3', 'Aufgabe #2', '2026-04-05 00:00:00', 
  '6', '0.7', '1');
INSERT INTO `gantt_tasks` VALUES ('4', 'Aufgabe #3', '2026-04-07 00:00:00', 
  '2', '0', '1');
INSERT INTO `gantt_tasks` VALUES ('5', 'Aufgabe #1.1', '2026-04-05 00:00:00', 
  '5', '0.34', '2');
INSERT INTO `gantt_tasks` VALUES ('6', 'Aufgabe #1.2', '2026-04-11 13:22:17', 
  '4', '0.5', '2');
INSERT INTO `gantt_tasks` VALUES ('7', 'Aufgabe #2.1', '2026-04-07 00:00:00',
  '5', '0.2', '3');
INSERT INTO `gantt_tasks` VALUES ('8', 'Aufgabe #2.2', '2026-04-06 00:00:00', 
  '4', '0.9', '3');
~~~

Schauen Sie sich hier [hier](guides/loading.md#databasestructure) ein detailliertes Beispiel an.


## Schritt 4. Laden der Daten

Nun müssen wir das Laden der Daten implementieren. 

Da wir MySQL verwenden, müssen die notwendigen Module installiert werden, mit denen wir darauf zugreifen können. In dieser Anleitung werden CRUD-Operationen basierend auf dem Promise-Ansatz implementiert.
Wir verwenden also [promise-mysql](https://www.npmjs.com/package/promise-mysql) – ein Node.js-Paket zum Arbeiten mit MySQL unter Verwendung von Promises und
die [bluebird](https://www.npmjs.com/package/bluebird) Promise-Bibliothek.

Um sie zu installieren, können wir die Konsole verwenden. Wir müssen die folgenden Versionsangaben der Komponenten verwenden, da neuere Versionen untereinander inkompatibel sind oder ältere Funktionen fehlen:

~~~js
npm install bluebird@3.7.2 --save
npm install promise-mysql@5.1.0 --save
npm install date-format-lite@17.7.0 --save
~~~

Sie können auch andere geeignete Module wählen. Der Code ist relativ einfach, und Sie können dieselbe Logik mit einem anderen Satz von Werkzeugen implementieren.

Der Client erwartet Daten im [JSON-Format](guides/supported-data-formats.md). Daher erstellen wir eine Route, die diese Art von Daten zurückgibt.

Wie Sie wahrscheinlich bemerkt haben, gibt es in den Daten die Eigenschaft "start_date", die als Datum-Objekt gespeichert wird. Daher sollte sie dem Client im
richtigen Format übergeben werden. Zu diesem Zweck verwenden wir ein weiteres Modul - [date-format-lite](https://github.com/litejs/date-format-lite). 

~~~js
npm install date-format-lite --save
~~~

Öffnen Sie nun die *server.js*-Datei und aktualisieren Sie deren Code mit dem Folgenden:


~~~js title="server.js"
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
            }

            res.send({
                data: tasks,
                collections: { links }
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

Was wir in diesem Code erreicht haben:

- eine MySQL-Verbindung zu unserer Datenbank geöffnet 
- festgelegt, dass bei der Anfrage <b>GET /data</b> Daten aus den Tabellen gantt_tasks und gantt_links gelesen und so formatiert werden, dass sie vom Client geparst werden können


Jetzt können wir diese Route vom Client aus aufrufen:

~~~js title="public/index.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/
gantt.config.open_tree_initially = true;
  
gantt.init("gantt_here");

gantt.load("/data");/*!*/
~~~

Beachten Sie, dass die Konfiguration [date_format](api/config/date_format.md) das Format der Datumswerte (<b>start_date</b> der Aufgabe) festlegt, die vom Server kommen. Die Konfiguration [gantt.config.open_tree_initially](api/config/open_tree_initially.md) ist auf `true` gesetzt, um sicherzustellen, dass der Aufgabenbaum zunächst erweitert ist.

Lassen Sie uns die Anwendung jetzt starten, indem Sie http://127.0.0.1:1337 öffnen. Der Gantt wird mit den zuvor in der Datenbank hinzugefügten Testdaten geladen.

![load_data_nodejs](/img/load_data_nodejs.png)


## Schritt 5. Änderungen speichern

Das Letzte, das wir implementieren sollten, ist das Speichern von Änderungen. 
Dazu benötigen wir einen Code, der Aktualisierungen, die auf der Client-Seite vorgenommen werden, an den Server sendet.
Gehen Sie zu *public/index.html* und fügen Sie [gantt.createDataProcessor](guides/server-side.md#technique) der Seite hinzu:


~~~js title="public/index.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
  
gantt.init("gantt_here");

gantt.load("/data");
  
const dp = gantt.createDataProcessor({ /*!*/
  url: '/data', /*!*/
  mode: 'REST', /*!*/
}); /*!*/
~~~

Gehen wir tiefer und sehen, welche Rolle es spielt. 

### Anfragen und Antworten

Bei jeder Benutzeraktion: Hinzufügen, Ändern oder Entfernen einer neuen Aufgabe oder einer Verknüpfung reagiert DataProcessor, indem es eine AJAX-Anfrage an
die entsprechende URL sendet. Die Anfrage enthält alle Parameter, die zum Speichern der Änderungen in der Datenbank erforderlich sind.

Da DataProcessor im REST-Modus initialisiert ist, verwendet es für jeden Typ von Operation unterschiedliche HTTP-Verben. 
Die Liste der HTTP-Verben zusammen mit Details zu Anfragen und Antworten finden Sie im Artikel Server-Side Integration.

Nun müssen wir die erforderlichen Routen und Handler hinzufügen, die auf dem Client vorgenommene Änderungen in die Datenbank schreiben, in die Datei *server.js*. 
Der resultierende Code wird ziemlich umfangreich sein:


~~~js title="server.js"
// add a new task
app.post("/data/task", (req, res) => {
    let task = getTask(req.body);
    const { text, start_date, duration, progress, parent } = task;

    db.query("INSERT INTO gantt_tasks(text, start_date, duration, progress, parent)"
        + " VALUES (?,?,?,?,?)",
        [text, start_date, duration, progress, parent])
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
    const { text, start_date, duration, progress, parent } = task;

    db.query("UPDATE gantt_tasks SET text = ?, start_date = ?, "
        + "duration = ?, progress = ?, parent = ? WHERE id = ?",
        [text, start_date, duration, progress, parent, sid])
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
    const { source, target, type } = link;

    db.query("INSERT INTO gantt_links(source, target, type) VALUES (?,?,?)",
        [source, target, type])
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
    const { source, target, type, sid } = link;

    db.query("UPDATE gantt_links SET source = ?, target = ?, type = ? WHERE id = ?",
        [source, target, type, sid])
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

Wir haben zwei Satz von Routen erstellt: eines für die Entität *tasks* und ein weiteres für die Entität *links*. 
Entsprechend wird die URL *"/data/task"* Anfragen im Zusammenhang mit Operationen an Aufgaben bedienen und die URL *"/data/link"* zum Verarbeiten von Anfragen verwendet, die Daten für Operationen mit Verknüpfungen enthalten.

Die Typen der Anfragen sind ziemlich einfach:

- POST - Zum Einfügen eines neuen Elements in die Datenbank
- PUT - Zum Aktualisieren eines bestehenden Datensatzes
- DELETE - Zum Entfernen eines Elements

Die Antwort wird ein JSON-Objekt mit dem Typ der durchgeführten Operation oder "error" im Fehlerfall sein.

Die Antwort auf die POST-Anfrage wird außerdem die Datenbank-ID des neuen Datensatzes enthalten. Diese wird auf der Client-Seite angewendet, sodass ein neues Element dem Datenbankeintrag zugeordnet werden kann.

Das war’s. Öffnen Sie http://127.0.0.1:1337 und Sie sehen ein vollständig funktionsfähiges Gantt-Diagramm.

![ready_gantt_nodejs](/img/ready_gantt_nodejs.png)


## Speichern der Reihenfolge der Aufgaben {#storingtheorderoftasks}

Der clientseitige Gantt ermöglicht es, Aufgaben per Drag & Drop neu zu ordnen. Wenn Sie diese Funktion verwenden, müssen Sie diese Reihenfolge in der Datenbank speichern. 
Sie können hier [die allgemeine Beschreibung](guides/server-side.md#storingtheorderoftasks) einsehen.

Fügen wir diese Funktionalität nun zu unserer Anwendung hinzu.

### Neuanordnung der Aufgaben auf dem Client aktivieren

Zunächst müssen wir es den Benutzern ermöglichen, die Reihenfolge der Aufgaben in der Benutzeroberfläche zu ändern. Öffnen Sie die "Index"-Ansicht und aktualisieren Sie die Konfiguration von gantt:

~~~js title="public/index.html"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Nun spiegeln wir diese Änderungen im Backend wider. Wir speichern die Reihenfolge in der Spalte mit dem Namen "sortorder". Die aktualisierte Tabelle *gantt_tasks* könnte folgendermaßen aussehen:

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

Oder fügen Sie der vorhandenen Tabelle die Spalte hinzu:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

Danach müssen wir die Datei *server.js* aktualisieren: 

1 . <b>GET /data</b> muss die Aufgaben nach der Spalte `sortorder` sortieren zurückgeben: 

~~~js title="server.js"
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
            collections: { links }
        });

    }).catch(error => {
        sendResponse(res, "error", null, error);
    });
});
~~~


2 . Neu hinzugefügte Aufgaben müssen den anfänglichen Wert `sortorder` erhalten: 

~~~js title="server.js"
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

3 . Schließlich müssen beim Neuanordnen der Aufgaben die Auftragsreihenfolgen aktualisiert werden:

~~~js title="server.js"
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

Sie können eine fertige Demo hier auf GitHub überprüfen: https://github.com/DHTMLX/gantt-howto-node.


## Anwendungssicherheit

Gantt bietet keine Mittel, um eine Anwendung vor verschiedenen Bedrohungen zu schützen, wie z. B. SQL-Injektionen oder XSS- und CSRF-Angriffe. Es ist wichtig, dass die Verantwortung für die Sicherheit einer Anwendung bei den Entwicklern liegt, die das Backend implementieren. Details dazu finden Sie im entsprechenden Artikel.


## Fehlerbehebung

Falls Sie die obigen Schritte zur Implementierung der Gantt-Integration mit Node.js abgeschlossen haben, Gantt aber keine Aufgaben und Verknüpfungen auf der Seite rendert, sehen Sie sich den Artikel Troubleshooting Backend Integration Issues an. Er beschreibt
die Wege, die Wurzeln der Probleme zu identifizieren.


## Was kommt als Nächstes

Nun haben Sie ein voll funktionsfähiges Gantt. Den vollständigen Code können Sie auf GitHub ansehen, klonen oder herunterladen.

Sie können auch [Guides zu den zahlreichen Funktionen von Gantt](guides.md) oder Tutorials zur Integration von Gantt mit anderen Backend-Frameworks prüfen.