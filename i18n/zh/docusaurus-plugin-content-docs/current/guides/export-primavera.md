---
title: "导出与从 Primavera P6 导入"
sidebar_label: "Primavera P6"
---

# 导出与从 Primavera P6 导入

dhtmlxGantt 库允许将甘特图中的数据导出到 Primavera P6。你也可以将 Primavera P6 的数据导入到 Gantt。

:::note
在线导出服务是免费的。有关许可条款，请参阅[许可证和水印](guides/export-common.md#license-and-watermark)。
:::

有多种导出服务可用。你可以在本地计算机上安装它们，将甘特图本地导出到 Primavera P6。请注意，导出服务不包含在 Gantt 包中，
请阅读 [corresponding article](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml) 以了解每种服务的使用条款。

## 在线导出服务限制

:::note
在线导出服务对时间和请求大小有限制。请参阅[在线导出服务的限制](guides/export-common.md#service-limits)。
:::

## 使用导出模块

要导出较大的图表、在不受在线导出服务限制的情况下导出，或将数据保留在你的网络内，请在自己的服务器上安装[导出模块](guides/export-modules.md)。有关[用于 MS Project 和 Primavera P6 的导出模块](guides/msp-export-module.md)的用法，请阅读相应文章。

## 导出到 Primavera P6 {#exporttoprimaverap6}

Gantt 组件支持将链接、任务和资源导出到 Primavera P6。

要将数据从 Gantt 图导出到 Primavera P6，请执行下列操作：

- 要使用导出/导入功能，请通过 [plugins](api/method/plugins.md) 方法启用 <b>export_api</b> 插件：

~~~js
gantt.plugins({
    export_api: true
});
~~~

它允许你使用在线导出服务或本地导出模块。

:::note
如果你使用的 Gantt 版本低于 8.0，在页面上需要包含 `https://export.dhtmlx.com/gantt/api.js` 以启用导出功能，例如：

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- 调用 [exportToPrimaveraP6()](api/method/exporttoprimaverap6.md) 方法以从 Gantt 图导出数据。

~~~js
gantt.exportToPrimaveraP6();
~~~

该方法将向远程服务发送请求，服务要么输出一个 XML Project 文件，要么返回一个用于下载生成文件的 URL。


**相关示例**： [Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


请注意，当将数据导出到 Primavera 时，需要为项目任务的 **Summary** 属性返回 **true**，以使该功能正确工作：

~~~js
gantt.exportToPrimaveraP6({
  tasks: {
    Summary: function (task) {
      return !!gantt.hasChild(task.id);
    },
    CustomProperty: function (task) {
      return task.custom_property;
    },
    SlateId: function (task) {
      return task.id + "";
    },
  }
});
~~~

**相关示例**： [Custom properties for WBS tasks (PrimaveraP6's Summary tasks)](https://snippet.dhtmlx.com/r90hjlvo?tag="gantt")

### 导出设置 {#export-settings}

**exportToPrimaveraP6()** 方法接收一个对象作为参数，该对象包含若干属性（所有属性均为可选）：

- **name** - (string) 获取到的文件名（默认为 'gantt.xml'）。  

~~~js
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) 指示导出项目中任务的排程模式。**true** 表示任务为自动排程，**false** 表示任务为手动排程（默认状态）。

~~~js
gantt.exportToPrimaveraP6({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) 指示是否移除循环链接（true - 将移除（默认模式），false - 不移除）。

~~~js
gantt.exportToPrimaveraP6({
    skip_circular_links: false
});
~~~

- **project** - (object) 允许为导出的 project 实体设置自定义属性

~~~js
gantt.exportToPrimaveraP6({
    project: {
        'Author': 'I am!',
        'MinutesPerDay': function () {
            return gantt.config.hours_per_day * 60;
        }
    }
});
~~~

该对象的属性对应 [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)) 的相应属性。支持的属性列表可在 [这里](guides/primavera-import-properties.md#project-properties) 找到。属性可以包含固定值或在导出调用时执行的函数。

- **tasks** - (object) 允许为导出的任务项设置自定义属性

~~~js
gantt.exportToPrimaveraP6({
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

该对象的属性对应 [Task entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)) 的相应属性，这里是 [properties](guides/primavera-import-properties.md#task-properties) 的支持列表。属性可以包含固定值或在导出调用时对每个任务执行的函数。

- **data** - (object) 允许设置将在导出 Gantt 图中呈现的自定义数据源。 

:::note
预计在 start_date 和 end_date 属性中指定包含日期和时间的格式（*%d-%m-%Y %H:%i*）。
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

gantt.exportToPrimaveraP6({
    data: customData
});
~~~

**相关示例**： [Gantt. Export custom data](https://snippet.dhtmlx.com/10ytgdxs)

- **callback** - (function) 如果你想获取用于下载生成的 XML 的 URL，可以使用 *callback* 属性。它接收一个带有 *url* 属性的 JSON 对象：

~~~js
gantt.exportToPrimaveraP6({
    callback: function(res){
        alert(res.url);
    }
});
~~~
 
- **resources** - (array) 允许将资源列表导出到 Primavera P6 文件

~~~js
gantt.exportToPrimaveraP6({
    resources: [
        { "id": "1", "name": "John", "type": "work" },
        { "id": "2", "name": "Mike", "type": "work" },
        { "id": "3", "name": "Anna", "type": "work" }
    ]
});
~~~

可用的资源类型为 "work"、"cost"、"material"。资源分配通过任务配置的 **ResourceAssignments** 属性来指定：

~~~js {23-25}
var users = [// resources
    { key: '0', label: "N/A" },
    { key: '1', label: "John" },
    { key: '2', label: "Mike" },
    { key: '3', label: "Anna" }
];

gantt.exportToPrimaveraP6({
    resources: users
        .filter(function(u){
            if(u.key === '0')//跳过默认选项
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

**ResourceAssignments** 属性可以是一个函数，接收任务对象并返回字符串/数字或字符串/数字数组:

~~~js
tasks: {
    ResourceAssignments: function(task){
        return [task.user, task.office];
    }
}
~~~

**相关示例**： [Export Gantt with resources to Primavera P6](https://snippet.dhtmlx.com/6bfbwp8g)

可以在 **ResourceAssignments** 属性中返回以下对象以指定 *units* 参数：

~~~js
{
    resource_id: "id",
    units: "units value"
}
~~~

- **resource calendars**

默认情况下，每个任务都会添加一个日历。如果使用资源日历，需要在导出期间在
*CalendarUID* 属性中为任务指定 -1（在 [tasks](#export-settings) 对象中）。那么该任务将使用资源日历。

在导出 [resource calendars](api/config/resource_calendars.md) 时，可以在 [resources](#export-settings) 数组的对象中指定资源日历： 

~~~js
gantt.exportToPrimaveraP6({
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


- **server** - (string) 请求的 API 端点。可用于本地安装的导出服务。默认值为 `https://export.dhtmlx.com/gantt`。

~~~js
gantt.exportToPrimaveraP6({
    server: "https://myapp.com/myexport/gantt"
});
~~~

## 从 Primavera P6 导入 {#import-from-primavera-p6}

为了转换 XML 或 XER 文件，你需要向导出服务发送以下请求：

 - 请求 URL - `https://export.dhtmlx.com/gantt`
 - 请求方法 - **POST**
 - 内容类型 - **multipart/form-data**

请求参数为：

 - **file** - XER 或 XML Primavera P6 文件
 - **type** - "primaveraP6-parse"
 - **data** - (*可选*) 带有设置的 JSON 字符串

例如：

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <button type="submit">Get</button>
</form>
~~~

或者，你也可以使用 [client-side API](api/method/importfromprimaverap6.md)，如下所示：

~~~js
gantt.importFromPrimaveraP6({
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


**相关示例**： [Import Primavera P6 file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_primaverap6.html)


其中 *file* 是一个 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 的实例，应包含一个 XML 或 XER Project 文件。

:::note
**gantt.importFromPrimaveraP6** 需要 HTML5 File API 的支持。
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

- **data** - (*object*) 一个甘特图 [data object](guides/supported-data-formats.md)。每个任务具有以下属性：*id*, *open*, *parent*, *progress*, *start_date*, *text*, *resource*。日期以字符串形式表示，格式为 "%Y-%m-%d %H:%i"。
- **config** - (*object*) 一个甘特图 [configuration](api/overview/properties-overview.md) 对象，包含从项目文件中检索的设置。
- **resources** - (*array*) 一个对象数组（每个对象具有以下属性：
  (*id: string, name: string, type: string, calendar: string*)）表示来自项目文件的资源列表。
- **worktime** - (*object*) 包含来自项目日历的工作时间设置的对象。它可以包含以下属性：
   - **id** - (*string | number*) 可选，日历 ID
   - **hours** - (*array*) 全局工作时间数组，设置任务的开始和结束时间
   - **dates** - (*array*) 日期数组，可包含：
        - 每周的 7 天（从 0 - 星期日，到 6 - 星期六），其中 1/true 代表工作日，0/false 代表非工作日
        - 其他记录为日期 
- **calendars** - (*array*) 包含用于创建新日历的日历配置对象的数组。
    - **calendarConfig** - (*object*) 日历配置对象，可能包含以下属性：
      - **id** - (*string | number*) 可选，日历 id
      - **name** - (*string*) 日历名称
      - **hours** - (*array*) 全局工作时间数组，设置任务的开始和结束时间
      - **dates** - (*array*) 日期数组，可包含：
            - 每周的 7 天（从 0 - 星期日，到 6 - 星期六），其中 1/true 代表工作日，0/false 代表非工作日
            - 其他记录为日期

### 导入设置 {#import-settings}

#### 设置持续时间单位

要设置期望的持续时间单位，可以将 durationUnit（"minute"、"hour"、"day"、"week"、"month"、"year"）字符串也发送到服务器。

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
        value="{ "durationUnit": "hour" }" />
    <button type="submit">Get</button>
</form>
~~~

或

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    durationUnit: "hour",
    callback: function(project){}
});
~~~

#### 获取项目属性

要获取项目字段，可以向服务器发送带有所需字段数组的 **projectProperties** 输入。
它将 [Project entity](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)) 的任意属性提取到输出的 config 属性中。支持的 [properties](guides/primavera-import-properties.md#project-properties) 列表如下。

 - **projectProperties** - 指定应放入响应中的项目属性数组。

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
        value="{ "projectProperties": ["Author", "Title"] }" />
    <button type="submit">Get</button>
</form>
~~~

或

~~~js
gantt.importFromPrimaveraP6({
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

要获取任务字段，可以向服务器发送带有必要字段的 **taskProperties** 输入。
它将 [Task entities](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)) 的任意属性提取到输出中的任务属性。下面是 [properties](guides/primavera-import-properties.md#task-properties) 的支持列表：

 - **taskProperties** - 指定要导入的额外任务属性数组。


~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <input type="hidden" name="data" 
        value="{ "taskProperties": ["Contact", "Priority"] }" />
    <button type="submit">Get</button>
</form>
~~~
或
~~~js
gantt.importFromPrimaveraP6({
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

**相关示例**： [Gantt. Import and export Primavera P6 files with additional project, task and resource properties and entities](https://snippet.dhtmlx.com/z1ewe48v)

#### 获取任务类型

Gantt 图中有三种预定义的任务类型：常规任务（默认）、项目任务、里程碑。你也可以在 `types` 对象中定义自定义类型。详细说明请参阅相关指南 [任务类型](/guides/task-types)。

以下逻辑可帮助你获取任务类型：**Project** 类型的任务具有 `Summary: "1"` 属性，**Milestone** 类型的任务具有 `Milestone: "1"` 属性。我们需要导入带有这些属性的数据，然后根据这些属性设置任务类型。

调用导入函数的示例看起来像这样：

~~~js
gantt.importFromPrimaveraP6({
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

之后你可以基于接收到的属性将任务类型转换如下：

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

**相关示例**： [Gantt. Import Primavera P6 files. Get task type from properties](https://snippet.dhtmlx.com/y95rsxor)

#### Primavera P6 活动类型的导出/导入

Primavera P6 使用的任务类型与 [Gantt 图中使用的任务类型](/guides/task-types)以及 MS Project 中的任务类型不同。若要保留原始 Primavera P6 类型的信息，请在导入/导出文件时使用 **ActivityType** 任务属性。由于 **ActivityType** 对 Gantt 而言是自定义属性，因此它不会影响 Gantt 端的任务类型。

**ActivityType** 属性支持 Primavera P6 活动类型的完整列表。导入时返回的值采用 PascalCase 形式，而导出时 PascalCase 和 UPPER_SNAKE_CASE 两种形式均可接受：

| 值 | 描述 |
|---|---|
| TaskDependent / TASK_DEPENDENT | 常规任务，根据其前置任务进行排程 |
| ResourceDependent / RESOURCE_DEPENDENT | 常规任务，根据资源日历进行排程（未指定 **ActivityType** 时默认使用） |
| StartMilestone / START_MILESTONE | 标记活动开始的里程碑 |
| FinishMilestone / FINISH_MILESTONE | 标记活动完成的里程碑 |
| WbsSummary / WBS_SUMMARY | WBS 汇总任务 |
| LevelOfEffort / LEVEL_OF_EFFORT | 工期由其所支持的活动决定的任务 |
| Hammock / HAMMOCK | 工期从第一个关联活动的开始持续到最后一个关联活动的完成的任务 |
| StartFlag / START_FLAG | 标记项目开始时某个特定时间点的标志活动 |
| FinishFlag / FINISH_FLAG | 标记项目完成时某个特定时间点的标志活动 |

##### 对 Primavera P6 里程碑类型的支持

值得注意的是，上面列出的 **Start Milestone** 和 **Finish Milestone** 类型在 Gantt 端没有各自对应的类型。dhtmlxGantt 库仅支持一种里程碑任务类型，它等同于 Primavera P6 的 **Finish Milestone** 类型。因此，在将 Primavera P6 项目导入 Gantt 时，所有里程碑（无论它们在源文件中是开始里程碑还是完成里程碑）都会被转换为 **milestone** 类型的任务。

若要保留原始 Primavera P6 里程碑类型的信息，请在导入时使用 **ActivityType** 任务属性，将其添加到 **taskProperties** 数组中。该属性会在每个任务的 `$custom_data` 对象中返回，因此请在 [onTaskLoading](api/event/ontaskloading.md) 事件中将其复制到任务本身：

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: ["ActivityType"],
    callback: function (project) {
        if (project) {
            gantt.clearAll();
            gantt.parse(project.data);
        }
    }
});

gantt.attachEvent("onTaskLoading", function (task) {
    if (task.$custom_data) {
        task.ActivityType = task.$custom_data.ActivityType;
    }
    return true;
});
~~~

对于里程碑，该属性以字符串形式存储原始 Primavera P6 类型，例如 "StartMilestone" 或 "FinishMilestone"。由于 **ActivityType** 不会影响 Gantt 端的任务类型，该任务仍然是 **milestone** 类型。例如，你可以使用此属性来自定义开始里程碑和完成里程碑在甘特图中的外观。

若要在将数据导出回 Primavera P6 时保留原始任务类型，请在 [exportToPrimaveraP6()](api/method/exporttoprimaverap6.md) 调用的 [tasks](#export-settings) 对象中，通过 **ActivityType** 属性返回该类型。由于 **ActivityType** 描述的是所有 Primavera P6 活动，而不仅仅是里程碑，因此请同时为其他任务类型提供值：

~~~js
gantt.exportToPrimaveraP6({
    tasks: {
        ActivityType: function (task) {
            if (task.type == "milestone") {
                return task.ActivityType == "StartMilestone" ? "START_MILESTONE" : "FINISH_MILESTONE";
            }
            if (task.type == "project") {
                return "WBS_SUMMARY";
            }
            return "TASK_DEPENDENT";
        }
    }
});
~~~

这样，导出的文件将具有与源 Primavera P6 文件相同的 **Start Milestone** / **Finish Milestone** 类型，而不是默认把每个里程碑都导出为 **Finish Milestone**。

**相关示例**： [Gantt. Import and export Primavera P6 files with the ActivityType to get Start and Finish Milestones](https://snippet.dhtmlx.com/elyeppkv)

#### 添加和调整日历

请注意，在导入期间日历不会自动添加。你需要使用 [addCalendar()](api/method/addcalendar.md) 方法将它们添加进去。
之后，应该通过 [setWorkTime()](api/method/setworktime.md) 方法来设置日历设置。例如：

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    taskProperties: ["Notes", "Name"],
    callback: function (project) {
        if (project) {
            // 添加日历的设置
            project.calendars.forEach(function (calendar) {
                let addedCalendar;
                // 为全局日历添加工作时间设置
                if (calendar.id == project.config.global_calendar_id) {
                    addedCalendar = gantt.getCalendar("global");
                }
                else {
                    // Gantt 不会在 hours 参数为空数组时添加日历
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

**相关示例**： [Gantt. Calendars settings for export/import in MSProject and Primavera P6](https://snippet.dhtmlx.com/668xqts7)

#### 资源日历

如果存在资源日历，需要通过 [gantt.config.resource_calendars](api/config/resource_calendars.md) 属性来指定：

~~~js
gantt.importFromPrimaveraP6({
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

**相关示例**： [Gantt. Resource calendars settings for export/import in MSProject and Primavera P6](https://snippet.dhtmlx.com/10czv54b)

#### 资源与资源分配

如果文件中存在资源，它们在导入时会出现在 **resources** 数组中。**resources** 属性的 calendar 参数指定资源日历：

~~~js
{
    resources: [
        { id: 6, name: "John", type: "work", calendar: "8" },
        // 更多资源
    ]
}
~~~

如果存在资源分配，它们将导入到 **assignments** 数组，其中分配对象包含 *resource_id: string* 和 *value: number* 参数。例如：

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
        { id: 6, text: "John", unit: "hours/day" },
        { id: 7, text: "Mike", unit: "hours/day" },
        // 更多资源
    ]
}
~~~

## 请求大小限制与大文件导入 {#limits-on-request-size-and-import-of-large-files}

在线导出服务为大型 Primavera P6 文件提供了单独的端点：`https://export.dhtmlx.com/gantt/project`。该端点接受高达 40 MB 的请求，而默认端点 `https://export.dhtmlx.com/gantt` 接受高达 10 MB 的请求。请参阅[在线导出服务的限制](guides/export-common.md#service-limits)。

如要导出或导入超过 10 MB 限制的项目，请在配置对象的 `server` 属性中指定该端点：

~~~js
gantt.importFromPrimaveraP6({
    server: "https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: (project) => {
        // 某些逻辑
    }
});
~~~

该端点仅支持 MS Project 和 Primavera P6 的导出和导入。其他任何方法，例如 `gantt.exportToPDF({server:"https://export.dhtmlx.com/gantt/project"})`，都应返回服务器错误。

如需使用自己的导出模块导入大文件，请参阅[导入大文件](guides/msp-export-module.md#import-of-large-files)。