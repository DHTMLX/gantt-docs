---
title: "dhtmlxGantt mit ASP.NET Core"
sidebar_label: "ASP.NET Core"
---

# dhtmlxGantt mit ASP.NET Core

Diese Anleitung führt Sie durch die Einrichtung eines Gantt-Diagramms mit [ASP.NET](https://dotnet.microsoft.com/apps/aspnet) Core auf der Serverseite.

Es sind auch Tutorials für andere serverseitige Plattformen verfügbar:

- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

Für die Verwaltung der Datenbankinteraktionen wird das [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) verwendet. Das Projekt wird mit Visual Studio 2022 entwickelt.

:::note
Der vollständige Quellcode ist [auf GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core) verfügbar.
:::

## Schritt 1. Projekt erstellen

Starten Sie Visual Studio 2022 und erstellen Sie ein neues Projekt, indem Sie *Create a new project* auswählen.

![dhtmlxGantt mit ASP.NET Core Projekt erstellen](/img/howtostart_dotnetcore_newapp.png)

Wählen Sie dann "ASP.NET Core Web App" und setzen Sie den Projektnamen auf *DHX.Gantt*.

![dhtmlxGantt mit ASP.NET Core Projekt erstellen](/img/howtostart_dotnetcore_newproject.png)

![dhtmlxGantt mit ASP.NET Core Projekt konfigurieren](/img/howtostart_dotnetcore_configureproject.png)

![dhtmlxGantt mit ASP.NET Core Projekt konfigurieren](/img/howtostart_dotnetcore_addinfo.png)

Nachdem das Projekt erstellt wurde, können Sie das Markup und die Skripte für das Gantt-Diagramm hinzufügen.

## Schritt 2. Gantt-Markup und JS hinzufügen

Navigieren Sie zu **wwwroot** und erstellen Sie eine neue Datei mit dem Namen **index.html**.

![dhtmlxGantt mit ASP.NET Core 2 Projekt erstellen](/img/create_project_step3.png)

![dhtmlxGantt mit ASP.NET Core 2 Projekt erstellen](/img/create_project_step4.png)

Erstellen Sie in dieser Datei eine einfache Seite zur Anzeige des Gantt-Diagramms.

Beachten Sie, dass in diesem Beispiel die Gantt-Dateien vom [CDN](guides/installation.md#cdn) geladen werden. Wenn Sie die Professional-Version besitzen, müssen Sie die [Gantt-Dateien manuell zu Ihrem Projekt hinzufügen](guides/installation.md#addingprofessionaleditionintoproject).

**index.html**
~~~js
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width="device-width"" />
    <title>Index</title>
    <link href="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css"
          rel="stylesheet" type="text/css" />
    <script src="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function(event) {
            // specifying the date format
            gantt.config.date_format = "%Y-%m-%d %H:%i";
            // initializing gantt
            gantt.init("gantt_here");

            // initiating data loading
            gantt.load("/api/data");
            // initializing dataProcessor
            var dp = new gantt.dataProcessor("/api/");
            // and attaching it to gantt
            dp.init(gantt);
            // setting the REST mode for dataProcessor
            dp.setTransactionMode("REST");
        });
    </script>
</head>
<body>
    <div id="gantt_here" style="width: 100%; height: 100vh;"></div>
</body>
</html>
~~~

