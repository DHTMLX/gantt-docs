---
title: "dhtmlxGantt с PHP:Slim"
sidebar_label: "PHP:Slim"
---

dhtmlxGantt с PHP:Slim
=====================

В этом руководстве описаны все необходимые шаги для создания диаграммы Gantt на PHP с использованием Slim 4 Framework и RESTful API на стороне сервера.

:::note
Это руководство использует Slim Framework v4.x. Если вы работаете с более старой версией, обратитесь к [руководству по Slim Framework v3.x](integrations/php/howtostart-php.md).
:::

Также доступны руководства по интеграции с другими платформами и фреймворками:

- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

В этом руководстве для маршрутизации будет использоваться [Slim 4](https://www.slimframework.com/), а в качестве хранилища данных - MySQL. Операции CRUD будут реализованы с помощью PDO, что обеспечит гибкость и позволит использовать их с другими фреймворками.

:::note
Полный исходный код доступен [на GitHub](https://github.com/DHTMLX/gantt-howto-php).
:::

Шаг 1. Инициализация проекта
-----------------------

### Создание проекта

Мы начнем с использования [skeleton-приложения](https://github.com/slimphp/Slim-Skeleton), предоставленного для Slim 4.

Для начала импортируйте проект и установите зависимости с помощью Composer:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

Если Composer установлен глобально в вашей системе, используйте команду:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php
~~~

Далее убедитесь, что установка прошла успешно: перейдите в папку проекта и запустите веб-сервер:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Затем откройте [http://127.0.0.1:8080](http://127.0.0.1:8080) в браузере, чтобы увидеть стандартную страницу приветствия Slim.

Шаг 2. Добавление Gantt на страницу
-----------------------
Следующий шаг - создать страницу, на которой будет отображаться диаграмма Gantt. Это делается в два простых этапа.

### Создание представления
Начните с создания файла *basic.html* в папке `app/templates`. Этот файл будет содержать диаграмму Gantt и необходимую настройку для загрузки данных.

Вот полный код:

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

Это создаёт на странице пустую диаграмму Gantt. Пользователи могут создавать и изменять задачи и связи, но все изменения не сохраняются после обновления страницы.

### Настройка маршрутов

Чтобы новая страница была доступна в браузере, добавьте следующий маршрут в **app/routes.php**:

**app/routes.php**
~~~php
$app->get('/', function (Request $request, Response $response) {
$payload = file_get_contents(__DIR__.'/templates/basic.html');
$response->getBody()->write($payload);
return $response;
});
~~~

Перезапустите приложение командой:

**command line**
~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Теперь при переходе по адресу [http://127.0.0.1:8080/](http://127.0.0.1:8080/) в браузере на странице отобразится диаграмма Gantt.

![gantt_slim_in](/img/gantt_slim_in.png)

Шаг 3. Настройка базы данных
---------------------

После отображения диаграммы Gantt следующим шагом будет создание базы данных и подключение её к приложению.

### Создание базы данных

Базу данных можно создать с помощью любого удобного клиента MySQL (например, phpMyAdmin) или напрямую из консоли. Ниже приведён SQL-скрипт для создания простой базы данных с двумя таблицами.

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

После создания базы данных таблицу *gantt_tasks* можно заполнить тестовыми данными. Используйте следующие SQL-команды:

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
Более подробный пример приведён [здесь](guides/loading.md#standarddatabasestructure).

После завершения настройки проекта следующим шагом будет загрузка данных.

Шаг 4. Загрузка данных
-------------------------------

Теперь необходимо настроить загрузку данных из базы данных. На стороне клиента данные будут запрашиваться с помощью метода [gantt.load](api/method/load.md):

**app/templates/basic.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

Эта команда отправляет AJAX-запрос по указанному URL и ожидает, что ответ будет содержать данные Gantt в [формате JSON](guides/supported-data-formats.md#json).

Также обратите внимание на значение [date_format](api/config/date_format.md). Оно сообщает Gantt о формате даты, используемом в источнике данных, что позволяет корректно парсить даты на клиенте.

Далее нужно добавить обработчик этого запроса на сервере. Откройте файл *app/routes.php* и добавьте новый [маршрут](https://www.slimframework.com/docs/v4/objects/routing.html):

**app/routes.php**
~~~php
$app->get('/data',  'getGanttData');
~~~

После этого реализуйте функцию *getGanttData*. Чтобы *index.php* оставался чистым, весь код, связанный с Gantt, будет размещён в отдельном файле.

Создайте новый файл *app/gantt.php* и добавьте следующий код:

**app/gantt.php**
~~~php
<?php

function getConnection()
{
    return new PDO("mysql:host=localhost;dbname=gantt", "root", "root", 
    // где "host" - имя хоста,
    // "dbname" - имя базы данных
    // "root" - имя пользователя
    // "root" - пароль
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

Затем подключите *app/gantt.php* в *app/routes.php*:

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
 
// Добавление dhtmlxGantt CRUD
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

Краткое описание приведённого выше кода:

- [Маршрут](https://www.slimframework.com/docs/v4/objects/routing.html) для действия с данными определён в *app/routes.php*.
- В обработчике маршрута все задачи и связи выбираются из базы данных и отправляются клиенту в формате [JSON](guides/supported-data-formats.md#json).
- Для объектов задач добавляется свойство *open*, чтобы дерево задач было раскрыто по умолчанию.

На этом загрузка данных в Gantt реализована. Открыв [http://127.0.0.1:8080/](http://127.0.0.1:8080/), вы увидите диаграмму Gantt, заполненную ранее добавленными тестовыми данными.

![slim_load](/img/slim_load.png)

Шаг 5. Сохранение изменений
-----------------------------------

Следующий шаг - сохранение изменений, внесённых на клиенте, обратно на сервер. Обычно для этого используется библиотека [dataProcessor](guides/server-side.md#technique), встроенная в Gantt.

Откройте *basic.html* и добавьте следующие строки:

**app/templates/basic.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

dataProcessor отслеживает действия пользователя, такие как добавление, изменение или удаление данных, и отправляет соответствующие AJAX-запросы на сервер. Он работает в режиме REST, используя разные HTTP-методы для различных действий. [Полный список маршрутов](guides/server-side.md#requestresponsedetails) доступен в документации.

Далее необходимо добавить эти маршруты в приложение и реализовать их логику. Сначала обновите *app/routes.php*:

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
 
// Добавление dhtmlxGantt CRUD
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

После добавления маршрутов можно реализовать соответствующие методы:

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
 
// получение задачи из данных запроса
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
 
// получение связи из данных запроса
function getLink($data) {
  return [
    ":source" => $data["source"],
    ":target" => $data["target"],
    ":type" => $data["type"]
  ];
}
 
// создание новой задачи
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
 
// обновление задачи
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
 
// удаление задачи
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
 
// создание новой связи
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
 
// обновление связи
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
 
// удаление связи
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

Хотя код довольно объёмен, каждая функция проста: задачи и связи создаются, обновляются или удаляются. При добавлении возвращается идентификатор созданного элемента для клиента.

Обратите внимание, что связи между данными в базе здесь не обрабатываются: например, вложенные задачи или связанные связи не удаляются автоматически при удалении задачи. По умолчанию это поведение реализовано на клиенте - Gantt отправляет отдельные запросы на удаление для каждой дочерней задачи и связи.

Если вы хотите реализовать это на сервере, необходимо включить настройку [cascade_delete](api/config/cascade_delete.md).

Теперь приложение готово к запуску. Перейдите по адресу [http://127.0.0.1:8080](http://127.0.0.1:8080), чтобы увидеть полностью работоспособную диаграмму Gantt.

![slim4_ready](/img/slim4_ready.png)

## Сохранение порядка задач {#storingtheorderoftasks}

На стороне клиента Gantt поддерживает [изменение порядка задач](guides/reordering-tasks.md) с помощью drag-and-drop. Если вы используете эту функцию, порядок задач необходимо сохранять в базе данных. [Общий обзор доступен здесь](guides/server-side.md#storingtheorderoftasks).

Далее необходимо добавить эту возможность в приложение.

### Включение переупорядочивания задач на клиенте

Для начала пользователям необходимо предоставить возможность менять порядок задач напрямую в интерфейсе. Откройте файл *basic.html* и измените конфигурацию Gantt следующим образом:

**app/templates/basic.html**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Далее эти изменения должны быть отражены на сервере. Порядок задач будет сохраняться в столбце с именем "sortorder". Пример определения таблицы *gantt_tasks* может выглядеть так:

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

Если таблица уже существует, можно добавить новый столбец следующим образом:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

После обновления базы данных необходимо соответствующим образом скорректировать CRUD-операции в *app/gantt.php*.

1. Эндпоинт <b>GET /data</b> должен возвращать задачи, отсортированные по столбцу `sortorder`:

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

2. При добавлении новых задач им должен назначаться начальный `sortorder`:

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

3. Наконец, при изменении порядка задач пользователем, порядок должен обновляться соответствующим образом [как описано здесь](guides/server-side.md#storingtheorderoftasks):

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

Полный рабочий пример доступен на GitHub: [https://github.com/DHTMLX/gantt-howto-php](https://github.com/DHTMLX/gantt-howto-php).

Использование dhtmlxConnector
---------------

Другой вариант реализации серверной части на PHP - использовать [библиотеку dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html). Подробное руководство доступно [здесь](integrations/php/howtostart-connector.md).

Безопасность приложения
-------------------------

Сам Gantt не обеспечивает защиту от распространённых угроз безопасности, таких как SQL-инъекции, XSS или CSRF. Обеспечение безопасности приложения лежит на разработчиках серверной части. Подробнее читайте [в этой статье](guides/app-security.md).

Устранение неполадок
-----------------

Если после выполнения этих шагов Gantt не отображает задачи и связи, обратитесь к руководству по устранению неполадок: [Устранение проблем интеграции с backend](guides/troubleshooting.md). В нём приведены методы для выявления и решения распространённых проблем.

Что дальше
------------

На этом этапе Gantt полностью работоспособен. Исходный код полностью доступен на [GitHub](https://github.com/DHTMLX/gantt-howto-php), где его можно клонировать или скачать для собственного использования.

Для дальнейшего изучения ознакомьтесь с [руководствами по различным возможностям Gantt](guides.md) или с туториалами по [интеграции Gantt с другими backend-фреймворками](integrations/howtostart-guides.md).

