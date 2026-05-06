---
title: "dhtmlxGantt с PHP:Slim"
sidebar_label: "PHP: Slim"
---

# dhtmlxGantt с PHP:Slim

В этом руководстве вы найдете необходимую информацию о том, как создать Gantt-график на PHP с использованием Slim 4 Framework и RESTful API на сервере.

:::note
Это руководство использует Slim Framework v4.x. Если вам нужен пример для более старой версии, ознакомьтесь с руководством [Slim Framework v3.x](integrations/php/howtostart-php.md).
:::

Есть руководства, предназначенные для интеграции на стороне сервера с использованием других платформ и фреймворков:

- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

Мы будем использовать фреймворк [Slim 4](https://www.slimframework.com/) для маршрутизации и MySQL как хранилище данных. Логика CRUD будет опираться на PDO и будет достаточно общей, чтобы пригодиться и в других фреймворках.

:::note
Полный исходный код доступен на GitHub: [https://github.com/DHTMLX/gantt-howto-php](https://github.com/DHTMLX/gantt-howto-php).
:::

## Шаг 1. Инициализация проекта

### Создание проекта

Мы будем использовать [ skeleton-приложение](https://github.com/slimphp/Slim-Skeleton) для фреймворка Slim 4.

Во-первых, нам нужно импортировать проект и установить его. Это можно сделать с помощью Composer:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

Если у вас Composer установлен глобально, можно применить следующую команду:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php
~~~

Затем следует проверить, что всё работает корректно. Для этого перейдите в папку приложения и запустите веб-сервер:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Далее вы сможете открыть [http://127.0.0.1:8080](http://127.0.0.1:8080) в браузере — вы увидите страницу по умолчанию Slim.

## Шаг 2. Добавление Gantt на страницу

Следующий шаг — создать страницу с нашим графиком Gantt. Он включает в себя две простые подзадачи, описанные ниже.

### Создание представления
Создайте файл *basic.html* в папке `app` **app/templates**. Мы разместим там график Gantt и настроим предусловия для загрузки данных.

Полный код выглядит так:


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

Этот код добавит на страницу пустой Gantt-график. Пользователь сможет создавать и изменять задачи и связи, но после перезагрузки страницы изменения не сохранятся.

### Настройка маршрутов

После добавления новой страницы нужно сделать её доступной через браузер. Добавьте маршрут в файл **app/routes.php**:


~~~php title="app/routes.php"
$app->get('/', function (Request $request, Response $response) {
$payload = file_get_contents(__DIR__.'/templates/basic.html');
$response->getBody()->write($payload);
return $response;
});
~~~

Запустите приложение заново:

~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Теперь вы можете открыть [http://127.0.0.1:8080/](http://127.0.0.1:8080/) в браузере, и вы увидите, что на странице отрисован Gantt.
 
![gantt_slim_in](/img/gantt_slim_in.png)

## Шаг 3. Настройка базы данных

Итак, у вас пустой Gantt. Пришло время создать базу данных и подключить её к нашему приложению.

### Создание базы данных

Вы можете создать базу данных через ваш любимый mysql-клиент (например, phpMyAdmin) или через консоль. Ниже приведён SQL-запрос для создания простой базы данных с двумя таблицами.

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

Когда база данных готова, можно перейти к заполнению таблицы *gantt_tasks* тестовыми данными.
Для этого можно использовать следующий образец SQL:


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
Подробнее см. в примере [здесь](guides/loading.md#databasestructure).

Итак, мы закончили подготовку проекта. Теперь можно переходить к загрузке данных.

## Шаг 4. Загрузка данных

Пришло время реализовать загрузку из базы данных. 
С клиентской стороны данные будут запрашиваться с помощью метода [gantt.load](api/method/load.md):


~~~js title="app/templates/basic.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

Эта команда отправит AJAX-запрос по указанному URL, ответ должен содержать данные Gantt в формате [JSON](guides/supported-data-formats.md). 

Также обратите внимание на значение [date_format](api/config/date_format.md). 
Таким образом мы сообщаем Gantt какой формат дат будет использовать источник данных, чтобы клиентская сторона могла их разобрать.

Следовательно, на бэкенде нужно добавить обработчик для такого запроса. Откройте файл *app/routes.php* и добавьте новый маршрут [route](https://www.slimframework.com/docs/v4/objects/routing.html):


~~~js title="app/routes.php"
$app->get('/data',  'getGanttData');
~~~

Далее необходимо реализовать логику метода *getGanttData*. Чтобы не загромождать *index.php*, вынесем всю логику, связанную с gantt, в отдельный файл.

Создадим новый файл *app/gantt.php* и добавим необходимый код:


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

И подключите *app/gantt.php* в *app/routes.php*:


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

Рассмотрим вышеописанный код детально:

- мы определили [маршрут](https://www.slimframework.com/docs/v4/objects/routing.html) для нашего действия data в *app/routes.php*
- в обработчике этого маршрута читаем все задачи и связи из базы данных и отправляем клиенту как [JSON](guides/supported-data-formats.md)
- мы также добавили свойство open к объектам задач. Оно будет указывать, что дерево задач будет открыто по умолчанию

Итак, реализована загрузка данных в Gantt.
Откройте [http://127.0.0.1:8080/ ](http://127.0.0.1:8080/) и вы увидите, что Gantt теперь заполнен тестовыми данными, которые мы добавили на предыдущем шаге.

![slim_load](/img/slim_load.png)

## Шаг 5. Сохранение изменений

Наш следующий шаг — реализовать сохранение изменений, сделанных на клиентской стороне, на сервер. Обычно это делается с использованием библиотеки dataProcessor, которая встроена в Gantt.
Откройте *basic.html* и добавьте следующие строки кода:


~~~js title="app/templates/basic.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

DataProcessor будет реагировать на каждое действие на клиенте (например, добавление данных в диаграмму, изменение или удаление) отправляя AJAX-запрос на сервер.
DataProcessor будет работать в режиме REST, что означает использование различных HTTP-методов для разных действий; ниже приведён полный список маршрутов (routes) [guides/server-side.md#requestresponsedetails].

Итак, нужно добавить эти маршруты в наше приложение и реализовать необходимую логику. Во-первых, перейдите в файл *app/routes.php*:


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

Маршруты добавлены, теперь реализуем методы, на которые мы сослались:


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

Как видите, хотя кода довольно много, каждый метод прост и понятен: мы создаём/обновляем/удаляем задачи и связи. 
Операция вставки должна вернуть клиенту идентификатор новой записи в базе данных.

Обратите внимание, что здесь мы не обрабатываем связи в базе данных, например не удаляем вложенные задачи или связанные связи при удалении задач. 
Это обрабатывается на клиентской стороне по умолчанию. Gantt будет посылать отдельный запрос для каждой дочерней задачи и каждой связи, которые нужно удалить.

Если вы хотите обрабатывать это на бэкенде, вам нужно включить конфигурацию cascade_delete.

Теперь всё готово. Запустите наше приложение. Откройте [http://127.0.0.1:8080](http://127.0.0.1:8080/) и наслаждайтесь красивым Gantt-графиком, который мы только что создали.

![slim4_ready](/img/slim4_ready.png)

## Сохранение порядка задач {#storingtheorderoftasks}

Клиентская часть Gantt позволяет [перемещать задачи в порядке](guides/reordering-tasks.md) с помощью drag и drop. Так что если вы используете эту функцию, вам придётся сохранять этот порядок в базе данных. 
Вы можете [посмотреть общую схему здесь](guides/server-side.md#storingtheorderoftasks).

Давайте добавим эту функцию в наше приложение.

### Разрешение изменения порядка задач на клиенте

Во-первых, нужно позволить пользователям менять порядок задач в UI. Откройте файл *basic.html* и обновите конфигурацию gantt:


~~~js title="app/templates/basic.html"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Теперь отразим эти изменения на бэкенде. Мы будем сохранять порядок в колонке с названием "sortorder". Объявление обновлённой таблицы *gantt_tasks* может выглядеть следующим образом:


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

Или можно добавить упомянутый столбец в существующую таблицу:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

Далее нужно обновить CRUD в *app/gantt.php*.

1 . <b>GET /data</b> должен возвращать задачи, отсортированные по столбцу sortorder: 
  

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

2 . Новые задачи должны получать начальное значение `sortorder`: 


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

3 . Наконец, когда пользователь меняет порядок задач, порядок задач должен обновляться:


~~~js title="app/gantt.php"
// обновление задачи
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

Вы можете проверить готовое демо на GitHub: https://github.com/DHTMLX/gantt-howto-php

## Использование dhtmlxConnector

Альтернативно, бэкенд на PHP можно реализовать с использованием библиотеки [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html). Подробное руководство можно найти [здесь](integrations/php/howtostart-connector.md). 


## Безопасность приложения

Gantt не предоставляет каких-либо средств защиты от различных угроз, таких как SQL-инъекции или XSS и CSRF-атаки. Важна ответственность за безопасность приложения лежит на разработчиках, реализующих бэкенд. Подробности читайте в соответствующей статье руководства guid es/app-security.md.

## Устранение неполадок

Если вы выполнили вышеуказанные шаги по интеграции Gantt с PHP, но Gantt не рендерит задачи и связи на странице, посмотрите статью Troubleshooting Backend Integration Issues в guides/troubleshooting.md. Она описывает способы выявления причин проблем.

## Что дальше

Теперь у вас полнофункциональный Gantt. Вы можете просмотреть полный код на [GitHub](https://github.com/DHTMLX/gantt-howto-php), клонировать или скачать его и использовать в своих проектах.

Вы также можете посмотреть [руководства по многочисленным функциям Gantt](guides.md) или ознакомительные материалы по [интеграции Gantt с другими backend-фреймворками](integrations/howtostart-guides.md).