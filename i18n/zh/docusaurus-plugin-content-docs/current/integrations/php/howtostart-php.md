---
title: "dhtmlxGantt 与 PHP:Slim3"
sidebar_label: "PHP: Slim3"
---

dhtmlxGantt 与 PHP:Slim3 
=====================

本教程将为您提供使用 PHP 5.6x-7.x 结合服务端 RESTful API 创建甘特图的所有基本细节。

:::note
本教程使用的是较旧的 Slim Framework v3.x。如果您需要最新版的教程，请参考 [Slim Framework v4.x](integrations/php/howtostart-php-slim4.md) 指南。
:::

我们还为其他平台和框架集成服务端逻辑提供了相关教程:

- [dhtmlxGantt와 ASP.NET Core 사용하기](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt와 Node.js 연동하기](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt와 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt와 PHP: Laravel 연동](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt와 PHP:Slim 연동하기](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt와 Salesforce LWC 연동하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)

在本示例中，[Slim 3](https://www.slimframework.com/) 框架将用于处理路由，MySQL 作为数据存储。CRUD 操作将通过 PDO 实现，并且实现方式便于迁移到其他框架。

:::note
完整源代码已[发布在 GitHub](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x)。
:::

第 1 步. 初始化项目
-----------------------

### 创建项目

我们将从一个为 Slim 3 框架设计的 [skeleton application](https://github.com/slimphp/Slim-Skeleton) 入手。

首先，导入项目并进行安装。Composer 可以简化这个过程:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

如果你的系统已全局安装 Composer，可以直接运行:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php
~~~

接下来，验证安装是否成功。进入应用目录并启动 Web 服务器:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

然后在浏览器中打开 [http://127.0.0.1:8080](http://127.0.0.1:8080)，你将看到 Slim 默认的欢迎页面。

步骤 2. 在页面中添加 Gantt
-----------------------

接下来，我们需要创建一个页面来显示甘特图。找到默认页面 <b>templates/index.phtml</b>。这里将嵌入甘特图，并完成数据加载的设置。

以下是完整代码:

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

这将在页面上添加一个空的甘特图。用户可以创建和编辑任务及链接，但刷新页面后所有更改都不会被保存。

你可以再次运行应用进行测试:

**command line**
~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

在浏览器中打开 [http://127.0.0.1:8080/](http://127.0.0.1:8080/)，你应该能看到页面上渲染出的甘特图。

步骤 3. 配置数据库
---------------------

接下来，创建一个包含两张表的简单数据库。

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

数据库准备好后，向 *gantt_tasks* 表插入一些示例数据。请使用以下 SQL 语句:

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
更多细节可参考此 [示例](guides/loading.md#standarddatabasestructure)。

项目设置完成后，我们将继续进行数据加载。

步骤 4. 加载数据
-------------------------------

现在我们将实现从数据库加载数据。在客户端，数据将通过 [gantt.load](api/method/load.md) 方法请求:

**/templates/index.phtml**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

这将向指定 URL 发送 AJAX 请求，期望响应内容为 [JSON 格式](guides/supported-data-formats.md#json) 的 Gantt 数据。

同时，通过 [date_format](api/config/date_format.md) 配置指定了日期格式，告知 gantt 客户端数据源使用的日期格式，以便正确解析日期。

接下来，为此请求添加后端处理器。打开 *src/routes.php* 并定义一个新的 [路由](https://www.slimframework.com/docs/v3/objects/router.html):

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

然后，实现 *getGanttData* 方法。为了保持 *index.php* 的简洁，将所有甘特相关代码放在单独文件中。

创建 *src/gantt.php* 并添加如下内容:

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

在 *public/index.php* 中引入 *src/gantt.php*:

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

上述代码的作用如下:

- 在 *src/routes.php* 中为数据接口定义了 [路由](https://www.slimframework.com/docs/v3/objects/router.html)。
- 路由处理器从数据库中获取所有任务和链接，并以 [JSON](guides/supported-data-formats.md#json) 格式返回。
- 为每个任务添加了 *open* 属性，使任务树默认展开。

数据加载实现后，打开 [http://127.0.0.1:8080/](http://127.0.0.1:8080/)，即可看到甘特图已填充前面步骤中的示例数据。

![load_data](/img/load_data.png)

步骤 5. 保存更改
-----------------------------------

下一步是将客户端的更改保存回服务器。通常通过集成在 gantt 中的 [dataProcessor](guides/server-side.md#jishushuoming) 库实现。

在 *index.phtml* 中添加如下代码:

**templates/index.phtml**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

DataProcessor 会监听客户端的更改（添加、编辑、删除），并相应地发送 AJAX 请求到服务器。

以 REST 模式运行时，不同操作会使用不同的 HTTP 方法。你可以在 [此处查看完整路由列表](guides/server-side.md#requestresponsedetails)。

现在，在 *src/routes.php* 中添加这些路由:

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

路由添加后，在 *src/gantt.php* 中实现相应方法:

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

虽然代码较长，但每个函数都非常直接:分别处理任务和链接的创建、更新、删除。当插入新数据时，新的数据库 ID 会返回给客户端。

请注意，这里并未处理数据库中的关联关系--比如删除任务时不会自动删除其子任务或相关链接。客户端会为每个依赖项单独发送删除请求。

如果你希望在后端进行管理，可以启用 [cascade_delete](api/config/cascade_delete.md) 配置。

现在一切准备就绪。启动应用并访问 [http://127.0.0.1:8080](http://127.0.0.1:8080)，即可看到完整功能的甘特图。

![ready_gantt](/img/ready_gantt.png)

## 保存任务顺序 {#storingtheorderoftasks}

甘特图支持 [拖放排序](guides/reordering-tasks.md) 功能。如果你使用该功能，建议将任务顺序存储到数据库中。

你可以在 [这里](guides/server-side.md#renwushunxudecunchu) 查看相关概述。

接下来，我们将为应用添加此功能。

### 在客户端启用任务排序

首先，用户应能够直接在界面中重新排列任务。打开 *Index* 视图，并按如下方式修改 gantt 配置:

**/templates/index.phtml**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

接下来，需要在后端反映这些更改。任务顺序将存储在名为 "sortorder" 的列中。以下是更新后的 *gantt_tasks* 表定义:

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

如果你已经有了该表，可以通过以下命令简单地添加新列:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

之后，更新 *src/gantt.php* 中的 CRUD 操作。

1. <b>GET /data</b> 接口应按 `sortorder` 列排序返回任务:

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

2. 添加新任务时，需为其分配初始的 `sortorder` 值:

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

3. 最后，当任务被重新排序时，相应地更新其顺序:

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

一个可用的演示已在 GitHub 上提供，供参考:[https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x)。

使用 dhtmlxConnector
---------------

另外，PHP 后端也可以基于 [dhtmlxConnector 库](https://docs.dhtmlx.com/connector__php__index.html) 构建。详细教程可参考 [这里](integrations/php/howtostart-connector.md)。

应用安全
-------------------------

Gantt 本身不包含防御 SQL 注入、XSS 或 CSRF 等威胁的机制。开发者需要在后端实现安全措施。更多信息可参考[相关文档](guides/app-security.md)。

故障排查
-----------------

如果在完成集成步骤后 Gantt 图未显示任务或链接，可以参考 [백엔드 통합 문제 해결](guides/troubleshooting.md) 中的故障排查指南，帮助识别和解决问题。

后续步骤
------------

完成基础的 gantt 配置后，完整代码可在 [GitHub](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x) 上获取，支持克隆或下载以用于你的项目。

更多资源包括[涵盖各种 gantt 功能的指南](guides.md)以及[与其他后端框架集成的教程](integrations/howtostart-guides.md)。

