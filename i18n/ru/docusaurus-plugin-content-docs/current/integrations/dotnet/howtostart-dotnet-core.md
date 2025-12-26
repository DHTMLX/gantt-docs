---
title: "dhtmlxGantt с ASP.NET Core"
sidebar_label: "ASP.NET Core"
---

# dhtmlxGantt с ASP.NET Core

В этом руководстве описан процесс настройки диаграммы Gantt с использованием [ASP.NET](https://dotnet.microsoft.com/apps/aspnet) Core на стороне сервера.

Также доступны руководства для других серверных платформ:

- [dhtmlxGantt с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

Для работы с базой данных используется [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/). Проект разрабатывается с помощью Visual Studio 2022.

:::note
Полный исходный код доступен [на GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core).
:::

## Шаг 1. Создание проекта

Запустите Visual Studio 2022 и создайте новый проект, выбрав *Create a new project*.

![dhtmlxGantt with ASP.NET Core creating a project](/img/howtostart_dotnetcore_newapp.png)

Затем выберите "ASP.NET Core Web App" и задайте имя проекта *DHX.Gantt*.

![dhtmlxGantt with ASP.NET Core creating a project](/img/howtostart_dotnetcore_newproject.png)

![dhtmlxGantt with ASP.NET Core configure a project](/img/howtostart_dotnetcore_configureproject.png)

![dhtmlxGantt with ASP.NET Core configure a project](/img/howtostart_dotnetcore_addinfo.png)

После создания проекта можно приступить к добавлению разметки и скриптов, необходимых для Gantt.

## Шаг 2. Добавление разметки и JS для Gantt

Перейдите в папку **wwwroot** и создайте новый файл с именем **index.html**.

![dhtmlxGantt with ASP.NET Core 2 creating a project](/img/create_project_step3.png)

![dhtmlxGantt with ASP.NET Core 2 creating a project](/img/create_project_step4.png)

В этом файле создайте простую страницу для отображения диаграммы Gantt.

Обратите внимание, что в этом примере файлы Gantt загружаются с [CDN](guides/installation.md#cdn). Если у вас есть Professional-версия, потребуется [добавить файлы Gantt в проект вручную](guides/installation.md#addingprofessionaleditionintoproject).

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

При загрузке страницы диаграмма Gantt инициализируется, и сразу начинается загрузка данных через `gantt.load()`. Также настраивается [`dataProcessor`](guides/server-side.md#technique), чтобы все изменения пользователя на диаграмме сохранялись на сервере. Поскольку backend еще не настроен, полная функциональность станет доступна после его реализации.

Далее откройте **Program.cs** и настройте приложение для обслуживания страницы **index.html**. Для этого включите раздачу статических файлов из папки `wwwroot`, добавив `app.UseDefaultFiles()`.

Подробнее об этом можно прочитать [здесь](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-2.1&tabs=aspnetcore2x).

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

Метод `app.UseDefaultFiles()` включает раздачу файлов по умолчанию, и ищет их в папке **wwwroot**:

- index.html
- index.htm
- default.html
- default.htm

Можно использовать любое из этих имён файлов; в этом руководстве используется "index.html".

Обратите внимание, что `UseDefaultFiles()` только переписывает URL, но не раздает файлы самостоятельно. Для реальной раздачи статических файлов также необходимо добавить `UseStaticFiles()`.

После выполнения этих шагов, при запуске приложения отобразится пустая диаграмма Gantt. Сообщение "Invalid data" в правом верхнем углу появляется потому, что вызывается `gantt.load()`, но backend еще не реализован для предоставления данных. После создания контроллера диаграмма Gantt будет корректно отображать задачи и связи.

![dhtmlxGantt with ASP.NET Core 2 adding Gantt](/img/adding_gantt_dotnet_core.png)

Когда базовая настройка завершена, следующим шагом будет создание backend. Начните с определения классов моделей, затем переходите к созданию WebAPI-контроллера.

## Шаг 3. Создание моделей и базы данных

Начните с определения моделей данных. Типичная модель данных для Gantt включает в себя [ссылки и задачи](guides/loading.md#standarddatabasestructure).
dhtmlxGantt использует имена свойств, отличающиеся от соглашений .NET.
Кроме того, некоторые свойства используются только на клиенте или для логики backend и не должны храниться в базе данных.

Для решения этой задачи будет применён паттерн [Data Transfer Object (DTO)](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5). Будут созданы два типа моделей:

- доменные классы для EF Core и внутреннего использования в приложении
- DTO-классы для взаимодействия с Web API.

Также будет реализовано сопоставление между этими моделями.

### Модели

Добавьте новую папку **Models** в директорию проекта. В этой папке будут размещаться классы моделей и контекст EF.

#### Модель задачи

Создайте класс для представления задач. Добавьте новый файл с именем **Task.cs** в папку Models, кликнув по папке правой кнопкой мыши и выбрав *Add->Class*.

Класс должен выглядеть следующим образом:

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

Полный список свойств объекта Task можно посмотреть [здесь](guides/loading.md#task_properties).

#### Модель связи

Добавьте еще один файл для связей:

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

После создания моделей следующим шагом будет настройка подключения к базе данных.

### Настройка подключения к базе данных

Выполните следующие шаги для настройки подключения к базе данных:

#### Установка Entity Framework Core

[Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) будет использоваться для работы с базой данных. Для установки:

- В дереве проекта найдите Dependencies под DHTMLX.Gantt
- Кликните правой кнопкой мыши и выберите *Manage NuGet packages*
- Перейдите на вкладку *Browse* и установите **Microsoft.EntityFrameworkCore.SqlServer**, **Microsoft.EntityFrameworkCore** и **Microsoft.EntityFrameworkCore.Design**

![dhtmlxGantt with ASP.NET Core EF core installation](/img/howtostart_dotnetcore_entityvianuget.png)

Либо используйте Package Manager Console:

~~~
PM> Install-Package Microsoft.EntityFrameworkCore.SqlServer
PM> Install-Package Microsoft.EntityFrameworkCore
PM> Install-Package Microsoft.EntityFrameworkCore.Design
~~~

Эти пакеты предоставят необходимые инструменты для взаимодействия с базой данных.

#### Создание Entity Context

Далее определите сессию с базой данных для загрузки и сохранения данных, создав класс контекста:

- Добавьте новый файл с именем **GanttContext.cs** в папку *Models*
- Определите в нем класс **GanttContext**

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

#### Добавление первых записей в базу данных

Пора заполнить базу данных начальными записями. Для этого создайте инициализатор базы данных, который добавит задачи и связи.
Внутри папки **Models** определите класс с именем **GanttSeeder**. Этот класс будет содержать метод **Seed()**, отвечающий за добавление задач и связей в базу данных.

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

#### Регистрация базы данных

Далее необходимо зарегистрировать базу данных в **Program.cs**. Для этого сначала потребуется строка подключения. 
Эта строка подключения будет храниться [в JSON-файле в настройках приложения](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-2.1&tabs=basicconfiguration). 
Создайте файл **appsettings.json** (или откройте его, если он уже существует) и добавьте строку подключения к базе данных:

**appsettings.json**
~~~js
{
  "ConnectionStrings": {
    "DefaultConnection": "Server="(localdb)mssqllocaldb;"
        Database=GanttDatabase;Trusted_Connection=True;"
  }
}
~~~

Контекст базы данных будет зарегистрирован с использованием 
[внедрения зависимостей](https://learn.microsoft.com/en-us/aspnet/core/data/ef-rp/intro?view="aspnetcore-2.1)."

Добавьте следующие пространства имён в **Program.cs**:

**Program.cs**
~~~js
using Microsoft.EntityFrameworkCore;
using DHX.Gantt.Models;
~~~

Регистрация будет выглядеть следующим образом:

**Program.cs**
~~~js
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<GanttContext>(
    options => options.UseSqlServer(connectionString));
~~~

Для включения контроллеров добавляется метод **services.AddControllers()**:

**Program.cs**
~~~js
builder.Services.AddControllers();
~~~

И вызывается **app.MapControllers()** для регистрации маршрутов контроллеров:

**Program.cs**
~~~js
app.MapControllers();
~~~


Ниже приведено полное содержимое файла **Program.cs**:

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

В завершение, база данных должна быть инициализирована и наполнена начальными данными при запуске приложения. Хотя обычно для этого используются миграции, в данном примере для простоты они не применяются.

Для начала создайте класс, в котором будет происходить инициализация. Добавьте файл **GanttInitializerExtension.cs** в папку **Models**:

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

Затем вызовите **InitializeDatabase()** следующим образом:

**Program.cs**
~~~js
app.InitializeDatabase();
~~~

Как уже упоминалось, в этом учебнике не используются миграции, вместо них применяется *EnsureCreated* и наполнение начальными данными.

На этом данный этап завершён. Далее возвращаемся к работе с диаграммой Gantt.

### Определение DTO и маппинга

Теперь необходимо создать классы DTO, которые будут использоваться Web API. 
Начнём с DTO-класса для Task. В папке **Models** создайте файл и определите класс **WebApiTask.cs**:

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

Далее приведён класс DTO для Link, определённый в **WebApiLink.cs** в папке **Models**:

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

После выполнения этого шага структура папок должна выглядеть следующим образом:

![Gantt ASP.NET Core 2 All models](/img/howtostart_dotnetcore_structure.png)

На этом этапе рекомендуется запустить приложение и убедиться, что всё настроено корректно. Если ошибок выполнения не появляется, значит настройка прошла успешно.

## Шаг 4. Реализация Web API

Теперь пришло время реализовать REST API.

### Добавление контроллеров

Создайте папку **Controllers** и добавьте три пустых API-контроллера: для задач (Tasks), связей (Links) и всего набора данных:

![Gantt ASP.NET Core 2 adding controllers](/img/howtostart_dotnetcore_addcontrollers.png)

#### Контроллер задач

Ниже приведён контроллер для управления задачами, реализующий базовые CRUD-операции для задач Gantt.

Как это работает:

- Для GET-запросов задачи извлекаются из базы данных и возвращаются в виде объектов передачи данных;
- Для PUT/POST-запросов задачи поступают от клиента как экземпляры WebApiTask. Это формат, используемый dhtmlxGantt. Перед сохранением изменений в DatabaseContext их необходимо преобразовать в формат модели данных, используемый EntityFramework (класс Task).


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

#### Контроллер связей

Далее приведён контроллер для связей:

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

#### Контроллер данных

Наконец, вот контроллер для работы с данными:

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

Теперь всё готово к запуску приложения, и вы увидите полностью работоспособный Gantt-диаграмму.

![Gantt ASP.NET Core Gantt is ready](/img/ready_gantt_dotnet_core.png)

[Полный исходный код также доступен на GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core/).

## Обработка ошибок

Для эффективного управления ошибками рекомендуется создать специальный [middleware-класс](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/startup?view="aspnetcore-2.1)," который будет перехватывать исключения во время выполнения и отправлять соответствующие ответы. Этот middleware затем добавляется в конвейер обработки запросов приложения. Вот как это сделать:

1. Добавьте middleware-класс в проект, используя шаблон.

![Gantt ASP.NET Core middleware class](/img/dotnet_core_middleware.png)

2. Установите JSON-фреймворк для ASP.NET Core. Это можно сделать через менеджер пакетов NuGet:

![Gantt ASP.NET Core Install NewtonSoft Json](/img/install_newtonsoft.png)

Или через консоль диспетчера пакетов:

~~~
PM> Install-Package NewtonSoft.JSON
~~~

3. Найдите метод **Invoke** в middleware. Так как некоторые обработчики могут выбрасывать исключения, оберните вызов `_next` в блок `try-catch` и обработайте ошибки по мере их возникновения.

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

4. Добавьте следующий namespace в **GanttErrorMiddleware.cs**:

~~~js
using Newtonsoft.Json;
~~~

5. Теперь middleware готов. Далее откройте **Program.cs** и зарегистрируйте middleware, добавив:

**Program.cs**
~~~js
using DHX.Gantt;
~~~

Затем включите middleware в конвейер с помощью следующей строки:

**Program.cs**
~~~js
app.UseGanttErrorMiddleware();
~~~

## Хранение порядка задач {#storingtheorderoftasks}

Когда пользователь меняет порядок задач с помощью drag and drop на клиенте, новый порядок должен сохраняться в базе данных. Подробности смотрите в [этой секции](guides/server-side.md#storingtheorderoftasks).

Вот как включить хранение порядка задач в вашем Gantt.

### Изменение порядка на клиенте

Сначала включите изменение порядка задач на клиенте, добавив следующие строки в **index.html**:

**wwwroot/index.html**
~~~js
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

// specifying the date format
gantt.config.date_format = "%Y-%m-%d %H:%i";
// initializing gantt
gantt.init("gantt_here");
~~~

### Добавление порядка задач в модель

Затем обновите backend, чтобы отражать текущий порядок задач. Добавьте новое свойство в модель **Task**:

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

### Обновление контроллеров

Контроллеры также требуют некоторых изменений.

1. Клиент должен получать задачи, отсортированные по **SortOrder**. Добавьте отмеченную строку в DataController:

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

2. При создании новых задач убедитесь, что им присваивается значение **SortOrder** по умолчанию:

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

3. **sortOrder** необходимо обновлять при изменении порядка задач на клиенте. Когда задачи переставляются, gantt отправляет PUT-запрос с новой позицией в свойстве 
['target'](guides/server-side.md#storingtheorderoftasks), вместе с остальными данными задачи.

Добавьте свойство `target` в класс **WebApiTask.cs**:

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

Теперь реализуйте логику изменения порядка в действии PUT (EditTask). Обновите метод Put в контроллере задач:

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

Добавьте вспомогательный метод для корректировки порядка задач:

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

## Безопасность приложения

Gantt сам по себе не обеспечивает защиту от угроз, таких как SQL-инъекции, XSS или CSRF. Ответственность за безопасность приложения лежит на разработчиках backend. Подробнее см. [соответствующую статью](guides/app-security.md).

### Защита от XSS

Один из простых способов - кодировать текстовые поля перед отправкой их на клиент.

Например, в примере ниже используется встроенный HtmlEncoder для экранирования HTML в текстах задач. Таким образом, в базе данных остаются исходные данные, а клиент получает безопасные значения для `task.text`.

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

В качестве альтернативы можно использовать специализированную библиотеку, например, [HtmlAgilityPack](https://www.nuget.org/packages/HtmlAgilityPack/), чтобы полностью удалять HTML при сохранении или загрузке задач.

## Устранение неполадок

Если вы выполнили все шаги по интеграции Gantt с ASP.NET Core, но задачи и связи не отображаются на странице, обратитесь к статье [Устранение проблем интеграции с backend](guides/troubleshooting.md). В ней описаны распространённые проблемы и способы их устранения.


## Что дальше

На этом этапе у вас есть рабочая реализация gantt. Полный исходный код доступен на [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core) - вы можете клонировать или скачать его для использования в своих проектах.

Также вы можете ознакомиться с [руководствами по многим возможностям gantt](guides.md) или туториалами по [интеграции Gantt с другими backend-фреймворками](integrations/howtostart-guides.md).
