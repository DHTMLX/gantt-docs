---
title: "dhtmlxGantt mit ASP.NET MVC"
sidebar_label: "ASP.NET MVC"
---

dhtmlxGantt mit ASP.NET MVC 
===============================

Dieses Tutorial bietet eine klare, schrittweise Anleitung zur Erstellung eines Gantt-Diagramms mit [ASP.NET](https://dotnet.microsoft.com/apps/aspnet) und einer REST-API auf der Serverseite.

Weitere Integrationsoptionen für andere serverseitige Technologien finden Sie in diesen Tutorials:

- [dhtmlxGantt with ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)

In diesem Beispiel wird das ASP.NET MVC 5 Framework zusammen mit Web API 2 Controllern verwendet, um die REST-API für die Gantt-Anwendung zu erstellen. Das [Entity Framework](https://learn.microsoft.com/en-us/aspnet/entity-framework) übernimmt die Datenbankinteraktionen. Für die Entwicklung wird die Visual Studio IDE verwendet.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/gantt-howto-dotnet).
:::

Schritt 1. Projekt erstellen
-----------------------------

### Ein neues Visual Studio-Projekt erstellen

Starten Sie Visual Studio 2022 und wählen Sie *Create a new project*.

![how_to_start_net_create_project](/img/how_to_start_net_create_project.png)

Wählen Sie anschließend "ASP.NET Web Application" und geben Sie als Namen *DHX.Gantt.Web* ein. Falls die Vorlage nicht sichtbar ist, beachten Sie den Abschnitt [Troubleshooting](#troubleshooting).

![how_to_start_net_project_template](/img/how_to_start_net_project_template.png)

![how_to_start_net_configure_project](/img/how_to_start_net_configure_project.png)

Wählen Sie die Projektvorlage *Empty* und aktivieren Sie sowohl die Optionen für MVC als auch für Web API.

![how_to_start_net_app](/img/how_to_start_net_app.png)

Schritt 2. Gantt zur Seite hinzufügen
-------------------------------------

### Einen Controller erstellen

Nachdem das Projekt eingerichtet ist, fügen Sie einen MVC-Controller hinzu, der die Gantt-Seite anzeigen wird.

Klicken Sie mit der rechten Maustaste auf den Ordner Controllers, wählen Sie Add->Controller und dann MVC 5 Controller -> Empty. Benennen Sie den neuen Controller "HomeController".

![how_to_start_net_controller](/img/how_to_start_net_controller.png)

Der HomeController enthält standardmäßig die Methode *Index()* der Klasse *ActionResult*, sodass hier keine zusätzliche Logik erforderlich ist. Für diese Methode wird eine View hinzugefügt.

**Controllers/HomeController.cs**
~~~js
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DHX.Gantt.Web.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
    }
}
~~~

### Eine View erstellen

Erstellen Sie nun die Index-Seite. Navigieren Sie zu Views/Home und fügen Sie eine leere View mit dem Namen Index hinzu:

![how_to_start_net_view](/img/how_to_start_net_view.png)

Öffnen Sie die View und fügen Sie folgenden Code ein:
**Views/Home/Index.cshtml**
~~~html
@{
    Layout = null;
}

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

Dieser Code führt folgende Aufgaben aus:

- richtet ein einfaches Seitenlayout für die Gantt-Anwendung ein
- bindet dhtmlxGantt JavaScript und CSS über [CDN-Links](guides/cdn-links-list.md) ein
- initialisiert das Gantt-Diagramm auf der Seite

Beachten Sie die Konfiguration des Datumsformats:

**Views/Home/Index.cshtml**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i";
~~~

Dies stellt sicher, dass der Client Datumsangaben vom Server korrekt interpretieren kann.

Außerdem ist Gantt so konfiguriert, dass es mit einer RESTful API im Backend arbeitet, wobei ["/api/"](guides/server-side.md#technique) als Basisroute verwendet wird:

**Views/Home/Index.cshtml**
~~~js
gantt.load("/api/data");
// initializing dataProcessor
var dp = new gantt.dataProcessor("/api/");
// and attaching it to gantt
dp.init(gantt);
// setting the REST mode for dataProcessor
dp.setTransactionMode("REST");
~~~

Die serverseitige Implementierung wird im nächsten Schritt behandelt. Sie können die Anwendung aber bereits ausführen und sehen, wie das Gantt-Diagramm auf der Seite erscheint.

![adding_gantt](/img/adding_gantt.png)


Schritt 3. Modelle und Datenbank erstellen
------------------------------------------

### Modelle erstellen

Definieren Sie als Nächstes die Modellklassen für das Gantt-Diagramm. Das Datenmodell besteht aus [Links und Tasks](guides/loading.md#standarddatabasestructure).

dhtmlxGantt verwendet für sein Datenmodell eine eigene Namenskonvention, die von der üblichen C#-Konvention abweichen kann. Einige clientseitige Eigenschaften müssen nicht in der Datenbank gespeichert werden, sondern werden nur im Client oder in der Backend-Logik verwendet.

Um dies zu handhaben, wird das [Data Transfer Object](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5)-Muster angewendet: Domänenmodellklassen werden mit EF und intern verwendet, während DTO-Klassen die Kommunikation mit der Web API übernehmen. Die Zuordnung (Mapping) zwischen diesen Modellen wird implementiert.

Los geht's!

#### Task-Modell

Beginnen Sie mit einer Klasse für Task. Sie könnte wie folgt aussehen:

**Models/Task.cs**
~~~js
using System;

namespace DHX.Gantt.Web.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime StartDate { get; set; }
        public int Duration { get; set; }
        public decimal Progress { get; set; }
        public int? ParentId { get; set; }
        public string Type { get; set; }
    }
}
~~~

Eine vollständige Liste der verfügbaren Eigenschaften für das Task-Objekt, sowohl erforderliche als auch optionale, finden Sie in der 
[entsprechenden Dokumentation](guides/loading.md#task_properties).

#### Link-Modell

Erstellen Sie nun die Link-Klasse wie folgt:

**Models/Link.cs**
~~~js
namespace DHX.Gantt.Web.Models
{
    public class Link
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int SourceTaskId { get; set; }
        public int TargetTaskId { get; set; }
    }
}
~~~

### Datenbankverbindung konfigurieren

#### Entity Framework installieren

Wie bereits erwähnt, werden die Datenbankoperationen mit dem [Entity Framework](https://learn.microsoft.com/en-us/aspnet/entity-framework) ausgeführt.

Um es zu installieren, führen Sie diesen Befehl in der Package Manager Console aus:

~~~js
Install-Package EntityFramework
~~~

#### Datenbankkontext erstellen

Erstellen Sie als Nächstes den Datenbankkontext. Der Kontext stellt eine Sitzung mit der Datenbank dar und verwaltet das Abrufen und Speichern von Daten.

Klicken Sie mit der rechten Maustaste auf den Ordner *Models* und wählen Sie Add->Class. Benennen Sie die Klasse "GanttContext" und verwenden Sie diesen Inhalt:

**Models/GanttContext.cs**
~~~js
using System.Data.Entity;

namespace DHX.Gantt.Web.Models
{
    public class GanttContext : DbContext
    {
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Link> Links { get; set; }
    }
}
~~~

#### Anfangsdaten zur Datenbank hinzufügen

Jetzt können einige Anfangsdaten in die Datenbank eingefügt werden.

Entity Framework kann die Datenbank automatisch beim Start der Anwendung erstellen. Damit die Datenbank bei Modelländerungen aktualisiert wird, konfigurieren Sie sie so, dass sie dann gelöscht und neu erstellt wird.

Beginnen Sie mit dem Erstellen eines Datenbank-Initialisierers. Fügen Sie im Ordner *App_Start* eine neue Klasse hinzu, die von *DropCreateDatabaseIfModelChanges* erbt. Nennen Sie sie "GanttInitializer".

Überschreiben Sie in dieser Klasse die Methode *Seed()*, um Testdaten einzufügen. Verwenden Sie die Methode *Add()*, um Entitäten zum Kontext hinzuzufügen.

Hier ist die vollständige Klasse *GanttInitializer*:

**App_Start/GanttInitializer.cs**
~~~js
using System;
using System.Collections.Generic;
using System.Data.Entity;


namespace DHX.Gantt.Web.Models
{
    public class GanttInitializer : DropCreateDatabaseIfModelChanges<GanttContext>
    {
        protected override void Seed(GanttContext context)
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
            context.SaveChanges();

            List<Link> links = new List<Link>()
            {
                new Link() {Id = 1, SourceTaskId = 1, TargetTaskId = 2, Type = "1"},
                new Link() {Id = 2, SourceTaskId = 2, TargetTaskId = 3, Type = "0"}
            };

            links.ForEach(s => context.Links.Add(s));
            context.SaveChanges();
        }
    }
}
~~~

Öffnen Sie die Datei *Global.asax*, die Code enthält, der beim Start der Anwendung ausgeführt wird. Fügen Sie den notwendigen Namespace hinzu und diese Zeile in die Methode *Application_Start()*, um den Initialisierer für den Kontext zu setzen:

**Global.asax.cs**
~~~js
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;

using System.Data.Entity;
using DHX.Gantt.Web.Models;

namespace DHX.Gantt.Web
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            Database.SetInitializer(new GanttInitializer());/*!*/
        }
    }
}
~~~

