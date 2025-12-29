---
title: "从 Primavera P6 导出和导入"
sidebar_label: "从 Primavera P6 导出和导入"
---

# 从 Primavera P6 导出和导入

dhtmlxGantt 库支持将甘特图数据导出到 Primavera P6，以及从 Primavera P6 导入数据到甘特图。

:::note
该服务可免费使用，但导出的文件将在 GPL 许可下包含库的水印。
购买授权后，在有效支持期内（所有 PRO 授权为 12 个月）导出文件将不再包含水印。
:::

有多种导出服务可供本地安装在您的计算机上，允许您直接将甘特图导出到 Primavera P6。
请注意，导出服务并未与甘特图包捆绑。
有关使用条款的详细信息，请参阅[相关文档](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)。

## 在线导出服务限制

:::note
导出服务在处理时间和请求大小上有限制。
:::

### 时间限制

如果导出过程超过 20 秒，将会被取消，并显示以下错误:

~~~html
Error: Timeout trigger 20 seconds
~~~

当多个用户同时导出甘特图时，处理时间可能会比平时更长。然而，每个用户的导出请求计时是独立的，这是预期行为。

### 请求大小限制

通用 API 端点 **https://export.dhtmlx.com/gantt** 处理所有导出方法（如 *exportToPDF*、*exportToPNG*、*exportToMSProject* 等），**最大请求大小为 10 MB**。

