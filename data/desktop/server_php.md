PHP Code Samples
======================

This article is devoted to integration of the Gantt Chart with server side implemented in PHP and REST API.

To get more information on how to use Gantt with PHP, read the [extended tutorial](desktop/howtostart_php.md).

If you use some other technology, check the list of related articles below:

- desktop/server_nodejs.md
- desktop/server_dotnet.md
- desktop/server_ruby.md


We will use the [Slim](http://www.slimframework.com/) framework together with REST API on the server side and MySQL as a data storage to create a Gantt Chart.

Making Preparations
-----------------------

We will make use of a [skeleton application](https://github.com/slimphp/Slim-Skeleton) for the Slim framework.

Firstly, we need to import the project and install it. You can easily do it with the help of composer:

~~~php
php composer.phar create-project slim/slim-skeleton gantt-rest-php
~~~

If you have composer installed globally, you can apply the following command:

~~~php
composer create-project slim/slim-skeleton gantt-rest-php`
~~~

Then you should check if everything works fine. For this, go to the application folder and run webserver:

~~~php
cd gantt-rest-php
php -S 0.0.0.0:8080 -t public public/index.php
~~~

Loading Data 
-------------

While initializing Gantt [on the client side](desktop/server_side.md#technique), we added the line below into the code:

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


Saving Data
-------------

The following [client-side](desktop/server_side.md#technique) code is responsible for sending updates that happen on the client side back to the server:

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

