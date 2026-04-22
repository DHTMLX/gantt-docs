--- 
title: "dhtmlxGantt 与 dhtmlxConnector"
sidebar_label: "dhtmlxGantt 与 dhtmlxConnector"
---

# dhtmlxGantt 与 dhtmlxConnector

本教程将教你如何在网页上创建一个基本的甘特图，使其能够将任务保存到数据库（即服务器端）并进行更新。

当前教程旨在使用 [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) 创建 Gantt。
如果你想改用某种服务端技术，请查看下面列出的可用集成变体教程：

- [dhtmlxGantt 与 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt 与 Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt 与 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt 与 PHP:Slim3](integrations/php/howtostart-php.md)
- [dhtmlxGantt 与 PHP: Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt 与 Salesforce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt 与 Ruby on Rails](integrations/other/howtostart-ruby.md)

![gantt_basic](/img/gantt_basic.png)


**相关示例**: [基本初始化](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


### 第一步。下载 dhtmlxGantt 包

让我们从在你的计算机上获取库包开始本教程。

**请执行如下操作：**

<ul>
  <li>如果你还没有下载，请下载 dhtmlxGantt 包 <a href='https://github.com/DHTMLX/connector-php' title='dhtmlxConnector for PHP repository' target='_blank'>此处</a>。</li>
  <li>将包解压到本地 Web 服务器的根目录。解压后的文件将存放在与包文件同名的文件夹中——dhtmlxGantt。</li>
</ul>


## 第 2 步。引入 dhtmlxGantt 代码文件

接下来，需要在你的 HTML 文件中引入 dhtmlxGantt 的代码文件（以便能够使用库的功能）。 
dhtmlxGantt 的代码文件为：

- `dhtmlxgantt.js`
- `dhtmlxgantt.css`

**请执行以下操作：**

1. 在 `dhtmlxGantt` 文件夹中创建一个 HTML 文件（包含 dhtmlxGantt 文件的文件夹）。将其命名为，例如 `myGantt.html`。
2. 将 dhtmlxGantt 的代码文件引入到 **myGantt.html**（两个文件都位于 `codebase` 文件夹中）。请参阅 myGantt.html：

~~~html
<!DOCTYPE html>
<html>
<head>
  <title>How to Start with dhtmlxGantt</title>
  <script src="codebase/dhtmlxgantt.js"></script> <!-- important -->
  <link href="codebase/dhtmlxgantt.css" rel="stylesheet"> <!-- important -->
</head>
<body>
  <!-- your code will be here -->
</body>
</html>
~~~


## 第 3 步。初始化 dhtmlxGantt

<div>

接着，我们需要创建一个 DIV 容器并在其中初始化 dhtmlxGantt。

请注意，dhtmlxGantt 是一个静态对象，只能在页面上实例化一次。 
要引用 dhtmlxGantt 的实例，你可以使用 **dhtmlxGantt**，也可以简称为 **gantt**。

<div>
  <span>请执行以下操作：</span>
</div>

- 在 **myGantt.html** 文件中定义一个 DIV 容器。
- 使用 <code>gantt.init("gantt_here")</code> 命令初始化 dhtmlxGantt。  
  作为参数，该方法接收一个将放置甘特图的 HTML 容器。

~~~html title="myGantt.html"
<!DOCTYPE html>
<html>
<head>
   <title>How to Start with dhtmlxGantt</title>
   <script src="codebase/dhtmlxgantt.js"></script>
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">
</head>
<body>
	<div id="gantt_here" style='width:1000px; height:400px;'></div>
    <script type="text/javascript">
		gantt.init("gantt_here"); /*!*/  
	</script>
</body>
</html>
~~~

</div>
如果使用全屏模式，请指定当前样式以确保正确行为：

~~~js
<style type="text/css" media="screen">
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~

## 第 4 步。向甘特图加载数据

接着，我们需要用一个示例数据源的数据来填充甘特图。我们将使用最简单的方法，将数据源指定为一个内联对象。 
要加载数据，我们将使用 [parse] 方法（它以数据源的名称作为参数）。
该对象的属性如下：
<ul>
  <li><b>data</b> - 指定甘特任务</li>
  <ul>
  <li><b>id</b> - (<i>string, number</i>) 事件的 ID。</li>
  <li><b>start_date</b> - (<i>Date</i>) 事件开始计划的日期。 </li>
  <li><b>text</b> - (<i>string</i>) 任务描述。</li>
  <li><b>progress</b> - (<i>number</i>) 表示任务完成百分比的数字，范围从 0 到 1。 </li>
  <li><b>duration</b> - (<i>number</i>) 当前时间刻度单位中的任务持续时间。 </li>
  <li><b>parent</b> - (<i>number</i>) 父任务的 ID。 </li>
  </ul>
  <li><b>links</b> - 指定甘特图的依赖链接</li>
  <ul>
  <li><b>id</b>-(<i>string, number</i>) 事件的 ID。</li>
  <li><b>source</b>-(<i>number</i>) 源任务的 ID。 </li>
  <li><b>target</b>-(<i>number</i>) 目标任务的 ID。 </li>
  <li><b>type</b>-(<i>string</i>) 依赖类型：0 - 'finish to start'，1 - 'start to start'，2 - 'finish to finish'。 </li>
  </ul>
</ul> 

<div> <span>请执行以下操作：</span></div>


在 <b>myGantt.html</b> 文件中声明 'tasks' 变量：


~~~js title="myGantt.html"
var tasks = {
    data:[
        {id:1, text:"Project #1",start_date:"01-04-2013", duration:11,
        progress: 0.6, open: true},
        {id:2, text:"Task #1",     start_date:"03-04-2013", duration:5, 
        progress: 1,   open: true, parent:1},
        {id:3, text:"Task #2",   start_date:"02-04-2013", duration:7, 
        progress: 0.5, open: true, parent:1},
        {id:4, text:"Task #2.1", start_date:"03-04-2013", duration:2, 
        progress: 1,   open: true, parent:3},
        {id:5, text:"Task #2.2", start_date:"04-04-2013", duration:3, 
        progress: 0.8, open: true, parent:3},
        {id:6, text:"Task #2.3", start_date:"05-04-2013", duration:4, 
        progress: 0.2, open: true, parent:3}
    ],
    links:[
        {id:1, source:1, target:2, type:"1"},
        {id:2, source:1, target:3, type:"1"},
        {id:3, source:3, target:4, type:"1"},
        {id:4, source:4, target:5, type:"0"},
        {id:5, source:5, target:6, type:"0"}
    ]
};
~~~

在 <code>gantt.init("gantt_here")</code> 行之后调用 <code>gantt.parse(tasks)</code> 命令：

~~~js title="myGantt.html"
gantt.init("gantt_here"); 
gantt.parse (tasks);/*!*/  
~~~

**相关示例**: [基本初始化](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


## 第 5 步。创建数据库

:::note
如果你想从数据库加载数据，而不是从内联对象加载，请阅读此处及后续步骤。
:::

接着，我们需要创建一个包含 2 张表的数据库，用于存储任务和依赖关系。 
<i><b>sortorder</b> 是仅在从数据库加载数据时使用的属性。该属性用于在同级任务之间设定索引。</i>
<span>请执行以下操作：</span>
创建一个名为 - <i>gantt</i> 的新数据库。
在其中执行以下代码以创建 2 张表：<i>gantt_tasks</i> 和 <i>gantt_links</i>。

~~~sql
CREATE TABLE `gantt_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `gantt_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL DEFAULT 0,
  `progress` float NOT NULL DEFAULT 0,
  `sortorder` int(11) NOT NULL DEFAULT 0,
  `parent` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);
~~~


要在某一列为空时也能够将任务保存到数据库，请将以下代码添加到 **myGantt.html** 文件中：

~~~js title="myGantt.html"
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    task.sortorder = 0;
    return true;
});
~~~


