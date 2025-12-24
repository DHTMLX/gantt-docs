---
title: "任务对象/Id"
sidebar_label: "任务对象/Id"
---

# 任务对象/Id


在甘特图中处理数据时，了解如何访问数据项的对象或id非常重要。大多数方法都需要数据对象或id作为参数。此外，任何与数据相关的操作都依赖于引用数据对象或id。

*有关任务的树结构相关方法，请参阅 [Task Parent/Child](guides/task-tree-operations.md) 文章。*

## 任务对象


要获取任务对象，请使用 [getTask](api/method/gettask.md) 方法:

~~~js
gantt.getTask("t1");
//->{id:"t1", text:"Task #5", start_date:"02-09-2020", duration:28, 
// progress:0.6, parent:"pr_2", $source:[3,5], $target:[2,1], ...}
~~~

## 任务的父任务


要查找任务的父任务，可以使用 [getParent](api/method/getparent.md) 方法，或访问任务对象的 **parent** 属性:

~~~js
gantt.getParent("t1"); //->"pr_2"。如果没有父任务，该方法返回根id
//或
var taskObj = gantt.getTask("t1"); //-> {id:"t1", text:"Task #5", parent:"pr_2", ...}
var taskParent = taskObj.parent;  //-> "pr_2"
~~~

*有关甘特图树结构的所有相关方法，请参阅 [Task Parent/Child](guides/task-tree-operations.md) 文章。*

## 与任务相关的链接


要了解如何获取与特定任务相关的所有链接，请查阅 [링크 객체/ID 가져오기](guides/link-object-operations.md) 文章。

## 任务时长


要确定任务的持续时长，请使用 [calculateDuration](api/method/calculateduration.md) 方法:

~~~js
gantt.calculateDuration(new Date(2020,03,30),new Date (2020,04,02)); // ->16
~~~

如果只更改了 **duration** 参数并更新了任务对象，该方法将无法正确工作。为确保其正常工作，必须同时使用 [calculateEndDate](api/method/calculateenddate.md) 方法更新 **end_date** 参数。[参见示例](https://snippet.dhtmlx.com/f6keqhy5)。

注意，如果启用了 [work_time](api/config/work_time.md) 选项，[calculateDuration](api/method/calculateduration.md) 方法会根据工作时间计算任务时长。

## 任务高度


要获取任务DOM元素的高度，请使用 [getTaskBarHeight](api/method/gettaskbarheight.md) 方法:

~~~js
gantt.config.bar_height = 45;
gantt.render();
 
gantt.getTaskBarHeight(1); // -> 45
~~~

返回值也可以对应于任务对象上设置的 **bar_height** 属性:

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

注意，当 **bar_height** 属性设置为 "full" 时，该方法会以像素为单位计算任务条高度。

## 任务结束日期


要获取任务的结束日期，请使用 [calculateEndDate](api/method/calculateenddate.md) 方法:

~~~js
gantt.calculateEndDate(new Date(2020,03,30),48,"hour"); //-> Thu May 07 2020 17:00:00
~~~

如果启用了 [work_time](api/config/work_time.md) 选项，该方法会将持续时间视为工作时间。

## 选中的任务


要获取当前选中的任务，请使用 [getSelectedId](api/method/getselectedid.md) 方法:

~~~js
gantt.selectTask("t_1"); 
gantt.getSelectedId();  //-> "t_1" - 选中任务的id
~~~

## 指定时间段内的任务


要获取指定时间段内发生的任务列表，请使用 [getTaskByTime](api/method/gettaskbytime.md) 方法:

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,03,05),new Date(2020,03,15)); 
// tasks 是任务对象的数组
~~~

## 甘特图中的所有任务


要检索甘特图中显示的所有任务，请调用 [getTaskByTime](api/method/gettaskbytime.md) 方法且不传递参数:

~~~js
var tasks = gantt.getTaskByTime();  //返回所有任务的对象数组
~~~

另外，也可以使用 [serialize](api/method/serialize.md) 方法。

## 某任务的链接


要获取与特定任务相关的链接，请使用任务对象的 **$source** 和 **$target** 属性。这些属性为自动生成，包含相关链接的id:

- **$source** - 从此任务出发的链接。
- **$target** - 指向此任务的链接。

~~~js
var taskObj = gantt.getTask("t1");

var sourceLinks = taskObj.$source;  //-> ["l1","l4"] - 出发链接的id  /*!*/
var targetLinks = taskObj.$target;  //-> ["l5","l8"] - 指向链接的id  /*!*/
~~~

## 最近的即将到来的任务


要查找最近的即将开始的任务，请按如下方式使用 [getTaskByTime](api/method/gettaskbytime.md) 方法:

~~~js
var tasks = gantt.getTaskByTime(new Date(), new Date(9999,1,1));    
// tasks 包含所有即将到来的任务
tasks.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
// tasks[0] 是最近的即将到来的任务
~~~

## 任务id


通常，任务的id包含在数据集的 "data" 对象中:

~~~js
{
    tasks:[
        {id:1, text:"Task #1", start_date:"01-04-2020", duration:18, progress:0.4}, /*!*/
        {id:2, text:"Task #2", start_date:"02-04-2020", duration:8,  progress:0.6}  /*!*/
    ],
    links:[...]
}
~~~

如果无法从数据集中获取任务id，可以按如下方式使用 [getTaskByTime](api/method/gettaskbytime.md) 方法:

~~~js
var tasks = gantt.getTaskByTime();   //返回所有任务
for(var i="0;i" < tasks.length; i++){  //遍历任务以查找所需任务
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

*如果已知任务发生的大致时间，限制时间范围可以加快查找速度:*

~~~js
var tasks = gantt.getTaskByTime(new Date(2020,05,01),new Date(2020,05,10)); 
for(var i="0;i" < tasks.length; i++){  
    if (tasks[i].text == "Task #3") 
        var taskId = tasks[i].id;
};
~~~

###更改任务id

要更新任务的id，请使用 [changeTaskId](api/method/changetaskid.md) 方法:

~~~js
gantt.changeTaskId("t1", "t11");  //将任务id从"t1"更改为"t11"
~~~

## 展开/收起任务分支


任务分支的展开状态由 **task.$open** 属性控制，该属性在任务加载到gantt后可用。更改该值将在下次gantt重绘后生效:

~~~js
// 展开所有分支
gantt.eachTask(function(task){
    task.$open = true;
});
gantt.render();

// 收起所有分支
gantt.eachTask(function(task){
    task.$open = false;
});
gantt.render();
~~~

要展开或收起单个任务，可以使用 [open](api/method/open.md) 和 [close](api/method/close.md) 方法。这些方法会更新内部状态并触发重绘。当需要修改多个任务时，直接更改 **task.$open** 更高效，因为可以避免不必要的重绘。

## 复制/粘贴任务


有关复制和粘贴任务的示例，请参阅 [如何复制和粘贴任务](guides/how-to.md#ruhefuzhiheniantierenwu) 部分。

