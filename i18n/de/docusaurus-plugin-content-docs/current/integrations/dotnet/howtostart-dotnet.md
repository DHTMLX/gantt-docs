---
title: "dhtmlxGantt mit ASP.NET MVC"
sidebar_label: "ASP.NET MVC"
---

# dhtmlxGantt mit ASP.NET MVC 

Dieses Tutorial liefert Ihnen Schritt-für-Schritt-Anleitungen zum Erstellen von Gantt mit [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet) und REST-API auf der Serverseite. 

Sie können auch andere serverseitige Integrationsmöglichkeiten von Gantt erkunden, indem Sie eine der folgenden Tutorials auswählen:

- [dhtmlxGantt mit ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt mit Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt mit Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt mit PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt mit PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt mit Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt mit Ruby on Rails](integrations/other/howtostart-ruby.md)

Wir werden die ASP.NET MVC 5-Webplattform und den Web API 2-Controller für REST-API verwenden, um eine Gantt-Anwendung zu erstellen. 
Zur Organisation der Kommunikation mit einer Datenbank verwenden wir das [Entity Framework](https://learn.microsoft.com/en-us/aspnet/entity-framework). 
Wir bauen unsere Anwendung mit Hilfe der Visual Studio IDE.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/gantt-howto-dotnet).
:::

## Schritt 1. Erstellen eines Projekts

### Erstellen eines neuen Visual Studio-Projekts 

Starten Sie Visual Studio 2022 und wählen Sie *Neues Projekt erstellen*.

![how_to_start_net_create_project](/img/how_to_start_net_create_project.png)