## 第 6 步。从数据库加载数据

:::note
在接下来的两步中，我们将使用 PHP 平台来实现服务器端与客户端的集成。

如果你使用的是其他平台，请阅读文章 [](guides/loading.md) 以了解如何自行实现服务器端脚本。
:::


接着，我们需要提供一个在图表中显示来自数据库的数据的能力。我们将使用 [load] 方法（它以数据源的 URL 作为参数）。在数据库的情形下，它是一个实现与服务器端连接的 PHP 文件。我们将使用 PHP 平台以及 <a href="https://docs.dhtmlx.com/connector__php__index.html">dhtmlxConnector</a> 库，因为这是为 dhtmlxGantt 实现服务器端逻辑的最简单方式。
<span>请执行以下操作：</span>
在 'dhtmlxGantt' 文件夹中创建一个 PHP 文件，命名为，例如 <b>data.php</b>。
打开 <b>data.php</b> 文件并添加以下服务器端代码：

~~~php title="data.php"
<?php

include ('codebase/connector/gantt_connector.php');

$res = new PDO("mysql:host=localhost;dbname=gantt", "root", "");

$gantt = new JSONGanttConnector($res);
$gantt->render_links("gantt_links","id","source,target,type");
$gantt->render_table(
    "gantt_tasks",
    "id",
    "start_date,duration,text,progress,sortorder,parent"
);
?>
~~~

