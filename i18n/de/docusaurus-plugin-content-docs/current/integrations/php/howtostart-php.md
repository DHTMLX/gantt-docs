---
title: "dhtmlxGantt mit PHP:Slim3"
sidebar_label: "PHP: Slim3"
---

# dhtmlxGantt mit PHP:Slim3

In diesem Tutorial finden Sie notwendige Informationen dazu, wie Sie mit PHP 5.6x-7.x und einer RESTful API auf dem Server ein Gantt-Diagramm erstellen.

:::note
Dieses Tutorial verwendet ein älteres Slim Framework v3.x. Wenn Sie die aktuellste Version des Tutorials suchen, lesen Sie die Anleitung [Slim Framework v4.x](integrations/php/howtostart-php-slim4.md).
:::

Es gibt Tutorials, die sich mit der serverseitigen Integration in Verbindung mit anderen Plattformen und Frameworks befassen:

- [dhtmlxGantt mit ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt mit ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt mit Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt mit Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt mit PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt mit PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt mit Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt mit Ruby on Rails](integrations/other/howtostart-ruby.md)

Wir verwenden das [Slim 3](https://www.slimframework.com/) Framework für das Routing und MySQL als Datenspeicher. Die CRUD-Logik wird auf PDO basieren und wird allgemein genug sein, um sie mit jedem anderen Framework verwenden zu können.

:::note
Der komplette Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x).
:::

## Schritt 1. Ein Projekt initialisieren

### Ein Projekt erstellen

