---
title: "PHP:Slim과 dhtmlxGantt"
sidebar_label: "PHP: Slim"
---

# PHP:Slim과 dhtmlxGantt

이 튜토리얼에서는 Slim 4 프레임워크와 서버의 RESTful API를 사용하여 PHP 기반의 Gantt 차트를 만드는 방법에 대해 필요한 정보를 제공합니다.

:::note
이 튜토리얼은 Slim Framework v4.x를 사용합니다. 더 오래된 버전에 대한 튜토리얼이 필요하다면 [Slim Framework v3.x](integrations/php/howtostart-php.md) 가이드를 확인하세요.
:::

다른 플랫폼과 프레임워크를 사용한 서버 측 통합에 대한 튜토리얼도 있습니다:

- [dhtmlxGantt와 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt와 Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt와 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt와 PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt와 Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt와 Ruby on Rails](integrations/other/howtostart-ruby.md)

다음에서는 Slim 4 프레임워크를 라우팅에 사용하고 데이터 저장소로 MySQL을 사용할 예정입니다. CRUD 로직은 PDO에 의존하며, 다른 프레임워크에서도 사용할 수 있을 만큼 일반적으로 작성되어 있습니다.

:::note
전체 소스 코드는 [GitHub에서 확인 가능](https://github.com/DHTMLX/gantt-howto-php).
:::

## 1단계. 프로젝트 초기화

### 프로젝트 생성

Slim 4 프레임워크에 대해 [스켈레톤 애플리케이션](https://github.com/slimphp/Slim-Skeleton)을 사용할 예정입니다.

먼저, 프로젝트를 가져오고 설치합니다. Composer를 사용하면 쉽게 할 수 있습니다:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

전역적으로 Composer가 설치되어 있다면 다음 명령을 사용할 수 있습니다:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php
~~~

그런 다음 모든 것이 정상적으로 작동하는지 확인해야 합니다. 이 목적을 위해 애플리케이션 폴더로 이동한 뒤 웹 서버를 실행합니다:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

그 후 브라우저에서 [http://127.0.0.1:8080](http://127.0.0.1:8080)을 열면 기본 Slim 페이지가 표시됩니다.

## 2단계. 페이지에 Gantt 추가

다음 단계는 우리 Gantt 차트를 포함하는 페이지를 만드는 것입니다. 아래에 설명된 두 가지 간단한 하위 단계가 포함되어 있습니다.

### 뷰 생성하기
`app` 폴더의 **app/templates** 안에 *basic.html* 파일을 만듭니다. 이 파일에 Gantt 차트를 배치하고 데이터 로딩을 구현하기 위한 전제 조건을 설정합니다.

전체 코드는 아래와 같습니다:

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

이 코드는 페이지에 빈 Gantt 차트를 추가합니다. 사용자는 작업과 연결을 생성하고 수정할 수 있지만 페이지를 새로 고침하면 변경 내용은 저장되지 않습니다.

### 라우트 설정

새로운 페이지를 추가한 뒤에는 브라우저에서 접근 가능하도록 만들어야 합니다. **app/routes.php**에 라우트를 추가합니다:

~~~php title="app/routes.php"
$app->get('/', function (Request $request, Response $response) {
$payload = file_get_contents(__DIR__.'/templates/basic.html');
$response->getBody()->write($payload);
return $response;
});
~~~

다시 애플리케이션을 실행해 보십시오:

~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

이제 브라우저에서 [http://127.0.0.1:8080/](http://127.0.0.1:8080/)를 열면 페이지에 Gantt가 렌더링된 것을 확인할 수 있습니다.

![gantt_slim_in](/img/gantt_slim_in.png)

## 3단계. 데이터베이스 구성

이제 빈 Gantt 차트가 준비되었습니다. 데이터베이스를 만들고 이를 우리 애플리케이션에 연결할 차례입니다.

### 데이터베이스 생성

선호하는 mysql 클라이언트(예: phpMyAdmin)나 콘솔을 사용하여 데이터베이스를 생성할 수 있습니다. 아래는 두 개의 테이블을 가진 간단한 데이터베이스를 만드는 SQL 예시입니다.

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

데이터베이스가 준비되면 테스트 데이터를 `gantt_tasks` 테이블에 채워넣을 수 있습니다. 아래 SQL 샘플을 사용할 수 있습니다:

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
자세한 예제는 [여기](guides/loading.md#databasestructure)를 참조하십시오.

이제 프로젝트를 준비했다면 데이터를 로드하는 단계로 넘어갑니다.

## 4단계. 데이터 로드

이제 데이터베이스에서 데이터를 로드하는 것을 구현할 차례입니다. 클라이언트 측에서는 [gantt.load](api/method/load.md) 메서드를 사용하여 데이터를 요청합니다.

~~~js title="app/templates/basic.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

이 명령은 지정된 URL로 AJAX 요청을 전송합니다. 응답은 [JSON 형식](guides/supported-data-formats.md)의 Gantt 데이터여야 합니다.

또한, [date_format](api/config/date_format.md) 값을 지정했다는 점에 주의하십시오. 이는 데이터 소스가 사용할 날짜 형식을 Gantt에 알려 주어 클라이언트 측에서 파싱할 수 있도록 하는 방법입니다.

따라서 백엔드에 이러한 요청에 대한 필요한 핸들러를 추가해야 합니다. *app/routes.php* 파일을 열고 다음과 같은 새로운 [라우트](https://www.slimframework.com/docs/v4/objects/routing.html)를 추가합니다:

~~~js title="app/routes.php"
$app->get('/data',  'getGanttData');
~~~

그다음 *getGanttData* 로직을 구현해야 합니다. index.php를 오염시키지 않기 위해 Gantt 관련 모든 내용은 별도의 파일에 선언합니다.

새 파일 *app/gantt.php*를 만들어 필요한 코드를 추가합니다:

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

그리고 *app/routes.php*에 *app/gantt.php*를 포함시킵니다:

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

위 코드를 자세히 보면 다음과 같습니다:

- *app/routes.php*에서 데이터 액션에 대한 [라우트](https://www.slimframework.com/docs/v4/objects/routing.html)를 정의했습니다.
- 해당 라우트의 핸들러에서 데이터베이스의 모든 작업과 연결을 읽어 클라이언트에 [JSON](guides/supported-data-formats.md) 형태로 보냅니다.
- 각 작업 객체에 *open* 속성을 추가했습니다. 이는 기본적으로 트리 구조가 열려 있도록 지정합니다.

따라서 Gantt에 데이터를 로드하는 기능을 구현했습니다.
이제 [http://127.0.0.1:8080/](http://127.0.0.1:8080/) 에 접속하면 이전 단계에서 추가한 테스트 데이터로 Gantt가 채워진 것을 볼 수 있습니다.

![slim_load](/img/slim_load.png)

## 5단계. 변경 사항 저장

다음 단계는 클라이언트 측에서 서버로 변경 사항을 저장하는 것을 구현하는 것입니다. 이 작업은 보통 Gantt에 내장된 [dataProcessor](guides/server-side.md#technique) 라이브러리를 사용해 수행합니다.

*basic.html*을 열고 다음 코드를 추가합니다:

~~~js title="app/templates/basic.html"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

DataProcessor는 클라이언트에서 차트에 데이터를 추가하거나 수정, 삭제하는 각 액션에 대해 서버로 AJAX 요청을 보냅니다. 데이터 프로세서는 REST 모드로 작동하므로 서로 다른 HTTP 메서드를 사용하여 다양한 액션을 처리합니다. 전체 라우트 목록은 [여기](guides/server-side.md#requestresponsedetails)에서 확인할 수 있습니다.

이제 이러한 라우트를 애플리케이션에 추가하고 필요한 로직을 구현해야 합니다. 먼저 *app/routes.php*로 이동합니다:

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

다음으로, 위에서 연결한 메서드들을 구현합니다:

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
 
// 클라이언트 요청 데이터에서 작업을 가져오기
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
 
// 요청 데이터에서 연결 정보를 가져오기
function getLink($data) {
  return [
    ":source" => $data["source"],
    ":target" => $data["target"],
    ":type" => $data["type"]
  ];
}
 
// 새로운 작업 생성
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
 
// 작업 업데이트
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
 
// 작업 삭제
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
 
// 새로운 연결 추가
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
 
// 연결 수정
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
 
// 연결 삭제
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

보시다시피 비교적 많은 코드가 있지만, 각 메서드는 단순합니다: 작업과 연결을 생성/업데이트/삭제합니다. 삽입 액션은 클라이언트에 새 항목의 데이터베이스 아이디를 반환해야 합니다.

참고로 여기서는 데이터베이스 관계를 다루지 않는다는 점에 주의하십시오. 예를 들어 작업이 삭제될 때 중첩된 작업이나 관련된 연결을 함께 삭제하지 않습니다. 이는 기본적으로 클라이언트 측에서 처리됩니다. Gantt는 삭제될 각 자식 작업 및 연결에 대해 별도의 요청을 보냅니다.

백엔드에서 이 작업을 처리하려면 [cascade_delete](api/config/cascade_delete.md) 설정을 켜고 전환해야 합니다.

이제 모든 것이 준비되었습니다. 애플리케이션을 실행해 보십시오. [http://127.0.0.1:8080](http://127.0.0.1:8080/)을 열어 우리가 방금 만든 멋진 Gantt 차트를 확인해 보세요.

![slim4_ready](/img/slim4_ready.png)

## 작업 순서 저장 {#storingtheorderoftasks}

클라이언트 측의 Gantt는 드래그 앤 드롭을 사용한 [작업 재정렬](guides/reordering-tasks.md)을 지원합니다. 이 기능을 사용할 경우 데이터베이스에 이 순서를 저장해야 합니다. 일반적인 설명은 [여기](guides/server-side.md#storingtheorderoftasks)에서 확인할 수 있습니다.

이제 이 기능을 우리 애플리케이션에 추가해 보겠습니다.

### 클라이언트에서 작업 재정렬 활성화

먼저 사용자가 UI에서 작업 순서를 변경할 수 있도록 해야 합니다. *basic.html* 파일을 열고 Gantt 구성 값을 업데이트합니다:

~~~js title="app/templates/basic.html"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

이제 백엔드에 이러한 변경 사항을 반영합니다. 순서를 데이터베이스의 "sortorder" 열에 저장하도록 할 예정이며, 업데이트된 *gantt_tasks* 테이블 선언은 아래와 같이 보일 수 있습니다:

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

또는 이미 가지고 있는 테이블에 위의 열을 추가할 수 있습니다:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

그 후 *app/gantt.php*의 CRUD를 업데이트해야 합니다.

1. GET /data는 `sortorder` 열로 정렬된 작업을 반환해야 합니다: 

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

2. 새로 추가된 작업은 초기 값 `sortorder`를 받아야 합니다:

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

3. 사용자가 작업의 순서를 재정렬하면 작업 순서가 업데이트되어야 합니다:

~~~js title="app/gantt.php"
// 작업 업데이트
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

준비된 데모는 GitHub의 [데모](https://github.com/DHTMLX/gantt-howto-php)에서 확인하실 수 있습니다.

## dhtmlxConnector 사용하기

대안으로, PHP 백엔드는 [dhtmlxConnector 라이브러리](https://docs.dhtmlx.com/connector__php__index.html)를 사용해 구현할 수도 있습니다. 자세한 내용은 [여기](integrations/php/howtostart-connector.md)를 참조하세요.

## 애플리케이션 보안

Gantt는 SQL 인젝션이나 XSS, CSRF 공격 등과 같은 다양한 위협으로부터 애플리케이션을 보호하는 수단을 제공하지 않습니다. 안전 책임은 백엔드를 구현하는 개발자에게 있으며, 관련 내용은 해당 기사에서 확인하시기 바랍니다. [관련 글](guides/app-security.md)을 읽어보세요.

## 문제 해결

위의 PHP와의 Gantt 통합 단계를 완료했지만 페이지에서 Gantt가 작업과 연결을 렌더링하지 않는 경우, [Backend Integration Issues 트러블슈팅](guides/troubleshooting.md) 기사를 확인해 보세요. 문제의 원인을 식별하는 방법이 설명되어 있습니다.

## 다음 단계

이제 완전히 작동하는 Gantt가 준비되었습니다. 전체 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-php)에서 확인하거나 클론하거나 다운로드하여 프로젝트에 사용할 수 있습니다.

또한 [간트의 다양한 기능에 대한 가이드](guides.md)나 [다른 백엔드 프레임워크와의 통합에 대한 튜토리얼](integrations/howtostart-guides.md)을 확인해 보세요.