---
title: "dhtmlxGantt 与 dhtmlxConnector"
sidebar_label: "dhtmlxConnector"
---

# dhtmlxGantt 与 dhtmlxConnector

本教程将指导你如何在网页上搭建一个简单的甘特图，并实现将任务保存和更新到服务器端数据库的功能。


本文重点介绍如何使用 [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) 构建甘特图。
如果你更倾向于使用其他服务器端技术，可以参考以下针对不同集成方式的教程:

- [dhtmlxGantt와 PHP: Laravel 연동](integrations/php/howtostart-php-laravel.md)
- [dhtmlxGantt와 PHP:Slim3 사용하기](integrations/php/howtostart-php.md)
- [dhtmlxGantt와 Python](integrations/other/howtostart-python.md)
- [dhtmlxGantt와 Node.js 연동하기](integrations/node/howtostart-nodejs.md)
- [dhtmlxGantt와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxGantt와 Salesforce LWC 연동하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxGantt와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)

![gantt_basic](/img/gantt_basic.png)


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


## 步骤 1. 下载 dhtmlxGantt 包

<div>
<p>

首先，将该库包下载到你的电脑上。

<div>![finger](/img/finger.png) <span>请按照以下步骤操作:</span></div>

<ul>
  <li>如果尚未下载，请点击 <a href='https://github.com/DHTMLX/connector-php' title='dhtmlxConnector for PHP repository' target='_blank'>这里</a> 下载 dhtmlxGantt 包。</li>
  <li>将下载得到的包解压到本地 Web 服务器的根目录下。解压后文件会被放在以包名命名的文件夹中（如 dhtmlxGantt）。</li>
</ul>
</p>
</div>

## 步骤 2. 引入 dhtmlxGantt 代码文件

<div>
<p>
接下来，在 HTML 文件中引入 dhtmlxGantt 的代码文件，从而可以使用该库的功能。

需要引入的 dhtmlxGantt 代码文件有:

<ul>
  <li>dhtmlxgantt.js</li>
  <li>dhtmlxgantt.css</li>
</ul> 

<div>![finger](/img/finger.png) <span>请按照以下步骤操作:</span></div>

<ul>

- 在 'dhtmlxGantt' 文件夹内创建一个 HTML 文件，例如命名为 'myGantt.html'。
- 在 <b>myGantt.html</b> 中引入 dhtmlxGantt 的代码文件（两个文件都在 'codebase' 文件夹中）。

**myGantt.html**
~~~html
<!DOCTYPE html>
<html>
<head>
   <title>How to Start with dhtmlxGantt</title>
   <script src="codebase/dhtmlxgantt.js"></script> /*!*/  
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet"> /*!*/  
</head>
<body>
       //your code will be here
</body>
</html>
~~~

</ul> 

</p>
</div>

## 步骤 3. 初始化 dhtmlxGantt

<div>
<p>

然后，创建一个 DIV 容器，并在其中初始化 dhtmlxGantt。

 请注意，dhtmlxGantt 是一个静态对象，每个页面只能实例化一次。
你可以通过 <b>dhtmlxGantt</b> 或 <b>gantt</b> 来引用该实例。

<div>![finger](/img/finger.png) <span>请按照以下步骤操作:</span></div>

<ul>

- 在 <b>myGantt.html</b> 文件中添加一个 DIV 容器。
- 使用 <code>gantt.init("gantt_here")</code> 初始化 dhtmlxGantt。该方法参数为甘特图渲染的 HTML 容器的 ID。
  


**myGantt.html**
~~~html
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

</ul> 

</p>
</div>

如果你使用全屏模式，请添加如下 CSS 以保证显示正常:
~~~html
<style type="text/css" media="screen">
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~

## 步骤 4. 向甘特图加载数据

<div>

<p>
现在，我们将用一个示例数据源为甘特图填充数据。这里以内联对象作为数据源。


加载数据时，使用 [parse](api/method/parse.md) 方法，并将数据源作为参数传入。


对象属性说明如下:

<ul>
  <li><b>data</b> - 包含任务数据</li>
  <ul>
  <li><b>id</b> - (<i>string, number</i>) 任务唯一标识。</li>
  <li><b>start_date</b> - (<i>Date</i>) 任务计划开始时间。</li>
  <li><b>text</b> - (<i>string</i>) 任务描述。</li>
  <li><b>progress</b> - (<i>number</i>) 任务完成度，取值 0~1。</li>
  <li><b>duration</b> - (<i>number</i>) 任务持续时间，单位为当前时间刻度。</li>
  <li><b>parent</b> - (<i>number</i>) 父任务 ID（如有）。</li>
  </ul>
  <li><b>links</b> - 定义任务之间的依赖关系</li>
  <ul>
  <li><b>id</b>-(<i>string, number</i>) 依赖关系唯一标识。</li>
  <li><b>source</b>-(<i>number</i>) 源任务 ID。</li>
  <li><b>target</b>-(<i>number</i>) 目标任务 ID。</li>
  <li><b>type</b>-(<i>string</i>) 依赖类型:0 - '完成到开始'，1 - '开始到开始'，2 - '完成到完成'。</li>
  </ul>
</ul> 

<div>![finger](/img/finger.png) <span>请按照以下步骤操作:</span></div>

<ul>

- 在 <b>myGantt.html</b> 文件中声明 'tasks' 变量:


**myGantt.html**
~~~js
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
- 在 <code>gantt.init("gantt_here")</code> 之后，添加 <code>gantt.parse(tasks)</code> 命令:


**myGantt.html**
~~~js
gantt.init("gantt_here"); 
gantt.parse (tasks);/*!*/  
~~~

</ul>

</p>
</div>

[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)


## 步骤 5. 创建数据库