此外，还有专用 API 端点 **https://export.dhtmlx.com/gantt/project** 用于 [MSProject](guides/export-msproject.md) 和
[Primavera P6](#limitsonrequestsizeandimportoflargefiles)
的导出/导入服务（*exportToMSProject* / *importFromMSProject* / *exportToPrimaveraP6* / *importFromPrimaveraP6*）。该端点支持**最大请求大小为 40 MB**。

## 使用导出模块

:::note
对于大型甘特图的导出，提供了[独立导出模块](https://dhtmlx.com/docs/products/dhtmlxGantt/export.shtml)。
如果您拥有 [Commercial](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)、[Enterprise](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 或 [Ultimate](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing) 授权，则该模块免费；也可通过[此链接](https://store.payproglobal.com/checkout?currency=USD&products[1][id]=55210)单独购买。
:::

有关与 MS Project 配合使用导出模块的更多信息，请参见[本指南](guides/msp-export-module.md)。该模块支持 MS Project 和 Primavera P6 的导出/导入。

## 导出到 Primavera P6 {#exporttoprimaverap6}

Gantt 组件可以将链接、任务和资源导出到 Primavera P6。

要将甘特图中的数据导出到 Primavera P6，请按以下步骤操作:

- 启用 <b>export_api</b> 插件，具体方法请参见 [plugins](api/method/plugins.md) 文档:

~~~js
gantt.plugins({
      export_api: true
});
~~~

:::note
对于 8.0 之前的 Gantt 版本，您需要在页面中引入 **https://export.dhtmlx.com/gantt/api.js** 以启用在线导出服务，例如:

~~~js
<script src="codebase/dhtmlxgantt.js"></script>
<script src="https://export.dhtmlx.com/gantt/api.js"></script>
~~~
:::

- 使用 [exportToPrimaveraP6()](api/method/exporttoprimaverap6.md) 方法从甘特图中导出数据:

~~~js
gantt.exportToPrimaveraP6();
~~~

该方法会向远程服务发送请求，服务将生成并返回 XML Project 文件，或提供下载文件的 URL。


[Export data : MS Project, PrimaveraP6, Excel & iCal](https://docs.dhtmlx.com/gantt/samples/08_api/08_export_other.html)


导出数据到 Primavera 时，确保项目任务的 **Summary** 属性返回 *true* 以保证正常功能:

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


**Related example:** [为 WBS 任务（PrimaveraP6 的 Summary 任务）添加自定义属性](https://snippet.dhtmlx.com/r90hjlvo?tag="gantt")


### 响应

导出服务返回的响应为如下结构的 JSON 对象:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {}
}
~~~

- **data** - 一个 gantt [数据对象](guides/supported-data-formats.md#json)，包含任务及其属性，如 *id*、*open*、*parent*、*progress*、*start_date*、*text* 和 *resource*。日期格式为 "%Y-%m-%d %H:%i" 的字符串。
- **config** - 一个 gantt [配置对象](api/overview/properties-overview.md)，包含从项目文件中提取的设置。
- **resources** - 资源对象数组，每个资源包含 (*id: string, name:string, type:string*)，对应项目文件中的资源。
- **worktime** - 一个对象，保存项目日历中的工作时间设置。

### 导出设置

**exportToPrimaveraP6()** 方法可接收包含若干可选属性的对象:

- **name** - (string) 指定导出文件的文件名（默认为 'gantt.xml'）。

~~~js
gantt.exportToPrimaveraP6({
    name:'custom.xml'
});
~~~

- **auto_scheduling** - (boolean) 定义导出项目任务的排程模式。设置为 **true** 时任务为自动排程，**false** 时为手动排程（默认）。

~~~js
gantt.exportToPrimaveraP6({
    auto_scheduling: false
});
~~~

- **skip_circular_links** - (boolean) 是否移除循环链接。**true**（默认）移除，**false** 保留。

~~~js
gantt.exportToPrimaveraP6({
    skip_circular_links: false
});
~~~

- **project** - (object) 允许为导出的项目实体分配自定义属性。

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

这些属性对应于 [Project 实体](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)) 。支持属性列表见[此处](guides/properties.md)。属性值可以为固定值，也可以为导出时执行的函数。

- **tasks** - (object) 允许为导出的任务项定义自定义属性。

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

这些属性与 [Task 实体](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12))" 相关；支持的[属性列表](guides/properties.md#renwushuxing)可查阅。属性值可以为固定值，也可以为每个任务导出时调用的函数。

- **data** - (object) 允许为输出的甘特图提供自定义数据源。

:::note
需要确保 **start_date** 和 **end_date** 格式为带日期和时间的字符串（*%d-%m-%Y %H:%i*）。
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


**Related example:** [Gantt. 导出自定义数据](https://snippet.dhtmlx.com/10ytgdxs)


- **callback** - (function) 可用于获取生成 XML 文件的下载 URL。回调函数接收一个带 *url* 属性的 JSON 对象:

~~~js
gantt.exportToPrimaveraP6({
    callback: function(res){
        alert(res.url);
    }
});
~~~
 
- **resources** - (array) 允许将资源列表导出到 Primavera P6 文件中。

~~~js
gantt.exportToPrimaveraP6({
    resources: [
        {"id":"1","name":"John","type":"work"},
        {"id":"2","name":"Mike","type":"work"},
        {"id":"3","name":"Anna","type":"work"}
    ]
});
~~~

资源类型可以为 "work"、"cost" 或 "material"。资源分配通过任务配置中的 **ResourceAssignments** 属性指定:

~~~js
var users = [// 资源
    {key:'0', label: "N/A"},
    {key:'1', label: "John"},
    {key:'2', label: "Mike"},
    {key:'3', label: "Anna"}
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
        ResourceAssignments: function(task){  /*!*/
            return task.user;                   /*!*/
        }                                       /*!*/
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


**Related example:** [将带资源的甘特图导出到 Primavera P6](https://snippet.dhtmlx.com/6bfbwp8g)


- **server** - (string) 指定导出请求的 API 端点。如果您已安装本地导出服务，可使用此项。默认值为 **https://export.dhtmlx.com/gantt**。

~~~js
gantt.exportToPrimaveraP6({
    server:"https://myapp.com/myexport/gantt"
});
~~~


## 从 Primavera P6 导入

要转换 XML 或 XER 文件，请向导出服务发送包含以下内容的 POST 请求:

 - 请求 URL: **https://export.dhtmlx.com/gantt**
 - 方法: **POST**
 - Content-Type: **multipart/form-data**

请求参数包括:

 - **file** - 一个 XER 或 XML 格式的 Primavera P6 文件
 - **type** - 设为 "primaveraP6-parse"
 - **data** - (*可选*) 包含导入设置的 JSON 字符串

例如:

~~~html
<form action="https://export.dhtmlx.com/gantt" method="POST" 
    enctype="multipart/form-data">
    <input type="file" name="file" />
    <input type="hidden" name="type" value="primaveraP6-parse">
    <button type="submit">Get</button>
</form>
~~~

也可以使用 [客户端 API](api/method/importfromprimaverap6.md) 如下操作:

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


[Import Primavera P6 file](https://docs.dhtmlx.com/gantt/samples/08_api/18_load_from_primaverap6.html)


其中 *file* 应为包含 XML 或 XER 项目文件的 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 对象。

:::note
**gantt.importFromPrimaveraP6** 需要 HTML5 File API 的支持。
:::

### 响应

响应返回一个结构如下的 JSON 对象:

~~~js
{
    data: {},
    config: {},
    resources: [],
    worktime: {}
}
~~~

- **data** - 一个 gantt [数据对象](guides/supported-data-formats.md#json)。每个任务包含如 *id*、*open*、*parent*、*progress*、*start_date*、*text*、*resource* 等属性。日期格式为 "%Y-%m-%d %H:%i"。
- **config** - 一个 gantt [配置对象](api/overview/properties-overview.md)，包含从项目文件中提取的设置。
- **resources** - 表示项目文件中资源的资源对象数组（每个对象包含 *id*、*name* 和 *type*）。
- **worktime** - 包含项目日历工作时间设置的对象。


### 导入设置

#### 设置工期单位

你可以通过向服务器发送 **durationUnit** 字符串（"minute"、"hour"、"day"、"week"、"month"、"year"）来指定期望的工期单位。

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

要获取特定的项目字段，可以将 **projectProperties** 输入与所需字段数组一起发送到服务器。这会将[项目实体](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)) 中的属性提取到响应的" **config** 属性中。支持的[属性列表](guides/properties.md#xiangmushuxing)可参考。

 - **projectProperties** - 指定响应中包含哪些项目属性的数组。

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

要导入特定任务字段，可以将 **taskProperties** 输入与所需字段数组一起发送到服务器。这会从 [任务实体](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-2007/bb968652(v=office.12)) 中提取属性。支持的[属性列表](guides/properties.md#renwushuxing)可参考。

 - **taskProperties** - 指定要导入的附加任务属性的数组。

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


#### 获取任务类型

以下方式可判断任务类型:标记为 **Project** 的任务有属性 `Summary: "1"`，标记为 **Milestone** 的任务有属性 `Milestone: "1"`。导入数据时，这些属性有助于判断任务类型。

导入函数的调用方式如下:

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

导入后，你可以根据这些属性设置任务类型，如下所示:

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


**Related example:** [Gantt. Import Primavera P6 files. Get task type from properties](https://snippet.dhtmlx.com/y95rsxor)


## 请求大小限制与大文件导入

Primavera P6 导出/导入服务有两个 API 端点:

- **https://export.dhtmlx.com/gantt** - 默认端点，适用于所有导出方法（如 *exportToPDF*、*exportToPNG*、*exportToPrimaveraP6* 等）。**最大请求大小为 10 MB**。
- **https://export.dhtmlx.com/gantt/project** - 专用于 [MSProject](guides/export-msproject.md) 和 [Primavera P6](guides/export-primavera.md) 的导出/导入服务端点（如 *exportToMSProject*、*importFromMSProject*、*exportToPrimaveraP6*、*importFromPrimaveraP6*）。此端点支持**最大 40 MB** 的请求。

你可以通过导出配置对象中的 **server** 属性指定端点:

~~~js
gantt.importFromPrimaveraP6({
    server:"https://export.dhtmlx.com/gantt",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

如果未指定端点，则默认使用 <b>https://export.dhtmlx.com/gantt</b>。以下调用方式与上述相同:

~~~js
gantt.importFromPrimaveraP6({
    data: file,
    callback: function(project){
       // some logic
    }
});
~~~

对于超过 4MB 的大型项目，可以使用第二个端点:

~~~js
gantt.importFromPrimaveraP6({
    server:"https://export.dhtmlx.com/gantt/project",
    data: file,
    callback: function(project){
       // some logic
    }
}); 
~~~

该端点支持最大 40MB 的请求，并支持 Primavera P6 的导出和导入。它专为 Primavera P6 的导出和导入而设计。

请注意，其他方法如 *gantt.exportToPDF((server:"https://export.dhtmlx.com/gantt/project"))* 会导致服务器错误。

