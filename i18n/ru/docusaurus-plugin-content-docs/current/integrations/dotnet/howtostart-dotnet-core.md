---
title: "dhtmlxGantt с ASP.NET Core"
sidebar_label: "ASP.NET Core"
---

# dhtmlxGantt с ASP.NET Core 

Этот учебник даёт пошаговые инструкции по созданию Gantt с [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet) Core на серверной стороне.

Вы также можете прочитать руководства по другим технологиям на серверной стороне:

- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)


Для организации взаимодействия с базой данных используется [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/). Приложение создаётся с помощью Visual Studio 2022.

:::note
Полный исходный код доступен на GitHub: [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core).
:::

## Шаг 1. Создание проекта

Запустите Visual Studio 2022 и создайте новый проект. Выберите: *Create a new project*.

![dhtmlxGantt с ASP.NET Core создание проекта](/img/howtostart_dotnetcore_newapp.png)

Далее выберите "ASP.NET Core Web App" и назовите проект *DHX.Gantt*.

![dhtmlxGantt с ASP.NET Core создание проекта](/img/howtostart_dotnetcore_newproject.png)


![dhtmlxGantt с ASP.NET Core настройка проекта](/img/howtostart_dotnetcore_configureproject.png)

![dhtmlxGantt с ASP.NET Core настройка проекта](/img/howtostart_dotnetcore_addinfo.png)

Так как вы создали проект, можно переходить к добавлению разметки и скриптов для Gantt.

## Шаг 2. Добавление разметки Gantt и JS

Перейдите в **wwwroot** и создайте файл **index.html**.

![dhtmlxGantt с ASP.NET Core 2 создание проекта](/img/create_project_step3.png)

![dhtmlxGantt с ASP.NET Core 2 создание проекта](/img/create_project_step4.png)

В newly созданном файле сделайте простую страницу для диаграммы Gantt.

Обратите внимание, что файлы Gantt добавляются с помощью [CDN](guides/installation.md#cdn) в этом демо. Если у вас есть Professional-версия компонента, 
вам нужно [добавить файлы Gantt в ваш проект вручную](guides/installation.md#adding-pro-edition-into-project). 


~~~html title="index.html"
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Index</title>
    <link href="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css" rel="stylesheet" type="text/css" />
    <link href="css/site.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
        // specifying the date format
        gantt.config.date_format = '%Y-%m-%d %H:%i';
        // initializing gantt
        gantt.init('gantt_here');

        // initiating data loading
        gantt.load('/api/data');
        // creating and configuring dataProcessor
        const dp = gantt.createDataProcessor({
          url: '/api/',
          mode: 'REST',
        });
      });
    </script>
</head>
<body>
    <div id="gantt_here" style="width: 100vw; height: 100vh"></div>
</body>
</html>
~~~

Когда страница загружена, помимо (инициализации диаграммы) [data loading](guides/loading.md) сразу вызывается и 
[`dataProcessor`](guides/server-side.md#technique) настраивается, поэтому все изменения диаграммы Gantt, сделанные пользователем, будут сохранены на бекенд. Бэкенд ещё не реализован, поэтому позже будет иметь смысл.

Далее перейдите к **Program.cs** и скажите приложению использовать страницу **index.html**. Чтобы сделать это, необходимо настроить приложение на выдачу статических файлов из папки `wwwroot`. 
Для этого нужно добавить метод `app.UseDefaultFiles()`.
Подробнее можно узнать [здесь](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-9.0).


~~~js title="Program.cs"
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

Метод `app.UseDefaultFiles()` позволяет обслуживать файлы по умолчанию. Он будет искать в папке **wwwroot** следующие файлы:

- index.html
- index.htm
- default.html
- default.htm

Таким образом, можно выбрать любой из них, однако в этом руководстве используется "index.html".
`UseDefaultFiles()` — это всего лишь переписчик URL, который фактически файл не обслуживает. Для этой цели нужно также добавить файл `UseStaticFiles()`.
Чтобы Gantt занимал всё пространство тела документа, добавьте следующие стили в файл `site.css`, который находится в папке `wwwroot/css`:

~~~css title="DHX.Gantt/wwwroot/css/site.css"
html {
    font-size: 14px;
}

@media (min-width: 768px) {
    html {
        font-size: 16px;
    }
}

body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}
~~~

