dhtmlxGantt with ASP.NET MVC  
===============================

This tutorial will give you step-by-step instructions on creating Gantt with ASP.NET and REST API on the server side. 

You can also explore other server-side integration possibilities of Gantt by choosing one of the following tutorials:

- desktop/howtostart_php.md
- desktop/howtostart_nodejs.md
- desktop/howtostart_ruby.md

We will make use of ASP.NET MVC 5 web platform and Web API 2 controller for REST API to create a Gantt application.
To organize communication with database we will use the [Entity Framework](http://www.asp.net/entity-framework).
We will build our application with the help of the Visual Studio IDE. 


Step 1. Making Preparations
-----------------------------

###Creating a new Visual Studio Project 

Let's start by running Visual Studio and creating a new project. For this, open the File menu tab and choose:<br>
New -> Project. Then select ASP.NET Web Application and name it *DHX.Gantt*. 

<img src="//content.screencast.com/users/Alexander_/folders/Jing/media/7327fcbe-0eb6-42ce-91cb-962fe1d06843/2017-08-18_1335.png">

Select an Empty project among available templates and check MVC and Web API checkboxes below the list of templates.

<img src="/content.screencast.com/users/Alexander_/folders/Jing/media/d27cb5d9-4091-405e-a652-228f6551f5f8/2017-08-18_1336.png">

Step 2. Adding Models, Views and Controllers
--------------------------------

###Creating a Controller

Now we have an empty project everything is ready for implementing our gantt.

Firstly, we'll add an MVC controller which will show the page with gantt chart.

To create it, call the context menu for the Controllers folder and choose Add->Controller.
In the opened window select MVC 5 Controller -> Empty and name a newly added controller “HomeController”.
<img src="//content.screencast.com/users/Alexander_/folders/Jing/media/e8e855c3-fbde-4fcf-995a-06f26d82111f/2017-08-18_1343.png">

The HomeController has the Index() method of the ActionResult class by default, so it doesn't require any additional logic. We will just add a view for it. 

~~~js
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DHX.Gantt.Controllers
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

###Creating a View

Now it's time to create our index page. Go to Views/Home and and empty view named Index
<img src="//content.screencast.com/users/Alexander_/folders/Jing/media/a88eefb2-5c07-4b38-acb1-914e0f58a7b9/2017-08-18_1348.png">

Open the newly created view and put the following code into it:

~~~html
@{
    Layout = null;
}

<!DOCTYPE html>

<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Index</title>
    <link href="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function(event) {
            // specifying the date format
            gantt.config.xml_date = "%Y-%m-%d %H:%i";
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

What we did here:

- we defined a simple page markup for our gantt application
- added dhtmlx gantt js/css sources using [CDN links](desktop/cdn_links_list.md)
- and created gantt on the page

Note the configuration - we specified [format of dates](api/gantt_xml_date_config.md) that come from the data source, it's needed so our client would be able to parse dates that come from the server.
~~~js
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
~~~

And also we told gantt it's going to work with RESTful api on a backend and use ["/api/data/"](desktop/server_side.md#technique) as a default route:
~~~js
    gantt.load("/api/data");
    // initializing dataProcessor
    var dp = new gantt.dataProcessor("/api/");
    // and attaching it to gantt
    dp.init(gantt);
    // setting the REST mode for dataProcessor
    dp.setTransactionMode("REST");
~~~


The server side itself will be implemented a bit later. For now, you can run the application and see that a gantt is rendered on the page.

<img src="desktop/adding_gantt.png">

###Creating Models

Now we define model classes for gantt chart. Gantt data model consist of [Links and Tasks](desktop/server_side.md#thedtabasesstructure). 
As you can see, dhtmlxGantt uses a certain naming convention for data model that is different from one traditionally used in C#. 
Client-side model can also contain some properties that shouldn't be stored in database, but will be used either on the client or in backend logic.

Because of this, we'll go with ViewModel approach here - we'll define a domain model classes that will be used with EF and inside the app, and will define view model classes that will be used to communicate with web api. Then we'll implement some kind of mapping between two models.

Let's start

####Task Model

Create following class for Task:

~~~js
//DHX.Gantt.Web\Models\Task.cs:
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
    }
}
~~~

