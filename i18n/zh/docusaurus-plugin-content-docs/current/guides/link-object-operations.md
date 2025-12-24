---
title: "获取 Link 对象/ID"
sidebar_label: "获取 Link 对象/ID"
---

# 获取 Link 对象/ID

在 Gantt 图中处理链接时，了解如何访问链接的对象或 id 非常重要。大多数方法都需要将链接对象（或 id）作为输入参数。此外，自定义与链接相关的场景也需要引用链接对象或 id 才能正常工作。

## 获取链接对象

要获取一个链接对象，请使用 [getLink](api/method/getlink.md) 方法:

~~~js
gantt.getLink("link1");                //-> {id:"link1", source:1, target:2, type:1}
~~~

## 获取 Gantt 图中的所有链接 

要获取当前图表中显示的所有链接，请使用 [getLinks](api/method/getlinks.md) 方法，如下所示:

~~~js
var links = gantt.getLinks(); 
~~~

这将返回一个包含所有链接对象的数组。

## 获取与某个任务相关的链接

要查找与特定任务相关的链接，请检查任务对象的 **$source** 和 **$target** 属性。

这些属性是自动生成的，包含相关链接的 id:

- **$source** - 从该任务出发的链接。
- **$target** - 指向该任务的链接。

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - 出发链接的 id  /*!*/
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - 指向链接的 id  /*!*/
~~~

**task.$source** 和 **task.$target** 是[任务对象的动态属性](guides/loading.md#shujushuxing)，包含与该任务连接的链接 id。这些属性不会存储在数据库中，而是在数据加载后动态添加到任务对象中。

~~~js
const task = gantt.getTask(1);
const source = task.$source;
// 从该任务出发的链接，
// `task #1` 在这些关系中作为前置任务

source.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: 1, target: targetTaskId, ...}
});

const target = task.$target;
// 指向该任务的链接，
// `task #1` 在这些关系中作为后继任务

target.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: sourceTaskId, target: 1, ...}
});
~~~

## 获取链接 id

通常，链接的 id 可以在数据集的 *links* 对象中找到。

~~~js
{
    tasks:[...],
    links:[
        { id:1, source:1, target:2, type:"1"},                       //link's id = 1 /*!*/
        { id:2, source:2, target:3, type:"0"},                       //link's id = 2 /*!*/
        { id:3, source:3, target:4, type:"0"}                        //link's id = 3 /*!*/
    ]
}
~~~


如果需要查找具有特定 "*target*"、"*source*" 或 "*type*" 值的链接 id，可以使用如下方法:

~~~js
// 查找从 id="1" 的任务到 id="2" 的任务的链接
var links = gantt.serialize().links;                             // 返回所有链接
for(var i="0;" i < links.length; i++){                             // 遍历所有链接
   if ( (links[i].source == 1) && (links[i].target == 2) )
       var linkId = links[i].id;
};
~~~

## 更改链接 id

要更新已有链接的 id，请使用 [changeLinkId](api/method/changelinkid.md) 方法:

~~~js
gantt.changeLinkId(1274, "link14");          // 将链接 id 从 1274 更改为 "link14"
~~~