После выполнения этого на странице при запуске приложения должен появиться пустой Gantt. Обратите внимание, что надпись "Invalid data" в правом верхнем углу появляется, потому что вызывается `gantt.load()`, так как пока нет подходящего бекенда для подачи данных. Когда будет реализован контроллер, Gantt сможет отображать задачи и связи.

![dhtmlxGantt с ASP.NET Core 2 добавление Gantt](/img/adding_gantt_dotnet_core.png)


Теперь базовая часть сделана и пора реализовать backend. Начнем с реализации моделей и далее перейдём к WebAPI контроллеру.

### Создание моделей и базы данных

Начнем с моделей данных. Модель данных для Gantt включает [ссылки и задачи](guides/loading.md#databasestructure). 
dhtmlxGantt использует нестандартные имена свойств моделей с точки зрения мира .NET. 
Иногда клиентская модель также содержит свойства для клиента или логики бэкенда, но эти свойства не должны сохраняться в базе данных.

Для этого будет использоваться шаблон Data Transfer Object (DTO). Определятся два типа моделей:

- доменные модели, которые будут использоваться с EF Core и внутри приложения
- DTO-модели, которые будут использоваться для взаимодействия с Web API.

Затем следует реализовать отображение между двумя моделями.

### Модели

Создайте новую папку под названием **Models** в папке проекта. Здесь будут реализованы классы моделей и контекст EF.

#### Модель Task

Сначала создайте класс для задач. Создайте файл в папке Models и назовите его **Task.cs**. Это можно сделать через контекстное меню папки Models и выбрать *Add->Class*.

Вот как должна выглядеть модель:


~~~js title="DHX.Gantt/Models/Task.cs"
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

Вы можете посмотреть [список всех свойств объекта Task](guides/loading.md#task_properties).

#### Модель Link

Добавьте ещё один файл и создайте класс для Links:


~~~js title="DHX.Gantt/Models/Link.cs"
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

Модели готовы, и можно начинать настраивать подключение к базе данных.

### Настройка подключения к базе данных

Чтобы настроить подключение к базе данных, выполните ниже указанные шаги:

#### Установка Entity Framework Core 

Entity Framework Core будет использоваться для управления коммуникацией приложения с базой данных. Давайте установим фреймворк: 

- найдите зависимости DHTMLX.Gantt в дереве проекта
- вызовите контекстное меню и выберите *Manage NuGet packages* 
- откройте вкладку *Browse* и установите **Microsoft.EntityFrameworkCore.SqlServer**, **Microsoft.EntityFrameworkCore**, и **Microsoft.EntityFrameworkCore.Design**

![dhtmlxGantt с ASP.NET Core EF core установка](/img/howtostart_dotnetcore_entityvianuget.png)

Или используйте командную строку пакетного менеджера:


~~~
PM> Install-Package Microsoft.EntityFrameworkCore.SqlServer
PM> Install-Package Microsoft.EntityFrameworkCore
PM> Install-Package Microsoft.EntityFrameworkCore.Design
~~~

Entity Framework Core будет использоваться для управления взаимодействием приложения с базой данных.

#### Создать Entity Context

Далее нужно определить контекст сессии с базой данных и включить загрузку и сохранение данных. Для этого создайте Context:

- добавьте файл **GanttContext.cs** в папку *Models* 
- определите класс **GanttContext** в созданном файле


~~~js title="DHX.Gantt/Models/GanttContext.cs"
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

#### Добавление первых записей в базу данных

Теперь можно добавить записи в базу данных. Давайте создадим инициализатор базы данных, который заполнит её задачами. 
В папке **Models** объявите класс и назовите его **GanttSeeder**. Класс будет иметь метод **Seed()**, который добавит задачи и связи в базу данных.


~~~js title="DHX.Gantt/Models/GanttSeeder.cs"
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

#### Регистрация базы данных

Теперь нужно зарегистрировать базу данных в **Program.cs**. Но сперва понадобится строка подключения. Она будет храниться [в JSON-файле в настройках приложения](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-9.0).
Создайте файл **appsettings.json** (или откройте его, если он уже есть) и добавьте строку подключения к базе данных:


~~~js title="appsettings.json"
{
  "ConnectionStrings": {
    "DefaultConnection": "Server="(localdb)mssqllocaldb;"
        Database=GanttDatabase;Trusted_Connection=True;"
  }
}
~~~

Контекст базы данных будет зарегистрирован через 
[dependency injection](https://learn.microsoft.com/en-us/aspnet/core/data/ef-rp/intro?view=aspnetcore-9.0&viewFallbackFrom=aspnetcore-2.1&tabs=visual-studio)." 

Добавьте следующие пространства имён в **Program.cs**:


~~~js title="Program.cs"
using Microsoft.EntityFrameworkCore;
using DHX.Gantt.Models;
~~~

Декларация будет выглядеть так:

~~~js title="Program.cs"
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<GanttContext>(
    options => options.UseSqlServer(connectionString));
~~~

Для включения контроллеров вызывается метод **services.AddControllers()**:

~~~js title="Program.cs"
builder.Services.AddControllers();
~~~

И вызываем **app.MapControllers()** для регистрации маршрутов контроллеров:

~~~js title="Program.cs"
app.MapControllers();
~~~


Вот полный код файла **Program.cs**:

~~~js title="Program.cs"
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

Наконец, нужно инициализировать и заполнить базу данных при запуске приложения. Обычно используют миграции, но здесь они не применяются для простоты.

Начнём с создания класса, в котором будет выполняться инициализация. Создайте файл **GanttInitializerExtension.cs** в папке **Models**:


~~~js title="Models/GanttInitializerExtension.cs"
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

Далее вызовите **InitializeDatabase()**:


~~~js title="Program.cs"
app.InitializeDatabase();
~~~

Как уже упоминалось выше, миграции в этом руководстве не используются. Вместо этого применяются простые *EnsureCreated* и *seed*.

Сейчас часть завершена, вернёмся к Gantt.

### Определение DTO и отображение

Настало время определить DTO-классы, которые будут использоваться для Web API. Начнём с DTO-класса для Task. В папке **Models** создайте файл и определите класс **WebApiTask.cs**:


~~~js title="Models/WebApiTask.cs"
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

И это DTO-класс для Link, определённый в файле **WebApiLink.cs** в папке Models:


~~~js title="Models/WebApiLink.cs"
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

Когда вы завершите этот шаг, структура папок будет выглядеть следующим образом:

![Gantt ASP.NET Core 2 All models](/img/howtostart_dotnetcore_structure.png)

Теперь можно запустить приложение, чтобы проверить, что всё на месте. Если ошибок времени выполнения не видно, значит всё в порядке.

## Шаг 4. Реализация Web API

Теперь настало время реализации самого REST API.

### Добавление контроллеров

Создайте папку **Controllers** и три пустых API-контроллера: один для Tasks, другой для Links и ещё один для всего набора данных:

![Gantt ASP.NET Core 2 adding controllers](/img/howtostart_dotnetcore_addcontrollers.png)


#### Контроллер Task

Создадим контроллер для Tasks. Он будет определять базовые CRUD-операции для задач Gantt.

Как это работает:

- в GET-запросах задачи загружаются из базы данных и возвращаются как DTO объектов задач;
- в PUT/POST запросах задачи приходят от клиента как WebApiTask-классы. Они представлены в этом формате в dhtmlxGantt. 
Поэтому их следует преобразовать к формату нашей модели данных для EntityFramework (класс Task). Затем можно сохранить изменения в DatabaseContext.


~~~js title="Controllers/TaskController.cs"
using Microsoft.AspNetCore.Mvc;
using DHX.Gantt.Models;
using Microsoft.EntityFrameworkCore;

namespace DHX.Gantt.Controllers
{
    [Produces("application/json")]
    [Route("api/task")]
    public class TaskController : ControllerBase
    {
        private readonly GanttContext _context;
        public TaskController(GanttContext context)
        {
            _context = context;
        }

        // GET api/task
        [HttpGet]
        public async Task<IEnumerable<WebApiTask>> Get()
        {
            return await _context.Tasks
                .Select(t => (WebApiTask)t)
                .ToListAsync();
        }

        // GET api/task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Task>> Get(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return NotFound();

            return Ok(task);
        }

        // POST api/task
        [HttpPost]
        public async Task<IActionResult> Post(WebApiTask apiTask)
        {
            var newTask = (Models.Task)apiTask;

            await _context.Tasks.AddAsync(newTask);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                tid = newTask.Id,
                action = "inserted"
            });
        }

        // PUT api/task/5
        [HttpPut("{id}")]
        public async Task<IActionResult?> Put(int id, WebApiTask apiTask)
        {
            var updatedTask = (Models.Task)apiTask;
            var dbTask = await _context.Tasks.FindAsync(id);

            if (dbTask == null)
            {
                return NotFound();
            }

            dbTask.Text = updatedTask.Text;
            dbTask.StartDate = updatedTask.StartDate;
            dbTask.Duration = updatedTask.Duration;
            dbTask.ParentId = updatedTask.ParentId;
            dbTask.Progress = updatedTask.Progress;
            dbTask.Type = updatedTask.Type;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                action = "updated"
            });
        }

        // DELETE api/task/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                action = "deleted"
            });
        }
    }
}
~~~