You can find the full list of properties, both mandatory and optional, available for the Task object in the 
[corresponding article](desktop/loading.md#task_properties) of documentation.

####Link Model 

And a following link class:

~~~js
//DHX.Gantt.Web\Models\Link.cs
using System.ComponentModel.DataAnnotations;

namespace DHX.Gantt.Web.Models
{
    public class Link
    {
        public int Id { get; set; }
        [MaxLength(1)]
        public string Type { get; set; }
        public int SourceTaskId { get; set; }
        public int TargetTaskId { get; set; }
    }
}
~~~

Step 3. Configuring DataBase Connection
----------------------------------

###Installing Entity Framework

As you remember, we are going to organize work with a database with the help of the [Entity Framework](http://www.asp.net/entity-framework).

So, first of all we need to install the framework. To do it, you need to run the following command in the Package Manager Console:

~~~js
Install-Package EntityFramework
~~~

###Creating Database Context

The next step is to create Context. Context represents a session with the DataBase. It allows getting and saving data.

Call the context menu for the Models folder and select Add->Class. The new class will be called "GanttContext" and will have the following content:

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

###Adding initial records to database

Now we can add some records into the database.

The Entity Framework can automatically create a database when application runs. 
We should specify that a database should be dropped and re-created whenever the model changes.

First, we should create a database initializer. For this purpose, we need to add a new class in the *App_Start* folder
that will be inherited from the DropCreateDatabaseIfModelChanges class. Let's call it "GanttInitializer".

In this class we are going to redefine the Seed() method to populate it with test data.
Then we will add an entities collection into the context with the AddRange() method.

The full code of the *GanttInitializer* class is given below:

~~~js
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;


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


Open the *Global.asax* file. It contains code that runs on the application start.
Add the necessary namespace and the code line that will set Initializer for our context into the *Application_Start()* method:

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

            Database.SetInitializer(new GanttInitializer());
        }
    }
}
~~~

### Defining View Models and Mapping

Now we'll declare view model classes that will be used for Web API.
As for mapping between Model and ViewModel - we'll go the simplest way and just define an explicit conversion operator for these classes.


~~~js
//DHX.Gantt.Web\Models\TaskViewModel.cs
using System;

namespace DHX.Gantt.Web.Models
{
    public class TaskViewModel
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

        public static explicit operator TaskViewModel(Task task)
        {
            return new TaskViewModel
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

        public static explicit operator Task(TaskViewModel task)
        {
            return new Task
            {
                Id = task.id,
                Text = task.text,
                StartDate = DateTime.Parse(task.start_date, System.Globalization.CultureInfo.InvariantCulture),
                Duration = task.duration,
                ParentId = task.parent,
                Type = task.type,
                Progress = task.progress
            };
        }
    }
}
~~~



And LinkViewModel

~~~js
//DHX.Gantt.Web\Models\LinkViewModel.cs
namespace DHX.Gantt.Web.Models
{
    public class LinkViewModel
    {
        public int id { get; set; }
        public string type { get; set; }
        public int source { get; set; }
        public int target { get; set; }

        public static explicit operator LinkViewModel(Link link)
        {
            return new LinkViewModel
            {
                id = link.Id,
                type = link.Type,
                source = link.SourceTaskId,
                target = link.TargetTaskId
            };
        }

