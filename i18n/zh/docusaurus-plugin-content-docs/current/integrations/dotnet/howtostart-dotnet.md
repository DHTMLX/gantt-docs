---
title: "dhtmlxGantt 与 ASP.NET MVC"
sidebar_label: "ASP.NET MVC"
---

# dhtmlxGantt 与 ASP.NET MVC

本教程将逐步引导您在服务器端使用 ASP.NET 和 REST API 构建甘特图应用。

您也可以通过下列教程之一，了解 Gantt 的其他服务器端集成方式：

- [dhtmlxGantt 与 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt 与 Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt 与 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt 与 PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt 与 PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt 与 Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt 与 Ruby on Rails](integrations/other/howtostart-ruby.md)

我们将使用 ASP.NET MVC 5 Web 平台和 Web API 2 控制器来实现一个 REST API，以创建一个 Gantt 应用程序。

为了与数据库进行通信的组织，我们将使用 [Entity Framework](https://learn.microsoft.com/en-us/aspnet/entity-framework)。我们将借助 Visual Studio IDE 构建我们的应用程序。

:::note
完整的源代码可以在 [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet) 上获取。
:::

## Step 1. 创建一个项目

### 创建一个新的 Visual Studio 项目

启动 Visual Studio 2022，选择 *Create a new project*。

![how_to_start_net_create_project](/img/how_to_start_net_create_project.png)

接着选择 "ASP.NET Web Application" 并将其命名为 *DHX.Gantt.Web*。如果找不到所需的模板，请参阅 [故障排除](#trouble-shooting) 章节。

![how_to_start_net_project_template](/img/how_to_start_net_project_template.png)

![how_to_start_net_configure_project](/img/how_to_start_net_configure_project.png)

在可用模板中选择一个 *Empty*，并勾选模板列表旁的 MVC 和 Web API 复选框。

![how_to_start_net_app](/img/how_to_start_net_app.png)

## Step 2. 将 Gantt 添加到页面

### 创建控制器

现在我们有一个空项目，一切就绪，可以实现我们的 gantt。

首先，我们将添加一个 MVC 控制器，用于显示带有甘特图的页面。

要创建它，请为 Controllers 文件夹调用上下文菜单，选择 Add->Controller。在打开的窗口中选择 MVC 5 Controller -> Empty，并将新添加的控制器命名为 "HomeController"。

![how_to_start_net_controller](/img/how_to_start_net_controller.png)

HomeController 默认具有 *Index()* 方法（返回 ActionResult 类），因此不需要额外的逻辑。我们只需要为它添加一个视图。

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

### 创建视图

现在是时候创建我们的索引页了。进入 Views/Home 并添加一个名为 Index 的空视图：

![how_to_start_net_view](/img/how_to_start_net_view.png)

打开新创建的视图，在其中放入以下代码：

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
            // 指定日期格式
            gantt.config.date_format = "%Y-%m-%d %H:%i";
            // 初始化 gantt
            gantt.init("gantt_here");
    
            // 开始数据加载
            gantt.load("/api/data");
            // 初始化 dataProcessor
            var dp = new gantt.dataProcessor("/api/");
            // 将其附加到 gantt
            dp.init(gantt);
            // 为 dataProcessor 设置 REST 模式
            dp.setTransactionMode("REST");
        });
    </script>
</head>
<body>
    <div id="gantt_here" style="width: 100%; height: 100vh;"></div>
</body>
</html>
~~~

我们在这里完成了以下工作：

- 为我们的 gantt 应用定义了一个简单的页面标记
- 使用 [CDN 链接](guides/cdn-links-list.md) 添加了 dhtmlx gantt 的 js/css 资源
- 在页面上创建了 gantt

请注意配置：我们指定了来自数据源的日期格式 [format of dates](api/config/date_format.md)。

~~~js title="Views/Home/Index.cshtml"
gantt.config.date_format = "%Y-%m-%d %H:%i";
~~~

这对于客户端能够解析来自服务器的日期是必需的。

