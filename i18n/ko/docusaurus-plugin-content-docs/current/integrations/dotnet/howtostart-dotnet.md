---
title: "dhtmlxGantt와 ASP.NET MVC"
sidebar_label: "ASP.NET MVC"
---

dhtmlxGantt와 ASP.NET MVC  
===============================

이 튜토리얼은 [ASP.NET](https://dotnet.microsoft.com/apps/aspnet)과 서버 측 REST API를 사용하여 Gantt 차트를 만드는 방법을 단계별로 안내합니다.

다른 서버 측 연동 옵션에 대해서는 아래 튜토리얼을 참고하세요:

- [dhtmlxGantt와 ASP.NET Core 사용하기](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxGantt와 Node.js 연동하기](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt와 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt와 PHP: Laravel 연동](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt와 PHP:Slim 연동하기](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt와 Salesforce LWC 연동하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)

이 예제에서는 ASP.NET MVC 5 프레임워크와 Web API 2 컨트롤러를 사용하여 Gantt 애플리케이션을 위한 REST API를 구축합니다. 데이터베이스 연동은 [Entity Framework](https://learn.microsoft.com/en-us/aspnet/entity-framework)가 담당하며, 개발은 Visual Studio IDE에서 진행합니다.

:::note
전체 소스 코드는 [GitHub에서 확인할 수 있습니다](https://github.com/DHTMLX/gantt-howto-dotnet).
:::

1단계. 프로젝트 생성
-----------------------------

### 새로운 Visual Studio 프로젝트 만들기

Visual Studio 2022를 실행한 후 *Create a new project*를 선택하세요.

![how_to_start_net_create_project](/img/how_to_start_net_create_project.png)

"ASP.NET Web Application"을 선택하고 이름을 *DHX.Gantt.Web*로 지정합니다. 템플릿이 보이지 않는 경우 [Troubleshooting](#troubleshooting) 섹션을 참고하세요.

![how_to_start_net_project_template](/img/how_to_start_net_project_template.png)

![how_to_start_net_configure_project](/img/how_to_start_net_configure_project.png)

*Empty* 프로젝트 템플릿을 선택한 뒤, MVC와 Web API 옵션을 모두 체크하세요.

![how_to_start_net_app](/img/how_to_start_net_app.png)

2단계. 페이지에 Gantt 추가하기
--------------------------------

### 컨트롤러 생성

프로젝트 설정이 끝나면, Gantt 차트 페이지를 표시할 MVC 컨트롤러를 추가해야 합니다.

Controllers 폴더에서 마우스 오른쪽 버튼을 클릭하고 Add->Controller를 선택한 후, MVC 5 Controller -> Empty를 고릅니다. 새 컨트롤러 이름은 "HomeController"로 지정하세요.

![how_to_start_net_controller](/img/how_to_start_net_controller.png)

HomeController에는 기본적으로 *ActionResult* 클래스의 *Index()* 메서드가 포함되어 있으므로, 별도의 로직 추가는 필요하지 않습니다. 이 메서드를 위한 뷰를 추가할 예정입니다.

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

### 뷰(View) 생성

다음으로 index 페이지를 만듭니다. Views/Home 폴더로 이동하여 빈 뷰를 Index라는 이름으로 추가하세요:

![how_to_start_net_view](/img/how_to_start_net_view.png)

뷰를 열고 아래 코드를 삽입합니다:
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

이 코드는 다음과 같은 역할을 합니다:

- Gantt 애플리케이션을 위한 간단한 페이지 레이아웃을 구성합니다.
- [CDN 링크](guides/cdn-links-list.md)를 통해 dhtmlxGantt JavaScript와 CSS를 포함합니다.
- 페이지에 Gantt 차트를 초기화합니다.

날짜 포맷을 지정하는 설정 부분을 참고하세요:

**Views/Home/Index.cshtml**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i";
~~~

이 설정은 서버로부터 받은 날짜를 클라이언트가 올바르게 파싱할 수 있도록 해줍니다.

또한, Gantt가 백엔드의 RESTful API와 연동되도록 설정되어 있습니다. ["/api/"](guides/server-side.md#technique)를 기본 경로로 사용합니다:

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

서버 측 구현은 곧 다루게 됩니다. 이 단계에서는 앱을 실행하면 페이지에 Gantt 차트가 표시되는 것을 확인할 수 있습니다.

![adding_gantt](/img/adding_gantt.png)


3단계. 모델 및 데이터베이스 생성
--------------------------------

### 모델 생성

다음으로 Gantt 차트를 위한 모델 클래스를 정의합니다. 데이터 모델은 [Links와 Tasks](guides/loading.md#standarddatabasestructure)로 구성됩니다.

dhtmlxGantt는 데이터 모델의 네이밍 규칙이 일반적인 C# 규칙과 다릅니다. 일부 클라이언트 측 속성은 데이터베이스에 저장이 필요하지 않지만, 클라이언트나 백엔드 로직에서 사용될 수 있습니다.

이러한 처리를 위해 [Data Transfer Object](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5) 패턴을 적용합니다. 도메인 모델 클래스는 EF 및 내부 처리에 사용하고, DTO 클래스는 Web API와의 통신에 사용합니다. 이 모델 간의 매핑도 구현할 예정입니다.

시작해봅시다!

#### Task 모델

먼저 Task 클래스를 생성합니다. 예시는 다음과 같습니다:

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

Task 객체에서 사용 가능한 전체 속성 목록(필수 및 선택)은 
[관련 문서](guides/loading.md#task_properties)에서 확인할 수 있습니다.

#### Link 모델 

이제 Link 클래스를 다음과 같이 생성합니다:

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

### 데이터베이스 연결 설정


#### Entity Framework 설치

앞서 언급했듯이, 데이터베이스 작업은 [Entity Framework](https://learn.microsoft.com/en-us/aspnet/entity-framework)로 관리합니다.

설치를 위해 Package Manager Console에서 아래 명령어를 실행하세요:

~~~js
Install-Package EntityFramework
~~~

#### 데이터베이스 컨텍스트 생성

다음으로 데이터베이스 컨텍스트를 생성합니다. 컨텍스트는 데이터베이스와의 세션을 나타내며 데이터의 조회 및 저장을 관리합니다.

*Models* 폴더에서 마우스 오른쪽 버튼을 클릭해 Add->Class를 선택하고, 클래스 이름을 "GanttContext"로 지정한 뒤, 아래 내용을 입력하세요:

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

#### 데이터베이스에 초기 레코드 추가

이제 데이터베이스에 초기 데이터를 추가할 수 있습니다.

Entity Framework는 애플리케이션 실행 시 데이터베이스를 자동으로 생성할 수 있습니다. 모델이 변경될 때마다 데이터베이스가 갱신되도록, 데이터베이스를 삭제 후 재생성하도록 설정합니다.

먼저 데이터베이스 이니셜라이저를 생성합니다. *App_Start* 폴더에 *DropCreateDatabaseIfModelChanges*를 상속하는 새 클래스를 추가하고, 이름을 "GanttInitializer"로 지정하세요.

이 클래스에서 *Seed()* 메서드를 오버라이드하여 테스트 데이터를 삽입합니다. *Add()* 메서드를 사용해 엔터티를 컨텍스트에 추가합니다.

전체 *GanttInitializer* 클래스는 다음과 같습니다:

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

*Global.asax* 파일을 열어 애플리케이션 시작 시 실행되는 코드에 접근합니다. 필요한 네임스페이스를 추가하고, *Application_Start()* 메서드 내에 아래 줄을 삽입하여 컨텍스트의 이니셜라이저를 설정하세요:

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

### DTO 정의 및 매핑

다음으로, Web API에서 사용할 DTO 클래스를 선언합니다. 이해를 돕기 위해 Model과 DTO 클래스 간의 매핑을 위한 명시적 변환 연산자를 정의합니다.

TaskDto 클래스는 다음과 같이 구성되어 있습니다:

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

마찬가지로, LinkDto 클래스는 아래와 같이 정의됩니다:

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

[data source](guides/supported-data-formats.md#json)를 위한 데이터 모델을 완성하기 위해 다음 클래스를 추가합니다:

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

Step 4. Web API 구현
------------------------------------------------

### REST API를 이용한 데이터 로딩의 일반적인 방법

이제 API 구현 단계입니다.

[API 세부사항](guides/server-side.md#requestresponsedetails)에 따라, 작업(task)과 링크(link)를 위한 각각의 컨트롤러 두 개가 필요합니다. 또한 gantt가 [혼합 결과](guides/supported-data-formats.md#json)를 기대하므로, '데이터 로드' 액션을 처리할 별도의 컨트롤러도 필요합니다.

### Task Controller

새 컨트롤러를 추가하려면:

- Controllers 폴더에서 마우스 오른쪽 버튼을 클릭하고 Add -> Controller를 선택합니다.
- Web API 2 Controller -> Empty를 선택하고, 새 컨트롤러 이름을 "TaskController"로 지정합니다.

작업 항목에 대한 기본 CRUD 동작은 다음과 같이 구현됩니다:

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

여기서의 로직은 다음과 같습니다:

- GET 메서드는 데이터베이스에서 작업을 조회하고, 이를 DTO로 변환하여 반환합니다.
- PUT 및 POST 메서드는 DTO를 받아 다시 Task 모델로 변환한 후 데이터베이스 컨텍스트에 변경사항을 적용합니다.

링크에 대해서도 동일한 방법을 적용합니다.

### Link Controller

링크를 위한 빈 Web API Controller는 다음과 같이 생성합니다:

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

### Data Controller

마지막으로, 데이터 액션을 위한 컨트롤러를 추가합니다:

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

이제 모든 구성이 완료되었으므로, 애플리케이션을 실행하면 페이지에 완전히 동작하는 Gantt 차트가 표시됩니다:

![ready_gantt_dotnet](/img/ready_gantt_dotnet.png)

[완성된 데모는 GitHub에서 확인할 수 있습니다](https://github.com/DHTMLX/gantt-howto-dotnet).

오류 처리
-----------

[Exception filters](https://learn.microsoft.com/en-us/previous-versions/aspnet/gg416513(v="vs.98))를" 사용하면 CRUD 핸들러 내에서 발생하는 예외를 포착하여, 클라이언트 측 gantt가 [해석할 수 있는](guides/server-side.md#errorhandling) 응답을 전송할 수 있습니다.

gantt API에서 오류 처리를 활성화하려면 다음과 같이 진행합니다:

*App_Start* 폴더에 *GanttAPIExceptionFilterAttribute*라는 새 클래스를 추가합니다:

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

그런 다음, 이 필터를 WebAPI 컨트롤러에 적용합니다:

- Data controller에 적용:
**Controllers/DataController.cs**
~~~js
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class DataController : ApiController
~~~

- Link controller에 적용:
**Controllers/LinkController.cs**
~~~js
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class LinkController : ApiController
~~~

- Task controller에도 적용:
**Controllers/TaskController.cs**
~~~js
namespace DHX.Gantt.Web.Controllers
{
    [GanttAPIExceptionFilter]/*!*/
    public class TaskController : ApiController
~~~

이 설정을 통해 Web API 처리 중 발생하는 모든 예외는 클라이언트가 처리하거나 표시할 수 있도록 오류 상태와 메시지가 전송됩니다.

단, 예외 메시지를 클라이언트에 직접 노출하는 것은 운영 환경에는 적합하지 않을 수 있으니 주의해야 합니다.

## 작업 순서 저장하기 {#storingtheorderoftasks}

클라이언트 측 gantt는 [작업 순서 변경](guides/reordering-tasks.md)을 드래그 앤 드롭으로 지원합니다. 이 기능을 사용할 경우, 데이터베이스에 작업 순서를 저장해야 합니다. 자세한 내용은 [일반 설명서](guides/server-side.md#storingtheorderoftasks)에서 확인할 수 있습니다.

다음 단계에서는 이 기능을 애플리케이션에 통합하게 됩니다.

### 클라이언트에서 작업 순서 변경 활성화

먼저, 사용자가 UI에서 직접 작업의 순서를 변경할 수 있어야 합니다.

*Index* 뷰를 열고 gantt 설정을 다음과 같이 수정하세요:

**Views/Home/Index.cshtml**
~~~js
gantt.config.order_branch = true;/*!*/
gantt.config.order_branch_free = true;/*!*/

// 날짜 형식 지정
gantt.config.date_format = "%Y-%m-%d %H:%i";
// gantt 초기화
gantt.init("gantt_here");
~~~

### 모델에 작업 순서 추가

다음으로, 이러한 변경 사항을 지원하도록 백엔드를 업데이트해야 합니다.

작업의 순서는 SortOrder라는 속성에 저장됩니다. 따라서 *Task* 클래스도 이에 맞게 수정해야 합니다:

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

*TaskController*도 다음과 같이 업데이트가 필요합니다:

- 클라이언트로 전송되는 작업들은 SortOrder 값에 따라 정렬되어야 합니다:

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

- 새 작업을 생성할 때, 기본 SortOrder 값을 할당해야 합니다:

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

- 클라이언트에서 작업 순서가 변경될 때마다 SortOrder도 업데이트되어야 합니다.

작업이 재정렬되면, gantt는 ['target'](guides/server-side.md#storingtheorderoftasks) 속성에 새로운 위치와 기타 작업 정보를 포함하여 PUT 요청을 트리거합니다.

이를 처리하려면, task DTO 클래스에 새로운 속성을 추가하세요:

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

이제 PUT(EditTask) 액션 내에 재정렬 로직을 구현하세요:

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
        // 순서 변경 발생
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

      // 인접 작업 id는 '{id}' 또는 'next:{id}' 형식으로 전송됨
      // 다음 또는 이전 형제 작업에 따라 다름
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

알려진 이슈
-----------

IIS에서 앱을 실행할 때, HTTP PUT 및 DELETE 요청이 405 또는 401 오류를 반환할 수 있습니다. 이는 **WebDAV** 모듈이 RESTful 핸들러와 충돌하기 때문일 수 있습니다.

일반적인 해결 방법은 **web.config** 파일에서 WebDAV 모듈을 비활성화하는 것입니다. 자세한 내용은 [여기](https://forums.iis.net/t/1166025.aspx)를 참고하세요.

애플리케이션 보안
-------------------------

Gantt 자체는 SQL 인젝션, XSS, CSRF 공격과 같은 위협에 대한 보호를 처리하지 않습니다. 백엔드 구현 시 애플리케이션 보안을 보장하는 것은 개발자의 책임입니다. 자세한 내용은 [관련 문서](guides/app-security.md)에서 확인할 수 있습니다.

문제 해결
-----------------

### ASP.NET Web Application 템플릿이 없음

Visual Studio 2022에서 "ASP.NET Web Application" 프로젝트 템플릿이 보이지 않는 경우, 다음을 시도해보세요:

1. Visual Studio 2022를 종료하세요.

2. 시작 메뉴에서 Visual Studio Installer를 실행하세요.

3. *Visual Studio Community 2022*를 찾아 *수정*을 클릭하세요.

![vsinstaller](/img/vsinstaller.png)

4. 대화상자에서 *개별 구성 요소*로 이동한 후, *".NET Framework Project and item templates"* 항목을 체크하고 *수정*을 클릭하세요.

![components](/img/components.png)

이후, Visual Studio 2022를 다시 열면 템플릿이 나타날 것입니다.

### 데이터베이스 초기화 중 예외 발생

가끔 DropCreateDatabaseIfModelChanges 이니셜라이저가 기존 데이터베이스를 삭제한 후 새 데이터베이스를 생성하지 못할 수 있습니다.

![exception_error](/img/exception_error.png)

이런 경우, *GanttInitializer.cs*를 열어 *DropCreateDatabaseIfModelChanges*를 *DropCreateDatabaseAlways*로 교체하세요:

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

그런 다음, 애플리케이션을 다시 실행하세요.

### 작업 및 링크 렌더링 문제

ASP.NET MVC와 Gantt를 통합한 후 작업과 링크가 렌더링되지 않는 경우, [백엔드 통합 문제 해결](guides/troubleshooting.md) 문서를 참고하세요. 잠재적 원인 파악에 도움이 됩니다.

다음 단계
------------

이제 gantt가 완전히 동작합니다. 전체 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet)에서 확인하거나 프로젝트에 복제/다운로드할 수 있습니다.

또한, [다양한 gantt 기능 가이드](guides.md)와 [다른 백엔드 프레임워크와의 Gantt 통합 튜토리얼](integrations/howtostart-guides.md)도 참고해보세요.
