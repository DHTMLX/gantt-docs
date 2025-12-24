---
title: "dhtmlxGantt с PHP: Laravel"
sidebar_label: "PHP:Laravel"
---

# dhtmlxGantt с PHP: Laravel


В этом руководстве описывается, как интегрировать dhtmlxGantt в приложение на [Laravel](https://laravel.com/).

Также доступны руководства по серверной интеграции с использованием других платформ:

- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

:::note
Полный исходный код доступен [на GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel).
:::

Дополнительно доступно видео, демонстрирующее, как создать диаграмму Gantt с помощью PHP Laravel.

<iframe width="704" height="400" src="https://www.youtube.com/embed/eu5R86a-9jA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Шаг 1. Инициализация проекта


### Создание проекта

Начните с создания нового приложения Laravel с помощью [Composer](https://getcomposer.org/):

~~~php
composer create-project laravel/laravel gantt-laravel-app
~~~

Этот процесс займет некоторое время для загрузки и настройки всех необходимых файлов.
После завершения вы можете убедиться, что всё настроено корректно, выполнив следующие команды:

~~~php
cd gantt-laravel-app
php artisan serve
~~~

На этом этапе вы должны увидеть стандартную приветственную страницу Laravel:

![how_to_start_laravel_blank_page](/img/how_to_start_laravel_blank_page.png)

## Шаг 2. Добавление Gantt на страницу


### Добавление представления

Далее добавьте новую страницу, которая будет содержать dhtmlxGantt.
Перейдите в директорию *resources/views* и создайте новое представление с именем *gantt.blade.php*:

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

Это создает базовую HTML-разметку, подключает ресурсы dhtmlxGantt из [CDN](guides/cdn-links-list.md) и инициализирует диаграмму Gantt с помощью метода [init](api/method/init.md).

Обратите внимание, что и тело документа, и контейнер Gantt имеют высоту **100%**. Поскольку Gantt подстраивается под размер контейнера, важно задать эти размеры.

### Изменение маршрута по умолчанию

После добавления новой страницы необходимо обеспечить к ней доступ через браузер. В этом примере страница с Gantt будет установлена в качестве основной страницы приложения.

Откройте *routes/web.php* и обновите маршрут по умолчанию следующим образом:

**routes/web.php**
~~~php
<?php

Route::get('/', function () {
    return view('gantt');
});
~~~

Перезапустите приложение и проверьте, что отображается страница с Gantt:

![how_to_start_laravel_empty_gantt](/img/how_to_start_laravel_empty_gantt.png)

## Шаг 3. Создание моделей и миграций


Когда диаграмма Gantt отображается, следующим шагом будет подключение к базе данных и наполнение её данными.

### Создание базы данных

Не забудьте обновить настройки базы данных в файле *.env*, например:

**.env**
~~~php
DB_CONNECTION="mysql"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_DATABASE="gantt-test"
DB_USERNAME="root"
DB_PASSWORD=
~~~

Далее создайте [классы моделей](https://laravel.com/docs/11.x/eloquent) и
[миграции](https://laravel.com/docs/11.x/migrations) с помощью команд Artisan:

~~~js
php artisan make:model Task --migration
~~~

и

~~~js
php artisan make:model Link --migration
~~~

Затем найдите файлы миграций в папке `database/migrations` и определите [структуру базы данных](https://laravel.com/docs/8.x/migrations#migration-structure).
Ожидаемая Gantt структура базы данных описана [здесь](guides/loading.md#databasestructure).

Пример кода миграции для таблицы Tasks:

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

Ниже приведен код миграции для таблицы Links:

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

Запустите миграции командой:

~~~php
php artisan migrate
~~~

Для тестирования удобно сгенерировать тестовые данные.
Классы сидеров можно создать такими командами Artisan:

~~~php
php artisan make:seeder TasksTableSeeder
php artisan make:seeder LinksTableSeeder
~~~

Затем создайте папку *database/seeds*, если она отсутствует, откройте её и добавьте тестовые данные в **TasksTableSeeder**:

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

Далее обновите **DatabaseSeeder.php**, чтобы вызвать эти сидеры:

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

Наконец, заполните базу данных тестовыми данными с помощью команды:

~~~php
php artisan db:seed
~~~

### Определение классов моделей

Данные обрабатываются через [модели Eloquent](https://laravel.com/docs/11.x/eloquent). Ранее созданные классы задач и связей готовы к использованию с Gantt без изменений.

Однако, чтобы дерево проекта было раскрыто по умолчанию при загрузке задач на клиенте, можно добавить атрибут **open** в [JSON-ответ](https://laravel.com/docs/11.x/eloquent-serialization) класса Task. Без этого все ветки будут свернуты при первой загрузке.

Пример модели Task:

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

Модель Link не требует изменений:

**/app/Link.php**
~~~php
<?php

namespace App;

use IlluminateDatabaseEloquentModel;

class Link extends Model
{
}
~~~

## Шаг 4. Загрузка данных


Когда база данных и модели готовы, можно загрузить данные в диаграмму Gantt.
Так как клиент ожидает даты в определённом [формате](guides/supported-data-formats.md#json), создайте действие контроллера, возвращающее JSON в нужном виде:

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

Добавьте маршрут для этого действия, чтобы клиент мог запрашивать данные. Этот маршрут будет добавлен в файл маршрутов [api.php](https://laravel.com/docs/8.x/routing#basic-routing):

**routes/api.php**
~~~php
<?php

use IlluminateHttpRequest;
use AppHttpControllersGanttController;

Route::get('/data', 'GanttController@get');/*!*/
~~~

Теперь обновите представление для обращения к этому эндпоинту:

**resources/views/gantt.blade.php**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");

gantt.load("/api/data");/*!*/
~~~

Метод [gantt.load](api/method/load.md) отправляет AJAX-запрос по указанному адресу и ожидает [JSON-ответ](guides/supported-data-formats.md#json) в определённом формате.

Также, указание [date_format](api/config/date_format.md) позволяет Gantt корректно интерпретировать формат дат из источника данных на клиенте.

Теперь, при проверке приложения, задачи должны появиться на диаграмме Gantt:

![how_to_start_laravel_complete](/img/how_to_start_laravel_complete.png)

## Шаг 5. Сохранение изменений


В текущий момент диаграмма Gantt только читает данные с сервера. Следующим шагом будет обеспечение возможности сохранять изменения обратно в базу данных.

Клиент работает в REST-режиме, отправляя POST/PUT/DELETE-запросы для операций с задачами и связями. Форматы запросов и маршруты, используемые Gantt, описаны [здесь](guides/server-side.md#requestresponsedetails).

Для поддержки этого необходимо создать контроллеры для обработки CRUD-операций для обеих моделей, определить маршруты и включить возможность сохранения данных на стороне клиента.

### Добавление контроллеров

Начните с создания RESTful [ресурсных контроллеров](https://laravel.com/docs/11.x/controllers) для обеих моделей.
Эти контроллеры будут содержать методы для добавления, удаления и обновления данных.

#### Контроллер для задач

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

И [маршрут](https://laravel.com/docs/11.x/controllers#resource-controllers) для него:

**routes/api.php**
~~~php
<?php
 
use IlluminateHttpRequest;
 
Route::get('/data', 'GanttController@get');
Route::resource('task', 'TaskController');/*!*/
~~~

Несколько моментов по этому коду:

- Когда новая задача добавляется, её id возвращается клиенту в свойстве **tid** ответа.
- Для параметра **progress** задаётся значение по умолчанию. Многие параметры запроса необязательны, поэтому если на клиенте они не заданы, то не будут переданы на сервер.
- В JSON-ответе могут быть дополнительные свойства, все они доступны из [обработчика на клиенте](guides/server-side.md#errorhandling).

Далее создадим аналогичный контроллер для связей.

#### Контроллер для связей

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

И соответствующие маршруты:

**routes/api.php**
~~~php
<?php

use IlluminateHttpRequest;

Route::get('/data', 'GanttController@get');
Route::resource('task', 'TaskController');
Route::resource('link', 'LinkController'); /*!*/
~~~

### Включение сохранения данных на клиенте

Наконец, нужно настроить клиентскую часть для работы с только что созданным API:

**resources/views/gantt.blade.php**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
    
gantt.init("gantt_here");
    
gantt.load("/api/data");
    
var dp = new gantt.dataProcessor("/api");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

Теперь диаграмма Gantt полностью интерактивна - можно просматривать, добавлять, изменять и удалять задачи и связи.

![how_to_start_laravel_crud](/img/how_to_start_laravel_crud.png)

С дополнительными возможностями dhtmlxGantt вы можете ознакомиться в [наших руководствах](guides.md).

## Сохранение порядка задач {#storingtheorderoftasks}

На клиенте Gantt поддерживает [перетаскивание задач для изменения порядка](guides/reordering-tasks.md). Если эта возможность используется, порядок необходимо сохранять в базе данных. Общие сведения об этом приведены [здесь](guides/server-side.md#storingtheorderoftasks).

Добавим эту функцию в приложение.

### Включение сортировки задач на клиенте

Чтобы разрешить пользователям менять порядок задач в интерфейсе, обновите конфигурацию gantt в представлении *Index* следующим образом:

**resources/views/gantt.blade.php**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

### Включение сортировки задач на сервере

На сервере порядок будет храниться в столбце "sortorder". Полная схема таблицы задач может выглядеть так:

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

Либо можно добавить миграцию к существующей схеме:

~~~js
php artisan make:migration add_sortorder_to_tasks_table --table="tasks"
~~~

Миграционный файл будет содержать:

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

Далее выполните миграцию:

~~~
php artisan migrate
~~~

Теперь обновим CRUD-операции в контроллерах.

1 . Маршрут <b>GET /data</b> должен возвращать задачи, отсортированные по `sortorder`:

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
2 . При добавлении новой задачи ей нужно присвоить начальное значение `sortorder`:

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

3 . И, наконец, при изменении порядка задач сервер должен обновлять их порядок:

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

## Безопасность приложения


Компонент Gantt сам по себе не содержит защиту от угроз, таких как SQL-инъекции, XSS или CSRF-атаки. Обеспечение безопасности приложения остаётся задачей разработчиков серверной части. Подробнее об этом читайте [в соответствующей статье](guides/app-security.md).


## Устранение проблем


Если после выполнения всех шагов Gantt не отображает задачи или связи, статья [Устранение проблем интеграции с backend](guides/troubleshooting.md) поможет выявить и устранить распространённые проблемы.

## Что дальше


Теперь Gantt полностью работоспособен. Полный исходный код доступен на [GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel) для клонирования или скачивания и использования в проектах.

Дополнительную информацию о возможностях Gantt ищите в [наших руководствах](guides.md), а также есть инструкции по интеграции Gantt с другими серверными фреймворками в [решениях](integrations/howtostart-guides.md).

