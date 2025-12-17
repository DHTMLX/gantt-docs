---
title: "dhtmlxGantt mit PHP:Slim"
sidebar_label: "PHP: Slim"
---

dhtmlxGantt mit PHP:Slim
=====================

Dieses Tutorial bietet alle notwendigen Schritte, um ein PHP-basiertes Gantt-Diagramm mithilfe des Slim 4 Frameworks sowie einer RESTful API auf der Serverseite zu erstellen.

:::note
Dieses Tutorial verwendet das Slim Framework v4.x. Wenn Sie mit einer älteren Version arbeiten, beachten Sie bitte die Anleitung für [Slim Framework v3.x](integrations/php/howtostart-php.md).
:::

Es gibt außerdem Tutorials zur Integration mit anderen Plattformen und Frameworks:

- [dhtmlxGantt with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

In dieser Anleitung wird das [Slim 4](https://www.slimframework.com/) Framework für das Routing verwendet, während MySQL als Datenspeicher dient. Die CRUD-Operationen werden mit PDO implementiert und sind flexibel genug gestaltet, um auch mit anderen Frameworks zu funktionieren.

:::note
Den vollständigen Quellcode finden Sie [auf GitHub](https://github.com/DHTMLX/gantt-howto-php).
:::

Schritt 1. Initialisierung eines Projekts
-----------------------

### Ein Projekt erstellen

Wir beginnen mit der Verwendung der [Skeleton-Anwendung](https://github.com/slimphp/Slim-Skeleton), die für Slim 4 bereitgestellt wird.

Um zu starten, importieren Sie das Projekt und installieren Sie die Abhängigkeiten mit Composer:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

Wenn Composer global auf Ihrem System installiert ist, können Sie folgenden Befehl verwenden:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php
~~~

Überprüfen Sie anschließend, ob die Einrichtung korrekt funktioniert, indem Sie in den Projektordner wechseln und einen Webserver starten:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Öffnen Sie dann [http://127.0.0.1:8080](http://127.0.0.1:8080) in Ihrem Browser, um die Standard-Slim-Willkommensseite zu sehen.

Schritt 2. Hinzufügen von Gantt zur Seite
-----------------------
Im nächsten Schritt wird eine Seite erstellt, die das Gantt-Diagramm anzeigt. Dies geschieht in zwei einfachen Schritten.

### Eine Ansicht erstellen
Erstellen Sie zunächst eine Datei mit dem Namen *basic.html* im Ordner `app/templates`. Diese Datei enthält das Gantt-Diagramm und die erforderliche Einrichtung zum Laden der Daten.

Hier ist der vollständige Code:

**app/templates/basic.html**
~~~html
<!DOCTYPE html>
<html>
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
</html>
~~~

Damit wird ein leeres Gantt-Diagramm auf der Seite eingerichtet. Benutzer können Aufgaben und Verbindungen erstellen und bearbeiten, aber alle Änderungen gehen nach dem Aktualisieren der Seite verloren.

### Routen einrichten

Sobald die neue Seite bereit ist, muss sie über den Browser erreichbar gemacht werden. Fügen Sie die folgende Route zu **app/routes.php** hinzu:

**app/routes.php**
~~~php
$app->get('/', function (Request $request, Response $response) {
$payload = file_get_contents(__DIR__.'/templates/basic.html');
$response->getBody()->write($payload);
return $response;
});
~~~

Starten Sie die Anwendung neu mit:

**command line**
~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Wenn Sie nun [http://127.0.0.1:8080/](http://127.0.0.1:8080/) im Browser aufrufen, wird das Gantt-Diagramm auf der Seite angezeigt.

![gantt_slim_in](/img/gantt_slim_in.png)

Schritt 3. Konfigurieren einer Datenbank
---------------------

Nachdem das Gantt-Diagramm angezeigt wird, besteht der nächste Schritt darin, eine Datenbank zu erstellen und sie mit der Anwendung zu verbinden.

### Datenbank erstellen

Eine Datenbank kann mit jedem bevorzugten MySQL-Client (wie phpMyAdmin) oder direkt über die Konsole erstellt werden. Unten finden Sie ein SQL-Skript, um eine einfache Datenbank mit zwei Tabellen zu erstellen.

~~~js
CREATE DATABASE  IF NOT EXISTS `gantt`;
USE `gantt`;

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

Sobald die Datenbank eingerichtet ist, kann die Tabelle *gantt_tasks* mit einigen Beispieldaten zum Testen gefüllt werden. Verwenden Sie dazu die folgenden SQL-Befehle:

~~~js
INSERT INTO `gantt_tasks` VALUES ('1', 'Project #1', '2020-03-31 00:00:00', 
  '4', '0.8', '0');
INSERT INTO `gantt_tasks` VALUES ('2', 'Task #1', '2020-03-31 00:00:00', 
  '3', '0.5', '1');
INSERT INTO `gantt_tasks` VALUES ('3', 'Task #2', '2020-04-01 00:00:00', 
  '2', '0.7', '1');
INSERT INTO `gantt_tasks` VALUES ('4', 'Task #3', '2020-04-02 00:00:00', 
  '2', '0', '1');
INSERT INTO `gantt_tasks` VALUES ('5', 'Task #1.1', '2020-04-03 00:00:00', 
  '3', '0.34', '2');
INSERT INTO `gantt_tasks` VALUES ('6', 'Task #1.2', '2020-04-03 13:22:17', 
  '2', '0.5', '2');
INSERT INTO `gantt_tasks` VALUES ('7', 'Task #2.1', '2020-04-04 00:00:00',
  '3', '0.2', '3');
INSERT INTO `gantt_tasks` VALUES ('8', 'Task #2.2', '2020-04-05 00:00:00', 
  '2', '0.9', '3');
~~~
Ein ausführlicheres Beispiel finden Sie [hier](guides/loading.md#standarddatabasestructure).

Nachdem das Projekt eingerichtet ist, folgt als nächster Schritt das Laden der Daten.

Schritt 4. Daten laden
-------------------------------

Nun ist es an der Zeit, das Laden der Daten aus der Datenbank einzurichten. Auf der Client-Seite werden die Daten mit der [gantt.load](api/method/load.md)-Methode angefordert:

**app/templates/basic.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

Dieser Befehl sendet eine AJAX-Anfrage an die angegebene URL und erwartet als Antwort Gantt-Daten im [JSON-Format](guides/supported-data-formats.md#json).

Beachten Sie auch den angegebenen Wert für [date_format](api/config/date_format.md). Dieser informiert gantt über das vom Datenquelle verwendete Datumsformat und ermöglicht so das korrekte Parsen auf der Client-Seite.

Als nächstes muss ein Backend-Handler für diese Anfrage hinzugefügt werden. Öffnen Sie die Datei *app/routes.php* und fügen Sie eine neue [Route](https://www.slimframework.com/docs/v4/objects/routing.html) hinzu:

**app/routes.php**
~~~php
$app->get('/data',  'getGanttData');
~~~

Danach sollte die Funktion *getGanttData* implementiert werden. Um *index.php* übersichtlich zu halten, wird der gesamte Gantt-bezogene Code in eine separate Datei ausgelagert.

Erstellen Sie eine neue Datei *app/gantt.php* und fügen Sie folgenden Code hinzu:

**app/gantt.php**
~~~php
<?php

function getConnection()
{
    return new PDO("mysql:host=localhost;dbname=gantt", "root", "root", 
    // where "host" - the host name,
    // "dbname" - the database name
    // "root" - the user name
    // "root" - the password
    [
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
 
  $payload = json_encode($result);
  
  $response->getBody()->write($payload);
  return $response->withHeader("Content-Type", "application/json");
};
~~~

Anschließend binden Sie *app/gantt.php* in *app/routes.php* ein:

**app/routes.php**
~~~php
<?php
declare(strict_types="1);"
 
use AppApplicationActionsUserListUsersAction;
use AppApplicationActionsUserViewUserAction;
use PsrHttpMessageResponseInterface as Response;
use PsrHttpMessageServerRequestInterface as Request;
use SlimApp;
use SlimInterfacesRouteCollectorProxyInterface as Group;
 
// Add dhtmlxGantt CRUD
require __DIR__ . "/gantt.php";
 
return function (App $app) {
    $app->get("/", function (Request $request, Response $response) {
        $payload = file_get_contents(__DIR__."/templates/basic.html");
        $response->getBody()->write($payload);
        return $response;
    });
 
    $app->get("/data",  "getGanttData");
 
    $app->group("/users", function (Group $group) {
        $group->get("", ListUsersAction::class);
        $group->get("/{id}", ViewUserAction::class);
    });
};
~~~

Hier eine Aufschlüsselung des obigen Codes:

- Eine [Route](https://www.slimframework.com/docs/v4/objects/routing.html) für die Datenaktion wird in *app/routes.php* definiert.
- Im Handler der Route werden alle Tasks und Links aus der Datenbank abgerufen und als [JSON](guides/supported-data-formats.md#json) an den Client gesendet.
- Die Eigenschaft *open* wird zu den Task-Objekten hinzugefügt, damit der Aufgabenbaum standardmäßig aufgeklappt ist.

Damit ist das Laden der Daten in Gantt implementiert. Beim Öffnen von [http://127.0.0.1:8080/](http://127.0.0.1:8080/) wird das Gantt-Diagramm mit den zuvor hinzugefügten Beispieldaten angezeigt.

![slim_load](/img/slim_load.png)

Schritt 5. Änderungen speichern
-----------------------------------

Im nächsten Schritt werden Änderungen, die auf der Client-Seite vorgenommen wurden, wieder an den Server gesendet. Dies erfolgt üblicherweise mit der in gantt eingebetteten [dataProcessor](guides/server-side.md#technique)-Bibliothek.

Öffnen Sie *basic.html* und fügen Sie die folgenden Zeilen hinzu:

**app/templates/basic.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

Der dataProcessor überwacht Aktionen auf der Client-Seite wie das Hinzufügen, Ändern oder Löschen von Daten und sendet entsprechende AJAX-Anfragen an den Server. Er arbeitet im REST-Modus und verwendet unterschiedliche HTTP-Methoden für verschiedene Aktionen. Eine [vollständige Liste der Routen](guides/server-side.md#requestresponsedetails) ist verfügbar.

Als nächstes müssen diese Routen zur App hinzugefügt und deren Logik implementiert werden. Aktualisieren Sie zunächst *app/routes.php*:

**app/routes.php**
~~~php
<?php

declare(strict_types="1);"
 
use AppApplicationActionsUserListUsersAction;
use AppApplicationActionsUserViewUserAction;
use PsrHttpMessageResponseInterface as Response;
use PsrHttpMessageServerRequestInterface as Request;
use SlimApp;
use SlimInterfacesRouteCollectorProxyInterface as Group;
 
// Add dhtmlxGantt CRUD
require __DIR__ . "/gantt.php";
 
return function (App $app) {
    $app->get("/", function (Request $request, Response $response) {
        $payload = file_get_contents(__DIR__."/templates/basic.html");
        $response->getBody()->write($payload);
        return $response;
    });
 
    $app->get("/data",  "getGanttData");
 
    $app->post("/data/task", "addTask");
    $app->put("/data/task/{id}", "updateTask");
    $app->delete("/data/task/{id}", "deleteTask");
    
    $app->post("/data/link", "addLink");
    $app->put("/data/link/{id}", "updateLink");
    $app->delete("/data/link/{id}", "deleteLink");
};
~~~

Mit den definierten Routen können die entsprechenden Methoden implementiert werden:

**app/gantt.php**
~~~php
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
  $payload = json_encode($result);
 
  $response->getBody()->write($payload);
  return $response->withHeader("Content-Type", "application/json");
};
 
// Task aus den Request-Daten holen
function getTask($data)
{
  return [
    ":text" => $data["text"],
    ":start_date" => $data["start_date"],
    ":duration" => $data["duration"],
    ":progress" => isset($data["progress"]) ? $data["progress"] : 0,
    ":parent" => $data["parent"]
  ];
}
 
// Link aus den Request-Daten holen
function getLink($data) {
  return [
    ":source" => $data["source"],
    ":target" => $data["target"],
    ":type" => $data["type"]
  ];
}
 
// Neuen Task erstellen
function addTask($request, $response, $args) {
  $task = getTask($request->getParsedBody());
  $db = getConnection();
  $query = "INSERT INTO gantt_tasks(text, start_date, duration, progress, parent) ".
    "VALUES (:text,:start_date,:duration,:progress,:parent)";
  $db->prepare($query)->execute($task);
 
  $result = [
    "action"=>"inserted",
    "tid"=> $db->lastInsertId()
  ];
  $payload = json_encode($result);
 
  $response->getBody()->write($payload);
  return $response->withHeader("Content-Type", "application/json");
}
 
// Task aktualisieren
function updateTask($request, $response, $args) {
  $sid = $request->getAttribute("id");
  parse_str(file_get_contents("php://input"), $body);
  $task = [
      "text" => $body["text"],
      "start_date" => $body["start_date"],
      "duration" => $body["duration"],
      "progress" => $body["progress"],
      "parent" => $body["parent"]
  ];
  $db = getConnection();
  $query = "UPDATE gantt_tasks ".
    "SET text = :text, start_date = :start_date, duration = :duration,". 
      "progress = :progress, parent = :parent ".
    "WHERE id = :sid";
  $db->prepare($query)->execute(array_merge($task, [":sid"=>$sid]));
 
  if (isset($body["target"]) && $body["target"])
  updateOrder($sid, $body["target"], $db);


 
  $result = [
    "action"=>"updated"
  ];
  $payload = json_encode($result);
 
  $response->getBody()->write($payload);
  return $response->withHeader("Content-Type", "application/json");
}
 
// Task löschen
function deleteTask($request, $response, $args) {
  $sid = $request->getAttribute("id");
  $db = getConnection();
  $query = "DELETE FROM gantt_tasks WHERE id = :sid";
 
  $db->prepare($query)->execute([":sid"=>$sid]);
  $result = [
    "action"=>"deleted"
  ];
  $payload = json_encode($result);
 
  $response->getBody()->write($payload);
  return $response->withHeader("Content-Type", "application/json");
}
 
// Neuen Link erstellen
function addLink($request, $response, $args) {
  $link = getLink($request->getParsedBody());
  $db = getConnection();
  $query = "INSERT INTO gantt_links(source, target, type) ".
    "VALUES (:source,:target,:type)";
  $db->prepare($query)->execute($link);
 
  $result = [
    "action"=>"inserted",
    "tid"=> $db->lastInsertId()
  ];
  $payload = json_encode($result);
 
  $response->getBody()->write($payload);
  return $response->withHeader("Content-Type", "application/json");
}
 
// Link aktualisieren
function updateLink($request, $response, $args) {
  $sid = $request->getAttribute("id");
  parse_str(file_get_contents("php://input"), $body);
  $link = [
      "source" => $body["source"],
      "target" => $body["target"],
      "type" => $body["type"]
  ];
  $db = getConnection();
  $query = "UPDATE gantt_links SET ".
    "source = :source, target = :target, type = :type ".
    "WHERE id = :sid";
 
  $db->prepare($query)->execute(array_merge($link, [":sid"=>$sid]));
  $result = [
    "action"=>"updated"
  ];
  $payload = json_encode($result);
 
  $response->getBody()->write($payload);
  return $response->withHeader("Content-Type", "application/json");
}
 
// Link löschen
function deleteLink($request, $response, $args) {
  $sid = $request->getAttribute("id");
  $db = getConnection();
  $query = "DELETE FROM gantt_links WHERE id = :sid";
 
  $db->prepare($query)->execute([":sid"=>$sid]);
  $result = [
    "action"=>"deleted"
  ];
  $payload = json_encode($result);
 
  $response->getBody()->write($payload);
  return $response->withHeader("Content-Type", "application/json");
}
~~~

Auch wenn der Code etwas umfangreich ist, ist jede Methode selbsterklärend: Tasks und Links werden erstellt, aktualisiert oder gelöscht. Bei Einfügeaktionen wird die Datenbank-ID des neu erstellten Elements an den Client zurückgegeben.

Beachten Sie, dass hier keine Datenbank-Relationen verwaltet werden; zum Beispiel werden verschachtelte Tasks oder zugehörige Links nicht automatisch gelöscht, wenn ein Task entfernt wird. Dieses Verhalten wird standardmäßig auf der Client-Seite gehandhabt, wobei Gantt für jede untergeordnete Aufgabe und jeden Link eine separate Löschanfrage sendet.

Falls die Verarbeitung im Backend erfolgen soll, muss die [cascade_delete](api/config/cascade_delete.md)-Konfiguration aktiviert werden.

Damit ist die Anwendung einsatzbereit. Besuchen Sie [http://127.0.0.1:8080](http://127.0.0.1:8080), um das voll funktionsfähige Gantt-Diagramm zu sehen.

![slim4_ready](/img/slim4_ready.png)

## Speichern der Aufgabenreihenfolge {#storingtheorderoftasks}

Das clientseitige gantt unterstützt [Task-Umsortierung](guides/reordering-tasks.md) per Drag & Drop. Wenn diese Funktion genutzt wird, sollte die Reihenfolge der Aufgaben auch in der Datenbank gespeichert werden. Einen [allgemeinen Überblick finden Sie hier](guides/server-side.md#storingtheorderoftasks).

Der nächste Schritt besteht darin, diese Funktionalität in die App zu integrieren.

### Aufgaben-Neuanordnung im Client aktivieren

Zunächst benötigen Benutzer die Möglichkeit, Aufgaben direkt in der Benutzeroberfläche umzusortieren. Öffnen Sie die Datei *basic.html* und passen Sie die Gantt-Konfiguration wie folgt an:

**app/templates/basic.html**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Als nächstes sollten diese Änderungen auch im Backend übernommen werden. Die Aufgabenreihenfolge wird in einer Spalte mit dem Namen "sortorder" gespeichert. So könnte beispielsweise die Definition der Tabelle *gantt_tasks* aussehen:

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

Alternativ, falls die Tabelle bereits existiert, können Sie die neue Spalte wie folgt hinzufügen:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

Nach der Aktualisierung der Datenbank müssen die CRUD-Operationen in *app/gantt.php* entsprechend angepasst werden.

1. Der <b>GET /data</b>-Endpunkt sollte die Aufgaben nach der Spalte `sortorder` sortiert zurückgeben:

**app/gantt.php**
~~~php
function getGanttData($request, $response, $args) {
  $db = getConnection();
  $result = [
    "data"=> [],
    "links"=> []
  ];
 
  foreach($db->query("SELECT * FROM gantt_tasks ORDER BY sortorder ASC") as $row){
    $row["open"] = true;
    array_push($result["data"], $row);
  }
 
  foreach ($db->query("SELECT * FROM gantt_links") as $link){
    array_push($result["links"], $link);
  }
  $payload = json_encode($result);
 
  $response->getBody()->write($payload);
  return $response->withHeader("Content-Type", "application/json");
};
~~~

2. Wenn neue Aufgaben hinzugefügt werden, sollte ihnen ein initialer Wert für `sortorder` zugewiesen werden:

**app/gantt.php**
~~~php
function addTask($request, $response, $args) {
  $task = getTask($request->getParsedBody());
  $db = getConnection();
  $maxOrderQuery = "SELECT MAX(sortorder) AS maxOrder FROM gantt_tasks";
  $statement = $db->prepare($maxOrderQuery);
  $statement->execute();
 
  $maxOrder = $statement->fetchColumn();
  if(!$maxOrder)
    $maxOrder = 0;
  
  $task[":sortorder"] = $maxOrder + 1;
 
  $query = "INSERT INTO gantt_tasks(text, start_date, duration, progress, parent, sortorder) ".
    "VALUES (:text, :start_date, :duration, :progress, :parent, :sortorder)";
  $db->prepare($query)->execute($task);
 
  $result = [
    "action"=>"inserted",
    "tid"=> $db->lastInsertId()
  ];
  $payload = json_encode($result);
 
  $response->getBody()->write($payload);
  return $response->withHeader("Content-Type", "application/json");
}
~~~

3. Schließlich muss beim Umordnen der Aufgaben durch den Benutzer die Aufgabenreihenfolge entsprechend aktualisiert werden [wie hier erklärt](guides/server-side.md#storingtheorderoftasks):

**app/gantt.php**
~~~php
// update a task
function updateTask($request, $response, $args) {
  $sid = $request->getAttribute("id");
  parse_str(file_get_contents("php://input"), $body);
  $task = [
      "text" => $body["text"],
      "start_date" => $body["start_date"],
      "duration" => $body["duration"],
      "progress" => $body["progress"],
      "parent" => $body["parent"],
      "sortorder" => $body["sortorder"]
  ];
  $db = getConnection();
  $query = "UPDATE gantt_tasks ".
    "SET text = :text, start_date = :start_date, duration = :duration,". 
      "progress = :progress, parent = :parent, sortorder = :sortorder ".
    "WHERE id = :sid";
  $db->prepare($query)->execute(array_merge($task, [":sid"=>$sid]));
   
  if(isset($body["target"]) && $body["target"])
    updateOrder($sid, $body["target"], $db);

   
  $result = [
    "action"=>"updated"
  ];
  $payload = json_encode($result);
   
  $response->getBody()->write($payload);
  return $response->withHeader("Content-Type", "application/json");
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

Ein vollständiges, funktionierendes Beispiel ist auf GitHub verfügbar: [https://github.com/DHTMLX/gantt-howto-php](https://github.com/DHTMLX/gantt-howto-php).

Verwendung von dhtmlxConnector
---------------

Eine weitere Möglichkeit zur Implementierung des PHP-Backends ist die Nutzung der [dhtmlxConnector-Bibliothek](https://docs.dhtmlx.com/connector__php__index.html). Ein ausführliches Tutorial finden Sie [hier](integrations/php/howtostart-connector.md).

Anwendungssicherheit
-------------------------

Gantt selbst bietet keinen Schutz gegen gängige Sicherheitsrisiken wie SQL-Injection, XSS oder CSRF. Die Sicherstellung der Anwendungssicherheit liegt in der Verantwortung der Backend-Entwickler. Weitere Informationen finden Sie [in diesem Artikel](guides/app-security.md).

Fehlerbehebung
-----------------

Falls nach Durchführung dieser Schritte das Gantt-Diagramm keine Aufgaben und Verknüpfungen anzeigt, lesen Sie die Anleitung zur Fehlerbehebung unter [Troubleshooting Backend Integration Issues](guides/troubleshooting.md). Dort finden Sie Methoden, um häufige Probleme zu identifizieren und zu lösen.

Wie geht es weiter?
------------

An diesem Punkt ist das Gantt-Diagramm voll funktionsfähig. Der vollständige Quellcode ist auf [GitHub](https://github.com/DHTMLX/gantt-howto-php) verfügbar und kann für eigene Zwecke geklont oder heruntergeladen werden.

Für weiterführende Informationen empfehlen wir die [Anleitungen zu verschiedenen Gantt-Funktionen](guides.md) oder Tutorials zur [Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md).

