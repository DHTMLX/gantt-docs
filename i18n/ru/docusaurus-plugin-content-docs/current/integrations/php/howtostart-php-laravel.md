---
title: "dhtmlxGantt с PHP: Laravel"
sidebar_label: "PHP: Laravel"
---

# dhtmlxGantt с PHP: Laravel 

Этот учебник описывает, как добавить dhtmlxGantt в приложение [Laravel](https://laravel.com/).

Есть инструкции, предназначенные для построения серверной интеграции с помощью других платформ:

- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

:::note
Полный исходный код доступен на GitHub: [available on GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel).
:::

Вы можете посмотреть видео-руководство, которое показывает, как создать диаграмму Gantt с использованием PHP Laravel.

<iframe width="704" height="400" src="https://www.youtube.com/embed/eu5R86a-9jA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Шаг 1. Инициализация проекта

### Создание проекта

Создайте новое приложение с помощью [Composer](https://getcomposer.org/):

~~~php
composer create-project laravel/laravel gantt-laravel-app
~~~

Это займёт минуту на загрузку и создание всех необходимых файлов.
После завершения вы можете проверить корректность на данный момент. Перейдите в папку проекта и выполните миграции базы данных:

~~~php
cd gantt-laravel-app
php artisan migrate
~~~

Теперь вы можете запустить сервер:

~~~php
php artisan serve
~~~

На этом этапе вы должны увидеть страницу Laravel по умолчанию:

![how_to_start_laravel_blank_page](/img/how_to_start_laravel_blank_page.png)

## Шаг 2. Добавление Gantt на страницу

### Добавление представления

Во-первых, добавим новую страницу с dhtmlxGantt в наше приложение.
Перейдите в папку *resources/views* и создайте новое представление с именем *gantt.blade.php*:


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

Здесь мы определили простую HTML-разметку, добавили источники dhtmlxGantt из [CDN](guides/cdn-links-list.md) и инициализировали gantt с использованием метода [](api/method/init.md).

Обратите внимание, что мы также задали **100% высоту** для тела документа и для контейнера gantt. Gantt будет использовать размер своего контейнера, поэтому нужны некоторые начальные размеры.

### Изменение маршрута по умолчанию

После добавления новой страницы нам нужно сделать её доступной через браузер. Для этого руководства мы сделаем наш gantt страницей по умолчанию приложения.

Перейдите в *routes/web.php* и измените маршрут по умолчанию:


~~~php title="routes/web.php"
<?php

Route::get('/', function () {
    return view('gantt');
});
~~~

Запустите приложение снова, чтобы убедиться, что всё сработало:

![how_to_start_laravel_empty_gantt](/img/how_to_start_laravel_empty_gantt.png)

## Шаг 3. Создание моделей и миграций

Итак, у нас пустая диаграмма Gantt. Свяжем её с базой данных и заполним данными.

### Создание базы данных

Не забудьте обновить конфигурацию базы данных в *.env*, например:


~~~php title=".env"
DB_CONNECTION="mysql"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_DATABASE="gantt-test"
DB_USERNAME="root"
DB_PASSWORD=
~~~


Следующий шаг — создать [модели](https://laravel.com/docs/12.x/eloquent) и [миграции](https://laravel.com/docs/12.x/migrations). Вы можете сгенерировать классы и файлы миграций с помощью команды Artisan:

~~~js
php artisan make:model Task --migration
~~~

и 

~~~js
php artisan make:model Link --migration
~~~

После этого найдите миграции в папке `database/migrations` и определите [схему базы данных](https://laravel.com/docs/12.x/migrations#migration-structure). 
Ожидаемую схему базы данных для gantt можно найти [здесь](guides/loading.md#databasestructure).

Код для таблицы Tasks выглядит так:


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

Ниже приведён код для таблицы Links:


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

И запустите миграцию:

~~~php
php artisan migrate
~~~

Пока мы здесь, можно сгенерировать тестовые данные для нашего приложения. 
Сгенерируйте [seeder](https://laravel.com/docs/12.x/seeding) класс с помощью команды artisan:

~~~php
php artisan make:seeder TasksTableSeeder
php artisan make:seeder LinksTableSeeder
~~~

Теперь откройте папку *database/seeders* и добавьте данные в **TasksTableSeeder**:


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
Затем повторите то же для **LinksTableSeeder**:


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
И вызывайте seeders таблиц из **DatabaseSeeder.php**:


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

После этого можно заполнить базу данных из командной строки:

~~~php
php artisan db:seed
~~~

### Определение классов моделей

Данные управляются через [Eloquent model](https://laravel.com/docs/12.x/eloquent) классы. Мы уже сгенерировали классы для задач и связей на предыдущем этапе. Они готовы к использованию и не требуют изменений для работы с gantt. 

Однако мы можем добавить в модель Task открытый [атрибут](guides/loading.md#dataproperties) до [JSON-ответа](https://laravel.com/docs/12.x/eloquent-serialization). Это развернёт дерево проекта, когда задачи будут загрузены на клиентскую сторону. В противном случае все ветви будут по умолчанию закрыты: 

Модель Task будет выглядеть так, как в примере:


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

А модель Link не требует изменений:


~~~php title="/app/Models/Link.php"
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
}
~~~

## Шаг 4. Загрузка данных

После создания базы данных и определения моделей мы можем загрузить данные в наш gantt. 
Клиентская сторона требует даты в [следующем формате](guides/supported-data-formats.md), поэтому давайте создадим контроллер с действием, которое формирует такой JSON:


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

И зарегистрируем маршрут, чтобы клиент мог вызвать это действие. Учтите, что мы добавим маршрут в файл маршрутов [api.php](https://laravel.com/docs/12.x/routing#basic-routing):


~~~php title="routes/api.php"
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GanttController;

Route::get('/data', [GanttController::class, 'get']); /*!*/
~~~

Теперь настройте Laravel так, чтобы корректно загружать API-маршруты.
Создайте **RouteServiceProvider.php** командой:

~~~php
php artisan make:provider RouteServiceProvider
~~~
Затем обновите файл следующим содержимым:


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

И, наконец, вызовите это действие из представления:


~~~js title="resources/views/gantt.blade.php"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");

gantt.load("/api/data");/*!*/
~~~
[gantt.load](api/method/load.md) отправляет AJAX-запрос к указанному URL и ожидает [JSON-ответ](guides/supported-data-formats.md), как мы определили ранее.

Также обратите внимание, что мы указали значение [date_format](api/config/date_format.md). 
Так мы сообщаем gantt, в каком формате дат будет источник данных, чтобы клиентская сторона могла их распарсить. 

Если сейчас проверить приложение, вы увидите, что в нашем gantt-диаграмме появились задачи:


![how_to_start_laravel_complete](/img/how_to_start_laravel_complete.png)

## Шаг 5. Сохранение изменений

Пока что наш gantt может читать данные с бэкенда. Давайте сделаем его записывать изменения обратно в базу данных.

Клиентская сторона будет работать в REST-режиме, то есть будет отправлять POST/PUT/DELETE-запросы для действий с задачами и связями. 
Формат запросов и все маршруты, которые будет использовать gantt, можно найти [здесь](guides/server-side.md#requestresponsedetails). 

Что нам нужно сейчас — определить контроллеры, которые обрабатывают действия над обеими моделями, создать для них маршруты и включить сохранение данных на стороне клиента.

### Добавление контроллеров

Начнем с контроллеров. Создадим один RESTful [resource controller](https://laravel.com/docs/12.x/controllers) для каждой модели. Он будет содержать методы для добавления/удаления и обновления модели. 

#### Контроллер для задач

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


#### Конфигурация модели Task

Чтобы методы контроллера работали, необходимо сконфигурировать модель `Task` для массового присваивания. [Защита Laravel от массового присваивания](https://laravel.com/docs/11.x/eloquent#mass-assignment) требует явно указать, какие атрибуты можно заполнять с помощью методов `create()` и `update()`. 
Обновите модель Task, чтобы включить свойство `$fillable`:


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

Массив `$fillable` указывает, какие поля могут быть массово заполняемыми. Это механизм безопасности, который защищает от обновления нежелательных полей через пользовательский ввод.



И маршрут к нему:


~~~php title="routes/api.php"
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GanttController;
use App\Http\Controllers\TaskController;

Route::get('/data', [GanttController::class, 'get']);
Route::resource('task', TaskController::class); /*!*/
~~~

Несколько замечаний по этому коду:

- Когда новая задача вставляется, мы возвращаем её id клиенту в свойстве `tid` в ответном объекте
- Мы задаём значение по умолчанию параметра `progress`. 
Многие параметры запроса являются необязательными, что означает: если для задачи на клиентской стороне они не заданы, они не будут отправлены на сервер
- Ответ JSON может содержать любое количество дополнительных свойств, к которым можно обратиться из [клиентского обработчика](guides/server-side.md#error-handling)

Теперь давайте реализуем то же для контроллера Link.

#### Контроллер для связей

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

#### Конфигурация модели Link

Актуализируем модель Link аналогично Task для массового присваивания:

~~~php title="app/Models/Link.php"
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $fillable = ['type', 'source', 'target']; /*!*/
}
~~~


И её маршруты:


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

### Включение сохранения данных на клиентской стороне

Наконец, мы [настроим клиентскую часть](guides/server-side.md#technique) для использования только что реализованного API:


~~~js title="resources/views/gantt.blade.php"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
gantt.init("gantt_here");
gantt.load("/api/data");

const dp = gantt.createDataProcessor({ /*!*/
	url: "/api", /*!*/
	mode: "REST" /*!*/
}); /*!*/
~~~

Теперь у вас полностью интерактивная диаграмма Gantt с возможностью просматривать, добавлять, обновлять и удалять задачи и связи.

![how_to_start_laravel_crud](/img/how_to_start_laravel_crud.png)

Пожалуйста, смотрите другие наши [решения](guides.md) для более подробных возможностей dhtmlxGantt, а также руководства по интеграции Gantt с другими фреймворками бэкенда. 

## Сохранение порядка задач {#storingtheorderoftasks}

Клиентская часть gantt позволяет [перемешивать задачи] с помощью перетаскивания. Поэтому, если вы используете эту функцию, вам нужно сохранять этот порядок в базе данных. 
Вы можете ознакомиться с общей [описанием здесь](guides/server-side.md#storingtheorderoftasks).

Давайте добавим эту возможность в наше приложение.

### Включение переупорядочивания задач на клиенте

Сначала нужно разрешить пользователям менять порядок задач в интерфейсе. Откройте представление *Index* и обновите конфигурацию gantt:


~~~js title="resources/views/gantt.blade.php"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

### Включение переупорядочивания задач на сервере

Теперь давайте перенесём эти изменения на бэкенд. Мы будем хранить порядок в столбце с именем "sortorder". Полная структура таблицы задач может выглядеть следующим образом:

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

Или вы можете добавить миграцию к той схеме, которую мы сгенерировали ранее:

~~~js
php artisan make:migration add_sortorder_to_tasks_table --table=tasks
~~~

Код файла миграции:

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

И примените миграцию:

~~~
php artisan migrate
~~~

После этого нам нужно обновить CRUD, определённый в наших контроллерах.

1 . <b>GET /data</b> должен возвращать задачи в отсортированном порядке по столбцу `sortorder`: 


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
2 . Новые задачи должны получать начальное значение `sortorder`:


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

3 . Наконец, когда пользователь меняет порядок задач, порядковые номера должны [обновляться](guides/server-side.md#storingtheorderoftasks):


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


## Безопасность приложения

Gantt не предоставляет средств защиты от различных угроз, таких как SQL-инъекции, XSS и CSRF-атаки. Важным является то, что ответственность за безопасность приложения лежит на разработчиках, реализующих бэкенд. Подробнее читайте в соответствующей статье: guides/app-security.md).


## Устранение неполадок

Если вы выполнили вышеуказанные шаги по интеграции Gantt с PHP, но Gantt не рендерит задачи и связи на странице, посмотрите статью [](guides/troubleshooting.md). Она описывает способы выявления корня проблемы.

## Что дальше

Теперь у вас полностью функционирующая gantt. Полный код можно просмотреть на [GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel), клонировать или скачать его и использовать в ваших проектах.

Вы также можете ознакомиться с [нашими решениями](guides.md) по разнообразным функциям gantt или с руководствами по интеграции Gantt с другими бэкэнд-фреймворками ([интеграционные решения](integrations/howtostart-guides.md)).