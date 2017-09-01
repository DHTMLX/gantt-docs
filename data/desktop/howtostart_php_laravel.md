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
composer create-project laravel/laravel gantt-laravel-app
~~~

It should take a minute to download and create all necessary files. 
Once everything is done, you can check that everything is correct so far:
~~~php
cd gantt-laravel-app
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

Step 3. Creating Models and Migrations
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


The next step is to create [model classes](https://laravel.com/docs/5.4/eloquent#defining-models) and [migrations](https://laravel.com/docs/5.5/migrations#generating-migrations).
You can generate classes and migration files using Artisan command:

~~~js
php artisan make:model Task --migration
~~~

and 

~~~js
php artisan make:model Link --migration
~~~

After that find the migrations in `database/migrations` folder and define a [database schema](https://laravel.com/docs/5.5/migrations#migration-structure). 
You can find database schema expected by gantt [here](desktop/server_side.md#thedatabasesstructure).

Tasks table:

{{snippet database/migrations/_create_tasks_table.php}}
~~~php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
	public function up()
	{
		Schema::create('tasks', function (Blueprint $table){
			$table->increments('id');
			$table->string('text');
			$table->integer('duration');
			$table->float('progress');
			$table->dateTime('start_date');
			$table->integer('parent');
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::dropIfExists('tasks');
	}
}
~~~

Links table:

{{snippet database/migrations/_create_links_table.php}}
~~~php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLinksTable extends Migration
{
	public function up()
	{
		Schema::create('links', function (Blueprint $table) {
			$table->increments('id');
			$table->string('type');
			$table->integer('source');
			$table->integer('target');
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::dropIfExists('links');
	}
}
~~~

And run the migration:

~~~php
php artisan migrate
~~~

While we're at it, we can generate some test data for our app. 
Generate a [seeder](https://laravel.com/docs/5.5/seeding) class using artisan command:

~~~php
php artisan make:seeder TasksTableSeeder
php artisan make:seeder LinksTableSeeder
~~~

Add some data to **TasksTableSeeder**:

{{snippet database/seeds/TasksTableSeeder.php}}
~~~php
<?php

use Illuminate\Database\Seeder;

class TasksTableSeeder extends Seeder
{
	public function run()
	{
		DB::table('tasks')->insert([
			['id'=>1, 'text'=>'Project #1', 'start_date'=>'2017-04-01 00:00:00', 
				'duration'=>5, 'progress'=>0.8, 'parent'=>0],
			['id'=>2, 'text'=>'Task #1', 'start_date'=>'2017-04-06 00:00:00', 
				'duration'=>4, 'progress'=>0.5, 'parent'=>1],
			['id'=>3, 'text'=>'Task #2', 'start_date'=>'2017-04-05 00:00:00', 
				'duration'=>6, 'progress'=>0.7, 'parent'=>1],
			['id'=>4, 'text'=>'Task #3', 'start_date'=>'2017-04-07 00:00:00', 
				'duration'=>2, 'progress'=>0, 'parent'=>1],
			['id'=>5, 'text'=>'Task #1.1', 'start_date'=>'2017-04-05 00:00:00', 
				'duration'=>5, 'progress'=>0.34, 'parent'=>2],
			['id'=>6, 'text'=>'Task #1.2', 'start_date'=>'2017-04-11 00:00:00', 
				'duration'=>4, 'progress'=>0.5, 'parent'=>2],
			['id'=>7, 'text'=>'Task #2.1', 'start_date'=>'2017-04-07 00:00:00', 
				'duration'=>5, 'progress'=>0.2, 'parent'=>3],
			['id'=>8, 'text'=>'Task #2.2', 'start_date'=>'2017-04-06 00:00:00', 
				'duration'=>4, 'progress'=>0.9, 'parent'=>3]
		]);
	}
}
~~~

And call table seeders from **DatabaseSeeder.php**
{{snippet database/seeds/TasksTableSeeder.php}}
~~~php
<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	public function run()
	{
		$this->call(TasksTableSeeder::class);
		$this->call(LinksTableSeeder::class);
	}
}
~~~

After that we can seed our database from a command line:

~~~php
php artisan db:seed
~~~

### Defining model classes

The data is managed via [Eloquent model](https://laravel.com/docs/5.4/eloquent) classes. We've already generated classes for tasks and links in the previous step.

They are ready to use and does not require changes to work with gantt. What we can do, however, 
is to add an **open** [attribute of the Task class](desktop/loading.html#specifyingdataproperties) to [JSON response](https://laravel.com/docs/5.4/eloquent-serialization#appending-values-to-json) -  it will make the project tree expanded when tasks are loaded to the client-side. 
Otherwise, all branches would be closed initially: 

Task model:

{{snippet /app/Task.php }}
~~~php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
	protected $appends = ["open"];/*!*/

	public function getOpenAttribute(){/*!*/
		return true;/*!*/
	}/*!*/
}
~~~

And a Link model doesn't need any changes:

{{snippet /app/Link.php }}
~~~php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
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

Let's start with controllers, we'll create one [RESTful resource controller](http://laravel.com/docs/4.2/controllers#restful-resource-controllers) for each model with methods for adding/deleting and updating the model. 

Controller for tasks:

{{snippet app/Http/Controllers/TaskControllers}}
~~~php
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{
	public function store(Request $request){

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

	public function destroy($id){
		$task = Task::find($id);
		$task->delete();

		return response()->json([
			"action"=> "deleted"
		]);
	}
}
~~~

And a [route](http://laravel.com/docs/4.2/controllers#restful-resource-controllers) 

{{snippet routes/api.php}}
~~~php
Route::resource('task', 'TaskController');
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
	public function store(Request $request){
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

	public function destroy($id){
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

Route::get('/data', 'GanttController@get');
Route::resource('task', 'TaskController');
Route::resource('link', 'LinkController'); /*!*/
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

The client-side gantt allows reordering tasks using drag and drop. So if you use this feature, you'll have to store this order in the database. 
You can check the common [description here](desktop/server_side.md#storingtheorderoftasks).

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

Now, let's reflect these changes on the backend. We are going to store the order in the column named sortorder. A complete tasks schema may look following:

~~~php
Schema::create('tasks', function (Blueprint $table){
	$table->increments('id');
	$table->string('text');
	$table->integer('duration');
	$table->float('progress');
	$table->dateTime('start_date');
	$table->integer('parent');
	$table->integer('sortorder')->default(0);
	$table->timestamps();
});
~~~

Or you can add a migration to the schema we generated earlier:

~~~js
php artisan make:migration add_sortorder_to_tasks_table --table=tasks
~~~

Migration file:

{{snippet database/migrations/_add_sortorder_to_tasks_table.php}}
~~~php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSortorderToTasksTable extends Migration
{
	public function up()
	{
		Schema::table('tasks', function (Blueprint $table) {
			$table->integer('sortorder')->default(0);
		});
	}

	public function down()
	{
		Schema::table('tasks', function (Blueprint $table) {
			$table->dropColumn('sortorder');
		});
	}
}
~~~

And apply the migration:

~~~
php artisan migrate
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
public function store(Request $request){
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
	add descriptions, add link to repo, recheck. redo db with seeders/migrations https://laravel.com/docs/5.0/schema https://laravel.com/docs/5.0/migrations