#### Контроллер Link

Далее создайте контроллер для Links:


~~~js title="Controllers/LinkController.cs"
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using DHX.Gantt.Models;

namespace DHX.Gantt.Controllers
{
    [Produces("application/json")]
    [Route("api/link")]
    public class LinkController : ControllerBase
    {
        private readonly GanttContext _context;
        public LinkController(GanttContext context)
        {
            _context = context;
        }

        // GET api/Link
        [HttpGet]
        public async Task<IEnumerable<WebApiLink>> Get()
        {
            return await _context.Links
                .Select(t => (WebApiLink)t)
                .ToListAsync();
        }

        // GET api/Link/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Link>> Get(int id)
        {
            var link = await _context.Links.FindAsync(id);

            if (link == null)
                return NotFound();

            return Ok(link);
        }

        // POST api/Link
        [HttpPost]
        public async Task<IActionResult> Post(WebApiLink apiLink)
        {
            var newLink = (Link)apiLink;

            _context.Links.Add(newLink);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                tid = newLink.Id,
                action = "inserted"
            });
        }

        // PUT api/Link/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, WebApiLink apiLink)
        {
            var updatedLink = (Link)apiLink;
            updatedLink.Id = id;
            _context.Entry(updatedLink).State = EntityState.Modified;


            await _context.SaveChangesAsync();

            return Ok(new
            {
                action = "updated"
            });
        }

        // DELETE api/Link/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLink(int id)
        {
            var link = await _context.Links.FindAsync(id);
            if (link != null)
            {
                _context.Links.Remove(link);
                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                action = "deleted"
            });
        }
    }
}
~~~

