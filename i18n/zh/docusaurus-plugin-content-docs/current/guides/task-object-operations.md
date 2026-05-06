---
title: "任务对象/ID"
sidebar_label: "任务对象/ID"
---

# 任务对象/ID

要在甘特图中处理数据，您需要了解如何获取数据项的对象或 ID。 firstly，大多数方法将数据对象/ID 作为参数。 
Secondly, 任何与数据相关的代码场景都离不开对数据对象/ID 的引用。

*要了解可用的与任务树相关的方法，请参阅 [Task Parent/Child](guides/task-tree-operations.md) 文章。*

## Task object

要获取任务对象，请使用 [getTask](api/method/gettask.md) 方法：

~~~js
gantt.getTask("t1");
//->{id:"t1", text:"Task #5", start_date:"02-09-2020", duration:28, 
// progress:0.6, parent:"pr_2", $source:[3,5], $target:[2,1], ...}
~~~

## Parent of a task

要获取任务的父任务，请使用 [getParent](api/method/getparent.md) 方法，或使用任务对象的 **parent** 属性：

~~~js
gantt.getParent("t1"); //->"pr_2"。如果没有父任务，该方法返回根id
//或
var taskObj = gantt.getTask("t1"); //-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~

*要查看与甘特图树结构相关的所有方法，请阅读 [Task Parent/Child](guides/task-tree-operations.md) 文章。*

## Links connected to a task

有关获取与特定任务相关的所有链接的详细信息，请参阅 [Getting the Link Object/Id](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task) 文章。


## Task duration

要获取任务的持续时间，请使用 [calculateDuration](api/method/calculateduration.md) 方法：

~~~js
gantt.calculateDuration(new Date(2020,03,30),new Date (2020,04,02)); // ->16
~~~

仅修改 **duration** 参数并更新任务对象后，该方法将不起作用。要让其生效，您还需要通过 [calculateEndDate](api/method/calculateenddate.md) 方法来更新 **end_date** 参数。 [示例请查看](https://snippet.dhtmlx.com/f6keqhy5)。

注意，如果启用了 [work_time](api/config/work_time.md) 选项， [calculateDuration](api/method/calculateduration.md) 方法会按工作时间来计算任务的持续时间。

## Task height

要获取任务的 DOM 元素高度，请使用 [getTaskBarHeight](api/method/gettaskbarheight.md) 方法：

~~~js
gantt.config.bar_height = 45;
gantt.render();
 
gantt.getTaskBarHeight(1); // -> 45
~~~

返回值也可以与任务对象的 **bar_height** 属性指定的值匹配：

~~~js
var tasks = {
      data:[
         { id: 1, text: "Project #2", start_date: "01-04-2018", duration: 18, 
             progress: 0.4, open: true, bar_height: "full", row:height: 50 }, 
        { id: 2, text: "Task #1", start_date: "02-04-2018", duration: 8, 
            progress: 0.6, parent: 1, bar_height: 25, row:height: 50 },
       ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getTaskBarHeight(1); // -> 45
gantt.getTaskBarHeight(2); // -> 25
~~~

注意，如果将 **bar_height** 属性指定为 "full"，该方法将以像素为单位计算任务条的高度。

## Task end date

要获取任务的结束日期，请使用 [calculateEndDate](api/method/calculateenddate.md) 方法：

~~~js
gantt.calculateEndDate(new Date(2020,03,30),48,"hour"); //-> Thu May 07 2020 17:00:00
~~~

注意，如果启用了 [work_time](api/config/work_time.md) 选项，该方法将持续时间视为工作时间。


## Selected task

要获取当前选定的任务，请使用 [getSelectedId](api/method/getselectedid.md) 方法： 

~~~js
gantt.selectTask("t_1"); 
gantt.getSelectedId();  //-> "t_1" - 选中任务的id
~~~


## Tasks from a specific period

要获取在指定时间段内发生的任务集合，请使用 [getTaskByTime](api/method/gettaskbytime.md) 方法：

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,03,05),new Date(2020,03,15)); 
// tasks 是任务对象的数组
~~~

## All tasks of Gantt 

要获取甘特图中呈现的全部任务，请如同使用 [getTaskByTime](api/method/gettaskbytime.md) 方法：

~~~js
var tasks = gantt.getTaskByTime();  //返回所有任务的对象数组
~~~

你也可以调用 [serialize](api/method/serialize.md) 方法。


## Links of a certain task

要获取与某个任务相关的链接，请使用任务对象的 **$source**、**$target** 属性。这些属性是自动生成的，存储相关链接的 id：

- **$source** - 从该任务发出的链接。
- **$target** - 进入该任务的链接。

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;  //-> ["l1","l4"] - 出发链接的id  /*!*/
var targetLinks = taskObj.$target;  //-> ["l5","l8"] - 指向链接的id  /*!*/
~~~


## Nearest oncoming task

要获取最近的即将到来的任务，请使用 [getTaskByTime](api/method/gettaskbytime.md) 方法，如下所示：

~~~js
var tasks = gantt.getTaskByTime(new Date(), new Date(9999,1,1));    
// tasks 包含所有即将到来的任务
tasks.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
// tasks[0] 是最近的即将到来的任务
~~~

## Task id

通常，您可以从数据集的 "data" 对象中获取任务的 id。 

~~~js
{
    tasks:[
        {id:1, text:"Task #1", start_date:"01-04-2020", duration:18, progress:0.4}, /*!*/
        {id:2, text:"Task #2", start_date:"02-04-2020", duration:8,  progress:0.6}  /*!*/
    ],
    links:[...]
}
~~~

如果您无法从数据集中获取任务的 id，请使用 [getTaskByTime](api/method/gettaskbytime.md) 方法，如下所示：

~~~js
var tasks = gantt.getTaskByTime();   //返回所有任务
for (var i="0;i" < tasks.length; i++){  //遍历任务以查找所需任务
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

*如果您知道需要的任务大致出现的时间，最好将返回的任务集合限定在一个较小的范围内，以加快应用速度：*

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,05,01),new Date(2020,05,10)); 
for(var i="0;i" < tasks.length; i++){  
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

### Changing id of a task

要更改任务当前的 ID，请使用 [changeTaskId](api/method/changetaskid.md) 方法：

~~~js
gantt.changeTaskId("t1", "t11");  //将任务id从"t1"更改为"t11"
~~~


## Opening/Closing task branches

一个任务分支的展开状态由 **task.$open** 属性定义，该属性在任务加载到 gantt 之后可用。
一旦修改，该值将在下次重新绘制甘特图后显示：

~~~js
// 展开所有分支
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();

// 收缩所有分支
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

为了打开/关闭单个任务，您可以使用 [open](api/method/open.md) 和 [close](api/method/close.md) 方法。它们将改变任务的内部状态并触发重新绘制。
不过，为了避免不必要的重新绘制，修改大量任务时，最好直接操作 **task.$open**。

## Copying/pasting tasks

请参阅 [How to copy and paste tasks](guides/how-to.md#how-to-copy-and-paste-tasks) 小节中的示例。