---
title: "从 MS Project 导出和导入"
sidebar_label: "从 MS Project 导出和导入"
---

# 从 MS Project 导出和导入

dhtmlxGantt 库允许将甘特图中的数据导出到 MS Project。你也可以从 MS Project 将数据导入到甘特图。

:::note
该服务是免费的，但输出文件在 GPL 许可下会包含库的水印。若你购买了许可证，在有效支持期内（所有 PRO 许可均为 12 个月）导出的结果将不带水印。
:::

有若干导出服务可用。你可以在本地计算机上安装它们，并本地将甘特图导出为 MS Project。
请注意，导出服务不包含在 Gantt 包中，
请阅读 [corresponding article](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) 以了解每个服务的使用条款。

## 在线导出服务的限制

:::note
导出服务对时间和请求大小有一定限制。
:::

### 时间限制

如果处理时间超过 20 秒，导出将被取消，出现如下错误：

~~~html
Error: Timeout trigger 20 seconds
~~~

如果多个人同时导出甘特图，过程可能比平时耗时更长。但这没关系，因为来自特定用户的导出请求所花费的时间是单独计数的。

### 请求大小限制

有一个通用 API 端点 `https://export.dhtmlx.com/gantt`，用于所有导出方法（*exportToPDF*、*exportToPNG*、*exportToMSProject* 等等）。**最大请求大小为 10 MB**。

还有一个单独的 API 端点 `https://export.dhtmlx.com/gantt/project`，专用于 [MSProject](#limits-on-request-size-and-import-of-large-files) 与 
[Primavera P6](guides/export-primavera.md) 的导出/导入服务（仅限 *exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*）。**最大请求大小：40 MB**。

## 使用导出模块

:::note
如果你需要导出较大的图表，可以使用一个 [standalone export module](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)。 
若你在 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)、[Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 或 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 许可证下获得 Gantt，导出模块免费提供，或者你也可以 [单独购买该模块](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)。
:::

[了解更多 MS Project 的导出模块用法](guides/msp-export-module.md). 


## 导出到 MS Project

Gantt 组件允许将链接、任务和资源导出到 MS Project。

要将数据从 Gantt 图导出到 MS Project，请执行下列操作：

- 要使用导出/导入功能，请通过 [plugins](api/method/plugins.md) 方法启用 <b>export_api</b> 插件：

~~~js
gantt.plugins({
    export_api: true
});
~~~

它允许你使用在线导出服务或本地导出模块。

:::note
如果你使用的 Gantt 版本低于 8.0，需要在页面中包含 `https://export.dhtmlx.com/gantt/api.js` 以启用导出功能，例如：

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- 调用 [exportToMSProject](api/method/exporttomsproject.md) 方法以从 Gantt 图导出数据。

~~~js
gantt.exportToMSProject();
~~~

该方法将向远程服务发送请求，远程服务要么输出一个 XML Project 文件，要么返回一个用于下载生成文件的 URL。


**相关示例**： [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


### 导出设置

exportToMSProject() 方法的参数是一个包含若干属性的对象（所有属性均为可选）：

- **name** - (string) 获取的文件名（默认值为 'gantt.xml'）。

~~~js
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) 指示导出项目中任务的排程模式。**true** 表示任务自动排程，**false** 表示任务手动排程（默认状态）。

~~~js
gantt.exportToMSProject({
    auto_scheduling: false);
});
~~~

- **skip_circular_links** - (boolean) 指示是否移除循环链接（true - 将被移除（默认模式），false - 不会被移除）。

~~~js
gantt.exportToMSProject({
    skip_circular_links: false);
});
~~~

- **project** - (object) 允许为导出的项目信息设置自定义属性

~~~js
gantt.exportToMSProject({
    project: {
        'Author': 'I am!',
        'MinutesPerDay': function () {
            return gantt.config.hours_per_day * 60;
        }
    }
});
~~~

该对象的属性对应 [Project 实体](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)) 的相应属性。
可用属性列表可在 [此处](guides/tags.md) 找到。属性可以包含固定值或在导出调用时将执行的函数。

- **tasks** - (object) 允许为导出的任务项设置自定义属性

~~~js
gantt.exportToMSProject({
   tasks: {
       'StartVariance': function (task) {
           if (task.startVariance)
               return task.startVariance;
           else
               return 0;
       },
       'PercentWorkComplete': function (task) {
           return (task.progress + 0.1);
       },
       'Custom': function (task) {
           return 'Custom value';
       },
       'Custom 2': 'My Custom value'
   }
});
~~~

