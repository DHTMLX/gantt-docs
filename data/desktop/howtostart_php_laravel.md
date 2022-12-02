dhtmlxGantt with PHP: Laravel 
=====================

This tutorial describes how to add dhtmlxGantt into a [Laravel](https://laravel.com/) app.

There are tutorials intended for building server-side integration with the help of other platforms:

- desktop/howtostart_dotnet.md
- desktop/howtostart_dotnet_core.md
- desktop/howtostart_python.md
- desktop/howtostart_nodejs.md
- desktop/howtostart_php_slim4.md
- desktop/howtostart_salesforce.md
- desktop/howtostart_ruby.md

{{note
The complete source code is [available on GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel).
}}

You can have a look at the video guide that shows how to create a Gantt chart using PHP Laravel.

<iframe width="704" height="400" src="https://www.youtube.com/embed/eu5R86a-9jA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Step 1. Initializing a project
-----------------------

###Creating a project

Create a new application using [Composer](https://getcomposer.org/):

~~~php
composer create-project laravel/laravel gantt-laravel-app
~~~

It should take a minute to download and create all necessary files. 
Once everything is done, you can check that everything is correct so far:

~~~php
cd gantt-laravel-app
php artisan serve
~~~

At this step you should get a default Laravel page:

<img src="desktop/how_to_start_laravel_blank_page.png"/>

Step 2. Adding Gantt to the page
-----------------------

### Adding a View

Firstly, we'll add a new page with dhtmlxGantt to our app.
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

Here we've defined a simple HTML layout, added sources of dhtmlxGantt from [CDN](desktop/cdn_links_list.md) and initialized gantt using the api/gantt_init.md method.

Note that we've also specified **100% height** for the document body and for the gantt container. Gantt will use the size of its container, so some initial sizes are required.

### Changing the default route

After we've added a new page, we need to make it accessible from a browser. For this tutorial, we'll make our gantt the default page of an app.

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

Step 3. Creating models and migrations
---------------------

So, we've got an empty gantt chart. Let's connect it to the database and populate it with data.

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


The next step is to create [model classes](https://laravel.com/docs/eloquent#defining-models) and
[migrations](https://laravel.com/docs/migrations#generating-migrations). You can generate classes and migration files using the Artisan command:

~~~js
php artisan make:model Task --migration
~~~

and 

~~~js
php artisan make:model Link --migration
~~~

After that find the migrations in the `database/migrations` folder and define a [database schema](https://laravel.com/docs/8.x/migrations#migration-structure). 
You can find the database schema expected by the gantt [here](desktop/loading.md#databasestructure).

The code for the Tasks table looks like this:

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

Below you will find the code for the Links table:

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
Generate a [seeder](https://laravel.com/docs/seeding) class using the artisan command:

~~~php
php artisan make:seeder TasksTableSeeder
php artisan make:seeder LinksTableSeeder
~~~

Now, create the *database/seeds* folder, open it and add some data to **TasksTableSeeder**:

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

And call table seeders from **DatabaseSeeder.php**:

{{snippet database/seeds/DatabaseSeeder.php}}
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

After that we can seed our database from the command line:

~~~php
php artisan db:seed
~~~

### Defining model classes

The data is managed via the [Eloquent model](https://laravel.com/docs/eloquent) classes. We've already generated classes for tasks and links at the previous step.
They are ready to use and don't require any changes to work with gantt. 

What we can do, however, is to add an **open** [attribute of the Task class](desktop/loading.md#dataproperties) to 
[JSON response](https://laravel.com/docs/eloquent-serialization#appending-values-to-json). It will make the project tree expanded when tasks are loaded to the client side. 
Otherwise, all branches would be closed initially: 

The Task model will look as in:

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

And the Link model doesn't need any changes:

{{snippet /app/Link.php }}
~~~php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
}
~~~

Step 4. Loading data
-------------------

Once the database is created and the models are defined, we can load data into our gantt. 
The client side requires dates of [the following format](desktop/supported_data_formats.md#json), so let's create a controller with an action that produces such JSON:

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

And register a route, so the client could call this action. Note that we'll add the route to the [api.php routes file](https://laravel.com/docs/8.x/routing#basic-routing):

{{snippet routes/api.php}}
~~~php
<?php

use Illuminate\Http\Request;
use App\Http\Controllers\GanttController;

Route::get('/data', 'GanttController@get');/*!*/
~~~

And finally, call this action from the view:

{{snippet resources/views/gantt.blade.php }}
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");

gantt.load("/api/data");/*!*/
~~~

[gantt.load](api/gantt_load.md) sends an AJAX request to the specified URL and will expect a [JSON response](desktop/supported_data_formats.md#json) as we've defined before.

Also, note that we've specified the [date_format](api/gantt_date_format_config.md) value. 
This is how we tell the gantt which format of dates the data source will use, so the client side could parse them. 

If you check the app now, you should see that there are now tasks in our gantt chart:

<img src="desktop/how_to_start_laravel_complete.png"/>

Step 5. Saving changes
-----------------------------------

For now, our gantt can read data from the backend. Let's make it write changes back to the database.

The client side will work in the REST mode, meaning that it will send POST/PUT/DELETE requests for tasks and links actions. 
You can find the format of requests and all the routes the gantt will use [here](desktop/server_side.md#requestresponsedetails). 

What we need now is to define controllers that handle actions on both models, create routes for them and enable data saving on the client side.

###Adding controllers

Let's start with controllers. We'll create one RESTful [resource controller](https://laravel.com/docs/controllers#resource-controllers) for each model. 
It will contain methods for adding/deleting and updating the model. 

####Controller for tasks

{{snippet app/Http/Controllers/TaskController.php}}
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

And a [route](http://laravel.com/docs/controllers#restful-resource-controllers) for it:

{{snippet routes/api.php}}
~~~php
<?php
 
use Illuminate\Http\Request;
 
Route::get('/data', 'GanttController@get');
Route::resource('task', 'TaskController');/*!*/
~~~

A couple of notes regarding this code:

- When a new task is inserted, we return its id back to the client in the **tid** property of the response object
- We assign a default value to the **progress** parameter. 
Many request parameters are optional, which means that if a client-side task doesn't have them assigned, they won't be sent to the server action.
- The response JSON can have any number of additional properties, they all can be accessed from the [client-side handler](desktop/server_side.md#errorhandling)

Now let's implement the same for a LinkController.

####Controller for links

{{snippet app/Http/Controllers/LinkController.php}}
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

And its routes:

{{snippet routes/api.php}}
~~~php
<?php

use Illuminate\Http\Request;

Route::get('/data', 'GanttController@get');
Route::resource('task', 'TaskController');
Route::resource('link', 'LinkController'); /*!*/
~~~

###Enabling data saving on the client side

Finally, we will [configure the client side](desktop/server_side.md#technique) to utilize the API we've just implemented:

{{snippet resources/views/gantt.blade.php }}
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
    
gantt.init("gantt_here");
    
gantt.load("/api/data");
    
var dp = new gantt.dataProcessor("/api");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

Now you have a fully interactive Gantt chart with the ability to view, add, update and delete tasks and links.

<img src="desktop/how_to_start_laravel_crud.png"/>

Please check more of [our guides](desktop/guides.md) for more features of dhtmlxGantt.

Storing the order of tasks
------------------

The client-side gantt allows [reordering tasks](desktop/reordering_tasks.md) using drag and drop. So if you use this feature, you'll have to store this order in the database. 
You can check the common [description here](desktop/server_side.md#storingtheorderoftasks).

Let's now add this feature to our app.

###Enable tasks reordering on the client

Firstly, we need to allow users to change task order in the UI. Open the *Index* view and update the configuration of gantt:

{{snippet resources/views/gantt.blade.php }}
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

###Enable tasks reordering on the server

Now, let's reflect these changes on the backend. We are going to store the order in the column named "sortorder"." A complete tasks' schema may look as follows:

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

Or you can add a migration to the schema we've generated earlier:

~~~js
php artisan make:migration add_sortorder_to_tasks_table --table=tasks
~~~

The code of the Migration file is:

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

1 . <b>GET /data</b> must return tasks ordered by the `sortorder` column: 
   
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
2 . Newly added tasks must receive the initial value `sortorder`: 

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

3 . Finally, when a user reorders tasks, task orders must be [updated](desktop/server_side.md#storingtheorderoftasks):

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


Application security
-------------------------

Gantt doesn't provide any means of preventing an application from various threats, such as SQL injections or XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers implementing the backend. Read the details [in the corresponding article](desktop/app_security.md).


Trouble shooting
-----------------

In case you've completed the above steps to implement Gantt integration with PHP but Gantt doesn't render tasks and links on a page, have a look at the desktop/troubleshooting.md article. It describes 
the ways of identifying the roots of the problems.

What's next
------------

Now you have a fully functioning gantt. You can view the full code on [GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel), clone or download it and use it for your projects.

You can also check [guides on the numerous features of gantt](desktop/guides.md) or tutorials on [integrating Gantt with other backend frameworks](desktop/howtostart_guides.md).