切换回 <b>myGantt.html</b> 文件，将 <code>gantt.config.date_format</code> 属性设置为 <i> "%Y-%m-%d %H:%i"</i>，以使输出数据的格式与 dhtmlxGantt 的格式兼容。

~~~js title="myGantt.html"
gantt.config.date_format = "%Y-%m-%d %H:%i";/*!*/ 
gantt.init("gantt_here");
~~~


调用 <code>gantt.load('data.php')</code> 命令，将数据库中的数据加载到 Gantt 图上。

~~~js title="myGantt.html"
gantt.config.date_format = "%Y-%m-%d %H:%i";
gantt.init("gantt_here");
gantt.load('data.php');//loads data to Gantt from the database  /*!*/  
~~~


### 映射数据库列

请注意，在 **$connector->render_table** 的列顺序是很重要的。列列表中的前 3 列将分别映射到客户端任务对象的 *start_date/duration/text* 或 *start_date/end_date/text* 属性，无论你指定的列名为何。下面描述了列映射的逻辑。

第二列被映射到 *task.duration*，如果在配置中指定了 'duration'：

~~~js
$gantt->render_table("gantt_tasks","id","Start,duration,Name,progress,parent","");
~~~


或，使用别名：

~~~js
$gantt->render_table("gantt_tasks","id","Start,Length(duration),Name,progress,parent","");
 // JS: task.start_date, task.duration, task.text, task.progress, task.parent
~~~


如果设置了其他列名，第二列将映射到 *end_date* 属性：

~~~js
$gantt->render_table("gantt_tasks","id","Start,End,Name,progress,parent","");
 // JS: task.start_date, task.end_date, task.text, task.progress, task.parent
~~~


#### 映射其他列

所有其他列将按名称映射，且不做改动：

~~~js
$gantt->render_table("gantt_tasks","id","start_date,duration,text,custom,parent","");
 // JS: task.start_date, task.duration, task.text, task.custom, task.parent
~~~


别名也可用于其他列：

~~~js
$gantt->render_table("gantt_tasks","id",
    "start_date,duration,text,custom_column(customProperty),parent","");
 // JS: task.start_date, task.duration, task.text, task.customProperty, task.parent
~~~


## 第 7 步。更新数据库中的数据

然后，我们需要提供将甘特图中的变更保存到数据库的能力。为此，我们将使用 [DataProcessor] 助手库。所需做的就是初始化 DataProcessor 并将其附加到 dhtmlxGantt 对象。

<span>请执行以下操作：</span>

打开 <b>myGantt.html</b> 文件，使用 <code>dataProcessor("data.php")</code> 命令初始化 dhtmlxDataProcessor。用 <code>dp.init(gantt)</code> 命令将 dhtmlxDataProcessor 对象附加到 dhtmlxGantt 对象。

~~~js title="myGantt.html"
gantt.init("gantt_here");
gantt.load('data.php');
        
var dp="new" gantt.dataProcessor("data.php"); /*!*/ 
dp.init(gantt); /*!*/ 
~~~

## 记录错误

如果你完成了上述步骤仍然有问题，请在 Gantt 中启用日志记录以检测错误。

首先，确保 HTML 文件所在的目录具有写入权限。然后在 **data.php** 文件中添加以下行：

~~~php title="data.php"
$gantt = new JSONGanttConnector($res);

$gantt->enable_log("log.txt"); /*!*/
~~~

之后，你可以在 **log.txt** 文件中查看日志。

## 接下来怎么做？

就这些。一个可以从数据库加载数据并将修改保存回数据库的基本但可用的甘特图已经就绪。
现在你可以据此进行配置和定制，以满足你的所有需求。

我们建议你将以下文章作为下一步阅读：

- [配置](guides/common-configuration.md)
- [事件处理](guides/handling-events.md)
- [数据加载](guides/loading.md)