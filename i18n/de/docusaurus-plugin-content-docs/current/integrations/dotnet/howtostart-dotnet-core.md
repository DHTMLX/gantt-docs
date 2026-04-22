---
title: "dhtmlxGantt mit ASP.NET Core"
sidebar_label: "ASP.NET Core"
---

# dhtmlxGantt mit ASP.NET Core

Diese Anleitung gibt Ihnen Schritt-für-Schritt-Anweisungen, wie Sie Gantt mit [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet) Core auf der Serverseite erstellen.

Sie können auch Tutorials zu anderen serverseitigen Technologien lesen:

- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

Für die Verwaltung der Datenbankinteraktionen wird das [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) verwendet. Das Projekt wird mit Visual Studio 2022 entwickelt.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/gantt-howto-dotnet-core).
:::

## Schritt 1. Ein Projekt erstellen

Starten Sie Visual Studio 2022 und erstellen Sie ein neues Projekt. Wählen Sie: *Create a new project*.

![dhtmlxGantt mit ASP.NET Core - Projekt erstellen](/img/howtostart_dotnetcore_newapp.png)

Wählen Sie anschließend "ASP.NET Core Web App" und benennen Sie es *DHX.Gantt*.

![dhtmlxGantt mit ASP.NET Core - Projekt erstellen](/img/howtostart_dotnetcore_newproject.png)


![dhtmlxGantt mit ASP.NET Core - Projekt konfigurieren](/img/howtostart_dotnetcore_configureproject.png)

![dhtmlxGantt mit ASP.NET Core - Projekt konfigurieren](/img/howtostart_dotnetcore_addinfo.png)

Damit haben Sie ein Projekt erstellt und können fortfahren, Markup und Skripte für Gantt hinzuzufügen.

## Schritt 2. Gantt-Markup und JS hinzufügen

Gehen Sie zu **wwwroot** und erstellen Sie eine **index.html** Datei.

![dhtmlxGantt mit ASP.NET Core 2 - Ein Projekt erstellen](/img/create_project_step3.png)

![dhtmlxGantt mit ASP.NET Core 2 - Ein Projekt erstellen](/img/create_project_step4.png)

In der neu erstellten Datei erstellen Sie eine einfache Seite für ein Gantt-Diagramm.

Beachten Sie, dass die Gantt-Dateien in dieser Demo von [CDN](guides/installation.md#cdn) bezogen werden. Wenn Sie eine Professional-Version der Komponente verwenden, müssen Sie [Gantt-Dateien manuell in Ihr Projekt einfügen](guides/installation.md#adding-pro-edition-into-project).


~~~html title="index.html"
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Index</title>
    <link href="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" rel="stylesheet" type="text/css" />
    <link href="css/site.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
        // specifying the date format
        gantt.config.date_format = '%Y-%m-%d %H:%i';
        // initializing gantt
        gantt.init('gantt_here');

        // initiating data loading
        gantt.load('/api/data');
        // creating and configuring dataProcessor
        const dp = gantt.createDataProcessor({
          url: '/api/',
          mode: 'REST',
        });
      });
    </script>
</head>
<body>
    <div id="gantt_here" style="width: 100vw; height: 100vh"></div>
</body>
</html>
~~~

Beim Laden der Seite wird neben der **Initialisierung des Gantt-Diagramms** ([guides/initializing-gantt-chart.md](guides/initializing-gantt-chart.md)) auch das [data loading](guides/loading.md) sofort aufgerufen und der [`dataProcessor`](guides/server-side.md#technique) eingerichtet, damit alle vom Benutzer am Gantt vorgenommenen Änderungen im Backend gespeichert werden. Das Backend ist noch nicht implementiert, daher ergibt es später mehr Sinn.

Gehen Sie als Nächstes zu **Program.cs** und weisen Sie der Anwendung an, die **index.html**-Seite zu verwenden. Dazu müssen Sie die App so konfigurieren, statische Dateien aus dem Ordner `wwwroot` zu bedienen. 
Dazu müssen Sie die Methode `app.UseDefaultFiles()` hinzufügen.
Weitere Details finden Sie hier: https://learn.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-9.0


~~~js title="Program.cs"
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. 
    // You may want to change this for production scenarios, 
    // see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseDefaultFiles(); /*!*/

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
~~~

Die Methode `app.UseDefaultFiles()` ermöglicht das Bedienen von Standarddateien. Sie durchsucht den Ordner **wwwroot** nach folgenden Dateien:

- index.html
- index.htm
- default.html
- default.htm

Somit können Sie eine davon auswählen, während in diesem Tutorial "index.html" verwendet wird.
`UseDefaultFiles()` ist nur ein URL-Umleitungsmechanismus, der die Datei selbst nicht wirklich serviert. Für diesen Zweck müssen Sie zusätzlich die Datei `UseStaticFiles()` verwenden.
Um Gantt den gesamten verfügbaren Platz des Bodys einnehmen zu lassen, fügen Sie die folgenden Stile in die Datei `site.css` im Ordner `wwwroot/css` ein:

~~~css title="DHX.Gantt/wwwroot/css/site.css"
html {
    font-size: 14px;
}

@media (min-width: 768px) {
    html {
        font-size: 16px;
    }
}

body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}
~~~

