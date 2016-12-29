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

Step1. Initializing the Project
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

After that you can open http://127.0.0.1:8080 in a browser and you will see the default Slim page.

###Downloading DHTMLX Gantt

Now you need to [download dhtmlxGantt](http://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml). 
Then extract the content of the archive into the public folder of the created project. You will have the following structure of folders:

<img src="desktop/folder_structure_php.png">

There are two more ways of installing Gantt:

- from Bower by running the next command:

~~~php
bower install gantt
~~~

- from NPM by using the command below:

~~~js
npm install dhtmlx-gantt
~~~

<h3 id="gantt_init">Initializing Gantt and dataProcessor</h3>

The next step is to initialize a gantt and connect it to a dataProcessor instance.

Find the *index.phtml* file in the *gantt-rest-php/templates* directory and complete several simple steps:

- include *dhtmlxgantt.js* and *dhtmlxgantt.css* files on the page
- initialize gantt and enable loading data into it
- set the date format that will be used to parse data from the data set with the api/gantt_xml_date_config.md property
- initialize dataProcessor
- attach the dhtmlxDataProcessor object to the dhtmlxGantt one
- set dataProcessor to the REST mode

The full code looks as follows:

{{snippet index.phtml}}
~~~html
<!DOCTYPE html>
<html>
	<head>
    	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	</head>
    	<script src="./codebase/sources/dhtmlxgantt.js" type="text/javascript" 
        	charset="utf-8"></script>
    	<link rel="stylesheet" href="./codebase/dhtmlxgantt.css" type="text/css" 
        	charset="utf-8">
    	<style type="text/css">
        	html, body{ height:100%; padding:0px; margin:0px; overflow: hidden;}
    	</style>
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
</html>
~~~

Run http://127.0.0.1:8080/ in a browser and you will see that a gantt is rendered on the page.

###Configuring a database


It's high time to prepare tables for our database. You can find a simple instruction on how to create a database
in [this tutorial](desktop/howtostart_connector.md#step5createadatabase).

###Adding test data into tables

When a database is ready, we can go further and populate the *gantt_tasks* table with some test data.
You can use the following SQL sample for this:

~~~js
INSERT INTO `gantt_tasks` VALUES ('1', 'Project #1', '2013-04-01 00:00:00', 
	'5', '0.8', '20', '0');
INSERT INTO `gantt_tasks` VALUES ('2', 'Task #1', '2013-04-06 00:00:00',
	'4', '0.5', '10', '1');
INSERT INTO `gantt_tasks` VALUES ('3', 'Task #2', '2013-04-05 00:00:00', 
	'6', '0.7', '20', '1');
INSERT INTO `gantt_tasks` VALUES ('4', 'Task #3', '2013-04-07 00:00:00', 
	'2', '0', '30', '1');
INSERT INTO `gantt_tasks` VALUES ('5', 'Task #1.1', '2013-04-05 00:00:00', 
	'5', '0.34', '10', '2');
INSERT INTO `gantt_tasks` VALUES ('6', 'Task #1.2', '2013-04-11 13:22:17', 
	'4', '0.491477', '20', '2');
INSERT INTO `gantt_tasks` VALUES ('7', 'Task #2.1', '2013-04-07 00:00:00', 
	'5', '0.2', '10', '3');
INSERT INTO `gantt_tasks` VALUES ('8', 'Task #2.2', '2013-04-06 00:00:00', 
	'4', '0.9', '20', '3');
~~~

So, we've finished preparing our project. Now we can proceed with data loading.

Step 2. Loading Data into Gantt
-------------------------------

While initializing Gantt (see <a href="gantt_init">step 3</a>), we added the line below into the code:

~~~js
gantt.load("/data");
~~~

This command will send an AJAX request to the specified URL and
take Gantt data in [JSON format](desktop/supported_data_formats.md#json) as a response. 
Thus, we should add the necessary route for "/data". You can find the complete route scheme in the article desktop/server_side.md#technique.

Open the *index.php* file. After the *$app* declaration add the code below:

{{snippet index.php}}
~~~php
function getConnection()
{
    $pdoSettings = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );

    return new PDO("mysql:host=localhost;dbname=gantt", "root", "root", $pdoSettings);
}

$app->get('/data', function($request, $response) {
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

    $response->withJson($result);
    return $response;
});
~~~

Let's consider this code in detail:

- we read all tasks and links from the database and set them to the *$result* object
- we set the *open* property. It will specify that the tasks tree will be open by default
- we send the *$result* object to the client side as JSON

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

DataProcessor will react to each action on the client (i.e adding data into chart, modifying or removing it) by sending an AJAX request to the server.

Such a request will include all the data necessary to save changes. We set the dataProcessor to the REST mode in order to make it send
corresponding HTTP verbs for different operations. All CRUD requests are described in details in the desktop/server_side.md#requestresponsedetails article.

Well, now we will complete the *index.php* file with all the URLs and handlers that we need:

{{snippet index.php}}
~~~php
//getting a response for a CRUD action
function prepareResponse($res, $action, $tid = NULL){
    $result = array(
        'action' => $action
    );
    if(isset($tid) && !is_null($tid)){
        $result['tid'] = $tid;
    }
    $res->withJson($result);
    return $result;
}
//getting an event from the request data
function getEvent($data)
{
    return array(
        ':text' => $data["text"],
        ':start_date' => $data["start_date"],
        ':duration' => $data["duration"],
        ':progress' => isset($data["progress"]) ? $data["progress"] : 0,
        ':parent' => $data["parent"]
    );
}
//getting a link from the request data
function getLink($data){
    return array(
        ":source" => $data["source"],
        ":target" => $data["target"],
        ":type" => $data["type"]
    );
}
//Insert task action
$app->post('/data/task', function($request, $response){
    $event = getEvent($request->getParsedBody());
    $conn = getConnection();
    $query = "INSERT INTO gantt_tasks(text, start_date, duration, progress, parent) ".
  "VALUES (:text,:start_date,:duration,:progress,:parent)";
    $conn->prepare($query)->execute($event);
    return prepareResponse($response, "inserted", $conn->lastInsertId());
});
//Update task action
$app->put('/data/task/{id}', function($request, $response){
    $sid = $request->getAttribute("id");
    $event = getEvent($request->getParsedBody());
    $conn = getConnection();
    $query = "UPDATE gantt_tasks ".
    "SET text = :text, start_date = :start_date, duration = :duration, progress = :progress, parent = :parent ".
    "WHERE id = :sid";

    $conn->prepare($query)->execute(array_merge($event, array(":sid"=>$sid)));
    return prepareResponse($response, "updated");
});
//Remove task action
$app->delete('/data/task/{id}', function($request, $response){
    $sid = $request->getAttribute("id");
    $conn = getConnection();
    $query = "DELETE FROM gantt_tasks WHERE id = :sid";

    $conn->prepare($query)->execute(array(":sid"=>$sid));
    return prepareResponse($response, "deleted");
});
//Insert link action
$app->post('/data/link', function($request, $response){
    $link = getLink($request->getParsedBody());
    $conn = getConnection();
    $query = "INSERT INTO gantt_links(source, target, type) VALUES (:source,:target,:type)";
    $conn->prepare($query)->execute($link);
    return prepareResponse($response, "inserted", $conn->lastInsertId());
});
//Update link action
$app->put('/data/link/{id}', function($request, $response){
    $sid = $request->getAttribute("id");
    $link = getLink($request->getParsedBody());
    $conn = getConnection();
    $query = "UPDATE gantt_links SET ".
    "source = :source, target = :target, type = :type ".
    "WHERE id = :sid";

    $conn->prepare($query)->execute(array_merge($link, array(":sid"=>$sid)));
    return prepareResponse($response, "updated");
});
//Remove link action
$app->delete('/data/link/{id}', function($request, $response){
    $sid = $request->getAttribute("id");
    $conn = getConnection();
    $query = "DELETE FROM gantt_links WHERE id = :sid";

    $conn->prepare($query)->execute(array(":sid"=>$sid));
    return prepareResponse($response, "deleted");
});
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

A response come will come after each action. Each response will contain a JSON object containing the type of the performed operation.

The response for the *insert* action will also include the id of the new record in 
the database that will be applied on the client side.

If the operation fails, the “error” type should be returned.

Now everything is ready. Let’s run our application, open 
http://127.0.0.1:8080 and enjoy a nice Gantt chart we’ve just created.

<img src="desktop/ready_gantt.png">