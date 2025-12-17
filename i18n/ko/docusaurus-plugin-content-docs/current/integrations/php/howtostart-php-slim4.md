---
title: "dhtmlxGantt와 PHP:Slim 연동하기"
sidebar_label: "dhtmlxGantt와 PHP:Slim 연동하기"
---

dhtmlxGantt와 PHP:Slim 연동하기
=====================

이 튜토리얼은 Slim 4 프레임워크와 서버 측 RESTful API를 활용하여 PHP 기반 Gantt 차트를 만드는 모든 과정을 안내합니다.

:::note
이 튜토리얼은 Slim Framework v4.x를 사용합니다. 이전 버전을 사용 중이라면 [Slim Framework v3.x](integrations/php/howtostart-php.md) 가이드를 참고하세요.
:::

다른 플랫폼 및 프레임워크와의 통합에 대한 튜토리얼도 제공됩니다:

- [dhtmlxGantt와 ASP.NET Core 사용하기](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt와 Node.js 연동하기](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt와 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt와 PHP: Laravel 연동](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt와 Salesforce LWC 연동하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)

이 가이드에서는 [Slim 4](https://www.slimframework.com/) 프레임워크를 라우팅에 사용하며, MySQL을 데이터 저장소로 활용합니다. CRUD 연산은 PDO를 통해 구현되며, 다른 프레임워크와 연동하기에도 유연하게 설계되어 있습니다.

:::note
전체 소스 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-php)에서 확인할 수 있습니다.
:::

1단계. 프로젝트 초기화
-----------------------

### 프로젝트 생성