Wenn Sie damit fertig sind, sollte beim Ausführen der Anwendung ein leerer Gantt auf der Seite erscheinen. Beachten Sie, dass das Label "Invalid data" in der oberen rechten Ecke erscheint, weil `gantt.load()` aufgerufen wird, da es noch kein entsprechendes Backend gibt, das die Daten bereitstellt. Wenn der Controller implementiert wird, kann der Gantt Aufgaben und Verknüpfungen anzeigen.

![dhtmlxGantt mit ASP.NET Core 2 - Gantt hinzufügen](/img/adding_gantt_dotnet_core.png)


Nun ist der grundlegende Teil erledigt und es geht an die Implementierung des Backends. Beginnen wir mit der Implementierung von Modellklassen und danach fahren wir mit dem WebAPI-Controller fort.

### Schritt 3. Modelle und Datenbank

Beginnen wir mit den Datenmodellen. Ein Datenmodell für Gantt umfasst [Links und Tasks](guides/loading.md#databasestructure). 
dhtmlxGantt verwendet aus der .NET-Weltperspektive [nicht konventionelle Namen für Modell-Eigenschaften](guides/supported-data-formats.md#json). 
Manchmal enthält das clientseitige Modell auch einige Eigenschaften für die Client-Seite oder die Backend-Logik, aber diese Eigenschaften sollten nicht in einer Datenbank gespeichert werden.

Um damit umzugehen, wird das Muster des [Data Transfer Object (DTO)](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5) verwendet. Es werden zwei Arten von Modellen definiert:

- Domänenmodellklassen, die mit EF Core und innerhalb der App verwendet werden
- DTO-Klassen, die verwendet werden, um mit der Web API zu kommunizieren.

Dann sollte eine Abbildung zwischen den beiden Modellen implementiert werden.

### Modelle

Erstellen Sie einen neuen Ordner namens **Models** im Projektordner. Hier werden die Modellklassen und der EF-Kontext implementiert.

#### Task-Modell

 Zuerst erstellen Sie eine Klasse für Tasks. Legen Sie im Models-Ordner eine Datei mit dem Namen **Task.cs** an. Dies kann über das Kontextmenü des Models-Ordners erfolgen und Sie wählen *Add->Class*.

So sollte das Modell aussehen:


~~~js title="DHX.Gantt/Models/Task.cs"
namespace DHX.Gantt.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string? Text { get; set; }
        public DateTime StartDate { get; set; }
        public int Duration { get; set; }
        public decimal Progress { get; set; }
        public int? ParentId { get; set; }
        public string? Type { get; set; }
    }
}
~~~