另外，我们还告知 gantt 将使用后端的 RESTful API，并将 ["/api/"](guides/server-side.md#technique) 设为默认路由：

~~~js title="Views/Home/Index.cshtml"
gantt.load("/api/data");
// initializing dataProcessor
var dp = new gantt.dataProcessor("/api/");
// and attaching it to gantt
dp.init(gantt);
// setting the REST mode for dataProcessor
dp.setTransactionMode("REST");
~~~

服务器端本身将在稍后实现。目前，您可以运行应用程序，查看页面上是否成功渲染了 gantt。

![adding_gantt](/img/adding_gantt.png)

## Step 3. 创建模型和数据库

### 创建模型

现在我们应为甘特图定义模型类。一个甘特图数据模型由 [Links 和 Tasks](guides/loading.md#databasestructure) 组成。

正如您所看到的，dhtmlxGantt 使用与 C# 中传统用法不同的命名约定的数据模型。客户端模型也可能包含某些您不需要存储在数据库中的属性，但这些属性将会在客户端或后端逻辑中使用。

因此，我们将采用 [Data Transfer Object](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5) 模式：定义将与 EF 与应用程序一起使用的领域模型类，以及用于与 Web API 进行通信的 DTO 类。然后实现两者之间的某种映射。

让我们开始！

#### Task 模型

首先，我们将为 Task 创建一个类。其内容可以类似于下面这样：

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

您可以在文档的 [corresponding article](guides/loading.md#task_properties) 中找到 Task 对象可用的属性的完整列表（包含必需属性和可选属性）。

#### Link 模型

现在是 Link 类的时机，它可能如下所示：

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

### 配置数据库连接

#### 安装 Entity Framework

如前所述，我们将借助 [Entity Framework](https://learn.microsoft.com/en-us/aspnet/entity-framework) 来与数据库打交道。

因此，首先需要安装该框架。要执行此操作，需在 Package Manager Console 中运行以下命令：

~~~js
Install-Package EntityFramework
~~~

#### 创建数据库上下文

下一步是创建 Context。Context 表示与数据库的一个会话。它允许获取和保存数据。

为 *Models* 文件夹的上下文菜单调用并选择 Add->Class。新类将被命名为 "GanttContext"，并具有以下内容：

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

#### 向数据库添加初始记录

现在我们可以向数据库添加一些记录。

当应用程序运行时，Entity Framework 可以自动创建数据库。我们应指定在模型更改时应删除并重新创建数据库。

首先，我们应创建一个数据库初始化程序。为此，需要在 *App_Start* 文件夹中添加一个新的类，该类将继承自 *DropCreateDatabaseIfModelChanges* 类。将其命名为 "GanttInitializer"。

在该类中，我们将重新定义 *Seed()* 方法以用测试数据填充它。然后我们将使用 *Add()* 方法将实体集合添加到上下文中。

下面给出 *GanttInitializer* 类的完整代码：

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

打开 *Global.asax* 文件。它包含应用程序启动时运行的代码。为我们的上下文在 *Application_Start()* 方法中添加必要的命名空间与代码行，以设置 Initializer：

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

### 定义 DTO 与映射

现在是声明将用于 Web API 的 DTO 类的时候。至于模型与 DTO 之间的映射，我们将采用最简单的方式：为这些类定义显式转换运算符。

TaskDto 类将如下所示：

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

下面给出 LinkDto 类的代码：

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

最后，我们再为数据源添加一个模型：

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

## Step 4. 实现 Web API

### 通过 REST API 加载数据的一般技术

终于来到实现 API 的阶段。

从 [API 的详细信息](guides/server-side.md#requestresponsedetails) 可以看到，我们将需要两个控制器：一个处理任务（Task），一个处理连线（Link）。此外，我们还需要再有一个控制器来实现“加载数据”这一动作，因为 gantt 需要在那里返回一个 [混合结果](guides/supported-data-formats.md)。
 
### Task 控制器

要创建一个新的控制器：

- 为 Controllers 文件夹激活上下文菜单，选择 Add -> Controller。
- 选择 Web API 2 Controller -> Empty。新控制器将被命名为 "TaskController"。

现在我们需要为任务条目实现基本的 CRUD 操作：

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

这里一切都非常直观：

- 在 GET 操作中，我们从数据库加载任务并输出它们的数据传输对象
- 在 PUT/POST 操作中，我们接收 DTO 作为输入，将其转换为 Task 模型并将更改保存到数据库上下文

现在让我们对链接（links）做同样的处理。

### Link 控制器

我们将为链接创建一个空的 Web API 控制器，如下所示：

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

### 数据控制器

最后，我们将为数据操作添加一个控制器：

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

现在一切就绪。运行应用程序，一个功能完整的 Gantt 应用应该会出现在页面上：

![ready_gantt_dotnet](/img/ready_gantt_dotnet.png)

[您可以在 github 上找到现成的示例](https://github.com/DHTMLX/gantt-howto-dotnet)。

## 错误处理

[异常筛选器](https://learn.microsoft.com/en-us/previous-versions/aspnet/gg416513(v="vs.98))" 可用于在 CRUD 处理程序中捕获异常，并返回客户端可以 [识别](guides/server-side.md#error-handling) 的响应，供前端 gantt 使用。

要为 gantt 提供错误处理，请按以下步骤操作：

进入 *App_Start*，添加一个新类，名为 *GanttAPIExceptionFilterAttribute*：

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

然后我们将把这一类添加到我们的 WebAPI 控制器中：

- Data 控制器：

~~~js title="Controllers/DataController.cs"
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class DataController : ApiController
~~~

- Link 控制器：

~~~js title="Controllers/LinkController.cs"
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class LinkController : ApiController
~~~

- 以及 Task 控制器：

~~~js title="Controllers/TaskController.cs"
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class TaskController : ApiController
~~~

现在如果任何 Web API 控制器在处理请求时抛出异常，
客户端将收到错误状态以及可被处理或显示给用户的错误信息。

请注意，将异常信息返回给客户端在生产环境中可能并非最佳做法。

## 存储任务顺序 {#storingtheorderoftasks}

客户端的 gantt 允许使用拖放重新排序任务。因此如果您使用此功能，您需要将此顺序存储在数据库中。您可以在此处查看通用描述（guides/server-side.md#storingtheorderoftasks）。

现在让我们将此功能添加到我们的应用中。

### 在客户端启用任务重新排序

首先，我们需要允许用户在 UI 中修改任务的顺序。

打开 *Index* 视图并更新 gantt 的配置：

~~~js title="Views/Home/Index.cshtml"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

// 指定日期格式
gantt.config.date_format = "%Y-%m-%d %H:%i";
// 初始化 gantt
gantt.init("gantt_here");
~~~

### 将任务顺序添加到模型

现在，让我们在后端实现这些更改。

我们将把排序存储在名为 SortOrder 的属性中，因此请相应地更新 *Task* 类：

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

现在需要更新 TaskController，具体如下：

- 客户端在接收任务时应按 SortOrder 值排序：

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

- 新任务在创建时应接收默认值 SortOrder： 

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

- 当在客户端修改任务顺序时，SortOrder 应被更新。

当用户改变任务顺序时，gantt 将调用一个 PUT 操作，并在请求的属性中提供新的任务位置（在 ['target'](guides/server-side.md#storingtheorderoftasks) 属性中），以及其他任务属性。因此，我们需要在任务 DTO 类中添加一个额外的属性：

~~~js title="Models/TaskDto.cs"
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
    public string type { get;; }
    public bool open{ get { return true; } set { } }
    public string target { get; set; }/*!*/
    
    ...
  }
}
~~~

现在我们将在 PUT（EditTask）操作中实现重新排序：

~~~js title="Controllers/TaskController.cs"
    // PUT api/Task/5
    [System.Web.Http.HttpPut]
    public IHttpActionResult EditTask(int id, TaskDto taskDto)
    {
      var updatedTask = (Task)taskDto;
      updatedTask.Id = id;

      if (!string.IsNullOrEmpty(taskDto.target))
      {
        // 重新排序发生了
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

      // 相邻任务 ID 以 '{id}' 或 'next:{id}' 形式传递，取决于它是下一个还是前一个兄弟
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

## 已知问题

HTTP PUT 和 DELETE 请求在 IIS 上运行时可能返回 405 或 401 错误。问题可能由 WebDAV 模块引起，与 RESTful 处理程序可能会冲突。 

作为常见解决方案，可以从 web.config 文件中禁用该模块。更多细节请参阅 [此处](https://learn.microsoft.com/en-us/answers/tags/828/developer-technologies)。

## 应用程序安全

Gantt 不提供任何防护措施来防止应用程序遭受各种威胁（如 SQL 注入、XSS 与 CSRF 攻击）。确保应用程序安全的责任在于实现后端的开发人员。请在对应文章中查看详细信息 [在此处](guides/app-security.md)。

## 故障排除

### 找不到 ASP.NET Web 应用模板

如果在 Visual Studio 2022 中找不到所需的 "ASP.NET Web Application" 项目模板，请按以下步骤操作：

1. 关闭 Visual Studio 2022
2. 打开开始菜单 -> Visual Studio Installer
3. 找到 Visual Studio Community 2022 -> 点击 “修改”

![vsinstaller](/img/vsinstaller.png)

4. 在打开的窗口中，选择 *Individual components*，勾选列表中的 *".NET Framework Project and item templates"*，然后点击修改

![components](/img/components.png)

之后，您就可以重新打开 Visual Studio 2022，找到所需的模板。

### 初始化数据库时出现异常

有时，您可能会遇到使用 DropCreateDatabaseIfModelChanges 初始化程序时，会在应用程序运行时删除现有数据库但未创建新数据库的问题。

![exception_error](/img/exception_error.png)

在这种情况下，打开 *GanttInitializer.cs*，将 *DropCreateDatabaseIfModelChanges* 替换为 *DropCreateDatabaseAlways*：

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

然后再次运行应用程序。

### 渲染任务和链接的问题

如果您已经完成上述步骤以实现 ASP.NET MVC 的 Gantt 集成，但页面上没有渲染任务和链接，请查看 [后端集成故障排除](guides/troubleshooting.md) 文章。它描述了识别问题根源的方法。

## 下一步

现在您已经拥有一个功能完备的甘特图。您可以在 [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet) 上查看完整代码，克隆或下载并用于您的项目。

您还可以查看 [有关甘特图众多功能的指南](guides.md) 或者关于 [将 Gantt 与其他后端框架集成的教程](integrations/howtostart-guides.md)。