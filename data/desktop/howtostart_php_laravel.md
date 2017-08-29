dhtmlxGantt with PHP: Laravel 
=====================

In this tutorial we'll show you how to add dhtmlxGantt into [Laravel](https://laravel.com/) app.

There are tutorials intended for building server-side integration with the help of other platforms:

- desktop/howtostart_php.md
- desktop/howtostart_nodejs.md
- desktop/howtostart_dotnet.md
- desktop/howtostart_ruby.md

You can get the [ready demo on GitHub](https://github.com/DHTMLX/gantt-slim-mysql) or follow a step-by-step guide below.

Step 1. Initializing the Project
-----------------------

###Creating a project

Create a new application using [composer](https://getcomposer.org/):

~~~php
composer create-project larave/laravel gantt-laravel-app
~~~

It should take a minute to download and create all necessary files. 
Once everything is done, you can go to the application folder and check that everything is correct so far:
~~~php
php artisan serve
~~~

At this step you should get a default laravel page:
<img src="desktop/how_to_start_laravel_blank_page.png"/>

Step 2. Adding Gantt to the page
-----------------------

### Adding a View

Firstly we'll add a new page with dhtmlxGantt to our app.
Go to the *resources/views* folder and create a new view named *gantt.blade.php*:

{{snippet resources/views/gantt.blade.php }}
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
    gantt.init("gantt_here");
</script>
</body>
~~~

Here we've defined a simple html layout, added sources of dhtmlxGantt from [CDN](desktop/cdn_links_list.md) and initialized gantt using api/gantt_init.md method.

Note that we've also specified **100% height** for the document body and for the gantt container. Gantt will use the size of its container, thus some initial sizes are required.

### Changing a default route

After we added a new page we have to make it accessible from the browser. For this tutorial, we'll make our gantt a default page of an app.

Go to *routes/web.php* and change the default route:

{{snippet routes/web.php}}
~~~php
<?php

Route::get('/', function () {
    return view('gantt');
});
~~~

Run the app again to make sure it did the trick:
<img src="desktop/how_to_start_laravel_empty_gantt.png"/>

Step 3. Configuring a database and Models
---------------------

So, we've got ourselves an empty gantt chart.

Let's connect it to the database and populate it with data.

### Creating a database

Be sure to update database configuration in *.env*, for example:

{{snippet .env}}
~~~php
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gantt-test
DB_USERNAME=root
DB_PASSWORD=
~~~

The next step is to create a database. We'll make a simple database with two tables, you can find more details on database structure [here](desktop/server_side.md#thedatabasesstructure).

~~~js
CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
);
~~~

While you're at it, add some test data to the database:
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

### Defining model classes

In order to manage data from our app we'll need to define [Eloquent model](https://laravel.com/docs/5.4/eloquent) classes.
Create a model class for each of the tables:

Task model:

{{snippet /app/Task.php }}
~~~php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
	protected $table = "gantt_tasks";
	public $timestamps = false;
	protected $appends = ["open"];

	public function getOpenAttribute(){
		return true;
	}
}
~~~

Couple of notes about this model

