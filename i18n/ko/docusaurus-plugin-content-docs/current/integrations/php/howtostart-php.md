---
title: "dhtmlxGantt와 PHP:Slim3 사용하기"
sidebar_label: "dhtmlxGantt와 PHP:Slim3 사용하기"
---

dhtmlxGantt와 PHP:Slim3 사용하기
=====================

이 튜토리얼은 PHP 5.6x-7.x와 서버 측의 RESTful API를 결합하여 Gantt 차트를 생성하는 데 필요한 모든 핵심 정보를 제공합니다.

:::note
이 튜토리얼은 구버전 Slim Framework v3.x를 사용합니다. 최신 버전의 튜토리얼이 필요하다면 [Slim Framework v4.x](integrations/php/howtostart-php-slim4.md) 가이드를 참고하세요.
:::

서버 측 로직을 다른 플랫폼 및 프레임워크와 통합하는 방법에 대한 튜토리얼도 제공됩니다:

- [dhtmlxGantt와 ASP.NET Core 사용하기](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt와 Node.js 연동하기](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt와 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt와 PHP: Laravel 연동](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt와 PHP:Slim 연동하기](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt와 Salesforce LWC 연동하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)

이 예제에서는 라우팅을 처리하기 위해 [Slim 3](https://www.slimframework.com/) 프레임워크를, 데이터 저장소로는 MySQL을 사용합니다. CRUD 연산은 PDO를 활용하여 구현되며, 다른 프레임워크에도 쉽게 적용할 수 있는 방식입니다.

:::note
전체 소스 코드는 [GitHub에서 확인할 수 있습니다](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x).
:::

1단계. 프로젝트 초기화
-----------------------

### 프로젝트 생성하기

우리는 Slim 3 프레임워크용으로 설계된 [스켈레톤 애플리케이션](https://github.com/slimphp/Slim-Skeleton)을 사용하여 시작합니다.

먼저, 프로젝트를 가져와 설치합니다. Composer를 사용하면 이 과정이 간단합니다:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

Composer가 시스템에 전역으로 설치되어 있다면, 다음과 같이 실행할 수 있습니다:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php
~~~

다음으로, 설정이 제대로 되었는지 확인합니다. 애플리케이션 디렉터리로 이동하여 웹 서버를 시작하세요:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

그런 다음 브라우저에서 [http://127.0.0.1:8080](http://127.0.0.1:8080)을 열어 기본 Slim 환영 페이지가 표시되는지 확인하세요.

2단계. Gantt를 페이지에 추가하기
-----------------------

다음 작업은 간트 차트를 표시할 페이지를 만드는 것입니다. 기본 페이지는 <b>templates/index.phtml</b>에 있습니다. 여기에서 간트 차트를 삽입하고 데이터 로딩에 필요한 설정을 할 수 있습니다.

전체 코드는 다음과 같습니다:

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

이 코드는 페이지에 빈 간트 차트를 추가합니다. 사용자는 작업과 링크를 생성 및 편집할 수 있지만, 페이지를 새로고침하면 변경 사항이 저장되지 않습니다.

앱을 다시 실행하여 테스트할 수 있습니다:

**command line**
~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

브라우저에서 [http://127.0.0.1:8080/](http://127.0.0.1:8080/)을 열면 페이지에 간트 차트가 표시됩니다.

3단계. 데이터베이스 구성하기
---------------------

다음으로, 두 개의 테이블이 있는 간단한 데이터베이스를 생성합니다.

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

데이터베이스가 준비되면, *gantt_tasks* 테이블에 샘플 데이터를 추가합니다. 다음 SQL 구문을 사용하세요:

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
자세한 내용은 [여기](guides/loading.md#standarddatabasestructure) 예제를 참고하세요.

프로젝트 설정이 완료되었으니, 이제 데이터 로딩으로 넘어가겠습니다.

4단계. 데이터 로딩하기
-------------------------------

이제 데이터베이스에서 데이터를 불러오는 기능을 구현하겠습니다. 클라이언트 측에서는 [gantt.load](api/method/load.md) 메서드를 사용해 데이터를 요청합니다:

**/templates/index.phtml**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

이렇게 하면 지정한 URL로 AJAX 요청이 전송되며, 응답에는 [JSON 형식](guides/supported-data-formats.md#json)의 간트 데이터가 포함되어야 합니다.

또한 날짜 형식은 [date_format](api/config/date_format.md) 설정을 통해 지정되어 있습니다. 이를 통해 gantt는 데이터 소스의 날짜 형식을 인식하고, 클라이언트에서 날짜를 올바르게 해석할 수 있습니다.

이제 이 요청을 처리할 백엔드 핸들러를 추가합니다. *src/routes.php*를 열고 새로운 [route](https://www.slimframework.com/docs/v3/objects/router.html)를 정의하세요:

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

그런 다음, *getGanttData* 함수를 구현합니다. *index.php*를 깔끔하게 유지하기 위해, 간트 관련 코드는 별도의 파일에 작성합니다.

*src/gantt.php*를 생성하고 다음 코드를 추가하세요:

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

*src/gantt.php*를 *public/index.php*에 포함시키세요:

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

위 코드의 역할은 다음과 같습니다:

- *src/routes.php*에서 데이터 엔드포인트에 대한 [route](https://www.slimframework.com/docs/v3/objects/router.html)를 정의합니다.
- 라우트 핸들러는 데이터베이스에서 모든 작업과 링크를 가져와 [JSON](guides/supported-data-formats.md#json)으로 반환합니다.
- 각 작업에 *open* 속성을 추가하여, 작업 트리가 기본적으로 펼쳐집니다.

데이터 로딩이 구현되었으니, [http://127.0.0.1:8080/](http://127.0.0.1:8080/)을 열어 이전 단계에서 추가한 샘플 데이터로 채워진 간트 차트를 확인하세요.

![load_data](/img/load_data.png)

5단계. 변경 사항 저장하기
-----------------------------------

다음 단계는 클라이언트에서 변경한 내용을 서버에 저장하는 것입니다. 이는 일반적으로 gantt에 통합된 [dataProcessor](guides/server-side.md#technique) 라이브러리로 처리합니다.

*index.phtml*에 다음 코드를 추가하세요:

**templates/index.phtml**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

DataProcessor는 클라이언트 측의 변경 사항(추가, 수정, 삭제)을 감지하여 서버로 AJAX 요청을 보냅니다.

REST 모드로 실행하면, 작업별로 다른 HTTP 메서드를 사용합니다. [전체 라우트 목록은 여기에서 확인할 수 있습니다](guides/server-side.md#requestresponsedetails).

이제 *src/routes.php*에 다음 라우트를 추가하세요:

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

이제 *src/gantt.php*에 해당 메서드를 구현하세요:

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

코드는 다소 길지만, 각 함수는 간단합니다. 작업과 링크의 생성, 수정, 삭제를 처리합니다. 삽입 시에는 새로 생성된 데이터베이스 ID를 클라이언트로 반환합니다.

데이터베이스 관계는 여기서 관리되지 않습니다 - 예를 들어 작업을 삭제해도 자식 작업이나 관련 링크가 자동으로 삭제되지 않습니다. 클라이언트가 각 종속 항목에 대해 별도의 삭제 요청을 보냅니다.

백엔드에서 이를 관리하고 싶다면 [cascade_delete](api/config/cascade_delete.md) 설정을 사용할 수 있습니다.

이제 모든 준비가 끝났습니다. 애플리케이션을 실행하고 http://127.0.0.1:8080 에 접속하면 완전히 동작하는 간트 차트를 볼 수 있습니다.

![ready_gantt](/img/ready_gantt.png)

## 작업 순서 저장하기 {#storingtheorderoftasks}

간트 차트는 [드래그 앤 드롭으로 작업 순서 변경](guides/reordering-tasks.md)을 지원합니다. 이 기능을 사용할 경우, 데이터베이스에 순서를 저장해야 합니다.

일반적인 개요는 [여기](guides/server-side.md#storingtheorderoftasks)에서 확인할 수 있습니다.

다음으로, 이 기능을 앱에 추가하겠습니다.

### 클라이언트에서 작업 순서 변경 활성화하기

우선, 사용자가 UI에서 직접 작업의 순서를 변경할 수 있어야 합니다. *Index* 뷰를 열고 gantt 설정을 다음과 같이 수정하세요:

**/templates/index.phtml**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

다음으로, 이러한 변경 사항이 백엔드에도 반영되어야 합니다. 작업 순서는 "sortorder"라는 컬럼에 저장됩니다. 아래는 *gantt_tasks* 테이블 정의의 업데이트된 버전입니다:

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

이미 테이블이 있다면, 다음 명령어로 새 컬럼을 추가할 수 있습니다:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

이후, *src/gantt.php*의 CRUD 작업을 업데이트하세요.

1. <b>GET /data</b> 엔드포인트는 `sortorder` 컬럼을 기준으로 정렬된 작업을 반환해야 합니다:

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

2. 새로운 작업을 추가할 때는 초기 `sortorder` 값을 할당하세요:

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

3. 마지막으로, 작업의 순서가 변경될 때 순서를 업데이트 하세요:

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

완성된 데모는 GitHub에서 참고할 수 있습니다: [https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x).

dhtmlxConnector 사용하기
---------------

또 다른 방법으로, PHP 백엔드는 [dhtmlxConnector 라이브러리](https://docs.dhtmlx.com/connector__php__index.html)를 사용해 구축할 수 있습니다. 자세한 튜토리얼은 [여기](integrations/php/howtostart-connector.md)에서 확인할 수 있습니다.

애플리케이션 보안
-------------------------

Gantt 자체는 SQL 인젝션, XSS, CSRF 공격과 같은 위협에 대한 보호 기능을 포함하고 있지 않습니다. 개발자는 백엔드 구현에서 보안 대책을 직접 처리해야 합니다. 자세한 내용은 [관련 문서](guides/app-security.md)에서 확인할 수 있습니다.

문제 해결
-----------------

통합 단계를 완료한 후 Gantt 차트에 작업이나 링크가 표시되지 않는 경우, [백엔드 통합 문제 해결](guides/troubleshooting.md)의 문제 해결 가이드에서 원인 파악 및 해결을 위한 유용한 팁을 확인할 수 있습니다.

다음 단계
------------

기본 Gantt 설정이 완료되면, 전체 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-php/tree/slim-3.x)에서 클론하거나 다운로드하여 프로젝트에 활용할 수 있습니다.

추가 자료로는 [다양한 gantt 기능을 다루는 가이드](guides.md)와 [Gantt를 다른 백엔드 프레임워크와 통합하는 방법에 대한 튜토리얼](integrations/howtostart-guides.md)이 있습니다.