该对象的属性对应 [Task 实体](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)) 的相应属性，
这里是支持的 [属性列表](guides/tags.md#tasks-properties)。
属性可以包含固定值或在导出调用时对每个任务执行的函数。

- **data** - (object) 允许设置一个自定义数据源，将在输出的甘特图中显示

:::note
预计 start_date 和 end_date 属性将采用包含日期和时间的格式（%d-%m-%Y %H:%i）。
:::

~~~js
const customData = {
    "data": [
        { "id": "10", "text": "Project #5", "start_date": "01-04-2025 00:00", 
            "duration": 3, "order": 10, "progress": 0.4, "open": true, 
            "end_date": "04-04-2025 00:00", "parent": 0 
        },
        { "id": "1", "text": "Task #67", "start_date": "02-04-2025 00:00", 
            "duration": 2, "order": 10, "progress": 0.6, "parent": "10", 
            "end_date": "04-04-2025 00:00" 
        },
        { "id": "2", "text": "Task #89", "start_date": "01-04-2025 00:00", 
            "duration": 2, "order": 20, "progress": 0.6, "parent": "10", 
            "end_date": "03-04-2025 00:00" 
        },
    ],
    "links": [
        { "id": 1, "source": 1, "target": 2, "type": "1" },
    ]
}

gantt.exportToMSProject({
    data: customData
});
~~~

**相关示例**： [Gantt. Export custom data](https://snippet.dhtmlx.com/10ytgdxs)

- **callback** - (function) 如果你想收到一个用于下载生成的 XML 的 URL，可以使用 callback 属性。它接收一个带有 *url* 属性的 JSON 对象：

~~~js
gantt.exportToMSProject({
    callback: function(res){
        alert(res.url);
    }
});
~~~
 
- **resources** - (array) 允许将资源列表导出到 MS Project 文件

~~~js
gantt.exportToMSProject({
    resources: [
        { "id": "1", "name": "John", "type": "work" },
        { "id": "2", "name": "Mike", "type": "work" },
        { "id": "3", "name": "Anna", "type": "work" }
    ]
});
~~~

可用的资源类型有 "work"、"cost"、"material"。资源分配通过任务配置的 **ResourceAssignments** 属性来指定：

~~~js {23-25}
var users = [// resources
    { key:'0', label: "N/A" },
    { key:'1', label: "John" },
    { key:'2', label: "Mike" },
    { key:'3', label: "Anna" }
];

gantt.exportToMSProject({
  resources: users
     .filter(function(u){
        if(u.key === '0')//skip the default option 
           return false;
        return true;
     })
     .map(function(u){
        return {
           id: u.key,
           name: u.label,
           type: "work"
        };
     }),
  tasks: {
     ResourceAssignments: function(task){  
        return task.user;                   
     }                                       
  }
});
~~~

The **ResourceAssignments** 属性被设置为一个函数，该函数以任务对象作为参数并返回字符串/数字值，或返回字符串/数字值组成的数组：

~~~js
tasks: {
    ResourceAssignments: function(task){
        return [task.user, task.office];
    }
}
~~~

你还可以通过在 **ResourceAssignments** 属性中返回以下对象来指定 *units* 参数：

~~~js
{
    resource_id: "id",
    units: "units value"
}
~~~

- **resource calendars**

默认情况下，每个任务都会附加一个日历。如果使用资源日历，你需要在导出时在任务的 *CalendarUID* 属性中指定 -1（在 [tasks](#export-settings) 对象中）。这样任务就会使用资源日历。

在导出 [resource calendars](api/config/resource_calendars.md) 时，可以在 [resources](#export-settings) 数组的对象中指定资源日历： 

~~~js
gantt.exportToMSProject({
  resources: [
    {
      id: "10",
      name: "John",
      type: "work",
      calendar: gantt.config.resource_calendars[10]
    }
  ]
});    
~~~

- **server** - (string) 请求的 API 端点。可与本地安装的导出服务一起使用。默认值为 `https://export.dhtmlx.com/gantt`。

~~~js
gantt.exportToMSProject({
    server: "https://myapp.com/myexport/gantt"
});
~~~

## 从 MS Project 导入

为了将 XML 或 MPP MS Project 文件转换为甘特图，你需要向导出服务发送以下请求：

 - 请求 URL - `https://export.dhtmlx.com/gantt`
 - 请求方法 - **POST**
 - Content-Type - **multipart/form-data**

请求参数为：

 - **file** - 一个 MPP 或 XML MS Project 文件
 - **type** - "msproject-parse"
 - **data** - (*可选*) 带有设置的 JSON 字符串

例如：

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <button type="submit">Get</button>
</form>
~~~

或者，你也可以使用 [client-side API](api/method/importfrommsproject.md)，如下所示：

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            gantt.clearAll();
            if (project.config.duration_unit) {
                gantt.config.duration_unit = project.config.duration_unit;
            }                    
            gantt.parse(project.data);
        }
     }
});
~~~