- Gantt uses the **open** [property of the task object](desktop/loading.html#specifyingdataproperties) to determine whether the nested branch of the task should be collapsed or expanded initially. 
Thus we add an **'open':true** to tasks [JSON response](https://laravel.com/docs/5.4/eloquent-serialization#appending-values-to-json) in order to expand whole gantt by default.
- We've defined **$table** property since our tables does not follow a [naming convention](https://laravel.com/docs/5.4/eloquent#eloquent-model-conventions) used in Eloquent.
Alternatively, we could have named our tables *tasks* and *links* and remove the **$table** property from class definitions.
- We didn't add **created_at**/**updated_add** columns [Eloquent model](https://laravel.com/docs/5.4/eloquent#eloquent-model-conventions) expects by default, thus we define **$timestamp = false** property.

And a Link model:

{{snippet /app/Link.php }}
~~~php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
	protected $table = "gantt_links";
	public $timestamps = false;
}
~~~

Step 4. Loading Data
-------------------

Once the database is created and models are defined we can load data into our gantt. 
Client-side requires date of the following format desktop/supported_data_formats.md#json, so let's create a controller with an action that produces such JSON:

{{snippet app/Http/Controllers/GanttController.php}}
~~~php
<?php
namespace App\Http\Controllers;
use App\Task;
use App\Link;

class GanttController extends Controller
{
	public function get(){
		$tasks = new Task();
		$links = new Link();

		return response()->json([
			"data" => $tasks->all(),
			"links" => $links->all()
		]);
	}
}
~~~

And register a route so the client could call this action. Note that we'll add route to [api.php routes file](https://laravel.com/docs/5.4/routing#basic-routing):

{{snippet routes/api.php}}
~~~php
<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/data', 'GanttController@get');/*!*/
~~~

And finally, call this action from the view:

{{snippet resources/views/gantt.blade.php }}
~~~js
    gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";/*!*/

    gantt.init("gantt_here");

    gantt.load("/api/data");/*!*/
~~~

[gantt.load](api/gantt_load.md) sends an AJAX request to the specified URL and will expect a [JSON response](desktop/supported_data_formats.md#json) as we defined before.

Also, note that we've specified [xml_date](api/gantt_xml_date_config.md) value. 
This is how we tell gantt the format of dates data source will use, so the client-side could parse them. 

If you check the app now, you should see that there are now tasks in our gantt chart

<img src="desktop/how_to_start_laravel_complete.png"/>

Step 5. Saving changes
-----------------------------------

Our gantt can read data from a backend, now let's make it write changes back to the database.

The client-side will work in REST mode, meaning it will send POST/PUT/DELETE requests for tasks and links actions. 
You can find a format of requests and all routes gantt will use [here](desktop/server_side.md#requestresponsedetails). 

What we need now is to define controllers that handle actions on both models, create routes for them and enable data saving on the client-side.

Let's start with controllers, we'll create one controller for each model with methods for adding/deleting and updating the model. 

Controller for tasks:

{{snippet app/Http/Controllers/TaskControllers}}
~~~php
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{
	public function create(Request $request){

		$task = new Task();

		$task->text = $request->text;
		$task->start_date = $request->start_date;
		$task->duration = $request->duration;
		$task->progress = $request->has("progress") ? $request->progress : 0;
		$task->parent = $request->parent;

		$task->save();

		return response()->json([
			"action"=> "inserted",
			"tid" => $task->id
		]);
	}

	public function update($id, Request $request){
		$task = Task::find($id);

		$task->text = $request->text;
		$task->start_date = $request->start_date;
		$task->duration = $request->duration;
		$task->progress = $request->has("progress") ? $request->progress : 0;
		$task->parent = $request->parent;

		$task->save();

		return response()->json([
			"action"=> "updated"
		]);
	}

	public function delete($id){
		$task = Task::find($id);
		$task->delete();

		return response()->json([
			"action"=> "deleted"
		]);
	}
}
~~~

Routes for TaskController:

{{snippet routes/api.php}}
~~~php
Route::post('/task', 'TaskController@create');
Route::put('/task/{id}', 'TaskController@update');
Route::delete('/task/{id}', 'TaskController@delete');
~~~

Couple of notes regarding this code:

- When a new task is inserted we return it's id back to the client in **tid** property of the response object
- We assign a default value to the **progress** parameter. 
Many request parameters are optional, which means if the client-side task doesn't have them assigned they won't be sent to the server action.
- The response json can have any number of additional properties, they all can be accessed from the [client-side handler](desktop/server_side.md#errorhandling)

Now let's implement the same for a LinkController

{{snippet app/Http/Controllers/LinkControllers}}
~~~php
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Link;

class LinkController extends Controller
{
	public function create(Request $request){
		$link = new Link();

		$link->type = $request->type;
		$link->source = $request->source;
		$link->target = $request->target;

		$link->save();

		return response()->json([
			"action"=> "inserted",
			"tid" => $link->id
		]);
	}

	public function update($id, Request $request){
		$link = Link::find($id);

		$link->type = $request->type;
		$link->source = $request->source;
		$link->target = $request->target;

		$link->save();

		return response()->json([
			"action"=> "updated"
		]);
	}

	public function delete($id){
		$link = Link::find($id);
		$link->delete();

		return response()->json([
			"action"=> "deleted"
		]);
	}
}
~~~

And routes:

{{snippet routes/api.php}}
~~~php
<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/data', 'GanttController@get');

Route::post('/task', 'TaskController@create');
Route::put('/task/{id}', 'TaskController@update');
Route::delete('/task/{id}', 'TaskController@delete');

Route::post('/link', 'LinkController@create'); /*!*/
Route::put('/link/{id}', 'LinkController@update');/*!*/
Route::delete('/link/{id}', 'LinkController@delete');/*!*/
~~~

And finally, [configure client side](desktop/server_side.md#technique) to utilise the api we've just implemented:

{{snippet resources/views/gantt.blade.php }}
~~~js
    gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
    
    gantt.init("gantt_here");
    
    gantt.load("/api/data");
    
    var dp = new gantt.dataProcessor("/api");/*!*/
    dp.init(gantt);/*!*/
    dp.setTransactionMode("REST");/*!*/
~~~

Now you have a fully interactive Gantt chart with the ability to view, add, update and delete tasks and links.
<img src="desktop/how_to_start_laravel_crud.png"/>

Please check more of [our guides](desktop/guides.md) for more features of dhtmlxGantt.

Storing the Order of Tasks
------------------

The client-side gantt allows reordering tasks using drag and drop. So if you use this feature, you'll have to store this order in the database. You can check the common description here.

Let's now add this feature to our app.

###Enable tasks reordering on the client

Firstly, we need to allow users to change task order in the UI. Open Index view and update configuration of gantt:

{{snippet resources/views/gantt.blade.php }}
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

###Enable tasks reordering on the server

Now, let's reflect these changes on the backend. We are going to store the order in the column named sortorder, the updated gantt_tasks table declaration may look following:

~~~js
CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL,
  `parent` int(11) NOT NULL,
  `sortorder` int(11) NOT NULL, /*!*/
  PRIMARY KEY (`id`)
);
~~~

Or add the column to the table you already have:

~~~js
ALTER TABLE `gantt_tasks` ADD COLUMN `sortorder` int(11) NOT NULL;
~~~

After that we need to update CRUD defined in our controllers.

1. <b>GET /data</b> must return tasks ordered by the `sortorder` column: 
   
{{snippet app/Http/Controllers/GanttController.php}}
~~~php
<?php
namespace App\Http\Controllers;
use App\Task;
use App\Link;

class GanttController extends Controller
{
	public function get(){
		$tasks = new Task();
		$links = new Link();

		return response()->json([
			"data" => $tasks->orderBy('sortorder')->get(),/*!*/
			"links" => $links->all()
		]);
	}
}
~~~
2. Newly added tasks must receive an initial `sortorder` value: 

{{snippet app/Http/Controllers/TaskController.php}}
~~~php
public function create(Request $request){
	$task = new Task();

	$task->text = $request->text;
	$task->start_date = $request->start_date;
	$task->duration = $request->duration;
	$task->progress = $request->has("progress") ? $request->progress : 0;
	$task->parent = $request->parent;
	$task->sortorder = Task::max("sortorder") + 1;/*!*/

	$task->save();

	return response()->json([
		"action"=> "inserted",
		"tid" => $task->id
	]);
}
~~~

3. Finally, when user reorders tasks, task orders must be [updated](desktop/server_side.md#storingtheorderoftasks):

{{snippet app/Http/Controllers/TaskController.php}}
~~~php
public function update($id, Request $request){
	$task = Task::find($id);

	$task->text = $request->text;
	$task->start_date = $request->start_date;
	$task->duration = $request->duration;
	$task->progress = $request->has("progress") ? $request->progress : 0;
	$task->parent = $request->parent;
	
	$task->save();
	
	if($request->has("target")){/*!*/
		$this->updateOrder($id, $request->target);/*!*/
	}/*!*/

	return response()->json([
		"action"=> "updated"
	]);
}

private function updateOrder($taskId, $target){
	$nextTask = false;
	$targetId = $target;

	if(strpos($target, "next:") === 0){
		$targetId = substr($target, strlen("next:"));
		$nextTask = true;
	}

	if($targetId == "null")
		return;

	$targetOrder = Task::find($targetId)->sortorder;
	if($nextTask)
		$targetOrder++;

	Task::where("sortorder", ">=", $targetOrder)->increment("sortorder");

	$updatedTask = Task::find($taskId);
	$updatedTask->sortorder = $targetOrder;
	$updatedTask->save();
}

~~~


@todo:
	add descriptions, add link to repo, recheck.