Wählen Sie anschließend "ASP.NET Webanwendung" und nennen Sie das Projekt *DHX.Gantt.Web*. Falls Sie die benötigte Vorlage nicht finden können, prüfen Sie den Abschnitt [Troubleshooting](#trouble-shooting).


![how_to_start_net_project_template](/img/how_to_start_net_project_template.png)

![how_to_start_net_configure_project](/img/how_to_start_net_configure_project.png)

Wählen Sie unter den verfügbaren Vorlagen ein *Leeres* Projekt aus und deaktivieren Sie die Checkboxen MVC und Web API neben der Vorlagenliste.

![how_to_start_net_app](/img/how_to_start_net_app.png)

## Schritt 2. Hinzufügen von Gantt zur Seite

### Erstellen eines Controllers

Nun haben wir ein leeres Projekt und alles ist bereit, um unseren Gantt zu implementieren.

Zunächst fügen wir einen MVC-Controller hinzu, der eine Seite mit einem Gantt-Diagramm anzeigt.

Um ihn zu erstellen, rufen Sie das Kontextmenü für den Ordner Controllers auf und wählen Sie Add->Controller. 
Im geöffneten Fenster wählen Sie MVC 5 Controller -> Empty und nennen den neu hinzugefügten Controller "HomeController".

![how_to_start_net_controller](/img/how_to_start_net_controller.png)

Der HomeController besitzt standardmäßig die *Index()*-Methode der *ActionResult*-Klasse, daher ist keine zusätzliche Logik erforderlich. Wir fügen lediglich eine View dafür hinzu.


~~~js title="Controllers/HomeController.cs"
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

### Erstellen einer View

Nun ist es Zeit, unsere Index-Seite zu erstellen. Gehen Sie zu Views/Home und fügen Sie eine leere View mit dem Namen Index hinzu:

![how_to_start_net_view](/img/how_to_start_net_view.png)

Öffnen Sie die neugelegte View und fügen Sie den folgenden Code dort ein:

~~~html title="Views/Home/Index.cshtml"
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

Was haben wir hier gemacht:

- eine einfache Seitenmarkup für unsere Gantt-Anwendung definiert
- dhtmlx gantt js/css-Quellen über [CDN-Links](guides/cdn-links-list.md) hinzugefügt
- Gantt auf der Seite erstellt

Achten Sie auf die Konfiguration: Wir haben das [Datumsformat](api/config/date_format.md) festgelegt, das aus der Datenquelle stammt. 

~~~js title="Views/Home/Index.cshtml"
gantt.config.date_format = "%Y-%m-%d %H:%i";
~~~

Es ist notwendig, damit unser Client Datumswerte vom Server parsen kann.

Und wir haben dem Gantt auch mitgeteilt, dass es mit einer RESTful-API auf dem Backend arbeiten wird und standardmäßig ["/api/"](guides/server-side.md#technique) als Route verwenden soll:

~~~js title="Views/Home/Index.cshtml"
gantt.load("/api/data");
// initializing dataProcessor
var dp = new gantt.dataProcessor("/api/");
// and attaching it to gantt
dp.init(gantt);
// setting the REST mode for dataProcessor
dp.setTransactionMode("REST");
~~~


Die Serverseite selbst wird später implementiert. Vorerst können Sie die Anwendung ausführen und sehen, dass ein Gantt auf der Seite gerendert wird.

![adding_gantt](/img/adding_gantt.png)


## Schritt 3. Modelle und Datenbank erstellen

### Modelle erstellen

Nun sollten wir Modellklassen für das Gantt-Diagramm definieren. Ein Gantt-Datenmodell besteht aus [Links und Tasks]. 
Wie Sie sehen können, verwendet dhtmlxGantt eine bestimmte Namenskonvention für das Datenmodell, die sich von der in C# traditionell verwendeten unterscheidet. 
Das clientseitige Modell kann auch einige Eigenschaften enthalten, die Sie nicht in einer Datenbank speichern müssen, die jedoch entweder auf dem Client oder in der Backend-Logik verwendet werden.

Aus diesem Grund verwenden wir hier das [Data Transfer Object]-Muster: Wir definieren Domänenmodell-Klassen, die mit EF und innerhalb der App verwendet werden, sowie DTO-Klassen, die zur Kommunikation mit der Web API genutzt werden. Dann implementieren wir eine Art Mapping zwischen den beiden Modellen.

Legen wir los!

#### Task-Modell

Zuerst erstellen wir eine Klasse für Task. Ihr Inhalt kann dem Folgenden ähneln: 

~~~js title="Models/Task.cs"
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

Sie finden die vollständige Liste der Eigenschaften, sowohl Pflicht- als auch optionale, die für das Task-Objekt verfügbar sind, im
[entsprechenden Artikel](guides/loading.md#task_properties) der Dokumentation.

#### Link-Modell 

Nun ist es Zeit für die Link-Klasse, die wie folgt aussehen könnte:

~~~js title="Models/Link.cs"
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

### Konfiguration der Datenbankverbindung

#### Installation von Entity Framework

Wie Sie sich erinnern, werden wir die Arbeit mit einer Datenbank mithilfe des [Entity Framework] organisieren.

Zunächst müssen wir das Framework installieren. Führen Sie dazu den folgenden Befehl in der Package Manager Console aus:

~~~js
Install-Package EntityFramework
~~~

#### Erstellen des Datenbankkontexts

Der nächste Schritt ist die Erstellung des Contexts. Der Context repräsentiert eine Sitzung mit der Datenbank. Er ermöglicht das Abrufen und Speichern von Daten.

Rufen Sie das Kontextmenü für den Ordner *Models* auf und wählen Sie Add->Class. Die neue Klasse wird "GanttContext" heißen und den folgenden Inhalt haben:


~~~js title="Models/GanttContext.cs"
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

#### Initiale Datensätze zur Datenbank hinzufügen

Nun können wir einige Datensätze in die Datenbank hinzufügen.

Das Entity Framework kann eine Datenbank automatisch erstellen, wenn eine Anwendung läuft. 
Wir sollten festlegen, dass die Datenbank gelöscht und neu erstellt wird, wann immer sich das Modell ändert.

Zuerst sollten wir einen Datenbank-Initializer erstellen. Zu diesem Zweck müssen wir eine neue Klasse im Ordner *App_Start* hinzufügen, die von der Klasse *DropCreateDatabaseIfModelChanges* abgeleitet wird. Nennen wir sie "GanttInitializer".

In dieser Klasse redefinieren wir die *Seed()*-Methode, um sie mit Testdaten zu füllen. Anschließend fügen wir die Entitäten-Sammlung dem Kontext mit der *Add()*-Methode hinzu.

Der vollständige Code der *GanttInitializer*-Klasse ist unten angegeben:


~~~js title="App_Start/GanttInitializer.cs"
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

Öffnen Sie die *Global.asax*-Datei. Dort finden Sie den Code, der beim Start der Anwendung ausgeführt wird.
Fügen Sie den notwendigen Namespace und die Codezeile hinzu, die Initializer für unseren Kontext in der *Application_Start()*-Methode setzen:


~~~js title="Global.asax.cs"
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

### Definieren von DTOs und Mapping

Es ist Zeit, DTO-Klassen zu deklarieren, die für Web API verwendet werden.
Was das Mapping zwischen Model und DTO betrifft, gehen wir den einfachsten Weg und definieren nur einen expliziten Umwandlungsoperator für diese Klassen.

Die TaskDto-Klasse wird wie folgt aussehen: 


~~~js title="Models/TaskDto.cs"
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

Und der Code der LinkDto-Klasse ist unten angegeben:


~~~js title="Models/LinkDto.cs"
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


Zuletzt fügen wir ein Modell für die [Datenquelle] hinzu:


~~~js title="Models/GanttDto.cs"
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

## Schritt 4. Implementierung von Web API

### Allgemeine Technik zum Laden von Daten über REST API

Schließlich ist es Zeit, die API zu implementieren. 

Wie Sie aus den [API-Details](guides/server-side.md#requestresponsedetails) sehen können, benötigen wir zwei Controller: einen für Tasks und einen für Links. 
Außerdem benötigen wir einen weiteren Controller für die 'Daten laden'-Aktion, da Gantt dort ein [gemischtes Ergebnis] erwartet.

### Task-Controller

Um einen neuen Controller zu erstellen:

- Öffnen Sie das Kontextmenü für den Ordner Controllers und wählen Sie Add -> Controller.
- Wählen Sie Web API 2 Controller -> Empty. Der neue Controller wird "TaskController" heißen. 

Nun müssen wir grundlegende CRUD-Aktionen für den Task-Eintrag implementieren:


~~~js title="Controllers/TaskController.cs"
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

Alles ist hier ziemlich geradlinig:

- in den GET-Aktionen laden wir Tasks aus der Datenbank und geben deren Data Transfer Objects aus 
- in den PUT/POST-Aktionen erhalten wir DTOs als Eingabe, konvertieren sie in ein Task-Modell und speichern Änderungen im DB-Kontext

Nun machen wir dasselbe für die Links.

### Link-Controller

Wir erstellen einen leeren Web API-Controller für Links wie folgt:


~~~js title="Controllers/LinkController.cs"
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

Schließlich fügen wir einen Controller für die Datenaktion hinzu:


~~~js title="Controllers/DataController.cs"
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

Nun ist alles bereit. Starten Sie die Anwendung und es sollte ein vollwertiges Gantt auf der Seite erscheinen:

![ready_gantt_dotnet](/img/ready_gantt_dotnet.png)

[Sie können eine fertige Demo auf GitHub finden](https://github.com/DHTMLX/gantt-howto-dotnet).


## Fehlerbehandlung 

[Exception-Filter](https://learn.microsoft.com/en-us/previous-versions/aspnet/gg416513(v="vs.98))" können verwendet werden, um Ausnahmen in CRUD-Handlern zu erfassen und eine Client-Antwort zurückzugeben, die vom client-seitigen Gantt erkannt werden kann.

Um eine Fehlerbehandlung für das Gantt bereitzustellen, folgen Sie bitte den nachstehenden Schritten:

Gehen Sie zu *App_Start* und fügen Sie eine neue Klasse namens *GanttAPIExceptionFilterAttribute* hinzu:


~~~js title="App_Start/GanttAPIExceptionFilterAttribute.cs"
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

Dann fügen wir diese Klasse unseren WebAPI-Controllern hinzu:

- Data-Controller:

~~~js title="Controllers/DataController.cs"
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class DataController : ApiController
~~~

- Link-Controller:

~~~js title="Controllers/LinkController.cs"
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class LinkController : ApiController
~~~

- und Task-Controller:

~~~js title="Controllers/TaskController.cs"
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class TaskController : ApiController
~~~

Nun, wenn irgendein Web API-Controller eine Ausnahme während der Verarbeitung der Anfrage auslöst, erhält der Client eine Fehlstatus-Antwort und eine Fehlermeldung, die entweder weiterverarbeitet oder dem Benutzer angezeigt werden kann.

Beachten Sie, dass das Zurückgeben einer Ausnahmemeldung an den Client unter Umständen nicht die beste Lösung für eine Produktionsumgebung ist.

## Speichern der Reihenfolge der Tasks {#storingtheorderoftasks}

Die clientseitige Gantt ermöglicht [das Neuanordnen der Tasks] mittels Drag & Drop. Wenn Sie diese Funktion verwenden, müssen Sie diese Reihenfolge in der Datenbank speichern.
Sie können [hier die allgemeine Beschreibung lesen](guides/server-side.md#storingtheorderoftasks).

Fügen wir diese Funktion nun zu unserer App hinzu.

### Aktivieren der Neuanordnung der Tasks im Client

Zuerst müssen wir es den Benutzern ermöglichen, die Reihenfolge der Tasks in der UI zu ändern.

Öffnen Sie die *Index*-View und aktualisieren Sie die Konfiguration von gantt:


~~~js title="Views/Home/Index.cshtml"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

// specifying the date format
gantt.config.date_format = "%Y-%m-%d %H:%i";
// initializing gantt
gantt.init("gantt_here");
~~~

### Neue Aufgaben-Reihenfolge zum Modell hinzufügen

Nun spiegeln wir diese Änderungen im Backend wider.

Wir speichern die Reihenfolge in der Eigenschaft SortOrder, daher aktualisieren wir die *Task*-Klasse entsprechend:


~~~js title="Models/Task.cs"
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

Nun müssen wir TaskController aktualisieren, nämlich:

- Die Client-Seite soll Tasks nach dem Wert SortOrder sortiert erhalten:


~~~js title="Controllers/TaskController.cs"
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

- Neue Tasks sollen den Standardwert SortOrder erhalten:


~~~js title="Controllers/TaskController.cs"
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

- SortOrder sollte aktualisiert werden, wenn die Task-Reihenfolge auf dem Client geändert wird. 

Wenn ein Benutzer die Reihenfolge der Tasks ändert, ruft Gantt eine PUT-Aktion auf und übermittelt Informationen über die neue Position der Aufgabe im Property ['target'](guides/server-side.md#storingtheorderoftasks) der Anfrage zusammen mit den übrigen Task-Eigenschaften. 

Daher sollten wir eine zusätzliche Eigenschaft zur TaskDto-Klasse hinzufügen:


~~~js title="Models/TaskDto.cs"
namespace DHX.Gantt.Web.Models
{
  public class TaskDto
  {
    public int id { get; set; }
    public string text { get; set; }
    public string start_date { get; set; }
    public int duration { get;; set; }
    public decimal progress { get; set; }
    public int? parent { get; set; }
    public string type { get; set; }
    public bool open{ get { return true; } set { } }
    public string target { get; set; }/*!*/
    
    ...
  }
}
~~~

Und nun implementieren wir die Neuanordnung in unserer PUT (EditTask)-Aktion:


~~~js title="Controllers/TaskController.cs"
    // PUT api/Task/5
    [System.Web.Http.HttpPut]
    public IHttpActionResult EditTask(int id, TaskDto taskDto)
    {
      var updatedTask = (Task)taskDto;
      updatedTask.Id = id;

      if (!string.IsNullOrEmpty(taskDto.target))
      {
        // reordering occurred
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

      // adjacent task id is sent either as '{id}' or as 'next:{id}' depending 
      // on whether it's the next or the previous sibling
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

## Bekannte Probleme

HTTP PUT- und DELETE-Anfragen geben 405- oder 401-Fehler zurück, wenn eine Anwendung unter IIS läuft.
Das Problem kann durch das WebDAV-Modul verursacht werden, das mit RESTful-Handlern in Konflikt geraten kann. 

Als gängige Lösung kann das Modul im Web.config deaktiviert werden. Weitere Details finden Sie [hier](https://learn.microsoft.com/en-us/answers/tags/828/developer-technologies).

## Anwendungssicherheit

Gantt bietet keinerlei Mittel, um eine Anwendung vor verschiedenen Bedrohungen zu schützen, z. B. vor SQL-Injektionen oder XSS- und CSRF-Angriffen. Es ist wichtig, dass die Verantwortung für die Sicherheit einer Anwendung von den Entwicklern übernommen wird, die das Backend implementieren. Lesen Sie die Details [im entsprechenden Artikel](guides/app-security.md).

## Trouble shooting

### ASP.NET Web Application-Vorlage fehlt

Wenn Sie die notwendige Vorlage "ASP.NET Web Application" in Visual Studio 2022 nicht finden können, folgen Sie den untenstehenden Schritten:

1. Visual Studio 2022 schließen

2. Öffnen Sie den Visual Studio Installer über das Startmenü

3. Finden Sie *Visual Studio Community 2022* -> klicken Sie auf *Ändern*

![vsinstaller](/img/vsinstaller.png)

4. Im geöffneten Fenster wählen Sie *Einzelne Komponenten*, aktivieren Sie *".NET Framework-Projekt- und Item-Vorlagen"*, markieren Sie den entsprechenden Punkt in der Liste und klicken Sie auf *Ändern*

![components](/img/components.png)

Danach können Sie Visual Studio 2022 starten und die benötigte Vorlage finden.

### Eine Ausnahme beim Initialisieren der Datenbank aufgetreten

Manchmal kann es vorkommen, dass der Initializer DropCreateDatabaseIfModelChanges eine vorhandene Datenbank löscht, aber keine neue erstellt.

![exception_error](/img/exception_error.png)

In diesem Fall öffnen Sie *GanttInitializer.cs* und ersetzen Sie *DropCreateDatabaseIfModelChanges* durch *DropCreateDatabaseAlways*:


~~~js title="App_Start/GanttInitializer.cs"
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

Dann starten Sie die Anwendung erneut.

### Probleme beim Rendern von Tasks und Links

Falls Sie die obigen Schritte zur Implementierung der Gantt-Integration mit ASP.NET MVC abgeschlossen haben, Gantt jedoch keine Aufgaben und Verknüpfungen auf der Seite rendert, werfen Sie einen Blick in den Artikel [Troubleshooting Backend Integration Issues](guides/troubleshooting.md). Dort werden Wege beschrieben, wie man die Ursachen der Probleme identifiziert.

## Was kommt als Nächstes

Sie haben jetzt eine voll funktionsfähige Gantt-Anwendung. Den gesamten Code können Sie auf [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet) einsehen, klonen oder herunterladen und in Ihren Projekten verwenden.

Sie können auch [Guides zu den zahlreichen Funktionen von Gantt](guides.md) oder Tutorials zur [Integration von Gantt mit anderen Backend-Frameworks](integrations/howtostart-guides.md) prüfen.