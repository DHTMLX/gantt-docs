---
title: "dhtmlxGantt mit PHP: Laravel"
sidebar_label: "PHP: Laravel"
---

# dhtmlxGantt mit PHP: Laravel 

Dieses Tutorial beschreibt, wie man dhtmlxGantt in eine [Laravel](https://laravel.com/) App integriert.

Es gibt Tutorials, die die serverseitige Integration mit Hilfe anderer Plattformen behandeln:

- [dhtmlxGantt mit ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt mit ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt mit Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt mit Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt mit PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt mit Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt mit Ruby on Rails](integrations/other/howtostart-ruby.md)

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/gantt-howto-php-laravel).
:::

Sie können sich die Videoanleitung ansehen, die zeigt, wie man mit PHP Laravel ein Gantt-Diagramm erstellt.

<iframe width="704" height="400" src="https://www.youtube.com/embed/eu5R86a-9jA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Schritt 1. Initialisierung eines Projekts

### Neues Projekt erstellen

Erstellen Sie eine neue Anwendung mit [Composer](https://getcomposer.org/):

~~~php
composer create-project laravel/laravel gantt-laravel-app
~~~

Es sollte eine Minute dauern, alle notwendigen Dateien herunterzuladen und zu erstellen.
Sobald alles erledigt ist, können Sie prüfen, ob bisher alles korrekt funktioniert. Wechseln Sie in das Projektverzeichnis und führen Sie die Datenbankmigrationen aus:

~~~php
cd gantt-laravel-app
php artisan migrate
~~~

Nun können Sie den Server starten:

~~~php
php artisan serve
~~~

An diesem Punkt sollten Sie eine Standard-Laravel-Seite sehen:

![how_to_start_laravel_blank_page](/img/how_to_start_laravel_blank_page.png)

## Schritt 2. Hinzufügen von Gantt zur Seite

### Eine View hinzufügen

Zunächst fügen wir unserer App eine neue Seite mit dhtmlxGantt hinzu.
Wechseln Sie in den Ordner *resources/views* und erstellen Sie eine neue View mit dem Namen *gantt.blade.php*:


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

Hier haben wir ein einfaches HTML-Layout definiert, die Quellen von dhtmlxGantt von [CDN](guides/cdn-links-list.md) hinzugefügt und gantt mit der **init**-Methode initialisiert.
Beachten Sie, dass wir auch **100% Höhe** für den Dokumentenkörper und den Gantt-Container festgelegt haben. Gantt verwendet die Größe seines Containers, daher sind einige Anfangsgrößen erforderlich.

### Die Standardroute ändern

Nachdem wir eine neue Seite hinzugefügt haben, muss sie über einen Browser zugänglich sein. In diesem Tutorial werden wir unseren gantt zur Standardseite einer App machen.

Gehen Sie zu *routes/web.php* und ändern Sie die Standardroute:


~~~php title="routes/web.php"
<?php

Route::get('/', function () {
    return view('gantt');
});
~~~

Starten Sie die Anwendung erneut, um sicherzustellen, dass es funktioniert hat:

![how_to_start_laravel_empty_gantt](/img/how_to_start_laravel_empty_gantt.png)

## Schritt 3. Erstellen von Modellen und Migrationen

Wir haben also ein leeres Gantt-Diagramm. Verbinden wir es mit der Datenbank und füllen es mit Daten.

### Erstellen einer Datenbank

Aktualisieren Sie die Datenbankkonfiguration in *.env*, zum Beispiel:


~~~php title=".env"
DB_CONNECTION="mysql"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_DATABASE="gantt-test"
DB_USERNAME="root"
DB_PASSWORD=
~~~


Der nächste Schritt besteht darin, [Modellklassen](https://laravel.com/docs/12.x/eloquent) und
[Migrationen](https://laravel.com/docs/12.x/migrations) zu erstellen. Sie können Klassen und Migration-Dateien mit dem Artisan-Befehl erzeugen:

~~~js
php artisan make:model Task --migration
~~~

und 

~~~js
php artisan make:model Link --migration
~~~

Danach finden Sie die Migrationen im Ordner `database/migrations` und definieren ein [Datenbankschema](https://laravel.com/docs/12.x/migrations#migration-structure). 
Sie können das von gantt erwartete Datenbankschema [hier](guides/loading.md#databasestructure) finden.

Der Code für die Tasks-Tabelle sieht so aus:


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

Nachfolgend finden Sie den Code für die Links-Tabelle:


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

Und führen Sie die Migration aus:

~~~php
php artisan migrate
~~~

Wärenddessen können wir auch einige Testdaten für unsere App erzeugen. 
Erzeugen Sie eine [Seeder]-Klasse mit dem Artisan-Befehl:

~~~php
php artisan make:seeder TasksTableSeeder
php artisan make:seeder LinksTableSeeder
~~~

Öffnen Sie nun den Ordner *database/seeders* und fügen Sie dem **TasksTableSeeder** einige Daten hinzu:


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
Dann dasselbe für **LinksTableSeeder**:


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
Und rufen Sie die Tabellen-Seeder von **DatabaseSeeder.php** auf:


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

Danach können wir unsere Datenbank über die Befehlszeile seeden:

~~~php
php artisan db:seed
~~~

### Definieren von Modellklassen

Die Daten werden über die [Eloquent-Modelle](https://laravel.com/docs/12.x/eloquent) verwaltet. Wir haben bereits Klassen für Tasks und Links im vorherigen Schritt erzeugt.
Sie sind einsatzbereit und benötigen keine Änderungen, um mit dem gantt zu arbeiten. 

Was wir jedoch tun können, ist, dem Task-Modell ein **open**-[Attribut] der Task-Klasse (guides/loading.md#dataproperties) zur 
[JSON-Antwort](https://laravel.com/docs/12.x/eloquent-serialization) hinzuzufügen. Dadurch wird der Projektbaum erweitert, wenn Aufgaben auf der Client-Seite geladen werden. 
Andernfalls würden alle Verzweigungen zunächst geschlossen bleiben: 

Das Task-Modell sieht so aus:


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

Und das Link-Modell benötigt keine Änderungen:


~~~php title="/app/Models/Link.php"
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
}
~~~

## Schritt 4. Laden von Daten

Sobald die Datenbank erstellt ist und die Modelle definiert sind, können wir Daten in unseren gantt laden. 
Die Client-Seite erwartet Datumsangaben im [folgenden Format](guides/supported-data-formats.md), daher erstellen wir einen Controller mit einer Aktion, die solches JSON erzeugt:


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

Und registrieren Sie eine Route, damit der Client diese Aktion aufrufen kann. Beachten Sie, dass wir die Route zur [api.php Routes-Datei](https://laravel.com/docs/12.x/routing#basic-routing) hinzufügen:


~~~php title="routes/api.php"
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GanttController;

Route::get('/data', [GanttController::class, 'get']); /*!*/
~~~

Nun konfigurieren wir Laravel so, dass API-Routen korrekt geladen werden.
Erzeugen Sie **RouteServiceProvider.php** mit dem folgenden Befehl:

~~~php
php artisan make:provider RouteServiceProvider
~~~
Aktualisieren Sie anschließend die Datei mit folgendem Inhalt:


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

Und rufen Sie diese Aktion schließlich aus der View auf:


~~~js title="resources/views/gantt.blade.php"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");

gantt.load("/api/data");/*!*/
~~~
[gantt.load](api/method/load.md) sendet eine AJAX-Anfrage an die angegebene URL und erwartet eine [JSON-Antwort], wie wir vorher definiert haben.

Außerdem haben wir den [date_format](api/config/date_format.md) Wert angegeben. So sagen wir dem Gantt, welches Datumsformat die Datenquelle verwendet, damit die Client-Seite sie parsen kann. 

Wenn Sie die App jetzt prüfen, sollten Sie sehen, dass nun Aufgaben in unserem Gantt-Diagramm vorhanden sind:

![how_to_start_laravel_complete](/img/how_to_start_laravel_complete.png)

## Schritt 5. Änderungen speichern

Für jetzt kann unser gantt Daten vom Backend lesen. Lassen Sie es Änderungen wieder in die Datenbank schreiben.

Die Client-Seite wird im REST-Modus arbeiten, was bedeutet, dass sie POST/PUT/DELETE-Anfragen für Aufgaben- und Link-Aktionen sendet. 
Sie finden das Format der Anfragen und alle Routen, die der gantt verwenden wird [hier](guides/server-side.md#requestresponsedetails). 

Was wir jetzt brauchen, ist die Definition von Controllern, die Aktionen beider Modelle behandeln, Routen dafür erstellen und das Speichern von Daten auf der Client-Seite ermöglichen.

### Controller hinzufügen

Fangen wir mit den Controllern an. Wir erstellen jeweils einen RESTful [Resource Controller](https://laravel.com/docs/12.x/controllers) für jedes Modell. 
Er wird Methoden zum Hinzufügen/Löschen und Aktualisieren des Modells enthalten. 

#### Controller für Tasks

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


#### Konfigurieren des Task-Modells

Bevor die Controller-Methoden funktionieren, müssen wir das `Task`-Modell so konfigurieren, dass Massenzuweisung erlaubt ist. Die Massenzuweisungssicherheit von Laravel erfordert, explizit anzugeben, welche Attribute mit den `create()`- und `update()`-Methoden befüllt werden dürfen. 
Aktualisieren Sie Ihr Task-Modell, um die `$fillable`-Eigenschaft einzuschließen:


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

Das `$fillable`-Array gibt an, welche Felder massenweise zugewiesen werden dürfen. Dies ist eine Sicherheitsvorkehrung, die verhindert, dass unerwünschte Felder durch Benutzereingaben aktualisiert werden.



Und eine [Route](https://laravel.com/docs/12.x/controllers#resource-controllers) dafür:


~~~php title="routes/api.php"
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GanttController;
use App\Http\Controllers\TaskController;

Route::get('/data', [GanttController::class, 'get']);
Route::resource('task', TaskController::class); /*!*/
~~~

Ein paar Hinweise zu diesem Code:

- Wenn eine neue Aufgabe eingefügt wird, geben wir ihre ID dem Client in der Eigenschaft **tid** der Antwort zurück
- Wir weisen dem Parameter **progress** einen Standardwert zu. 
Viele Anforderungsparameter sind optional, was bedeutet, dass eine clientseitige Aufgabe sie nicht besitzt, sie daher nicht an die Serveraktion sendet.
- Die Antwort-JSON kann beliebig viele zusätzliche Eigenschaften enthalten, sie können alle vom [client-seitigen Handler](guides/server-side.md#error-handling) abgerufen werden

Nun implementieren wir dasselbe für einen LinkController.

#### Controller für Links

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

#### Konfigurieren des Link-Modells

Ähnlich wie beim Task-Modell müssen wir auch das Link-Modell für die Massenzuweisung konfigurieren:

~~~php title="app/Models/Link.php"
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $fillable = ['type', 'source', 'target']; /*!*/
}
~~~


Und seine Routen:


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

### Datenspeicherung auf der Client-Seite aktivieren

Schließlich konfigurieren wir [die Client-Seite](guides/server-side.md#technique), um die soeben implementierte API zu verwenden:


~~~js title="resources/views/gantt.blade.php"
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
gantt.init("gantt_here");
gantt.load("/api/data");

const dp = gantt.createDataProcessor({ /*!*/
	url: "/api", /*!*/
	mode: "REST" /*!*/
}); /*!*/
~~~

Nun haben Sie ein vollständig interaktives Gantt-Diagramm mit der Möglichkeit, Aufgaben und Links zu betrachten, hinzuzufügen, zu aktualisieren und zu löschen.

![how_to_start_laravel_crud](/img/how_to_start_laravel_crud.png)

Bitte sehen Sie sich weitere [unserer Guides](guides.md) für weitere Funktionen von dhtmlxGantt an oder Tutorials zur [Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md).

## Speichern der Reihenfolge der Aufgaben {#storingtheorderoftasks}

Der clientseitige Gantt erlaubt das [Neuordnen von Aufgaben](guides/reordering-tasks.md) per Drag & Drop. Wenn Sie diese Funktion verwenden, müssen Sie diese Reihenfolge in der Datenbank speichern. 
Sie können die gängige [Beschreibung hier](guides/server-side.md#storingtheorderoftasks) nachlesen.

Lassen Sie uns diese Funktion nun zu unserer App hinzufügen.

### Aufgaben-Neuordnung auf dem Client aktivieren

Zuallererst müssen wir den Benutzern erlauben, die Aufgabenreihenfolge in der UI zu ändern. Öffnen Sie die *Index*-Ansicht und aktualisieren Sie die Konfiguration von gantt:


~~~js title="resources/views/gantt.blade.php"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

### Aufgaben-Neuordnung auf dem Server aktivieren

Nun spiegeln wir diese Änderungen im Backend wider. Wir werden die Reihenfolge in der Spalte namens "sortorder" speichern. Ein vollständiges Schema der Aufgaben kann wie folgt aussehen:

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

Oder Sie können dem zuvor erstellten Schema eine Migration hinzufügen:

~~~js
php artisan make:migration add_sortorder_to_tasks_table --table=tasks
~~~

Der Code der Migrationsdatei ist:

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

Und führen Sie die Migration aus:

~~~
php artisan migrate
~~~

Danach müssen wir das CRUD in unseren Controllern aktualisieren.

1 . <b>GET /data</b> muss Aufgaben sortiert nach der `sortorder`-Spalte zurückgeben:


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
2 . Neu hinzugefügte Aufgaben müssen den Anfangswert `sortorder` erhalten:


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

3 . Schließlich, wenn ein Benutzer Aufgaben neu ordnet, müssen die Aufgabenreihenfolgen [aktualisiert](guides/server-side.md#storingtheorderoftasks) werden:


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


## Anwendungssicherheit

Gantt bietet keine Mittel, um eine Anwendung vor verschiedenen Bedrohungen zu schützen, wie SQL-Injektionen oder XSS- und CSRF-Angriffe. Es ist wichtig, dass die Verantwortung für die Sicherheit der Anwendung von den Entwicklern übernommen wird, die das Backend implementieren. Lesen Sie die Details [im entsprechenden Artikel](guides/app-security.md).


## Troubleshooting

Falls Sie die oben beschriebenen Schritte zur Integration von Gantt mit PHP abgeschlossen haben, Gantt aber keine Aufgaben und Links auf einer Seite rendert, schauen Sie sich den [](guides/troubleshooting.md) Artikel an. Er beschreibt Wege, die Wurzeln der Probleme zu identifizieren.

## Was kommt als Nächstes

Nun haben Sie ein vollständig funktionsfähiges Gantt. Den vollständigen Code können Sie auf [GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel) ansehen, klonen oder herunterladen und für Ihre Projekte verwenden.

Sie können auch [Guides zu den zahlreichen Funktionen von gantt](guides.md) oder Tutorials zur [Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md) prüfen.