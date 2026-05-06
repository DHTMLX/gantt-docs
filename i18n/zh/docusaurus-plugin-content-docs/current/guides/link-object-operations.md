---
title: "获取链接对象/Id"
sidebar_label: "获取链接对象/Id"
---

# 获取链接对象/Id

要在甘特图中处理链接，您需要了解如何获取链接的对象或 id。首先，
大多数方法将链接的对象(id)作为参数。其次，若要实现链接的自定义场景，必须引用链接的对象(id)。

## 获取链接对象

要获取链接对象，请使用 [getLink](api/method/getlink.md) 方法：

~~~js
gantt.getLink("link1");                //-> {id:"link1", source:1, target:2, type:1}
~~~

## 从甘特图获取所有链接

要获取图表中显示的所有链接，请使用 [getLinks](api/method/getlinks.md) 方法，如下：

~~~js
var links = gantt.getLinks(); 
~~~

它将返回一个链接对象的数组。

## 获取与某个任务相关的链接

要获取与任务相关的链接，请使用任务对象的 **$source**、**$target** 属性。

 这些属性是自动生成的，用于存储相关链接的 ID：

- **$source** - 从该任务发出的链接。
- **$target** - 进入该任务的链接。

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;        //-> ["l1","l4"] - 来自任务的链接的 ID  /*!*/
var targetLinks = taskObj.$target;       //-> ["l5","l8"] - 进入该任务的链接的 ID  /*!*/
~~~

**task.$source** 与 **task.$target** 是 [任务对象的动态属性](guides/loading.md#dataproperties) 并包含与任务连接的链接的 ID。 这些属性并未存储在数据库中，而是在数据加载完成后动态添加到任务对象中。

~~~js
const task = gantt.getTask(1);
const source = task.$source;
// 来自任务的链接，
// `task #1` 在这些关系中是一个前驱

source.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: 1, target: targetTaskId, ...}
});

const target = task.$target;
// 进入任务的链接，
// `task #1` 在这些关系中是一个后继

target.forEach(function(linkId) {
   const link = gantt.getLink(linkId);
   console.log(link);
   // { id: linkId, source: sourceTaskId, target: 1, ...}
});
~~~

## 获取链接的 ID

通常，您可以从数据集的 *links* 对象获取链接的 ID。 

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

如果您想获取具有特定 "*target*", "*source*" 或 "*type*" 值的链接的 ID，请使用如下方法：

~~~js
//搜索从任务 id="1" 到任务 id="2" 的链接
var links = gantt.serialize().links;                             //returns all links
for(var i="0;i<links.length;" i++){                              //遍历所有链接
   if ( (links[i].source == 1) && (links[i].target == 2) )
       var linkId = links[i].id;
};
~~~

## 更改链接 ID

要更改链接的当前 ID，请使用 [changeLinkId](api/method/changelinkid.md) 方法：
~~~js
gantt.changeLinkId(1274, "link14");          //changes the link id: 1274 -> "link14"
~~~