**相关示例**： [Gantt. Import MSP files. Get task type from properties](https://snippet.dhtmlx.com/sjka4br8)

Where *file* is an instance of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) which should contain either an XML or MPP Project file.

:::note
**gantt.importFromMSProject** 需要 HTML5 File API 支持。
:::


### 响应

响应将包含以下结构的 JSON：

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {},
   calendars: []
}
~~~

 
- **data** - (*object*) 一个甘特图 [data object](guides/supported-data-formats.md)。每个任务有以下属性：*id*、*open*、*parent*、*progress*、*start_date*、*text*、*resource*。
日期以字符串形式表示，格式为 "%Y-%m-%d %H:%i"。
- **config** - (*object*) 一个甘特图 [configuration](api/overview/properties-overview.md) 对象，包含从项目文件中获取的设置。
- **resources** - (*array*) 一个对象数组（每个对象具有以下属性：(*id: string, name: string, type: string, calendar: string*)），表示项目文件中的资源列表。
- **worktime** - (*object*) 包含来自项目日历的工作时间设置的对象。可以包含以下属性：
    - **id** - (*string | number*) 可选，日历的 id
    - **hours** - (*array*) 全局工作时间数组，设定任务的起止时间
    - **dates** - (*array*) 一个日期数组，可能包含：
        - 一周中的 7 天（从 0 - 星期日 到 6 - 星期六），其中 1/true 代表工作日，0/false 代表非工作日
        - 其他记录为日期
- **calendars** - (*array*) 一个数组，包含用于创建新日历的日历配置对象。
    - **calendarConfig** - (*object*) 一个日历配置对象，可能包含以下属性：
        - **id** - (*string | number*) 可选，日历 id
        - **name** - (*string*) 日历名称
        - **hours** - (*array*) 全局工作时间数组，设定任务的起止时间
        - **dates** - (*array*) 一个日期数组，可能包含：
            - 一周中的 7 天（从 0 - 星期日 到 6 - 星期六），其中 1/true 代表工作日，0/false 代表非工作日
            - 其他记录为日期
  
### 导入设置

#### 设置持续时间单位

要设置期望的持续时间单位，可以将 durationUnit（"minute"、"hour"、"day"、"week"、"month"、"year"）字符串也发送给服务器。

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
        value="{ "durationUnit": "hour" }" />
    <button type="submit">Get</button>
</form>
~~~

或

~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    callback: function(project){}
});
~~~

#### 获取项目属性

要获取项目字段，可以向服务器发送带有所需字段数组的 **projectProperties** 输入。
它将 [Project 实体](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))
的任意属性提取到输出的 config 属性中。下面是支持的 [属性列表](guides/tags.md#project-properties)。

 - **projectProperties** - 指定应放入响应中的项目属性数组。

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
        value="{ "projectProperties": ["Author", "Title"] }" />
    <button type="submit">Get</button>
</form>
~~~

或

~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    projectProperties: ["Author", "Title"],
    callback: function(project){
        var config = project.config;
        alert(config.$custom_properties.Author);
    }
});
~~~

#### 获取任务属性

