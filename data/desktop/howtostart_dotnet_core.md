dhtmlxGantt with ASP.NET Core 
==========================

This tutorial gives you step-by-step instructions on how to create Gantt with [ASP.NET](https://www.asp.net/) Core 2 on the server side.

You can also read tutorials on other server-side technologies:

- desktop/howtostart_dotnet.md
- desktop/howtostart_php.md
- desktop/howtostart_php_laravel.md
- desktop/howtostart_nodejs.md
- desktop/howtostart_ruby.md


To organize communication with database, the [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/) is used. The application is built with the help of the Visual Studio 2017.

[Grab the demo from GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core).

## Step 1. Creating a Project

Launch Visual Studio 2017 and create a new project. Open the **File** menu and select: *New -> Project*.

Next select ASP.NET Core Web Application and name it *DHX.Gantt*.

![dhtmlxGantt with ASP.NET Core 2 creating a project](desktop/create_project_step1.png)

Select an Empty template.

![dhtmlxGantt with ASP.NET Core 2 creating a project](desktop/create_project_step2.png)

Thus you've created a project and can proceed to add markup and script for Gantt.

## Step 2. Adding Gantt Markup and JS

Go to **wwwroot** and create an **index.html** file.

![dhtmlxGantt with ASP.NET Core 2 creating a project](desktop/create_project_step3.png)


![dhtmlxGantt with ASP.NET Core 2 creating a project](desktop/create_project_step4.png)


In the newly created file make a simple page for a gantt chart.

Note, that gantt files are added from [CDN](desktop/install_with_bower.md#cdn) in this demo. If you have a Professional version of the component, 
you'll need to [add gantt files to your project manually](desktop/install_with_bower.md#addingprofessionaleditionintoproject). 

{{snippet index.html}}
~~~js
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Index</title>
    <link href="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css"
          rel="stylesheet" type="text/css" />
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

When the page is loaded, in addition to [initializing gantt chart](desktop/initializing_gantt_chart.md) [data loading](desktop/loading.md) is immediately called and the 
[`dataProcessor`](desktop/server_side.md#technique) is set up, so all changes made to gantt chart by the user will be saved to the backend. The backend isn't implemented yet, so it will make more sense later.

Next go to **Startup.cs** and tell the application to use the **index.html** page. In order to do so, you need to configure the app to serve static files from the `wwwroot` folder. 
It's done in the `Configure` method by calling the `app.UseStaticFiles()` method.
You can find [more details here](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-2.1&tabs=aspnetcore2x).

We also need to add the required middleware to **Startup.cs**, by replacing the "Hello world" stub in the `Configure()` method with two highlighted lines of code:

{{snippet Startup.cs}}
~~~js
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace DHX.Gantt
{
    public class Startup
    {
        // This method gets called by the runtime. 
        // Use this method to add services to the container.
        // For more information on how to configure your application, 
        // visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime.
        // Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseDefaultFiles(); /*!*/
            app.UseStaticFiles();  /*!*/
        }
    }
}
~~~

The 2 added middleware are:

- `app.UseDefaultFiles()` – allows serving default files. It will search the **wwwroot** folder for the following files:
	- index.html
	- index.htm
	- default.html
	- default.htm
Thus, you can choose any of them, while in this tutorial "index.html" is used.
`UseDefaultFiles()` is just an URL-rewriter that doesn't actually serve the file. For this purpose you need to also add the `UseStaticFiles()` file.

- `app.UseStaticFiles()` – is responsible for serving all static files present in the **wwwroot** folder.

Once you are done with it, an empty gantt should appear on the page when you run the application. Note that the "Invalid data" label at the top right corner shows up because `gantt.load()` is called,
as there is still no proper backend to serve the data. When the controller will be implemented, gantt will be able to display tasks and links.

![dhtmlxGantt with ASP.NET Core 2 adding Gantt](desktop/adding_gantt_dotnet_core.png)


Now the basic part is done and it's time to implement the backend. Let's start with implementing model classes and after that proceed to the WebAPI controller.

## Step 3. Creating Models and Database

Let's begin with data models. A data model for Gantt includes [links and tasks](desktop/loading.md#standarddatabasestructure). 
dhtmlxGantt uses [non-conventional names for model properties](desktop/supported_data_formats.md#json) from the .NET world perspective. 
Sometimes the client-side model also contains some properties for the client side or the backend logic, but these properties shouldn't be stored in a database.

To deal with this, the [Data Transfer Object (DTO)](https://docs.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5) pattern will be used. Two kinds of models will be defined:

- domain model classes that will be used with EF Core and inside the app
- DTO classes that will be used to communicate with Web API.

Then mapping between the two models should be implemented.

### Models

Create a new folder called **Models** in the project folder. This is where model classes and EF context will be implemented.

#### Task Model

First, create a class for Tasks. Create a file in the Models folder and name it **Task.cs**. This can be done by calling the context menu for the Models folder and selecting *Add->Class*.

This is how the model must look like:

{{snippet	DHX.Gantt/Models/Task.cs}}
~~~js
using System;

namespace DHX.Gantt.Models
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

You can look up [the list of all properties of the Task object](desktop/loading.md#task_properties).

#### Link Model

Add one more file and create a class for Links:

{{snippet	DHX.Gantt/Models/Link.cs}}
~~~js
namespace DHX.Gantt.Models
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

The models are ready, and you can start configuring the database connection.

### Configuring DataBase Connection

To configure database connection, you need to take the steps listed below:

#### Install Entity Framework Core 

The [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/) will be used to manage communication of the app with a database. Let's install the framework: 

- find Dependencies of DHTMLX.Gantt in the project tree
- call the context menu and select *Manage NuGet packages* 
- open the *Browse* tab and install **Microsoft.EntityFrameworkCore.SqlServer**

![dhtmlxGantt with ASP.NET Core 2 EF core installation](desktop/install_ef_dotnet_core.png)

#### Create Entity Context

Next you need to define a session with the database and enable loading and saving data. For this, create Context:

- add the **GanttContext.cs** file in the *Models* folder 
- define the **GanttContext** class in the created file

{{snippet	DHX.Gantt/Models/GanttContext.cs}}
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
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Link> Links { get; set; }

    }
}
~~~

#### Add First Records to Database

Now you can add records to the database. Let's create the database initializer that will populate the database with tasks. 
In the **Models** folder define a class and call it **GanttSeeder**. The class will have the **Seed()** method that will add tasks and links to the database.

{{snippet	DHX.Gantt/Models/GanttSeeder.cs}}
~~~js
using System;
using System.Collections.Generic;
using System.Linq;

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
               context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT Tasks ON;");
               context.SaveChanges();

               context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT Tasks OFF;");
               List<Link> links = new List<Link>()
               {
                   new Link() {Id = 1, SourceTaskId = 1, TargetTaskId = 2, Type = "1"},
                   new Link() {Id = 2, SourceTaskId = 2, TargetTaskId = 3, Type = "0"}
               };

               links.ForEach(s => context.Links.Add(s));
               context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT Links ON;");
               context.SaveChanges();
               context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT Links OFF;");
               transaction.Commit();
            }
        }
    }
}
~~~

