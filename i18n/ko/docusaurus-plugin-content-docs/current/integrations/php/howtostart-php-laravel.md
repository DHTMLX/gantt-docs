---
title: "dhtmlxGantt와 PHP: Laravel 연동"
sidebar_label: "dhtmlxGantt와 PHP: Laravel 연동"
---

# dhtmlxGantt와 PHP: Laravel 연동

이 튜토리얼은 dhtmlxGantt를 [Laravel](https://laravel.com/) 애플리케이션에 통합하는 방법을 설명합니다.

서버 사이드 통합을 위한 다른 플랫폼의 튜토리얼도 제공됩니다:

- [dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt와 ASP.NET Core 사용하기](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt와 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt와 Node.js 연동하기](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt와 PHP:Slim 연동하기](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt와 Salesforce LWC 연동하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)

:::note
전체 소스 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel)에서 확인할 수 있습니다.
:::

또한, PHP Laravel로 Gantt 차트를 만드는 방법을 보여주는 동영상 가이드도 있습니다.

<iframe width="704" height="400" src="https://www.youtube.com/embed/eu5R86a-9jA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 1단계. 프로젝트 초기화

### 프로젝트 생성

먼저, [Composer](https://getcomposer.org/)를 사용하여 새로운 Laravel 애플리케이션을 생성합니다:

~~~php
composer create-project laravel/laravel gantt-laravel-app
~~~

이 과정은 필요한 모든 파일을 다운로드하고 설정하는 데 잠시 시간이 걸릴 수 있습니다. 
설정이 완료되면 다음 명령어를 통해 정상적으로 설치되었는지 확인할 수 있습니다:

~~~php
cd gantt-laravel-app
php artisan serve
~~~

이제 기본 Laravel 환영 페이지가 표시됩니다:

![how_to_start_laravel_blank_page](/img/how_to_start_laravel_blank_page.png)

## 2단계. 페이지에 Gantt 추가

### 뷰(View) 추가

다음으로, dhtmlxGantt가 포함된 새로운 페이지를 앱에 추가합니다.
*resources/views* 디렉토리로 이동하여 *gantt.blade.php*라는 새 뷰 파일을 생성합니다:

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

이 코드는 기본 HTML 레이아웃을 구성하고, [CDN](guides/cdn-links-list.md)에서 dhtmlxGantt 리소스를 불러오며, [init](api/method/init.md) 메서드를 사용해 gantt 차트를 초기화합니다.

문서의 body와 gantt 컨테이너 모두 **100% 높이**로 설정되어 있습니다. gantt는 컨테이너 크기에 맞춰 동적으로 조정되기 때문에 이러한 크기 지정이 중요합니다.

### 기본 라우트 변경

새 페이지를 추가한 후, 브라우저에서 접근할 수 있도록 해야 합니다. 이 예제에서는 gantt 페이지를 앱의 기본 페이지로 설정합니다.

*routes/web.php* 파일을 열고 기본 라우트를 다음과 같이 수정합니다:

**routes/web.php**
~~~php
<?php

Route::get('/', function () {
    return view('gantt');
});
~~~

앱을 재시작한 후 gantt 페이지가 나타나는지 확인합니다:

![how_to_start_laravel_empty_gantt](/img/how_to_start_laravel_empty_gantt.png)

## 3단계. 모델 및 마이그레이션 생성

gantt 차트가 표시되면, 다음 단계는 데이터베이스와 연결하여 데이터를 불러오는 것입니다.

### 데이터베이스 생성

먼저 *.env* 파일에서 데이터베이스 설정을 업데이트하세요. 예시:

**.env**
~~~php
DB_CONNECTION="mysql"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_DATABASE="gantt-test"
DB_USERNAME="root"
DB_PASSWORD=
~~~

그 다음, Artisan 명령어를 사용하여 [모델 클래스](https://laravel.com/docs/11.x/eloquent)와
[마이그레이션](https://laravel.com/docs/11.x/migrations)을 생성합니다:

~~~js
php artisan make:model Task --migration
~~~

그리고 

~~~js
php artisan make:model Link --migration
~~~

이제 `database/migrations` 폴더에서 마이그레이션 파일을 찾아 [데이터베이스 스키마](https://laravel.com/docs/8.x/migrations#migration-structure)를 정의합니다. 
gantt에서 기대하는 데이터베이스 스키마는 [여기](guides/loading.md#databasestructure)에서 확인할 수 있습니다.

Tasks 테이블에 대한 마이그레이션 예시는 다음과 같습니다:

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

Links 테이블에 대한 마이그레이션 예시는 아래와 같습니다:

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

마이그레이션을 실행합니다:

~~~php
php artisan migrate
~~~

설정하는 동안 테스트를 위해 샘플 데이터를 생성하는 것이 유용합니다. 
다음 Artisan 명령어로 Seeder 클래스를 생성할 수 있습니다:

~~~php
php artisan make:seeder TasksTableSeeder
php artisan make:seeder LinksTableSeeder
~~~

*database/seeds* 폴더가 없다면 생성한 후, 해당 폴더에서 **TasksTableSeeder**에 샘플 데이터를 추가합니다:

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

**DatabaseSeeder.php**를 수정하여 이 seeder들을 호출하도록 합니다:

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

마지막으로, 명령줄에서 데이터베이스에 시드 데이터를 추가합니다:

~~~php
php artisan db:seed
~~~

### 모델 클래스 정의

데이터는 [Eloquent 모델](https://laravel.com/docs/11.x/eloquent) 클래스를 통해 처리됩니다. 앞서 생성한 task와 link 클래스는 별도의 수정 없이 gantt에서 바로 사용할 수 있습니다.

단, 클라이언트에서 작업을 불러올 때 프로젝트 트리가 기본적으로 확장되어 있도록 하려면, Task 클래스의 [JSON 응답](https://laravel.com/docs/11.x/eloquent-serialization)에 **open** 속성을 추가할 수 있습니다. 그렇지 않으면 모든 브랜치가 처음에는 접혀서 표시됩니다.

Task 모델 예시는 다음과 같습니다:

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

Link 모델은 별도의 수정이 필요하지 않습니다:

**/app/Link.php**
~~~php
<?php

namespace App;

use IlluminateDatabaseEloquentModel;

class Link extends Model
{
}
~~~

## 4단계. 데이터 불러오기

데이터베이스와 모델이 준비되었으니, 이제 gantt 차트에 데이터를 불러올 수 있습니다. 
클라이언트는 특정 [포맷](guides/supported-data-formats.md#json)의 날짜를 기대하므로, 이에 맞는 JSON을 반환하는 컨트롤러 액션을 생성합니다:

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

이 액션을 클라이언트에서 요청할 수 있도록 [api.php 라우트 파일](https://laravel.com/docs/8.x/routing#basic-routing)에 라우트를 추가합니다:

**routes/api.php**
~~~php
<?php

use IlluminateHttpRequest;
use AppHttpControllersGanttController;

Route::get('/data', 'GanttController@get');/*!*/
~~~

마지막으로, 뷰를 수정하여 이 엔드포인트를 호출하도록 합니다:

**resources/views/gantt.blade.php**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");

gantt.load("/api/data");/*!*/
~~~

[gantt.load](api/method/load.md) 메서드는 지정된 URL로 AJAX 요청을 보내고, [JSON 응답](guides/supported-data-formats.md#json)을 기대합니다.

또한, [date_format](api/config/date_format.md)을 지정하면 gantt가 데이터 소스의 날짜 형식을 인식하여 클라이언트에서 올바르게 파싱할 수 있습니다.

이제 앱을 확인하면 gantt 차트에 작업이 표시됩니다:

![how_to_start_laravel_complete](/img/how_to_start_laravel_complete.png)

## 5단계. 변경사항 저장

현재 gantt 차트는 백엔드에서 데이터를 읽어옵니다. 다음 단계는 변경사항을 데이터베이스에 저장할 수 있도록 하는 것입니다.

클라이언트는 REST 모드로 동작하며, 작업 및 링크에 대한 POST/PUT/DELETE 요청을 보냅니다. gantt에서 사용하는 요청 포맷과 라우트는 [여기](guides/server-side.md#requestresponsedetails)에서 확인할 수 있습니다.

이를 지원하려면 두 모델 모두에 대해 CRUD 작업을 처리하는 컨트롤러를 생성하고, 라우트를 정의하며, 클라이언트에서 데이터 저장을 활성화해야 합니다.

### 컨트롤러 추가

먼저 두 모델에 대해 RESTful [리소스 컨트롤러](https://laravel.com/docs/11.x/controllers)를 생성합니다. 
이 컨트롤러에는 데이터 추가, 삭제, 갱신을 위한 메서드가 포함됩니다.

#### 작업(Task) 컨트롤러

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

그리고 [route](https://laravel.com/docs/11.x/controllers#resource-controllers)는 다음과 같습니다:

**routes/api.php**
~~~php
<?php
 
use IlluminateHttpRequest;
 
Route::get('/data', 'GanttController@get');
Route::resource('task', 'TaskController');/*!*/
~~~

이 코드에 대한 몇 가지 설명:

- 새 작업이 추가되면, 해당 id가 응답의 **tid** 속성으로 클라이언트에 전달됩니다.
- **progress** 파라미터에는 기본값이 할당됩니다. 많은 요청 파라미터가 선택사항이기 때문에, 클라이언트 측 작업에 값이 설정되지 않으면 서버 요청에 포함되지 않을 수 있습니다.
- 응답 JSON에는 추가 속성이 포함될 수 있으며, 모두 [클라이언트 핸들러](guides/server-side.md#errorhandling)에서 접근할 수 있습니다.

다음으로, 링크에 대한 유사한 컨트롤러를 생성해보겠습니다.

#### 링크(Link) 컨트롤러

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

그리고 이에 해당하는 라우트는 다음과 같습니다:

**routes/api.php**
~~~php
<?php

use IlluminateHttpRequest;

Route::get('/data', 'GanttController@get');
Route::resource('task', 'TaskController');
Route::resource('link', 'LinkController'); /*!*/
~~~

### 클라이언트에서 데이터 저장 활성화

마지막으로, 클라이언트에서 방금 구성한 API와 연동하도록 설정해야 합니다:

**resources/views/gantt.blade.php**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
    
gantt.init("gantt_here");
    
gantt.load("/api/data");
    
var dp = new gantt.dataProcessor("/api");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

이제 Gantt 차트는 작업과 링크의 조회, 추가, 수정, 삭제가 모두 가능한 완전한 인터랙티브 상태가 됩니다.

![how_to_start_laravel_crud](/img/how_to_start_laravel_crud.png)

dhtmlxGantt의 더 많은 기능은 [가이드](guides.md)에서 확인할 수 있습니다.

## 작업 순서 저장하기 {#storingtheorderoftasks}

클라이언트 측 gantt는 [드래그 앤 드롭을 통한 작업 순서 변경](guides/reordering-tasks.md)을 지원합니다. 이 기능을 사용할 경우, 데이터베이스에 순서를 저장해야 합니다. 일반적인 설명은 [여기](guides/server-side.md#storingtheorderoftasks)에서 확인할 수 있습니다.

이제 이 기능을 앱에 추가해보겠습니다.

### 클라이언트에서 작업 순서 변경 활성화

사용자가 UI에서 작업 순서를 변경할 수 있도록, *Index* 뷰의 gantt 설정을 다음과 같이 수정하세요:

**resources/views/gantt.blade.php**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

### 서버에서 작업 순서 변경 활성화

백엔드에서는 "sortorder"라는 컬럼에 순서를 저장하게 됩니다. 전체 작업 테이블 스키마 예시는 다음과 같습니다:

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

또는 기존 스키마에 마이그레이션을 추가할 수도 있습니다:

~~~js
php artisan make:migration add_sortorder_to_tasks_table --table="tasks"
~~~

마이그레이션 파일 예시는 다음과 같습니다:

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

그리고 마이그레이션을 실행합니다:

~~~
php artisan migrate
~~~

다음으로, 컨트롤러의 CRUD 작업을 업데이트해야 합니다.

1 . <b>GET /data</b> 라우트는 `sortorder`로 정렬된 작업을 반환해야 합니다: 
   
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
2 . 새 작업을 추가할 때, 초기 `sortorder` 값을 할당해야 합니다: 

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

3 . 마지막으로, 작업의 순서가 변경될 때 서버에서도 순서를 업데이트해야 합니다:

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


## 애플리케이션 보안

Gantt 컴포넌트 자체에는 SQL 인젝션, XSS, CSRF 공격 등과 같은 위협에 대한 보호 기능이 포함되어 있지 않습니다. 애플리케이션의 보안은 백엔드 개발자의 책임입니다. 자세한 내용은 [관련 문서](guides/app-security.md)를 참고하세요.


## 문제 해결

이 과정을 모두 따라 했음에도 Gantt 차트에 작업이나 링크가 표시되지 않는 경우, [백엔드 통합 문제 해결](guides/troubleshooting.md) 문서에서 일반적인 문제의 원인과 해결 방법을 확인할 수 있습니다.

## 다음 단계

이제 gantt는 완전히 동작합니다. 전체 소스 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel)에서 복제하거나 다운로드하여 프로젝트에 사용할 수 있습니다.

gantt의 추가 기능은 [가이드](guides.md)에서, 그리고 다른 백엔드 프레임워크와의 연동 방법은 [how-to 가이드](integrations/howtostart-guides.md)에서 확인할 수 있습니다.

