---
title: "dhtmlxGantt с PHP:Slim3"
sidebar_label: "PHP: Slim3"
---

# dhtmlxGantt с PHP:Slim3 

В этом руководстве вы найдете необходимую информацию о том, как создать диаграмму Gantt используя PHP 5.6x-7.x и RESTful API на сервере.

:::note
Это руководство использует более старую версию Slim Framework v3.x. Если вы ищете самую последнюю версию руководства, ознакомьтесь с [руководством Slim Framework v4.x](integrations/php/howtostart-php-slim4.md).
:::

Существуют и другие руководства по интеграции с серверной стороной на базе других платформ и фреймворков:

- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

Мы будем использовать фреймворк [Slim 3](https://www.slimframework.com/) для маршрутизации и MySQL в качестве хранилища данных. CRUD-логика будет полагаться на PDO и будет достаточно обобщенной, чтобы использоваться с любым другим фреймворком.

:::note
Полный исходный код доступен на GitHub: [available on GitHub](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x).
:::

## Шаг 1. Инициализация проекта

### Создание проекта

Мы будем использовать заготовку приложения (скелет) для фреймворка Slim 3.

Во-первых, нам нужно импортировать проект и установить его. Это можно сделать с помощью Composer:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

Если у вас Composer установлен глобально, можно применить следующую команду:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php
~~~

Затем нужно проверить, что все работает корректно. Для этого перейдите в папку приложения и запустите веб-сервер:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

После этого можно открыть [http://127.0.0.1:8080](http://127.0.0.1:8080/) в браузере — будет отображаться страница Slim по умолчанию.

## Шаг 2. Добавление Gantt на страницу

Теперь нам нужно создать страницу с нашим диаграммой Gantt.
Найдите стандартную страницу в <b>templates/index.phtml</b>. Мы хотим разместить на ней диаграмму Gantt и настроить предпосылки для реализации загрузки данных.

Полный код приведен ниже:


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

Этот код добавит на страницу пустую диаграмму Gantt. Пользователь сможет создавать и изменять задачи и связи, но после перезагрузки страницы изменения не будут сохранены.

Мы можем проверить это, запустив приложение снова:

~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Теперь откройте [http://127.0.0.1:8080/](http://127.0.0.1:8080/) в браузере и вы увидите, что диаграмма Gantt отрисована на странице.

## Шаг 3. Настройка базы данных

Следующий шаг — создать базу данных. Мы сделаем простую базу данных с двумя таблицами.

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

Когда база данных будет готова, можно перейти к заполнению таблицы *gantt_tasks* тестовыми данными.
Вы можете воспользоваться следующим SQL-примером:

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
Подробный пример можно посмотреть здесь: [guides/loading.md#databasestructure](guides/loading.md#databasestructure).

Итак, мы закончили подготовку проекта. Теперь можно переходить к загрузке данных.

## Шаг 4. Загрузка данных

Пришло время реализовать загрузку данных из базы данных. 
На клиентской стороне мы будем запрашивать данные с помощью метода [gantt.load](api/method/load.md):


~~~js title="/templates/index.phtml"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

Эта команда отправит AJAX-запрос по указанному URL, ответ будет содержать данные Gantt в формате [JSON](guides/supported-data-formats.md). 

Также обратите внимание на то, что мы указали значение [date_format](api/config/date_format.md). 
Так мы сообщаем Gantt, в каком формате будут даты у источника данных, чтобы клиентская сторона могла их распарсить.

Таким образом, следует добавить необходимый обработчик для такого запроса на бэкенде.
Откройте файл *src/routes.php* и добавьте новый [маршрут](https://www.slimframework.com/docs/v3/objects/router.html):


~~~js title="src/routes.php"
<?php
// Routes

$app->get('/', function ($request, $response, $args) {
  // Render index view
  return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/data',  'getGanttData');/*!*/
~~~

После этого нужно реализовать логику *getGanttData*. Чтобы не засорять *index.php*, вынесем все, что касается gantt, в отдельный файл.

Создадим новый файл *src/gantt.php* и добавим необходимый код:


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

И подключим *src/gantt.php* в *public/index.php*:


~~~js title="public/index.php"
<?php
if (PHP_SAPI == 'cli-server') {
    // Чтобы встроенный PHP dev-сервер мог определить, запрашивается ли
    // файл статического ресурса
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

Рассмотрим приведенный выше код более подробно:

- мы определили [маршрут](https://www.slimframework.com/docs/v3/objects/router.html) для нашего действия с данными в *src/routes.php*
- в обработчике этого маршрута мы читаем все задачи и связи из базы данных и отправляем их клиенту в формате [JSON](guides/supported-data-formats.md)
- мы также добавили свойство *open* к объектам задач. Оно будет указывать, что дерево задач будет открыто по умолчанию

Итак, реализована загрузка данных в Gantt.
Откройте [http://127.0.0.1:8080/ ](http://127.0.0.1:8080/) и убедитесь, что диаграмма Gantt теперь заполнена тестовыми данными, которые мы добавили на предыдущем шаге.

![load_data](/img/load_data.png)

## Шаг 5. Сохранение изменений

Следующий шаг — реализовать сохранение изменений, сделанных на клиентской стороне, на сервер. Обычно это делается с использованием библиотеки [dataProcessor](guides/server-side.md#technique), которая встроена в диаграмму Gantt.
Откройте *index.phtml* и добавьте следующие строки кода:


~~~js title="templates/index.phtml"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

DataProcessor будет реагировать на каждое действие на клиенте (например, добавление данных в диаграмму, изменение или удаление) отправкой AJAX-запроса на сервер.
DataProcessor будет работать в режиме REST, что означает использование разных HTTP-методов для разных действий, вот полный список маршрутов (routes) [guides/server-side.md#requestresponsedetails].

Теперь нужно добавить эти маршруты в приложение и реализовать требуемую логику. Во-первых, перейдите в *src/routes.php*:


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

Маршруты добавлены, теперь реализуем методы, на которые они ссылаются:


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

Как видно, хотя кода достаточно много, каждая функция проста: создаем/обновляем/удаляем задачи и связи. 
Действие вставки должно возвращать клиенту идентификатор новой записи в базе данных.

Обратите внимание, что мы здесь не обрабатываем отношения базы данных, т.е. не удаляем вложенные задачи или связанные связи при удалении задач. Это обрабатывается клиентской стороной по умолчанию. Gantt отправит отдельный запрос для каждой удаляемой дочерней задачи и каждой удаляемой связи.

Если вы хотите обрабатывать это на бэкенде, вам нужно включить настройку [cascade_delete](api/config/cascade_delete.md).

Теперь всё готово. Давайте запустим наше приложение. Откройте http://127.0.0.1:8080 и наслаждайтесь красивой диаграммой Gantt, которую мы только что создали.

![ready_gantt](/img/ready_gantt.png)

## Сохранение порядка задач {#storingtheorderoftasks}

Клиентская диаграмма Gantt поддерживает [перетасовку задач](guides/reordering-tasks.md) с помощью drag-and-drop. Поэтому, если вы используете эту функцию, вам нужно будет сохранять этот порядок в базе данных. 
Вы можете [ознакомиться с общей схемой здесь](guides/server-side.md#storingtheorderoftasks).

Теперь добавим эту возможность в наше приложение.

### Включение повторного упорядочивания задач на клиенте

Во-первых, разрешим пользователям менять порядок задач в интерфейсе. Откройте представление Index и обновите конфигурацию gantt:


~~~js title="/templates/index.phtml"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

Теперь отражаем эти изменения на бэкенде. Мы будем хранить порядок в колонке с именем "sortorder". Объявление обновленной таблицы *gantt_tasks* может выглядеть следующим образом:

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

Или можно добавить указанную колонку в существующую таблицу:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

После этого необходимо обновить CRUD в *src/gantt.php*.

1 . <b>GET /data</b> должен возвращать задачи в порядке сортировки по столбцу `sortorder`: 
  

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

2 . Новые задачи должны получать начальное значение `sortorder`: 


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

3 . Наконец, когда пользователь меняет порядок задач, необходимо [обновлять](guides/server-side.md#storingtheorderoftasks) их порядок:


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

Вы можете посмотреть готовый демо на GitHub: [https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x).

## Использование dhtmlxConnector

Альтернативно PHP-бэкенд можно реализовать с использованием библиотеки [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html). Подробное руководство можно найти [здесь](integrations/php/howtostart-connector.md). 


## Безопасность приложения

Gantt не обеспечивает защиту от различных угроз, таких как SQL-инъекции или XSS и CSRF-атаки. Важно, чтобы ответственность за безопасность приложения лежала на разработчиках, реализующих бэкенд. Подробнее читайте в соответствующей статье [guides/app-security.md].

## Устранение неполадок

Если вы выполнили описанные выше шаги по интеграции Gantt с PHP, но диаграмма не рендерит задачи и связи на странице, ознакомьтесь со статьей [Troubleshooting Backend Integration Issues](guides/troubleshooting.md). Она описывает способы выявления причин проблем.

## Что дальше

Теперь у вас полнофункциональная диаграмма Gantt. Полный код можно посмотреть на [GitHub](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x), клонировать или скачать его и использовать в своих проектах.

Также можно ознакомиться с [guides на множество функций gantt] (guides.md) или с руководствами по [интеграции Gantt с другими бекенд-фреймворками](integrations/howtostart-guides.md).