---
title: "dhtmlxGantt с ASP.NET MVC"
sidebar_label: "ASP.NET MVC"
---

# dhtmlxGantt с ASP.NET MVC 

В этом руководстве представлен пошаговый пример создания диаграммы Gantt с использованием [ASP.NET](https://dotnet.microsoft.com/apps/aspnet) и REST API на стороне сервера.

Другие варианты интеграции с серверной частью описаны в следующих руководствах:

- [dhtmlxGantt с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt с Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt с PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt с PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt с Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt с Ruby on Rails](integrations/other/howtostart-ruby.md)

В данном примере используется фреймворк ASP.NET MVC 5 совместно с контроллерами Web API 2 для построения REST API для приложения Gantt. Для работы с базой данных применяется [Entity Framework](https://learn.microsoft.com/en-us/aspnet/entity-framework). В качестве среды разработки используется Visual Studio IDE.

:::note
Полный исходный код [доступен на GitHub](https://github.com/DHTMLX/gantt-howto-dotnet).
:::

## Шаг 1. Создание проекта

### Создание нового проекта в Visual Studio

Запустите Visual Studio 2022 и выберите *Create a new project*.

![how_to_start_net_create_project](/img/how_to_start_net_create_project.png)

Далее выберите "ASP.NET Web Application" и задайте имя *DHX.Gantt.Web*. Если шаблон не отображается, обратитесь к разделу [Troubleshooting](#troubleshooting).

![how_to_start_net_project_template](/img/how_to_start_net_project_template.png)

![how_to_start_net_configure_project](/img/how_to_start_net_configure_project.png)

Выберите шаблон *Empty* и убедитесь, что отмечены опции MVC и Web API.

![how_to_start_net_app](/img/how_to_start_net_app.png)

## Шаг 2. Добавление Gantt на страницу

### Создание контроллера

После создания проекта следующим шагом будет добавление MVC-контроллера, который будет отображать страницу с диаграммой Gantt.

Кликните правой кнопкой мыши по папке Controllers, выберите Add->Controller, затем MVC 5 Controller -> Empty. Назовите новый контроллер "HomeController".

![how_to_start_net_controller](/img/how_to_start_net_controller.png)

В HomeController по умолчанию уже есть метод *Index()* класса *ActionResult*, поэтому дополнительная логика не требуется. Для этого метода будет добавлено представление.

**Controllers/HomeController.cs**
~~~js
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

Теперь создайте страницу index. Перейдите в Views/Home и добавьте пустое представление с именем Index:

![how_to_start_net_view](/img/how_to_start_net_view.png)

Откройте представление и вставьте следующий код:
**Views/Home/Index.cshtml**
~~~html
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

Что делает этот код:

- задаёт простой макет страницы для приложения Gantt
- подключает JavaScript и CSS dhtmlxGantt через [CDN-ссылки](guides/cdn-links-list.md)
- инициализирует диаграмму Gantt на странице

Обратите внимание на настройку формата даты:

**Views/Home/Index.cshtml**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i";
~~~

Это обеспечивает корректный разбор дат, получаемых с сервера, на клиенте.

Также Gantt настраивается для работы с RESTful API на сервере, используя ["/api/"](guides/server-side.md#technique) в качестве базового маршрута:

**Views/Home/Index.cshtml**
~~~js
gantt.load("/api/data");
// initializing dataProcessor
var dp = new gantt.dataProcessor("/api/");
// and attaching it to gantt
dp.init(gantt);
// setting the REST mode for dataProcessor
dp.setTransactionMode("REST");
~~~

Реализация серверной части будет рассмотрена далее. Пока что вы можете запустить приложение и увидеть появление диаграммы Gantt на странице.

![adding_gantt](/img/adding_gantt.png)


## Шаг 3. Создание моделей и базы данных

### Создание моделей

Далее определите классы моделей для диаграммы Gantt. Модель данных состоит из [Задач и Связей](guides/loading.md#standarddatabasestructure).

dhtmlxGantt использует соглашения об именовании, отличающиеся от стандартных для C#. Некоторые свойства, используемые на клиенте, не обязательно должны храниться в базе данных, но могут использоваться на клиенте или в логике бэкенда.

Для этого будет применён паттерн [Data Transfer Object](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5): классы доменной модели используются с EF и внутри приложения, а DTO-классы - для обмена данными с Web API. Будет реализовано сопоставление между этими моделями.

Начнём!

#### Модель Task

Сначала создайте класс для Task. Он может выглядеть так:

**Models/Task.cs**
~~~js
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

Полный список доступных свойств объекта Task, обязательных и необязательных, приведён в 
[соответствующей документации](guides/loading.md#task_properties).

#### Модель Link

Теперь создайте класс Link следующим образом:

**Models/Link.cs**
~~~js
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

Как уже упоминалось, для работы с базой данных будет использоваться [Entity Framework](https://learn.microsoft.com/en-us/aspnet/entity-framework).

Для установки выполните следующую команду в Package Manager Console:

~~~js
Install-Package EntityFramework
~~~

#### Создание контекста базы данных

Далее создайте контекст базы данных. Контекст представляет сессию с базой данных и управляет получением и сохранением данных.

Кликните правой кнопкой по папке *Models* и выберите Add->Class. Назовите класс "GanttContext" и используйте следующий код:

**Models/GanttContext.cs**
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

#### Добавление начальных записей в базу данных

Теперь можно добавить начальные записи в базу данных.

Entity Framework может создавать базу данных автоматически при запуске приложения. Чтобы база обновлялась при изменении модели, настройте её сброс и пересоздание при необходимости.

Начните с создания инициализатора базы данных. Добавьте новый класс в папку *App_Start*, унаследованный от *DropCreateDatabaseIfModelChanges*. Назовите его "GanttInitializer".

В этом классе переопределите метод *Seed()* для добавления тестовых данных. Используйте метод *Add()* для добавления сущностей в контекст.

Вот полный класс *GanttInitializer*:

**App_Start/GanttInitializer.cs**
~~~js
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

Откройте файл *Global.asax*, который содержит код, выполняемый при запуске приложения. Добавьте необходимое пространство имён и вставьте эту строку в метод *Application_Start()*, чтобы установить инициализатор для контекста:

**Global.asax.cs**
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

            Database.SetInitializer(new GanttInitializer());/*!*/
        }
    }
}
~~~

### Определение DTO и маппинг

Далее будут объявлены классы DTO, предназначенные для Web API. Для упрощения будут определены явные операторы преобразования для маппинга между классами Model и DTO.

Класс TaskDto имеет следующую структуру:

**Models/TaskDto.cs**
~~~js
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

Аналогично определяется класс LinkDto:

**Models/LinkDto.cs**
~~~js
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

Для завершения модели данных для [источника данных](guides/supported-data-formats.md#json) добавляется следующий класс:

**Models/GanttDto.cs**
~~~js
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

### Общий подход к загрузке данных через REST API

Следующим этапом идет реализация API.

На основе [описания API](guides/server-side.md#requestresponsedetails) необходимы два контроллера: один для задач, другой - для связей. Кроме того, отдельный контроллер будет обрабатывать действие "загрузки данных", так как Gantt в этом случае ожидает [смешанный результат](guides/supported-data-formats.md#json).

### Контроллер задач

Чтобы добавить новый контроллер:

- Кликните правой кнопкой мыши по папке Controllers и выберите Add -> Controller.
- Выберите Web API 2 Controller -> Empty и назовите новый контроллер "TaskController".

Базовые CRUD-действия для задач реализованы следующим образом:

**Controllers/TaskController.cs**
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

Логика работы здесь очевидна:

- Методы GET получают задачи из базы данных и преобразуют их в представление DTO.
- Методы PUT и POST принимают DTO, преобразуют их обратно в модели Task и применяют изменения к контексту базы данных.

Аналогичный подход используется для связей.

### Контроллер связей

Для связей создается пустой Web API Controller следующим образом:

**Controllers/LinkController.cs**
~~~js
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

### Контроллер данных

Наконец, добавляется контроллер для действия загрузки данных:

**Controllers/DataController.cs**
~~~js
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

После выполнения всех шагов, при запуске приложения на странице будет отображаться полностью рабочий Gantt:

![ready_gantt_dotnet](/img/ready_gantt_dotnet.png)

[Готовый демо-пример доступен на GitHub](https://github.com/DHTMLX/gantt-howto-dotnet).

## Обработка ошибок 

[Exception filters](https://learn.microsoft.com/en-us/previous-versions/aspnet/gg416513(v="vs.98))" позволяют перехватывать исключения в CRUD-обработчиках и отправлять ответы, которые клиентский Gantt может [интерпретировать](guides/server-side.md#errorhandling).

Чтобы включить обработку ошибок в API Gantt, выполните следующие действия:

Добавьте новый класс с именем *GanttAPIExceptionFilterAttribute* в папку *App_Start*:

**App_Start/GanttAPIExceptionFilterAttribute.cs**
~~~js
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

Далее примените этот фильтр к WebAPI-контроллерам:

- В контроллере Data:
**Controllers/DataController.cs**
~~~js
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class DataController : ApiController
~~~

- В контроллере Link:
**Controllers/LinkController.cs**
~~~js
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class LinkController : ApiController
~~~

- И в контроллере Task:
**Controllers/TaskController.cs**
~~~js
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class TaskController : ApiController
~~~

С такой настройкой любые исключения, возникшие в процессе обработки Web API, приведут к тому, что клиент получит статус ошибки и сообщение, которые могут быть обработаны или отображены по необходимости.

Имейте в виду, что передача текстов исключений напрямую клиенту может быть небезопасна для production-среды.

## Сохранение порядка задач {#storingtheorderoftasks}

Клиентский Gantt поддерживает [смену порядка задач](guides/reordering-tasks.md) с помощью drag and drop. При использовании этой функции становится необходимым сохранять порядок задач в базе данных. Подробнее об этом можно узнать в [общем описании здесь](guides/server-side.md#storingtheorderoftasks).

Следующим шагом будет интеграция этой функциональности в приложение.

### Включение изменения порядка задач на клиенте

Для начала пользователи должны иметь возможность изменять порядок задач непосредственно в интерфейсе.

Откройте представление *Index* и настройте конфигурацию Gantt следующим образом:

**Views/Home/Index.cshtml**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

// указание формата даты
gantt.config.date_format = "%Y-%m-%d %H:%i";
// инициализация gantt
gantt.init("gantt_here");
~~~

### Добавление порядка задач в модель

Далее обновим серверную часть для поддержки этих изменений.

Порядок задач будет храниться в свойстве SortOrder, поэтому класс *Task* необходимо соответствующим образом обновить:

**Models/Task.cs**
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
        public int SortOrder { get; set; }/*!*/
    }
}
~~~

Также потребуется обновить *TaskController*:

- Задачи, отправляемые клиенту, должны быть отсортированы по значению SortOrder:

**Controllers/TaskController.cs**
~~~js
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

- При создании новых задач необходимо задавать значение SortOrder по умолчанию:

**Controllers/TaskController.cs**
~~~js
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

- SortOrder должен обновляться при изменении порядка задач на клиенте.

Когда задачи переставляются, Gantt отправляет PUT-запрос, который содержит новое положение в свойстве ['target'](guides/server-side.md#storingtheorderoftasks) вместе с другими данными задачи.

Для обработки этого добавьте новое свойство в класс DTO задачи:

**Models/TaskDto.cs**
~~~js
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

Теперь реализуйте логику изменения порядка в методе PUT (EditTask):

**Controllers/TaskController.cs**
~~~js
    // PUT api/Task/5
    [System.Web.Http.HttpPut]
    public IHttpActionResult EditTask(int id, TaskDto taskDto)
    {
      var updatedTask = (Task)taskDto;
      updatedTask.Id = id;

      if (!string.IsNullOrEmpty(taskDto.target))
      {
        // был изменён порядок
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

      // id соседней задачи передаётся либо как '{id}', либо как 'next:{id}' в зависимости 
      // от того, является ли она следующей или предыдущей
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

При запуске приложения на IIS HTTP PUT и DELETE-запросы могут возвращать ошибки 405 или 401. Это может произойти из-за конфликта модуля **WebDAV** с RESTful-обработчиками.

Обычно проблему можно решить, отключив модуль WebDAV в файле **web.config**. Подробнее см. [здесь](https://forums.iis.net/t/1166025.aspx).

## Безопасность приложения

Gantt сам по себе не обеспечивает защиту от угроз, таких как SQL-инъекции, XSS или CSRF-атаки. Обеспечение безопасности приложения лежит на разработчике при реализации серверной части. Подробнее см. [в соответствующей статье](guides/app-security.md).

## Устранение неполадок

### Шаблон ASP.NET Web Application отсутствует

Если в Visual Studio 2022 отсутствует шаблон проекта "ASP.NET Web Application", выполните следующие действия:

1. Закройте Visual Studio 2022

2. Откройте меню "Пуск" и запустите Visual Studio Installer

3. Найдите *Visual Studio Community 2022* и нажмите *Modify*

![vsinstaller](/img/vsinstaller.png)

4. В появившемся окне перейдите на вкладку *Individual components*, отметьте *".NET Framework Project and item templates"* и нажмите *Modify*

![components](/img/components.png)

После этого снова откройте Visual Studio 2022 - шаблон должен появиться.

### Произошло исключение при инициализации базы данных

Иногда инициализатор DropCreateDatabaseIfModelChanges может удалить существующую базу данных, но не создать новую.

![exception_error](/img/exception_error.png)

Если это произошло, откройте *GanttInitializer.cs* и замените *DropCreateDatabaseIfModelChanges* на *DropCreateDatabaseAlways*:

**App_Start/GanttInitializer.cs**
~~~js
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

После этого снова запустите приложение.

### Проблемы с отображением задач и связей

Если задачи и связи не отображаются после интеграции Gantt с ASP.NET MVC, ознакомьтесь со статьёй [Устранение проблем интеграции с backend](guides/troubleshooting.md). В ней приведены рекомендации по выявлению возможных причин.

## Что дальше

На этом этапе Gantt полностью работоспособен. Полный исходный код доступен на [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet), откуда его можно клонировать или скачать для использования в своих проектах.

Дополнительно ознакомьтесь с [руководствами по различным возможностям Gantt](guides.md) или с уроками по [интеграции Gantt с другими backend-фреймворками](integrations/howtostart-guides.md).
