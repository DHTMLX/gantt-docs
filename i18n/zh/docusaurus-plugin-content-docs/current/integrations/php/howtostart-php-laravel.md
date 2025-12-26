---
title: "dhtmlxGantt 与 PHP:Laravel 集成教程"
sidebar_label: "PHP: Laravel"
---

# dhtmlxGantt 与 PHP:Laravel 集成教程

本教程介绍如何将 dhtmlxGantt 集成到 [Laravel](https://laravel.com/) 应用程序中。

此外，我们还提供了针对其他服务端平台的集成教程:

- [dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt와 ASP.NET Core 사용하기](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt와 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt와 Node.js 연동하기](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt와 PHP:Slim 연동하기](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt와 Salesforce LWC 연동하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)

:::note
完整源码可在 [GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel) 获取。
:::

另外，我们还提供了一个视频指南，演示如何使用 PHP Laravel 构建甘特图。

<iframe width="704" height="400" src="https://www.youtube.com/embed/eu5R86a-9jA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 步骤 1. 初始化项目

### 创建项目

首先，使用 [Composer](https://getcomposer.org/) 创建一个新的 Laravel 应用:

~~~php
composer create-project laravel/laravel gantt-laravel-app
~~~

该过程会下载并配置所有所需文件。完成后，可以用以下命令验证一切是否正常:

~~~php
cd gantt-laravel-app
php artisan serve
~~~

此时，你应该能看到 Laravel 的默认欢迎页面:

![how_to_start_laravel_blank_page](/img/how_to_start_laravel_blank_page.png)

## 步骤 2. 将 Gantt 添加到页面

### 添加视图

接下来，添加一个包含 dhtmlxGantt 的新页面。进入 *resources/views* 目录，创建一个名为 *gantt.blade.php* 的新视图文件:

**resources/views/gantt.blade.php**
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

该页面设置了基本的 HTML 布局，引入了来自 [CDN](guides/cdn-links-list.md) 的 dhtmlxGantt 资源，并通过 [init](api/method/init.md) 方法初始化了甘特图。

请注意，文档 body 和甘特图容器都设置为 **100% 高度**。由于甘特图会根据容器大小自适应，因此必须定义这些尺寸。

### 修改默认路由

添加新页面后，需要使其能通过浏览器访问。本示例将 gantt 页面设置为应用的默认页面。

打开 *routes/web.php*，按照如下方式更新默认路由:

**routes/web.php**
~~~php
<?php

Route::get('/', function () {
    return view('gantt');
});
~~~

重启应用并验证 gantt 页面是否显示:

![how_to_start_laravel_empty_gantt](/img/how_to_start_laravel_empty_gantt.png)

## 步骤 3. 创建模型和迁移

甘特图已经显示，下一步是将其连接到数据库并填充数据。

### 创建数据库

请确保在 *.env* 文件中更新你的数据库设置，例如:

**.env**
~~~php
DB_CONNECTION="mysql"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_DATABASE="gantt-test"
DB_USERNAME="root"
DB_PASSWORD=
~~~

然后，使用 Artisan 命令创建 [模型类](https://laravel.com/docs/11.x/eloquent) 和 [迁移](https://laravel.com/docs/11.x/migrations):

~~~js
php artisan make:model Task --migration
~~~

以及

~~~js
php artisan make:model Link --migration
~~~

接下来，在 `database/migrations` 文件夹中找到迁移文件，并定义 [数据库结构](https://laravel.com/docs/8.x/migrations#migration-structure)。
gantt 期望的数据库结构可参考 [此处](guides/loading.md#shujukujiegou)。

以下是 Tasks 表的迁移代码:

**database/migrations/_create_tasks_table.php**
~~~php
<?php

use IlluminateSupportFacadesSchema;
use IlluminateDatabaseSchemaBlueprint;
use IlluminateDatabaseMigrationsMigration;

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

以下是 Links 表的迁移代码:

**database/migrations/_create_links_table.php**
~~~php
<?php

use IlluminateSupportFacadesSchema;
use IlluminateDatabaseSchemaBlueprint;
use IlluminateDatabaseMigrationsMigration;

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

通过以下命令运行迁移:

~~~php
php artisan migrate
~~~

在搭建过程中，建议生成一些测试用的示例数据。可以使用以下 Artisan 命令创建 Seeder 类:

~~~php
php artisan make:seeder TasksTableSeeder
php artisan make:seeder LinksTableSeeder
~~~

如果 *database/seeds* 文件夹不存在，请创建该文件夹，并在其中为 **TasksTableSeeder** 添加示例数据:

**database/seeds/TasksTableSeeder.php**
~~~php
<?php

use IlluminateDatabaseSeeder;

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

然后，更新 **DatabaseSeeder.php** 以调用这些 seeder:

**database/seeds/DatabaseSeeder.php**
~~~php
<?php

use IlluminateDatabaseSeeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(TasksTableSeeder::class);
        $this->call(LinksTableSeeder::class);
    }
}
~~~

最后，通过命令行填充数据库:

~~~php
php artisan db:seed
~~~

### 定义模型类

数据通过 [Eloquent model](https://laravel.com/docs/11.x/eloquent) 类进行处理。之前创建的 task 和 link 类无需修改即可用于 gantt。

但如果希望任务加载到客户端时项目树默认展开，可以在 Task 类的 [JSON 响应](https://laravel.com/docs/11.x/eloquent-serialization) 中添加 **open** 属性。否则所有分支初始状态都是折叠的。

Task 模型如下:

**/app/Task.php**
~~~php
<?php

namespace App;

use IlluminateDatabaseEloquentModel;

class Task extends Model
{
    protected $appends = ["open"];/*!*/

    public function getOpenAttribute(){/*!*/
        return true;/*!*/
    }/*!*/
}
~~~

Link 模型无需更改:

**/app/Link.php**
~~~php
<?php

namespace App;

use IlluminateDatabaseEloquentModel;

class Link extends Model
{
}
~~~

## 步骤 4. 加载数据

数据库和模型准备好后，可以将数据加载到甘特图中。
由于客户端期望日期为特定 [格式](guides/supported-data-formats.md#json)，因此需要创建一个控制器方法以相应格式返回 JSON:

**app/Http/Controllers/GanttController.php**
~~~php
<?php
namespace AppHttpControllers;
use AppTask;
use AppLink;

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

为此方法添加路由，使客户端可以请求数据。该路由将添加到 [api.php 路由文件](https://laravel.com/docs/8.x/routing#basic-routing):

**routes/api.php**
~~~php
<?php

use IlluminateHttpRequest;
use AppHttpControllersGanttController;

Route::get('/data', 'GanttController@get');/*!*/
~~~

最后，更新视图以调用该接口:

**resources/views/gantt.blade.php**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");

gantt.load("/api/data");/*!*/
~~~

[gantt.load](api/method/load.md) 方法会向指定 URL 发送 AJAX 请求，并期望获得如定义的 [JSON 响应](guides/supported-data-formats.md#json)。

同时，指定 [date_format](api/config/date_format.md) 让 gantt 能正确解析数据源的日期格式。

现在，检查应用时，任务应会显示在甘特图中:

![how_to_start_laravel_complete](/img/how_to_start_laravel_complete.png)

## 步骤 5. 保存更改

目前，甘特图已能从后端读取数据。下一步是让其支持将更改保存回数据库。

客户端以 REST 模式运行，对任务和链接的操作分别发送 POST/PUT/DELETE 请求。gantt 所用的请求格式和路由详见 [此处](guides/server-side.md#requestresponsedetails)。

为此，需要创建控制器以处理两个模型的 CRUD 操作，定义路由，并在客户端启用数据保存。

### 添加控制器

首先为两个模型创建 RESTful [资源控制器](https://laravel.com/docs/11.x/controllers)。
这些控制器将包含添加、删除和更新数据的方法。

#### 任务控制器

**app/Http/Controllers/TaskController.php**
~~~php
<?php
namespace AppHttpControllers;

use IlluminateHttpRequest;
use AppTask;

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

以及为其设置的 [路由](https://laravel.com/docs/11.x/controllers#resource-controllers):

**routes/api.php**
~~~php
<?php
 
use IlluminateHttpRequest;
 
Route::get('/data', 'GanttController@get');
Route::resource('task', 'TaskController');/*!*/
~~~

关于这段代码有几点说明:

- 当新任务被添加时，其 id 会通过响应的 **tid** 属性返回给客户端。
- **progress** 参数被分配了默认值。由于许多请求参数是可选的，如果客户端任务未设置这些参数，则不会包含在服务器请求中。
- 响应的 JSON 可以包含额外属性，这些属性都可以通过 [客户端处理函数](guides/server-side.md#cuowuchuli) 访问。

接下来，我们为链接创建类似的控制器。

#### 链接控制器

**app/Http/Controllers/LinkController.php**
~~~php
<?php
namespace AppHttpControllers;

use IlluminateHttpRequest;
use AppLink;

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

对应的路由如下:

**routes/api.php**
~~~php
<?php

use IlluminateHttpRequest;

Route::get('/data', 'GanttController@get');
Route::resource('task', 'TaskController');
Route::resource('link', 'LinkController'); /*!*/
~~~

### 启用客户端数据保存

最后，需要在客户端进行配置，以便与我们刚刚搭建的 API 协同工作:

**resources/views/gantt.blade.php**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
    
gantt.init("gantt_here");
    
gantt.load("/api/data");
    
var dp = new gantt.dataProcessor("/api");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

此时，Gantt 图已完全可交互，支持任务与链接的查看、添加、更新和删除。

![how_to_start_laravel_crud](/img/how_to_start_laravel_crud.png)

如需了解更多 dhtmlxGantt 的功能，可参考 [我们的指南](guides.md)。

## 任务顺序的存储 {#storingtheorderoftasks}

客户端的 gantt 支持 [拖拽任务排序](guides/reordering-tasks.md)。如果启用了此功能，则需要将顺序保存到数据库。相关原理可参见 [此处说明](guides/server-side.md#renwushunxudecunchu)。

下面为应用添加此功能。

### 启用客户端任务排序

要允许用户在界面中重新排序任务，需要在 *Index* 视图中更新 gantt 配置如下:

**resources/views/gantt.blade.php**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

### 启用服务端任务排序

在后端，将顺序存储在名为 "sortorder" 的字段中。完整任务表结构如下:

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

或者，也可以为现有表添加一次迁移:

~~~js
php artisan make:migration add_sortorder_to_tasks_table --table="tasks"
~~~

迁移文件内容如下:

**database/migrations/_add_sortorder_to_tasks_table.php**
~~~php
<?php

use IlluminateSupportFacadesSchema;
use IlluminateDatabaseSchemaBlueprint;
use IlluminateDatabaseMigrationsMigration;

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

然后运行迁移:

~~~
php artisan migrate
~~~

接下来，更新控制器中的 CRUD 操作。

1 . <b>GET /data</b> 路由应按 `sortorder` 排序返回任务: 
  
**app/Http/Controllers/GanttController.php**
~~~php
<?php
namespace AppHttpControllers;
use AppTask;
use AppLink;

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
2 . 新增任务时，应为其分配初始 `sortorder` 值: 

**app/Http/Controllers/TaskController.php**
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

3 . 最后，当任务被重新排序时，服务端需要相应更新其顺序:

**app/Http/Controllers/TaskController.php**
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

## 应用安全性

Gantt 组件本身不包含针对 SQL 注入、XSS 或 CSRF 攻击等威胁的防护。保障应用安全性是后端开发者的职责。详情请参阅 [相关文档](guides/app-security.md)。

## 故障排查

如果按照上述步骤操作后，Gantt 图未显示任务或链接，请参考 [백엔드 통합 문제 해결](guides/troubleshooting.md) 文章以查找和解决常见问题。

## 后续内容

Gantt 现已具备完整功能。完整源码可在 [GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel) 获取，便于克隆或下载用于项目开发。

关于 gantt 更多功能的信息可参见 [我们的指南](guides.md)，以及在 [how-to guides](integrations/howtostart-guides.md) 中有关于将 Gantt 集成到其他后端框架的教程。

