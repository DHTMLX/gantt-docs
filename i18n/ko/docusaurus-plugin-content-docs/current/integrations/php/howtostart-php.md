---
title: "PHP:Slim3으로 사용하는 dhtmlxGantt"
sidebar_label: "PHP: Slim3"
---

# PHP:Slim3으로 사용하는 dhtmlxGantt

이 튜토리얼에서는 서버에서 PHP 5.6x-7.x와 RESTful API를 사용하여 간트 차트를 생성하는 데 필요한 정보를 제공합니다.

:::note
이 튜토리얼은 구 Slim Framework v3.x를 사용합니다. 최신 버전의 튜토리얼을 찾고 있다면 [Slim Framework v4.x](integrations/php/howtostart-php-slim4.md) 가이드를 확인해 주세요.
:::

서버 측 통합을 구축하기 위해 다른 플랫폼과 프레임워크를 사용하는 튜토리얼도 있습니다:

- [dhtmlxGantt with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

우리는 라우팅에 Slim 3 프레임워크와 데이터 저장소로 MySQL을 사용할 예정입니다. CRUD 로직은 PDO에 의존하며, 다른 프레임워크에서도 사용할 수 있도록 충분히 일반적으로 구성됩니다.

:::note
전체 소스 코드는 [GitHub에서 보실 수 있습니다](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x).
:::

## 1단계. 프로젝트 초기화

### 프로젝트 생성

Slim 3 프레임워크를 위해 [스켈레톤 애플리케이션](https://github.com/slimphp/Slim-Skeleton)을 활용합니다.

먼저 프로젝트를 가져와 설치해야 합니다. Composer를 사용하면 쉽게 할 수 있습니다:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

전역적으로 Composer가 설치되어 있다면 아래 명령어를 사용할 수 있습니다:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php
~~~

그다음 모든 것이 제대로 작동하는지 확인해야 합니다. 이를 위해 애플리케이션 폴더로 이동하고 웹 서버를 실행합니다:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

그런 다음 브라우저에서 [http://127.0.0.1:8080](http://127.0.0.1:8080/)를 열면 기본 Slim 페이지가 표시됩니다.

## 2단계. 페이지에 Gantt 추가

이제 간트 차트를 포함하는 페이지를 만들어야 합니다.
기본 페이지는 <b>templates/index.phtml</b>에서 찾을 수 있습니다. 그곳에 간트 차트를 배치하고 데이터 로딩을 구현하기 위한 전제 조건을 설정하려고 합니다.

전체 코드는 아래와 같습니다:

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

이 코드는 페이지에 빈 간트를 추가합니다. 사용자는 작업과 연결을 생성 및 수정할 수 있지만, 페이지를 새로고침하면 변경 내용은 저장되지 않습니다.

다시 애플리케이션을 실행해 확인해 볼 수 있습니다:

~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

이제 브라우저에서 [http://127.0.0.1:8080/](http://127.0.0.1:8080/)를 열면 간트가 페이지에 렌더링되는 것을 보게 됩니다.

## 3단계. 데이터베이스 구성

다음 단계는 데이터베이스를 만드는 일입니다. 두 개의 테이블이 있는 간단한 데이터베이스를 만듭니다.

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

데이터베이스가 준비되면 이제 테스트 데이터로 *gantt_tasks* 테이블을 채워 넣을 수 있습니다.
다음 SQL 샘플을 사용할 수 있습니다:

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
자세한 예제는 [여기](guides/loading.md#databasestructure)에서 확인할 수 있습니다.

이제 프로젝트 준비를 마쳤습니다. 데이터 로딩으로 진행할 수 있습니다.

## 4단계. 데이터 로드

이제 데이터베이스에서 데이터를 로딩하는 데 필요한 구현을 시작합니다. 클라이언트 쪽에서 데이터는 [gantt.load](api/method/load.md) 메서드를 사용해 요청합니다:

~~~js title="/templates/index.phtml"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

이 명령은 지정된 URL로 AJAX 요청을 보내고, 응답은 [JSON 형식](guides/supported-data-formats.md)의 간트 데이터로 구성될 것으로 기대됩니다.

또한 [date_format](api/config/date_format.md) 값을 명시했음을 주목해 주세요. 이는 데이터 소스가 사용할 날짜 형식을 간트에 알려 주어 클라이언트 측에서 이를 파싱할 수 있게 해 줍니다.

따라서 백엔드에 이러한 요청에 대한 필요한 핸들러를 추가해야 합니다.
src/routes.php 파일을 열고 새로운 [route](https://www.slimframework.com/docs/v3/objects/router.html)를 추가합니다:

~~~js title="src/routes.php"
<?php
// Routes

$app->get('/', function ($request, $response, $args) {
  // Render index view
  return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/data',  'getGanttData');/*!*/
~~~

그 후 getGanttData 로직을 구현해야 합니다. index.php를 더럽히지 않도록 모든 간트 관련 로직은 별도 파일에 선언합니다.

새 파일 src/gantt.php를 생성하고 필요한 코드를 추가해 보겠습니다:

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

그리고 *public/index.php*에 *src/gantt.php*를 포함시킵니다:

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

다음과 같은 코드 구조를 자세히 살펴보면:

- src/routes.php에서 데이터 액션용 라우트를 정의했습니다
- 해당 라우트의 핸들러에서 데이터베이스에서 모든 작업과 연결을 읽어 클라이언트에 JSON으로 보냅니다
- 또한 작업 객체에 open 속성을 추가했습니다. 이는 작업 트리가 기본적으로 열려 있음을 지정합니다

따라서 데이터 로딩을 Gantt에 구현했습니다.
이제 [http://127.0.0.1:8080/](http://127.0.0.1:8080/)를 열면 이전 단계에서 추가한 테스트 데이터로 간트가 채워진 것을 볼 수 있습니다.

![load_data](/img/load_data.png)

## 5단계. 변경 내용 저장

다음 단계는 클라이언트 측에서 만든 변경 내용을 서버에 저장하는 것을 구현하는 것입니다. 일반적으로 간트에 내장된 [dataProcessor](guides/server-side.md#technique) 라이브러리를 사용합니다.
index.phtml을 열고 아래의 코드를 추가합니다:

~~~js title="templates/index.phtml"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

DataProcessor는 클라이언트의 각 동작(예: 차트에 데이터 추가, 수정 또는 삭제)에 대해 서버로 AJAX 요청을 보내는 방식으로 반응합니다.
dataProcessor는 REST 모드로 작동하며, 이는 서로 다른 작업에 대해 서로 다른 HTTP 메서드를 사용한다는 뜻입니다. 전체 라우트 목록은 [여기](guides/server-side.md#requestresponsedetails)에서 확인할 수 있습니다.

이제 이러한 라우트를 앱에 추가하고 필요한 로직을 구현해야 합니다. 먼저 src/routes.php로 이동하십시오:

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

라우트가 추가되었으니 연결된 메서드를 구현하겠습니다:

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

보시다시피 상당히 많은 코드가 있지만, 각 메서드는 간단합니다: 작업과 연결을 생성/수정/삭제합니다. 삽입 동작은 새 아이템의 데이터베이스 ID를 클라이언트로 반환해야 합니다.

데이터베이스 관계를 이곳에서 처리하지 않는다는 점에 유의하십시오. 즉, 작업이 삭제될 때 중첩 작업이나 관련 링크를 삭제하지 않습니다. 이는 기본적으로 클라이언트 측에서 처리됩니다. 간트는 삭제될 각 자식 작업과 링크에 대해 별도의 요청을 서버로 보냅니다.

백엔드에서 이를 처리하려면 cascade_delete 설정을 활성화해야 합니다.

이제 모든 준비가 끝났습니다. 애플리케이션을 실행해 보겠습니다. [http://127.0.0.1:8080/](http://127.0.0.1:8080/) 을 열고 우리가 방금 만든 멋진 간트를 확인해 보세요.

![ready_gantt](/img/ready_gantt.png)

## 작업 순서 저장 {#storingtheorderoftasks}

클라이언트 측 간트는 끌어다 놓기로 작업의 재정렬이 가능합니다. 이 기능을 사용하면 데이터베이스에 이 순서를 저장해야 합니다.
여기에서 일반적인 설명을 확인할 수 있습니다: [서버 측 가이드의 해당 섹션](guides/server-side.md#storingtheorderoftasks).

이제 이 기능을 우리 앱에 추가해 보겠습니다.

### 클라이언트에서 작업 재정렬 활성화

먼저 사용자가 UI에서 작업 순서를 변경할 수 있도록 해야 합니다. Index 뷰를 열고 gantt 구성(configuration)을 업데이트합니다:

~~~js title="/templates/index.phtml"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

이제 백엔드에서도 이 변경을 반영합니다. 순서를 "sortorder" 열에 저장하도록 하겠습니다. 갱신된 *gantt_tasks* 테이블 선언은 아래와 같을 수 있습니다:

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

또는 이미 가지고 있는 테이블에 위 열을 추가할 수 있습니다:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

그다음 *src/gantt.php*의 CRUD를 업데이트해야 합니다.

1. GET /data는 sortorder 열에 따라 정렬된 작업을 반환해야 합니다: 

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

2. 새로 추가된 작업은 초기 값으로 sortorder를 받아야 합니다:

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

3. 마지막으로 사용자가 작업의 순서를 재정렬하면 작업 순서도 업데이트되어야 합니다:


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

GitHub에 준비된 데모를 확인해 보실 수 있습니다: https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x

## dhtmlxConnector 사용하기

대안으로 PHP 백엔드를 [dhtmlxConnector 라이브러리](https://docs.dhtmlx.com/connector__php__index.html)를 사용하여 구현할 수도 있습니다. 자세한 튜토리얼은 [여기](integrations/php/howtostart-connector.md)를 참고해 주세요.

## 애플리케이션 보안

Gantt는 SQL 주입, XSS, CSRF 공격 등 다양한 위협으로부터 애플리케이션을 보호하는 수단을 제공하지 않습니다. 백엔드를 구현하는 개발자가 애플리케이션 보안을 책임져야 한다는 점이 중요합니다. 관련 내용은 해당 기사에서 확인해 주세요(Guides의 보안 항목 참조).

## 문제 해결

위의 단계를 완료했지만 페이지에서 Gantt가 작업과 연결을 렌더링하지 않는 경우, 백엔드 통합 문제 해결 문서를 확인해 보세요. 문제의 원인을 식별하는 방법이 설명되어 있습니다.

## 앞으로의 흐름

지금은 작동하는 완전한 간트를 가지게 되었습니다. 전체 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x)에서 확인하거나 클론/다운로드하여 프로젝트에 사용할 수 있습니다.

또한 [간트의 다양한 기능에 대한 가이드](guides.md)나 다른 백엔드 프레임워크와의 통합 튜토리얼은 [integrations/howtostart-guides.md](integrations/howtostart-guides.md)에서 확인하실 수 있습니다.