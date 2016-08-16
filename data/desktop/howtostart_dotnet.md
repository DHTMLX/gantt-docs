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

###Creating a new VS project

Let's start by running Visual Studio and creating a new project. For this, open the File menu tab and choose:<br>
New -> Project. Then select ASP.NET Web Application and name it *gantt-rest-net*. 

<img src="desktop/vs_project.png">

Select an Empty project among available templates and check MVC and Web API checkboxes below the list of templates.

<img src="desktop/select_template.png">

###Installing dhtmlxGantt package

Now we need to install dhtmlxGantt from NuGet. For this, run the following command in the Package Manager Console:

~~~js
Install-Package DHTMLX.Gantt
~~~

Step 2. Adding Models, Views and Controllers
--------------------------------

###Creating a Controller

For our web page we will also need to add a controller. It will process incoming requests from the user and run the needed logic.

The controller will call a particular view to generate a necessary HTML for the request.

To create it, call the context menu for the Controllers folder and choose Add->Controller.

<img src="desktop/creating_controller.png">

In the opened window select MVC 5 Controller -> Empty and name a newly added controller “HomeController”.

The HomeController has the Index() method of the ActionResult class by default, so it doesn't require any additional logic. We will just add a view for it. 

~~~js
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace gantt_rest_net.Controllers
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

###Сreating a View

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
        // initializing dataProcessor
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

Models are objects that will represent data in the Gantt chart. Gantt can load data either in [JSON or XML formats](desktop/supported_data_formats.md#json).

There are two types of data representation in Gantt: Task and Links.
So we should create two simple models: one for tasks and another one for links.

####Task Model

Right click on the Models folder to call the context menu and select Add->Class. 

<img src="desktop/creating_model.png">

Name the created class "Task".
Open the newly created "Task" class and add the necessary properties into it:

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

You can find the full list of properties, both mandatory and optional, available for the Task object in the 
[corresponding article](desktop/loading.md#task_properties) of documentation.

####Link Model 

To create the Link model, add the Link class into the Models folder and add the [obligatory properties](desktop/loading.md#link_properties) of the Link object into it:

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

As you remember, we are going to organize work with database with the help of the [Entity Framework](http://www.asp.net/entity-framework).

So, first of all we need to install the framework. To do it, you need to run the following command in the Package Manager Console:

~~~js
Install-Package EntityFramework
~~~

###Creating Context

The next step is to create Context. Context represents a session with the DataBase. It allows working with Tasks and Links.

Call the context menu for the Model folder and select Add->Class. The new class will be called "GanttContext" and will have the following content:

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

Now we can add some records into the database.

The Entity Framework can automatically create a database when application runs. 
We should specify that a database should be dropped and re-created whenever the model changes.

First, we should create a database initializer. For this purpose, we need to add a new class in the *App_Start* folder
that will be inherited from the DropCreateDatabaseIfModelChanges class. Let's call it "GanttContextInitializer".

In this class we are going to redefine the Seed() method to populate it with test data.
Then we will add an entities collection into the context with the AddRange() method.

The full code of the *GanttContextInitializer* class is given below:

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


Open the *Global.asax* file. It contains code that runs on the application start.

<img src="desktop/global_asax.png">


Add the code line that will set Initializer for our context into the *Application_Start()* method:

~~~js
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using System.Data.Entity;
using gantt_rest_net.App_Start;

namespace gantt_rest_net
{
	public class Global : HttpApplication
	{
		void Application_Start(object sender, EventArgs e)
		{
			Database.SetInitializer(new GanttContextInitializer());  /*!*/
			AreaRegistration.RegisterAllAreas();
			GlobalConfiguration.Configure(WebApiConfig.Register);
			RouteConfig.RegisterRoutes(RouteTable.Routes); 
		}
	}
}
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

The *GetResult()* method is going to generate an appropriate response for Data Processor according to its parameters.
Each response will contain the name of an action.

There is also an optional parameter *tid*. It will be used for "insert" actions when database specifies a new id for the newly inserted entity.

Step 4. Creating API for Loading/Editing Data
------------------------------------------------

###General technique of loading data using REST API

There's a [common technique](desktop/server_side.md#technique) for loading data into Gantt from the server side.

You will find the requirements to the client side,
as well as the [description of possible requests and responses](desktop/server_side.md#requestresponsedetails)
in the desktop/server_side.md article.

Below we will consider how to load data into Gantt using .Net server side.

<h3 id="gantt_data">Adding object with Gantt data</h3>

Gantt gets both tasks and links in one object, not separately. Let's create a controller that will be responsible for 
loading tasks and links data into Gantt.

Activate a context menu for the Controllers folder and select  Add -> Controller.<br>
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

The code will create an object with data for a Gantt chart. It will contain a list of events and a list of links.
The dates of events should be converted into appropriate strings.

###Task Controller

Let's add one more controller - TaskController. It will provide CRUD API for Task.

We will describe the logic of each request inside of try-catch blocks to handle any errors that might occur when the database is modified.

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
            try
            {
                if (ModelState.IsValid)
                {
                    db.Tasks.Add(task);
                    db.SaveChanges();
                    return Json(GanttResponseHelper.GetResult("inserted", task.id));
                }
            }
            catch (Exception) { }
            return Json(GanttResponseHelper.GetResult("error", null));
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                var task = db.Tasks.Find(id);
                db.Tasks.Remove(task);
                db.SaveChanges();
                return Json(GanttResponseHelper.GetResult("deleted", null));
            }
            catch (Exception) { }
            return Json(GanttResponseHelper.GetResult("error", null));
        }

        [HttpPut]
        public IHttpActionResult Put(int id, Task task)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    task.id = id;
                    db.Entry(task).State = EntityState.Modified;
                    db.SaveChanges();
                    return Json(GanttResponseHelper.GetResult("updated", null));
                }
            }
            catch (Exception) { }
            return Json(GanttResponseHelper.GetResult("error", null));
        }
    }
}
~~~