#### Register Database

Now you should register the database in **Startup.cs**. But first you need a connection string for it. It will be stored  
[in a JSON file in the application settings ](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-2.1&tabs=basicconfiguration#configuration-by-environment).
Create the **appsettings.json** file (or open it if you have it already) and add a connection string to the database:

{{snippet	appsettings.json}}
~~~js
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;
    	Database=GanttDatabase;Trusted_Connection=True;"
  }
}
~~~

The database context will be registered via 
[dependency injection](https://docs.microsoft.com/en-us/ef/core/get-started/aspnetcore/new-db?view=aspnetcore-2.1#register-your-context-with-dependency-injection). 

Add the following namespaces to **Startup.cs**:

{{snippet	Startup.cs}}
~~~js
using Microsoft.EntityFrameworkCore;
using DHX.Gantt.Models;
using Microsoft.Extensions.Configuration;
~~~

The declaration will look like this:

{{snippet	Startup.cs}}
~~~js
public IConfiguration Configuration { get; }
public Startup(IConfiguration configuration)
{
    Configuration = configuration;
}

public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<GanttContext>(options => 
    	options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
}
~~~

Here is the complete code of **Startup.cs**:

{{snippet	Startup.cs}}
~~~js
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.EntityFrameworkCore;
using DHX.Gantt.Models;
using Microsoft.Extensions.Configuration;

namespace DHX.Gantt
{
 public class Startup
   {
    public IConfiguration Configuration { get; }
    public Startup(IConfiguration configuration)
     {
        Configuration = configuration;
     }


     //This method is called by the runtime. Use it to add services to the container.
     //More info on app config here - https://go.microsoft.com/fwlink/?LinkID=398940
     public void ConfigureServices(IServiceCollection services)
     {
       services.AddDbContext<GanttContext>(options => 
         options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
     }

     //The method is called by the runtime. Use it to configure HTTP request pipeline.
     public void Configure(IApplicationBuilder app, IHostingEnvironment env)
     {
       if (env.IsDevelopment())
       {
          app.UseDeveloperExceptionPage();
       }

       app.UseDefaultFiles();
       app.UseStaticFiles();
     }
  }
}
~~~

Finally, you need to initialize and seed the database on the app startup. Normally, you'd want to use migrations for that, but for simplicity they aren't used here.

Let's begin with creating a class where initialization will be done. Сreate the **GanttInitializerExtension.cs** file in the **Models** folder:

{{snippet	Models/GanttInitializerExtension.cs}}
~~~js
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;

namespace DHX.Gantt.Models
{
  public static class GanttInitializerExtension
  {
    public static IWebHost InitializeDatabase(this IWebHost webHost)
    {
      var serviceScopeFactory = 
       (IServiceScopeFactory)webHost.Services.GetService(typeof(IServiceScopeFactory));

      using (var scope = serviceScopeFactory.CreateScope())
       {
          var services = scope.ServiceProvider;
          var dbContext = services.GetRequiredService<GanttContext>();
          dbContext.Database.EnsureCreated();
          GanttSeeder.Seed(dbContext);
       }

       return webHost;
     }
   }
}
~~~

Next call **InitializeDatabase()** in the *Program.Main* pipeline:

{{snippet	Program.cs}}
~~~js
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using DHX.Gantt.Models;

namespace DHX.Gantt
{
    public class Program
    {
     
        public static void Main(string[] args)
        {
            BuildWebHost(args)
                .InitializeDatabase() /*!*/
                .Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
~~~

As it was mentioned above, migrations aren't used in this tutorial. Instead simple *EnsureCreated* and *seed* are used.

The current part is finished, let's return to Gantt.

### Define DTOs and Mapping

It is high time to define DTO classes that will be used for Web API. Let's begin with the DTO class for Task. In the **Models** folder create a file and define the **WebApiTask.cs** class:

{{snippet	Models/WebApiTask.cs}}
~~~js
using System;

namespace DHX.Gantt.Models
{
    public class WebApiTask
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
      			StartDate = DateTime.Parse(task.start_date, 
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

And this is the DTO class for Link defined in the file called **WebApiLink.cs** in the **Models** folder:

{{snippet	Models/WebApiLink.cs}}
~~~js
namespace DHX.Gantt.Models
{
    public class WebApiLink
    {
        public int id { get; set; }
        public string type { get; set; }
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

When you finish this step, you should get the following folder structure:

![Gantt ASP.NET Core 2 All models](desktop/dotnet_core_all_models.png)

Now you can run the app in order to check that everything is in place. If you don't see a runtime error, then everything is fine.

## Step 4. Implementing Web API

Now it's time for the actual REST API implementation. Go to **Startup.cs** and enable MVC routing, if it's not enabled yet:

{{snippet	Startup.cs}}
~~~js
public void ConfigureServices(IServiceCollection services)
{
	services.AddMvc(); /*!*/
	services.AddDbContext<GanttContext>(options => 
		options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
}

//The method is called by the runtime. Use it to configure HTTP request pipeline.
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
	if (env.IsDevelopment())
	{
		app.UseDeveloperExceptionPage();
	}
          
	app.UseDefaultFiles();
	app.UseStaticFiles();
	app.UseMvc(); /*!*/
}
~~~

### Adding Controllers

Create the **Controllers** folder and create three empty API Controllers: one for Tasks, another for Links and one more for the whole dataset:

![Gantt ASP.NET Core 2 adding controllers](desktop/adding_controllers.png)


#### Task Controller

Let's create a controller for Tasks. It will define basic CRUD operations for Gantt tasks.

How it works:

- in GET requests tasks are loaded from the database and the output is the data transfer objects of the tasks;
- in PUT/POST requests tasks come from the client as WebAPITask classes. They are represented in this way in dhtmlxGantt. 
So, you should convert them into the format of our data model for EntityFramework (Task class). After that it will be possible to save changes in DatabaseContext.


{{snippet	Controllers/TaskController.cs}}
~~~js
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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
        public WebApiTask Get(int id)
        {
            return (WebApiTask)_context
                .Tasks
                .Find(id);
        }

        // POST api/task
        [HttpPost]
        public ObjectResult Post(WebApiTask apiTask)
        {
            var newTask = (Task)apiTask;

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
        public ObjectResult Put(int id, WebApiTask apiTask)
        {
            var updatedTask = (Task)apiTask;
            var dbTask = _context.Tasks.Find(id);
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

Next you should create a controller for Links:

{{snippet	Controllers/LinkController.cs}}
~~~js
using System.Collections.Generic;
using System.Linq;
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
        public WebApiLink Get(int id)
        {
            return (WebApiLink)_context
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

Finally, you need to create a controller for a data action:

{{snippet	Controllers/DataController.cs}}
~~~js
using System.Collections.Generic;
using System.Linq;

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

Everything is ready. You can run the application and see the fully-fledged Gantt.

![Gantt ASP.NET Core 2 Gantt is ready](desktop/ready_gantt_dotnet_core.png)


[You can also view the full source code on GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core/).

## Error Handling

In order to handle errors, you need to declare a special [middleware class](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/startup?view=aspnetcore-2.1#startup-filters) 
that will capture runtime exceptions and write responses. Next it will be added to the app request pipeline. Follow the steps below:

1\. Create a middleware class from a template in the project folder.
 
![Gantt ASP.NET Core 2 middleware class](desktop/dotnet_core_middleware.png)

2\. Find the **invoke** method and note the `_next` call. Some handlers can throw exceptions, so let's catch them. Wrap the `_next` call with a `try-catch` block and run our handler if an error is captured. 

{{snippet	GanttErrorMiddleware.cs}}
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

3\. The middleware is ready. Now go to **Startup.cs** and connect the middleware in the **Configure()** method:

{{snippet	Startup.cs}}
~~~js
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
	if (env.IsDevelopment())
    	{
			app.UseDeveloperExceptionPage();
		}	

	app.UseGanttErrorMiddleware(); /*!*/
 	app.UseDefaultFiles();
    app.UseStaticFiles();
    app.UseMvc(); 
}
~~~

## Storing the order of tasks

Users can rearrange tasks with drag and drop in the client-side gantt. If you use this feature, you should store the order of tasks in the database. 
For details read [this section](desktop/server_side.md#storingtheorderoftasks).

Read on to find out how to enable storing the order of tasks for gantt.

### Reordering on the Client Side

First enable reordering of tasks on the client side. Add these lines to **index.html**:

{{snippet wwwroot/index.html}}
~~~js
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

// specifying the date format
gantt.config.xml_date = "%Y-%m-%d %H:%i";
// initializing gantt
gantt.init("gantt_here");
~~~

### Adding tasks order to the model

Next you must change the backend so that it reflected the current order of tasks. Add one more method to the **Task** model:

{{snippet	Models/Task.cs}}
~~~js
using System;

namespace DHX.Gantt.Models
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
        public int SortOrder { get; set; } /*!*/
    }
}
~~~

### Updating Controllers

You will also need to update controllers.
 
1\. The client side should receive tasks ordered by the **SortOrder** value. Add the highlighted line to DataController:

{{snippet	Controllers/DataController.cs}}
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

2\. New tasks should also receive the default value **SortOrder**:

{{snippet	controllers/TaskController.cs}}
~~~js
// POST api/task
[HttpPost]
public IActionResult Post(WebApiTask apiTask)
{
	var newTask = (Task)apiTask;

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

3\. **sortOrder** should be updated when the task order is modified on the client. When a user rearranges tasks, gantt will call a PUT action and provide the info about the positions of the new task in the 
['target'](desktop/server_side.md#storingtheorderoftasks) property of the request, together with the rest of task properties.
 
Add `target` to the **WebApiTask.cs** class:
 
{{snippet	Models/WebApiTask.cs}}
~~~js
public class WebApiTask
{
    public int id { get; set; }
    public string text { get; set; }
    public string start_date { get; set; }
    public int duration { get; set; }
    public decimal progress { get; set; }
    public int? parent { get; set; }
    public string type { get; set; }
    public string target { get; set; } /*!*/
    public bool open
    {
        get { return true; }
        set { }
    }
}
~~~
 
And now let's implement reordering in our PUT (EditTask) action. Modify the Put action of the Task controller:
 
{{snippet	Controllers/TaskController.cs}}
~~~js
// PUT api/task/5
[HttpPut("{id}")]
public IActionResult Put(int id, WebApiTask apiTask)
{
    var updatedTask = (Task)apiTask;
    updatedTask.Id = id;
 
    var dbTask = _context.Tasks.Find(id);
    dbTask.Text = updatedTask.Text;
    dbTask.StartDate = updatedTask.StartDate;
    dbTask.Duration = updatedTask.Duration;
    dbTask.ParentId = updatedTask.ParentId;
    dbTask.Progress = updatedTask.Progress;
    dbTask.Type = updatedTask.Type;
 
    if (!string.IsNullOrEmpty(apiTask.target))			/*!*/			
    {													/*!*/
         // reordering occurred							/*!*/
         this._UpdateOrders(dbTask, apiTask.target);	/*!*/
    }													/*!*/
 
    _context.SaveChanges();
 
    _return Ok(new
    {
         action = "updated"
    });
}
~~~
 
And add the method that will update the order of tasks:
 
{{snippet	Controllers/TaskController.cs}}
~~~js
private void _UpdateOrders(Task updatedTask, string orderTarget)
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

    var adjacentTask = _context.Tasks.Find(adjacentTaskId);
    var startOrder = adjacentTask.SortOrder;

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

Application Security
----------------

Gantt doesn't provide any means of preventing an application from various threats, such as SQL injections, XSS and CSRF attacks. The responsibility for keeping an application safe is on the developers 
who implement the backend. Read the details in the [corresponding article](desktop/app_security.md).

### XSS protection

A simple solution would be to encode the text properties of your data items when you send them to the client side.

For example, in the below code a built-in HtmlEncoder is used to escape HTML values in the text of tasks. That way your database will contain unmodified data, but the client side will receive safe values of `task.text`.

{{snippet	Models/WebApiTask.cs}}
~~~js
using System.Text.Encodings.Web;

public static explicit operator WebApiTask(Task task)
{
	return new WebApiTask
	{
		id = task.Id,
		text = HtmlEncoder.Default.Encode(task.Text), /*!*/
		start_date = task.StartDate.ToString("yyyy-MM-dd HH:mm"),
		duration = task.Duration,
		parent = task.ParentId,
		type = task.Type,
		progress = task.Progress
	};
}
~~~

Another approach would be to use a specialized library, e.g. [HtmlAgilityPack](https://www.nuget.org/packages/HtmlAgilityPack/) and completely strip any HTML task when you save/load the data.

What's Next
------------

Now you have a fully-functioning gantt. You can view the full code on [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core), clone or download it and use it for your projects.

You can also find [tutorials on the numerous features of gantt](desktop/guides.md) or tutorials on [integrating Gantt with other backend frameworks](desktop/howtostart_guides.md).
