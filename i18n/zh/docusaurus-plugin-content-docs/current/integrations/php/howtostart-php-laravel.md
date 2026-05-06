---
title: "dhtmlxGantt 与 PHP：Laravel"
sidebar_label: "PHP：Laravel"
---

# dhtmlxGantt 与 PHP：Laravel

本教程描述如何将 dhtmlxGantt 集成到一个 [Laravel](https://laravel.com/) 应用中。

还有一些教程是为了在其他平台的帮助下构建服务器端集成而编写的：

- [dhtmlxGantt 与 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt 与 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt 与 Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt 与 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt 与 PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt 与 Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt 与 Ruby on Rails](integrations/other/howtostart-ruby.md)

:::note
完整的源代码可在 [GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel) 找到。
:::

你也可以查看视频指南，了解如何使用 PHP Laravel 创建甘特图。

<iframe width="704" height="400" src="https://www.youtube.com/embed/eu5R86a-9jA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 第一步。初始化项目

### 创建一个项目

使用 [Composer](https://getcomposer.org/) 创建一个新的应用：

~~~php
composer create-project laravel/laravel gantt-laravel-app
~~~

下载并创建所有必要文件大约需要一分钟。
完成后，可以检查当前是否一切正常。进入项目文件夹并运行数据库迁移：

~~~php
cd gantt-laravel-app
php artisan migrate
~~~

现在，你可以运行服务器：

~~~php
php artisan serve
~~~

在这一步，你应该看到一个默认的 Laravel 页面：

![how_to_start_laravel_blank_page](/img/how_to_start_laravel_blank_page.png)

## 第2步。将 Gantt 添加到页面

### 添加一个视图

首先，我们将为应用添加一个带有 dhtmlxGantt 的新页面。
进入 *resources/views* 文件夹，创建一个名为 *gantt.blade.php* 的新视图：


~~~html title="resources/views/gantt.blade.php"
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

在这里我们定义了一个简单的 HTML 布局，从 [CDN](guides/cdn-links-list.md) 加载 dhtmlxGantt 的资源，并使用 init 方法初始化 gantt。

请注意，我们还为文档主体和 gantt 容器指定了 **100% 高度**。Gantt 将使用其容器的大小，因此需要一些初始尺寸。

### 修改默认路由

在添加新页面后，我们需要让它能够从浏览器访问。对于本教程，我们将把 gantt 设为应用的默认页面。

进入 *routes/web.php* 并修改默认路由：


~~~php title="routes/web.php"
<?php

Route::get('/', function () {
    return view('gantt');
});
~~~

再次运行应用以确保已生效：

![how_to_start_laravel_empty_gantt](/img/how_to_start_laravel_empty_gantt.png)

## 第3步。创建模型与迁移

到目前为止，我们得到了一个空的甘特图。现在让它连接数据库并用数据填充。

### 创建数据库

请确保在 *.env* 中更新数据库配置，例如：


~~~php title=".env"
DB_CONNECTION="mysql"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_DATABASE="gantt-test"
DB_USERNAME="root"
DB_PASSWORD=
~~~


下一步是创建 [模型类](https://laravel.com/docs/12.x/eloquent) 与
[migrations](https://laravel.com/docs/12.x/migrations)。可以使用 Artisan 命令生成类和迁移文件：

~~~js
php artisan make:model Task --migration
~~~

以及 

~~~js
php artisan make:model Link --migration
~~~

之后在 `database/migrations` 文件夹中找到迁移文件并定义 [数据库架构](https://laravel.com/docs/12.x/migrations#migration-structure)。你可以在这里找到 gantt 期望的数据库架构。

Tasks 表的代码如下：


~~~php title="database/migrations/_create_tasks_table.php"
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

下面是 Links 表的代码：


~~~php title="database/migrations/_create_links_table.php"
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

并运行迁移：

~~~php
php artisan migrate
~~~

在此过程中，我们可以为应用生成一些测试数据。
使用 artisan 命令生成一个 [seeder](https://laravel.com/docs/12.x/seeding) 类：

~~~php
php artisan make:seeder TasksTableSeeder
php artisan make:seeder LinksTableSeeder
~~~

现在，打开 *database/seeders* 文件夹，为 **TasksTableSeeder** 添加一些数据：


~~~php title="database/seeds/TasksTableSeeder.php"
<?php

namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
 
class TasksTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tasks')->truncate();
        DB::table('tasks')->insert([
            ['id'=>1, 'text'=>'Project #1', 'start_date'=>'2025-04-01 00:00:00', 
                'duration'=>5, 'progress'=>0.8, 'parent'=>0],
            ['id'=>2, 'text'=>'Task #1', 'start_date'=>'2025-04-06 00:00:00', 
                'duration'=>4, 'progress'=>0.5, 'parent'=>1],
            ['id'=>3, 'text'=>'Task #2', 'start_date'=>'2025-04-05 00:00:00', 
                'duration'=>6, 'progress'=>0.7, 'parent'=>1],
            ['id'=>4, 'text'=>'Task #3', 'start_date'=>'2025-04-07 00:00:00', 
                'duration'=>2, 'progress'=>0, 'parent'=>1],
            ['id'=>5, 'text'=>'Task #1.1', 'start_date'=>'2025-04-05 00:00:00', 
                'duration'=>5, 'progress'=>0.34, 'parent'=>2],
            ['id'=>6, 'text'=>'Task #1.2', 'start_date'=>'2025-04-11 00:00:00', 
                'duration'=>4, 'progress'=>0.5, 'parent'=>2],
            ['id'=>7, 'text'=>'Task #2.1', 'start_date'=>'2025-04-07 00:00:00', 
                'duration'=>5, 'progress'=>0.2, 'parent'=>3],
            ['id'=>8, 'text'=>'Task #2.2', 'start_date'=>'2025-04-06 00:00:00', 
                'duration'=>4, 'progress'=>0.9, 'parent'=>3]
        ]);
    }
}
~~~
然后，对 **LinksTableSeeder** 做同样的事情：


~~~php title="database/seeders/LinksTableSeeder.php"
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LinksTableSeeder extends Seeder
{
	public function run(): void
	{
		DB::table('links')->truncate();
		DB::table('links')->insert([
			['id' => 1, 'source' => 2, 'target' => 3, 'type' => 0],
			['id' => 2, 'source' => 3, 'target' => 4, 'type' => 1]
		]);
	}
}
~~~
并在 **DatabaseSeeder.php** 中调用表种子：


~~~php title="database/seeds/DatabaseSeeder.php"
<?php
 
namespace Database\Seeders;
 
use App\Models\Task;
use App\Models\Link;
use Database\Seeders\TasksTableSeeder;
use Database\Seeders\LinksTableSeeder;
use Illuminate\Database\Seeder;
 
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(TasksTableSeeder::class);
        $this->call(LinksTableSeeder::class);
    }
}
~~~

之后，我们可以在命令行进行数据库种子：

~~~php
php artisan db:seed
~~~

### 定义模型类

数据通过 [Eloquent 模型](https://laravel.com/docs/12.x/eloquent) 类进行管理。我们在前一步已经为 tasks 和 links 生成了类。它们已经可以使用，并且不需要进行任何修改就可以与 gantt 一起工作。

不过，我们可以为 Task 类添加一个名为 **open** 的 [属性]，以在 [JSON 响应] 中返回。这样在客户端加载任务时，项目树就会展开。否则，初始时所有分支将处于关闭状态：

Task 模型将如下所示：


~~~php title="/app/Models/Task.php"
<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Task extends Model
{
    protected $appends = ["open"];
 
    public function getOpenAttribute(){
        return true;
    }
}
~~~

Link 模型不需要进行任何更改：


~~~php title="/app/Models/Link.php"
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
}
~~~

## 第4步。加载数据

一旦数据库创建且模型已定义，我们就可以向甘特图加载数据。客户端需要以下格式的日期，因此让我们创建一个控制器并实现一个生成此类 JSON 的动作：


~~~php title="app/Http/Controllers/GanttController.php"
<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Models\Task;
use App\Models\Link;

class GanttController extends Controller
{
	public function get(): JsonResponse
	{
		$tasks = Task::all();
		$links = Link::all();

		return response()->json([
			"tasks" => $tasks,
			"links" => $links
		]);
	}
}
~~~

并注册路由，以便客户端可以调用该动作。请注意，我们将把路由添加到 [api.php 路由文件](https://laravel.com/docs/12.x/routing#basic-routing)：


~~~php title="routes/api.php"
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GanttController;

Route::get('/data', [GanttController::class, 'get']); /*!*/
~~~

现在，让我们将 Laravel 配置为正确加载 API 路由。
通过以下命令创建 **RouteServiceProvider.php**：


~~~php
php artisan make:provider RouteServiceProvider
~~~
然后用以下内容更新该文件：


~~~php title="Providers/RouteServiceProvider.php"
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
	public function boot(): void
	{
		Route::prefix('api')
		->middleware('api')
		->group(base_path('routes/api.php'));
	}
}
~~~

最后，在视图中调用该动作：


~~~js title="resources/views/gantt.blade.php"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");

gantt.load("/api/data");/*!*/
~~~
[gantt.load](api/method/load.md) 向指定的 URL 发送一个 AJAX 请求，并将按照我们之前定义的方式期望得到一个 [JSON 响应](guides/supported-data-formats.md)。

另外，我们已经指定了 [date_format](api/config/date_format.md) 值。这就是告诉 gantt 数据源将使用哪种日期格式，以便客户端能够解析它们。

如果你现在检查应用，你应该会看到甘特图中已经有任务了：

![how_to_start_laravel_complete](/img/how_to_start_laravel_complete.png)

## 第5步。保存更改

目前，我们的 gantt 可以从后端读取数据。现在让它将改动写回数据库。

客户端将在 REST 模式下工作，意味着它将对任务和链接的操作发送 POST/PUT/DELETE 请求。你可以在 [这里](guides/server-side.md#requestresponsedetails) 找到请求的格式和 gantt 将使用的所有路由。

现在我们需要定义处理两种模型操作的控制器、为它们创建路由以及在客户端启用数据保存。

### 添加控制器

从控制器开始。我们将为每个模型创建一个 RESTful 的 [resource controller](https://laravel.com/docs/12.x/controllers)。它将包含用于添加/删除和更新模型的方法。

#### Task 的控制器

~~~php title="app/Http/Controllers/TaskController.php"
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
	public function store(Request $request)
	{
		$data = $request->only(['text', 'start_date', 'duration', 'parent']);
		$data['progress'] = $request->input('progress', 0);

		$task = Task::create($data);

		return response()->json([
			'action' => 'inserted',
			'tid' => $task->id,
		]);
	}

	public function update(Request $request, $id)
	{
		$task = Task::findOrFail($id);

		$data = $request->only(['text', 'start_date', 'duration', 'parent']);
		$data['progress'] = $request->input('progress', 0);

		$task->update($data);

		return response()->json([
			'action' => 'updated',
		]);
	}

	public function destroy($id)
	{
		$task = Task::findOrFail($id);
		$task->delete();

		return response()->json([
			'action' => 'deleted',
		]);
	}
}
~~~


#### 配置 Task 模型

在控制器方法工作之前，需要配置 `Task` 模型以允许批量赋值。 [Laravel 的批量赋值](https://laravel.com/docs/11.x/eloquent#mass-assignment) 保护要求你明确指定哪些属性可以通过 `create()` 和 `update()` 方法进行填充。
将 Task 模型更新为包含 `$fillable` 属性：


~~~php title="app/Models/Task.php"
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['text', 'start_date', 'duration', 'progress', 'parent']; /*!*/
    protected $appends = ["open"];

    public function getOpenAttribute(){
        return true;
    }
}
~~~

`$fillable` 数组指定哪些字段可以进行批量赋值。这是一个安全特性，可以防止通过用户输入更新不需要的字段。



并为它添加一个路由：


~~~php title="routes/api.php"
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GanttController;
use App\Http\Controllers\TaskController;

Route::get('/data', [GanttController::class, 'get']);
Route::resource('task', TaskController::class); /*!*/
~~~

关于这段代码有几点说明：

- 当插入新任务时，我们在响应对象的 **tid** 属性中返回其 id
- 为 **progress** 参数分配了默认值。
  许多请求参数都是可选的，这意味着如果客户端任务没有为它们分配值，它们不会被发送到服务器动作。
- 响应的 JSON 可以包含任意数量的附加属性，它们都可以从客户端处理程序访问

现在让我们为 LinkController 实现同样的功能。

#### Link 的控制器

~~~php title="app/Http/Controllers/LinkController.php"
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Link;

class LinkController extends Controller
{
	public function store(Request $request)
	{
		$link = Link::create($request->only(['type', 'source', 'target']));

		return response()->json([
			'action' => 'inserted',
			'tid' => $link->id,
		]);
	}

	public function update(Request $request, $id)
	{
		$link = Link::findOrFail($id);
		$link->update($request->only(['type', 'source', 'target']));

		return response()->json([
			'action' => 'updated',
		]);
	}

	public function destroy($id)
	{
		$link = Link::findOrFail($id);
		$link->delete();

		return response()->json([
			'action' => 'deleted',
		]);
	}
}
~~~

#### 配置 Link 模型

同 Task 模型一样，我们需要为 Link 模型配置批量赋值：


~~~php title="app/Models/Link.php"
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $fillable = ['type', 'source', 'target']; /*!*/
}
~~~


以及它的路由：


~~~php title="routes/api.php"
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GanttController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\LinkController;

Route::get('/data', [GanttController::class, 'get']);
Route::resource('task', TaskController::class);
Route::resource('link', LinkController::class); /*!*/
~~~

### 在客户端启用数据保存

最后，我们将 [配置客户端] 以使用我们刚实现的 API：


~~~js title="resources/views/gantt.blade.php"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
gantt.init("gantt_here");
gantt.load("/api/data");

const dp = gantt.createDataProcessor({ /*!*/
	url: "/api", /*!*/
	mode: "REST" /*!*/
}); /*!*/
~~~

现在，你将获得一个完全交互式的甘特图，能够查看、添加、更新和删除任务与链接。

![how_to_start_laravel_crud](/img/how_to_start_laravel_crud.png)

请查看更多 [我们的指南](guides.md)，了解 dhtmlxGantt 的更多功能，或查看关于 [将甘特与其他后端框架集成](integrations/howtostart-guides.md) 的教程。

## 存储任务顺序 {#storingtheorderoftasks}

客户端甘特图允许通过拖放来 [重新排序任务](guides/reordering-tasks.md)。因此如果你使用了此功能，需要将该顺序存储到数据库中。
你可以在此处查看常见的 [描述](guides/server-side.md#storingtheorderoftasks)。

现在让我们为应用添加此功能。

### 在客户端启用任务重新排序

首先，我们需要允许用户在 UI 中更改任务顺序。打开 *Index* 视图并更新 gantt 的配置：


~~~js title="resources/views/gantt.blade.php"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

### 在服务器端启用任务重新排序

现在，让我们在后端反映这些变化。我们将把顺序存储在名为 "sortorder" 的列中。一个完整的任务表架构可能如下所示：


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

或者你可以为我们之前生成的架构添加一个迁移：


~~~js
php artisan make:migration add_sortorder_to_tasks_table --table=tasks
~~~

Migration 文件的代码如下：


~~~php title="database/migrations/_add_sortorder_to_tasks_table.php"
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

并应用迁移：


~~~
php artisan migrate
~~~

之后，我们需要更新在控制器中定义的 CRUD。

1 . <b>GET /data</b> 必须按 `sortorder` 列对任务进行排序后返回：


~~~php title="app/Http/Controllers/GanttController.php"
<?php
namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use App\Models\Task;
use App\Models\Link;

class GanttController extends Controller
{
	public function get(): JsonResponse
	{
		$tasks = Task::orderBy('sortorder')->get(); /*!*/
		$links = Link::all();

		return response()->json([
			"tasks" => $tasks,
			"links" => $links
		]);
	}
}
~~~
2 . 新增任务必须接收初始值 `sortorder`：


~~~php title="app/Http/Controllers/TaskController.php"
public function store(Request $request)
{
	$data = $request->only(['text', 'start_date', 'duration', 'parent']);
	$data['progress'] = $request->input('progress', 0);
	$data['sortorder'] = Task::max('sortorder') + 1;

	$task = Task::create($data);

	return response()->json([
		'action' => 'inserted',
		'tid' => $task->id,
	]);
}
~~~
3 . 最后，当用户重新排序任务时，任务顺序必须 [更新](guides/server-side.md#storingtheorderoftasks)：


~~~php title="app/Http/Controllers/TaskController.php"
public function update(Request $request, $id)
{
	$task = Task::findOrFail($id);

	$data = $request->only(['text', 'start_date', 'duration', 'parent']);
	$data['progress'] = $request->input('progress', 0);

	$task->update($data);

	if ($request->has('target')) {
		$this->updateOrder($id, $request->input('target'));
	}

	return response()->json([
		'action' => 'updated',
	]);
}

private function updateOrder($taskId, $target)
{
	$nextTask = false;
	$targetId = $target;

	if (str_starts_with($target, 'next:')) {
		$targetId = substr($target, strlen('next:'));
		$nextTask = true;
	}

	if ($targetId === 'null') {
		return;
	}

	$targetTask = Task::find($targetId);
	if (!$targetTask) {
		return;
	}

	$targetOrder = $targetTask->sortorder;
	if ($nextTask) {
		$targetOrder++;
	}

	Task::where('sortorder', '>=', $targetOrder)->increment('sortorder');

	$updatedTask = Task::find($taskId);
	$updatedTask->sortorder = $targetOrder;
	$updatedTask->save();
}
~~~


## 应用安全性

Gantt 不提供防止各种威胁（如 SQL 注入、XSS、CSRF 攻击）的机制。确保应用安全的责任在实现后端的开发人员身上。请在相关文档中查看详细信息：[在相应的文章中](guides/app-security.md)。

## 故障排除

如果你已经完成以上步骤，将 Gantt 与 PHP 集成，但 Gantt 未在页面上呈现任务和链接，可以查看 [](guides/troubleshooting.md) 文章。它描述了识别问题根源的方法。

## 下一步

现在你已经拥有一个功能完善的甘特图。你可以在 [GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel) 查看完整代码，克隆或下载并用于你的项目。

你也可以查看 [对 gantt 的众多功能的指南](guides.md)，或了解 [将 Gantt 与其他后端框架集成的教程](integrations/howtostart-guides.md)。