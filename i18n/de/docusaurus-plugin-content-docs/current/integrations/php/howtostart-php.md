---
title: "dhtmlxGantt mit PHP: Slim3"
sidebar_label: "PHP: Slim3"
---

# dhtmlxGantt mit PHP: Slim3

Dieses Tutorial enthält alle wichtigen Details zur Erstellung eines Gantt-Diagramms mit PHP 5.6x-7.x in Kombination mit einer RESTful API auf der Serverseite.

:::note
Dieses Tutorial verwendet das ältere Slim Framework v3.x. Wenn Sie die aktuellste Version des Tutorials suchen, lesen Sie bitte die Anleitung für den [Slim Framework v4.x](integrations/php/howtostart-php-slim4.md).
:::

Es gibt außerdem Tutorials, die die Integration von serverseitiger Logik mit anderen Plattformen und Frameworks beschreiben:

- [dhtmlxGantt with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

In diesem Beispiel wird das [Slim 3](https://www.slimframework.com/) Framework für das Routing verwendet und MySQL dient als Datenspeicher. Die CRUD-Operationen werden mit PDO umgesetzt, sodass sie leicht auf andere Frameworks übertragbar sind.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x).
:::

## Schritt 1. Initialisierung eines Projekts

### Ein Projekt erstellen

Wir beginnen mit der Verwendung einer [Skelett-Anwendung](https://github.com/slimphp/Slim-Skeleton), die für das Slim 3 Framework entwickelt wurde.

Zuerst importieren und installieren wir das Projekt. Composer macht diesen Prozess unkompliziert:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

Wenn Composer global auf Ihrem System installiert ist, können Sie folgenden Befehl ausführen:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php
~~~

Als Nächstes überprüfen Sie, ob die Einrichtung korrekt funktioniert. Wechseln Sie in das Anwendungsverzeichnis und starten Sie einen Webserver:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Öffnen Sie dann [http://127.0.0.1:8080](http://127.0.0.1:8080) in Ihrem Browser, um die Standard-Willkommensseite von Slim zu sehen.

## Schritt 2. Gantt zur Seite hinzufügen

Als nächstes erstellen wir eine Seite, die unser Gantt-Diagramm anzeigt. Die Standardseite finden Sie unter <b>templates/index.phtml</b>. Hier wird das Gantt-Diagramm eingebettet und die nötige Einrichtung für das Laden der Daten vorgenommen.

Hier ist der vollständige Code:

**/templates/index.phtml**
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

Damit wird ein leeres Gantt-Diagramm zur Seite hinzugefügt. Benutzer können Aufgaben und Verknüpfungen erstellen und bearbeiten, aber alle Änderungen gehen nach dem Aktualisieren der Seite verloren.

Sie können dies testen, indem Sie die Anwendung erneut ausführen:

**command line**
~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Öffnen Sie [http://127.0.0.1:8080/](http://127.0.0.1:8080/) in Ihrem Browser. Sie sollten das Gantt-Diagramm auf der Seite sehen.

## Schritt 3. Eine Datenbank konfigurieren

Erstellen Sie nun eine einfache Datenbank mit zwei Tabellen.

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

Sobald die Datenbank bereit ist, füllen Sie die Tabelle *gantt_tasks* mit Beispieldaten. Verwenden Sie dazu die folgenden SQL-Inserts:

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

Nachdem das Projekt eingerichtet ist, geht es weiter mit dem Laden der Daten.

## Schritt 4. Daten laden

Jetzt implementieren wir das Laden der Daten aus der Datenbank. Auf der Clientseite werden die Daten mit der [gantt.load](api/method/load.md)-Methode angefordert:

**/templates/index.phtml**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

Dies löst eine AJAX-Anfrage an die angegebene URL aus, wobei die Antwort Gantt-Daten im [JSON-Format](guides/supported-data-formats.md#json) enthalten soll.

Das Datumsformat wird außerdem über die [date_format](api/config/date_format.md)-Konfiguration festgelegt. So weiß Gantt, in welchem Format die Datenquelle das Datum bereitstellt, damit der Client die Daten korrekt parsen kann.

Als Nächstes fügen Sie einen Backend-Handler für diese Anfrage hinzu. Öffnen Sie *src/routes.php* und definieren Sie eine neue [Route](https://www.slimframework.com/docs/v3/objects/router.html):

**src/routes.php**
~~~php
<?php
// Routes

$app->get('/', function ($request, $response, $args) {
  // Render index view
  return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/data',  'getGanttData');/*!*/
~~~

Nun implementieren Sie die Funktion *getGanttData*. Um *index.php* übersichtlich zu halten, fügen Sie allen Gantt-bezogenen Code in eine separate Datei ein.

Erstellen Sie *src/gantt.php* und fügen Sie Folgendes hinzu:

**src/gantt.php**
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

  return $response->withJson($result);
};
~~~

Binden Sie *src/gantt.php* in *public/index.php* ein:

**public/index.php**
~~~php
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

Was macht der obenstehende Code?

- Definiert eine [Route](https://www.slimframework.com/docs/v3/objects/router.html) für den Datenendpunkt in *src/routes.php*.
- Der Routen-Handler holt alle Aufgaben und Verknüpfungen aus der Datenbank und gibt sie als [JSON](guides/supported-data-formats.md#json) zurück.
- Fügt jeder Aufgabe die Eigenschaft *open* hinzu, wodurch der Aufgabenbaum standardmäßig ausgeklappt ist.

Mit der implementierten Datenladefunktion können Sie [http://127.0.0.1:8080/](http://127.0.0.1:8080/) öffnen, um das Gantt-Diagramm mit den Beispieldaten aus dem vorherigen Schritt gefüllt zu sehen.

![load_data](/img/load_data.png)

## Schritt 5. Änderungen speichern

Im nächsten Schritt speichern wir die auf dem Client vorgenommenen Änderungen wieder auf dem Server. Dies wird normalerweise von der [dataProcessor](guides/server-side.md#technique)-Bibliothek übernommen, die in Gantt integriert ist.

Aktualisieren Sie *index.phtml*, indem Sie diese Zeilen hinzufügen:

**templates/index.phtml**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

DataProcessor überwacht Änderungen auf der Clientseite (Hinzufügen, Bearbeiten, Löschen) und sendet entsprechende AJAX-Anfragen an den Server.

Im REST-Modus werden unterschiedliche HTTP-Methoden für verschiedene Operationen verwendet. Die [vollständige Liste der Routen finden Sie hier](guides/server-side.md#requestresponsedetails).

Fügen Sie nun diese Routen in Ihrer App in *src/routes.php* hinzu:

**src/routes.php**
~~~php
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

Mit den Routen implementieren Sie die entsprechenden Methoden in *src/gantt.php*:

**src/gantt.php**
~~~php
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

// Extract task data from request
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

// Extract link data from request
function getLink($data){
  return [
    ":source" => $data["source"],
    ":target" => $data["target"],
    ":type" => $data["type"]
  ];
}

// Add a new task
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

// Update an existing task
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

// Delete a task
function deleteTask($request, $response, $args) {
  $sid = $request->getAttribute("id");
  $db = getConnection();
  $query = "DELETE FROM gantt_tasks WHERE id = :sid";

  $db->prepare($query)->execute([":sid"=>$sid]);
  return $response->withJson([
    "action"=>"deleted"
  ]);
}

// Add a new link
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

// Update an existing link
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

// Delete a link
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

Auch wenn der Code etwas umfangreich ist, ist jede Funktion einfach gehalten: Sie übernehmen das Erstellen, Aktualisieren und Löschen von Aufgaben und Verknüpfungen. Beim Einfügen wird die neue Datenbank-ID an den Client zurückgesendet.

Beachten Sie, dass hier keine Datenbank-Relationen verwaltet werden - zum Beispiel wird beim Löschen einer Aufgabe nicht automatisch deren untergeordnete Aufgaben oder zugehörige Verknüpfungen entfernt. Der Client übernimmt dies, indem er für jedes abhängige Element eine eigene Löschanfrage sendet.

Wenn Sie dies lieber im Backend verwalten möchten, können Sie die [cascade_delete](api/config/cascade_delete.md)-Konfiguration aktivieren.

Jetzt ist alles fertig. Starten Sie die Anwendung und besuchen Sie http://127.0.0.1:8080, um das voll funktionsfähige Gantt-Diagramm zu sehen.

![ready_gantt](/img/ready_gantt.png)

## Speichern der Aufgabenreihenfolge {#storingtheorderoftasks}

Das Gantt-Diagramm unterstützt [Drag-and-Drop-Umsortierung](guides/reordering-tasks.md) von Aufgaben. Wenn Sie diese Funktion nutzen, sollten Sie die Reihenfolge in der Datenbank speichern.

Eine allgemeine Übersicht finden Sie [hier](guides/server-side.md#storingtheorderoftasks).

Als nächstes werden wir diese Fähigkeit zur App hinzufügen.

### Aufgaben-Umsortierung auf dem Client aktivieren

Zunächst sollten Benutzer Aufgaben direkt in der Benutzeroberfläche neu anordnen können. Öffnen Sie die *Index*-Ansicht und passen Sie die Gantt-Konfiguration wie folgt an:

**/templates/index.phtml**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Als Nächstes müssen diese Änderungen im Backend berücksichtigt werden. Die Aufgabenreihenfolge wird in einer Spalte namens "sortorder" gespeichert. Hier ist eine aktualisierte Version der *gantt_tasks*-Tabellendefinition:

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

Falls Sie die Tabelle bereits haben, können Sie die neue Spalte einfach mit folgendem Befehl hinzufügen:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

Anschließend aktualisieren Sie die CRUD-Operationen in *src/gantt.php*.

1. Der <b>GET /data</b>-Endpunkt sollte Aufgaben sortiert nach der Spalte `sortorder` zurückgeben:

**src/gantt.php**
~~~php
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

2. Beim Hinzufügen neuer Aufgaben sollte ein initialer Wert für `sortorder` vergeben werden:

**src/gantt.php**
~~~php
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

 $task[":sortorder"] = $maxOrder + 1;

 $query="INSERT INTO gantt_tasks(text,start_date,duration,progress,parent,sortorder)".
   "VALUES (:text,:start_date,:duration,:progress,:parent, :sortorder)";
 $db->prepare($query)->execute($task);

 return $response->withJson([
   "action"=>"inserted",
   "tid"=> $db->lastInsertId()
 ]);
}
~~~

3. Schließlich sollte beim Umsortieren von Aufgaben deren Reihenfolge entsprechend aktualisiert werden:

**src/gantt.php**
~~~php
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

Eine fertige Demo steht als Referenz auf GitHub zur Verfügung: [https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x).

## Verwendung von dhtmlxConnector

Alternativ kann das PHP-Backend auch mit der [dhtmlxConnector-Bibliothek](https://docs.dhtmlx.com/connector__php__index.html) erstellt werden. Eine ausführliche Anleitung ist [hier](integrations/php/howtostart-connector.md) verfügbar.

## Anwendungssicherheit

Gantt selbst bietet keinen Schutz gegen Bedrohungen wie SQL-Injections, XSS oder CSRF-Angriffe. Entwickler sollten entsprechende Sicherheitsmaßnahmen in ihren Backend-Implementierungen berücksichtigen. Weitere Informationen finden Sie [im zugehörigen Artikel](guides/app-security.md).

## Fehlerbehebung

Falls nach Abschluss der Integrationsschritte das Gantt-Diagramm keine Aufgaben oder Verknüpfungen anzeigt, bietet die Anleitung zur Fehlerbehebung in [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) hilfreiche Tipps zur Identifizierung und Lösung von Problemen.

## Wie geht es weiter?

Mit der abgeschlossenen Grundkonfiguration von Gantt ist der vollständige Code auf [GitHub](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x) verfügbar. Sie können ihn klonen oder herunterladen, um Ihre Projekte zu unterstützen.

Weitere Ressourcen finden Sie in [Anleitungen zu verschiedenen Gantt-Funktionen](guides.md) sowie Tutorials zur [Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md).