Sie können [die Liste aller Eigenschaften des Task-Objekts](guides/loading.md#task_properties) nachschlagen.

#### Link-Modell

Fügen Sie noch eine Datei hinzu und erstellen Sie eine Klasse für Links:


~~~js title="DHX.Gantt/Models/Link.cs"
namespace DHX.Gantt.Models
{
    public class Link
    {
        public int Id { get; set; }
        public string? Type { get; set; }
        public int SourceTaskId { get; set; }
        public int TargetTaskId { get; set; }
    }
}
~~~

Die Modelle sind fertg, und Sie können beginnen, die Datenbankverbindung zu konfigurieren.

### Konfigurieren der Datenbankverbindung

Um die Datenbankverbindung zu konfigurieren, müssen Sie die unten aufgeführten Schritte ausführen:

#### Entity Framework Core installieren

Das [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) wird verwendet, um die Kommunikation der App mit einer Datenbank zu verwalten. Lassen Sie uns das Framework installieren: 

- Abhängigkeiten von DHTMLX.Gantt im Projektbaum finden
- Kontextmenü aufrufen und *Manage NuGet packages* auswählen 
- den *Browse*-Tab öffnen und **Microsoft.EntityFrameworkCore.SqlServer**, **Microsoft.EntityFrameworkCore**, und **Microsoft.EntityFrameworkCore.Design** installieren

![dhtmlxGantt mit ASP.NET Core EF core installieren](/img/howtostart_dotnetcore_entityvianuget.png)

Oder verwenden Sie die Package Manager-Befehlszeile:

~~~
PM> Install-Package Microsoft.EntityFrameworkCore.SqlServer
PM> Install-Package Microsoft.EntityFrameworkCore
PM> Install-Package Microsoft.EntityFrameworkCore.Design
~~~

Die Entity Framework Core wird verwendet, um die Kommunikation der App mit einer Datenbank zu verwalten.

#### Entity-Context erstellen

Als Nächstes müssen Sie eine Sitzung mit der Datenbank definieren und das Laden und Speichern von Daten ermöglichen. Erstellen Sie dazu den Kontext:

- fügen Sie die Datei **GanttContext.cs** im Ordner *Models* hinzu 
- definieren Sie die Klasse **GanttContext** in der erstellten Datei


~~~js title="DHX.Gantt/Models/GanttContext.cs"
using Microsoft.EntityFrameworkCore;

namespace DHX.Gantt.Models
{
    public class GanttContext : DbContext
    {
        public GanttContext(DbContextOptions<GanttContext> options)
           : base(options)
        {
        }
        public DbSet<Task> Tasks { get; set; } = null;
        public DbSet<Link> Links { get; set; } = null;

    }
}
~~~

#### Erste Datensätze zur Datenbank hinzufügen

Nun können Sie Datensätze in die Datenbank einfügen. Erstellen Sie eine Datenbank-Initialisierungsklasse, die die Datenbank mit Tasks befüllt. 
Definieren Sie im Ordner **Models** eine Klasse und nennen Sie sie **GanttSeeder**. Die Klasse wird die Methode **Seed()** besitzen, die Tasks und Verknüpfungen in die Datenbank hinzufügt.


~~~js title="DHX.Gantt/Models/GanttSeeder.cs"
using Microsoft.EntityFrameworkCore;

namespace DHX.Gantt.Models
{
    public static class GanttSeeder
    {
        public static void Seed(GanttContext context)
        {
            if (context.Tasks.Any())
            {
                return;   // DB has been seeded
            }

            using (var transaction = context.Database.BeginTransaction())
            {
               List<Task> tasks = new List<Task>()
               {
                  new Task()
                    {
                       Id = 1,
                       Text = "Project #2",
                       StartDate = DateTime.Today.AddDays(-3),
                       Duration = 18,
                       Progress = 0.4m,
                       ParentId = null
                    },
                    new Task()
                    {
                       Id = 2,
                       Text = "Task #1",
                       StartDate = DateTime.Today.AddDays(-2),
                       Duration = 8,
                       Progress = 0.6m,
                       ParentId = 1
                    },
                    new Task()
                    {
                       Id = 3,
                       Text = "Task #2",
                       StartDate = DateTime.Today.AddDays(-1),
                       Duration = 8,
                       Progress = 0.6m,
                       ParentId = 1
                    }
               };

               tasks.ForEach(s => context.Tasks.Add(s));
               context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Tasks ON;");
               context.SaveChanges();

               context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Tasks OFF;");
               List<Link> links = new List<Link>()
               {
                   new Link() {Id = 1, SourceTaskId = 1, TargetTaskId = 2, Type = "1"},
                   new Link() {Id = 2, SourceTaskId = 2, TargetTaskId = 3, Type = "0"}
               };

               links.ForEach(s => context.Links.Add(s));
               context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Links ON;");
               context.SaveChanges();
               context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Links OFF;");
               transaction.Commit();
            }
        }
    }
}
~~~

#### Datenbank registrieren

Nun sollten Sie die Datenbank in **Program.cs** registrieren. Zunächst benötigen Sie jedoch eine Verbindungszeichenfolge dafür. Sie wird [in einer JSON-Datei in den Anwendungseinstellungen](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-9.0) gespeichert.
Erstellen Sie die **appsettings.json** (oder öffnen Sie sie, falls sie bereits vorhanden ist) und fügen Sie eine Verbindungzeichenfolge zur Datenbank hinzu:


~~~js title="appsettings.json"
{
  "ConnectionStrings": {
    "DefaultConnection": "Server="(localdb)mssqllocaldb;"
        Database=GanttDatabase;Trusted_Connection=True;"
  }
}
~~~

Der Datenbankkontext wird über **Dependency Injection** registriert. Addieren Sie dazu folgende Namespaces zu **Program.cs**:


~~~js title="Program.cs"
using Microsoft.EntityFrameworkCore;
using DHX.Gantt.Models;
~~~

Die Deklaration sieht dann so aus:

~~~js title="Program.cs"
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<GanttContext>(
    options => options.UseSqlServer(connectionString));
~~~

Um Controller zu ermöglichen, wird die Methode **services.AddControllers()** aufgerufen:

~~~js title="Program.cs"
builder.Services.AddControllers();
~~~

Und wir rufen **app.MapControllers()** auf, um unsere Controller-Routen zu registrieren:

~~~js title="Program.cs"
app.MapControllers();
~~~


Hier ist der vollständige Code von **Program.cs**:

~~~js title="Program.cs"
using Microsoft.EntityFrameworkCore;
using DHX.Gantt.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<GanttContext>(
    options => options.UseSqlServer(connectionString));

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days.
    // You may want to change this for production scenarios, 
    // see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseDefaultFiles();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.MapControllers();

app.Run();
~~~

Schließlich müssen Sie die Datenbank beim Start der App initialisieren und befüllen. Normalerweise würden Sie Migrationen verwenden, aber aus Einfachheitsgründen werden sie hier nicht verwendet.

Beginnen wir damit, eine Klasse zu erstellen, in der die Initialisierung vorgenommen wird. Erstellen Sie die Datei **GanttInitializerExtension.cs** im Ordner **Models**:


~~~js title="Models/GanttInitializerExtension.cs"
namespace DHX.Gantt.Models
{
  public static class GanttInitializerExtension
  {
    public static IHost InitializeDatabase(this IHost webHost)
    {
      var serviceScopeFactory = 
       (IServiceScopeFactory?)webHost.Services.GetService(typeof(IServiceScopeFactory));

      using (var scope = serviceScopeFactory!.CreateScope())
       {
          var services = scope.ServiceProvider;
          var dbContext = services.GetRequiredService<GanttContext>();
          dbContext.Database.EnsureDeleted();
          dbContext.Database.EnsureCreated();
          GanttSeeder.Seed(dbContext);
       }

       return webHost;
     }
   }
}
~~~

Als Nächstes rufen Sie **InitializeDatabase()** auf:


~~~js title="Program.cs"
app.InitializeDatabase();
~~~

Wie oben erwähnt, werden in diesem Tutorial keine Migrationen verwendet. Stattdessen werden einfache *EnsureCreated* und *Seed* verwendet.

Der aktuelle Abschnitt ist abgeschlossen, kehren wir zum Gantt zurück.

### DTOs definieren und Mapping

Es ist an der Zeit, DTO-Klassen zu definieren, die für die Web API verwendet werden. Beginnen wir mit der DTO-Klasse für Task. Legen Sie im **Models**-Ordner eine Datei an und definieren Sie die Klasse **WebApiTask.cs**:


~~~js title="Models/WebApiTask.cs"
namespace DHX.Gantt.Models
{
    public class WebApiTask
    {
        public int id { get; set; }
        public string? text { get; set; }
        public string? start_date { get; set; }
        public int duration { get; set; }
        public decimal progress { get; set; }
        public int? parent { get; set; }
        public string? type { get; set; }
        public bool open
        {
            get { return true; }
            set { }
        }

        public static explicit operator WebApiTask(Task task)
        {
            return new WebApiTask
            {
                id = task.Id,
                text = task.Text,
                start_date = task.StartDate.ToString("yyyy-MM-dd HH:mm"),
                duration = task.Duration,
                parent = task.ParentId,
                type = task.Type,
                progress = task.Progress
            };
        }

        public static explicit operator Task(WebApiTask task)
        {
            return new Task
            {
                Id = task.id,
                Text = task.text,
                  StartDate = task.start_date != null ? DateTime.Parse(task.start_date,
                  System.Globalization.CultureInfo.InvariantCulture) : new DateTime(),
                Duration = task.duration,
                ParentId = task.parent,
                Type = task.type,
                Progress = task.progress
            };
        }
    }
}
~~~

Und dies ist die DTO-Klasse für Link, definiert in der Datei **WebApiLink.cs** im Ordner **Models**:


~~~js title="Models/WebApiLink.cs"
namespace DHX.Gantt.Models
{
    public class WebApiLink
    {
        public int id { get; set; }
        public string? type { get; set; }
        public int source { get; set; }
        public int target { get; set; }

        public static explicit operator WebApiLink(Link link)
        {
            return new WebApiLink
            {
                id = link.Id,
                type = link.Type,
                source = link.SourceTaskId,
                target = link.TargetTaskId
            };
        }

        public static explicit operator Link(WebApiLink link)
        {
            return new Link
            {
                Id = link.id,
                Type = link.type,
                SourceTaskId = link.source,
                TargetTaskId = link.target
            };
        }
    }
}
~~~

Wenn Sie diesen Schritt abgeschlossen haben, sollte folgende Ordnerstruktur vorhanden sein:

![Gantt ASP.NET Core 2 All models](/img/howtostart_dotnetcore_structure.png)

Nun können Sie die Anwendung ausführen, um zu prüfen, ob alles vorhanden ist. Wenn Sie keinen Laufzeitfehler sehen, ist alles in Ordnung.

## Schritt 4. Implementierung der Web API

Nun ist es Zeit für die eigentliche REST-API-Implementierung.

### Controllers hinzufügen

Erstellen Sie den Ordner **Controllers** und legen Sie drei leere API-Controller an: einen für Tasks, einen weiteren für Links und einen weiteren für den gesamten Datensatz:

![Gantt ASP.NET Core 2 - Controller hinzufügen](/img/howtostart_dotnetcore_addcontrollers.png)


#### Task-Controller

Erstellen wir einen Controller für Tasks. Er wird grundlegende CRUD-Operationen für Gantt-Tasks definieren.

Wie es funktioniert:

- in GET-Anfragen werden Tasks aus der Datenbank geladen und die Ausgabe sind die Data Transfer Objects der Tasks;
- in PUT/POST-Anfragen kommen Tasks vom Client als WebAPITask-Klassen. Sie werden so in dhtmlxGantt dargestellt. Deshalb sollten Sie sie in das Format unseres Datenmodells für EntityFramework (Task-Klasse) konvertieren. Danach ist es möglich, Änderungen im DatabaseContext zu speichern.


~~~js title="Controllers/TaskController.cs"
using Microsoft.AspNetCore.Mvc;
using DHX.Gantt.Models;
using Microsoft.EntityFrameworkCore;

namespace DHX.Gantt.Controllers
{
    [Produces("application/json")]
    [Route("api/task")]
    public class TaskController : ControllerBase
    {
        private readonly GanttContext _context;
        public TaskController(GanttContext context)
        {
            _context = context;
        }

        // GET api/task
        [HttpGet]
        public async Task<IEnumerable<WebApiTask>> Get()
        {
            return await _context.Tasks
                .Select(t => (WebApiTask)t)
                .ToListAsync();
        }

        // GET api/task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Task>> Get(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return NotFound();

            return Ok(task);
        }

        // POST api/task
        [HttpPost]
        public async Task<IActionResult> Post(WebApiTask apiTask)
        {
            var newTask = (Models.Task)apiTask;

            await _context.Tasks.AddAsync(newTask);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                tid = newTask.Id,
                action = "inserted"
            });
        }

        // PUT api/task/5
        [HttpPut("{id}")]
        public async Task<IActionResult?> Put(int id, WebApiTask apiTask)
        {
            var updatedTask = (Models.Task)apiTask;
            var dbTask = await _context.Tasks.FindAsync(id);

            if (dbTask == null)
            {
                return NotFound();
            }

            dbTask.Text = updatedTask.Text;
            dbTask.StartDate = updatedTask.StartDate;
            dbTask.Duration = updatedTask.Duration;
            dbTask.ParentId = updatedTask.ParentId;
            dbTask.Progress = updatedTask.Progress;
            dbTask.Type = updatedTask.Type;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                action = "updated"
            });
        }

        // DELETE api/task/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                action = "deleted"
            });
        }
    }
}
~~~