#### Контроллер Data

Наконец, нужно создать контроллер для действия данных:

~~~js title="Controllers/DataController.cs"
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DHX.Gantt.Models;

namespace DHX.Gantt.Controllers
{
    [Produces("application/json")]
    [Route("api/data")]
    public class DataController : ControllerBase
    {
        private readonly GanttContext _context;
        public DataController(GanttContext context)
        {
            _context = context;
        }

        // GET api/data
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var tasks = await _context.Tasks
                .Select(t => (WebApiTask)t)
                .ToListAsync();

            var links = await _context.Links
                .Select(l => (WebApiLink)l)
                .ToListAsync();

            return Ok(new
            {
                tasks,
                links
            });
        }
    }
}
~~~

Всё готово. Можно запустить приложение и увидеть полностью функциональный Gantt.

![Gantt ASP.NET Core Gantt is ready](/img/ready_gantt_dotnet_core.png)


[Полный исходный код cũng можно просмотреть на GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core/).

## Обработка ошибок

Чтобы обрабатывать ошибки, нужно объявить специальный класс middleware, который будет перехватывать исключения во время выполнения и записывать ответы. Затем его добавят в конвейер обработки запросов приложения. Выполните следующие шаги:

1) Создайте middleware-класс на основе шаблона в папке проекта. 