        public static explicit operator Link(LinkViewModel link)
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


Lastly, add the model for a [data source](desktop/supported_data_formats.md#json) :

~~~js
//DHX.Gantt.Web\Models\GanttViewModel.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DHX.Gantt.Web.Models
{
    public class GanttViewModel
    {
        public IEnumerable<TaskViewModel> data { get; set; }
        public IEnumerable<LinkViewModel> links { get; set; }
    }
}
~~~

Step 4. Implementing Web API
------------------------------------------------

###General technique of loading data using REST API

Finally it's time to implement the API. 


As we can see from the [api details](desktop/server_side.md#requestresponsedetails) 
we'll need two controllers - one for tasks and one for links, 
and one more controller for 'load data' action, since gantt expects a [mixed result](desktop/supported_data_formats.md#json) there.

###Task Controller

Activate a context menu for the Controllers folder and select  Add -> Controller.<br>
Choose the Web API 2 Controller -> Empty. The new controller will be called "TaskController". 

Now implement basic CRUD actions for task entry:

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
        public IEnumerable<TaskViewModel> Get()
        {
            return db.Tasks
                .ToList()
                .Select(t => (TaskViewModel)t);
        }

        // GET api/Task/5
        [System.Web.Http.HttpGet]
        public TaskViewModel Get(int id)
        {
            return (TaskViewModel)db
                .Tasks
                .Find(id);
        }

        // PUT api/Task/5
        [System.Web.Http.HttpPut]
        public IHttpActionResult EditTask(int id, TaskViewModel viewTask)
        {
            var updatedTask = (Task)viewTask;
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
        public IHttpActionResult CreateTask(TaskViewModel viewTask)
        {
            var newTask = (Task)viewTask;

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

Everything is pretty straightforward here, in GET actions we load tasks from database and output them as ViewTaskModel. 
In PUT/POST actions we're getting ViewTaskModel as an input, converting them to Task model and save changes to the DB Context.
Now let's do the same for the links.

###Link Controller

Create an empty Web API Controller for links:


~~~js
//DHX.Gantt.Web\Controllers\LinkController.cs
using System;
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
        public IEnumerable<LinkViewModel> Get()
        {
            return db
                .Links
                .ToList()
                .Select(l => (LinkViewModel)l);
        }

        // GET api/Link/5
        [System.Web.Http.HttpGet]
        public LinkViewModel Get(int id)
        {
            return (LinkViewModel)db
                .Links
                .Find(id);
        }

        // POST api/Link
        [System.Web.Http.HttpPost]
        public IHttpActionResult CreateLink(LinkViewModel viewLink)
        {
            var newLink = (Link)viewLink;
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
        public IHttpActionResult EditLink(int id, LinkViewModel viewLink)
        {
            var clientLink = (Link)viewLink;
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

###Data Controller

And finally, add a controller for the data action

~~~js
//DHX.Gantt.Web\Controllers\DataController.cs
using System;
using System.Collections.Generic;
using System.Web.Http;
using DHX.Gantt.Web;
using DHX.Gantt.Web.Models;

namespace DHX.Gantt.Web.Controllers
{
    public class DataController : ApiController
    {
        // GET api/
        [System.Web.Http.HttpGet]
        public GanttViewModel Get()
        {
            return new GanttViewModel
            {
                data = new TaskController().Get(),
                links = new LinkController().Get()
            };
        }
    }
}
~~~



Now everything is ready. Run the application and the fully-fledged Gantt should appear on the page:

<img src="desktop/ready_gantt_dotnet.png">


You can find ready demo at github


Error handling 
-----------

[Exception filters](https://msdn.microsoft.com/en-us/library/gg416513(v=vs.98).aspx) can be used for capturing exceptions in CRUD handlers and returning client response that can be [recognized](desktop/server_side.md#errorhandling) by the client-side gantt.

Go to App_Start and add new class called GanttAPIExceptionFilterAttribute:

~~~js
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace DHX.Gantt.Web
{
    public class GanttAPIExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            
            context.Response = context.Request.CreateResponse(HttpStatusCode.InternalServerError, new
            {
                action = "error",
                message = context.Exception.Message
            });
        }
    }
}
~~~

Now, add this class to our WebAPI controllers:

Data controller:
~~~js
//DHX.Gantt.Web\Controllers\DataController.cs

namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]
    public class DataController : ApiController
~~~
Link controller:
~~~js
//DHX.Gantt.Web\Controllers\LinkController.cs
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]
    public class LinkController : ApiController
~~~
and Task controller:
~~~js
//DHX.Gantt.Web\Controllers\TaskController.cs
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]
    public class TaskController : ApiController
~~~

Now if any Web Api controllers fire and exception while processing the request, 
client side will receive an error status and the error message that can be either processed somehow or shown to the user.

Note, that returning the exception message to the client might not be the best idea for a production environment.

Storing the order of tasks
-----------
Client-side gantt allows reordering tasks using drag and drop, thus, if you use this feature you'll have to store this order in db.
You can check the common description [here](desktop/server_side.md#storingtheorderoftasks).
And now let's add this feature to our app.

###Allow reordering on the client

Firstly, we need to allow users to [change task order in the UI](desktop/reodering_tasks.md).
Open Index view and update configuration of gantt:
~~~js
//DHX.Gantt.Web\Views\Home\Index.cshtml
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

// specifying the date format
gantt.config.xml_date = "%Y-%m-%d %H:%i";
// initializing gantt
gantt.init("gantt_here");
~~~

###Adding order to the model

Now, let's reflect these changes on a backend.
We'll going to store the order in property named SortOrder, let's update the Task class accordingly:
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
        public int SortOrder { get; set; }
    }
}
~~~

Now, update the TaskController.
Firstly, client-side should receive tasks ordered by SortOrder value:
~~~js
//DHX.Gantt.Web\Controllers\TaskController.cs
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]
    public class TaskController : ApiController
    {
        private GanttContext db = new GanttContext();

        // GET api/Task
        public IEnumerable<TaskViewModel> Get()
        {
            return db.Tasks
                .OrderBy(t => t.SortOrder) 
                .ToList()
                .Select(t => (TaskViewModel)t);
        }
~~~

Now we need to update SortOrder when task order is modified on the client. 

When user changes order of tasks, gantt will call PUT action, providing an info of new task position in the ['target'](desktop/server_side.md#storingtheorderoftasks) property of the request, together with the rest of properties of task. 

Thus, add extra property to the view model:

~~~js
//DHX.Gantt.Web\Models\TaskViewModel.cs
namespace DHX.Gantt.Web.Models
{
  public class TaskViewModel
  {
    ...

    /// <summary>
    /// Reference to a sibling task after vertical drag and drop (reordering)
    /// </summary>
    public string target { get; set; }
~~~

And now we implement ordering in our PUT (EditTask) action:

~~~js
//DHX.Gantt.Web\Controllers\TaskController.cs
namespace DHX.Gantt.Web.Controllers
{
  [GanttAPIExceptionFilter]
  public class TaskController : ApiController
  {
    private GanttContext db = new GanttContext();
    
    ...
    
     // PUT api/Task/5
    [System.Web.Http.HttpPut]
    public IHttpActionResult EditTask(int id, TaskViewModel viewTask)
    {
      var updatedTask = (Task)viewTask;
      updatedTask.Id = id;

      if (!string.IsNullOrEmpty(viewTask.target))
      {
        // reordering occurred
        this._UpdateOrders(updatedTask, viewTask.target);
      }

      db.Entry(updatedTask).State = EntityState.Modified;
      db.SaveChanges();

      return Ok(new
      {
        action = "updated"
      });
    }
      
    private void _UpdateOrders(Task updatedTask, string orderTarget)
    {
      int adjacentTaskId;
      var nextSibling = false;

      // adjacent task id is sent either as '{id}' or as 'next:{id}' depending 
      // on whether it's next or previous sibling
      if (!int.TryParse(orderTarget, out adjacentTaskId))
      {
        nextSibling = true;
        var targetId = orderTarget.Replace("next:", "");
        
        if (!int.TryParse(targetId, out adjacentTaskId))
        {
          return;
        }
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

Known Issues
-----------

HTTP PUT and DELETE requests return 405 or 401 error when an app is running on IIS.
The issue may be caused by the **WebDAV** module which can conflict with RESTful handlers. 

As a common solution, the module can be disabled from the **web.config** file. More details are given [here](https://forums.iis.net/t/1166025.aspx).


@todo:
	check, add github link, add images.