#### Link-Controller

Als Nächstes erstellen Sie einen Controller für Links:


~~~js title="Controllers/LinkController.cs"
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using DHX.Gantt.Models;

namespace DHX.Gantt.Controllers
{
    [Produces("application/json")]
    [Route("api/link")]
    public class LinkController : ControllerBase
    {
        private readonly GanttContext _context;
        public LinkController(GanttContext context)
        {
            _context = context;
        }

        // GET api/Link
        [HttpGet]
        public async Task<IEnumerable<WebApiLink>> Get()
        {
            return await _context.Links
                .Select(t => (WebApiLink)t)
                .ToListAsync();
        }

        // GET api/Link/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Link>> Get(int id)
        {
            var link = await _context.Links.FindAsync(id);

            if (link == null)
                return NotFound();

            return Ok(link);
        }

        // POST api/Link
        [HttpPost]
        public async Task<IActionResult> Post(WebApiLink apiLink)
        {
            var newLink = (Link)apiLink;

            _context.Links.Add(newLink);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                tid = newLink.Id,
                action = "inserted"
            });
        }

        // PUT api/Link/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, WebApiLink apiLink)
        {
            var updatedLink = (Link)apiLink;
            updatedLink.Id = id;
            _context.Entry(updatedLink).State = EntityState.Modified;


            await _context.SaveChangesAsync();

            return Ok(new
            {
                action = "updated"
            });
        }

        // DELETE api/Link/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLink(int id)
        {
            var link = await _context.Links.FindAsync(id);
            if (link != null)
            {
                _context.Links.Remove(link);
                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                action = "deleted"
            });
        }
    }
}
~~~