Beim Laden der Seite wird das Gantt-Diagramm initialisiert und das Laden der Daten startet direkt über `gantt.load()`. Der [`dataProcessor`](guides/server-side.md#technique) wird ebenfalls eingerichtet, sodass alle Änderungen des Benutzers am Diagramm zurück an den Server gespeichert werden. Da das Backend noch nicht eingerichtet ist, wird die volle Funktionalität erst nach der Implementierung sichtbar.

Öffnen Sie als Nächstes **Program.cs** und konfigurieren Sie die App so, dass sie die **index.html**-Seite bereitstellt. Dies erfolgt durch das Aktivieren der Bereitstellung statischer Dateien aus dem `wwwroot`-Ordner durch Hinzufügen von `app.UseDefaultFiles()`.

Weitere Informationen finden Sie [hier](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-2.1&tabs=aspnetcore2x).

**Program.cs**
~~~js
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

Die Methode `app.UseDefaultFiles()` ermöglicht das Bereitstellen von Standarddateien, indem sie nach diesen im **wwwroot**-Ordner sucht:

- index.html
- index.htm
- default.html
- default.htm

Sie können einen dieser Dateinamen verwenden; in diesem Tutorial wird "index.html" verwendet.

Beachten Sie, dass `UseDefaultFiles()` nur URLs umschreibt und die Dateien selbst nicht bereitstellt. Um tatsächlich statische Dateien auszuliefern, muss auch `UseStaticFiles()` hinzugefügt werden.

Nach Abschluss dieser Schritte zeigt die Anwendung beim Ausführen ein leeres Gantt-Diagramm an. Die Meldung "Invalid data" oben rechts erscheint, weil `gantt.load()` aufgerufen wird, aber noch kein Backend verfügbar ist, das Daten bereitstellt. Sobald der Controller implementiert ist, werden Aufgaben und Verknüpfungen im Gantt-Diagramm korrekt angezeigt.

![dhtmlxGantt mit ASP.NET Core 2 Gantt hinzufügen](/img/adding_gantt_dotnet_core.png)

Mit dieser Grundkonfiguration können Sie nun das Backend erstellen. Beginnen Sie mit der Definition von Modellklassen und fahren Sie dann mit dem Erstellen des WebAPI-Controllers fort.

## Schritt 3. Modelle und Datenbank erstellen

Beginnen Sie mit der Definition der Datenmodelle. Ein typisches Gantt-Datenmodell besteht aus [Verknüpfungen und Aufgaben](guides/loading.md#standarddatabasestructure). 
dhtmlxGantt verwendet andere Eigenschaftsnamen als .NET-Konventionen. 
Außerdem werden einige Eigenschaften nur auf der Clientseite oder für Backend-Logik verwendet und sollten nicht in der Datenbank gespeichert werden.

Um dies zu handhaben, wird das [Data Transfer Object (DTO)](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5) Muster angewandt. Es werden zwei Modelltypen erstellt:

- Domänenmodellklassen für EF Core und die interne Nutzung der Anwendung
- DTO-Klassen für die Kommunikation mit der Web API

Die Zuordnung zwischen diesen Modellen wird ebenfalls implementiert.

### Modelle

Fügen Sie einen neuen Ordner mit dem Namen **Models** im Projektverzeichnis hinzu. Dieser Ordner enthält die Modellklassen und den EF-Kontext.

#### Task Model

Erstellen Sie eine Klasse zur Darstellung von Aufgaben. Fügen Sie eine neue Datei mit dem Namen **Task.cs** im Ordner Models hinzu, indem Sie mit der rechten Maustaste auf den Ordner klicken und *Add->Class* auswählen.

Die Klasse sollte wie folgt aussehen:

**DHX.Gantt/Models/Task.cs**
~~~js
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

Eine vollständige Liste der Eigenschaften des Task-Objekts finden Sie [hier](guides/loading.md#task_properties).

#### Link Model

Fügen Sie eine weitere Datei für Verknüpfungen hinzu:

**DHX.Gantt/Models/Link.cs**
~~~js
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

Mit den fertigen Modellen können Sie nun die Datenbankverbindung konfigurieren.

### Datenbankverbindung konfigurieren

Folgen Sie diesen Schritten, um die Datenbankverbindung einzurichten:

#### Entity Framework Core installieren

[Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) übernimmt die Kommunikation mit der Datenbank. Um es zu installieren:

- Suchen Sie im Projektbaum unter DHTMLX.Gantt den Punkt Dependencies
- Klicken Sie mit der rechten Maustaste und wählen Sie *Manage NuGet packages*
- Wechseln Sie auf die Registerkarte *Browse* und installieren Sie **Microsoft.EntityFrameworkCore.SqlServer**, **Microsoft.EntityFrameworkCore** und **Microsoft.EntityFrameworkCore.Design**

![dhtmlxGantt mit ASP.NET Core EF Core Installation](/img/howtostart_dotnetcore_entityvianuget.png)

Alternativ können Sie die Package Manager Console verwenden:

~~~
PM> Install-Package Microsoft.EntityFrameworkCore.SqlServer
PM> Install-Package Microsoft.EntityFrameworkCore
PM> Install-Package Microsoft.EntityFrameworkCore.Design
~~~

Diese Pakete stellen die notwendigen Werkzeuge für die Datenbankinteraktion bereit.

#### Entity Context erstellen

Definieren Sie als Nächstes eine Sitzung mit der Datenbank, um das Laden und Speichern von Daten zu ermöglichen, indem Sie eine Kontextklasse erstellen:

- Fügen Sie eine neue Datei mit dem Namen **GanttContext.cs** im *Models*-Ordner hinzu
- Definieren Sie die Klasse **GanttContext** darin

**DHX.Gantt/Models/GanttContext.cs**
~~~js
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

Nun ist es an der Zeit, die Datenbank mit einigen Anfangsdaten zu befüllen. Erstellen Sie dazu einen Datenbank-Initialisierer, der Aufgaben und Verknüpfungen einfügt. 
Definieren Sie im Ordner **Models** eine Klasse mit dem Namen **GanttSeeder**. Diese Klasse enthält eine **Seed()**-Methode, die für das Hinzufügen von Aufgaben und Verknüpfungen zur Datenbank verantwortlich ist.

**DHX.Gantt/Models/GanttSeeder.cs**
~~~js
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

Als Nächstes muss die Datenbank in **Program.cs** registriert werden. Dafür wird zunächst eine Verbindungszeichenfolge benötigt. 
Diese Verbindungszeichenfolge wird [in einer JSON-Datei innerhalb der Anwendungseinstellungen](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-2.1&tabs=basicconfiguration) gespeichert. 
Erstellen Sie die Datei **appsettings.json** (oder öffnen Sie sie, falls sie bereits existiert), und fügen Sie die Verbindungszeichenfolge für die Datenbank hinzu:

**appsettings.json**
~~~js
{
  "ConnectionStrings": {
    "DefaultConnection": "Server="(localdb)mssqllocaldb;"
        Database=GanttDatabase;Trusted_Connection=True;"
  }
}
~~~

Der Datenbankkontext wird mithilfe von 
[Dependency Injection](https://learn.microsoft.com/en-us/aspnet/core/data/ef-rp/intro?view="aspnetcore-2.1)" registriert.

Fügen Sie die folgenden Namespaces zu **Program.cs** hinzu:

**Program.cs**
~~~js
using Microsoft.EntityFrameworkCore;
using DHX.Gantt.Models;
~~~

Die Registrierung sieht dann wie folgt aus:

**Program.cs**
~~~js
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<GanttContext>(
    options => options.UseSqlServer(connectionString));
~~~

Um Controller zu aktivieren, wird die Methode **services.AddControllers()** hinzugefügt:

**Program.cs**
~~~js
builder.Services.AddControllers();
~~~

Und **app.MapControllers()** wird aufgerufen, um die Controller-Routen zu registrieren:

**Program.cs**
~~~js
app.MapControllers();
~~~


Hier ist der vollständige Inhalt von **Program.cs**:

**Program.cs**
~~~js
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

Abschließend sollte die Datenbank beim Starten der App initialisiert und befüllt werden. Obwohl hierfür normalerweise Migrationen verwendet werden, wird in diesem Beispiel aus Einfachheitsgründen darauf verzichtet.

Beginnen Sie mit dem Erstellen einer Klasse, in der die Initialisierung stattfindet. Fügen Sie die Datei **GanttInitializerExtension.cs** im Ordner **Models** hinzu:

**Models/GanttInitializerExtension.cs**
~~~js
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

Rufen Sie dann **InitializeDatabase()** wie folgt auf:

**Program.cs**
~~~js
app.InitializeDatabase();
~~~

Wie bereits erwähnt, wird in diesem Tutorial auf Migrationen verzichtet und stattdessen auf *EnsureCreated* und Seeding gesetzt.

Damit ist dieser Abschnitt abgeschlossen. Als Nächstes geht es mit dem Gantt-Chart weiter.

### DTOs und Mapping definieren

Jetzt ist es an der Zeit, DTO-Klassen zu erstellen, die von der Web API verwendet werden. 
Beginnen Sie mit der DTO-Klasse für Task. Legen Sie im Ordner **Models** eine Datei an und definieren Sie die Klasse **WebApiTask.cs**:

**Models/WebApiTask.cs**
~~~js
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

Als Nächstes folgt die DTO-Klasse für Link, definiert in **WebApiLink.cs** im Ordner **Models**:

**Models/WebApiLink.cs**
~~~js
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

Nach Abschluss dieses Schritts sollte die Ordnerstruktur wie folgt aussehen:

![Gantt ASP.NET Core 2 All models](/img/howtostart_dotnetcore_structure.png)

An diesem Punkt empfiehlt es sich, die Anwendung zu starten, um zu überprüfen, ob alles korrekt eingerichtet ist. Wenn keine Laufzeitfehler auftreten, war die Einrichtung erfolgreich.

## Schritt 4. Implementierung der Web API

Jetzt ist es Zeit, die REST API zu implementieren.

### Hinzufügen von Controllern

Erstellen Sie einen Ordner **Controllers** und fügen Sie drei leere API-Controller hinzu: einen für Tasks, einen für Links und einen für das gesamte Dataset:

![Gantt ASP.NET Core 2 adding controllers](/img/howtostart_dotnetcore_addcontrollers.png)

#### Task Controller

Hier finden Sie einen Controller zur Verwaltung von Tasks, der die grundlegenden CRUD-Operationen für Gantt-Tasks abdeckt.

Funktionsweise:

- Bei GET-Anfragen werden Tasks aus der Datenbank abgerufen und als Data Transfer Objects zurückgegeben;
- Bei PUT/POST-Anfragen kommen Tasks vom Client als WebApiTask-Instanzen. Dies ist das von dhtmlxGantt verwendete Format. Diese müssen vor dem Speichern im DatabaseContext in das vom EntityFramework verwendete Datenmodell (die Task-Klasse) umgewandelt werden.


**Controllers/TaskController.cs**
~~~js
using Microsoft.AspNetCore.Mvc;
using DHX.Gantt.Models;

namespace DHX.Gantt.Controllers
{
    [Produces("application/json")]
    [Route("api/task")]
    public class TaskController : Controller
    {
        private readonly GanttContext _context;
        public TaskController(GanttContext context)
        {
            _context = context;
        }

        // GET api/task
        [HttpGet]
        public IEnumerable<WebApiTask> Get()
        {
            return _context.Tasks
                .ToList()
                .Select(t => (WebApiTask)t);
        }

        // GET api/task/5
        [HttpGet("{id}")]
        public Models.Task? Get(int id)
        {
            return _context
                .Tasks
                .Find(id);
        }

        // POST api/task
        [HttpPost]
        public ObjectResult Post(WebApiTask apiTask)
        {
            var newTask = (Models.Task)apiTask;

            _context.Tasks.Add(newTask);
            _context.SaveChanges();

            return Ok(new
            {
                tid = newTask.Id,
                action = "inserted"
            });
        }

        // PUT api/task/5
        [HttpPut("{id}")]
        public ObjectResult? Put(int id, WebApiTask apiTask)
        {
            var updatedTask = (Models.Task)apiTask;
            var dbTask = _context.Tasks.Find(id);
            if (dbTask == null)
            {
                return null;
            }
            dbTask.Text = updatedTask.Text;
            dbTask.StartDate = updatedTask.StartDate;
            dbTask.Duration = updatedTask.Duration;
            dbTask.ParentId = updatedTask.ParentId;
            dbTask.Progress = updatedTask.Progress;
            dbTask.Type = updatedTask.Type;

            _context.SaveChanges();

            return Ok(new
            {
                action = "updated"
            });
        }

        // DELETE api/task/5
        [HttpDelete("{id}")]
        public ObjectResult DeleteTask(int id)
        {
            var task = _context.Tasks.Find(id);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                _context.SaveChanges();
            }

            return Ok(new
            {
                action = "deleted"
            });
        }
    }
}
~~~

#### Link Controller

Als Nächstes folgt der Controller für Links:

**Controllers/LinkController.cs**
~~~js
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using DHX.Gantt.Models;

namespace DHX.Gantt.Controllers
{
    [Produces("application/json")]
    [Route("api/link")]
    public class LinkController : Controller
    {
        private readonly GanttContext _context;
        public LinkController(GanttContext context)
        {
            _context = context;
        }

        // GET api/Link
        [HttpGet]
        public IEnumerable<WebApiLink> Get()
        {
            return _context.Links
                .ToList()
                .Select(t => (WebApiLink)t);
        }

        // GET api/Link/5
        [HttpGet("{id}")]
        public Link? Get(int id)
        {
            return _context
                .Links
                .Find(id);
        }

        // POST api/Link
        [HttpPost]
        public ObjectResult Post(WebApiLink apiLink)
        {
            var newLink = (Link)apiLink;

            _context.Links.Add(newLink);
            _context.SaveChanges();

            return Ok(new
            {
                tid = newLink.Id,
                action = "inserted"
            });
        }

        // PUT api/Link/5
        [HttpPut("{id}")]
        public ObjectResult Put(int id, WebApiLink apiLink)
        {
            var updatedLink = (Link)apiLink;
            updatedLink.Id = id;
             _context.Entry(updatedLink).State = EntityState.Modified;


            _context.SaveChanges();

            return Ok(new
            {
                action = "updated"
            });
        }

        // DELETE api/Link/5
        [HttpDelete("{id}")]
        public ObjectResult DeleteLink(int id)
        {
            var Link = _context.Links.Find(id);
            if (Link != null)
            {
                _context.Links.Remove(Link);
                _context.SaveChanges();
            }

            return Ok(new
            {
                action = "deleted"
            });
        }
    }
}
~~~

#### Data Controller

Abschließend folgt der Controller für die Datenaktion:

**Controllers/DataController.cs**
~~~js
using Microsoft.AspNetCore.Mvc;
using DHX.Gantt.Models;

namespace DHX.Gantt.Controllers
{
    [Produces("application/json")]
    [Route("api/data")]
    public class DataController : Controller
    {
        private readonly GanttContext _context;
        public DataController(GanttContext context)
        {
            _context = context;
        }

        // GET api/data
        [HttpGet]
        public object Get()
        {
            return new
            {
                data = _context.Tasks.ToList().Select(t => (WebApiTask)t),
                links = _context.Links.ToList().Select(l => (WebApiLink)l)

            };
        }
        
    }
}
~~~

Wenn alles eingerichtet ist, ist die Anwendung bereit zum Ausführen und Sie sehen ein voll funktionsfähiges Gantt-Diagramm.

![Gantt ASP.NET Core Gantt is ready](/img/ready_gantt_dotnet_core.png)


[Der vollständige Quellcode ist auch auf GitHub verfügbar](https://github.com/DHTMLX/gantt-howto-dotnet-core/).

## Fehlerbehandlung

Um Fehler effektiv zu verwalten, sollten Sie eine spezielle [Middleware-Klasse](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/startup?view="aspnetcore-2.1)" erstellen, die Laufzeit-Ausnahmen abfängt und entsprechende Antworten sendet. Diese Middleware wird anschließend in die Request-Pipeline der App eingebunden. So funktioniert es:

1. Fügen Sie Ihrem Projekt eine Middleware-Klasse mithilfe einer Vorlage hinzu.

![Gantt ASP.NET Core middleware class](/img/dotnet_core_middleware.png)

2. Installieren Sie das JSON-Framework für ASP.NET Core. Dies kann über den NuGet-Paket-Manager erfolgen:

![Gantt ASP.NET Core Install NewtonSoft Json](/img/install_newtonsoft.png)

Oder über die Package Manager Console:

~~~
PM> Install-Package NewtonSoft.JSON
~~~

3. Suchen Sie die **Invoke**-Methode in der Middleware. Da einige Handler Ausnahmen auslösen können, umgeben Sie den Aufruf von `_next` mit einem `try-catch`-Block und behandeln Sie Fehler, sobald sie auftreten.

**GanttErrorMiddleware.cs**
~~~js
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

4. Fügen Sie folgenden Namespace zu **GanttErrorMiddleware.cs** hinzu:

~~~js
using Newtonsoft.Json;
~~~

5. Die Middleware ist nun einsatzbereit. Öffnen Sie als Nächstes **Program.cs** und registrieren Sie die Middleware, indem Sie Folgendes hinzufügen:

**Program.cs**
~~~js
using DHX.Gantt;
~~~

Fügen Sie die Middleware dann mit folgendem Aufruf in die Pipeline ein:

**Program.cs**
~~~js
app.UseGanttErrorMiddleware();
~~~

## Speichern der Aufgabenreihenfolge {#storingtheorderoftasks}

Wenn Nutzer Aufgaben per Drag & Drop auf der Clientseite umsortieren, sollte die neue Reihenfolge in der Datenbank gespeichert werden. Ausführliche Informationen finden Sie in [diesem Abschnitt](guides/server-side.md#storingtheorderoftasks).

So aktivieren Sie das Speichern der Aufgabenreihenfolge in Ihrem Gantt.

### Umordnen auf der Clientseite

Aktivieren Sie zuerst das Umordnen von Aufgaben auf der Clientseite, indem Sie diese Zeilen zu **index.html** hinzufügen:

**wwwroot/index.html**
~~~js
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

// specifying the date format
gantt.config.date_format = "%Y-%m-%d %H:%i";
// initializing gantt
gantt.init("gantt_here");
~~~

### Hinzufügen der Aufgabenreihenfolge zum Modell

Aktualisieren Sie anschließend das Backend, damit die aktuelle Reihenfolge der Aufgaben abgebildet wird. Fügen Sie dem **Task**-Modell eine neue Eigenschaft hinzu:

**Models/Task.cs**
~~~js
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

### Aktualisieren der Controller

Auch die Controller müssen entsprechend angepasst werden.

1. Der Client sollte Aufgaben nach ihrem **SortOrder** sortiert erhalten. Fügen Sie die markierte Zeile zum DataController hinzu:

**Controllers/DataController.cs**
~~~js
[HttpGet]
public object Get()
{
    return new
        {
            data = _context.Tasks
                .OrderBy(t => t.SortOrder) /*!*/
                .ToList()
                .Select(t => (WebApiTask)t),
               links = _context.Links
                .ToList()
                .Select(l => (WebApiLink)l)
        };
}
~~~

2. Beim Erstellen neuer Aufgaben sollte ein Standardwert für **SortOrder** vergeben werden:

**controllers/TaskController.cs**
~~~js
// POST api/task
[HttpPost]
public IActionResult Post(WebApiTask apiTask)
{
    var newTask = (Models.Task)apiTask;

    newTask.SortOrder = _context.Tasks.Max(t => t.SortOrder) + 1; /*!*/
    _context.Tasks.Add(newTask);
    _context.SaveChanges();

    return Ok(new
    {
        tid = newTask.Id,
        action = "inserted"
    });
}
~~~

3. Der **sortOrder** muss aktualisiert werden, wenn Aufgaben clientseitig umsortiert werden. Beim Umordnen sendet Gantt eine PUT-Anfrage mit der neuen Positionsinformation in der 
['target'](guides/server-side.md#storingtheorderoftasks)-Eigenschaft, zusammen mit weiteren Aufgabendetails.

Fügen Sie der **WebApiTask.cs**-Klasse eine `target`-Eigenschaft hinzu:

**Models/WebApiTask.cs**
~~~js
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

Implementieren Sie nun die Logik zum Umordnen innerhalb der PUT-(EditTask)-Aktion. Aktualisieren Sie die Put-Methode im Task-Controller:

**Controllers/TaskController.cs**
~~~js
// PUT api/task/5
[HttpPut("{id}")]
public IActionResult? Put(int id, WebApiTask apiTask)
{
    var updatedTask = (Models.Task)apiTask;
    updatedTask.Id = id;
 
    var dbTask = _context.Tasks.Find(id);
    if (dbTask == null)
    {
        return null;
    }
    dbTask.Text = updatedTask.Text;
    dbTask.StartDate = updatedTask.StartDate;
    dbTask.Duration = updatedTask.Duration;
    dbTask.ParentId = updatedTask.ParentId;
    dbTask.Progress = updatedTask.Progress;
    dbTask.Type = updatedTask.Type;
 
    if (!string.IsNullOrEmpty(apiTask.target))            /*!*/            
    {                                                    /*!*/
         // reordering happened                            /*!*/
         this._UpdateOrders(dbTask, apiTask.target);    /*!*/
    }                                                    /*!*/
 
    _context.SaveChanges();
 
    return Ok(new
    {
         action = "updated"
    });
}
~~~

Fügen Sie die Hilfsmethode hinzu, die die Reihenfolge der Aufgaben anpasst:

**Controllers/TaskController.cs**
~~~js
private void _UpdateOrders(Models.Task updatedTask, string orderTarget)
{
    int adjacentTaskId;
    var nextSibling = false;

    var targetId = orderTarget;

    // adjacent task id may come as '{id}' or 'next:{id}' indicating 
    // whether it's the next or previous sibling
    if (targetId.StartsWith("next:"))
    {
        targetId = targetId.Replace("next:", "");
        nextSibling = true;
    }

    if (!int.TryParse(targetId, out adjacentTaskId))
    {
        return;
    }

    var adjacentTask = _context.Tasks.Find(adjacentTaskId);
    var startOrder = adjacentTask!.SortOrder;

    if (nextSibling)
         startOrder++;

    updatedTask.SortOrder = startOrder;

    var updateOrders = _context.Tasks
        .Where(t => t.Id != updatedTask.Id)
        .Where(t => t.SortOrder >= startOrder)
        .OrderBy(t => t.SortOrder);

    var taskList = updateOrders.ToList();

    taskList.ForEach(t => t.SortOrder++);
}
~~~

## Anwendungssicherheit

Gantt selbst bietet keinen Schutz vor Bedrohungen wie SQL-Injection, XSS oder CSRF. Die Absicherung der Anwendung liegt in der Verantwortung der Backend-Entwickler. Weitere Informationen finden Sie im [zugehörigen Artikel](guides/app-security.md).

### XSS-Schutz

Ein einfacher Ansatz ist das Kodieren von Textfeldern, bevor sie an den Client gesendet werden.

Im folgenden Beispiel wird der integrierte HtmlEncoder verwendet, um HTML in den Aufgabentexten zu maskieren. So bleibt der Originalwert in der Datenbank erhalten, aber der Client erhält eine sichere Version von `task.text`.

**Models/WebApiTask.cs**
~~~js
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

Alternativ kann eine spezialisierte Bibliothek wie [HtmlAgilityPack](https://www.nuget.org/packages/HtmlAgilityPack/) verwendet werden, um jegliches HTML beim Speichern oder Laden von Aufgaben vollständig zu entfernen.

## Fehlerbehebung

Falls Sie alle Schritte zur Integration von Gantt mit ASP.NET Core befolgt haben, aber Aufgaben und Links nicht auf der Seite angezeigt werden, lesen Sie den Artikel [Troubleshooting Backend Integration Issues](guides/troubleshooting.md). Dort werden häufige Probleme und deren Lösungen beschrieben.


## Wie geht es weiter?

An diesem Punkt haben Sie eine funktionierende Gantt-Implementierung. Der vollständige Quellcode steht auf [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core) zum Klonen oder Herunterladen für Ihre Projekte bereit.

Sie können außerdem [Leitfäden zu vielen Gantt-Funktionen](guides.md) oder Tutorials zur [Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md) erkunden.
