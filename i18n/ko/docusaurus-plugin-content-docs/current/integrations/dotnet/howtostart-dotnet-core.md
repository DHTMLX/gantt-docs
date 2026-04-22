---
title: "ASP.NET Core와 함께하는 dhtmlxGantt"
sidebar_label: "ASP.NET Core"
---

# ASP.NET Core와 함께하는 dhtmlxGantt

이 튜토리얼은 서버 측에서 [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet) Core를 사용해 Gantt를 만드는 단계별 지침을 제공합니다.

다른 서버 측 기술에 대한 튜토리얼도 확인할 수 있습니다:

- [dhtmlxGantt with ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt with Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt with Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt with PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt with PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxGantt with Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt with Ruby on Rails](integrations/other/howtostart-ruby.md)


데이터베이스와의 통신을 조직하기 위해 [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)가 사용됩니다. 이 애플리케이션은 Visual Studio 2022의 도움으로 구축됩니다.

:::note
전체 소스 코드는 [GitHub에서 이용 가능합니다](https://github.com/DHTMLX/gantt-howto-dotnet-core).
:::

## 1단계. 프로젝트 생성

Visual Studio 2022를 실행하고 새 프로젝트를 만듭니다. 다음을 선택합니다: *Create a new project*.

![dhtmlxGantt with ASP.NET Core creating a project](/img/howtostart_dotnetcore_newapp.png)

다음으로 "ASP.NET Core Web App"을 선택하고 이름을 *DHX.Gantt*로 지정합니다.

![dhtmlxGantt with ASP.NET Core creating a project](/img/howtostart_dotnetcore_newproject.png)

![dhtmlxGantt with ASP.NET Core configure a project](/img/howtostart_dotnetcore_configureproject.png)

![dhtmlxGantt with ASP.NET Core configure a project](/img/howtostart_dotnetcore_addinfo.png)

이제 프로젝트를 생성했고 Gantt용 마크업과 스크립트를 추가할 준비가 되었습니다.

## 2단계. Gantt 마크업 및 JS 추가

**wwwroot**로 이동해 **index.html** 파일을 만듭니다.

![dhtmlxGantt with ASP.NET Core 2 creating a project](/img/create_project_step3.png)

![dhtmlxGantt with ASP.NET Core 2 creating a project](/img/create_project_step4.png)

새로 만든 파일에 간단한 Gantt 차트를 위한 페이지를 만듭니다.

참고로 이 데모에서 Gantt 파일은 [CDN](guides/installation.md#cdn)에서 가져옵니다. 컴포넌트의 Professional 버전을 사용하는 경우에는
[프로젝트에 Gantt 파일을 수동으로 추가해야](guides/installation.md#adding-pro-edition-into-project) 합니다. 


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

페이지가 로드되면 [초기화된 gantt 차트](guides/initializing-gantt-chart.md)과 [데이터 로딩](guides/loading.md)이 즉시 호출되고,
[`dataProcessor`](guides/server-side.md#technique)이 설정되므로 사용자가 Gantt 차트를 통해 수행한 모든 변경사항이 백엔드에 저장됩니다. 백엔드가 아직 구현되지 않았으므로, 나중에 더 의미가 있습니다.

다음으로 **Program.cs**로 이동해 애플리케이션이 **index.html** 페이지를 사용하도록 설정합니다. 이를 위해 `wwwroot` 폴더에서 정적 파일을 서비스하도록 애플리케이션을 구성해야 합니다.
이를 위해 `app.UseDefaultFiles()` 메서드를 추가합니다.
자세한 내용은 [여기서 확인](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-9.0).

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

`app.UseDefaultFiles()` 메서드는 기본 파일 제공을 허용합니다. 이는 다음 파일을 `wwwroot` 폴더에서 검색합니다:

- index.html
- index.htm
- default.html
- default.htm

따라서 이들 중 하나를 선택할 수 있습니다. 이번 튜토리얼에서는 "index.html"을 사용합니다.
`UseDefaultFiles()`는 실제로 파일을 제공하는 URL 재작성기일 뿐입니다. 이를 위해서는 `UseStaticFiles()`도 함께 추가해야 합니다.
Gantt가 본문 전체를 차지하도록 하려면, `wwwroot/css` 폴더에 있는 `site.css` 파일에 다음 스타일을 추가합니다:

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

이 작업을 마치면 애플리케이션을 실행했을 때 페이지에 빈 Gantt가 표시되어야 합니다. 상단 오른쪽의 "Invalid data" 레이블은 `gantt.load()`가 호출되기 때문이며, 데이터 제공 백엔드가 아직 없으므로 데이터가 표시되지 않는 상태입니다. 컨트롤러가 구현되면 Gantt는 작업과 연결선을 표시하게 됩니다.

![dhtmlxGantt with ASP.NET Core 2 adding Gantt](/img/adding_gantt_dotnet_core.png)

이제 기본 부분은 완료되었으니 백엔드를 구현해 봅시다. 먼저 모델 클래스를 구현한 다음 WebAPI 컨트롤러로 진행해 보겠습니다.

## 3단계. 모델과 데이터베이스 만들기

데이터 모델부터 시작하겠습니다. Gantt의 데이터 모델은 [링크와 작업](guides/loading.md#databasestructure)을 포함합니다.
dhtmlxGantt는 .NET 세계관에서의 데이터 모델 속성에 대해 비전형적인 이름을 사용하는 편입니다.
때로는 클라이언트 측 모델에 클라이언트 측 또는 백엔드 로직용 속성이 포함되기도 하지만, 이 속성들은 데이터베이스에 저장되면 안 됩니다.

이를 처리하기 위해 [Data Transfer Object (DTO)](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5) 패턴을 사용할 예정입니다. 두 가지 종류의 모델이 정의될 예정입니다:

- EF Core와 애플리케이션 내부에서 사용할 도메인 모델 클래스
- Web API와의 통신에 사용할 DTO 클래스

그다음 두 모델 간의 매핑을 구현해야 합니다.

### 모델

프로젝트 폴더에 **Models**라는 새 폴더를 만듭니다. 여기에 모델 클래스와 EF 컨텍스트가 구현될 예정입니다.

#### Task 모델

먼저 Tasks를 위한 클래스를 생성합니다. Models 폴더에 파일을 만들고 이름을 **Task.cs**로 지정합니다. Models 폴더에 컨텍스트 메뉴를 열고 *Add->Class*를 선택해도 됩니다.

다음은 모델의 모양 예시입니다:

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

Task 객체의 모든 속성 목록은 [Task 속성](guides/loading.md#task_properties)에서 확인할 수 있습니다.

#### Link 모델

Link를 위한 클래스를 하나 더 생성합니다:

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

모델이 준비되었으며 이제 데이터베이스 연결 구성을 시작할 수 있습니다.

### 데이터베이스 연결 구성

데이터베이스 연결 구성을 위해 아래에 나열된 단계가 필요합니다:

#### Entity Framework Core 설치

[Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)를 애플리케이션과 데이터베이스 간의 통신 관리에 사용할 예정입니다. 프레임워크를 설치합시다:

- 프로젝트 트리의 DHTMLX.Gantt 의존성 찾기
- 컨텍스트 메뉴를 열고 *Manage NuGet packages* 선택
- *Browse* 탭을 열고 **Microsoft.EntityFrameworkCore.SqlServer**, **Microsoft.EntityFrameworkCore**, 및 **Microsoft.EntityFrameworkCore.Design** 설치

![dhtmlxGantt with ASP.NET Core EF core installation](/img/howtostart_dotnetcore_entityvianuget.png)

또는 패키지 관리 명령줄을 사용할 수 있습니다:

~~~
PM> Install-Package Microsoft.EntityFrameworkCore.SqlServer
PM> Install-Package Microsoft.EntityFrameworkCore
PM> Install-Package Microsoft.EntityFrameworkCore.Design
~~~

Entity Framework Core는 애플리케이션과 데이터베이스 간의 통신을 관리하는 데 사용됩니다.

#### 엔터티 컨텍스트 생성

다음으로 데이터베이스 세션을 정의하고 데이터 로딩 및 저장을 활성화해야 합니다. 이를 위해 Context를 생성합니다:

- 모델 폴더에 **GanttContext.cs** 파일 추가
- 생성된 파일에 **GanttContext** 클래스를 정의

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

#### 데이터베이스에 초기 레코드 추가

이제 데이터베이스에 레코드를 추가할 수 있습니다. 데이터베이스를 태스크로 채울 데이터베이스 이니셜라이저를 생성해 보겠습니다. 
Models 폴더에 **GanttSeeder** 클래스를 정의합니다. 이 클래스는 데이터베이스에 태스크와 링크를 추가하는 **Seed()** 메서드를 갖습니다.

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

#### 데이터베이스 등록

다음으로 Program.cs에서 데이터베이스를 등록해야 합니다. 우선 데이터베이스 연결 문자열이 필요합니다. 설정은 애플리케이션 설정의 [JSON 파일에 저장](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-9.0)됩니다.
`appsettings.json` 파일을 생성하거나 이미 있다면 열고 데이터베이스 연결 문자열을 추가합니다:

~~~js title="appsettings.json"
{
  "ConnectionStrings": {
    "DefaultConnection": "Server="(localdb)mssqllocaldb;"
        Database=GanttDatabase;Trusted_Connection=True;"
  }
}
~~~

데이터베이스 컨텍스트는 의존성 주입으로 등록됩니다
[의존성 주입](https://learn.microsoft.com/en-us/aspnet/core/data/ef-rp/intro?view=aspnetcore-9.0&viewFallbackFrom=aspnetcore-2.1&tabs=visual-studio)으로 등록됩니다.

다음 네임스페이스를 **Program.cs**에 추가합니다:

~~~js title="Program.cs"
using Microsoft.EntityFrameworkCore;
using DHX.Gantt.Models;
~~~

다음과 같이 선언됩니다:

~~~js title="Program.cs"
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<GanttContext>(
    options => options.UseSqlServer(connectionString));
~~~

컨트롤러를 활성화하려면 `services.AddControllers()` 메서드를 호출합니다:

~~~js title="Program.cs"
builder.Services.AddControllers();
~~~

그리고 컨트롤러 경로를 등록하기 위해 `app.MapControllers()`를 호출합니다:

~~~js title="Program.cs"
app.MapControllers();
~~~


다음은 **Program.cs**의 전체 코드입니다:

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

마지막으로 앱 시작 시 데이터베이스를 초기화하고 시드합니다. 마이그레이션을 사용하는 것이 일반적이지만 이 튜토리얼에서는 간단히 `EnsureCreated`와 `seed`만 사용합니다.

초기화가 수행될 위치를 정의하는 클래스를 만들어 봅니다. **Models** 폴더에 **GanttInitializerExtension.cs** 파일을 생성합니다:

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

다음으로 `InitializeDatabase()`를 호출합니다:

~~~js title="Program.cs"
app.InitializeDatabase();
~~~

앞서 언급한 바와 같이 이 튜토리얼에서는 마이그레이션을 사용하지 않습니다. 대신 간단한 `EnsureCreated`와 시드(seed)만 사용합니다.

현재 부분은 완료되었으니 Gantt로 돌아가봅시다.

### DTO 및 매핑 정의

Web API에 사용될 DTO 클래스를 정의할 때가 되었습니다. Task에 대한 DTO 클래스로 시작합니다. **Models** 폴더에 파일을 만들고 **WebApiTask.cs** 클래스를 정의합니다:

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

그리고 **Models** 폴더에 있는 또 다른 파일인 **WebApiLink.cs**에서 Link에 대한 DTO 클래스를 정의합니다:

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

작업을 마치면 폴더 구조는 다음과 같아야 합니다:

![Gantt ASP.NET Core 2 All models](/img/howtostart_dotnetcore_structure.png)

이제 앱을 실행해 모든 것이 제자리에 있는지 확인할 수 있습니다. 런타임 오류가 보이지 않으면 잘 되어 있는 것입니다.

## 4단계. Web API 구현하기

이제 실제 REST API 구현 단계입니다.

### 컨트롤러 추가

**Controllers** 폴더를 만들고 Tasks, Links, 전체 데이터셋을 위한 세 개의 비어 있는 API 컨트롤러를 만듭니다.

![Gantt ASP.NET Core 2 adding controllers](/img/howtostart_dotnetcore_addcontrollers.png)


#### Task Controller

Tasks에 대한 컨트롤러를 만듭니다. Gantt 작업에 대한 기본 CRUD 작업을 정의합니다.

동작 방식:

- GET 요청에서 데이터베이스에서 작업을 로드하고, 작업의 데이터 전송 객체를 출력합니다.
- PUT/POST 요청에서 클라이언트로부터 WebAPITask 클래스의 데이터를 받아 도메인 모델로 변환한 후 데이터베이스에 저장합니다. 그러고 나서 데이터베이스 컨텍스트에 변경 사항을 저장합니다.

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

#### Link Controller

다음으로 Links에 대한 컨트롤러를 만듭니다:

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

#### Data Controller

마지막으로 데이터 작업을 위한 컨트롤러를 만듭니다:

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

모두 준비되었습니다. 애플리케이션을 실행하면 완전한 기능의 Gantt를 확인할 수 있습니다.

![Gantt ASP.NET Core Gantt is ready](/img/ready_gantt_dotnet_core.png)



[전체 소스 코드는 GitHub에서도 확인할 수 있습니다](https://github.com/DHTMLX/gantt-howto-dotnet-core/).

## 에러 처리

에러를 처리하려면 런타임 예외를 캐치하고 응답을 작성하는 특별한 [미들웨어 클래스](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/startup?view=aspnetcore-9.0) 를 선언해야 합니다. 그런 뒤 애플리케이션 요청 파이프라인에 추가합니다. 아래 절차를 따르세요:

1. 프로젝트 폴더에서 템플릿으로부터 미들웨어 클래스를 생성합니다.

![Gantt ASP.NET Core middleware class](/img/dotnet_core_middleware.png)

2. ASP.NET Core를 위한 JSON 프레임워크를 설치합니다. NuGet 패키지 관리자를 통해 설치할 수 있습니다:

![Gantt ASP.NET Core Install NewtonSoft Json](/img/install_newtonsoft.png)

또는 패키지 매니저 명령줄을 사용:

~~~
PM> Install-Package NewtonSoft.JSON
~~~

3. **GanttErrorMiddleware.cs**에서 `invoke` 메서드를 찾아 `_next` 호출을 주목합니다. 일부 핸들러는 예외를 발생시킬 수 있으므로 이를 잡아야 합니다. `_next` 호출을 `try-catch` 블록으로 감싸고 에러가 캡처되면 핸들러를 실행합니다.

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

4. **GanttErrorMiddleware.cs**에 다음 네임스페이스를 추가합니다:

~~~js
using Newtonsoft.Json;
~~~

5. 미들웨어가 준비되었습니다. 이제 **Program.cs**로 가서 미들웨어를 연결합니다. 다음 네임스페이스를 추가합니다:

~~~js title="Program.cs"
using DHX.Gantt;
~~~

다음으로 **app.UseGanttErrorMiddleware()** 메서드를 호출합니다:

~~~js title="Program.cs"
app.UseGanttErrorMiddleware();
~~~

## 작업 순서 저장하기 {#storingtheorderoftasks}

클라이언트 측의 Gantt에서 drag & drop으로 작업 순서를 재배치할 수 있습니다. 이 기능을 사용하면 데이터베이스에 작업의 순서를 저장해야 합니다.
자세한 내용은 [이 섹션](guides/server-side.md#storingtheorderoftasks)을 읽으십시오.

다음은 Gantt의 작업 순서를 저장하도록 활성화하는 방법에 대한 내용입니다.

### 클라이언트 측에서의 재정렬

먼저 클라이언트 측에서 작업 재정렬 기능을 활성화합니다. `index.html`에 아래 라인을 추가합니다:

~~~js title="wwwroot/index.html"
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

// specifying the date format
gantt.config.date_format = "%Y-%m-%d %H:%i";
// initializing gantt
gantt.init("gantt_here");
~~~

### 모델에 작업 순서 추가

다음으로 백엔드가 현재 작업 순서를 반영하도록 변경해야 합니다. Task 모델에 속성 하나를 추가합니다:

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

### 컨트롤러 업데이트

컨트롤러를 업데이트해야 합니다.

1. 클라이언트가 정렬된 순서대로 작업을 받도록 DataController에 라인을 추가합니다:

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

2. 새 작업은 기본값인 `SortOrder`를 받아야 합니다:

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

3. 클라이언트에서 작업 순서가 변경될 때는 `sortOrder`가 업데이트되어야 합니다. 사용자가 작업의 순서를 재배치하면 Gantt는 PUT 액션을 호출하고 요청의 위치 정보와 나머지 작업 속성들과 함께 새 작업의 위치를 제공합니다. 이때 요청의 `target` 속성과 함께 처리합니다.
 
`WebApiTask.cs` 클래스에 `target`을 추가합니다:

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
 
이제 PUT(수정) 동작에서 재정렬을 구현해 봅니다. Task 컨트롤러의 Put 액션을 수정합니다:

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
        // 재정렬 발생
        await this.UpdateOrdersAsync(dbTask, apiTask.target); /*!*/
    }                                                         /*!*/

    await _context.SaveChangesAsync();

    return Ok(new
    {
        action = "updated"
    });
}
~~~

그리고 작업 순서를 업데이트하는 메서드를 추가합니다:

~~~js title="Controllers/TaskController.cs"
private async Task<IActionResult> UpdateOrdersAsync(Models.Task updatedTask, string orderTarget)
{
    int adjacentTaskId;
    var nextSibling = false;

    var targetId = orderTarget;

    // 인접 태스크 ID는 '{id}' 또는 'next:{id}' 형식으로 전달됩니다.
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

## 애플리케이션 보안

Gantt는 SQL 주입, XSS, CSRF 공격 등 여러 위협으로부터 애플리케이션을 보호하는 방법을 제공하지 않습니다. 애플리케이션의 보안은 백엔드를 구현하는 개발자에게 달려 있습니다. 관련 내용은 [해당 기사](guides/app-security.md)를 참조하십시오.

### XSS 보호

가장 간단한 해결책은 클라이언트로 데이터를 보낼 때 텍스트 속성을 인코딩하는 것입니다.

예를 들어 아래 코드에서는 내장 HtmlEncoder를 사용해 작업 텍스트의 HTML 값을 이스케이프합니다. 이 방법으로 데이터베이스에는 원본 데이터가 남고 클라이언트 측에는 안전한 `task.text` 값이 전달됩니다.

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

다른 방법으로는 HtmlAgilityPack과 같은 라이브러리를 사용해 데이터 저장/로드 시 HTML 태그를 완전히 제거할 수 있습니다.

## 문제 해결

위의 단계를 따라 ASP.NET Core와 함께 Gantt를 통합하는 방법을 구현했는데도 페이지에서 작업과 연결선이 렌더링되지 않는 경우에는 [Backend Integration IssuesTroubleshooting](guides/troubleshooting.md) 아티클을 참조하십시오. 문제의 원인을 식별하는 방법이 설명되어 있습니다.

## 다음에 할 일

이제 다 완벽하게 작동하는 Gantt가 있습니다. 전체 코드는 [GitHub](https://github.com/DHTMLX/gantt-howto-dotnet-core)에서 확인하거나 clone하거나 다운로드하여 프로젝트에 사용할 수 있습니다.

또한 Gantt의 다양한 기능에 대한 가이드나 다른 백엔드 프레임워크와의 통합 튜토리얼도 확인해 보십시오:
- guides.md의 [다양한 기능에 대한 가이드]
- integrations/howtostart-guides.md의 [다른 백엔드 프레임워크와의 통합 시작 가이드]