#### Data-Controller

Schließlich müssen Sie einen Controller für eine Data-Action erstellen:


~~~js title="Controllers/DataController.cs"
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DHX.Gantt.Models;

namespace DHX.Gantt.Controllers
{
    [Produces("application/json")]
    [Route("api/data")]
    public class DataController : ControllerBase
    {
        private readonly GanttContext _context;
        public DataController(GanttContext context)
        {
            _context = context;
        }

        // GET api/data
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var tasks = await _context.Tasks
                .Select(t => (WebApiTask)t)
                .ToListAsync();

            var links = await _context.Links
                .Select(l => (WebApiLink)l)
                .ToListAsync();

            return Ok(new
            {
                tasks,
                links
            });
        }
    }
}
~~~

Alles ist bereit. Sie können die Anwendung ausführen und das voll funktionsfähige Gantt sehen.

![Gantt ASP.NET Core Gantt ist bereit](/img/ready_gantt_dotnet_core.png)


[Sie können auch den vollständigen Quellcode auf GitHub einsehen](https://github.com/DHTMLX/gantt-howto-dotnet-core/).

## Fehlerbehandlung

Um Fehler zu behandeln, müssen Sie eine spezielle [Middleware-Klasse](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/startup?view=aspnetcore-9.0) deklarieren, die Laufzeitfehler erfasst und Antworten schreibt. Anschließend wird sie in die App-Anfrage-Pipeline aufgenommen. Folgen Sie den untenstehenden Schritten:

1. Erstellen Sie eine Middleware-Klasse aus einer Vorlage im Projektordner.
 
![Gantt ASP.NET Core Middleware-Klasse](/img/dotnet_core_middleware.png)

2. Installieren Sie das JSON-Framework für ASP.NET Core. Sie können es entweder über den NuGet-Paket-Manager tun:

![Gantt ASP.NET Core Install NewtonSoft Json](/img/install_newtonsoft.png)

Oder verwenden Sie die Package Manager-Befehlszeile:

~~~
PM> Install-Package NewtonSoft.JSON
~~~

3. Finden Sie die **invoke**-Methode und notieren Sie den `_next`-Aufruf. Einige Handler können Ausnahmen werfen, also fangen wir sie ab. Umgeben Sie den `_next`-Aufruf mit einem `try-catch`-Block und führen Sie unseren Handler aus, wenn ein Fehler erfasst wird. 

~~~js title="GanttErrorMiddleware.cs"
public async Task Invoke(HttpContext httpContext)
{
    try
    {
        await _next(httpContext);
    }catch(Exception e)
    {
        await HandleExceptionAsync(httpContext, e);
    }           
}
private static Task HandleExceptionAsync(HttpContext context, Exception exception)
{
    var result = JsonConvert.SerializeObject(new {
        action = "error"
    });
    context.Response.ContentType = "application/json";
    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
    return context.Response.WriteAsync(result);
}
~~~

4. Fügen Sie die folgenden Namespaces zu **GanttErrorMiddleware.cs** hinzu:

~~~js
using Newtonsoft.Json;
~~~

5. Die Middleware ist einsatzbereit. Öffnen Sie nun **Program.cs** und verbinden Sie die Middleware. Fügen Sie folgende Namespaces hinzu:

~~~js title="Program.cs"
using DHX.Gantt;
~~~

Als Nächstes rufen Sie die Methode **app.UseGanttErrorMiddleware()** auf:

~~~js title="Program.cs"
app.UseGanttErrorMiddleware();
~~~

## Speichern der Reihenfolge der Aufgaben {#storingtheorderoftasks}

Benutzer können Aufgaben per Drag & Drop im Client-seitigen Gantt neu anordnen. Wenn Sie diese Funktion verwenden, sollten Sie die Reihenfolge der Aufgaben in der Datenbank speichern. 
Details finden Sie in [diesem Abschnitt](guides/server-side.md#storingtheorderoftasks).

Lesen Sie weiter, um herauszufinden, wie das Speichern der Reihenfolge der Aufgaben für Gantt aktiviert wird.

### Neuordnung auf der Client-Seite

Aktivieren Sie zuerst die Neuordnung der Aufgaben auf der Client-Seite. Fügen Sie diese Zeilen zu **index.html** hinzu:

~~~js title="wwwroot/index.html"
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

// specifying the date format
gantt.config.date_format = "%Y-%m-%d %H:%i";
// initializing gantt
gantt.init("gantt_here");
~~~

### Aufgabenreihenfolge zum Modell hinzufügen

Als Nächstes müssen Sie das Backend so ändern, dass es die aktuelle Reihenfolge der Aufgaben widerspiegelt. Fügen Sie dem **Task**-Modell eine weitere Methode hinzu:

~~~js title="Models/Task.cs"
namespace DHX.Gantt.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string? Text { get; set; }
        public DateTime StartDate { get; set; }
        public int Duration { get; set; }
        public decimal Progress { get; set; }
        public int? ParentId { get; set; }
        public string? Type { get; set; }
        public int SortOrder { get; set; } /*!*/
    }
}
~~~

