---
title: "ASP.NET MVC와 dhtmlxGantt"
sidebar_label: "ASP.NET MVC"
---

# ASP.NET MVC와 dhtmlxGantt

이 튜토리얼은 서버 측에서 [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet)과 REST API를 사용하여 Gantt를 단계별로 만드는 방법을 안내합니다.

다음 튜토리얼 중 하나를 선택하면 Gantt의 서버 측 통합 가능성을 다른 관점에서 탐색할 수 있습니다.

- [ASP.NET Core와의 dhtmlxGantt](integrations/dotnet/howtostart-dotnet-core.md)
- [Node.js와의 dhtmlxGantt](integrations/node/howtostart-nodejs.md)
- [Python과의 dhtmlxGantt](integrations/other/howtostart-python.md)
- [PHP: Laravel와의 dhtmlxGantt](integrations/php/howtostart-php-laravel.md)
- [PHP:Slim과의 dhtmlxGantt](integrations/php/howtostart-php-slim4.md)
- [Salesforce LWC와의 dhtmlxGantt](integrations/salesforce/howtostart-salesforce.md)
- [Ruby on Rails와의 dhtmlxGantt](integrations/other/howtostart-ruby.md)

우리는 ASP.NET MVC 5 웹 플랫폼과 REST API용 Web API 2 컨트롤러를 활용하여 Gantt 애플리케이션을 만들 예정입니다.
데이터베이스와의 의사소통을 조직하기 위해 [Entity Framework](https://learn.microsoft.com/en-us/aspnet/entity-framework)을 사용할 것입니다.
그리고 Visual Studio IDE의 도움으로 애플리케이션을 구축할 것입니다.

:::note
전체 소스 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet)에서 확인할 수 있습니다.
:::

## 1단계. 프로젝트 생성

### 새로운 Visual Studio 프로젝트 만들기

Visual Studio 2022를 시작하고 *Create a new project*(새 프로젝트 만들기)를 선택합니다.

![how_to_start_net_create_project](/img/how_to_start_net_create_project.png)

다음으로 "ASP.NET Web Application"을 선택하고 이름을 *DHX.Gantt.Web*으로 지정합니다. 필요한 템플릿을 찾을 수 없다면 Troubleshooting 섹션을 확인하십시오.

![how_to_start_net_project_template](/img/how_to_start_net_project_template.png)

![how_to_start_net_configure_project](/img/how_to_start_net_configure_project.png)

목록의 템플릿 가운데에서 *Empty*를 선택하고, 템플릿 옆의 MVC 및 Web API 체크박스를 선택합니다.

![how_to_start_net_app](/img/how_to_start_net_app.png)

## 2단계. 페이지에 Gantt 추가하기

### 컨트롤러 생성

이제 빈 프로젝트가 준비되었으며, Gantt를 구현할 준비가 되었습니다.

먼저, Gantt 차트를 보여줄 페이지를 갖는 MVC 컨트롤러를 추가합니다.

컨트롤러 폴더에서 컨텍스트 메뉴를 열고 Add->Controller를 선택합니다. 열린 창에서 MVC 5 Controller -> Empty를 선택하고 새로 추가된 컨트롤러의 이름을 "HomeController"로 지정합니다.

![how_to_start_net_controller](/img/how_to_start_net_controller.png)

HomeController는 기본적으로 *Index()* 메서드를 가진다으며, 추가 로직이 필요하지 않습니다. 우리는 단지 이를 위한 뷰를 추가하기만 하면 됩니다.

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

### 뷰 생성

이제 인덱스 페이지를 생성할 차례입니다. Views/Home으로 이동하여 Index라는 빈 뷰를 추가합니다.

![how_to_start_net_view](/img/how_to_start_net_view.png)

방금 생성된 뷰를 열고 아래 코드를 입력합니다:

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
            // 날짜 형식 지정
            gantt.config.date_format = "%Y-%m-%d %H:%i";
            // 간트 시작
            gantt.init("gantt_here");
    
            // 데이터 로딩 시작
            gantt.load("/api/data");
            // dataProcessor 초기화
            var dp = new gantt.dataProcessor("/api/");
            // 그리고 gantt에 연결
            dp.init(gantt);
            // dataProcessor의 REST 모드 설정
            dp.setTransactionMode("REST");
        });
    </script>
</head>
<body>
    <div id="gantt_here" style="width: 100%; height: 100vh;"></div>
</body>
</html>
~~~

여기서 한 일:

- 간트 애플리케이션의 간단한 페이지 마크업 정의
- [CDN 링크](guides/cdn-links-list.md)를 사용하여 dhtmlx gantt js/css 소스 추가
- 페이지에서 gantt를 생성

