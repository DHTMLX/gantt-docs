---
title: "dhtmlxGantt 与 PHP:Slim3"
sidebar_label: "PHP: Slim3"
---

# dhtmlxGantt 与 PHP:Slim3 

在本教程中，您将了解在服务器端使用 PHP 5.6x-7.x 和 RESTful API 创建甘特图所需的信息。

:::note
此教程使用较旧的 Slim Framework v3.x 版本。如果您在寻找教程的最新版本，请查看 [Slim Framework v4.x](integrations/php/howtostart-php-slim4.md) 指南。
:::

还有一些教程是为了在其他平台和框架的帮助下构建服务器端集成而编写的：

- [dhtmlxGantt 与 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt 与 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt 与 Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt 与 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt 与 PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt 与 PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt 与 Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt 与 Ruby on Rails](integrations/other/howtostart-ruby.md)

我们将使用 [Slim 3](https://www.slimframework.com/) 框架进行路由，并以 MySQL 作为数据存储。CRUD 逻辑将基于 PDO，并具有足够的通用性，可与任何其他框架一起使用。

:::note
完整的源代码可以 [在 GitHub 上获取](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x)。
:::

## 第 1 步。初始化一个项目

### 创建一个项目

我们将使用一个 [骨架应用程序](https://github.com/slimphp/Slim-Skeleton)，用于 Slim 3 框架。

首先，我们需要导入该项目并安装它。您可以通过 Composer 轻松完成：

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

如果您已经全局安装了 Composer，可以执行以下命令：

~~~php
composer create-project slim/slim-skeleton gantt-rest-php
~~~

然后您应检查一切是否正常工作。为此，请进入应用文件夹并运行一个 Web 服务器：

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

之后，您可以在浏览器中打开 [http://127.0.0.1:8080](http://127.0.0.1:8080/)，您将看到默认的 Slim 页面。

## 第 2 步。将甘特图添加到页面

现在我们需要创建一个包含甘特图的页面。
请在 <b>templates/index.phtml</b> 找到默认页面。我们希望把甘特图放在此处，并设置实现数据加载的前提条件。

完整代码如下：


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

这段代码会在页面中添加一个空的甘特图。用户将能够创建和修改任务及链接，但重新加载页面后不会保存这些改动。

我们可以通过再次启动应用来进行检查：

~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

现在在浏览器中打开 [http://127.0.0.1:8080/](http://127.0.0.1:8080/)，您将看到页面上绘制了一个甘特图。

## 第 3 步。配置数据库

下一步是创建一个数据库。我们将使用一个包含两个表的简单数据库。

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

数据库就绪后，我们可以继续，用一些测试数据填充 *gantt_tasks* 表。
您可以使用下面的 SQL 示例：

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
查看这里的详细示例 [guides/loading.md#databasestructure](guides/loading.md#databasestructure)。

至此，我们完成了项目的准备工作。现在可以继续进行数据加载。

## 第 4 步。加载数据

现在是实现从数据库加载数据的时刻。 在客户端，我们将使用 [gantt.load](api/method/load.md) 方法发送请求：


~~~js title="/templates/index.phtml"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

该命令将向指定的 URL 发送一个 AJAX 请求，响应中应包含以 [JSON 格式](guides/supported-data-formats.md) 表示的甘特数据。 同时，请注意我们已经指定了 [date_format](api/config/date_format.md) 值。这是告诉甘特图数据源将使用哪种日期格式，以便客户端能够解析它们。

因此，我们应在后端添加一个处理此类请求的处理程序。打开 *src/routes.php* 文件并添加一个新的 [route](https://www.slimframework.com/docs/v3/objects/router.html)：


~~~js title="src/routes.php"
<?php
// Routes

$app->get('/', function ($request, $response, $args) {
  // Render index view
  return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/data',  'getGanttData');/*!*/
~~~

随后，我们需要实现 *getGanttData* 的逻辑。为了不污染 *index.php*，我们将所有与甘特图相关的代码放在一个独立的文件中。

让我们创建一个新文件 *src/gantt.php* 并添加所需的代码：


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

并将 *src/gantt.php* 包含到 *public/index.php* 中：


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

让我们对上述代码进行详细分析：

- 我们在 *src/routes.php* 中为数据操作定义了一个 [route](https://www.slimframework.com/docs/v3/objects/router.html)
- 在该路由的处理程序中，我们从数据库读取所有任务和链接，并以 [JSON] 的形式发送给客户端
- 我们还为任务对象添加了 *open* 属性。它将指定任务树在默认情况下为展开状态

因此，我们已经实现了将数据加载到甘特图中。
打开 [http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)，您将看到甘特图现在已用我们在上一步添加的测试数据进行填充。

![load_data](/img/load_data.png)

## 第 5 步。保存变更

下一步是实现将客户端所做的变更保存到服务器。通常，这是通过嵌入到甘特图中的 [dataProcessor](guides/server-side.md#technique) 库来完成的。

打开 *index.phtml*，并添加以下代码行：


~~~js title="templates/index.phtml"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

DataProcessor 将对客户端的每个操作（例如向图表添加数据、修改或删除数据）做出响应，并向服务器发送 AJAX 请求。
DataProcessor 将在 REST 模式下工作，这意味着它将对不同的操作使用不同的 HTTP 方法，以下是 [路由的完整列表](guides/server-side.md#requestresponsedetails)。

因此，现在需要将这些路由添加到应用中并实现所需的逻辑。首先，前往 *src/routes.php*：


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

路由已添加，现在我们将实现与之对应的方法：


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

// 从请求数据获取任务
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

// 从请求数据获取链接
function getLink($data){
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

  return $response->withJson([
    "action"=>"inserted",
    "tid"=> $db->lastInsertId()
  ]);
}

// 更新任务
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

// 删除任务
function deleteTask($request, $response, $args) {
  $sid = $request->getAttribute("id");
  $db = getConnection();
  $query = "DELETE FROM gantt_tasks WHERE id = :sid";

  $db->prepare($query)->execute([":sid"=>$sid]);
  return $response->withJson([
    "action"=>"deleted"
  ]);
}

// 创建新链接
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

// 更新链接
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

// 删除链接
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

正如你所看到的，尽管代码量相对较多，但每个方法都很简单：创建/更新/删除任务和链接。
插入操作应将新项目的数据库 ID 返回给客户端。

请注意，这里并不处理数据库关系，例如在删除任务时不会删除嵌套任务或相关链接。这由客户端默认处理。Gantt 将为每个需要删除的子任务和链接发送单独的请求。

如果你想在后端处理它，你需要开启 [cascade_delete](api/config/cascade_delete.md) 配置。

现在一切就绪。让我们运行应用程序。打开 http://127.0.0.1:8080 并欣赏我们刚刚创建的美观甘特图。

![ready_gantt](/img/ready_gantt.png)

## 存储任务顺序 {#storingtheorderoftasks}

客户端的甘特图允许使用拖放来重新排序任务。所以如果你使用此功能，你需要将该顺序存储在数据库中。
你可以 [在这里查看通用描述](guides/server-side.md#storingtheorderoftasks)。

现在让我们把该功能添加到我们的应用中。

### 在客户端启用任务重新排序

首先，我们需要允许用户在 UI 中更改任务顺序。打开 *Index* 视图并更新甘特图的配置：


~~~js title="/templates/index.phtml"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

现在，将这些更改在后端体现。我们将把顺序存储在名为 "sortorder" 的列中。更新后的 *gantt_tasks* 表声明如下所示：

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

或者，您也可以将上述列添加到您已经拥有的表中：

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

随后，我们需要在 *src/gantt.php* 中更新 CRUD。

1. <b>GET /data</b> 必须返回按 `sortorder` 列排序的任务：

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

2. 新添加的任务必须接收初始值 `sortorder`：

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

3. 最后，当用户重新排序任务时，任务顺序必须被 [更新](guides/server-side.md#storingtheorderoftasks)：

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

你可以在 GitHub 上查看一个可用的示例演示 [a ready demo](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x)。

## 使用 dhtmlxConnector

另外，PHP 后端也可以使用 [dhtmlxConnector 库](https://docs.dhtmlx.com/connector__php__index.html) 来实现。
你可以在此处找到详细的教程 [这里](integrations/php/howtostart-connector.md)。


## 应用安全性

Gantt 本身不提供防范诸如 SQL 注入、XSS 和 CSRF 攻击等威胁的机制。确保应用安全的责任在于实现后端的开发者。请在相应文章中了解详细信息。

## 故障排除

如果你已完成上述步骤以在 PHP 中实现 Gantt 集成，但在页面上未能渲染任务和链接，请参考 [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) 文章。它描述了识别问题根源的方法。

## 接下来

现在你已经拥有一个功能齐全的甘特图。你可以在 [GitHub](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x) 上查看完整代码，克隆或下载并用于你的项目。

你也可以查看 [关于甘特图众多特性的指南 guides on the numerous features of gantt] 或关于 [将甘特图与其他后端框架集成的教程] 的文章。