### Definition von DTOs und Mapping

Als Nächstes werden DTO-Klassen für die Web API deklariert. Zur Vereinfachung werden explizite Konvertierungsoperatoren definiert, um zwischen Model- und DTO-Klassen zu mappen.

Die TaskDto-Klasse ist wie folgt aufgebaut:

**Models/TaskDto.cs**
~~~js
using System;

namespace DHX.Gantt.Web.Models
{
    public class TaskDto
    {
        public int id { get; set; }
        public string text { get; set; }
        public string start_date { get; set; }
        public int duration { get; set; }
        public decimal progress { get; set; }
        public int? parent { get; set; }
        public string type { get; set; }
        public bool open
        {
            get { return true; }
            set { }
        }

        public static explicit operator TaskDto(Task task)
        {
            return new TaskDto
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

        public static explicit operator Task(TaskDto task)
        {
            return new Task
            {
                Id = task.id,
                Text = task.text,
                StartDate = DateTime.Parse(
                    task.start_date, 
                    System.Globalization.CultureInfo.InvariantCulture),
                Duration = task.duration,
                ParentId = task.parent,
                Type = task.type,
                Progress = task.progress
            };
        }
    }
}
~~~

Analog dazu ist die LinkDto-Klasse wie folgt definiert:

**Models/LinkDto.cs**
~~~js
namespace DHX.Gantt.Web.Models
{
    public class LinkDto
    {
        public int id { get; set; }
        public string type { get; set; }
        public int source { get; set; }
        public int target { get; set; }

