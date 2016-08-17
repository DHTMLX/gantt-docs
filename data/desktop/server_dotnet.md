ASP.NET MVC Code Samples
======================================

This article will give you instructions on how to configure server side built with ASP.NET and REST API to load data into Gantt and save changes on the server. 

There's a [detailed tutorial](desktop/howtostart_dotnet.md) on using Gantt with ASP.NET MVC.

You can also explore peculiarities of implementing integration of Gantt with server side using other technologies:

- desktop/server_php.md
- desktop/server_nodejs.md
- desktop/server_ruby.md


Creating Models
-----------------------

Models are objects that will represent data in the Gantt chart. Gantt can load data either in [JSON or XML formats](desktop/supported_data_formats.md#json).

There are two types of data representation in Gantt: Task and Links.
So we should create two simple models: one for tasks and another one for links.

####Task Model

Create the "Task" class in the Models folder and add the necessary properties into it:

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

To create the Link model, create the Link class in the Models folder and add the [obligatory properties](desktop/loading.md#link_properties) of the Link object into it:

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

Configuring DataBase Connection
----------------------------------

###Installing Entity Framework

We are going to organize work with database with the help of the [Entity Framework](http://www.asp.net/entity-framework).

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

Loading Data
------------------------------------------------

There's a [common technique](desktop/server_side.md#technique) for loading data into Gantt from the server side.

You will find the requirements to the client side,
as well as the [description of possible requests and responses](desktop/server_side.md#requestresponsedetails)
in the desktop/server_side.md article.

[On the client side](desktop/server_side.md#technique) we've initialized gantt and added the following line:

~~~js
gantt.load("apiUrl");
~~~

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

Saving Data
---------------

The following [client-side](desktop/server_side.md#technique) code is responsible for sending updates that happen on the client side back to the server:

~~~js
var dp = new gantt.dataProcessor("/data");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~

On the server side we will create two controllers which will provide CRUD API for Tasks and Links, correspondingly.

###Task Controller

Let's add one more controller - TaskController.  It will provide CRUD API for Task.

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

The Link controller is created in the same way as the Task one. It will provide CRUD API for Link and include the code as in:

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