Wir verwenden eine [Skeleton-Anwendung](https://github.com/slimphp/Slim-Skeleton) für das Slim 3 Framework.

Zunächst müssen wir das Projekt importieren und installieren. Das geht ganz einfach mit Composer:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

Wenn Composer global installiert ist, können Sie folgenden Befehl verwenden:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php
~~~

Dann sollten Sie prüfen, ob alles einwandfrei funktioniert. Öffnen Sie dazu den Anwendungsordner und starten Sie einen Webserver:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Danach können Sie [http://127.0.0.1:8080](http://127.0.0.1:8080/) in einem Browser öffnen und Sie sehen die Standard-Slim-Seite.

## Schritt 2. Gantt zur Seite hinzufügen

Jetzt müssen wir eine Seite mit unserem Gantt-Diagramm erstellen.
Suchen Sie eine Standardseite in <b>templates/index.phtml</b>. Wir möchten dort das Gantt-Diagramm platzieren und Voraussetzungen für das Laden der Daten festlegen.

Der vollständige Code sieht wie folgt aus:

~~~html title="/templates/index.phtml"
<!DOCTYPE html>
<head>
  <meta http-equiv="Content-type" content="text/html; charset='utf-8'">

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

Dieser Code fügt der Seite ein leeres Gantt-Diagramm hinzu. Ein Benutzer kann Aufgaben und Verknüpfungen erstellen und ändern, aber nach dem Neuladen der Seite werden keine Änderungen gespeichert.

Wir können es testen, indem die App erneut gestartet wird:

~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Öffnen Sie nun [http://127.0.0.1:8080/](http://127.0.0.1:8080/) in einem Browser und Sie sehen, dass ein Gantt-Diagramm auf der Seite gerendert wird.

## Schritt 3. Eine Datenbank konfigurieren

Der nächste Schritt besteht darin, eine Datenbank zu erstellen. Wir erstellen eine einfache Datenbank mit zwei Tabellen.

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

Wenn die Datenbank bereit ist, können wir weitergehen und die Tabelle *gantt_tasks* mit einigen Testdaten befüllen.
Sie können folgendes SQL-Beispiel dafür verwenden:

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
Siehe hier für ein detailliertes Beispiel [hier](guides/loading.md#databasestructure).

Damit haben wir die Vorbereitung unseres Projekts abgeschlossen. Jetzt können wir mit dem Laden der Daten fortfahren.

## Schritt 4. Laden der Daten

Nun ist es Zeit, das Laden aus der Datenbank zu implementieren. 
Auf der Client-Seite werden wir Daten mit der [gantt.load](api/method/load.md) Methode anfordern:

~~~js title="/templates/index.phtml"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

Dieser Befehl sendet eine AJAX-Anfrage an die angegebene URL, die Antwort wird Gantt-Daten im [JSON-Format](guides/supported-data-formats.md) enthalten.

Außerdem haben wir den [date_format]-Wert angegeben. Das ist die Art und Weise, wie wir Gantt mitteilen, in welchem Format die Datenquelle Datumswerte bereitstellt, damit die Client-Seite sie parsen kann.

Daraus folgt, dass wir einen notwendigen Handler für eine solche Anfrage im Backend hinzufügen müssen.
Öffnen Sie dazu die Datei *src/routes.php* und fügen Sie eine neue [Route](https://www.slimframework.com/docs/v3/objects/router.html) hinzu:

~~~js title="src/routes.php"
<?php
// Routes

$app->get('/', function ($request, $response, $args) {
  // Render index view
  return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/data',  'getGanttData');/*!*/
~~~

Anschließend müssen wir die Logik von *getGanttData* implementieren. Um index.php nicht zu verschmutzen, werden wir alle gantt-bezogenen Dinge in einer separaten Datei deklarieren.

Lassen Sie uns eine neue Datei *src/gantt.php* erstellen und die erforderlichen Codes hinzufügen:


~~~js title="src/gantt.php"
function getConnection()
{
    return new PDO("mysql:host=localhost;dbname=gantt", "root", "root", [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
}

function getGanttData($request, $response, $args) {
  $db = getConnection();
  $result = [
    "data"=> [],
    "links"=> []
  ];

  foreach($db->query("SELECT * FROM gantt_tasks") as $row){
    $row["open"] = true;
    array_push($result["data"], $row);
  }

  foreach ($db->query("SELECT * FROM gantt_links") as $link){
    array_push($result["links"], $link);
  }

  return $response->withJson($result);
};
~~~

Und fügen Sie *src/gantt.php* in *public/index.php* ein:

~~~js title="public/index.php"
<?php
if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server check if the request was actually for
    // something which should probably be served as a static file
    $url  = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

require __DIR__ . '/../vendor/autoload.php';

session_start();

// Instantiate the app
$settings = require __DIR__ . '/../src/settings.php';
$app = new SlimApp($settings);

// Set up dependencies
require __DIR__ . '/../src/dependencies.php';

// Register middleware
require __DIR__ . '/../src/middleware.php';

// Register routes
require __DIR__ . '/../src/routes.php';

// Add dhtmlxGantt CRUD
require __DIR__ . '/../src/gantt.php'; /*!*/

// Run app
$app->run();
~~~

Lassen Sie uns den oben beschriebenen Code im Detail betrachten:

- Wir haben eine [Route] für unsere Datenaktion in *src/routes.php* definiert.
- Im Handler dieser Route lesen wir alle Tasks und Links aus der Datenbank und senden sie dem Client als [JSON] zurück.
- Wir haben außerdem die *open*-Eigenschaft zu den Task-Objekten hinzugefügt. Sie gibt an, dass der Aufgabenbaum standardmäßig geöffnet sein wird.

Damit haben wir das Laden der Daten in Gantt implementiert.
Öffnen Sie [http://127.0.0.1:8080/](http://127.0.0.1:8080/) und Sie sehen, dass das Gantt jetzt mit den Testdaten aus dem vorherigen Schritt gefüllt ist.

![load_data](/img/load_data.png)

## Schritt 5. Änderungen speichern

Unser nächster Schritt besteht darin, das Speichern der im Client vorgenommenen Änderungen auf dem Server zu implementieren. Dies erfolgt in der Regel mit der [dataProcessor]-Bibliothek, die in das Gantt integriert ist.
Öffnen Sie *index.phtml* und fügen Sie die folgenden Codezeilen ein:

~~~js title="templates/index.phtml"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

Der DataProcessor reagiert auf jede Aktion des Clients (d. h. das Hinzufügen von Daten in das Diagramm, Änderungen oder Löschen) durch das Senden einer AJAX-Anfrage an den Server.
Der DataProcessor arbeitet im REST-Modus, was bedeutet, dass er je nach Aktion verschiedene HTTP-Methoden verwendet. Hier finden Sie [eine vollständige Liste der Routen](guides/server-side.md#requestresponsedetails).

Nun müssen wir diese Routen zu unserer Anwendung hinzufügen und die erforderliche Logik implementieren. Zuerst wechseln Sie zu *src/routes.php*:


~~~js title="src/routes.php"
<?php
// Routes

$app->get('/', function ($request, $response, $args) {
  // Render index view
  return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/data',  'getGanttData');

$app->post("/data/task", 'addTask');
$app->put("/data/task/{id}", 'updateTask');
$app->delete("/data/task/{id}", 'deleteTask');

$app->post("/data/link", 'addLink');
$app->put("/data/link/{id}", 'updateLink');
$app->delete("/data/link/{id}", 'deleteLink');
~~~

Routen wurden hinzugefügt, nun implementieren wir die mit ihnen verknüpften Methoden:

~~~js title="src/gantt.php"
function getConnection()
{
  return new PDO("mysql:host=localhost;dbname=gantt", "root", "", [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  ]);
}

function getGanttData($request, $response, $args) {
  $db = getConnection();
  $result = [
    "data" => [],
    "links" => []
  ];

  foreach($db->query("SELECT * FROM gantt_tasks") as $row){
    $row["open"] = true;
    array_push($result["data"], $row);
  }

  foreach ($db->query("SELECT * FROM gantt_links") as $link){
    array_push($result["links"], $link);
  }

  return $response->withJson($result);
};

// getting a task from the request data
function getTask($data)
{
  return [
    ':text' => $data["text"],
    ':start_date' => $data["start_date"],
    ':duration' => $data["duration"],
    ':progress' => isset($data["progress"]) ? $data["progress"] : 0,
    ':parent' => $data["parent"]
  ];
}

// getting a link from the request data
function getLink($data){
  return [
    ":source" => $data["source"],
    ":target" => $data["target"],
    ":type" => $data["type"]
  ];
}

// create a new task
function addTask($request, $response, $args) {
  $task = getTask($request->getParsedBody());
  $db = getConnection();
  $query = "INSERT INTO gantt_tasks(text, start_date, duration, progress, parent) ".
    "VALUES (:text,:start_date,:duration,:progress,:parent)";
  $db->prepare($query)->execute($task);

  return $response->withJson([
    "action"=>"inserted",
    "tid"=> $db->lastInsertId()
  ]);
}

// update a task
function updateTask($request, $response, $args) {
  $sid = $request->getAttribute("id");
  $task = getTask($request->getParsedBody());
  $db = getConnection();
  $query = "UPDATE gantt_tasks ".
    "SET text = :text, start_date = :start_date, duration = :duration,". 
      "progress = :progress, parent = :parent ".
    "WHERE id = :sid";

  $db->prepare($query)->execute(array_merge($task, [":sid"=>$sid]));

  return $response->withJson([
    "action"=>"updated"
  ]);
}

// delete a task
function deleteTask($request, $response, $args) {
  $sid = $request->getAttribute("id");
  $db = getConnection();
  $query = "DELETE FROM gantt_tasks WHERE id = :sid";

  $db->prepare($query)->execute([":sid"=>$sid]);
  return $response->withJson([
    "action"=>"deleted"
  ]);
}

// create a new link
function addLink($request, $response, $args) {
  $link = getLink($request->getParsedBody());
  $db = getConnection();
  $query = "INSERT INTO gantt_links(source, target, type) ".
    "VALUES (:source,:target,:type)";
  $db->prepare($query)->execute($link);

  return $response->withJson([
    "action"=>"inserted",
    "tid"=> $db->lastInsertId()
  ]);
}

// update a link
function updateLink($request, $response, $args) {
  $sid = $request->getAttribute("id");
  $link = getLink($request->getParsedBody());
  $db = getConnection();
  $query = "UPDATE gantt_links SET ".
    "source = :source, target = :target, type = :type ".
    "WHERE id = :sid";

  $db->prepare($query)->execute(array_merge($link, [":sid"=>$sid]));
  return $response->withJson([
    "action"=>"updated"
  ]);
}

// delete a link
function deleteLink($request, $response, $args) {
  $sid = $request->getAttribute("id");
  $db = getConnection();
  $query = "DELETE FROM gantt_links WHERE id = :sid";

  $db->prepare($query)->execute([":sid"=>$sid]);
  return $response->withJson([
    "action"=>"deleted"
  ]);
}
~~~

Wie Sie sehen, ist zwar relativ viel Code vorhanden, doch jede Methode ist simpel: Wir erstellen/aktualisieren/löschen Tasks und Links. 
Die Insert-Aktion soll die Datenbank-ID eines neuen Elements an den Client zurückgeben.

Beachten Sie, dass wir hier keine Beziehungen in der Datenbank behandeln, d. h. wir löschen keine verschachtelten Tasks oder verknüpfte Links, wenn Tasks gelöscht werden. Das wird standardmäßig vom Client übernommen. Gantt wird eine separate Anfrage für jeden Kind-Task und jeden zu löschenden Link senden.

Wenn Sie es auf dem Backend handhaben möchten, müssen Sie die Konfiguration cascade_delete einschalten.

Nun ist alles bereit. Starten Sie unsere Anwendung. Öffnen Sie http://127.0.0.1:8080 und genießen Sie ein hübsches Gantt-Diagramm, das wir gerade erstellt haben.

![ready_gantt](/img/ready_gantt.png)

## Speichern der Reihenfolge der Aufgaben {#storingtheorderoftasks}

Der clientseitige Gantt ermöglicht es, Aufgaben per Drag & Drop neu zu ordnen. Wenn Sie diese Funktion verwenden, müssen Sie diese Reihenfolge in der Datenbank speichern. 
Sie können [die allgemeine Beschreibung hier](guides/server-side.md#storingtheorderoftasks) einsehen.

Fügen wir diese Funktion nun zu unserer App hinzu.

### Aufgaben-Neuanordnung auf dem Client aktivieren

Zunächst müssen wir es den Benutzern ermöglichen, die Aufgabenreihenfolge in der Benutzeroberfläche zu ändern. Öffnen Sie die *Index*-Ansicht und passen Sie die Konfiguration von gantt an:

~~~js title="/templates/index.phtml"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Nun spiegeln wir diese Änderungen auch im Backend wider. Wir speichern die Reihenfolge in der Spalte namens "sortorder". Die aktualisierte Deklaration der Tabelle *gantt_tasks* könnte wie folgt aussehen:

~~~js
CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL  AUTO_INCREMENT PRIMARY KEY,
  `text` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL DEFAULT 0,
  `parent` int(11) NOT NULL,
  `sortorder` int(11) NOT NULL /*!*/
);
~~~

Oder Sie fügen die erwähnte Spalte in die bereits vorhandene Tabelle ein:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

Nach diesem Schritt müssen wir CRUD in *src/gantt.php* aktualisieren.

1 . <b>GET /data</b> muss Aufgaben liefern, die nach der Spalte `sortorder` sortiert sind: 
  

~~~js title="src/gantt.php"
function getGanttData($request, $response, $args) {
 $db = getConnection();
 $result = [
   "data" => [],
   "links" => []
 ];

 foreach($db->query("SELECT * FROM gantt_tasks ORDER BY sortorder ASC") as $row){
   $row["open"] = true;
   array_push($result["data"], $row);
 }

 foreach ($db->query("SELECT * FROM gantt_links") as $link){
   array_push($result["links"], $link);
 }

 return $response->withJson($result);
}
~~~

2 . Neue Aufgaben müssen den anfänglichen Wert `sortorder` erhalten: 


~~~js title="src/gantt.php"
// create a new task
function addTask($request, $response, $args) {
 $task = getTask($request->getParsedBody());
 $db = getConnection();

 $maxOrderQuery = "SELECT MAX(sortorder) AS maxOrder FROM gantt_tasks";
 $statement = $db->prepare($maxOrderQuery);
 $statement->execute();

 $maxOrder = $statement->fetchColumn();
 if(!$maxOrder)
   $maxOrder = 0;

 $task[\":sortorder\"] = $maxOrder + 1;

 $query="INSERT INTO gantt_tasks(text,start_date,duration,progress,parent,sortorder)".
   "VALUES (:text,:start_date,:duration,:progress,:parent, :sortorder)";
 $db->prepare($query)->execute($task);

 return $response->withJson([
   "action"=>"inserted",
   "tid"=> $db->lastInsertId()
 ]);
}
~~~

3 . Schließlich, wenn ein Benutzer Tasks neu anordnet, müssen die Aufgabenreihenfolgen aktualisiert werden:


~~~js title="src/gantt.php"
// update a task
function updateTask($request, $response, $args) {
  $sid = $request->getAttribute("id");
  $params = $request->getParsedBody();/*!*/
  $task = getTask($params);
  $db = getConnection();
  $query = "UPDATE gantt_tasks ".
    "SET text = :text, start_date = :start_date, duration = :duration, ".
      "progress = :progress, parent = :parent ".
    "WHERE id = :sid";

  $db->prepare($query)->execute(array_merge($task, [":sid"=>$sid]));

  if(isset($params["target"]) && $params["target"])/*!*/
    updateOrder($sid, $params["target"], $db);

  return $response->withJson([
    "action"=>"updated"
  ]);
}

function updateOrder($taskId, $target, $db){
  $nextTask = false;
  $targetId = $target;

  if(strpos($target, "next:") === 0){
    $targetId = substr($target, strlen("next:"));
    $nextTask = true;
  }

  if($targetId == "null")
    return;

  $sql = "SELECT sortorder FROM gantt_tasks WHERE id = :id";
  $statement = $db->prepare($sql);
  $statement->execute([":id"=>$targetId]);

  $targetOrder = $statement->fetchColumn();
  if($nextTask)
    $targetOrder++;

  $sql = "UPDATE gantt_tasks SET sortorder = sortorder + 1 ".
    "WHERE sortorder >= :targetOrder";
  $statement = $db->prepare($sql);
  $statement->execute([":targetOrder"=>$targetOrder]);

  $sql = "UPDATE gantt_tasks SET sortorder = :targetOrder WHERE id = :taskId";
  $statement = $db->prepare($sql);
  $statement->execute([
    ":targetOrder"=>$targetOrder,
    ":taskId"=>$taskId
  ]);
}
~~~

Sie können eine fertige Demo [hier](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x) auf GitHub finden.

## Verwendung von dhtmlxConnector

Alternativ kann ein PHP-Backend auch unter Verwendung der [dhtmlxConnector-Bibliothek](https://docs.dhtmlx.com/connector__php__index.html) implementiert werden. Eine detaillierte Anleitung finden Sie [hier](integrations/php/howtostart-connector.md). 


## Anwendungssicherheit

Gantt stellt keinerlei Mittel zur Verfügung, um eine Anwendung vor verschiedenen Bedrohungen zu schützen, z. B. vor SQL-Injektionen, XSS- oder CSRF-Angriffen. Es liegt in der Verantwortung der Backend-Entwickler, die Sicherheit der Anwendung sicherzustellen. Details finden Sie im entsprechenden Artikel [Guides/app-security.md](guides/app-security.md).

## Troubleshooting

Falls Sie die oben beschriebenen Schritte zur Integration von Gantt mit PHP abgeschlossen haben, Gantt aber keine Tasks und Verknüpfungen auf einer Seite rendert, schauen Sie sich den Artikel [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) an. Er beschreibt die Möglichkeiten, die Ursachen der Probleme zu identifizieren.

## Was kommt als Nächstes

Jetzt haben Sie ein voll funktionsfähiges Gantt. Den vollständigen Code können Sie auf [GitHub](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x) einsehen, klonen oder herunterladen und für Ihre Projekte verwenden.

Sie können auch [Guides zu den zahlreichen Features von Gantt](guides.md) oder Tutorials zur [Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md) prüfen.