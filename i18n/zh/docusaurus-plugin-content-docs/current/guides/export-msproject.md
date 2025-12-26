---
title: "从 MS Project 导出与导入"
sidebar_label: "从 MS Project 导出与导入"
---

# 从 MS Project 导出与导入

dhtmlxGantt 库支持将甘特图数据导出到 MS Project，以及将 MS Project 的数据导入到甘特图中。

:::note
导出服务可免费使用，但生成的文件会在 GPL 许可下包含库的水印。
如果您购买了许可证，在有效的支持期内（所有 PRO 许可证为 12 个月），导出将不含水印。
:::

有多种导出服务可用，您可以在本地计算机上安装这些服务来将甘特图导出到 MS Project。
请注意，这些导出服务并未与 Gantt 包一起捆绑。
各服务的使用条款详情请参阅[相关文章](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)。

## 在线导出服务的限制

:::note
导出服务对处理时间和请求大小有限制。
:::

### 时间限制

如果导出过程超过 20 秒，将会中止，并显示如下错误:

~~~html
Error: Timeout trigger 20 seconds
~~~

当多个用户同时导出甘特图时，总体处理时间可能会更长。但每个用户的导出请求计时是单独计算的。

### 请求大小限制

通用 API 端点 **https://export.dhtmlx.com/gantt** 处理所有导出类型（*exportToPDF*、*exportToPNG*、*exportToMSProject* 等），最大请求大小为 **10 MB**。

另有专用 API 端点 **https://export.dhtmlx.com/gantt/project**，专用于 [MSProject](#limitsonrequestsizeandimportoflargefiles) 和
[Primavera P6](guides/export-primavera.md) 的导出/导入服务（*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*）。该端点允许最大请求大小为 **40 MB**。

## 使用导出模块