        public static explicit operator LinkDto(Link link)
        {
            return new LinkDto
            {
                id = link.Id,
                type = link.Type,
                source = link.SourceTaskId,
                target = link.TargetTaskId
            };
        }

        public static explicit operator Link(LinkDto link)
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

Um das Datenmodell für die [Datenquelle](guides/supported-data-formats.md#json) zu vervollständigen, wird folgende Klasse hinzugefügt:

**Models/GanttDto.cs**
~~~js
using System.Collections.Generic;

namespace DHX.Gantt.Web.Models
{
    public class GanttDto
    {
        public IEnumerable<TaskDto> data { get; set; }
        public IEnumerable<LinkDto> links { get; set; }
    }
}
~~~

Schritt 4. Implementierung der Web API
------------------------------------------------

### Allgemeine Technik zum Laden von Daten mit REST API

Die Implementierung der API ist der nächste Schritt.

Basierend auf den [API-Details](guides/server-side.md#requestresponsedetails) sind zwei Controller erforderlich: einer für Tasks und einer für Links. Zusätzlich wird ein separater Controller für die Aktion "Daten laden" benötigt, da gantt in diesem Fall ein [gemischtes Ergebnis](guides/supported-data-formats.md#json) erwartet.

### Task Controller

So fügen Sie einen neuen Controller hinzu:

- Klicken Sie mit der rechten Maustaste auf den Ordner Controllers und wählen Sie Add -> Controller.
- Wählen Sie Web API 2 Controller -> Empty und benennen Sie den neuen Controller "TaskController".

Die grundlegenden CRUD-Aktionen für Task-Einträge werden wie folgt implementiert:

**Controllers/TaskController.cs**
~~~js
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.UI.WebControls;

using DHX.Gantt.Web.Models;

namespace DHX.Gantt.Web.Controllers
{
    public class TaskController : ApiController
    {
        private GanttContext db = new GanttContext();

        // GET api/Task
        public IEnumerable<TaskDto> Get()
        {
            return db.Tasks
                .ToList()
                .Select(t => (TaskDto)t);
        }

        // GET api/Task/5
        [System.Web.Http.HttpGet]
        public TaskDto Get(int id)
        {
            return (TaskDto)db
                .Tasks
                .Find(id);
        }

        // PUT api/Task/5
        [System.Web.Http.HttpPut]
        public IHttpActionResult EditTask(int id, TaskDto taskDto)
        {
            var updatedTask = (Task)taskDto;
            updatedTask.Id = id;
            db.Entry(updatedTask).State = EntityState.Modified;
            db.SaveChanges();

            return Ok(new
            {
                action = "updated"
            });
        }

        // POST api/Task
        [System.Web.Http.HttpPost]
        public IHttpActionResult CreateTask(TaskDto taskDto)
        {
            var newTask = (Task)taskDto;

            db.Tasks.Add(newTask);
            db.SaveChanges();

            return Ok(new
            {
                tid = newTask.Id,
                action = "inserted"
            });
        }

        // DELETE api/Task/5
        [System.Web.Http.HttpDelete]
        public IHttpActionResult DeleteTask(int id)
        {
            var task = db.Tasks.Find(id);
            if (task != null)
            {
                db.Tasks.Remove(task);
                db.SaveChanges();
            }

            return Ok(new
            {
                action = "deleted"
            });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

~~~

Die Logik ist hier klar:

- Die GET-Methoden holen Tasks aus der Datenbank und wandeln sie in ihre DTO-Repräsentation um.
- Die PUT- und POST-Methoden nehmen DTOs entgegen, wandeln sie zurück in Task-Modelle und übernehmen die Änderungen im Datenbankkontext.

Das gleiche Vorgehen gilt für die Links.

### Link Controller

Ein leerer Web API Controller wird für die Links wie folgt erstellt:

**Controllers/LinkController.cs**
~~~js
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using DHX.Gantt.Web.Models;

namespace DHX.Gantt.Web.Controllers
{
    public class LinkController : ApiController
    {
        private GanttContext db = new GanttContext();

        // GET api/Link
        [System.Web.Http.HttpGet]
        public IEnumerable<LinkDto> Get()
        {
            return db
                .Links
                .ToList()
                .Select(l => (LinkDto)l);
        }

        // GET api/Link/5
        [System.Web.Http.HttpGet]
        public LinkDto Get(int id)
        {
            return (LinkDto)db
                .Links
                .Find(id);
        }

        // POST api/Link
        [System.Web.Http.HttpPost]
        public IHttpActionResult CreateLink(LinkDto linkDto)
        {
            var newLink = (Link)linkDto;
            db.Links.Add(newLink);
            db.SaveChanges();

            return Ok(new
            {
                tid = newLink.Id,
                action = "inserted"
            });
        }

        // PUT api/Link/5
        [System.Web.Http.HttpPut]
        public IHttpActionResult EditLink(int id, LinkDto linkDto)
        {
            var clientLink = (Link)linkDto;
            clientLink.Id = id;

            db.Entry(clientLink).State = EntityState.Modified;
            db.SaveChanges();

            return Ok(new
            {
                action = "updated"
            });
        }

        // DELETE api/Link/5
        [System.Web.Http.HttpDelete]
        public IHttpActionResult DeleteLink(int id)
        {
            var link = db.Links.Find(id);
            if (link != null)
            {
                db.Links.Remove(link);
                db.SaveChanges();
            }
            return Ok(new
            {
                action = "deleted" 
            });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}
~~~

### Data Controller

Abschließend wird der Controller für die Datenaktion hinzugefügt:

**Controllers/DataController.cs**
~~~js
using System.Web.Http;

using DHX.Gantt.Web.Models;

namespace DHX.Gantt.Web.Controllers
{
    public class DataController : ApiController
    {
        // GET api/
        [System.Web.Http.HttpGet]
        public GanttDto Get()
        {
            return new GanttDto
            {
                data = new TaskController().Get(),
                links = new LinkController().Get()
            };
        }
    }
}
~~~

Mit dieser Konfiguration zeigt die Anwendung beim Ausführen ein voll funktionsfähiges Gantt-Diagramm auf der Seite an:

![ready_gantt_dotnet](/img/ready_gantt_dotnet.png)

[Eine fertige Demo ist auf GitHub verfügbar](https://github.com/DHTMLX/gantt-howto-dotnet).

Fehlerbehandlung 
-----------

[Exception filters](https://learn.microsoft.com/en-us/previous-versions/aspnet/gg416513(v="vs.98))" bieten eine Möglichkeit, Ausnahmen in CRUD-Handlern abzufangen und Antworten zu senden, die vom Client-seitigen gantt [interpretiert](guides/server-side.md#errorhandling) werden können.

Um die Fehlerbehandlung in der gantt API zu aktivieren, gehen Sie wie folgt vor:

Fügen Sie im Ordner *App_Start* eine neue Klasse mit dem Namen *GanttAPIExceptionFilterAttribute* hinzu:

**App_Start/GanttAPIExceptionFilterAttribute.cs**
~~~js
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace DHX.Gantt.Web
{
    public class GanttAPIExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            
            context.Response = context.Request.CreateResponse(
                HttpStatusCode.InternalServerError, new
                    {
                        action = "error",
                        message = context.Exception.Message
                    }
            );
        }
    }
}
~~~

Wenden Sie diesen Filter dann auf die WebAPI-Controller an:

- Im Data Controller:
**Controllers/DataController.cs**
~~~js
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class DataController : ApiController
~~~

- Im Link Controller:
**Controllers/LinkController.cs**
~~~js
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class LinkController : ApiController
~~~

- Und im Task Controller:
**Controllers/TaskController.cs**
~~~js
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class TaskController : ApiController
~~~

Mit dieser Konfiguration erhält der Client bei jeder während der Web API-Verarbeitung ausgelösten Ausnahme einen Fehlerstatus und eine Fehlermeldung, die verarbeitet oder angezeigt werden kann.

Beachten Sie, dass das direkte Übermitteln von Ausnahme-Meldungen an Clients für produktive Umgebungen möglicherweise nicht geeignet ist.

## Speichern der Aufgabenreihenfolge {#storingtheorderoftasks}

Das clientseitige gantt unterstützt das [Umsortieren von Aufgaben](guides/reordering-tasks.md) per Drag & Drop. Bei Nutzung dieser Funktion ist es notwendig, die Aufgabenreihenfolge in der Datenbank zu speichern. Weitere Informationen finden Sie in der [allgemeinen Beschreibung hier](guides/server-side.md#storingtheorderoftasks).

Im nächsten Schritt wird diese Funktionalität in die Anwendung integriert.

### Aufgaben-Neuanordnung im Client aktivieren

Zunächst sollten Benutzer in der Lage sein, Aufgaben direkt in der Benutzeroberfläche neu anzuordnen.

Öffnen Sie die *Index*-Ansicht und passen Sie die Gantt-Konfiguration wie folgt an:

**Views/Home/Index.cshtml**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

// Datumsformat festlegen
gantt.config.date_format = "%Y-%m-%d %H:%i";
// Gantt initialisieren
gantt.init("gantt_here");
~~~

### Aufgabenreihenfolge zum Modell hinzufügen

Als Nächstes aktualisieren wir das Backend, um diese Änderungen zu unterstützen.

Die Aufgabenreihenfolge wird in einer Eigenschaft namens SortOrder gespeichert, daher muss die *Task*-Klasse entsprechend angepasst werden:

**Models/Task.cs**
~~~js
using System;
using System.ComponentModel.DataAnnotations;

namespace DHX.Gantt.Web.Models
{
    public class Task
    {
        public int Id { get; set; }
        [MaxLength(255)]
        public string Text { get; set; }
        public DateTime StartDate { get; set; }
        public int Duration { get; set; }
        public decimal Progress { get; set; }
        public int? ParentId { get; set; }
        public string Type { get; set; }
        public int SortOrder { get; set; }/*!*/
    }
}
~~~

Auch der *TaskController* benötigt einige Anpassungen:

- Aufgaben, die an den Client gesendet werden, sollten nach ihrem SortOrder-Wert sortiert werden:

**Controllers/TaskController.cs**
~~~js
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]
    public class TaskController : ApiController
    {
        private GanttContext db = new GanttContext();

        // GET api/Task
        public IEnumerable<TaskDto> Get()
        {
            return db.Tasks
                .OrderBy(t => t.SortOrder) /*!*/
                .ToList()
                .Select(t => (TaskDto)t);
        }
~~~

- Beim Erstellen neuer Aufgaben sollte ein Standardwert für SortOrder zugewiesen werden:

**Controllers/TaskController.cs**
~~~js
namespace DHX.Gantt.Web.Controllers
{
    [System.Web.Http.HttpPost]
    public IHttpActionResult CreateTask(TaskDto taskDto)
    {
        var newTask = (Task)taskDto;

        newTask.SortOrder = db.Tasks.Max(t => t.SortOrder) + 1;/*!*/

        db.Tasks.Add(newTask);
        db.SaveChanges();

        return Ok(new
        {
            tid = newTask.Id,
            action = "inserted"
        });
    }
~~~

- Der SortOrder sollte aktualisiert werden, wann immer sich die Aufgabenreihenfolge auf der Clientseite ändert.

Wenn Aufgaben neu angeordnet werden, löst Gantt eine PUT-Anfrage aus, die die neue Position in der ['target'](guides/server-side.md#storingtheorderoftasks)-Eigenschaft zusammen mit weiteren Aufgabendetails enthält.

Um dies zu verarbeiten, fügen Sie der Task-DTO-Klasse eine neue Eigenschaft hinzu:

**Models/TaskDto.cs**
~~~js
namespace DHX.Gantt.Web.Models
{
  public class TaskDto
  {
    public int id { get; set; }
    public string text { get; set; }
    public string start_date { get; set; }
    public int duration { get; set; }
    public decimal progress { get; set; }
    public int? parent { get; set; }
    public string type { get; set; }
    public bool open{ get { return true; } set { } }
    public string target { get; set; }/*!*/
    
    ...
  }
}
~~~

Nun implementieren Sie die Logik zur Neuanordnung in der PUT- (EditTask-) Aktion:

**Controllers/TaskController.cs**
~~~js
    // PUT api/Task/5
    [System.Web.Http.HttpPut]
    public IHttpActionResult EditTask(int id, TaskDto taskDto)
    {
      var updatedTask = (Task)taskDto;
      updatedTask.Id = id;

      if (!string.IsNullOrEmpty(taskDto.target))
      {
        // Neuanordnung wurde durchgeführt
        this._UpdateOrders(updatedTask, taskDto.target);/*!*/
      }

      db.Entry(updatedTask).State = EntityState.Modified;
      db.SaveChanges();

      return Ok(new
      {
        action = "updated"
      });
    }
      
    private void _UpdateOrders(Task updatedTask, string orderTarget)/*!*/
    {
      int adjacentTaskId;
      var nextSibling = false;

      var targetId = orderTarget;

      // Die ID der benachbarten Aufgabe wird entweder als '{id}' oder als 'next:{id}' gesendet, 
      // abhängig davon, ob es sich um das nächste oder vorherige Geschwister handelt
      if (targetId.StartsWith("next:"))
      {
        targetId = targetId.Replace("next:", "");
        nextSibling = true;
      }

      if (!int.TryParse(targetId, out adjacentTaskId))
      {
        return;
      }

      var adjacentTask = db.Tasks.Find(adjacentTaskId);
      var startOrder = adjacentTask.SortOrder;

      if (nextSibling)
        startOrder++;

      updatedTask.SortOrder = startOrder;

      var updateOrders = db.Tasks
       .Where(t => t.Id != updatedTask.Id)
       .Where(t => t.SortOrder >= startOrder)
       .OrderBy(t => t.SortOrder);
                
       var taskList = updateOrders.ToList();

       taskList.ForEach(t => t.SortOrder++);
    }

~~~

Bekannte Probleme
-----------------

Beim Ausführen der App auf IIS können HTTP PUT- und DELETE-Anfragen Fehler 405 oder 401 zurückgeben. Dies kann daran liegen, dass das **WebDAV**-Modul mit RESTful-Handlern in Konflikt steht.

Eine übliche Lösung ist, das WebDAV-Modul in der **web.config**-Datei zu deaktivieren. Weitere Details finden Sie [hier](https://forums.iis.net/t/1166025.aspx).

Anwendungssicherheit
-------------------------

Gantt selbst bietet keinen Schutz vor Bedrohungen wie SQL-Injection, XSS oder CSRF-Angriffen. Die Sicherstellung der Anwendungssicherheit liegt in der Verantwortung des Entwicklers bei der Implementierung des Backends. Weitere Informationen finden Sie [im zugehörigen Artikel](guides/app-security.md).

Fehlerbehebung
-----------------

### ASP.NET Web Application-Vorlage fehlt

Falls die Projektvorlage "ASP.NET Web Application" in Visual Studio 2022 fehlt, gehen Sie wie folgt vor:

1. Schließen Sie Visual Studio 2022

2. Öffnen Sie das Startmenü und starten Sie den Visual Studio Installer

3. Suchen Sie *Visual Studio Community 2022* und klicken Sie auf *Ändern*

![vsinstaller](/img/vsinstaller.png)

4. Gehen Sie im Dialog zu *Individuelle Komponenten*, aktivieren Sie das Kontrollkästchen für *".NET Framework Project and item templates"* und klicken Sie anschließend auf *Ändern*

![components](/img/components.png)

Öffnen Sie danach Visual Studio 2022 erneut - die Vorlage sollte nun verfügbar sein.

### Ausnahme beim Initialisieren der Datenbank

Gelegentlich kann es passieren, dass der DropCreateDatabaseIfModelChanges-Initializer die vorhandene Datenbank löscht, aber keine neue erstellt.

![exception_error](/img/exception_error.png)

Falls dies auftritt, öffnen Sie *GanttInitializer.cs* und ersetzen Sie *DropCreateDatabaseIfModelChanges* durch *DropCreateDatabaseAlways*:

**App_Start/GanttInitializer.cs**
~~~js
using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace DHX.Gantt.Web.Models
{
    public class GanttInitializer : DropCreateDatabaseAlways<GanttContext> /*!*/
    {
        ...
    }
}
~~~

Führen Sie die Anwendung anschließend erneut aus.

### Probleme beim Rendern von Aufgaben und Verknüpfungen

Wenn Aufgaben und Verknüpfungen nach der Integration von Gantt mit ASP.NET MVC nicht angezeigt werden, lesen Sie bitte den Artikel [Troubleshooting Backend Integration Issues](guides/troubleshooting.md). Dort finden Sie Hinweise zur Ursachenermittlung.

Wie geht es weiter?
-------------------

An diesem Punkt ist das Gantt-Diagramm voll funktionsfähig. Der vollständige Code ist auf [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet) verfügbar und kann für eigene Projekte geklont oder heruntergeladen werden.

Zusätzlich können Sie [Leitfäden zu verschiedenen Gantt-Funktionen](guides.md) oder Tutorials zur [Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md) erkunden.