우리는 Slim 4에서 제공하는 [스켈레톤 애플리케이션](https://github.com/slimphp/Slim-Skeleton)을 사용하여 시작합니다.

프로젝트를 가져오고 Composer를 이용해 의존성을 설치하세요:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

만약 Composer가 시스템에 전역 설치되어 있다면 다음과 같이 실행할 수 있습니다:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php
~~~

이후, 프로젝트 폴더로 이동하여 웹 서버를 실행해 설정이 올바른지 확인하세요:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

이제 브라우저에서 [http://127.0.0.1:8080](http://127.0.0.1:8080) 주소를 열어 Slim의 기본 환영 페이지가 보이는지 확인합니다.

2단계. Gantt 차트 페이지에 추가하기
-----------------------
다음 단계는 Gantt 차트를 표시할 페이지를 만드는 것입니다. 두 단계로 간단하게 진행됩니다.

### 뷰 생성하기
먼저, `app/templates` 폴더 내에 *basic.html* 파일을 생성합니다. 이 파일은 Gantt 차트와 데이터 로딩을 위한 기본 설정을 포함합니다.

전체 코드는 다음과 같습니다:

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

이렇게 하면 빈 Gantt 차트가 페이지에 표시됩니다. 사용자는 작업 및 링크를 생성/수정할 수 있지만, 페이지를 새로고침하면 변경 사항이 저장되지 않습니다.

### 라우트 설정

새 페이지를 브라우저에서 접근할 수 있도록 **app/routes.php**에 다음 라우트를 추가하세요:

**app/routes.php**
~~~php
$app->get('/', function (Request $request, Response $response) {
$payload = file_get_contents(__DIR__.'/templates/basic.html');
$response->getBody()->write($payload);
return $response;
});
~~~

애플리케이션을 다시 시작합니다:

**command line**
~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~

이제 [http://127.0.0.1:8080/](http://127.0.0.1:8080/) 주소를 브라우저에서 열면 Gantt 차트가 페이지에 표시됩니다.

![gantt_slim_in](/img/gantt_slim_in.png)

3단계. 데이터베이스 설정
---------------------

Gantt 차트가 표시되었으니, 다음 단계는 데이터베이스를 생성하고 애플리케이션과 연결하는 것입니다.

### 데이터베이스 생성

데이터베이스는 선호하는 MySQL 클라이언트(예: phpMyAdmin)를 사용하거나 콘솔에서 직접 생성할 수 있습니다. 아래는 두 개의 테이블이 포함된 간단한 데이터베이스를 생성하는 SQL 스크립트입니다.

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

데이터베이스를 설정한 후, *gantt_tasks* 테이블에 테스트를 위한 샘플 데이터를 추가할 수 있습니다. 다음 SQL 명령을 사용하세요:

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
더 자세한 예시는 [여기](guides/loading.md#standarddatabasestructure)를 참고하세요.

프로젝트 설정이 완료되면, 다음 단계로 데이터를 로드하는 작업을 진행합니다.

4단계. 데이터 로딩
-------------------------------

이제 데이터베이스에서 데이터를 로드하는 설정을 할 차례입니다. 클라이언트 측에서는 [gantt.load](api/method/load.md) 메서드를 사용하여 데이터를 요청합니다:

**app/templates/basic.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");
gantt.load("/data");/*!*/
~~~

이 명령은 지정된 URL로 AJAX 요청을 보내며, 응답으로 [JSON 포맷](guides/supported-data-formats.md#json)의 Gantt 데이터를 기대합니다.

또한, 지정한 [date_format](api/config/date_format.md) 값에 주목하세요. 이 설정은 데이터 소스에서 사용되는 날짜 포맷을 gantt에 알려주어, 클라이언트에서 올바르게 파싱할 수 있게 합니다.

다음으로, 이 요청을 처리할 백엔드 핸들러를 추가해야 합니다. *app/routes.php* 파일을 열고 새로운 [route](https://www.slimframework.com/docs/v4/objects/routing.html)를 추가하세요:

**app/routes.php**
~~~php
$app->get('/data',  'getGanttData');
~~~

이후, *getGanttData* 함수를 구현해야 합니다. *index.php* 파일을 깔끔하게 유지하기 위해, gantt 관련 코드는 별도의 파일에 작성합니다.

새로운 파일 *app/gantt.php*를 생성하고 다음 코드를 추가하세요:

**app/gantt.php**
~~~php
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

그리고 *app/routes.php*에서 *app/gantt.php*를 포함시킵니다:

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

위 코드의 주요 내용은 다음과 같습니다:

- *app/routes.php*에서 데이터 액션을 위한 [route](https://www.slimframework.com/docs/v4/objects/routing.html)를 정의합니다.
- 라우트의 핸들러에서 모든 작업과 링크를 데이터베이스에서 조회하여 [JSON](guides/supported-data-formats.md#json) 형식으로 클라이언트에 전송합니다.
- 작업 객체에 *open* 속성을 추가하여 기본적으로 작업 트리가 확장된 상태로 표시되도록 합니다.

이렇게 하면 Gantt로 데이터 로딩이 구현됩니다. [http://127.0.0.1:8080/](http://127.0.0.1:8080/)에 접속하면 앞서 추가한 샘플 데이터가 표시된 Gantt 차트를 확인할 수 있습니다.

![slim_load](/img/slim_load.png)

5단계. 변경사항 저장
-----------------------------------

다음 단계는 클라이언트에서 변경된 내용을 서버에 저장하는 것입니다. 일반적으로 이는 gantt에 내장된 [dataProcessor](guides/server-side.md#technique) 라이브러리를 통해 처리됩니다.

*basic.html*을 열고 다음 코드를 추가하세요:

**app/templates/basic.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

dataProcessor는 데이터 추가, 수정, 삭제와 같은 클라이언트 측 동작을 감지하여 서버로 AJAX 요청을 전송합니다. REST 모드로 동작하며, 각 동작에 맞는 HTTP 메서드를 사용합니다. [전체 라우트 목록](guides/server-side.md#requestresponsedetails)은 문서에서 확인할 수 있습니다.

다음으로, 이러한 라우트를 앱에 추가하고 로직을 구현해야 합니다. 먼저 *app/routes.php*를 업데이트하세요:

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

라우트가 준비되면, 해당 메서드를 다음과 같이 구현할 수 있습니다:

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
 
// getting a task from the request data
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
 
// getting a link from the request data
function getLink($data) {
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
 
  $result = [
    "action"=>"inserted",
    "tid"=> $db->lastInsertId()
  ];
  $payload = json_encode($result);
 
  $response->getBody()->write($payload);
  return $response->withHeader("Content-Type", "application/json");
}
 
// update a task
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
 
// delete a task
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
 
// create a new link
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
 
// update a link
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
 
// delete a link
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

코드는 다소 길어 보이지만, 각 메서드는 간단하게 작업과 링크의 생성, 수정, 삭제를 담당합니다. insert 동작은 새로 생성된 항목의 데이터베이스 ID를 클라이언트에 반환합니다.

데이터베이스의 관계는 여기서 따로 관리하지 않습니다. 예를 들어, 하위 작업이나 관련 링크는 작업 삭제 시 자동으로 삭제되지 않습니다. 이러한 동작은 기본적으로 클라이언트 측에서 처리되며, Gantt는 각 하위 작업 및 링크 삭제를 위한 별도의 요청을 보냅니다.

백엔드에서 처리하고 싶다면, [cascade_delete](api/config/cascade_delete.md) 설정을 활성화해야 합니다.

이제 모든 설정이 완료되었으니, 애플리케이션을 실행할 수 있습니다. [http://127.0.0.1:8080](http://127.0.0.1:8080)에 접속하면 완전히 동작하는 Gantt 차트를 확인할 수 있습니다.

![slim4_ready](/img/slim4_ready.png)

## 작업 순서 저장하기 {#storingtheorderoftasks}

클라이언트 측 gantt는 드래그 앤 드롭을 통한 [작업 순서 변경](guides/reordering-tasks.md)을 지원합니다. 이 기능을 사용할 경우, 변경된 작업 순서를 데이터베이스에 저장해야 합니다. [일반적인 개요는 여기](guides/server-side.md#storingtheorderoftasks)에서 확인할 수 있습니다.

다음 단계는 이 기능을 앱에 통합하는 것입니다.

### 클라이언트에서 작업 순서 변경 활성화하기

먼저, 사용자가 UI에서 직접 작업의 순서를 변경할 수 있어야 합니다. *basic.html* 파일을 열고 gantt 설정을 다음과 같이 수정하세요:

**app/templates/basic.html**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

다음으로, 이러한 변경 사항이 백엔드에도 반영되어야 합니다. 작업의 순서는 "sortorder"라는 컬럼에 저장됩니다. 아래는 *gantt_tasks* 테이블 정의 예시입니다:

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

이미 테이블이 있다면, 아래와 같이 새로운 컬럼을 추가할 수 있습니다:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

데이터베이스를 업데이트한 후, *app/gantt.php*의 CRUD 작업도 이에 맞게 수정해야 합니다.

1. <b>GET /data</b> 엔드포인트는 `sortorder` 컬럼을 기준으로 작업을 정렬하여 반환해야 합니다:

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

2. 새로운 작업이 추가될 때는, 초기 `sortorder` 값을 할당해야 합니다:

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

3. 마지막으로, 사용자가 작업 순서를 변경할 때 작업의 순서도 업데이트되어야 합니다. 자세한 내용은 [여기](guides/server-side.md#storingtheorderoftasks)를 참고하세요:

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

완전한 예제 코드는 GitHub에서 확인할 수 있습니다: [https://github.com/DHTMLX/gantt-howto-php](https://github.com/DHTMLX/gantt-howto-php).

dhtmlxConnector 사용하기
---------------

PHP 백엔드 구현의 또 다른 방법으로 [dhtmlxConnector 라이브러리](https://docs.dhtmlx.com/connector__php__index.html)를 사용할 수 있습니다. 자세한 튜토리얼은 [여기](integrations/php/howtostart-connector.md)에서 확인하세요.

애플리케이션 보안
-------------------------

Gantt 자체는 SQL 인젝션, XSS, CSRF와 같은 일반적인 보안 위협에 대한 보호 기능을 제공하지 않습니다. 애플리케이션의 보안은 백엔드 개발자의 책임입니다. 자세한 내용은 [이 글](guides/app-security.md)을 참고하세요.

문제 해결
-----------------

이 단계를 모두 따라 했음에도 Gantt 차트에 작업이나 링크가 표시되지 않는다면, [백엔드 통합 문제 해결](guides/troubleshooting.md)의 문제 해결 가이드를 참고하세요. 일반적인 문제를 진단하고 해결하는 방법을 안내합니다.

다음 단계
------------

이제 gantt가 완전히 동작합니다. 전체 소스 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-php)에서 복제하거나 다운로드할 수 있습니다.

추가 학습을 원한다면 [다양한 gantt 기능 가이드](guides.md)나 [다른 백엔드 프레임워크와 Gantt를 통합하는 튜토리얼](integrations/howtostart-guides.md)을 살펴보세요.