The code of TaskController includes the following types of requests:

- POST request means that a new item needs to be inserted into the database
- PUT request updates an existing record 
- DELETE request goes for deleting

The GET request isn't used here, since Gantt loads tasks and links together. 
A common GET request is described within the [DataController](desktop/howtostart_dotnet.md#gantt_data) code.

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
            try
            {
                if (ModelState.IsValid)
                {
                    db.Links.Add(link);
                    db.SaveChanges();
                    return Json(GanttResponseHelper.GetResult("inserted", link.id));
                }
            }
            catch (Exception) { }
            return Json(GanttResponseHelper.GetResult("error", null));
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                var link = db.Links.Find(id);
                db.Links.Remove(link);
                db.SaveChanges();
                return Json(GanttResponseHelper.GetResult("deleted", null));
            }
            catch (Exception) { }
            return Json(GanttResponseHelper.GetResult("error", null));
        }

        [HttpPut]
        public IHttpActionResult Put(int id, Link link)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    link.id = id;
                    db.Entry(link).State = EntityState.Modified;
                    db.SaveChanges();
                    return Json(GanttResponseHelper.GetResult("updated", null));
                }
            }
            catch (Exception) { }
            return Json(GanttResponseHelper.GetResult("error", null));
        }
    }
}
~~~

The same as for TaskController, we describe the following types of requests in the code of LinkController:

- POST request means that a new item should be inserted into the database
- PUT request updates an existing record 
- DELETE request goes for deleting

Actions return a JSON response with the type of operation or "error".

<h3 id="api_routes">Configuring Routes for API</h3>

Now we should add сustom routes to our controllers. These routes will map incoming requests to specific handlers.
You can find the full route scheme [in the corresponding article](desktop/server_side.md#requestresponsedetails).

Open App_Start -> WebApiConfig and add routes for Task, Link and Data into it. 

<img src="desktop/webapiconfig.png">

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

The *Register()* method is set in the WebApiConfig class by default, it configures HttpConfiguration and sets API routes.
So, we just added the necessary routes into it.

Now everything is ready. Run the application and the fully-fledged Gantt should appear on the page:

<img src="desktop/ready_gantt_dotnet.png">