---
title: "dhtmlxGantt с ASP.NET MVC"
sidebar_label: "ASP.NET MVC"
---

# dhtmlxGantt с ASP.NET MVC 

Этот туториал даст пошаговые инструкции по созданию Gantt с помощью [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet) и REST API на серверной стороне. 

Вы также можете изучить другие возможности серверной интеграции Gantt, выбрав один из следующих руководств:

- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

Мы будем использовать веб-платформу ASP.NET MVC 5 и контроллер Web API 2 для REST API, чтобы создать приложение Gantt. Чтобы организовать взаимодействие с базой данных, мы будем использовать [Entity Framework].
Мы будем разрабатывать наше приложение с помощью IDE Visual Studio. 

:::note
Полный исходный код доступен на GitHub.
:::

## Шаг 1. Создание проекта

### Создание нового проекта Visual Studio 

Запустите Visual Studio 2022 и выберите *Создать новый проект*.

![how_to_start_net_create_project](/img/how_to_start_net_create_project.png)

Затем выберите "ASP.NET Web Application" и назовите проект *DHX.Gantt.Web*. Если нужного шаблона не найдено, см. раздел [Устранение неполадок](#trouble-shooting).


![how_to_start_net_project_template](/img/how_to_start_net_project_template.png)

![how_to_start_net_configure_project](/img/how_to_start_net_configure_project.png)

Выберите проект *Empty* среди доступных шаблонов и установите флажки рядом с MVC и Web API возле списка шаблонов.

![how_to_start_net_app](/img/how_to_start_net_app.png)

## Шаг 2. Добавление Gantt на страницу

### Создание контроллера

Теперь у нас пустой проект и все готово к реализации нашего Gantt.

Во-первых, добавим MVC-контроллер, который будет показывать страницу с диаграммой Gantt.

Чтобы создать его, вызовите контекстное меню для папки Controllers и выберите Add->Controller.
В открывшемся окне выберите MVC 5 Controller -> Empty и назовите добавленный контроллер "HomeController".

![how_to_start_net_controller](/img/how_to_start_net_controller.png)

HomeController по умолчанию имеет метод *Index()* класса *ActionResult*, поэтому дополнительной логики не требуется. Мы просто добавим для него представление.


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

### Создание представления

Теперь пришло время создать нашу страницу Index. Откройте Views/Home и добавьте пустое представление с именем Index:

![how_to_start_net_view](/img/how_to_start_net_view.png)

Откройте недавно созданное представление и вставьте в него следующий код:

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

Что мы сделали здесь:

- определили простую разметку страницы для нашего приложения Gantt
- добавили js/css источники dhtmlx Gantt с использованием [CDN-ссылок](guides/cdn-links-list.md)
- и создали gantt на странице

Обратите внимание на конфигурацию: мы указали [формат дат](api/config/date_format.md), который поступает из источника данных. 

~~~js title="Views/Home/Index.cshtml"
gantt.config.date_format = "%Y-%m-%d %H:%i";
~~~

Это нужно, чтобы наш клиент мог распознавать даты, поступающие с сервера.

И также мы сообщили Gantt, что он будет работать с RESTful API на бэкенде и будет использовать ["/api/"](guides/server-side.md#technique) в качестве маршрута по умолчанию:

~~~js title="Views/Home/Index.cshtml"
gantt.load("/api/data");
// initializing dataProcessor
var dp = new gantt.dataProcessor("/api/");
// and attaching it to gantt
dp.init(gantt);
// setting the REST mode for dataProcessor
dp.setTransactionMode("REST");
~~~


Серверная часть будет реализована чуть позже. Пока можно запустить приложение и увидеть, что на странице отрисован Gantt.

![adding_gantt](/img/adding_gantt.png)


## Шаг 3. Создание моделей и базы данных

### Создание моделей

Теперь нужно определить классы моделей для диаграммы Gantt. Модель данных Gantt состоит из [Связей и Задач].
Как видно, dhtmlxGantt использует определённое именование моделей данных, которое отличается от того, что обычно применяется в C#. 
Клиентская модель может содержать некоторые свойства, которые не нужно сохранять в базе данных, но которые будут использоваться либо на клиенте, либо в логике на стороне сервера.

Из-за этого мы будем применять паттерн [Data Transfer Object] (DTO): определим доменные модели, которые будут использоваться с EF внутри приложения, и DTO-классы, которые будут использоваться для общения с Web API. Затем реализуем некое сопоставление между этими моделями.

Начнём!

#### Модель задачи

Сначала создадим класс для Task. Его содержимое может выглядеть примерно так: 

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

Полный перечень свойств, как обязательных, так и необязательных, доступных для объекта Task, можно найти в
[соответствующей статье](guides/loading.md#task_properties) документации.

#### Модель связи 

Теперь настало время для класса Link, который может выглядеть следующим образом:


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

### Настройка подключения к базе данных

#### Установка Entity Framework

Как вы помните, мы собираемся организовать работу с базой данных с помощью [Entity Framework].

Поэтому в первую очередь нужно установить фреймворк. Чтобы сделать это, выполните следующую команду в Package Manager Console:

~~~js
Install-Package EntityFramework
~~~

#### Создание контекста БД

Следующий шаг — создание Context. Context представляет сессию с базой данных. Он позволяет получать и сохранять данные.

Откройте контекстное меню для папки *Models* и выберите Add->Class. Новый класс будет называться "GanttContext" и будет иметь следующее содержимое:


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

#### Добавление начальных записей в базу данных

Теперь можно добавить записи в базу данных.

Entity Framework может автоматически создавать базу данных при запуске приложения. Мы должны указать, что база данных должна удаляться и пересоздаваться каждый раз, когда модель изменяется.

Сначала следует создать инициализатор базы данных. Для этой цели нужно добавить новый класс в папку *App_Start*, который будет унаследован от класса *DropCreateDatabaseIfModelChanges*. Назовём его "GanttInitializer".

В этом классе мы переопределим метод *Seed()* для заполнения тестовыми данными. Затем добавим коллекцию сущностей в контекст с помощью метода *Add()*.

Полный код класса *GanttInitializer* приведён ниже:


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

Откройте файл *Global.asax*. В нём находится код, который выполняется при старте приложения. Добавьте необходимое пространство имён и строку кода, устанавливающую инициализатор для нашего контекста в методе *Application_Start()*:


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

### Определение DTO и отображения

Пора объявить DTO-классы, которые будут использоваться для Web API.
Что касается отображения между Model и DTO, мы пойдём самым простым путём и просто определим явный оператор преобразования для этих классов.

Класс TaskDto будет выглядеть следующим образом:


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

Код класса LinkDto приведён ниже:


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


Наконец, добавим модель для [источника данных](guides/supported-data-formats.md):


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

## Шаг 4. Реализация Web API

### Общая техника загрузки данных через REST API

Наконец настало время реализовать API. 

Как видно из [деталей API](guides/server-side.md#requestresponsedetails), нам понадобятся два контроллера: один для задач и один для связей. 
Также нам потребуется ещё один контроллер для действия 'load data', так как gantt ожидает здесь [смешанный результат](guides/supported-data-formats.md).

### Контроллер задач (Task Controller)

Чтобы создать новый контроллер:

- Активируйте контекстное меню для папки Controllers и выберите Add -> Controller.
- Выберите Web API 2 Controller -> Empty. Новый контроллер будет называться "TaskController". 

Теперь нужно реализовать базовые действия CRUD для задачи:


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

Всё довольно просто:

- в GET-операциях мы загружаем задачи из базы данных и выводим их DTO
- в PUT/POST операциях мы принимаем DTO как входные данные, конвертируем его в модель Task и сохраняем изменения в контекст БД

Теперь сделаем то же самое для связей (links).

### Контроллер связей (Link Controller)

Создадим пустой Web API Controller для связей следующим образом:


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

### Контроллер данных (Data Controller)

Наконец, добавим контроллер для действия data:


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

Теперь всё готово. Запустите приложение — на странице должен появиться полностью готовый Gantt:


![ready_gantt_dotnet](/img/ready_gantt_dotnet.png)

[Готовую демонстрацию можно найти на github](https://github.com/DHTMLX/gantt-howto-dotnet).


## Обработка ошибок 

[Exception filters](https://learn.microsoft.com/en-us/previous-versions/aspnet/gg416513(v="vs.98)) можно использовать для перехвата исключений в обработчиках CRUD и возврата клиенту ответа, который может быть [распознан](guides/server-side.md#error-handling) клиентской диаграммой Gantt.

Чтобы обеспечить обработку ошибок для Gantt, выполните следующие действия:

Перейдите в *App_Start* и добавьте новый класс под названием *GanttAPIExceptionFilterAttribute*:


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

Затем добавим этот класс к нашим контроллерам WebAPI:

- Контроллер Data:

~~~js title="Controllers/DataController.cs"
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class DataController : ApiController
~~~

- Контроллер Link:

~~~js title="Controllers/LinkController.cs"
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class LinkController : ApiController
~~~

- и Контроллер Task:

~~~js title="Controllers/TaskController.cs"
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class TaskController : ApiController
~~~

Теперь, если любой контроллер Web API вызовет исключение во время обработки запроса, 
клиентская сторона получит статус ошибки и сообщение об ошибке, которое можно либо обработать, либо показать пользователю.

Обратите внимание, что возвращать сообщение об исключении клиенту может быть небезопасно в продакшн-окружении.

## Сохранение порядка задач {#storingtheorderoftasks}

Клиентская Gantt позволяет [переупорядочивать задачи](guides/reordering-tasks.md) методом перетаскивания. Поэтому если вы используете эту функцию, вам нужно будет сохранить этот порядок в базе данных.
Здесь можно [ознакомиться с общим описанием](guides/server-side.md#storingtheorderoftasks).

Давайте добавим эту возможность в наше приложение.

### Включение переупорядочивания задач на клиенте

Сначала нужно позволить пользователям изменять порядок задач в интерфейсе.
Откройте представление *Index* и обновите конфигурацию Gantt:


~~~js title="Views/Home/Index.cshtml"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

// specifying the date format
gantt.config.date_format = "%Y-%m-%d %H:%i";
// initializing gantt
gantt.init("gantt_here");
~~~

### Добавление порядка задач в модель

Теперь давайте отразим эти изменения на стороне бэкенда.

Мы будем сохранять порядок в свойстве SortOrder, поэтому обновим класс *Task* соответствующим образом:


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

Теперь нужно обновить TaskController, а именно:

- клиентская сторона должна получать задачи, упорядоченные по значению SortOrder:


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

- новые задачи должны получать значение SortOrder по умолчанию: 
 

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

- SortOrder должен обновляться, когда порядок задач изменяется на клиенте. 

Когда пользователь изменяет порядок задач, Gantt вызовет действие PUT, передав информацию о новом положении задачи в свойстве ['target'](guides/server-side.md#storingtheorderoftasks) запроса вместе с остальными свойствами задачи. 

Таким образом, необходимо добавить дополнительное свойство в класс TaskDto:


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
    public string type { get; set; }
    public bool open{ get { return true; } set { } }
    public string target { get; set; }/*!*/
    
    ...
  }
}
~~~

И теперь мы реализуем переупорядочивание в нашем действии PUT (EditTask):


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

## Известные проблемы

HTTP PUT и DELETE запросы возвращают 405 или 401 ошибки, когда приложение работает в IIS.
Проблема может быть связана с модулем WebDAV, который может конфликтовать с RESTful-обработчиками. 

Как общее решение, модуль можно отключить в файле web.config. Более подробная информация приведена [здесь](https://learn.microsoft.com/en-us/answers/tags/828/developer-technologies).

## Безопасность приложения

Gantt не предоставляет средств защиты от различных угроз, таких как SQL-инъекции, XSS и CSRF-атаки. Важно, чтобы ответственность за безопасность приложения лежала на разработчиках, реализующих бэкенд. Подробности см. в [соответствующей статье](guides/app-security.md).

## Устранение неполадок

### Отсутствует шаблон ASP.NET Web Application

Если вы не можете найти необходимый шаблон проекта "ASP.NET Web Application" в Visual Studio 2022, выполните следующие шаги:

1. Закройте Visual Studio 2022

2. Откройте меню Пуск -> Visual Studio Installer

3. Найдите *Visual Studio Community 2022* -> нажмите *Modify*

![vsinstaller](/img/vsinstaller.png)

4. В открывшемся окне выберите *Individual components*, поставьте галочку напротив *".NET Framework Project and item templates"*, затем нажмите *Modify*

![components](/img/components.png)

После этого можно запустить Visual Studio 2022 и найти нужный шаблон.

### Исключение при инициализации базы данных

Иногда может возникнуть проблема с инициализатором DropCreateDatabaseIfModelChanges, который удаляет существующую базу данных, но не создаёт новую. 

![exception_error](/img/exception_error.png)

В таком случае откройте *GanttInitializer.cs* и замените *DropCreateDatabaseIfModelChanges* на *DropCreateDatabaseAlways*:


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

Затем запустите приложение снова.

### Проблемы с рендерингом задач и связей

Если вы выполнили вышеуказанные шаги по интеграции Gantt с ASP.NET MVC, но Gantt не рендерит задачи и связи на странице, ознакомьтесь со статьей [Устранение проблем интеграции на стороне сервера](guides/troubleshooting.md). Она описывает способы выявления корневых причин проблем.

## Что дальше

Теперь у вас полнофункциональный Gantt. Вы можете просмотреть полный код на [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet), клонировать или скачать его и использовать в своих проектах.

Также вы можете ознакомиться с [руководствами по многочисленным функциям Gantt](guides.md) или с руководствами по [интеграции Gantt с другими бэкенд-фреймворками](integrations/howtostart-guides.md).