### Updating Controllers

Sie müssen auch die Controller aktualisieren.
 
1. Die Client-Seite sollte Aufgaben in der Reihenfolge des **SortOrder**-Werts erhalten. Fügen Sie der DataController-Datei die hervorgehobene Zeile hinzu:

~~~js title="Controllers/DataController.cs"
[HttpGet]
public async Task<IActionResult> Get()
{
    var tasks = await _context.Tasks
        .OrderBy(t => t.SortOrder) /*!*/
        .Select(t => (WebApiTask)t)
        .ToListAsync();

    var links = await _context.Links
        .Select(l => (WebApiLink)l)
        .ToListAsync();

    return Ok(new
    {
        data = tasks,
        links = links
    });
}
~~~

2. Neue Tasks sollten auch den Standardwert **SortOrder** erhalten:

~~~js title="controllers/TaskController.cs"
// POST api/task
[HttpPost]
public async Task<IActionResult> Post(WebApiTask apiTask)
{
    var newTask = (Models.Task)apiTask;

    newTask.SortOrder = await _context.Tasks.MaxAsync(t => t.SortOrder) + 1; /*!*/
    await _context.Tasks.AddAsync(newTask);
    await _context.SaveChangesAsync();

    return Ok(new
    {
        tid = newTask.Id,
        action = "inserted"
    });
}
~~~