:::note
如果需要导出大型甘特图，建议使用[独立导出模块](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)。
如果您拥有 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)、[Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 或 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 许可证，则该模块免费；也可单独购买 [这里](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)。
:::

[了解更多关于 MS Project 导出模块的使用方法](guides/msp-export-module.md)。

## 导出到 MS Project

Gantt 组件可以将链接、任务和资源导出到 MS Project。

要将甘特图数据导出到 MS Project，请按照以下步骤操作:

- 通过 [plugins](api/method/plugins.md) 方法启用 <b>export_api</b> 插件，以使用在线导出服务:

~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
对于 8.0 之前的 Gantt 版本，您需要在页面上引入 **https://export.dhtmlx.com/gantt/api.js** 以启用在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- 使用 [exportToMSProject](api/method/exporttomsproject.md) 方法导出您的甘特图数据。

~~~js
gantt.exportToMSProject();
~~~

该方法会向远程服务发送请求，服务会生成 XML Project 文件或提供下载文件的 URL。


[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


### 响应

响应为如下结构的 JSON 对象:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktimes: []
}
~~~

- **data** - 一个 gantt [数据对象](guides/supported-data-formats.md#json)。每个任务包含 *id*、*open*、*parent*、*progress*、*start_date*、*text* 和 *resource* 等属性。日期格式为 "%Y-%m-%d %H:%i" 的字符串。
- **config** - 一个 gantt [配置对象](api/overview/properties-overview.md)，包含从项目文件中提取的设置。
- **resources** - 资源对象数组，每个对象包含 (*id: string, name:string, type:string*)，表示项目文件中的资源。
- **worktimes** - 用于创建新日历的对象数组。每个日历对象可包含:
    - **id** - （可选）日历标识符
    - **hours** - （数组）定义任务开始和结束时间的全局工作时间
    - **dates** - （数组），可能包括:
        - 一周七天（0 = 周日到 6 = 周六），1/true 表示工作日，0/false 表示非工作日
        - 指定日期

### 导出设置

**exportToMSProject()** 方法可接收一个包含多种属性的可选对象:

- **name** - （字符串）导出文件的文件名（默认为 'gantt.xml'）。

~~~js
gantt.exportToMSProject({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - （布尔值）设置导出任务的调度模式。**true** 表示自动调度，**false** 表示手动调度（默认）。

~~~js
gantt.exportToMSProject({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - （布尔值）是否移除循环链接（默认为 true）。

~~~js
gantt.exportToMSProject({
    skip_circular_links: false
});
~~~

- **project** - （对象）允许为导出的项目实体分配自定义属性。

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

这些属性对应于 [Project 实体](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))" 的属性。
支持的属性列表见[这里](guides/tags.md)。值可以是固定值或导出时执行的函数。

- **tasks** - （对象）允许为导出的任务设置自定义属性。

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

这些属性对应于 [Task 实体](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))" 的属性，支持的属性列表见[这里](guides/tags.md#renwushuxing)。
值可以是固定值，也可以为每个任务调用的函数。

- **data** - （对象）允许为导出的甘特图提供自定义数据源。

:::note
**start_date** 和 **end_date** 应以包含日期和时间的格式（*%d-%m-%Y %H:%i*）指定。
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


**Related example:** [Gantt. Export custom data](https://snippet.dhtmlx.com/10ytgdxs)

- **callback** - （函数）用于接收生成的 XML 文件下载 URL。回调函数接收一个包含 *url* 属性的 JSON 对象:

~~~js
gantt.exportToMSProject({
    callback: function(res){
        alert(res.url);
    }
});
~~~
 
- **resources** - （数组）在 MS Project 文件中包含资源列表。

~~~js
gantt.exportToMSProject({
  resources: [
    {"id":"1","name":"John","type":"work"},
    {"id":"2","name":"Mike","type":"work"},
    {"id":"3","name":"Anna","type":"work"}
  ]
});
~~~

资源类型可以为 "work"、"cost" 或 "material"。资源分配通过任务配置中的 **ResourceAssignments** 属性指定:

~~~js
var users = [// resources
  {key:'0', label: "N/A"},
  {key:'1', label: "John"},
  {key:'2', label: "Mike"},
  {key:'3', label: "Anna"}
];

gantt.exportToMSProject({
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
     ResourceAssignments: function(task){  /*!*/
        return task.user;                   /*!*/
     }                                       /*!*/
  }
});
~~~

**ResourceAssignments** 属性是一个函数，接收任务对象并返回字符串/数字或字符串/数字数组:

~~~js
tasks: {
    ResourceAssignments: function(task){
        return [task.user, task.office];
    }
}
~~~

- **server** - （字符串）指定导出请求的 API 端点。可在本地运行导出服务时使用。默认值为 **https://export.dhtmlx.com/gantt**。

~~~js
gantt.exportToMSProject({
   server:"https://myapp.com/myexport/gantt"
});
~~~

## 从 MS Project 导入

要转换 XML 或 MPP MS Project 文件，请向导出服务发送如下请求:

 - 请求 URL: **https://export.dhtmlx.com/gantt**
 - 请求方法: **POST**
 - Content-Type: **multipart/form-data**

请求参数:

 - **file** - MPP 或 XML MS Project 文件
 - **type** - "msproject-parse"
 - **data** - （可选）包含设置的 JSON 字符串

示例表单:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="msproject-parse">
    <button type="submit">Get</button>
</form>
~~~

或者，您可以使用如下 [客户端 API](api/method/importfrommsproject.md):

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

此处 *file* 应为包含 XML 或 MPP Project 文件的 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 实例。

:::note
**gantt.importFromMSProject** 需要 HTML5 File API 的支持。
:::

### 响应

响应将包含如下结构的 JSON:

~~~js
{
   data: {},
   config: {},
   resources: [],
   worktime: {}
}
~~~

- **data** - 一个 gantt [数据对象](guides/supported-data-formats.md#json)。每个任务包含 *id*、*open*、*parent*、*progress*、*start_date*、*text*、*resource* 等属性。日期格式为 "%Y-%m-%d %H:%i"。
- **config** - 一个 gantt [配置对象](api/overview/properties-overview.md)，包含从项目文件中提取的设置。
- **resources** - 对象数组，每个对象包含 (*id:string, name:string, type:string*)，表示项目文件中的资源。
- **worktime** - 包含从项目日历获取的工作时间设置的对象。

### 导入设置

#### 设置工期单位

为了指定期望的工期单位，可以在发送到服务器的数据中包含 **durationUnit** 字符串（"minute"、"hour"、"day"、"week"、"month"、"year"）。

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

要提取项目字段，可以在发送到服务器的数据中通过 **projectProperties** 输入包含所需字段的数组。这样可以将 [Project 实体](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))" 的任意属性提取到响应的 **config** 属性中。支持的 [属性](guides/tags.md#xiangmushuxing) 可供选择。

- **projectProperties** - 定义需要在响应中包含的项目属性数组。

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

要获取任务字段，可以在发送到服务器的数据中通过 **taskProperties** 输入包含所需字段的数组。这样可以提取 [Task 实体](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))" 的任意属性。支持的 [属性](guides/tags.md#renwushuxing) 已列出。

- **taskProperties** - 指定需要导入的额外任务属性数组。

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

此方法有助于识别任务类型:被标记为 **Project** 的任务具有 `Summary: "1"` 属性，被标记为 **Milestone** 的任务具有 `Milestone: "1"` 属性。通过导入这些属性，可以相应地设置任务类型。

导入调用如下:

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

然后，可以根据这些属性调整任务类型，如下所示:

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


**Related example:** [Gantt. Import MSP files. Get task type from properties](https://snippet.dhtmlx.com/sjka4br8)


## 请求大小限制及导入大文件

MSProject 导出/导入服务有两个 API 端点:

- **https://export.dhtmlx.com/gantt** - 默认端点，处理所有导出方法（*exportToPDF*、*exportToPNG*、*exportToMSProject* 等）。**最大请求大小为 10 MB**。
- **https://export.dhtmlx.com/gantt/project** - 专用于 [MSProject](guides/export-msproject.md) 和 [Primavera P6](guides/export-primavera.md) 导出/导入服务的端点（*exportToMSProject*、*importFromMSProject*、*exportToPrimaveraP6*、*importFromPrimaveraP6*）。**最大请求大小为 40 MB**。

可以通过导出配置对象中的 **server** 属性设置端点:

~~~js
gantt.importFromMSProject({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

如果未指定端点，默认使用 <b>*https://export.dhtmlx.com/gantt*</b>。如下调用等价:

~~~js
gantt.importFromMSProject({
    data: file,
    callback: function(project){
       // some logic
    }
});
~~~

对于超过 4MB 的大型项目导出或导入，请使用第二个端点:

~~~js
gantt.importFromMSProject({
    server:"https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

该端点支持最大 40MB 的请求，仅用于 MS Project 的导入导出。只能用于 MS Project 的导入导出。

其他方法，例如 *gantt.exportToPDF((server:"https://export.dhtmlx.com/gantt/project"))*，将导致服务器错误。

## dhtmlxGantt 与 MS Project 时间计算差异

dhtmlxGantt 和 MS Project 在日期计算方式上存在一些关键差异，这有时会导致结果不同。

这些差异取决于所用 gantt 配置的组合。gantt 中的一些设置会影响计算结果:

1. dhtmlxGantt 与 [MS Project](https://blog.epmainc.com/start-and-end-date-do-not-align-task-duration/) 之间的工期换算方式不同。

可以在导出到 MS Project 时通过指定 *HoursPerDay* 和 *MinutesPerDay* 进行调整:

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


**Related example:** [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)


2. 项目可能已关闭 [work_time](guides/working-time.md) 设置:

~~~js
gantt.config.work_time = false;
~~~

请注意，即使关闭了工作时间计算，gantt 仍然包含默认日历设置（每天 8 小时，周一至周五工作周）。导出客户端始终会将此默认日历发送到 MS Project，这会导致 MS Project 以不同方式计算任务工期。

一种解决方法是清空默认日历，使 gantt 和 MS Project 的任务工期计算方式一致:

~~~js
gantt.setWorkTime({day:0, hours:[0,24]});
gantt.setWorkTime({day:1, hours:[0,24]});
gantt.setWorkTime({day:2, hours:[0,24]});
gantt.setWorkTime({day:3, hours:[0,24]});
gantt.setWorkTime({day:4, hours:[0,24]});
gantt.setWorkTime({day:5, hours:[0,24]});
gantt.setWorkTime({day:6, hours:[0,24]});
~~~

3. 如果将 [gantt.config.duration_unit](api/config/duration_unit.md) 设置为 "day"，则可能会观察到汇总项日期的差异:

~~~js
gantt.config.duration_unit = "day";
~~~

在此设置下，gantt 会将工期四舍五入为整天，而 MS Project 会显示小数工期。例如，gantt 中项目工期为 439 天，而 MS Project 中为 438.58 天。

解决方法是将 [duration_unit](api/config/duration_unit.md) 切换为小时:

~~~js
gantt.config.duration_unit = "hour";
~~~


**Related example:** [Export to MSProject without the "work_time" settings](https://snippet.dhtmlx.com/92fje5jq)

