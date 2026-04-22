---
title: "dhtmlxGantt mit PHP:Slim"
sidebar_label: "PHP: Slim"
---

# dhtmlxGantt mit PHP:Slim

In diesem Tutorial finden Sie die notwendigen Informationen dazu, wie Sie ein PHP-basiertes Gantt-Diagramm unter Verwendung des Slim 4 Frameworks und einer RESTful API auf dem Server erstellen können.

:::note
Hinweis: Dieses Tutorial verwendet Slim Framework v4.x. Wenn Sie ein Tutorial für eine ältere Version benötigen, lesen Sie die Anleitung [Slim Framework v3.x](integrations/php/howtostart-php.md).
:::

Es gibt Tutorials, die für die serverseitige Integration mit Hilfe anderer Plattformen und Frameworks vorgesehen sind:

- [dhtmlxGantt mit ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt mit ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt mit Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt mit Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt mit PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt mit Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt mit Ruby on Rails](integrations/other/howtostart-ruby.md)

Wir verwenden das [Slim 4](https://www.slimframework.com/) Framework für das Routing und MySQL als Datenspeicher. Die CRUD-Logik basiert auf PDO und ist allgemein genug, um auch mit jedem anderen Framework nutzbar zu sein.

:::note
Der komplette Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/gantt-howto-php).
:::

## Schritt 1. Initialisierung eines Projekts

### Erstellung eines Projekts