![Gantt ASP.NET Core middleware class](/img/dotnet_core_middleware.png)

2) Установите JSON-фреймворк для ASP.NET Core. Это можно сделать через диспетчер пакетами NuGet:

![Gantt ASP.NET Core Install NewtonSoft Json](/img/install_newtonsoft.png)

Или воспользуйтесь командной строкой пакетного менеджера:

~~~
PM> Install-Package NewtonSoft.JSON
~~~

3) Найдите метод **invoke** и обратите внимание на вызов `_next`. Некоторые обработчики могут выбросить исключение, поэтому давайте перехватим его. Оборачиваем вызов `_next` в блок `try-catch` и выполняем наш обработчик при возникновении ошибки. 

~~~js title="GanttErrorMiddleware.cs"
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

4) Добавьте следующие пространства имён в **GanttErrorMiddleware.cs**:

~~~js
using Newtonsoft.Json;
~~~

5) middleware готов. Теперь перейдите к **Program.cs** и подключите middleware. Добавьте следующее пространство имён:

~~~js title="Program.cs"
using DHX.Gantt;
~~~

Далее вызовите метод **app.UseGanttErrorMiddleware()**:

~~~js title="Program.cs"
app.UseGanttErrorMiddleware();
~~~

## Хранение порядка задач {#storingtheorderoftasks}

