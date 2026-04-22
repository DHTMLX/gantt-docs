---
title: "数据加载"
sidebar_label: "数据加载"
---

# 数据加载

dhtmlxGantt 可以接受两种数据格式：

- [XML](guides/supported-data-formats.md#xmldhtmlxgantt20);
- [JSON](guides/supported-data-formats.md).

要用数据填充甘特图，请使用 [parse] 或 [load] 方法。

~~~js
gantt.init("gantt_here");
gantt.load("tasks.json"); 
~~~


**相关示例**: [Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


:::note
如果向 Gantt 传递了不正确的数据，其树状结构将变为循环结构，从而导致 [cyclic reference error](faq.md#cyclic-reference-error)。
:::

## 从对象加载

要从对象加载数据，请使用 [parse] 方法：

~~~jsx title="Loading from an inline data source"
const data = {
    tasks: [
        { id: 1, text: "Project #1", start_date: "01-12-2025", duration: 18 },
        { id: 2, text: "Task #1",    start_date: "02-12-2025", duration: 8, parent: 1 },
        { id: 3, text: "Task #2",    start_date: "11-12-2025", duration: 8, parent: 1 }
    ]
};

gantt.init("gantt_here");
gantt.parse(data); /*!*/ 
~~~


**相关示例**: [Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


:::note
如果数据对象同时包含 "start_date" 和 "end_date" 值，且日期值仅包含日期部分（即 01-12-2025 而非 01-12-2025 00:00）- 你可能需要额外的配置。请务必查看本文 [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates)。
:::

## 从服务器加载

### 客户端

要从服务器加载数据，请使用 [load](api/method/load.md) 方法：

~~~jsx title="gantt.html"
gantt.init("gantt_here");
gantt.load("data.json"); /*!*/   
~~~

*load* 方法将向指定的 URL 发送 AJAX 请求，并期望得到按 [支持的数据格式之一](guides/supported-data-formats.md) 的数据响应。
例如：

~~~jsx title="data.json"
{
    "tasks": [
        { "id": 1, "text": "Project #1", "start_date": "01-12-2025", "duration": 18 },
        { "id": 2, "text": "Task #1", "start_date": "02-12-2025", "duration": 8,"parent": 1 },
        { "id": 3, "text": "Task #2", "start_date": "11-12-2025", "duration": 8, "parent": 1 }
    ],
    "links": [
        { "id": 1, "source": 1, "target": 2, "type": "1" },
        { "id": 2, "source": 2, "target": 3, "type": "0" }
    ]
}
~~~

格式在该方法的第二个参数中指定： "json"、"xml" 或 "oldxml"。

~~~js
gantt.load("data.xml", "xml");
~~~

### 服务器端

在服务器端，你可以有一个带数据的静态文件，或一个脚本从数据源收集数据并将其写入响应。 服务器端实现取决于你想使用的框架。 

:::note
请参阅文章 [](guides/server-side.md#loadserverside) 以获取各种平台的详细说明和代码示例。
:::

例如，在 Node.js 的情况下，我们应为 Gantt 将要向其发送数据的 URL 添加一个服务器路由。

~~~js
gantt.load("/data"); 
~~~

它将生成对应的 JSON 格式响应。 

~~~js
app.get("/data", (req, res) => {
    db.query("SELECT * FROM gantt_tasks", (err, tasks) => {
        if (err) console.log(err);

        db.query("SELECT * FROM gantt_links", (err, links) => {
            if (err) console.log(err);

            tasks.forEach((task) => {
                task.start_date = task.start_date.format("YYYY-MM-DD");
                task.open = true;
            });

            res.send({ tasks, links });
        });
    });
});
~~~

:::note
请参阅文章 [Supported Data Formats](guides/supported-data-formats.md) 以获取全部支持的数据格式。
:::


## 以 ISO 格式加载日期 {#loadingtaskdates}

### 设置任务计划

在数据源中定义任务的计划有三种方式：

- start_date + duration
- start date + end_date
- duration + end_date

未指定的属性将基于数据对象中已定义的属性来计算。


**相关示例**: [Backward planning](https://docs.dhtmlx.com/gantt/samples/01_initialization/18_backward_planning.html)


 End_date 具有比 duration 参数更高的优先级。如果在任务对象中指定了 3 个参数，Gantt 将忽略 duration 参数，任务将以不同的持续时间加载。例如：

~~~js {4,13}
{
    "id": "20", "text": "Project #2",
    "start_date": "01-12-2025",
    "duration": 3, 
    "end_date": "05-12-2025",
}

// 上例中的任务将按指定的 'start_date' 和 'end_date' 计算得到的持续时间加载
{
    "id": "20", "text": "Project #2",
    "start_date": "01-12-2025",
    "duration": 4, 
    "end_date": "05-12-2025",
}
~~~

## 以 ISO 格式加载日期

自 v9.1.3 以来，Gantt 会自动检测并解析 ISO 8601 日期字符串。无需配置。

支持的格式：

- `2026-01-06` - 仅日期
- `2026-01-06T10:30:00` - 日期和时间
- `2026-01-06T10:30:00.000` - 日期和时间，带毫秒
- `2026-01-06T10:30:00.000Z` - UTC
- `2026-01-06T10:30:00+02:00` - 带时区偏移

~~~js
gantt.parse({
    tasks: [
        { id: 2, text: "Task #1", start_date: "2026-01-06T10:30:00Z", duration: 3 }
    ],
    links: []
});
// ISO 日期会自动解析 - 不需要模板覆盖
~~~

当输入中检测到 ISO 日期时，在传给 [DataProcessor](guides/server-side.md) 时会自动将其序列化回 ISO 字符串。仅日期字符串（例如，"2026-01-06"）会序列化回仅日期字符串，保持原始格式。如果输入包含日期只部分和完整日期时间字符串的混合，所有日期都将序列化为完整日期时间。

:::note
日期仅字符串（例如，"2026-01-06"）在设置 `server_utc` 为 `false`（默认）时，解析为本地午夜时间。

:::

:::note
如果你显式覆盖了 `gantt.templates.parse_date` 或 `gantt.templates.format_date`，你的函数将优先于 ISO 自动检测和自动序列化。

:::

:::tip Gantt v9.1.2 及更早版本
在 v9.1.3 之前的版本中，ISO 日期不会自动检测。如果你使用较旧的版本，需要覆盖 `parse_date` 与 `format_date` 模板来处理 ISO 字符串：

~~~js
gantt.templates.parse_date = (date) => {
    return new Date(date);
};

gantt.templates.format_date = (date) => {
    return date.toISOString();
};
~~~

在 v9.1.3 及以上版本，这些模板仍然作为非 ISO 日期字符串的后备使用。请参阅 [gantt.date.parseDate()](api/other/date.md#parsedatedate-format) 获取完整的解析流程。
:::

## 动态更改日期格式

如果你需要动态更改 [date format](api/config/date_format.md)，有必要按以下方式修改 [parse_date](api/template/parse_date.md) 模板：

~~~js
const cfg = gantt.config;
const strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = (date) => {
    return strToDate(date);
};
~~~

## 任务结束日期显示 & 包含结束日期 {#taskenddatedisplayampinclusiveenddates}

本小节将回答一个问题：“如何正确保存并显示任务的结束日期？”

首先，考虑在处理任务日期时你可能遇到的两种情形：

#### 情况 1

- 当任务持续时间以整日为单位（duration_unit="day"）
- 当任务数据对象包含以 "%Y-%m-%d" 或 "%d-%m-%Y" 格式表示的开始和结束日期（即不包含时分秒部分）

由于 dhtmlxGantt 解释并存储任务结束日期的细节，结果日期可能与预期不符。

请看以下示例：

~~~js
gantt.parse({
    tasks: [
        { 
            id: 1,
            text: "Task 1",
            start_date: "22-12-2025",
            end_date: "22-12-2025"
        }
    ],
    links: []
});

console.log(gantt.getTask(1).end_date);
// 22 December 2025 00:00:00

console.log(gantt.getTask(1).duration);
// 0
~~~

在这个示例中，开始日期和结束日期指向同一时间点，任务持续时间将为 0。

#### 情况 2

- 当在网格中显示任务的 End Date
- 并且结束日期的格式不包含时分部分

~~~js
gantt.config.columns = [
    { name: "text", label: "Name", tree: true, width: 200, resize: true },
    { name: "duration", label: "Duration", width: 80, align: "center", resize: true },
    { name: "start_date", label: "Start", width: 80, align: "center", resize: true },
    { name: "end_date", label: "Finish", width: 80, align: "center", resize: true }
];

gantt.init("gantt_here");

gantt.parse({
    tasks: [
        { 
            id: 1,
            text: "Task 1",
            start_date: "22-12-2025",
            end_date: "23-12-2025"
        }
    ],
    links: []
});
~~~

在这个示例中，Finish 日期（任务的 end_date）被指定为 23 日，而任务本身在 22 日结束的时间点结束。

![end_date](/img/end_date.png)

下面将解释 Gantt 如何存储结束日期的细节。

### Gantt 如何存储结束日期

即使你没有为任务日期指定时分部分（duration_unit = "day"），Gantt 客户端仍然将其以 JS Date 保存，该对象具有小时、分钟、秒和毫秒部分。

当前结束日期的格式如下：

- 日期的秒和毫秒部分始终为 0，Gantt 不支持小于 1 分钟的单位
- 任务结束日期被指定为当天的开始时间（一天中的开始时间）紧接着前一个忙碌日的下一日的开始时间。也就是说：
  - 例如开始于 12 月 22 日并持续 1 天的任务，其起始和结束日期将为：`"22-12-2025 00:00:00 - 23-12-2025 00:00:00"`。结束日期将与 12 月 22 日之后一天的开始日期相匹配
  - 例如开始于 12 月 22 日 13:00 并持续 1 小时的任务，其起始和结束日期将为：`"22-12-2025 13:00:00 - 22-12-2025 14:00:00"`。结束日期将与下一小时的开始日期相匹配

如果在屏幕上显示结束日期而不设置时分部分，结果可能会让人产生误导。在“情景 2”的示例中，开始和结束日期将显示为 *"22-12-2025 - 23-12-2025"*，这会让你以为该任务持续了 2 天（从 22 日到 23 日）。

这是默认行为，可能会让你困惑，但可以通过配置来修正。在接下来的部分，我们将展示几种处理方法。

### 如何改变默认行为

1) 第一个你*不应该做*的事，是修改 Gantt 中实际存储的任务日期。

你也可能希望修改加载到 Gantt 的任务日期，即将结束日期指定为 22-12-2025 23:59:59。但*最好不要这样做*，因为这样的决定可能会与任务持续时间的计算和自动排程发生冲突。

2) 我们建议你使用以下方法：

2a) 要改变 Gantt 中任务结束日期的格式（即在任务持续时间中包含结束日期），你可以重新定义 [task_end_date](api/template/task_end_date.md) 模板。

让我们取一个在 2025 年 12 月 22 日开始并持续 1 天的任务，看看模板如何改变结束日期。

默认情况下，该任务的结束日期应显示为 2025 年 12 月 23 日（`23-12-2025 00:00:00`）：

- [Live demo: Default format]

![task_end_date_template_default](/img/task_end_date_template_default.png)

但如果你应用 [task_end_date](api/template/task_end_date.md) 和 [grid_date_format](api/template/grid_date_format.md) 模板，同一任务将于 2025 年 12 月 22 日结束：

- [Live demo: Inclusive end date format]

![task_end_date_template](/img/task_end_date_template.png)

代码如下：

~~~js
// Redefine the template
gantt.templates.task_end_date = (date) => {
    return gantt.templates.task_date(new Date(date.valueOf() - 1));
};

const gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");

gantt.templates.grid_date_format = (date, column) =>  {
    if (column === "end_date") {
        return gridDateToStr(new Date(date.valueOf() - 1));
    } else {
        return gridDateToStr(date);
    }
};

gantt.init("gantt_here");
~~~

通过这种方式，你可以在网格、Lightbox 头部以及需要显示结束日期的其他位置，显示任务的结束日期。

如果你使用 [Inclusive end dates] 的格式（task_end_date 模板）并希望它在网格中的内联编辑与之配合正确，你需要为编辑任务的包容性结束日期创建一个专门的编辑器，例如：

~~~js
// 包含结束日期的编辑器
// 使用默认编辑器，但重写 set_value/get_value 方法
const dateEditor = gantt.config.editor_types.date;

gantt.config.editor_types.end_date = gantt.mixin(
    {
        set_value: (value, id, column, node) => {
            const correctedValue = gantt.date.add(value, -1, "day");
            return dateEditor.set_value.apply(this, [correctedValue, id, column, node]);
        },
        get_value: (id, column, node) => {
            const selectedValue = dateEditor.get_value.apply(this, [id, column, node]);
            return gantt.date.add(selectedValue, 1, "day");
        },
    },
    dateEditor
);

const textEditor = { type: "text", map_to: "text" };
const startDateEditor = { type: "date", map_to: "start_date" };
const endDateEditor = { type: "end_date", map_to: "end_date" };
const durationEditor = { type: "number", map_to: "duration", min: 0, max: 100 };

gantt.config.columns = [
    { name: "text", label: "Name", tree: true, width: 200, editor: textEditor, resize: true },
    { name: "duration", label: "Duration", width: 80, align: "center", editor: durationEditor, resize: true },
    { name: "start_date", label: "Start", width: 140, align: "center", editor: startDateEditor, resize: true },
    { name: "end_date", label: "Finish", width: 140, align: "center", editor: endDateEditor, resize: true }
];

// 修改弹窗和表格模板，以包含结束日期的格式显示任务日期
gantt.templates.task_end_date = (date) => {
    return gantt.templates.task_date(new Date(date.valueOf() - 1));
};

const gridDateToStr = gantt.date.date_to_str("%Y-%m-%d");

gantt.templates.grid_date_format = (date, column) => {
    if (column === "end_date") {
        return gridDateToStr(new Date(date.valueOf() - 1));
    } else {
        return gridDateToStr(date);
    }
};
~~~

**相关示例**: [Inclusive end date editor](https://snippet.dhtmlx.com/ds28tk3c)

2b) 如果应用程序的其他部分需要将结束日期以“包含”格式存储——即一个在 2025 年 12 月 22 日开始并持续 1 天的任务需要以 start_date: "22-12-2025", end_date: "22-12-2025" 进行存储——你需要对结束日期进行额外处理，即：

- 在将数据加载到 gantt 之前给结束日期加一天
- 在将从 gantt 收到的变更保存回数据存储前从结束日期减一天

## 数据属性 {#dataproperties}

Gantt 图的数据源是一个对象，存储两种信息：

- **tasks** - 任务项。
- **links** - 依赖链接项。


### 任务对象的属性 {#task_properties}

:::note
任务对象的全部属性列表请参阅 [Task properties](guides/task-properties.md) 文章。
:::

JSON 与 XML 数据的默认日期格式为 **"%d-%m-%Y %H:%i"**（请参阅 [date format specification](/guides/date-format/)）。

要修改它，请使用 [date_format](api/config/date_format.md) 配置选项。

~~~js
gantt.config.date_format="%Y-%m-%d";
gantt.init("gantt_here");
~~~

加载到 Gantt 后，**start_date** 与 **end_date** 属性将被解析为 Date 类型。 

不受 [date_format](api/config/date_format.md) 配置支持的日期格式，可以通过 [parse_date](api/template/parse_date.md) 模板手动解析。

### 链接对象的属性 {#link_properties}

:::note
链接对象的全部属性列表请参阅 [Link properties](guides/link-properties.md) 文章。
:::

### 自定义属性

你并不限于以上列出的强制属性，可以向数据项添加任意自定义属性。
额外的数据属性将被解析为字符串并加载到客户端，你可以按需要使用它们。

请参阅具有自定义属性的数据示例 [此处](/guides/supported-data-formats#custom-properties-in-data)。


## 数据库结构 {#databasestructure}

如果使用数据库，我们建议将数据分成两张独立的表来存储数据：一张用于任务，一张用于链接。

![tutorial_db_tables](/img/tutorial_db_tables.png)

将任务和链接加载到 Gantt 图的标准数据库结构如下：

<ul>
  <li><b>gantt_tasks</b> 表 - 指定 Gantt 任务</li>
  <ul>
  <li><b>id</b> - (<i>string,number</i>) 事件 ID。</li>
  <li><b>start_date</b> - (<i>Date</i>) 任务计划开始的日期。 </li>
  <li><b>text</b> - (<i>string</i>) 任务的描述。</li>
  <li><b>progress</b> - (<i>number</i>) 介于 0 到 1 之间的数字，表示任务完成的百分比。 </li>
  <li><b>duration</b> - (<i>number</i>) 任务在当前时间刻度单位中的持续时间。 </li>
  <li><b>parent</b> - (<i>number</i>) 父任务的 ID。 </li>
  <li><b>type</b> - (<i>string</i>) 可选，任务的 [type](guides/task-types.md)。 </li>
  <li><b>readonly</b> - (<i>boolean</i>) 可选，可以将任务标记为 [readonly](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)。 </li>
  <li><b>editable</b> - (<i>boolean</i>) 可选，可以将任务标记为 [editable](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)。 </li>
  </ul>
  <li><b>gantt_links</b> 表 - 指定 Gantt 依赖链接</li>
  <ul>
  <li><b>id</b> - (<i>string,number</i>) 事件 ID。</li>
  <li><b>source</b> - (<i>number</i>) 源任务的 ID。 </li>
  <li><b>target</b> - (<i>number</i>) 目标任务的 ID。 </li>
  <li><b>type</b> - (<i>string</i>) 依赖的类型：<ul><li>0 - 'finish_to_start'</li><li>1 - 'start_to_start'</li> <li>2 - 'finish_to_finish'</li><li>3 - 'start_to_finish'</li></ul> </li> 
  <li><b>lag</b> - (<i>number</i>) 可选，[任务延迟](/guides/auto-scheduling#settinglagandleadtimesbetweentasks)。 </li>
  <li><b>readonly</b> - (<i>boolean</i>) 可选，可以将链接标记为 [readonly](guides/readonly-mode.md)。 </li>
  <li><b>editable</b> - (<i>boolean</i>) 可选，可以将链接标记为 [editable](guides/readonly-mode.md)。 </li>
  </ul>
</ul> 

使用以下 SQL 语句创建包含上述 2 张表的数据库：

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


## 事件流 {#eventsflow}

与加载相关的方法具有以下事件流：


#### [gantt.parse()](api/method/parse.md):

- [onBeforeParse](api/event/onbeforeparse.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onParse](api/event/onparse.md)
- [render](api/method/render.md)

#### [gantt.load()](api/method/load.md):

- [onLoadStart](api/event/onloadstart.md)
- [parse](api/method/parse.md)
- [onLoadEnd](api/event/onloadend.md)

#### [gantt.refreshData()](api/method/refreshdata.md):

- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)
- [onDataRender](api/event/ondatarender.md)

#### [gantt.render()](api/method/render.md):

- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [refreshData](api/method/refreshdata.md)
- [onGanttRender](api/event/onganttrender.md)