Wir verwenden eine [Skelettanwendung](https://github.com/slimphp/Slim-Skeleton) für das Slim 4 Framework.

Zuerst müssen wir das Projekt importieren und installieren. Das geht einfach mit Composer:

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

Anschließend können Sie [http://127.0.0.1:8080](http://127.0.0.1:8080) in einem Browser öffnen und Sie sehen die Standardseite von Slim.

## Schritt 2. Hinzufügen von Gantt zur Seite

Der nächste Schritt besteht darin, eine Seite mit unserem Gantt-Diagramm zu erstellen. Sie umfasst zwei einfache Unter-Schritte, die unten beschrieben sind.

### Erstellung einer Ansicht
Erstellen Sie eine *basic.html*-Datei im Ordner `app` **app/templates**. Dort platzieren wir das Gantt-Diagramm und legen die Voraussetzungen für das Implementieren des Daten-Ladevorgangs fest.

Der vollständige Code sieht wie folgt aus:


~~~html title="app/templates/basic.html"
<!DOCTYPE html>
<html>
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
</html>
~~~

Dieser Code fügt der Seite ein leeres Gantt-Diagramm hinzu. Ein Benutzer kann Aufgaben und Verknüpfungen erstellen und ändern, aber nach dem Neuladen der Seite werden die Änderungen nicht gespeichert.

### Einrichten der Routen

Nachdem eine neue Seite hinzugefügt wurde, muss sie von einem Browser aus zugänglich gemacht werden. Fügen Sie eine Route zu **app/routes.php** hinzu:


~~~php title="app/routes.php"
$app->get('/', function (Request $request, Response $response) {
$payload = file_get_contents(__DIR__.'/templates/basic.html');
$response->getBody()->write($payload);
return $response;
});
~~~

Starten Sie die Anwendung erneut:

~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Jetzt können Sie [http://127.0.0.1:8080/](http://127.0.0.1:8080/) in einem Browser öffnen und Sie werden sehen, dass ein Gantt auf der Seite gerendert wird.

![gantt_slim_in](/img/gantt_slim_in.png)

## Schritt 3. Konfiguration einer Datenbank

Sie haben also ein leeres Gantt. Es ist Zeit, eine Datenbank zu erstellen und sie mit unserer Anwendung zu verbinden.

### Erstellen der Datenbank

Sie können eine Datenbank mit Ihrem bevorzugten mysql-Client (z. B. phpMyAdmin) oder über die Konsole erstellen. Hier ist SQL, um eine einfache Datenbank mit zwei Tabellen zu erstellen.

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

Wenn eine Datenbank bereit ist, können wir fortfahren und die Tabelle *gantt_tasks* mit einigen Testdaten füllen.
Sie können das folgende SQL-Beispiel dafür verwenden:

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
Weitere Details finden Sie hier: [here](guides/loading.md#databasestructure).

Damit haben wir die Vorbereitung unseres Projekt abgeschlossen. Jetzt können wir mit dem Laden der Daten fortfahren.

## Schritt 4. Laden von Daten

Jetzt ist es an der Zeit, das Laden aus der Datenbank zu implementieren. Auf der Client-Seite werden wir Daten mit der Methode [gantt.load](api/method/load.md) anfordern:

~~~js title="app/templates/basic.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

Dieser Befehl sendet eine AJAX-Anfrage an die angegebene URL. Die Antwort wird Gantt-Daten im [JSON-Format](guides/supported-data-formats.md) enthalten.

Beachten Sie außerdem, dass wir den [date_format](api/config/date_format.md) -Wert angegeben haben. So teilen wir Gantt mit, welches Datumsformat die Datenquelle verwenden wird, damit die Client-Seite sie parsen kann.

Daher sollten wir on backend einen passenden Handler für eine solche Anfrage hinzufügen. Öffnen Sie die Datei *app/routes.php* und fügen Sie eine neue [Route](https://www.slimframework.com/docs/v4/objects/routing.html) hinzu:


~~~js title="app/routes.php"
$app->get('/data',  'getGanttData');
~~~

Danach müssen wir die Logik von *getGanttData* implementieren. Um *index.php* nicht zu überladen, definieren wir alle Gantt-bezogenen Dinge in einer separaten Datei.

Erstellen wir eine neue Datei *app/gantt.php* und fügen den erforderlichen Code hinzu:


~~~js title="app/gantt.php"
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

Und schließen Sie *app/gantt.php* in *app/routes.php* ein:


~~~js title="app/routes.php"
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

Betrachten wir den oben beschriebenen Code im Detail:

- Wir haben eine [Route](https://www.slimframework.com/docs/v4/objects/routing.html) für unsere Datenaktion in *app/routes.php* definiert.
- Im Handler dieser Route lesen wir alle Aufgaben und Verknüpfungen aus der Datenbank aus und senden sie dem Client im [JSON](guides/supported-data-formats.md) Format.
- Wir haben außerdem die Eigenschaft *open* zu den Aufgabenobjekten hinzugefügt. Sie gibt an, dass der Aufgabenbaum standardmäßig geöffnet sein wird.

Damit haben wir das Laden von Daten in Gantt implementiert.
Öffnen Sie [http://127.0.0.1:8080/](http://127.0.0.1:8080/) und Sie werden sehen, dass das Gantt jetzt mit den Testdaten aus dem vorherigen Schritt gefüllt ist.

![slim_load](/img/slim_load.png)

## Schritt 5. Speichern von Änderungen

Unser nächster Schritt besteht darin, das Speichern der auf der Client-Seite vorgenommenen Änderungen auf dem Server zu implementieren. Dies erfolgt in der Regel mit der Bibliothek [dataProcessor](guides/server-side.md#technique), die in das Gantt-Diagramm eingebettet ist.
Öffnen Sie *basic.html* und fügen Sie die folgenden Codezeilen hinzu:


~~~js title="app/templates/basic.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

DataProcessor wird auf jede Aktion des Clients reagieren (z. B. das Hinzufügen von Daten in das Diagramm, Änderungen oder Entfernen) und eine AJAX-Anfrage an den Server senden.
Der DataProcessor arbeitet im REST-Modus, was bedeutet, dass er für verschiedene Aktionen verschiedene HTTP-Methoden verwendet. Hier finden Sie [eine vollständige Liste der Routen](guides/server-side.md#requestresponsedetails).

Nun müssen wir diese Routen zu unserer App hinzufügen und die erforderliche Logik implementieren. Öffnen Sie zunächst *app/routes.php*:


~~~js title="app/routes.php"
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

Routen wurden hinzugefügt. Nun implementieren wir die Methoden, mit denen sie verbunden sind:

~~~js title="app/gantt.php"
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
 
// getting a task from the request data
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
 
// getting a link from the request data
function getLink($data) {
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
 
  $result = [
    "action"=>"inserted",
    "tid"=> $db->lastInsertId()
  ];
  $payload = json_encode($result);
 
  $response->getBody()->write($payload);
  return $response->withHeader("Content-Type", "application/json");
}
 
// update a task
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
 
// delete a task
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
 
// create a new link
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
 
// update a link
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
 
// delete a link
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

Wie Sie sehen, ist, obwohl relativ viel Code vorhanden ist, jede Methode recht einfach: Wir erstellen/aktualisieren/löschen Aufgaben und Verknüpfungen. Die Insert-Action sollte die ID des neu erzeugten Elements an den Client zurückgeben.

Beachten Sie, dass wir hier keine Beziehungslogik der Datenbank behandeln, d. h. wir löschen keine verschachtelten Aufgaben oder zugehörige Verknüpfungen, wenn Aufgaben gelöscht werden. Diese werden standardmäßig von der Client-Seite gehandhabt. Gantt wird für jede zu löschende untergeordnete Aufgabe und Verknüpfung eine separate Anfrage senden.

Wenn Sie dies auf dem Backend handhaben möchten, müssen Sie die Konfiguration cascade_delete aktivieren. Jetzt ist alles bereit. Führen Sie unsere Anwendung aus. Öffnen Sie [http://127.0.0.1:8080](http://127.0.0.1:8080/) und genießen Sie ein schönes Gantt-Diagramm, das wir gerade erstellt haben.

![slim4_ready](/img/slim4_ready.png)

## Speichern der Reihenfolge der Aufgaben {#storingtheorderoftasks}

Der clientseitige Gantt ermöglicht es, Aufgaben per Drag-and-Drop neu zu ordnen. Wird diese Funktion genutzt, müssen Sie diese Reihenfolge in der Datenbank speichern. Siehe hierzu ggf. [die allgemeine Beschreibung hier](guides/server-side.md#storingtheorderoftasks).

Lassen Sie uns diese Funktionalität nun zu unserer App hinzufügen.

### Aktivieren der Neuanordnung der Aufgaben im Client

Zuerst müssen wir es den Nutzern ermöglichen, die Aufgabenreihenfolge in der Benutzeroberfläche zu ändern. Öffnen Sie die Datei *basic.html* und passen Sie die Gantt-Konfiguration an:


~~~js title="app/templates/basic.html"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Nun spiegeln wir diese Änderungen im Backend wider. Wir speichern die Reihenfolge in der Spalte namens "sortorder". Die aktualisierte Tabellen-Deklaration von *gantt_tasks* könnte wie folgt aussehen:

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

Oder Sie fügen die erwähnte Spalte der bereits vorhandenen Tabelle hinzu:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

Danach müssen wir das CRUD in *app/gantt.php* aktualisieren.

1 . <b>GET /data</b> muss Aufgaben liefern, sortiert nach der Spalte `sortorder`: 

~~~js title="app/gantt.php"
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

2 . Neu hinzugefügte Aufgaben müssen den anfänglichen Wert `sortorder` erhalten: 

~~~js title="app/gantt.php"
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

3 . Schließlich, wenn ein Benutzer die Aufgaben neu anordnet, müssen die Aufgaben-Reihenfolgen [aktualisiert](guides/server-side.md#storingtheorderoftasks) werden:

~~~js title="app/gantt.php"
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
      "progress = :progress, parent = :parent, sortorder = :sortorder ",
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

Sie können eine fertige Demo auf GitHub prüfen: https://github.com/DHTMLX/gantt-howto-php

## Verwendung von dhtmlxConnector

Alternativ kann ein PHP-Backend auch mithilfe der [dhtmlxConnector-Bibliothek](https://docs.dhtmlx.com/connector__php__index.html) implementiert werden. Eine detaillierte Anleitung finden Sie [hier](integrations/php/howtostart-connector.md).


## Anwendungssicherheit

Gantt bietet keine Mittel, um eine Anwendung vor verschiedenen Bedrohungen zu schützen, wie z. B. SQL-Injektionen oder XSS- und CSRF-Angriffe. Es ist wichtig, dass die Verantwortung für die Sicherheit der Anwendung von den Entwicklern übernommen wird, die das Backend implementieren. Lesen Sie die Details [im entsprechenden Artikel](guides/app-security.md).

## Fehlerbehebung

Falls Sie die oben beschriebenen Schritte zur Integration von Gantt mit PHP abgeschlossen haben, Gantt aber Aufgaben und Verknüpfungen auf einer Seite nicht rendert, schauen Sie sich den Artikel [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) an. Er beschreibt Wege, die Ursachen der Probleme zu identifizieren.

## Was kommt als Nächstes

Jetzt haben Sie ein vollständig funktionierendes Gantt. Den vollständigen Code finden Sie auf [GitHub](https://github.com/DHTMLX/gantt-howto-php); klonen oder herunterladen Sie ihn und verwenden Sie ihn in Ihren Projekten.

Sie können auch [Guides zu den zahlreichen Funktionen von Gantt](guides.md) oder Tutorials zur [Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md) prüfen.