要获取任务字段，可以向服务器发送带有所需字段数组的 **taskProperties** 输入。
它将 [Task 实体](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)) 的任意属性提取出来。以下是支持的 [属性列表](guides/tags.md#tasks-properties)：

 - **taskProperties** - 指定要导入的附加任务属性数组。


~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <input type="hidden" name="data" 
        value="{ "taskProperties": ["Contact", "Priority"] }" />
    <button type="submit">Get</button>
</form>
~~~
或
~~~js
gantt.importFromMSProject({
    data: file,
    durationUnit: "hour",
    taskProperties: ["Contact", "Priority"],
    callback: function(project){
        var config = project.config;
        alert(config.$custom_properties.Author);
        gantt.parse(project.data);
    }
});
gantt.attachEvent("onTaskLoading", function(task) {
    if (task.$custom_data) {
        task.contact = task.$custom_data["Contact"];
        task.priority = task.$custom_data["priority"];
        delete task.$custom_data;
    }
    return true;
});
~~~

#### 获取任务类型

以下逻辑允许你获取任务类型：类型为 Project 的任务具有属性 Summary: "1"，类型为 Milestone 的任务具有属性 Milestone: "1"。我们需要导入具有这些属性的数据，然后根据这些属性设置任务类型。

导入函数的调用如下所示：

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: [
        "Summary",
        "Milestone",
    ],
    callback: function (project) {
        if (project) {
            console.log(project)
            gantt.clearAll();
            if (project.config.duration_unit) {
                gantt.config.duration_unit = project.config.duration_unit;
            }
            console.log('import: ', project.data);
            gantt.parse(project.data);
        }
    }
});
~~~

之后，你可以根据接收到的属性将任务类型进行如下转换：

~~~js
gantt.attachEvent("onTaskLoading", function (task) {
    if (task.$custom_data) {
        if (task.$custom_data.Summary == "1") {
            task.type = "project";
        }
        if (task.$custom_data.Milestone == "1") {
            task.type = "milestone";
        }
        // delete task.$custom_data;
    }
    return true;
});
~~~

**相关示例**： [Gantt. Import MSP files. Get task type from properties](https://snippet.dhtmlx.com/sjka4br8)

#### 添加和调整日历

请注意，导入时不会自动添加日历。你需要使用 [addCalendar()](api/method/addcalendar.md) 方法来添加日历。
之后，你应通过 [setWorkTime()](api/method/setworktime.md) 方法来指定日历设置。示例：

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // 为添加日历设置
            project.calendars.forEach(function (calendar) {
                let addedCalendar;
                // 为全局日历添加工作时间设置
                if (calendar.id == project.config.global_calendar_id) {
                    addedCalendar = gantt.getCalendar("global");
                }
                else {
                    // Gantt 不会添加日历
                    // 如果 hours 参数为空数组
                    let calendarHours = calendar.hours;
                    if (!calendarHours.length) {
                        calendarHours = undefined
                    }
                    gantt.addCalendar({
                        id: calendar.id,
                        hours: calendarHours,
                        name: calendar.name
                    });

                    addedCalendar = gantt.getCalendar(calendar.id);
                }
                const worktimeDates = calendar.dates;
                for (let element in worktimeDates) {
                    const date = new Date(+element)
                    if (element < 10) {
                        addedCalendar.setWorkTime({ 
                            day: element, 
                            hours: worktimeDates[element] 
                        })
                    }
                    else {
                        addedCalendar.setWorkTime({ 
                            date: date, 
                            hours: worktimeDates[element] 
                        })
                    }
                }
            })
        }
    }
});
~~~

**相关示例**： [Gantt. Calendars settings for export/import in MSProject and Primavera6](https://snippet.dhtmlx.com/668xqts7)

#### 资源日历

如果存在资源日历，请通过 ganta.config.resource_calendars 属性进行指定：

~~~js
gantt.importFromMSProject({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // 日历设置
            project.calendars.forEach(function (calendar) {
                // 添加日历及其工作时间设置
            })

            // 资源日历设置
            gantt.config.resource_calendars = {}

            project.resources.forEach(function (resource) {
                if (resource.calendar) {
                    gantt.config.resource_calendars[resource.id] = resource.calendar;
                }
            })
        }
    }
});
~~~