3. **sortOrder** sollte aktualisiert werden, wenn die Aufgabenreihenfolge auf der Client-Seite geändert wird. Wenn ein Benutzer Aufgaben neu anordnet, ruft Gantt eine PUT-Aktion auf und übergibt die Informationen über die Positionen der neuen Aufgabe in der Eigenschaft ['target'] des Requests zusammen mit dem Rest der Aufgaben-Eigenschaften.
 
Fügen Sie `target` zur **WebApiTask.cs**-Klasse hinzu:
 
~~~js title="Models/WebApiTask.cs"
public class WebApiTask
{
    public int id { get; set; }
    public string? text { get; set; }
    public string? start_date { get; set; }
    public int duration { get; set; }
    public decimal progress { get; set; }
    public int? parent { get; set; }
    public string? type { get; set; }
    public string? target { get; set; } /*!*/
    public bool open
    {
        get { return true; }
        set { }
    }
}
~~~
 
Und nun implementieren wir die Neuordnung in unserer PUT (EditTask)-Aktion. Ändern Sie die Put-Aktion des Task-Controllers:
 
~~~js title="Controllers/TaskController.cs"
// PUT api/task/5
[HttpPut("{id}")]
public async Task<IActionResult?> Put(int id, WebApiTask apiTask)
{
    var updatedTask = (Models.Task)apiTask;
    var dbTask = await _context.Tasks.FindAsync(id);

    if (dbTask == null)
    {
        return NotFound();
    }

    dbTask.Text = updatedTask.Text;
    dbTask.StartDate = updatedTask.StartDate;
    dbTask.Duration = updatedTask.Duration;
    dbTask.ParentId = updatedTask.ParentId;
    dbTask.Progress = updatedTask.Progress;
    dbTask.Type = updatedTask.Type;

    if (!string.IsNullOrEmpty(apiTask.target))                /*!*/
    {                                                         /*!*/
        // reordering occurred                                /*!*/   
        await this.UpdateOrdersAsync(dbTask, apiTask.target); /*!*/
    }                                                         /*!*/

    await _context.SaveChangesAsync();

    return Ok(new
    {
        action = "updated"
    });
}
~~~
 
