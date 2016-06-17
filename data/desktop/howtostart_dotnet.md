Gantt with .Net Tutorial
===============================

This tutorial will give you step-by-step instructions on creating Gantt with ASP.NET and REST on the server side. 

You can also explore other server-side integration possibilities of Gantt by choosing one of the following tutorials:

- desktop/how_to_start.md
- desktop/howtostart_nodejs.md
- desktop/howtostart_ruby.md

We will make use of ASP.NET MVC 5 web platform and Web API 2 controller for REST API to create a Gantt application.
To organize communication with database the [Entity Framework](http://www.asp.net/entity-framework) will be used.
We will build our application with the help of the Visual Studio IDE. 

Step 1. Making Preparations
-----------------------------

###Creating a new VS project

Let's start by running Visual Studio and creating a new project. For this, open the File menu tab and choose:<br>
New -> Project. Then select ASP.NET Web Application and name it *gantt-rest-net*. 

<img src="desktop/vs_project.png">

Select an Empty project among available templates and check MVC and Web API checkboxes.

<img src="desktop/select_template.png">

###Installing dhtmlxGantt package

Now we need to install dhtmlxGantt from NuGet. For this, run the following command in the Package Manager Console:

~~~js
Install-Package DHTMLX.Gantt
~~~

Step 2. Adding Models, Views and Controllers
--------------------------------

###Creating Main Controller

For our web page we will also need the main controller (we will call it "HomeController").
It will process incoming requests from the user and run the needed logic.

The HomeController will call a particular view to generate a necessary HTML for the request.

To create it, call the context menu for the Controllers folder and choose Add->Controller.

<img src="desktop/creating_controller.png">

In the opened window select MVC 5 Controller -> Empty and name a newly added controller “HomeController”.

We don't add any logic into the "HomeController", as it the action() method by default. We will just add a view inside of it. 

###Сreating View

In the Views folder find the Home directory. Right click to call the context menu and select Add -> View. 

<img src="desktop/creating_view.png">

Name the new view "Index".
Open the newly created view and put the following code into it:

~~~html
@{
    ViewBag.Title = "Index";
}
<script src="@Url.Content("~/scripts/dhtmlxgantt.js")" 
	type="text/javascript"></script>
<link rel="stylesheet" 
	href="@Url.Content("~/content/dhtmlxgantt/dhtmlxgantt_terrace.css")" />

<div id="gantt_here" style="width: 100%; height: 500px;"></div>

<script>
    (function () {
        // specifying the date format 
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        // initializing gantt
        gantt.init("gantt_here");
		
        // enabling data loading
        gantt.load("/api/data");
        // initializing datapProcessor
        var dp = new gantt.dataProcessor("/api/data/");
        // and attaching it to gantt
        dp.init(gantt);
        // setting the REST mode for dataProcessor
        dp.setTransactionMode("REST");
    })();
</script>
~~~

In the above code we do the following:

- set a container for the gantt 
- specify the dates format to load data from the server side
- initialize gantt
- enable data loading 
- initialize dataProcessor in the REST mode to work with the server side

The server side itself will be implemented a bit later. For now, you can run the application and see that a gantt is rendered on the page.

<img src="desktop/adding_gantt.png">

###Creating Models

We will add two models: one for a task and another one for a link.

####Task Model

Right click on the Models folder to call the context menu and select Add->Class. 

<img src="desktop/creating_model.png">

Name the created class "Task".
Open the newly "Task" class and add following code into it:

~~~js
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace gantt_rest_net.Models
{
    public class Task
    {
        public int id { get; set; }
        public string text { get; set; }
        public DateTime start_date { get; set; }
        public int duration { get; set; }
        public double progress { get; set; }
        public int parent { get; set; }
    }
}
~~~

####Link Model 

To create the Link model, add the Link class into the Models folder and add the code below into it:

~~~js
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace gantt_rest_net.Models
{
    public class Link
    {
        public int id { get; set; }
        public int source { get; set; }
        public int target { get; set; }
        public string type { get; set; }
    }
}
~~~

Step 3. Configuring DataBase Connection
----------------------------------

###Installing Entity Framework

As you remember, we are going to organize work with dataBase with the help of the [Entity Framework](http://www.asp.net/entity-framework).

So, first of all we need to install the framework. To do it, you need to run the following command in the Package Manager Console:

~~~js
Install-Package EntityFramework
~~~

###Creating Context

Next step is to create Context. Context represents session with the DataBase. It allows working with Tasks and Links.

Call the context menu on the Model folder and select Add->Class. The new class will called "GanttContext".
The following code will be the content of the "GanttContext" class:

~~~js
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace gantt_rest_net.Models
{
    public class GanttContext: DbContext
    {
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Link> Links { get; set; }
    }
}
~~~

###Adding initial records to database

Now we can add some records into the database. First, we should create a new class in the App_Start folder and name it "GanttContextInitializer".
The new class will contain the code below:

~~~js
using gantt_rest_net.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace gantt_rest_net.App_Start
{
  public class GanttContextInitializer: DropCreateDatabaseIfModelChanges<GanttContext>
    {
        protected override void Seed(GanttContext context)
        {
            context.Tasks.AddRange(new List<Task>
            {
                new Task { id = 1, text = "Test Event 1", 
                	start_date = new DateTime(2016, 5, 26), duration = 4 },
                new Task { id = 2, text = "Test Event 2", 
                	start_date = new DateTime(2016, 5, 25), duration = 6 },
                new Task { id = 3, text = "Test Event 3", 
                	start_date = new DateTime(2016, 5, 27), duration = 8 },
                new Task { id = 4, text = "Test Event 4", 
                	start_date = new DateTime(2016, 5, 31), duration = 2 },
                new Task { id = 5, text = "Test Event 5", 
                	start_date = new DateTime(2016, 5, 26), duration = 7 },
            });

            context.Links.AddRange(new List<Link>
            {
                new Link { id = 1, source = 1, target = 4, type = "0" },
                new Link { id = 2, source = 3, target = 4, type = "1" },
            });
        }
    }
}

~~~


Open the *Global.asax* file and add the code line that will set Initializer for our context into the *Application_Start* method:

~~~js
Database.SetInitializer(new GanttContextInitializer());
~~~

###Adding Response Helpers

The next step is to add helpers that will form answers on CRUD requests.

Let's create the Helpers folder and add a class named *GanttResponseHelper* there. Place the following code into the newly created class:

~~~js
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Results;

namespace gantt_rest_net.Helpers
{
    public class GanttResponseHelper
    {
        public static Dictionary<string, string> GetResult(string action, int? tid)
        {
            var res = new Dictionary<string, string>();
            res.Add("action", action);
            if (tid != null)
                res.Add("tid", tid.ToString());
            return res;
        }
    }
}

~~~

Step 4. Creating API for Loading/Editing Data
------------------------------------------------

###Adding object with Gantt data

Activate context menu in the Controllers folder and select  Add -> Controller.<br>
Choose the Web API 2 Controller -> Empty. The new controller will be called "DataController". 

Then we will fill it with the following code:

~~~js
using gantt_rest_net.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace gantt_rest_net.Controllers
{
    public class DataController : ApiController
    {
        private string _dateFormat = "yyyy-MM-dd HH:mm";
        private GanttContext db = new GanttContext();

        [HttpGet]
        public IHttpActionResult Get()
        {
            var events = new List<object>();
            foreach (var item in db.Tasks)
            {
                events.Add(new
                {
                    id = item.id,
                    text = item.text,
                    start_date = item.start_date.ToString(_dateFormat),
                    duration = item.duration,
                    progress = item.progress,
                    parent = item.parent
                });
            }

            return Json(new { data = events, links = db.Links });
        }
    }
}
~~~

The code will create an object with data for gantt chart. It will contain a list of events and a list of links. The dates of events should be converted 
into the appropriate strings.

###Task Controller

Let's add one more controller - TaskController. It will provide CRUD API for Task.
This is its code:

~~~js
using gantt_rest_net.Helpers;
using gantt_rest_net.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace gantt_rest_net.Controllers
{
    public class TaskController : ApiController
    {
        private GanttContext db = new GanttContext();

        [HttpPost]
        public IHttpActionResult Post(Task task)
        {
            if (!ModelState.IsValid)
            {
                return Json(GanttResponseHelper.GetResult("error", null));
            }

            db.Tasks.Add(task);
            db.SaveChanges();

            return Json(GanttResponseHelper.GetResult("inserted", task.id));
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var task = db.Tasks.Find(id);
            if (task == null)
            {
                return Json(GanttResponseHelper.GetResult("error", null));
            }

            db.Tasks.Remove(task);
            db.SaveChanges();

            return Json(GanttResponseHelper.GetResult("deleted", null));
        }

        [HttpPut]
        public IHttpActionResult Put(int id, Task task)
        {
            if (!ModelState.IsValid)
            { 
                return Json(GanttResponseHelper.GetResult("error", null));
            }

            task.id = id;
            db.Entry(task).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Json(GanttResponseHelper.GetResult("error", null));
            }

            return Json(GanttResponseHelper.GetResult("updated", null));
        }
    }
}
~~~

POST request means that a new item needs to be inserted into the database, the PUT one updates an existing record and DELETE goes for deleting.

All actions return a JSON response containing the type of the performed operation or “error” if something went wrong.

Note that a response for the insert action also contains a database id of the new record. 
It will be applied on the client side, so the new item could be mapped to the database entity. 

###Link Controller

The Link controller is created in the same way as the Task one. 
It will provide CRUD API for Link and include the code as in:

~~~js
using gantt_rest_net.Helpers;
using gantt_rest_net.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace gantt_rest_net.Controllers
{
    public class LinkController : ApiController
    {
        private GanttContext db = new GanttContext();

        [HttpPost]
        public IHttpActionResult Post(Link link)
        {
            if (!ModelState.IsValid)
            {
                return Json(GanttResponseHelper.GetResult("error", null));
            }

            db.Links.Add(link);
            db.SaveChanges();

            return Json(GanttResponseHelper.GetResult("inserted", link.id));
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var link = db.Links.Find(id);
            if (link == null)
            {
                return Json(GanttResponseHelper.GetResult("error", null));
            }

            db.Links.Remove(link);
            db.SaveChanges();

            return Json(GanttResponseHelper.GetResult("deleted", null));
        }

        [HttpPut]
        public IHttpActionResult Put(int id, Link link)
        {
            if (!ModelState.IsValid)
            {
                return Json(GanttResponseHelper.GetResult("error", null));
            }

            link.id = id;
            db.Entry(link).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Json(GanttResponseHelper.GetResult("error", null));
            }

            return Json(GanttResponseHelper.GetResult("updated", null));
        }
    }
}

~~~

It has pretty the same logic as TaskController but works with Links instead of Tasks.

###Configuring Routes for API

We should add сustom routes to our controllers. These routes will map incoming requests to specific handlers.

Open App_Start -> WebApiConfig and add routes for Task, Link and Data into it. 
Pay attention that these routes should be placed before the default route.

The resulting code should look similar to this:

~~~js

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace gantt_rest_net
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "Task",
                routeTemplate: "api/data/task/{id}",
                defaults: new { controller = "Task", id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "Link",
                routeTemplate: "api/data/link/{id}",
                defaults: new { controller = "Link", id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "Data",
                routeTemplate: "api/data",
                defaults: new { controller = "Data" }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
~~~

Now everything is ready. Run the application and the fully-fledged Gantt should appear on the page:

<img src="desktop/ready_gantt_dotnet.png">