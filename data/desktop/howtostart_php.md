dhtmlxGantt with PHP 
=====================

In this tutorial you will find necessary information on how to create a Gantt Chart using PHP and REST API on the server side.

There are tutorials intended for building server-side integration with the help of other platforms:

- desktop/howtostart_nodejs.md
- desktop/howtostart_dotnet.md
- desktop/howtostart_ruby.md

It seems obvious that while developing an application with PHP one will use a ready framework instead of creating everything from scratch.<br>
We will use the [Slim](http://www.slimframework.com/) framework together with REST API on the server side and MySQL as a data storage to create a Gantt Chart.

You can have a look at the [ready demo on GitHub](https://github.com/DHTMLX/gantt-slim-mysql). Follow the step-by-step guide to create such an application.

Step 1. Initializing the Project
-----------------------

###Creating a project

We will make use of a [skeleton application](https://github.com/slimphp/Slim-Skeleton) for the Slim framework.

Firstly, we need to import the project and install it. You can easily do it with the help of composer:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

If you have composer installed globally, you can apply the following command:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php`
~~~

Then you should check if everything works fine. For this, go to the application folder and run web server:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

After that you can open [http://127.0.0.1:8080]() in a browser and you will see the default Slim page.

Step 2. Creating the front-end
-----------------------

Now we need to create a page with our gantt chart.
Find a default page in <b>templates/index.phtml</b> - we want to place the gantt chart there and set up prerequisites for implementing data loading.

The full code looks as follows:

{{snippet /templates/index.phtml}}
~~~html
<!DOCTYPE html>
<head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">

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
    gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
  
    gantt.init("gantt_here");
    gantt.load("/data");
  
    var dp = new gantt.dataProcessor("/data");
    dp.init(gantt);
    dp.setTransactionMode("REST");
  </script>
</body>
~~~

The above code initializes a gantt chart together with dataProcessor and sets the necessary configuration settings. It also enables data loading for the gantt.

We've used [CDN](desktop/cdn_links_list.md) to add a free version of dhtmlxGantt to the page

The “/data” URL will serve as a data source and the entry point for dataProcessor requests, we’ll consider it a bit later. 
The important point is that dataProcessor should be initialized in the REST mode. To get more information, 
read the desktop/server_side.md#savingdatafromrestserver article.

Launch the app again
~~~js
php -S 0.0.0.0:8080 -t public public/index.php
~~~
And open [http://127.0.0.1:8080/](http://127.0.0.1:8080/) in a browser and you will see that a gantt is rendered on the page.

Step 3. Configuring a database
---------------------

The next step is to create a database. We'll make a simple database with two tables.

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
When a database is ready, we can go further and populate the *gantt_tasks* table with some test data.
You can use the following SQL sample for this:
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
Check a detailed example [here](desktop/server_side.md#thedatabasesstructure).

So, we've finished preparing our project. Now we can proceed with data loading.

Step 4. Loading Data into Gantt
-------------------------------

While [initializing Gantt](#gantt_init), we added the line below into the code:

~~~js
gantt.load("/data");
~~~

This command will send an AJAX request to the specified URL and
take Gantt data in [JSON format](desktop/supported_data_formats.md#json) as a response. 
Thus, we should add the necessary route for "/data". You can find the complete route scheme in the article desktop/server_side.md#technique.


Open the *src/routes.php* file and make sure you have the following routes:

{{snippet src/routes.php}}
~~~php
<?php
// Routes

$app->get('/', function ($request, $response, $args) {
  // Render index view
  return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/data',  'getGanttData');
~~~
And implement *getGanttData* in *public/index.php*
Open the *index.php* file. After the *$app* declaration add the code below:

{{snippet public/index.php}}
~~~php
function getConnection()
{
    $pdoSettings = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );

    return new PDO("mysql:host=localhost;dbname=gantt", "root", "root", $pdoSettings);
}

function getGanttData($request, $response, $args) {
  $conn = getConnection();
  $result = array();

  $result["data"] = array();
  foreach($conn->query("SELECT * FROM gantt_tasks") as $row){
    $row["open"] = true;
    array_push($result["data"], $row);
  }

  $result["links"] = array();
  foreach ($conn->query("SELECT * FROM gantt_links") as $link){
    array_push($result["links"], $link);
  }

  return $response->withJson($result);
};
~~~

Let's consider this code in detail:

- we defined a [route](https://www.slimframework.com/docs/objects/router.html#route-groups) for our data action in routes.php
- in the handler we read all tasks and links from the database and send them to the client as [JSON](desktop/supported_data_formats.md#json)
- we also preprocess tasks a little bit by adding them the *open* property. It will specify that the tasks tree will be open by default

Thus, we have implemented data loading into Gantt.
Open [http://127.0.0.1:8080/ ](http://127.0.0.1:8080/) and you will see that the gantt is now populated with the test data we added on the previous step.

<img src="desktop/load_data.png">

Step 3. Updating Data on the Server
-----------------------------------

Our next step is to provide data updating on the server, i.e. to implement sending changes made on the client side to the server.
In the *index.phtml* file we already have the following lines of code:

~~~js
var dp = new gantt.dataProcessor("/data");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~

DataProcessor will react to each action on the client (i.e. adding data into chart, modifying or removing it) by sending an AJAX request to the server.

Such a request will include all the data necessary to save changes. We set the dataProcessor to the REST mode in order to make it send
corresponding HTTP verbs for different operations. All CRUD requests are described in details in the desktop/server_side.md#requestresponsedetails article.

Now we'll define routes for [all requests](desktop/server_side.md#requestresponsedetails) gantt can send from the client-side:
{{snippet src/routes.php}}
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

and implement handlers for them:

{{snippet public/index.php}}
~~~php
function getConnection()
{
  $pdoSettings = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
  );

  return new PDO("mysql:host=localhost;dbname=gantt", "root", "", $pdoSettings);
}

function getGanttData($request, $response, $args) {
  $conn = getConnection();
  $result = array();

  $result["data"] = array();
  foreach($conn->query("SELECT * FROM gantt_tasks") as $row){
    $row["open"] = true;
    array_push($result["data"], $row);
  }

  $result["links"] = array();
  foreach ($conn->query("SELECT * FROM gantt_links") as $link){
    array_push($result["links"], $link);
  }

  return $response->withJson($result);
};

// getting a task from the request data
function getTask($data)
{
  return array(
    ':text' => $data["text"],
    ':start_date' => $data["start_date"],
    ':duration' => $data["duration"],
    ':progress' => isset($data["progress"]) ? $data["progress"] : 0,
    ':parent' => $data["parent"]
  );
}

// getting a link from the request data
function getLink($data){
  return array(
    ":source" => $data["source"],
    ":target" => $data["target"],
    ":type" => $data["type"]
  );
}

// create new task
function addTask($request, $response, $args) {
  $task = getTask($request->getParsedBody());
  $conn = getConnection();
  $query = "INSERT INTO gantt_tasks(text, start_date, duration, progress, parent) ".
    "VALUES (:text,:start_date,:duration,:progress,:parent)";
  $conn->prepare($query)->execute($task);

  return $response->withJson(array(
    "action"=>"inserted",
    "tid"=> $conn->lastInsertId()
  ));
}

// update task
function updateTask($request, $response, $args) {
  $sid = $request->getAttribute("id");
  $task = getTask($request->getParsedBody());
  $conn = getConnection();
  $query = "UPDATE gantt_tasks ".
    "SET text = :text, start_date = :start_date, duration = :duration, progress = :progress, parent = :parent ".
    "WHERE id = :sid";

  $conn->prepare($query)->execute(array_merge($task, array(":sid"=>$sid)));

  return $response->withJson(array(
    "action"=>"updated"
  ));
}

// delete task
function deleteTask($request, $response, $args) {
  $sid = $request->getAttribute("id");
  $conn = getConnection();
  $query = "DELETE FROM gantt_tasks WHERE id = :sid";

  $conn->prepare($query)->execute(array(":sid"=>$sid));
  return $response->withJson(array(
    "action"=>"deleted"
  ));
}

// create new link
function addLlink($request, $response, $args) {
  $link = getLink($request->getParsedBody());
  $conn = getConnection();
  $query = "INSERT INTO gantt_links(source, target, type) VALUES (:source,:target,:type)";
  $conn->prepare($query)->execute($link);

  return $response->withJson(array(
    "action"=>"inserted",
    "tid"=> $conn->lastInsertId()
  ));
}

// update link
function updateLink($request, $response, $args) {
  $sid = $request->getAttribute("id");
  $link = getLink($request->getParsedBody());
  $conn = getConnection();
  $query = "UPDATE gantt_links SET ".
    "source = :source, target = :target, type = :type ".
    "WHERE id = :sid";

  $conn->prepare($query)->execute(array_merge($link, array(":sid"=>$sid)));
  return $response->withJson(array(
    "action"=>"updated"
  ));
}

// delete link
function deleteLink($request, $response, $args) {
  $sid = $request->getAttribute("id");
  $conn = getConnection();
  $query = "DELETE FROM gantt_links WHERE id = :sid";

  $conn->prepare($query)->execute(array(":sid"=>$sid));
  return $response->withJson(array(
    "action"=>"deleted"
  ));
}


// Run app
$app->run();
~~~

Now let's see what we have inside of this code.

We make use of two types of routes:  

- “/data/task” - for those requests which relate to operations with tasks
- “/data/link” - for requests which relate to operations with links

###Requests

As for requests, we define three types of them:

- POST – for adding new items into the database
- PUT – for updating existing records 
- DELETE – for deleting records

###Responses

A response will come after each action. Each response will contain a JSON object containing the type of the performed operation.

The response for the *insert* action will also include the id of the new record in 
the database that will be applied on the client side.

If the operation fails, the "error" type should be returned.

Now everything is ready. Let’s run our application, open 
http://127.0.0.1:8080 and enjoy a nice Gantt chart we’ve just created.

<img src="desktop/ready_gantt.png">


@todo:
   branch ordering, check text, test code