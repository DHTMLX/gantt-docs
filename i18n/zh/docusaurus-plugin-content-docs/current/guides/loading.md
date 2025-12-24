---
title: "数据加载"
sidebar_label: "数据加载"
---

# 数据加载


dhtmlxGantt 支持两种数据格式用于加载信息:

- [XML](guides/supported-data-formats.md#xmldhtmlxgantt20)；
- [JSON](guides/supported-data-formats.md#json)。

要为甘特图填充数据，可以使用 [parse](api/method/parse.md) 或 [load](api/method/load.md) 方法。

~~~js
gantt.init("gantt_here");
gantt.load("tasks.json"); 
~~~


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


:::note
向 Gantt 提供不正确的数据可能导致其树状结构变为循环结构，从而引发 [cyclic reference error](faq.md#xunhuanyinyongcuowu)。
:::

## 从对象加载


如果你希望直接从对象加载数据，可以使用 [parse](api/method/parse.md) 方法:

**Loading from an inline data source**
~~~js
var data = {
  tasks:[
     {id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
     {id:2, text:"Task #1", start_date:"02-04-2020", duration:8, parent:1},
     {id:3, text:"Task #2", start_date:"11-04-2020", duration:8, parent:1}
   ]
};
gantt.init("gantt_here");
gantt.parse(data); /*!*/   
~~~


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


:::note
如果你的数据对象同时包含 "start_date" 和 "end_date"，但日期值仅包含日期部分（如 01-12-2021，没有时间），你可能需要进行额外设置。详情请参阅 [任务结束日期显示与包含结束日期](guides/loading.md#taskenddatedisplayampinclusiveenddates)。
:::

## 从服务器加载


### 客户端

若要从服务器获取数据，可以使用 [load](api/method/load.md) 方法:

**gantt.html**
~~~js
gantt.init("gantt_here");
gantt.load("data.json"); /*!*/   
~~~

*load* 方法会向指定的 URL 发送 AJAX 请求，并期望返回的数据为[支持的数据格式之一](guides/supported-data-formats.md)。
例如:

**data.json**
~~~js
{
  "tasks":[
     {"id":1, "text":"Project #1", "start_date":"01-04-2020", "duration":18},
     {"id":2, "text":"Task #1", "start_date":"02-04-2020","duration":8, "parent":1},
     {"id":3, "text":"Task #2", "start_date":"11-04-2020","duration":8, "parent":1}
  ],
  "links":[
     {"id":1, "source":1, "target":2, "type":"1"},
     {"id":2, "source":2, "target":3, "type":"0"}
  ]
}
~~~

你可以在方法的第二个参数中指定格式:"json"、"xml" 或 "oldxml"。

~~~js
gantt.load("data.xml", "xml");
~~~

### 服务器端

在服务器端，你可以有一个静态数据文件，或编写脚本从数据源收集数据并以响应形式返回。
服务器端的配置取决于你使用的框架。

:::note
关于不同平台的详细说明和代码示例，请参阅 [Server-Side Integration](guides/server-side.md#loadserverside)。
:::

例如，在 Node.js 中，你需要设置一个处理 Gantt 发送 AJAX 数据请求的 URL 路由。

~~~js
gantt.load("/data"); 
~~~

该路由将生成如下 JSON 响应:

~~~js
app.get("/data", function(req, res){
    db.query("SELECT * FROM gantt_tasks", function(err, rows){
        if (err) console.log(err);
        db.query("SELECT * FROM gantt_links", function(err, links){
            if (err) console.log(err);
            for (var i = 0; i < rows.length; i++){
                rows[i].start_date = rows[i].start_date.format("YYYY-MM-DD");
                rows[i].open = true;
            }
 
            res.send({ tasks:rows, links : links });
        });
    });
});
~~~

:::note
所有支持的数据格式可在 [지원되는 데이터 형식](guides/supported-data-formats.md) 查看。
::: 


## 任务日期的加载


### 定义任务计划

在数据中指定任务计划有三种方式:

- start_date + duration
- start_date + end_date
- duration + end_date

未提供的属性会由另外两个属性计算得出。


[Backward planning](https://docs.dhtmlx.com/gantt/samples/01_initialization/18_backward_planning.html)


**end_date** 优先于 **duration**。如果同时存在三个参数，Gantt 会忽略 **duration**，并根据 start 和 end 日期进行计算。例如:

~~~js
{
    "id":"20", "text":"Project #2", 
    "start_date":"01-04-2025", 
    "duration":3, 
    "end_date":"05-04-2025", 
    "order":10,"progress":0.4, 
    "type": "project", "open": true
}

// 上述任务实际加载时，duration 会根据 start 和 end 日期计算：
{
    "id":"20", "text":"Project #2", 
    "start_date":"01-04-2025", 
    "duration":4, 
    "end_date":"05-04-2025", 
    "order":10,"progress":0.4, 
    "type": "project", "open": true
}
~~~

## 使用 ISO 日期格式

Gantt 支持 ISO 日期格式。要启用此功能，需要重写解析和格式化日期的函数:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

## 动态更改日期格式

如果你希望动态更改[日期格式](api/config/date_format.md)，应像下面这样更新 [parse_date](api/template/parse_date.md) 模板:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

## 任务结束日期显示与包含结束日期

本节说明如何正确保存和显示任务的结束日期。

首先，考虑在处理任务日期时的两种常见场景:

#### 场景 1

- 任务持续时间以整天为单位（duration_unit="day"）
- 任务数据包含格式为 "%Y-%m-%d" 或 "%d-%m-%Y"（无时间部分）的开始和结束日期

由于 dhtmlxGantt 对任务结束日期的解释和存储方式，结果可能与你预期不同。

例如:

~~~js
gantt.parse({ tasks: [
    { 
        id: 1,
        text: "Task 1",
        start_date: "22-12-2021",
        end_date: "22-12-2021"
    }
]}, links:[]);

console.log(gantt.getTask(1).end_date);
// 2021年12月22日 00:00:00

console.log(gantt.getTask(1).duration);
// 0
~~~

在这种情况下，开始和结束日期指向同一时刻，因此任务持续时间为零。

#### 场景 2

- 网格中显示结束日期（End Date）
- 结束日期格式不包含时间

~~~js
gantt.config.columns = [
    {name: "text", label: "Name", tree: true, width: 200, resize: true},
    {name: "duration", label: "Duration", width:80, align: "center", resize: true},
    {name: "start_date", label: "Start", width:80, align: "center", resize: true},
    {name: "end_date", label: "Finish", width:80, align: "center", resize: true}
];

gantt.init("gantt_here");

gantt.parse({ tasks: [
    { 
        id: 1,
        text: "Task 1",
        start_date: "02-04-2020",
        end_date: "02-04-2020"
    }
]}, links:[]);
~~~

此时，Finish（end_date）显示为 4 月 3 日，尽管任务实际上在 4 月 2 日结束。

![](/img/end_date.png)

下文将解释 Gantt 如何存储结束日期。

### Gantt 如何存储结束日期

即使未指定时间部分（duration_unit = "day"），dhtmlxGantt 也始终将日期存储为 JavaScript Date 对象，其中包含时间组件。

结束日期的格式如下:

- 秒和毫秒始终为零，因为 Gantt 不支持小于一分钟的单位
- 结束日期表示最后一个活动日（或小时）之后的那一天（或小时）的开始。例如:
  - 任务从 4 月 2 日开始，持续 1 天，则开始和结束日期为:"02-04-2022 00:00:00 - 03-04-2022 00:00:00"。结束日期指向 4 月 3 日的开始。
  - 任务从 4 月 2 日 13:00 开始，持续 1 小时，则开始和结束日期为:"02-04-2022 13:00:00 - 02-04-2022 14:00:00"。结束日期指向下一小时的开始。

如果结束日期显示时不包含时间部分，可能会造成误解。在**场景 2** 的例子中，日期显示为 "02-04-2022 - 03-04-2022"，这可能被理解为 2 天任务，而实际只有 1 天。

这是默认行为。虽然这可能令人困惑，但可以通过配置选项进行调整，后续章节将对此进行介绍。

### **如何调整默认行为？**

**1)** 首先应避免直接更改甘特图中实际存储的任务日期。

你可能会考虑修改加载到甘特图中的任务日期，例如，将结束日期设置为 02-04-2022 23:59:59。但建议不要采用这种方式，因为这可能会导致任务工期计算和自动调度发生冲突。

**我们建议使用以下方法:**

**2a)** 如果你想调整甘特图中任务结束日期的显示格式（例如，将结束日期包含在任务工期内），可以重定义 [task_end_date](api/template/task_end_date.md) 模板。

下面以一个 2020 年 4 月 2 日开始、持续一天的任务为例，展示模板如何影响结束日期的显示。

默认情况下，任务的结束日期显示为 2020 年 4 月 3 日（`03-04-2020 00:00:00`）:

- [在线演示:默认格式](https://snippet.dhtmlx.com/5/24f73d6ec)

![task_end_date_template_default](/img/task_end_date_template_default.png)

但如果你使用了 [task_end_date](api/template/task_end_date.md) 模板，同样的任务将显示为在 2020 年 4 月 2 日完成:

- [在线演示:包含结束日期格式](https://snippet.dhtmlx.com/t1k1rwo7)

![task_end_date_template](/img/task_end_date_template.png)

代码示例如下:

~~~js
// 覆盖 columns 配置
gantt.config.columns = [
  {name: "wbs", label: "#", width: 60, align: "center", template: gantt.getWBSCode},
  {name: "text", label: "Name", tree: true, width: 200, resize: true},
  {name: "start_date", label: "Start", width:80, align: "center", resize: true},
  {name: "end_date", label: "Finish", width:80, align: "center", resize: true}, 
  {name:"add"}
];

// 重定义模板
gantt.templates.task_end_date = function(date){
   return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};
 
var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
   if(column === "end_date"){
     return gridDateToStr(new Date(date.valueOf() - 1)); 
   }else{
     return gridDateToStr(date); 
   }
}
gantt.init("gantt_here");
~~~

这种方式会更改任务结束日期在表格、弹窗标题以及所有显示结束日期的位置的显示。

如果你采用了 [包含结束日期格式](api/template/task_end_date.md) 并希望与表格中的 [内联编辑](guides/inline-editing.md) 顺利配合，需要为包含结束日期的编辑操作自定义一个编辑器，如下:

~~~js
// 包含结束日期的编辑器
// 使用默认编辑器，但重写 set_value/get_value 方法
var dateEditor = gantt.config.editor_types.date;
gantt.config.editor_types.end_date = gantt.mixin({
    set_value: function(value, id, column, node){
        var correctedValue = gantt.date.add(value, -1, "day");
        return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
    },
    get_value: function(id, column, node) {
        var selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
        return gantt.date.add(selectedValue, 1, "day");
    },
}, dateEditor);

var textEditor = {type: "text", map_to: "text"};
var startDateEditor = {type: "date", map_to: "start_date"};
var endDateEditor = {type: "end_date", map_to: "end_date"};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};

gantt.config.columns = [
    {name: "text", label: "Name", tree: true, width: 200, editor: textEditor, 
        resize: true},
    {name: "duration", label: "Duration", width:80, align: "center", 
        editor: durationEditor, resize: true},
    {name: "start_date", label: "Start", width:140, align: "center", 
        editor: startDateEditor, resize: true},
    {name: "end_date", label: "Finish", width:140, align: "center", 
        editor: endDateEditor, resize: true}
];

// 修改弹窗和表格模板，以包含结束日期的格式显示任务日期
gantt.templates.task_end_date = function(date){
    return gantt.templates.task_date(new Date(date.valueOf() - 1)); 
};

var gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");
gantt.templates.grid_date_format = function(date, column){
    if(column === "end_date"){
        return gridDateToStr(new Date(date.valueOf() - 1)); 
    }else{
        return gridDateToStr(date); 
    }
}
~~~


**Related example:** [包含结束日期的编辑器](https://snippet.dhtmlx.com/ds28tk3c)


**2b)** 如果你的应用其他部分需要将结束日期以"包含"格式存储--即任务从 2020 年 4 月 2 日开始，持续一天，存储为 start_date: "02-04-2022", end_date: "02-04-2022"--那么需要对结束日期做额外处理:

- 在加载数据到甘特图前，为结束日期加一天
- 在从甘特图保存数据回存储前，为结束日期减一天

## 数据属性


甘特图的数据源对象包含两类主要信息:

- **tasks** - 任务项。
- **links** - 依赖关系。

### 任务对象属性 {#task_properties}

:::note
你可以在 [任务属性](guides/task-properties.md) 文章中找到任务对象属性的完整列表。
:::

JSON 和 XML 数据的默认日期格式为 **"%d-%m-%Y %H:%i"**（参见 [日期格式规范](guides/date-format.md)）。


如需修改，请使用 [date_format](api/config/date_format.md) 配置项。

~~~js
gantt.config.date_format="%Y-%m-%d";
gantt.init("gantt_here");
~~~

加载到甘特图后，**start_date** 和 **end_date** 属性会被解析为 Date 对象。

如果你的日期格式不被 [date_format](api/config/date_format.md) 支持，可以通过 [parse_date](api/template/parse_date.md) 模板手动解析。

### 链接对象属性 {#link_properties}

:::note
链接对象属性的完整列表请参见 [链接属性](guides/link-properties.md) 文章。
:::

### 自定义属性

你不仅可以使用必需属性，还可以为数据项添加任意自定义属性。额外属性会被作为字符串解析并传递到客户端，你可以根据需要使用它们。

带有自定义属性的数据示例请见 [这里](guides/supported-data-formats.md)。

## 数据库结构


如果要与数据库配合使用，建议将任务和链接分别存储在两张表中。

![tutorial_db_tables](/img/tutorial_db_tables.png)

加载到甘特图的典型数据库结构如下:

<ul>
  <li><b>gantt_tasks</b> 表 - 存储甘特任务</li>
  <ul>
  <li><b>id</b> - (<i>string,number</i>) 任务 id。</li>
  <li><b>start_date</b> - (<i>Date</i>) 任务计划开始时间。</li>
  <li><b>text</b> - (<i>string</i>) 任务描述。</li>
  <li><b>progress</b> - (<i>number</i>) 0 到 1，任务完成百分比。</li>
  <li><b>duration</b> - (<i>number</i>) 任务工期（当前时间单位）。</li>
  <li><b>parent</b> - (<i>number</i>) 父任务 id。</li>
  <li><b>type</b> - (<i>string</i>) 可选，[任务类型](guides/task-types.md)。</li>
  <li><b>readonly</b> - (<i>boolean</i>) 可选，标记任务为 [只读](guides/readonly-mode.md)。</li>
  <li><b>editable</b> - (<i>boolean</i>) 可选，标记任务为 [可编辑](guides/readonly-mode.md)。</li>
  </ul>
  <li><b>gantt_links</b> 表 - 存储甘特依赖关系</li>
  <ul>
  <li><b>id</b> - (<i>string,number</i>) 链接 id。</li>
  <li><b>source</b> - (<i>number</i>) 源任务 id。</li>
  <li><b>target</b> - (<i>number</i>) 目标任务 id。</li>
  <li><b>type</b> - (<i>string</i>) 依赖类型:<ul><li>0 - 'finish_to_start'</li><li>1 - 'start_to_start'</li><li>2 - 'finish_to_finish'</li><li>3 - 'start_to_finish'</li></ul></li> 
  <li><b>lag</b> - (<i>number</i>) 可选，[任务间滞后](guides/auto-scheduling.md)。</li>
  <li><b>readonly</b> - (<i>boolean</i>) 可选，标记链接为 [只读](guides/readonly-mode.md)。</li>
  <li><b>editable</b> - (<i>boolean</i>) 可选，标记链接为 [可编辑](guides/readonly-mode.md)。</li>
  </ul>
</ul> 

创建两张表的 SQL 如下:

~~~js
CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
)
CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `progress` float NOT NULL,
  `sortorder` int(11) NOT NULL,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
)
~~~


## 事件流程


以下是与加载方法相关的事件流程:


### [gantt.parse()](api/method/parse.md):

- event [onBeforeParse](api/event/onbeforeparse.md) 
- event [onTaskLoading](api/event/ontaskloading.md) 
- event [onParse](api/event/onparse.md)  
- [gantt.render()](api/method/render.md)

### [gantt.load()](api/method/load.md)

- event [onLoadStart](api/event/onloadstart.md) 
- [gantt.parse()](api/method/parse.md)
- event [onLoadEnd](api/event/onloadend.md) 

### [gantt.refreshData()](api/method/refreshdata.md):

- event [onBeforeDataRender](api/event/onbeforedatarender.md) 
- event [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 
- event [onDataRender](api/event/ondatarender.md) 

### [gantt.render()](api/method/render.md):

- event [onBeforeGanttRender](api/event/onbeforeganttrender.md) 
- [gantt.refreshData()](api/method/refreshdata.md)
- event [onGanttRender](api/event/onganttrender.md)

