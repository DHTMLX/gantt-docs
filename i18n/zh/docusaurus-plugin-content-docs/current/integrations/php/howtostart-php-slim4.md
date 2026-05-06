--- 
title: "使用 PHP:Slim 的 dhtmlxGantt" 
sidebar_label: "PHP：Slim" 
---

# dhtmlxGantt with PHP:Slim

在本教程中，您将了解如何使用 Slim 4 框架与服务器端的 RESTful API 来创建一个基于 PHP 的甘特图。

:::note
本教程使用 Slim Framework v4.x。如需适用于较旧版本的教程，请查看 [Slim Framework v3.x](integrations/php/howtostart-php.md) 指南。
:::

此外，还有一些针对其他平台和框架的服务端集成教程：

- [dhtmlxGantt with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

我们将使用 [Slim 4](https://www.slimframework.com/) 框架进行路由管理，并以 MySQL 作为数据存储。CRUD 逻辑将依赖 PDO，并具有通用性，能够与任何其他框架一起使用。

:::note
完整的源代码 [可在 GitHub 上获得](https://github.com/DHTMLX/gantt-howto-php)。
:::

## Step 1. 初始化项目

### 创建一个项目

我们将使用一个 [骨架应用程序](https://github.com/slimphp/Slim-Skeleton) 来搭建 Slim 4 框架的应用。

首先，需要导入并安装该项目。您可以通过 Composer 轻松完成：

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

如果您已经在全局安装了 Composer，可以使用以下命令：

~~~php
composer create-project slim/slim-skeleton gantt-rest-php
~~~

接下来，您应检查一切是否正常。为此，请进入应用程序文件夹并启动一个 Web 服务器：

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

之后，您可以在浏览器中打开 [http://127.0.0.1:8080](http://127.0.0.1:8080)，您将看到默认的 Slim 页面。

## Step 2. 将 Gantt 添加到页面

下一步是在页面中创建带有甘特图的视图。它包含以下两个简单的子步骤，下面将介绍。

### 创建视图

在 `app` 下的 *app/templates* 文件夹中创建一个 *basic.html* 文件。我们将在那里放置甘特图，并设置实现数据加载的前提条件。

完整代码如下：


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

此代码会在页面上添加一个空的甘特图。用户将能够创建和修改任务和链接，但页面重新加载后不会保存变更。

### 设置路由

添加一个新的页面后，您需要使其可以在浏览器中访问。向 *app/routes.php* 添加一个路由：

~~~php title="app/routes.php"
$app->get('/', function (Request $request, Response $response) {
$payload = file_get_contents(__DIR__.'/templates/basic.html');
$response->getBody()->write($payload);
return $response;
});
~~~

再次启动应用程序：

~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

现在您可以在浏览器中打开 [http://127.0.0.1:8080/](http://127.0.0.1:8080/) ，您将看到页面上渲染了一个甘特图。

![gantt_slim_in](/img/gantt_slim_in.png)

## Step 3. 配置数据库

至此，您已经拥有一个空的甘特图。现在是创建数据库并将其连接到我们的应用的时候。

### 创建数据库

您可以通过您喜爱的 mysql 客户端（例如 phpMyAdmin），或通过控制台来创建数据库。下面是一个创建包含两张表的简单数据库的 SQL 例子。

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

数据库准备就绪后，我们可以继续往 *gantt_tasks* 表中填充一些测试数据。
您可以使用以下 SQL 示例：

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
在这里可以查看详细示例 [见此处](guides/loading.md#databasestructure)。

至此，我们已经完成项目的准备。现在可以继续进行数据加载。

## Step 4. 加载数据

现在是实现从数据库加载数据的时候。客户端将使用 [gantt.load](api/method/load.md) 方法请求数据：

~~~js title="app/templates/basic.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

此命令将向指定的 URL 发送 AJAX 请求，响应应包含以 JSON 格式表示的甘特数据（参见 [JSON 数据格式]guides/supported-data-formats.md）。

另外，请注意我们已指定 [date_format](api/config/date_format.md) 值。这是告知 gantt 数据源将使用哪种日期格式，以便客户端能够解析它们。

因此，我们需要在后端为这样的请求添加必要的处理程序。
打开 *app/routes.php* 文件并添加一个新的 [路由](https://www.slimframework.com/docs/v4/objects/routing.html)：

~~~js title="app/routes.php"
$app->get('/data',  'getGanttData');
~~~

之后，我们需要实现 *getGanttData* 的逻辑。为了不污染 *index.php*，我们将把所有与甘特相关的逻辑放在一个独立的文件中。

让我们创建一个新的文件 *app/gantt.php* 并添加所需代码：


~~~js title="app/gantt.php"
<?php

function getConnection()
{
    return new PDO("mysql:host=localhost;dbname=gantt", "root", "root", 
    // where "host" - 服务器主机名,
    // "dbname" - 数据库名
    // "root" - 用户名
    // "root" - 密码
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


并在 *app/routes.php* 中引入 *app/gantt.php*：


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

让我们详细地看一下上述代码：

- 我们已经在 *app/routes.php* 中为数据操作定义了一个路由
- 在该路由的处理程序中，我们从数据库读取所有任务和链接，并以 JSON 格式发送给客户端
- 我们还向任务对象添加了 *open* 属性。它将指定任务树默认是打开的

因此，我们实现了将数据加载到 Gantt 中。打开 [http://127.0.0.1:8080/](http://127.0.0.1:8080/) 将看到甘特图已经用我们在上一步中添加的测试数据填充完毕。

![slim_load](/img/slim_load.png)

## Step 5. 保存变更

下一步是将客户端所做的变更保存到服务器端。通常通过嵌入到甘特图中的 [dataProcessor](guides/server-side.md#technique) 库来完成。

打开 *basic.html*，并添加以下代码行：

~~~js title="app/templates/basic.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

DataProcessor 会对客户端的每个操作作出响应（例如向图中新增数据、修改或删除数据），并向服务器发送 AJAX 请求。
DataProcessor 将在 REST 模式下工作，这意味着它将针对不同的操作使用不同的 HTTP 方法，完整的路由列表请参见 [路由详情](guides/server-side.md#requestresponsedetails)。

现在我们需要将这些路由添加到应用中并实现所需的逻辑。首先，进入 *app/routes.php*：

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

路由已添加，现在我们将实现所链接的方法：

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
 
// 从请求数据中获取任务
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
 
// 从请求数据中获取链接
function getLink($data) {
  return [
    ":source" => $data["source"],
    ":target" => $data["target"],
    ":type" => $data["type"]
  ];
}
 
// 创建新任务
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
 
// 更新任务
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
 
// 删除任务
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
 
// 创建新链接
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
 
// 更新链接
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
 
// 删除链接
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


正如你所看到的，尽管代码量相对较多，但每个方法都非常简单：创建/更新/删除任务和链接。
插入操作应将新项目在数据库中的 ID 返回给客户端。

请注意，我们在这里并未处理数据库关系，即在删除任务时不会删除嵌套任务或相关链接。这由客户端端按默认方式处理。甘特图会为每个需要删除的子任务和链接单独发送一条请求。

如果您想在后端处理，请将 [cascade_delete](api/config/cascade_delete.md) 配置开启。

现在一切就绪。让我们运行应用程序。打开 [http://127.0.0.1:8080](http://127.0.0.1:8080/) ，即可欣赏我们刚创建的美观甘特图。

![slim4_ready](/img/slim4_ready.png)

## 保存任务顺序 {#storingtheorderoftasks}

客户端的甘特图支持使用拖放来重新排序任务。因此，如果您使用此功能，需要将该顺序存储到数据库中。
您可以 [在此查看通用描述](guides/server-side.md#storingtheorderoftasks)。

现在让我们把这项特性加入到我们的应用中。

### 在客户端启用任务重新排序

首先，我们需要允许用户在 UI 上更改任务顺序。打开 *basic.html* 文件，更新 gantt 的配置：

~~~js title="app/templates/basic.html"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

现在，让我们在后端反映这些修改。我们将把顺序存储在名为 "sortorder" 的列中。更新后的 *gantt_tasks* 表声明可能如下所示：

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

也可以将上述列添加到您已拥有的表中：

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

接下来，我们需要在 *app/gantt.php* 中更新 CRUD。

1 . <b>GET /data</b> 必须按 `sortorder` 列排序返回任务： 
  

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

2 . 新增的任务应接收初始值 `sortorder`：


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
  
  $task[\":sortorder\"] = $maxOrder + 1;
 
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

3 . 最后，当用户重新排序任务时，任务的顺序必须 [更新](guides/server-side.md#storingtheorderoftasks)：

~~~js title="app/gantt.php"
 // 更新一个任务
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

您可以在 GitHub 上查看一个现成的演示示例。

## 使用 dhtmlxConnector

另外，也可以使用 [dhtmlxConnector 库](https://docs.dhtmlx.com/connector__php__index.html) 来实现 PHP 后端。
您可以在这里找到详细的教程 [howtostart-connector.md](integrations/php/howtostart-connector.md)。

## 应用安全性

Gantt 不提供防护应用免受多种威胁（如 SQL 注入、XSS 和 CSRF 攻击）的机制。确保应用安全的责任在于实现后端的开发人员。详细信息，请参阅相应文章 [guides/app-security.md]。

## 故障排除

如果您已经按照上述步骤实现了与 PHP 的 Gantt 集成，但在页面上未能渲染任务和链接，请查看 [故障排除后端集成问题](guides/troubleshooting.md) 一文。它描述了识别问题根源的方法。

## 下一步

现在您拥有一个功能完整的甘特图。您可以在 [GitHub](https://github.com/DHTMLX/gantt-howto-php) 查看完整代码，克隆或下载并将其用于您的项目。

您还可以查看 [关于甘特图众多功能的指南](guides.md) 或关于 [将甘特图与其他后端框架集成的教程](integrations/howtostart-guides.md)。