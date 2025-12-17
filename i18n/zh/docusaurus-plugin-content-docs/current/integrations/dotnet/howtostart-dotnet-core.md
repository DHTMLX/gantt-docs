---
title: "dhtmlxGantt 与 ASP.NET Core 集成指南"
sidebar_label: "ASP.NET Core"
---

dhtmlxGantt 与 ASP.NET Core 集成指南
==========================

本指南将带您逐步完成在服务端使用 [ASP.NET](https://dotnet.microsoft.com/apps/aspnet) Core 搭建甘特图的过程。

同时，我们还为其他服务端平台提供了教程:

- [dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt와 Node.js 연동하기](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt와 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt와 PHP: Laravel 연동](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt와 PHP:Slim 연동하기](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt와 Salesforce LWC 연동하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)

数据库交互部分采用了 [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)。项目开发工具为 Visual Studio 2022。

:::note
完整源代码可在 [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core) 查看。
:::

## 第一步:创建项目

启动 Visual Studio 2022，选择 *Create a new project* 新建项目。

![dhtmlxGantt with ASP.NET Core 创建项目](/img/howtostart_dotnetcore_newapp.png)

选择 "ASP.NET Core Web App"，项目名称设置为 *DHX.Gantt*。

![dhtmlxGantt with ASP.NET Core 创建项目](/img/howtostart_dotnetcore_newproject.png)

![dhtmlxGantt with ASP.NET Core 配置项目](/img/howtostart_dotnetcore_configureproject.png)

![dhtmlxGantt with ASP.NET Core 配置项目信息](/img/howtostart_dotnetcore_addinfo.png)

项目创建完成后，即可添加甘特图所需的标记和脚本。

## 第二步:添加甘特图标记和 JS

进入 **wwwroot** 目录，新建名为 **index.html** 的文件。

![dhtmlxGantt with ASP.NET Core 创建项目第3步](/img/create_project_step3.png)

![dhtmlxGantt with ASP.NET Core 创建项目第4步](/img/create_project_step4.png)

在该文件中，构建一个简单页面用于展示甘特图。

请注意，本例中甘特图文件是从 [CDN](guides/installation.md#cdn) 加载的。如果您拥有 Professional 版本，需要 [手动将甘特图文件添加到项目中](guides/installation.md#addingprofessionaleditionintoproject)。

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

页面加载后，甘特图会被初始化，并通过 `gantt.load()` 立即开始加载数据。同时 [`dataProcessor`](guides/server-side.md#jishushuoming) 也被配置好，用户在图表上的修改会自动保存到服务器。由于后端尚未搭建，完整功能将在后续实现后体现。

接下来，打开 **Program.cs**，配置应用以便能够访问 **index.html** 页面。需要通过添加 `app.UseDefaultFiles()` 启用从 `wwwroot` 文件夹提供静态文件。

更多信息请参考 [这里](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-2.1&tabs=aspnetcore2x)。

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

`app.UseDefaultFiles()` 方法会查找 **wwwroot** 目录下的默认文件:

- index.html
- index.htm
- default.html
- default.htm

您可以使用上述任意文件名，本教程采用 "index.html"。

请注意，`UseDefaultFiles()` 仅重写 URL，并不会实际提供文件。要真正提供静态文件，还需添加 `UseStaticFiles()`。

完成上述步骤后，运行应用将显示一个空的甘特图。右上角会出现 "Invalid data" 提示，因为 `gantt.load()` 被调用但后端尚未提供数据。待控制器实现后，甘特图会正确显示任务和链接。

![dhtmlxGantt with ASP.NET Core 添加甘特图](/img/adding_gantt_dotnet_core.png)

基础环境搭建完毕，接下来构建后端。首先定义模型类，然后创建 WebAPI 控制器。

## 第三步:创建模型与数据库

首先定义数据模型。典型的甘特图数据模型包括 [links 和 tasks](guides/loading.md#standarddatabasestructure)。
dhtmlxGantt 使用的属性名与 .NET 习惯不同，且部分属性仅用于客户端或后端逻辑，不应存入数据库。

为处理此问题，将采用 [数据传输对象（DTO）](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5) 模式。将创建两类模型:

- 供 EF Core 和内部应用使用的领域模型类
- 用于与 Web API 通信的 DTO 类

还需要实现这两类模型之间的映射。

### 模型

在项目目录下新建 **Models** 文件夹。此文件夹用于存放模型类与 EF 上下文。

#### Task 模型

创建任务类。在 Models 文件夹下新建 **Task.cs** 文件（右键文件夹选择 *Add->Class*）。

类定义如下:

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

完整的 Task 对象属性列表参见 [这里](guides/loading.md#task_properties)。

#### Link 模型

为 Link 新建文件:

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

模型准备就绪后，下一步配置数据库连接。

### 配置数据库连接

按照以下步骤配置数据库连接:

#### 安装 Entity Framework Core

[Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) 用于数据库通信。安装方法如下:

- 在项目树中，找到 DHTMLX.Gantt 下的 Dependencies
- 右键选择 *Manage NuGet packages*
- 切换到 *Browse* 标签，安装 **Microsoft.EntityFrameworkCore.SqlServer**、**Microsoft.EntityFrameworkCore** 和 **Microsoft.EntityFrameworkCore.Design**

![dhtmlxGantt with ASP.NET Core 安装 EF core](/img/howtostart_dotnetcore_entityvianuget.png)

也可使用 Package Manager Console:

~~~
PM> Install-Package Microsoft.EntityFrameworkCore.SqlServer
PM> Install-Package Microsoft.EntityFrameworkCore
PM> Install-Package Microsoft.EntityFrameworkCore.Design
~~~

这些包将为数据库交互提供所需工具。

#### 创建实体上下文

接下来，定义与数据库的会话以实现数据加载和保存。新建上下文类:

- 在 *Models* 文件夹下新建 **GanttContext.cs** 文件
- 在其中定义 **GanttContext** 类

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

#### 向数据库添加初始记录

现在可以为数据库添加一些初始记录。为此需创建数据库初始化器，实现插入任务和链接的功能。
在 **Models** 文件夹下定义 **GanttSeeder** 类。该类包含一个 **Seed()** 方法，用于向数据库添加任务和链接。

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

#### 注册数据库

接下来，需要在 **Program.cs** 文件中注册数据库。在此之前，需要准备一个连接字符串。 
该连接字符串将会被存储在[应用程序设置的 JSON 文件中](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-2.1&tabs=basicconfiguration)。 
创建 **appsettings.json** 文件（如果已经存在则直接打开），并添加数据库的连接字符串:

**appsettings.json**
~~~js
{
  "ConnectionStrings": {
    "DefaultConnection": "Server="(localdb)mssqllocaldb;"
        Database=GanttDatabase;Trusted_Connection=True;"
  }
}
~~~

数据库上下文将通过 
[依赖注入](https://learn.microsoft.com/en-us/aspnet/core/data/ef-rp/intro?view="aspnetcore-2.1)" 的方式进行注册。

在 **Program.cs** 文件中添加以下命名空间:

**Program.cs**
~~~js
using Microsoft.EntityFrameworkCore;
using DHX.Gantt.Models;
~~~

注册的代码如下所示:

**Program.cs**
~~~js
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<GanttContext>(
    options => options.UseSqlServer(connectionString));
~~~

为了启用控制器，需要添加 **services.AddControllers()** 方法:

**Program.cs**
~~~js
builder.Services.AddControllers();
~~~

并通过调用 **app.MapControllers()** 注册控制器路由:

**Program.cs**
~~~js
app.MapControllers();
~~~


以下是 **Program.cs** 文件的完整内容:

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

最后，当应用启动时应该初始化并填充数据库。虽然通常会使用迁移（migrations）来实现，但本例为简化起见未使用迁移。

首先，在 **Models** 文件夹下创建一个类用于初始化。添加 **GanttInitializerExtension.cs** 文件:

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

然后像下面这样调用 **InitializeDatabase()** 方法:

**Program.cs**
~~~js
app.InitializeDatabase();
~~~

如前所述，本教程未使用迁移，而是通过 *EnsureCreated* 和数据填充（seeding）来实现。

到此为止，本部分内容已经完成。接下来，将继续处理甘特图相关工作。

### 定义 DTO 和映射

现在需要为 Web API 创建将要使用的 DTO 类。 
首先为任务（Task）创建 DTO 类。在 **Models** 文件夹下新建文件并定义 **WebApiTask.cs** 类:

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

接下来是 Link 的 DTO 类，在 **Models** 文件夹下的 **WebApiLink.cs** 文件中定义:

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

完成上述步骤后，文件夹结构应如下所示:

![Gantt ASP.NET Core 2 All models](/img/howtostart_dotnetcore_structure.png)

此时建议运行应用程序以验证一切是否设置正确。如果没有出现运行时错误，说明设置成功。

Step 4. 实现 Web API
--------------------------

现在是实现 REST API 的时候了。

### 添加控制器

创建一个 **Controllers** 文件夹，并添加三个空的 API 控制器:分别用于 Tasks、Links 以及整个数据集:

![Gantt ASP.NET Core 2 adding controllers](/img/howtostart_dotnetcore_addcontrollers.png)

#### 任务控制器（Task Controller）

以下是用于管理任务（Tasks）的控制器，实现了甘特任务的基本 CRUD 操作。

功能说明:

- 对于 GET 请求，从数据库获取任务并以数据传输对象的形式返回；
- 对于 PUT/POST 请求，任务以 WebApiTask 实例的形式从客户端传来，这也是 dhtmlxGantt 使用的格式。保存到 DatabaseContext 之前，需要将其转换为 EntityFramework 使用的数据模型（Task 类）。


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

接下来是 Links 的控制器:

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

最后，这里是数据操作的控制器:

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

至此，所有内容都已就绪，应用程序可以运行，你将看到一个完整可用的甘特图。

![Gantt ASP.NET Core Gantt is ready](/img/ready_gantt_dotnet_core.png)

[完整源码也可在 GitHub 上获取](https://github.com/DHTMLX/gantt-howto-dotnet-core/)。

## 错误处理

为了有效管理错误，你需要创建一个特殊的 [middleware class](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/startup?view="aspnetcore-2.1)" 来捕获运行时异常并发送适当的响应。该中间件随后会被添加到应用的请求管道中。操作步骤如下:

1. 使用模板向你的项目添加一个中间件类。

![Gantt ASP.NET Core middleware class](/img/dotnet_core_middleware.png)

2. 为 ASP.NET Core 安装 JSON 框架。可以通过 NuGet 包管理器完成:

![Gantt ASP.NET Core Install NewtonSoft Json](/img/install_newtonsoft.png)

或者使用包管理器控制台:

~~~
PM> Install-Package NewtonSoft.JSON
~~~

3. 找到中间件中的 **Invoke** 方法。由于有些处理程序可能会抛出异常，请将 `_next` 调用放入 `try-catch` 块中，在发生错误时处理异常。

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

4. 在 **GanttErrorMiddleware.cs** 文件中添加如下命名空间:

~~~js
using Newtonsoft.Json;
~~~

5. 中间件已准备就绪。接下来，打开 **Program.cs** 并注册该中间件，添加如下内容:

**Program.cs**
~~~js
using DHX.Gantt;
~~~

然后通过以下调用将中间件加入管道:

**Program.cs**
~~~js
app.UseGanttErrorMiddleware();
~~~

## 存储任务顺序 {#storingtheorderoftasks}

当用户在客户端通过拖拽重新排序任务时，新顺序应保存到数据库。详细内容请参阅 [本节](guides/server-side.md#renwushunxudecunchu)。

下面介绍如何在甘特图中启用任务顺序存储。

### 客户端排序

首先，在客户端启用任务排序，在 **index.html** 文件中添加如下代码:

**wwwroot/index.html**
~~~js
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

// specifying the date format
gantt.config.date_format = "%Y-%m-%d %H:%i";
// initializing gantt
gantt.init("gantt_here");
~~~

### 在模型中添加任务顺序

然后，更新后端以反映当前任务顺序。在 **Task** 模型中添加新属性:

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

### 更新控制器

控制器也需要做一些更新。

1. 客户端应按 **SortOrder** 排序获取任务。在 DataController 中添加标记行:

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

2. 创建新任务时，确保它们获得默认的 **SortOrder** 值:

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

3. 当任务在客户端重新排序时，需要更新 **sortOrder**。当任务被重新排列时，gantt 会通过 PUT 请求发送包含新位置信息的 
['target'](guides/server-side.md#renwushunxudecunchu) 属性，以及其他任务详情。

在 **WebApiTask.cs** 类中添加 `target` 属性:

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

现在，在 Task 控制器的 PUT (EditTask) 方法中实现重新排序逻辑:

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

添加用于调整任务顺序的辅助方法:

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

应用安全
----------------

Gantt 本身不负责防范如 SQL 注入、XSS 或 CSRF 等安全威胁。后端开发者需自行保证应用的安全。详情请参考 [相关文档](guides/app-security.md)。

### XSS 防护

一种简单的方法是在将文本字段发送到客户端之前进行编码。

例如，下面的示例使用内置的 HtmlEncoder 对任务文本中的 HTML 进行转义。这样，数据库中保存的是原始数据，但客户端收到的是安全的 `task.text`。

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

另外，也可以使用如 [HtmlAgilityPack](https://www.nuget.org/packages/HtmlAgilityPack/) 这样的专业库，在保存或加载任务时彻底移除所有 HTML。

故障排查
-----------------

如果你已按照所有步骤将 Gantt 集成到 ASP.NET Core，但页面上未显示任务和链接，请参阅 [백엔드 통합 문제 해결](guides/troubleshooting.md) 文章。文中涵盖了常见问题及其排查方法。

后续步骤
------------

此时，你已经拥有了一个可用的甘特图实现。完整源码可在 [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core) 上获取，可用于你的项目。

你还可以查阅 [涵盖众多甘特功能的指南](guides.md) 或 [集成 Gantt 到其他后端框架的教程](integrations/howtostart-guides.md)。