Пользователи могут перетаскивать задачи вправо/влево на клиенте. Если вы используете эту возможность, следует сохранять порядок задач в базе данных. 
См. подробнее в [этом разделе](guides/server-side.md#storingtheorderoftasks).

Далее — как включить сохранение порядка задач для Gantt.

### Перестановка на клиентской стороне

Сначала включите изменение порядка задач на клиентской стороне. Добавьте эти строки в **index.html**:

~~~js title="wwwroot/index.html"
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

// specifying the date format
gantt.config.date_format = "%Y-%m-%d %H:%i";
// initializing gantt
gantt.init("gantt_here");
~~~

### Добавление порядка задач в модель

Далее вы должны изменить бэкэнд так, чтобы он отражал текущий порядок задач. Добавьте ещё один метод в модель **Task**:

~~~js title="Models/Task.cs"
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

### Обновление контроллеров

Также потребуется обновить контроллеры.
 
1. Клиентская часть должна получать задачи, отсортированные по значению SortOrder. Добавьте выделенную строку в DataController:

~~~js title="Controllers/DataController.cs"
[HttpGet]
public async Task<IActionResult> Get()
{
    var tasks = await _context.Tasks
        .OrderBy(t => t.SortOrder) /*!*/
        .Select(t => (WebApiTask)t)
        .ToListAsync();

    var links = await _context.Links
        .Select(l => (WebApiLink)l)
        .ToListAsync();

    return Ok(new
    {
        data = tasks,
        links = links
    });
}
~~~

2. Новые задачи также должны получать значение по умолчанию SortOrder:

~~~js title="controllers/TaskController.cs"
// POST api/task
[HttpPost]
public async Task<IActionResult> Post(WebApiTask apiTask)
{
    var newTask = (Models.Task)apiTask;

    newTask.SortOrder = await _context.Tasks.MaxAsync(t => t.SortOrder) + 1; /*!*/
    await _context.Tasks.AddAsync(newTask);
    await _context.SaveChangesAsync();

    return Ok(new
    {
        tid = newTask.Id,
        action = "inserted"
    });
}
~~~

3. Значение **sortOrder** должно обновляться, когда порядок задач на клиенте меняется. Когда пользователь переставляет задачи, Gantt вызывает PUT-действие и передаёт информацию об позициях новой задачи в свойстве
`target` запроса, вместе с остальными свойствами задачи. Добавьте свойство `target` в класс **WebApiTask.cs**:

~~~js title="Models/WebApiTask.cs"
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
 
И теперь реализуем перестановку в нашем PUT- (EditTask) действии. Измените действие Put в TaskController:
 
~~~js title="Controllers/TaskController.cs"
// PUT api/task/5
[HttpPut("{id}")]
public async Task<IActionResult?> Put(int id, WebApiTask apiTask)
{
    var updatedTask = (Models.Task)apiTask;
    var dbTask = await _context.Tasks.FindAsync(id);

    if (dbTask == null)
    {
        return NotFound();
    }

    dbTask.Text = updatedTask.Text;
    dbTask.StartDate = updatedTask.StartDate;
    dbTask.Duration = updatedTask.Duration;
    dbTask.ParentId = updatedTask.ParentId;
    dbTask.Progress = updatedTask.Progress;
    dbTask.Type = updatedTask.Type;

    if (!string.IsNullOrEmpty(apiTask.target))                /*!*/
    {                                                         /*!*/
        // перестановка произошла                                /*!*/   
        await this.UpdateOrdersAsync(dbTask, apiTask.target); /*!*/
    }                                                         /*!*/

    await _context.SaveChangesAsync();

    return Ok(new
    {
        action = "updated"
    });
}
~~~
 
И добавим метод, который будет обновлять порядок задач:
 
~~~js title="Controllers/TaskController.cs"
private async Task<IActionResult> UpdateOrdersAsync(Models.Task updatedTask, string orderTarget)
{
    int adjacentTaskId;
    var nextSibling = false;

    var targetId = orderTarget;

    // соседняя задача передаётся либо как '{id}', либо как 'next:{id}' в зависимости
    // от того, следующая это или предыдущая соседняя
    if (targetId.StartsWith("next:"))
    {
        targetId = targetId.Replace("next:", "");
        nextSibling = true;
    }

    if (!int.TryParse(targetId, out adjacentTaskId))
    {
        return NotFound();
    }

    var adjacentTask = await _context.Tasks.FindAsync(adjacentTaskId);
    if (adjacentTask == null)
    {
        return NotFound();
    }
    var startOrder = adjacentTask.SortOrder;

    if (nextSibling)
        startOrder++;

    updatedTask.SortOrder = startOrder;

    var updateOrders = await _context.Tasks
        .Where(t => t.Id != updatedTask.Id)
        .Where(t => t.SortOrder >= startOrder)
        .OrderBy(t => t.SortOrder)
        .ToListAsync();

    var taskList = updateOrders.ToList();
    taskList.ForEach(t => t.SortOrder++);

    return Ok(new
    {
        action = "updated"
    });
}
~~~

## Безопасность приложения

Gantt не предоставляет механизма защиты от разных угроз, таких как SQL-инъекции, XSS и CSRF-атаки. Ответственность за безопасность приложения лежит на разработчиках, которые реализуют бекенд. Подробности в соответствующей статье guid es/app-security.md.

### Защита от XSS

Простое решение — кодировать текстовые свойства ваших элементов данных перед отправкой на клиентскую сторону.

Например, ниже приведён пример использования встроенного HtmlEncoder для экранирования HTML-значений в тексте задач. Так данные в базе будут неизменными, а на клиентской стороне будут безопасные значения `task.text`.

~~~js title="Models/WebApiTask.cs"
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

Другой подход — использовать специализированную библиотеку, например [HtmlAgilityPack](https://www.nuget.org/packages/HtmlAgilityPack/) и полностью удалять любой HTML из задачи при сохранении/загрузке данных.

## Устранение неполадок

Если вы выполнили все вышеописанные шаги по интеграции Gantt с ASP.NET Core, но Gantt не рендерит задачи и связи на странице, посмотрите статью [Troubleshooting Backend Integration Issues](guides/troubleshooting.md). Она описывает способы выявления корней проблем.

## Что дальше

Теперь у вас полнофункциональный Gantt. Полный код можно посмотреть на [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core), клонировать или загрузить и использовать в ваших проектах.

Также можно ознакомиться с [guides на множество функций Gantt](guides.md) или руководствами по [интеграции Gantt с другими бекенд-фреймворками](integrations/howtostart-guides.md).