---
title: "dhtmlxGantt 在纯 JS/HTML 中的使用"
sidebar_label: "快速开始"
---

# dhtmlxGantt 在纯 JS/HTML 中的使用


在使用 dhtmlxGantt 构建应用时，第一步就是在页面上设置并渲染 Gantt 图表。

本指南介绍了如何使用纯 JavaScript 和 HTML 初始化 dhtmlxGantt。如需了解如何与前端框架集成，请参考以下指南:

<table>
  <tbody style="text-align:center">
  <tr>
  <td>![angular_icon](/img/angular_icon.png)</td>
  <td>![react_icon](/img/react_icon.png)</td>
  <td>![svelte_icon](/img/svelte_icon.png)</td>
  <td>![vue_icon](/img/vue_icon.png)</td>
  </tr>
  <tr>
  <td>[Angular](integrations/angular/howtostart-angular.md)</td>
  <td>[React](integrations/react/quick-start.md)</td>
  <td>[Svelte](integrations/svelte/howtostart-svelte.md)</td>
  <td>[Vue.js](integrations/vue/howtostart-vue.md)</td>
  </tr>
  </tbody>
</table>

## 创建基础 Gantt 图表


在页面上显示一个简单的 Gantt 图表需要三个步骤:

1. 将 [dhtmlxGantt 代码文件](guides/initializing-gantt-chart.md#ruhejiangganttyuanwenjiantianjiadaoxiangmuzhong) 添加到页面中。
2. 创建一个 DIV 容器用于展示图表。
3. 使用 [init](api/method/init.md) 方法在该容器中初始化 dhtmlxGantt。此方法接受一个 HTML 容器元素或其 id 作为参数，Gantt 图表将渲染在此处。

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">
</head>
<body>
    <div id="gantt_here" style='width:1000px; height:400px;'></div>
    <script type="text/javascript"> 
        gantt.init("gantt_here");   /*!*/                        
    </script>
</body>
</html>
~~~

![/img/init_gantt_front.png](/img/init_gantt_front.png)


[Basic initialization](https://docs.dhtmlx.com/gantt/samples/01_initialization/01_basic_init.html)

 
 
## 如何将 Gantt 源文件添加到项目中


根据你所构建的应用类型，有多种方式可以将 Gantt 源文件添加到项目中:

- [通过 &#60;script&#62; 标签引入文件](#scripttag)
- [在 ES6/7 和 TypeScript 应用中导入文件](#moduleimport)
- [在基于 RequireJS 的应用中引入文件](#requirejsimport)

## 通过 &#60;script&#62; 标签引入文件


要使用 dhtmlxGantt，需要在页面中添加两个文件:

- **dhtmlxgantt.js**
- **dhtmlxgantt.css**

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<link href="codebase/dhtmlxgantt.css" rel="stylesheet">
~~~

我们来看一下 dhtmlxGantt 包的结构，了解这些文件的位置。

dhtmlxGantt 包中的主要文件夹和文件包括:

- <b>sources</b> - 库的源代码文件，未压缩且易于阅读，主要用于调试组件。
- <b>samples</b> - 示例代码样本。
- <b>codebase</b> - 用于生产环境的压缩代码文件。<b>在你的应用中应使用此文件夹下的文件。</b>

## 在 ES6/7 和 TypeScript 应用中导入文件


使用以下命令导入文件:

~~~js
import { gantt } from 'dhtmlx-gantt';
~~~

对于 Commercial、Enterprise 或 Ultimate 版本，使用:

~~~js
import { gantt, Gantt } from 'dhtmlx-gantt';
~~~

## 在 Vite 中使用 Gantt


如果你的项目使用 Vite，需要在 **vite.config.js** 文件中添加如下设置，以确保 Gantt 被正确引入:

**vite.config.js**
~~~js 
optimizeDeps: {
    include: [
        'dhtmlx-gantt',
    ]
}
~~~

### Svelte 生产环境构建

如果你在 [Svelte 应用中使用 Gantt](integrations/svelte/howtostart-svelte.md)，在生产环境构建时，需要在 **vite.config.js** 文件中添加如下内容。请将 *gantt_8.0.6_evaluation* 替换为你的 Gantt 文件夹路径:

**vite.config.js**
~~~js 
build: {
    commonjsOptions: {
        include: [
            "node_modules",
            "gantt_8.0.6_evaluation/codebase/dhtmlxgantt.js"
        ]
    },
}
~~~

## 在基于 RequireJS 的应用中引入文件
 

在基于 RequireJS 的应用中添加 dhtmlxGantt 文件，参考如下模式:

~~~js
requirejs(["codebase/dhtmlxgantt"], function(dhx){
  var gantt = dhx.gantt;
  var Gantt = dhx.Gantt; // 适用于 Enterprise 版本
 
  gantt.init("gantt_here");
  gantt.parse({
    data: [
      { id:1, text:"Project #2", start_date:"01-04-2018", 
          duration:18, progress:0.4, open:true },
      { id:2, text:"Task #1", start_date:"02-04-2018", 
          duration:8, progress:0.6, parent:1 },
      { id:3, text:"Task #2", start_date:"11-04-2018", 
          duration:8, progress:0.6, parent:1 }
    ],
    links: [
      { id:1, source:1, target:2, type:"1" },
      { id:2, source:2, target:3, type:"0" }
    ]
  });
});
~~~

dhtmlxGantt 库返回一个包含 `gantt` 和 `Gantt` 字段的对象（后者适用于 Commercial、Enterprise 或 Ultimate 版本）--它们分别对应于 [此处](guides/multiple-gantts.md)描述的 *gantt* 和 *Gantt* 对象。

:::note
在 RequireJS 中使用 Gantt 及自定义扩展时，请确保为 RequireJS 指定 `shim` 配置，并将扩展的依赖直接设置为 Gantt。
:::

下面是配置自定义扩展文件 *custom_tooltip_plugin.js* 的示例:

~~~js
requirejs.config({
  paths: {
    "dhtmlxgantt": "../../codebase/dhtmlxgantt",
    "ext/dhtmlxgantt_custom_tooltip": "../custom_tooltip_plugin"
  },
  shim: {
    "ext/dhtmlxgantt_custom_tooltip": ["dhtmlxgantt"]
  }
});
 
requirejs(["dhtmlxgantt"], 
function (dhx) {
  var gantt = dhx.gantt;

  var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
  var today = new Date(2018, 3, 5);
  gantt.addMarker({
    start_date: today,
    css: "today",
    text: "Today",
    title: "Today: " + date_to_str(today)
  });
 
  gantt.init("gantt_here");
  gantt.parse({
    data: [
      { id:1, text:"Project #2", start_date:"01-04-2018",
          duration:18, progress:0.4, open:true },
      { id:2, text:"Task #1", start_date:"02-04-2018", 
          duration:8, progress:0.6, parent:1 },
      { id:3, text:"Task #2", start_date:"11-04-2018", 
          duration:8, progress:0.6, parent:1 }
    ],
    links: [
      { id:1, source:1, target:2, type:"1" },
      { id:2, source:2, target:3, type:"0" }
    ]
  });
});
~~~

请确保包内任意文件的模块名指定为 *codebase 文件夹内的相对路径* 加上 *文件名*，例如:

**核心库:**

- "dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"

## 全屏模式


为确保 Gantt 图表在不同浏览器下以全屏模式正确显示，请在页面中添加如下样式:

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