:::note
本步骤及后续步骤适用于需要从数据库加载数据而非使用内联数据的场景。
:::
<div>

<p>
接下来，需建立两个表，用于存储任务和依赖关系。


![/img/tutorial_db_tables.png](/img/tutorial_db_tables.png)


<i><b>sortorder</b> 字段仅在从数据库加载数据时使用，用于确定同级任务的顺序。</i>

<div>![finger](/img/finger.png) <span>请按照以下步骤操作:</span></div>

<ul>

- 创建名为 <i>gantt</i> 的新数据库。
- 运行以下 SQL 代码，创建 <i>gantt_tasks</i> 和 <i>gantt_links</i> 表:
  
~~~js
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

</ul> 

</p>
</div>

为确保任务即使某些字段为空也能正常保存，请在 **myGantt.html** 文件中添加如下代码:

**myGantt.html**
~~~js 
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    task.sortorder = 0;
    return true;
});
~~~

## 步骤 6. 从数据库加载数据

:::note
接下来的两个步骤将使用 PHP 进行前后端集成。

如果你使用其他平台，请参阅 [데이터 로딩](guides/loading.md) 文章，获取自定义服务器脚本的实现方法。
:::

<div>

<p>
现在，我们将实现从数据库加载数据到甘特图。使用 [load](api/method/load.md) 方法，该方法接收一个指向数据源的 URL。
对于数据库访问，该 URL 指向负责服务器端逻辑的 PHP 文件。


这里我们使用 PHP 和 [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) 库，简化 dhtmlxGantt 的服务器端集成。

<div>![finger](/img/finger.png) <span>请按照以下步骤操作:</span></div>

<ul>

- 在 'dhtmlxGantt' 文件夹内创建一个 PHP 文件，例如 <b>data.php</b>。
- 编辑 <b>data.php</b>，添加以下服务器端代码:


**data.php**
~~~php
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

- 在 <b>myGantt.html</b> 文件中，将 <code>gantt.config.date_format</code> 属性设置为 <i> "%Y-%m-%d %H:%i"</i>，以保证日期格式与 dhtmlxGantt 的格式一致。


**myGantt.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i";/*!*/ 
gantt.init("gantt_here");
~~~

- 调用 <code>gantt.load('data.php')</code>，即可将数据库中的数据加载到甘特图中。


**myGantt.html**
~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i";
gantt.init("gantt_here");
gantt.load('data.php');//loads data to Gantt from the database  /*!*/  
~~~

</ul> 

</p>
</div>

### 映射数据库列

请注意，在 **$connector->render_table** 方法中，列的顺序非常重要。列表中的前三列始终对应客户端任务对象的 *start_date/duration/text* 或 *start_date/end_date/text* 属性，无论你使用的列名是什么。具体映射逻辑如下所述。

如果在配置中指定了 'duration'，第二列会被分配给 *task.duration*:

~~~js
$gantt->render_table("gantt_tasks","id","Start,duration,Name,progress,parent","");
~~~

或者，使用别名:

~~~js
$gantt->render_table("gantt_tasks","id","Start,Length(duration),Name,progress,parent","");
// JS: task.start_date, task.duration, task.text, task.progress, task.parent
~~~

如果使用了不同的列名，第二列将会映射到 *end_date* 属性:

~~~js
$gantt->render_table("gantt_tasks","id","Start,End,Name,progress,parent","");
// JS: task.start_date, task.end_date, task.text, task.progress, task.parent
~~~

#### 映射其他列

所有其他列都将直接按照它们的名称进行映射，不做修改:

~~~js
$gantt->render_table("gantt_tasks","id","start_date,duration,text,custom,parent","");
// JS: task.start_date, task.duration, task.text, task.custom, task.parent
~~~

也可以为其他列使用别名:

~~~js
$gantt->render_table("gantt_tasks","id",
    "start_date,duration,text,custom_column(customProperty),parent","");
// JS: task.start_date, task.duration, task.text, task.customProperty, task.parent
~~~


## 第七步:更新数据库中的数据

<div>

<p>

接下来，需要确保在甘特图中所做的更改能够保存回数据库。为此，将使用 [dataProcessor](api/method/dataprocessor.md) 辅助库。该过程包括初始化 DataProcessor 并将其链接到 dhtmlxGantt 实例。

<div>![finger](/img/finger.png) <span>操作步骤如下:</span></div>

<ul>

- 打开 <b>myGantt.html</b> 文件，并使用 <code>dataProcessor("data.php")</code> 命令创建一个新的 dhtmlxDataProcessor 实例。
- 使用 <code>dp.init(gantt)</code> 将 dhtmlxDataProcessor 对象连接到 dhtmlxGantt 实例。


**myGantt.html**
~~~js
gantt.init("gantt_here");
gantt.load('data.php');
        
var dp="new" gantt.dataProcessor("data.php"); /*!*/ 
dp.init(gantt); /*!*/ 
~~~
</ul>
</p>
</div>

## 错误日志记录

如果一切设置无误但仍有问题，可以启用 Gantt 的日志功能来帮助定位问题。

首先，确保包含 HTML 文件的目录有写入权限。然后，在 **data.php** 文件中添加以下代码:

**data.php**
~~~php
$gantt = new JSONGanttConnector($res);

$gantt->enable_log("log.txt"); /*!*/
~~~

之后可以检查 **log.txt** 文件，查看日志信息。

## 下一步？

就是这样！现在已经有了一个可以从数据库加载数据并将修改保存回数据库的基本甘特图。
你可以根据具体需求对其进行调整和扩展。

如需进一步指导，建议阅读以下文章:

- [Configuration](guides/common-configuration.md)
- [이벤트 처리](guides/handling-events.md)
- [데이터 로딩](guides/loading.md)