데이터 소스에서 오는 날짜 형식을 지정한 구성을 주의 깊게 확인하십시오.

~~~js title="Views/Home/Index.cshtml"
gantt.config.date_format = "%Y-%m-%d %H:%i";
~~~

이는 서버에서 오는 날짜를 클라이언트가 파싱할 수 있도록 필요한 설정입니다.

그리고 또한 백엔드에서 RESTful API와 동작하도록 gantt에 RESTful API를 사용한다고 명시했습니다. 기본 경로로 ["/api/"](guides/server-side.md#technique)을 사용합니다:

~~~js title="Views/Home/Index.cshtml"
gantt.load("/api/data");
// initializing dataProcessor
var dp = new gantt.dataProcessor("/api/");
// and attaching it to gantt
dp.init(gantt);
// setting the REST mode for dataProcessor
dp.setTransactionMode("REST");
~~~


서버 측은 나중에 구현하겠습니다. 지금은 애플리케이션을 실행해 페이지에 간트가 렌더링되는지 확인하면 됩니다.

![adding_gantt](/img/adding_gantt.png)

## 3단계. 모델 및 데이터베이스 생성

### 모델 생성

이제 간트 차트를 위한 모델 클래스를 정의해야 합니다. 간트 데이터 모델은 [링크와 작업](guides/loading.md#databasestructure)으로 구성됩니다.
볼 수 있듯이, dhtmlxGantt는 C#에서 전통적으로 사용하는 것과 다른 데이터 모델의 명명 규칙을 사용합니다.
클라이언트 측 모델에는 데이터베이스에 저장할 필요가 없는 속성도 포함될 수 있지만, 이는 클라이언트에서 또는 백엔드 로직에서 사용될 수 있습니다.

이 때문에 여기에선 [데이터 전송 객체](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5) 패턴을 사용합니다.
도메인 모델 클래스(EF와 함께 애플리케이션에서 사용할)와 Web API와 통신하는 데 사용할 DTO 클래스를 정의한 뒤, 두 모델 간 매핑을 구현합니다.

이제 시작합니다!

#### Task 모델

먼저 Task 클래스를 생성합니다. 내용은 아래와 유사합니다:

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

Task 객체에 대해 사용할 수 있는 속성의 전체 목록은 문서의 해당 기사([task_properties](guides/loading.md#task_properties))에서 확인할 수 있습니다.

#### Link 모델

다음으로 Link 클래스는 아래와 같이 보일 수 있습니다:

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

### 데이터베이스 연결 구성

#### Entity Framework 설치

데이터베이스와의 작업을 구성하기 위해 [Entity Framework](https://learn.microsoft.com/en-us/aspnet/entity-framework)를 사용할 예정입니다.

먼저 EF를 설치해야 합니다. 이를 위해 Package Manager Console에서 다음 명령을 실행합니다:

~~~js
Install-Package EntityFramework
~~~

#### 데이터베이스 컨텍스트 생성

다음 단계는 Context를 만드는 일입니다. 컨텍스트는 데이터베이스와의 세션을 나타냅니다. 데이터를 가져오고 저장할 수 있게 해줍니다.

*Models* 폴더에 컨텍스트를 만들기 위한 컨텍스트 메뉴를 열고 Add->Class를 선택합니다. 새 클래스의 이름은 "GanttContext"이며 아래와 같은 내용이 포함됩니다:

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

#### 데이터베이스에 초기 데이터 추가

이제 데이터베이스에 몇 가지 데이터를 추가할 수 있습니다.

Entity Framework는 애플리케이션이 실행될 때 데이터베이스를 자동으로 생성할 수 있습니다. 모델이 변경될 때마다 데이터베이스를 삭제하고 재생성하도록 설정해야 합니다.

먼저 데이터베이스 이니셜라이저를 생성해야 합니다. 이를 위해 *App_Start* 폴더에 *DropCreateDatabaseIfModelChanges*를 상속받는 새 클래스를 추가합니다. 이름은 "GanttInitializer"로 하겠습니다.

이 클래스에서 Seed() 메서드를 재정의하여 테스트 데이터를 채웁니다. 그런 다음 컨텍스트에 엔티티 컬렉션을 Add() 메서드로 추가합니다.

아래에 있는 것은 *GanttInitializer* 클래스의 전체 코드입니다:

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

Global.asax 파일을 엽니다. 애플리케이션 시작 시 실행되는 코드가 들어 있습니다. 컨텍스트에 Initializer를 설정하는 코드 한 줄과 필요한 네임스페이스를 추가합니다:

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

### DTO와 매핑 정의

이제 Web API에서 사용할 DTO 클래스를 선언할 차례입니다.
Model과 DTO 간의 매핑은 가장 단순한 방식으로 진행하고, 이 클래스들에 대한 명시적 변환 연산자를 정의합니다.

TaskDto 클래스는 아래와 같은 형태가 될 것입니다:

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

다음은 LinkDto 클래스의 코드입니다:

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

마지막으로 [데이터 소스](guides/supported-data-formats.md)에 대한 모델도 추가합니다:

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

## 4단계. Web API 구현

### REST API를 이용한 데이터 로딩의 일반 기술

마침내 API를 구현할 차례입니다.

API 상세 정보([requestresponsedetails](guides/server-side.md#requestresponsedetails))에서 보듯 두 개의 컨트롤러가 필요합니다: 하나는 작업(Task)용, 다른 하나는 링크(Link)용 입니다. 또한 간트가 거기에 혼합된 결과를 기대하기 때문에 데이터 로드 작업용 컨트롤러가 한 개 더 필요합니다.

### Task 컨트롤러

새 컨트롤러를 만들려면:

- 컨트롤러 폴더의 컨텍스트 메뉴를 활성화하고 Add -> Controller를 선택합니다.
- Web API 2 Controller -> Empty를 선택합니다. 새 컨트롤러의 이름은 "TaskController"가 됩니다.

이제 작업 항목에 대한 기본 CRUD 동작을 구현해야 합니다:

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

여기서는 모든 것이 아주 단순합니다:

- GET 작업에서 데이터베이스에서 로드한 작업을 데이터 전송 객체로 출력
- PUT/POST 동작에서 DTO를 입력으로 받아 Task 모델로 변환한 뒤 DB 컨텍스트에 변경 사항을 저장

이제 링크에 대해서도 동일하게 구현합니다.

### Link 컨트롤러

링크용 빈 Web API 컨트롤러를 다음과 같이 생성합니다:

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

### 데이터 컨트롤러

마지막으로 데이터 액션용 컨트롤러를 추가합니다:

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

이제 모든 준비가 끝났습니다. 애플리케이션을 실행하면 페이지에 완전한 간트가 나타나야 합니다:

![ready_gantt_dotnet](/img/ready_gantt_dotnet.png)

[미리 준비된 데모를 GitHub에서 확인할 수 있습니다](https://github.com/DHTMLX/gantt-howto-dotnet).

## 오류 처리

[예외 필터](https://learn.microsoft.com/en-us/previous-versions/aspnet/gg416513(v="vs.98))"를 CRUD 핸들러에서 예외를 포착하고 클라이언트 측 간트가 인식할 수 있는 응답으로 반환하는 데 사용할 수 있습니다.

간트를 위한 오류 처리를 제공하려면 아래 단계를 따르십시오:

*App_Start*로 가서 *GanttAPIExceptionFilterAttribute*라는 새 클래스를 추가합니다:

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

그런 다음 이 클래스를 Web API 컨트롤러에 추가합니다:

- 데이터 컨트롤러(DataController.cs):

~~~js title="Controllers/DataController.cs"
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class DataController : ApiController
~~~

- 링크 컨트롤러(LinkController.cs):

~~~js title="Controllers/LinkController.cs"
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class LinkController : ApiController
~~~

- 작업 컨트롤러(TaskController.cs):

~~~js title="Controllers/TaskController.cs"
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class TaskController : ApiController
~~~

이제 Web API 컨트롤러가 요청 처리 중 예외를 발생시키면, 클라이언트 측은 에러 상태와 에러 메시지를 받게 되어 적절히 처리되거나 사용자에게 표시될 수 있습니다.

생산 환경에서는 예외 메시지를 클라이언트에 그대로 반환하는 것이 최선의 방법이 아닐 수도 있다는 점에 주의하십시오.

## 작업 순서 저장 {#storingtheorderoftasks}

클라이언트 측 간트는 드래그 앤 드롭을 사용하여 작업의 재정렬을 허용합니다. 이 기능을 사용한다면 데이터베이스에 이 순서를 저장해야 합니다.
여기서는 일반적인 설명을 [서버 측 저장 방법](guides/server-side.md#storingtheorderoftasks)에서 확인할 수 있습니다.

이 기능을 앱에 추가해 보겠습니다.

### 클라이언트에서 작업 재정렬 활성화

우선 UI에서 사용자가 작업 순서를 변경할 수 있도록 해야 합니다.

[Index] 뷰를 열고 간트 구성(configuration)을 업데이트합니다:

~~~js title="Views/Home/Index.cshtml"
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

// 날짜 형식 지정
gantt.config.date_format = "%Y-%m-%d %H:%i";
// 간트 초기화
gantt.init("gantt_here");
~~~

### 모델에 작업 순서 추가

다음으로 백엔드에서 이 변경을 반영합니다.

SortOrder라는 속성의 값으로 순서를 저장할 예정이므로 Task 클래스도 이에 맞게 업데이트합니다:

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

이제 TaskController를 업데이트해야 합니다. 본문은 아래와 같이 변경됩니다:

- 클라이언트는 SortOrder 값으로 정렬된 작업을 받아야 합니다:

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

- 새로 추가되는 작업의 기본 SortOrder 값은 다음과 같이 설정됩니다:

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

- 클라이언트에서 작업 순서가 변경될 때 SortOrder가 업데이트되어야 합니다.

사용자가 작업 순서를 변경하면, gantt는 새 작업 위치에 대한 정보를 담은 요청의 ['target'](guides/server-side.md#storingtheorderoftasks) 속성과 함께 PUT 동작을 호출합니다. 따라서 Task DTO 클래스에 추가 속성을 정의해야 합니다:

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

이제 PUT(EditTask) 동작에서 재정렬 로직을 구현합니다:

~~~js title="Controllers/TaskController.cs"
    // PUT api/Task/5
    [System.Web.Http.HttpPut]
    public IHttpActionResult EditTask(int id, TaskDto taskDto)
    {
      var updatedTask = (Task)taskDto;
      updatedTask.Id = id;

      if (!string.IsNullOrEmpty(taskDto.target))
      {
        // 재정렬이 발생했습니다
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

      // 인접 작업 ID는 '{id}' 또는 'next:{id}' 형식으로 전송되며
      // 이는 다음 형제인지 이전 형제인지를 나타냅니다
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

## 알려진 문제점

HTTP PUT 및 DELETE 요청이 IIS에서 애플리케이션이 실행 중일 때 405 또는 401 오류를 반환하는 경우가 있습니다.
이 문제는 RESTful 핸들러와 충돌할 수 있는 WebDAV 모듈 때문에 발생할 수 있습니다.

일반적인 해결 방법으로는 web.config 파일에서 모듈을 비활성화하는 것이 있습니다. 자세한 내용은 [여기](https://learn.microsoft.com/en-us/answers/tags/828/developer-technologies)를 참고하십시오.

## 애플리케이션 보안

Gantt는 SQL 인젝션, XSS 및 CSRF 공격과 같은 다양한 위협으로부터 애플리케이션을 방지하는 방법을 제공하지 않습니다. 안전한 애플리케이션 운영 책임은 백엔드를 구현하는 개발자에게 있습니다. 관련 세부 정보는 해당 기사([앱 보안_guides](guides/app-security.md))를 읽어보십시오.

## Trouble shooting

### ASP.NET Web Application 템플릿이 없을 때

Visual Studio 2022에서 필요한 "ASP.NET Web Application" 템플릿을 찾을 수 없다면 아래 단계를 따라 주십시오:

1. Visual Studio 2022를 종료합니다.

2. 시작 메뉴 -> Visual Studio 설치관리자

3. *Visual Studio Community 2022*를 찾아 *Modify*를 클릭합니다.

![vsinstaller](/img/vsinstaller.png)

4. 열린 창에서 *Individual components*를 선택하고, 목록에서 *.NET Framework Project and item templates* 항목을 체크한 후 *Modify*를 클릭합니다.

![components](/img/components.png)

그런 다음 Visual Studio 2022를 다시 시작하고 필요한 템플릿을 찾으실 수 있습니다.

### 데이터베이스 초기화 중 예외 발생

때때로 모델 변경 시 데이터베이스를 드롭하고 새로 생성하는 DropCreateDatabaseIfModelChanges 초기화에서 문제가 발생할 수 있습니다.

![exception_error](/img/exception_error.png)

이 경우 *GanttInitializer.cs*를 열고 *DropCreateDatabaseIfModelChanges*를 *DropCreateDatabaseAlways*로 교체합니다:

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

그런 다음 애플리케이션을 다시 실행합니다.

### 작업 및 링크 렌더링 문제

위의 단계를 따라 ASP.NET MVC와의 Gantt 연동을 구현했으나 페이지에 작업과 링크가 렌더링되지 않는 경우, Troubleshooting Backend Integration Issues 문서를 확인해 보십시오. 문제의 원인을 식별하는 방법을 설명합니다.

## 다음 단계

지금은 완전히 작동하는 간트를 갖게 되었습니다. GitHub에서 전체 코드를 확인하거나 클론/다운로드하여 프로젝트에 활용하십시오.

또한 간트의 다양한 기능에 대한 가이드(guides.md)나 다른 백엔드 프레임워크와의 연동 튜토리얼(integrations/howtostart-guides.md)을 확인해 보실 수 있습니다.