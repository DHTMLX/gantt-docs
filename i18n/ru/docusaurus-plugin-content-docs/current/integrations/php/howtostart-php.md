---
title: "dhtmlxGantt с PHP:Slim3"
sidebar_label: "PHP:Slim3"
---

dhtmlxGantt с PHP:Slim3
=====================

В этом руководстве представлены все необходимые детали для создания диаграммы Gantt с использованием PHP 5.6x-7.x в сочетании с RESTful API на стороне сервера.

:::note
Это руководство использует устаревшую версию Slim Framework v3.x. Если вы ищете самую актуальную версию руководства, ознакомьтесь с [Slim Framework v4.x](integrations/php/howtostart-php-slim4.md).
:::

Также доступны руководства по интеграции серверной логики с использованием других платформ и фреймворков:

- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

В этом примере для обработки маршрутизации будет использоваться [Slim 3](https://www.slimframework.com/) framework, а в качестве хранилища данных - MySQL. Операции CRUD будут реализованы с помощью PDO таким образом, чтобы их можно было легко адаптировать под другие фреймворки.

:::note
Полный исходный код [доступен на GitHub](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x).
:::

Шаг 1. Инициализация проекта
-----------------------

### Создание проекта

Начнем с использования [скелетон-приложения](https://github.com/slimphp/Slim-Skeleton), созданного для фреймворка Slim 3.

Сначала импортируйте проект и установите его. Composer делает этот процесс простым:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

Если Composer установлен глобально в вашей системе, выполните:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php
~~~

Далее убедитесь, что установка прошла успешно. Перейдите в директорию приложения и запустите веб-сервер:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Затем откройте [http://127.0.0.1:8080](http://127.0.0.1:8080) в вашем браузере, чтобы увидеть стандартную приветственную страницу Slim.

Шаг 2. Добавление Gantt на страницу
-----------------------

Следующая задача - создать страницу, на которой будет отображаться наша диаграмма Gantt. Найдите стандартную страницу <b>templates/index.phtml</b>. Именно сюда будет встроена диаграмма Gantt и добавлена необходимая настройка для загрузки данных.

Вот полный код:

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

Это добавит на страницу пустую диаграмму Gantt. Пользователь сможет создавать и редактировать задачи и связи, но любые изменения не сохранятся после обновления страницы.

Вы можете проверить это, снова запустив приложение:

**command line**
~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Откройте [http://127.0.0.1:8080/](http://127.0.0.1:8080/) в браузере - вы должны увидеть диаграмму Gantt, отображаемую на странице.

Шаг 3. Настройка базы данных
---------------------

Далее создайте простую базу данных с двумя таблицами.

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

Когда база данных готова, заполните таблицу *gantt_tasks* примерами данных. Используйте следующие SQL-запросы:

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
Подробнее смотрите в примере [здесь](guides/loading.md#standarddatabasestructure).

После завершения настройки проекта можно переходить к загрузке данных.

Шаг 4. Загрузка данных
-------------------------------

Теперь реализуем загрузку данных из базы данных. На клиенте данные будут запрашиваться с помощью метода [gantt.load](api/method/load.md):

**/templates/index.phtml**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

Это вызовет AJAX-запрос по указанному URL, и ожидается, что ответ будет содержать данные для Gantt в [формате JSON](guides/supported-data-formats.md#json).

Также формат даты задается через конфигурацию [date_format](api/config/date_format.md). Это сообщает Gantt, в каком формате источник данных возвращает даты, чтобы клиент мог корректно их обработать.

Далее добавьте обработчик этого запроса на сервере. Откройте *src/routes.php* и определите новый [маршрут](https://www.slimframework.com/docs/v3/objects/router.html):

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

Теперь реализуйте функцию *getGanttData*. Чтобы не загромождать *index.php*, поместите весь код, связанный с Gantt, в отдельный файл.

Создайте *src/gantt.php* и добавьте следующий код:

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

Подключите *src/gantt.php* в *public/index.php*:

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

Что делает приведенный выше код:

- Определяет [маршрут](https://www.slimframework.com/docs/v3/objects/router.html) для конечной точки данных в *src/routes.php*.
- Обработчик маршрута получает все задачи и связи из базы данных и возвращает их в виде [JSON](guides/supported-data-formats.md#json).
- Добавляет свойство *open* каждой задаче, чтобы дерево задач было раскрыто по умолчанию.

После реализации загрузки данных откройте [http://127.0.0.1:8080/](http://127.0.0.1:8080/), чтобы увидеть диаграмму Gantt, заполненную тестовыми данными из предыдущего шага.

![load_data](/img/load_data.png)

Шаг 5. Сохранение изменений
-----------------------------------

Следующий шаг - сохранение изменений, внесённых пользователем, обратно на сервер. Обычно это реализуется с помощью библиотеки [dataProcessor](guides/server-side.md#technique), интегрированной в Gantt.

Обновите *index.phtml*, добавив следующие строки:

**templates/index.phtml**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

DataProcessor отслеживает изменения на клиенте (добавление, редактирование, удаление) и отправляет соответствующие AJAX-запросы на сервер.

Режим REST означает, что используются разные HTTP-методы для различных операций. Полный список маршрутов доступен [здесь](guides/server-side.md#requestresponsedetails).

Теперь добавьте эти маршруты в ваше приложение в *src/routes.php*:

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

Теперь реализуйте соответствующие методы в *src/gantt.php*:

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

// Извлечение данных задачи из запроса
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

// Извлечение данных связи из запроса
function getLink($data){
  return [
    ":source" => $data["source"],
    ":target" => $data["target"],
    ":type" => $data["type"]
  ];
}

// Добавление новой задачи
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

// Обновление существующей задачи
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

// Удаление задачи
function deleteTask($request, $response, $args) {
  $sid = $request->getAttribute("id");
  $db = getConnection();
  $query = "DELETE FROM gantt_tasks WHERE id = :sid";

  $db->prepare($query)->execute([":sid"=>$sid]);
  return $response->withJson([
    "action"=>"deleted"
  ]);
}

// Добавление новой связи
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

// Обновление существующей связи
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

// Удаление связи
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

Хотя код довольно объемный, каждая функция проста: они обрабатывают создание, обновление и удаление задач и связей. При добавлении возвращается новый ID из базы данных.

Обратите внимание, что здесь не реализовано управление связями между записями - например, удаление задачи не приводит к автоматическому удалению ее подзадач или связанных связей. Клиентская часть отправляет отдельные запросы на удаление каждого зависимого элемента.

Если вы хотите реализовать это на сервере, можно включить настройку [cascade_delete](api/config/cascade_delete.md).

Теперь всё готово. Запустите приложение и перейдите по адресу http://127.0.0.1:8080, чтобы увидеть полностью работоспособную диаграмму Gantt.

![ready_gantt](/img/ready_gantt.png)

## Сохранение порядка задач {#storingtheorderoftasks}

Диаграмма Gantt поддерживает [drag-and-drop перестановку задач](guides/reordering-tasks.md). Если вы используете эту возможность, стоит сохранять порядок задач в базе данных.

Общий обзор вы найдете [здесь](guides/server-side.md#storingtheorderoftasks).

Далее мы добавим эту возможность в приложение.

### Включение изменения порядка задач на клиенте

Для начала пользователи должны иметь возможность изменять порядок задач напрямую в пользовательском интерфейсе. Откройте представление *Index* и измените конфигурацию Gantt следующим образом:

**/templates/index.phtml**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Далее эти изменения необходимо отразить на серверной стороне. Порядок задач будет храниться в столбце с названием "sortorder". Вот обновлённое определение таблицы *gantt_tasks*:

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

Если таблица уже существует, просто добавьте новый столбец с помощью следующей команды:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

После этого обновите CRUD-операции в *src/gantt.php*.

1. Эндпоинт <b>GET /data</b> должен возвращать задачи, отсортированные по столбцу `sortorder`:

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

2. При добавлении новых задач назначайте начальное значение `sortorder`:

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

3. Наконец, при изменении порядка задач обновляйте их порядок соответствующим образом:

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

Готовый пример доступен на GitHub для ознакомления: [https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x).

Использование dhtmlxConnector
---------------

В качестве альтернативы, серверную часть на PHP можно построить с использованием [библиотеки dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html). Подробное руководство доступно [здесь](integrations/php/howtostart-connector.md).

Безопасность приложения
-------------------------

Gantt сам по себе не содержит защиту от таких угроз, как SQL-инъекции, XSS или CSRF-атаки. Разработчикам важно самостоятельно реализовать меры безопасности на серверной стороне. Подробнее читайте [в соответствующей статье](guides/app-security.md).

Решение проблем
-----------------

Если после выполнения всех шагов интеграции диаграмма Gantt не отображает задачи или связи, ознакомьтесь с советами по устранению неполадок в [Устранение проблем интеграции с backend](guides/troubleshooting.md).

Что дальше
------------

После базовой настройки Gantt полный исходный код доступен на [GitHub](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x) для клонирования или скачивания для ваших проектов.

Дополнительные материалы включают [руководства по различным возможностям Gantt](guides.md) и инструкции по [интеграции Gantt с другими серверными фреймворками](integrations/howtostart-guides.md).

