---
title: "FAQ"
sidebar_label: "FAQ"
---

FAQ
==============

如何打开示例
---------------------

组件的分发包中包含一个演示后端应用程序，可用于在本地运行示例。
该应用程序需要 [Node.js](https://nodejs.org/en/)，并为演示使用内存存储，后端本应存储数据（即无需设置数据库）。

### 运行示例的方法

1) 使用基于 Node.js 的演示后端应用程序:

- 将压缩包解压到某个文件夹
- 打开终端（或 cmd、PowerShell）
- 运行 `npm install`
- 运行 `npm run start`
- 在浏览器中打开 `http://localhost:9200`
- 你应该能看到与我们在线示例页面 **https://docs.dhtmlx.com/gantt/samples/** 相同的索引页

2) 使用 Apache Web 服务器

- 安装 Apache Web 服务器。如果你不确定如何安装，建议使用 [XAMPP](https://www.apachefriends.org/index.html)。
- 将 Gantt 示例放到 apache 的文档根目录下（如果安装了 XAMPP，则为 *xampp/htdocs*）。
- 启动 Apache Web 服务器后，可以通过 **http://localhost/yourfolder** 访问示例。

3) 使用集成开发环境（IDE）内置的开发 Web 服务器

部分 IDE 提供内置开发 Web 服务器，例如: 
[https://www.jetbrains.com/help/webstorm/creating-local-server-configuration.html](https://www.jetbrains.com/help/webstorm/creating-local-server-configuration.html)。 
你可以查找自己所用的 IDE 是否内置或通过插件支持类似功能。

### 为什么需要这样做

我们包中的部分示例通过 AJAX（xhr）从 JSON 文件加载数据。要使其正常工作，示例必须通过 Web 服务器打开。

如果你通过双击直接打开示例，浏览器会以文件方式打开。在这种模式下，浏览器会阻止 AJAX 调用，组件将无法加载数据文件。 
你会在屏幕右上角看到 *Invalid data* 的弹窗提示。

为了确认你的情况是否属于上述情形，可以检查浏览器导航栏中的 URL。如果 URL 使用 *file:///* 格式，例如: 
**file:///D:/www/gantt-eval/samples/11_resources/09_resource_histogram.html** 

那么就是这种情况。此时，依赖文件加载数据的示例将无法正常工作。

如果你从 Web 服务器打开示例，URL 会如下所示（*http://* 可能被省略）: 
**http://localhost/gantt-eval/samples/11_resources/09_resource_histogram.html**

甘特图未正确渲染
-----------------------------------------

如果页面上的甘特图未能正确渲染，请检查图表容器的 CSS 样式--必须为其指定有效的像素或百分比尺寸。


- 如果尺寸使用百分比，请确保父容器也指定了高度。
- 如果甘特图直接放在 body 中，请添加如下 CSS 样式以正确使用百分比高度:

~~~js
html, body{
    margin:0px;
    padding:0px;
    height:100%; /*必须*/
    overflow:hidden;
}
~~~

甘特图在 Internet Explorer 中未正确渲染
---------------------------------------------------------

如果甘特图仅在 Internet Explorer 浏览器中未能正确渲染，请确保页面使用了完整的 DOCTYPE 声明。
dhtmlxGantt 可以在 IE6、IE7 和 IE8 的标准模式下正常工作，但不支持 IE 的怪异模式（quirks mode）。

例如，HTML5 DOCTYPE 如下:

~~~html
<!DOCTYPE html>
~~~

右上角出现错误提示
-----------------------------------------

![error_alert](/img/error_alert.png)

首先，需要确定错误的原因。

这些消息在组件无法正常工作时出现。 
它们通常表明数据或应用逻辑存在真实问题。因此，仅仅隐藏这些提示会掩盖问题，可能会在应用的其他部分再次出现。

不过，在将应用交付给最终用户前，也许你希望禁用这些消息。此时可以使用 [show_errors](api/config/show_errors.md) 的配置项:

~~~js
gantt.config.show_errors = false;
~~~

甘特图没有显示任何内容
--------------------------

最常见的两种情况:

1. 你尝试手动实现后端 API，或按照我们的 [教程](integrations/howtostart-guides.md) 实现，但打开页面时甘特图没有显示任何任务或链接。

或

2. 你在保存更改到后端时遇到问题。

请查阅 [백엔드 통합 문제 해결](guides/troubleshooting.md) 文章，按照指引查找问题原因。

如何将任务的最后一天计入持续时间
---------------------------------------------------------- 

你可能注意到，如果日期以天为单位指定且没有小时和分钟部分，且开始和结束日期相同，则任务的持续时间会被计算为 0 天而不是 1 天。

再举一个例子，开始和结束日期分别为 "01-12-2021" 和 "05-12-2021"。你可能认为任务应持续 5 天（从 12 月 1 日到 5 日），但 gantt 计算出的持续时间是 4 天。

~~~js
gantt.parse({ tasks: [
    { 
        id: 1,
        text: "Task 1",
        start_date: "01-12-2021",
        end_date: "05-12-2021"
    }
]}, links:[]);

console.log(gantt.getTask(1).end_date);
// 2021年12月5日 00:00:00

console.log(gantt.getTask(1).duration);
// 4
~~~

默认情况下，任务的最后一天不计入持续时间，但你可以更改默认行为，将最后一天包含在持续时间内。详细信息请参见 [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates) 文章。

循环引用错误
-----------------------

如果向 Gantt 传递了不正确的数据，导致其树状结构变为循环结构，就会出现循环引用错误。

![cyclic_error](/img/cyclic_error.png)

例如，以下情况可能导致此错误:

- 任务的父任务 ID 与自身 ID 相同:

![equal_ids](/img/equal_ids.png)

任务 #2 不能是自己的父任务。

- 某个任务的子任务成为了它的父任务:

![parent_child_error](/img/parent_child_error.png)

"Task #4" 被指定为 "Task #1" 的父任务，但同时 "Task #4" 也是 "Task #1" 的子任务。

试用期已过期
------------------------------

如果你已经安装了甘特图的授权 PRO 版本，但仍然看到试用期已过期的提示，这说明应用中仍然存在 Trial 版本。只有试用版才会弹出试用期已过期的提示。

因此，请务必在安装 PRO 版本前彻底移除甘特图试用包的文件。更多信息请参阅 [Adding PRO Edition into Project](guides/installation.md#jiangprobanbentianjiadaoxiangmuzhong) 部分。

**提示:** 你可以在 web 控制台输入 *gantt.license* 检查当前连接的是哪个文件。

