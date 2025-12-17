---
title: "dhtmlxGantt mit PHP: Laravel"
sidebar_label: "PHP: Laravel"
---

dhtmlxGantt mit PHP: Laravel 
=====================

In diesem Tutorial wird erklärt, wie Sie dhtmlxGantt in eine [Laravel](https://laravel.com/)-Anwendung integrieren.

Es stehen auch Tutorials für die serverseitige Integration mit anderen Plattformen zur Verfügung:

- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

:::note
Der vollständige Quellcode ist [auf GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel) verfügbar.
:::

Zusätzlich zeigt ein Video-Guide, wie ein Gantt-Diagramm mit PHP Laravel erstellt wird.

<iframe width="704" height="400" src="https://www.youtube.com/embed/eu5R86a-9jA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Schritt 1. Initialisieren eines Projekts
-----------------------

### Ein Projekt erstellen

Beginnen Sie mit dem Erstellen einer neuen Laravel-Anwendung mit [Composer](https://getcomposer.org/):

~~~php
composer create-project laravel/laravel gantt-laravel-app
~~~

Dieser Vorgang lädt und richtet alle notwendigen Dateien ein. 
Nach Abschluss können Sie mit den folgenden Befehlen prüfen, ob alles korrekt eingerichtet wurde:

~~~php
cd gantt-laravel-app
php artisan serve
~~~

An diesem Punkt sollte die Standard-Willkommensseite von Laravel angezeigt werden:

![how_to_start_laravel_blank_page](/img/how_to_start_laravel_blank_page.png)

Schritt 2. Hinzufügen von Gantt zur Seite
-----------------------

### Eine View hinzufügen

Als Nächstes fügen Sie eine neue Seite hinzu, die dhtmlxGantt in die App einbindet.
Navigieren Sie zum Verzeichnis *resources/views* und erstellen Sie eine neue View mit dem Namen *gantt.blade.php*:

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

Dies richtet ein einfaches HTML-Layout ein, bindet dhtmlxGantt-Ressourcen vom [CDN](guides/cdn-links-list.md) ein und initialisiert das Gantt-Diagramm mit der [init](api/method/init.md) Methode.

Beachten Sie, dass sowohl der Body des Dokuments als auch der Gantt-Container auf **100% Höhe** gesetzt sind. Da das Gantt-Diagramm sich an die Größe seines Containers anpasst, ist die Angabe dieser Dimensionen wichtig.

### Die Standardroute ändern

Nachdem Sie die neue Seite hinzugefügt haben, muss sie im Browser erreichbar sein. In diesem Beispiel wird die Gantt-Seite als Standardseite der App festgelegt.

Öffnen Sie *routes/web.php* und aktualisieren Sie die Standardroute wie folgt:

**routes/web.php**
~~~php
<?php

Route::get('/', function () {
    return view('gantt');
});
~~~

Starten Sie die App neu und prüfen Sie, ob die Gantt-Seite angezeigt wird:

![how_to_start_laravel_empty_gantt](/img/how_to_start_laravel_empty_gantt.png)

Schritt 3. Erstellen von Modellen und Migrationen
---------------------

Nachdem das Gantt-Diagramm angezeigt wird, besteht der nächste Schritt darin, es mit einer Datenbank zu verbinden und mit Daten zu füllen.

### Eine Datenbank erstellen

Aktualisieren Sie Ihre Datenbankeinstellungen in der *.env*-Datei, zum Beispiel:

**.env**
~~~php
DB_CONNECTION="mysql"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_DATABASE="gantt-test"
DB_USERNAME="root"
DB_PASSWORD=
~~~


Erstellen Sie dann [Model-Klassen](https://laravel.com/docs/11.x/eloquent) und
[Migrationen](https://laravel.com/docs/11.x/migrations) mit Artisan-Befehlen:

~~~js
php artisan make:model Task --migration
~~~

und 

~~~js
php artisan make:model Link --migration
~~~

Suchen Sie anschließend die Migrationsdateien im Ordner `database/migrations` und definieren Sie das [Datenbankschema](https://laravel.com/docs/8.x/migrations#migration-structure). 
Das von Gantt erwartete Datenbankschema finden Sie [hier](guides/loading.md#databasestructure).

Hier ist der Migration-Code für die Tasks-Tabelle:

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

Nachfolgend der Migration-Code für die Links-Tabelle:

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

Führen Sie die Migrationen mit folgendem Befehl aus:

~~~php
php artisan migrate
~~~

Während der Einrichtung ist es hilfreich, einige Beispieldaten für Tests zu generieren. 
Seeder-Klassen können mit diesen Artisan-Befehlen erstellt werden:

~~~php
php artisan make:seeder TasksTableSeeder
php artisan make:seeder LinksTableSeeder
~~~

Erstellen Sie dann den Ordner *database/seeds*, falls er nicht existiert, öffnen Sie ihn und fügen Sie Beispieldaten zu **TasksTableSeeder** hinzu:

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

Aktualisieren Sie anschließend **DatabaseSeeder.php**, um diese Seeder aufzurufen:

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

Seedern Sie abschließend die Datenbank über die Kommandozeile:

~~~php
php artisan db:seed
~~~

### Modellklassen definieren

Die Daten werden über [Eloquent-Modelle](https://laravel.com/docs/11.x/eloquent) verarbeitet. Die zuvor erstellten Task- und Link-Klassen können ohne Änderungen mit Gantt verwendet werden.

Damit der Projektbaum beim Laden der Aufgaben auf der Client-Seite standardmäßig ausgeklappt ist, kann jedoch ein **open**-Attribut zur [JSON-Antwort](https://laravel.com/docs/11.x/eloquent-serialization) der Task-Klasse hinzugefügt werden. Ohne dieses wären alle Zweige zunächst eingeklappt.

So sieht das Task-Modell aus:

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

Das Link-Modell benötigt keine Änderungen:

**/app/Link.php**
~~~php
<?php

namespace App;

use IlluminateDatabaseEloquentModel;

class Link extends Model
{
}
~~~

Schritt 4. Daten laden
-------------------

Mit der Datenbank und den Modellen können die Daten in das Gantt-Diagramm geladen werden.
Da der Client Datumsangaben in einem bestimmten [Format](guides/supported-data-formats.md#json) erwartet, erstellen Sie eine Controller-Action, die das JSON entsprechend zurückgibt:

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

Fügen Sie eine Route für diese Action hinzu, damit der Client die Daten anfordern kann. Diese Route wird in der [api.php-Routen-Datei](https://laravel.com/docs/8.x/routing#basic-routing) ergänzt:

**routes/api.php**
~~~php
<?php

use IlluminateHttpRequest;
use AppHttpControllersGanttController;

Route::get('/data', 'GanttController@get');/*!*/
~~~

Aktualisieren Sie abschließend die View, um diesen Endpunkt aufzurufen:

**resources/views/gantt.blade.php**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";/*!*/

gantt.init("gantt_here");

gantt.load("/api/data");/*!*/
~~~

Die Methode [gantt.load](api/method/load.md) sendet eine AJAX-Anfrage an die angegebene URL und erwartet eine [JSON-Antwort](guides/supported-data-formats.md#json) wie definiert.

Durch die Angabe des [date_format](api/config/date_format.md) weiß Gantt, welches Datumsformat die Datenquelle verwendet und kann die Daten auf der Client-Seite korrekt parsen.

Nun sollten beim Prüfen der App die Aufgaben im Gantt-Diagramm erscheinen:

![how_to_start_laravel_complete](/img/how_to_start_laravel_complete.png)

Schritt 5. Änderungen speichern
-----------------------------------

Derzeit liest das Gantt-Diagramm Daten vom Backend. Im nächsten Schritt soll es möglich sein, Änderungen wieder in die Datenbank zu speichern.

Der Client arbeitet im REST-Modus und sendet POST/PUT/DELETE-Anfragen für Aufgaben- und Link-Aktionen. Die von Gantt verwendeten Anfrageformate und Routen sind [hier](guides/server-side.md#requestresponsedetails) beschrieben.

Dazu müssen Controller erstellt werden, die CRUD-Operationen für beide Modelle behandeln, die Routen definiert und das Speichern von Daten auf der Client-Seite aktiviert werden.

### Controller hinzufügen

Beginnen Sie mit dem Erstellen von RESTful [Resource Controllern](https://laravel.com/docs/11.x/controllers) für beide Modelle.
Diese Controller enthalten Methoden zum Hinzufügen, Löschen und Aktualisieren von Daten.

####Controller für Aufgaben

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

Und eine [Route](https://laravel.com/docs/11.x/controllers#resource-controllers) dafür:

**routes/api.php**
~~~php
<?php
 
use IlluminateHttpRequest;
 
Route::get('/data', 'GanttController@get');
Route::resource('task', 'TaskController');/*!*/
~~~

Einige Hinweise zu diesem Code:

- Wenn eine neue Aufgabe hinzugefügt wird, wird deren ID im **tid**-Feld der Antwort an den Client zurückgesendet.
- Für den **progress**-Parameter wird ein Standardwert festgelegt. Da viele Anfrageparameter optional sind, werden sie nicht an den Server gesendet, wenn sie auf der Client-Seite nicht gesetzt wurden.
- Das Antwort-JSON kann zusätzliche Eigenschaften enthalten, auf die alle im [Client-seitigen Handler](guides/server-side.md#errorhandling) zugegriffen werden kann.

Als Nächstes erstellen wir einen ähnlichen Controller für Links.

####Controller für Links

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

Und die entsprechenden Routen:

**routes/api.php**
~~~php
<?php

use IlluminateHttpRequest;

Route::get('/data', 'GanttController@get');
Route::resource('task', 'TaskController');
Route::resource('link', 'LinkController'); /*!*/
~~~

### Aktivierung des Datenspeicherns auf der Client-Seite

Abschließend muss die Client-Seite so konfiguriert werden, dass sie mit der gerade eingerichteten API arbeitet:

**resources/views/gantt.blade.php**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
    
gantt.init("gantt_here");
    
gantt.load("/api/data");
    
var dp = new gantt.dataProcessor("/api");/*!*/
dp.init(gantt);/*!*/
dp.setTransactionMode("REST");/*!*/
~~~

An diesem Punkt ist das Gantt-Diagramm vollständig interaktiv und ermöglicht das Anzeigen, Hinzufügen, Aktualisieren und Löschen von Aufgaben und Links.

![how_to_start_laravel_crud](/img/how_to_start_laravel_crud.png)

Weitere Funktionen von dhtmlxGantt finden Sie in [unseren Anleitungen](guides.md).

## Speichern der Aufgabenreihenfolge {#storingtheorderoftasks}

Das clientseitige Gantt unterstützt das [Verschieben und Neuordnen von Aufgaben per Drag & Drop](guides/reordering-tasks.md). Wenn diese Funktion genutzt wird, muss die Reihenfolge in der Datenbank gespeichert werden. Eine allgemeine Erklärung dazu finden Sie [hier](guides/server-side.md#storingtheorderoftasks).

Fügen wir diese Funktionalität der Anwendung hinzu.

### Aktivierung der Aufgabenreihenfolge auf der Client-Seite

Um Benutzern das Neuordnen von Aufgaben in der Oberfläche zu ermöglichen, aktualisieren Sie die Gantt-Konfiguration in der *Index*-Ansicht wie folgt:

**resources/views/gantt.blade.php**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

gantt.init("gantt_here");
~~~

### Aktivierung der Aufgabenreihenfolge auf der Server-Seite

Im Backend wird die Reihenfolge in einer Spalte mit dem Namen "sortorder" gespeichert. Ein vollständiges Aufgaben-Schema könnte wie folgt aussehen:

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

Alternativ können Sie eine Migration zum bestehenden Schema hinzufügen:

~~~js
php artisan make:migration add_sortorder_to_tasks_table --table="tasks"
~~~

Die Migrationsdatei würde enthalten:

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

Führen Sie anschließend die Migration aus:

~~~
php artisan migrate
~~~

Aktualisieren Sie nun die CRUD-Operationen in den Controllern.

1 . Die <b>GET /data</b>-Route sollte Aufgaben nach `sortorder` sortiert zurückgeben: 
  
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
2 . Wenn eine neue Aufgabe hinzugefügt wird, sollte ihr ein initialer `sortorder`-Wert zugewiesen werden: 

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

3 . Schließlich muss der Server beim Neuordnen von Aufgaben deren Reihenfolge aktualisieren:

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

Anwendungssicherheit
-------------------------

Die Gantt-Komponente selbst bietet keinen Schutz gegen Bedrohungen wie SQL-Injection, XSS oder CSRF-Angriffe. Die Sicherstellung der Anwendungssicherheit liegt in der Verantwortung der Backend-Entwickler. Weitere Einzelheiten finden Sie [im entsprechenden Artikel](guides/app-security.md).


Fehlerbehebung
-----------------

Wenn nach diesen Schritten das Gantt-Diagramm keine Aufgaben oder Links anzeigt, finden Sie im Artikel [Troubleshooting Backend Integration Issues](guides/troubleshooting.md) Hinweise zur Identifizierung und Lösung häufiger Probleme.

Wie geht es weiter?
-------------------

Das Gantt ist nun vollständig funktionsfähig. Der vollständige Quellcode steht auf [GitHub](https://github.com/DHTMLX/gantt-howto-php-laravel) zum Klonen oder Herunterladen für eigene Projekte zur Verfügung.

Weitere Informationen zu Gantt-Funktionen finden Sie in [unseren Anleitungen](guides.md). Tutorials zur Integration von Gantt mit anderen Backend-Frameworks finden Sie in den [How-To-Guides](integrations/howtostart-guides.md).