Und fügen Sie die Methode hinzu, die die Reihenfolge der Aufgaben aktualisiert:
 
~~~js title="Controllers/TaskController.cs"
private async Task<IActionResult> UpdateOrdersAsync(Models.Task updatedTask, string orderTarget)
{
    int adjacentTaskId;
    var nextSibling = false;

    var targetId = orderTarget;

    // adjacent task id is sent either as '{id}' or as 'next:{id}' depending 
    // on whether it's the next or the previous sibling
    if (targetId.StartsWith("next:"))
    {
        targetId = targetId.Replace("next:", "");
        nextSibling = true;
    }

    if (!int.TryParse(targetId, out adjacentTaskId))
    {
        return NotFound();
    }

    var adjacentTask = await _context.Tasks.FindAsync(adjacentTaskId);
    if (adjacentTask == null)
    {
        return NotFound();
    }
    var startOrder = adjacentTask.SortOrder;

    if (nextSibling)
        startOrder++;

    updatedTask.SortOrder = startOrder;

    var updateOrders = await _context.Tasks
        .Where(t => t.Id != updatedTask.Id)
        .Where(t => t.SortOrder >= startOrder)
        .OrderBy(t => t.SortOrder)
        .ToListAsync();

    var taskList = updateOrders.ToList();
    taskList.ForEach(t => t.SortOrder++);

    return Ok(new
    {
        action = "updated"
    });
}
~~~

## Anwendungssicherheit

Gantt bietet keine Mittel, um eine Anwendung vor verschiedenen Bedrohungen wie SQL-Injektionen, XSS- und CSRF-Angriffen zu schützen. Die Verantwortung für die Sicherheit einer Anwendung liegt bei den Entwicklern, die das Backend implementieren. Lesen Sie die Details im [entsprechenden Artikel](guides/app-security.md).

### XSS-Schutz

Eine einfache Lösung wäre es, die Text-Eigenschaften Ihrer Dateneinträge zu kodieren, wenn Sie sie an die Client-Seite senden.

Zum Beispiel wird im untenstehenden Code ein integrierter HtmlEncoder verwendet, um HTML-Werte im Text der Aufgaben zu escapen. Auf diese Weise enthält Ihre Datenbank unveränderte Daten, aber die Client-Seite erhält sichere Werte von `task.text`.

~~~js title="Models/WebApiTask.cs"
using System.Text.Encodings.Web;

public static explicit operator WebApiTask(Task task)
{
    return new WebApiTask
    {
        id = task.Id,
        text = HtmlEncoder.Default.Encode(task.Text != null ? task.Text : ""), /*!*/
        start_date = task.StartDate.ToString("yyyy-MM-dd HH:mm"),
        duration = task.Duration,
        parent = task.ParentId,
        type = task.Type,
        progress = task.Progress
    };
}
~~~

Ein weiterer Ansatz wäre die Verwendung einer spezialisierten Bibliothek, z. B. [HtmlAgilityPack](https://www.nuget.org/packages/HtmlAgilityPack/) und das vollständige Entfernen jeglicher HTML-Inhalte einer Aufgabe beim Speichern/Laden der Daten.

## Fehlerbehebung

Falls Sie die oben beschriebenen Schritte zur Integration von Gantt mit ASP.NET Core abgeschlossen haben, Gantt aber Aufgaben und Verknüpfungen auf einer Seite nicht rendert, lesen Sie den Artikel [Troubleshooting Backend Integration Issues](guides/troubleshooting.md). Er beschreibt die Wege zur Identifizierung der Ursachen.

## Was kommt als Nächstes

Sie haben nun ein vollständig funktionsfähiges Gantt. Den vollständigen Code finden Sie auf [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core), klonen oder herunterladen und für Ihre Projekte verwenden.

Sie können auch die [Guides zu den zahlreichen Funktionen von gantt](guides.md) oder Tutorials zur [Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md) prüfen.