**相关示例**： [Gantt. Resource calendars settings for export/import in MSProject and Primavera6](https://snippet.dhtmlx.com/10czv54b)

#### 资源与资源分配

如果文件中有资源，它们在导入时会进入 resources 数组。 resources 属性的 calendar 参数指定资源日历：

~~~js
{
    resources: [
        { id: 6, name: "John", type: "work", calendar: "8" },
        // 更多资源
    ]
}
~~~

如果存在资源分配，它们将导入到 assignments 数组中，其中分配对象包含 *resource_id: string* 和 *value: number* 参数。例如：

~~~js
{
    tasks: [
        {
            id: 5,
            text: "Interior office",
            type: "task",
            start_date: "03-04-2024 00:00",
            duration: 7,
            parent: "2",
            priority: 1
        },
        // 更多任务
    ],
    links: [],
    assignments: [
        { id: 1, task_id: 5, resource_id: 6, value: 3},
        // 更多分配
    ],
    resources: [
        {id: 6, text: "John", unit: "hours/day" },
        {id: 7, text: "Mike", unit: "hours/day" },
        // 更多资源
    ]
}
~~~

## 对请求大小和大文件导入的限制

MSProject 导出/导入服务共有两个 API 端点：

- `https://export.dhtmlx.com/gantt` - 默认端点，服务所有导出方法（*exportToPDF*、*exportToPNG*、*exportToMSProject* 等）。**最大请求大小为 10 MB**。
- `https://export.dhtmlx.com/gantt/project` - 专用于 MSProject 和
[Primavera P6](guides/export-primavera.md) 导出/导入服务（仅限 *exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*）。**最大请求大小：40 MB**。

该端点可通过导出配置对象的 server 属性进行指定：

~~~js
gantt.importFromMSProject({
    server: "https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // 某些逻辑
    }
}); 
~~~

如果未指定端点，默认使用 `https://export.dhtmlx.com/gantt`。以下调用与上述等价：

~~~js
gantt.importFromMSProject({
    data: file,
    callback: function(project){
       // 某些逻辑
    }
});
~~~

如要导出或导入超过 4MB 限制的大型项目，可以使用第二个端点：

~~~js
gantt.importFromMSProject({
    server: "https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // 某些逻辑
    }
}); 
~~~

它允许发送高达 40MB 的请求，并支持 MS Project 的导出和导入。它仅用于 MS Project 的导出。 

其他任何方法，例如，`gantt.exportToPDF({server:"https://export.dhtmlx.com/gantt/project"})`，都应返回服务器错误。

## dhtmlxGantt 与 MS Project 的时间计算差异

dhtmlxGantt 与 MS Project 在日期计算方面存在根本差异，在某些情况下会导致结果不同。 

这些差异也取决于在甘特图中使用的配置组合。但你可以通过调整甘特图的设置来影响计算结果：

1. 首先，dhtmlxGantt 与 MS Project 在持续时间转换方面存在差异。

在将甘特图导出到 MS Project 时，通过指定 HoursPerDay 和 MinutesPerDay 可以规避这一点：

~~~js
gantt.exportToMSProject({
    project: {
        HoursPerDay: function () {
            return 24;
        },
        MinutesPerDay: function () {
            return 24 * 60;
        }
    }
});
~~~

**相关示例**： [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)

2. 其次，你的项目可能禁用了 [work_time](guides/working-time.md) 设置：

~~~js
gantt.config.work_time = false;
~~~

注意，即使工作时间计算被禁用，甘特图的配置中仍然有默认日历设置（每日 8 小时，周一至周五工作周）。
而我们的导出客户端在将数据发送给 MS Project 时始终使用默认日历，即使在甘特图中禁用了工作时间。这就是 MS Project 以不同方式计算任务持续时间的原因。

作为一种变通做法，你可以清除默认日历，这样即使将其发送给 MS Project，任务持续时间的计算方式也会与甘特图中一致：

~~~js
gantt.setWorkTime({day:0, hours:[0,24]});
gantt.setWorkTime({day:1, hours:[0,24]});
gantt.setWorkTime({day:2, hours:[0,24]});
gantt.setWorkTime({day:3, hours:[0,24]});
gantt.setWorkTime({day:4, hours:[0,24]});
gantt.setWorkTime({day:5, hours:[0,24]});
gantt.setWorkTime({day:6, hours:[0,24]});
~~~

3. 此外，如果你将 duration_unit 设置为 "day"，你可能会发现汇总项的日期与 MS Project 的日期不同步：

~~~js
gantt.config.duration_unit = "day";
~~~

在这种情况下，甘特图会将持续时间四舍五入为总天数。但 MS Project 不会这样处理，而是显示分数持续时间。例如，甘特图中的顶部项目持续时间为 439，而在 MS Project 中为 438.58。

唯一的解决方法是将 duration_unit 切换为小时单位：

~~~js
gantt.config.duration_unit = "hour";
~~~

**相关示例**： [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)