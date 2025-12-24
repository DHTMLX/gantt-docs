---
title: "关键路径"
sidebar_label: "关键路径"
---

# 关键路径


:::info
此功能仅在 PRO 版本中可用
:::

关键路径表示一组无法推迟的任务，否则将会延误整个项目的完成时间。


它还定义了完成项目所需的最短工期。


当任务的浮动时间（Slack）为零时，该任务被视为关键任务，也就是说，该任务的任何延迟都会直接影响项目的完成日期。关于关键路径的计算方式，详见[关键路径逻辑](#criticalpathlogic)部分。


浮动时间指的是一个任务可以延迟的时间，而不会影响后续任务或整个项目的截止日期。

<div style="text-align:center;">![critical_path](/img/critical_path.png)</div>

:::note
要开始使用此扩展，请通过 [gantt.plugins](api/method/plugins.md) 方法激活它。
:::

要在甘特图中显示关键路径，请将 [highlight_critical_path](api/config/highlight_critical_path.md) 属性设置为 'true':

**在甘特图中启用关键路径显示**
~~~js
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({ /*!*/
        critical_path: true /*!*/
    }); /*!*/
    gantt.config.highlight_critical_path = true;
    //your code will be here
</body>
</html>
~~~


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


启用此属性后，dhtmlxGantt 会自动监控任务状态并相应地更新关键路径。 
关键任务和关键连接会分别获得 *'critical_task'* 和 *'critical_link'* 的额外 CSS 类。

每当任务被更新时，dhtmlxGantt 会完全重绘数据以重新计算关键路径。 
此过程有时可能会影响性能。为了解决这个问题，组件提供了公共方法，可以检测特定任务或连接，从而以更高效的方式显示关键路径。

## 关键路径逻辑


Gantt 在以下情况下将任务标记为关键任务:

1. 该任务在整个图表中具有最晚的结束日期。

![](/img/critical_tasks.png)

2. 该任务与一个无延迟的关键任务相连。

延迟（Lag）取决于 **gantt.config.duration_unit** 的设置。当 **duration_unit** 设置为 *'day'* 且任务持续时间为数小时时，Gantt 会按如下方式取整:

- 如果持续时间大于等于12小时，则向下取整
- 如果小于12小时，则向上取整

如果连接对象中包含 lag 参数，它会影响任务之间的持续时间。例如，*lag* 为 1 表示当任务之间的持续时间为 1 时，该任务变为关键任务。

以下是不同 **link.lag** 值的示例:

- link.lag 为 0

~~~js
const tasks = {
    "data": [
        ...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": 0, "type": "0" },
        
    ]
}
~~~

![](/img/lag0.png)

- link.lag 为 1

~~~js
const tasks = {
    "data": [
        ...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": 1, "type": "0" }, 
        
    ]
}
~~~

![](/img/lag1.png)

- link.lag 为 -1

~~~js
const tasks = {
    "data": [
        ...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": -1, "type": "0" },
        
    ]
}
~~~

![](/img/lag_1.png)

3. 设置了 **gantt.config.project_end** 参数，并且任务日期超出了该日期。

目前，内置的关键路径逻辑无法更改。
不过，你可以[自定义关键路径行为](#customizingthecriticalpathbehaviour)。

## 检查任务是否为关键任务

要判断任务是否为关键任务，请使用 [isCriticalTask](api/method/iscriticaltask.md) 方法:

~~~js
gantt.config.highlight_critical_path = true; /*!*/
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.isCriticalTask(gantt.getTask("task3"));// ->'true' /*!*/
~~~


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


## 检查连接是否为关键连接


要检查某连接是否连接了两个关键任务，请使用 [isCriticalLink](api/method/iscriticallink.md) 方法:

~~~js
gantt.isCriticalLink(gantt.getLink("link1"));
~~~


[Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)


## 获取自由浮动和总浮动


**自由浮动** 指的是任务或里程碑可以延长或推迟而不影响下一个相关任务的时间。

自由浮动适用于 'task' 和 'milestone' 类型。

要获取任务的自由浮动，请使用 [getFreeSlack](api/method/getfreeslack.md) 方法，并传入任务对象:

~~~js
var task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~


[Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)


**总浮动** 指的是任务可以延迟而不影响整个项目完成日期的时间。

总浮动可用于所有任务类型，包括项目类型。

要获取任务的总浮动，请使用 [getTotalSlack](api/method/gettotalslack.md) 方法，并传入任务对象:

~~~js
var task = gantt.getTask(7);
gantt.getTotalSlack(task);
~~~


[Show Slack time](https://docs.dhtmlx.com/gantt/samples/08_api/17_show_task_slack.html)


![Slack](/img/show_slack.png)

## 自定义关键路径行为

默认情况下，gantt 会对关键路径应用标准行为，包括默认高亮样式以及每次数据更改时重新计算路径。

你可以通过以下方法控制关键路径的可见性:

~~~js
var isEnabled = false
function updateCriticalPath(){
    isEnabled = !isEnabled;
    
    gantt.config.highlight_critical_path = isEnabled;
    
    gantt.render();
}
~~~

当需要管理大量任务时，这种方式有助于避免频繁重算关键路径对性能的影响。

如需手动重新计算关键路径并更新样式，可使用如下方法:

~~~js
gantt.templates.task_class = function(start, end, task){
    if(gantt.isCriticalTask(task))
        return "critical_task";
      return "";
};

gantt.templates.link_class = function(link){
    if(gantt.isCriticalLink(link))
        return "critical_link";
      return "";
};

var data = {
    tasks: [
        { id: 1, text: "Office itinerancy", open:true, type:"project" },
        { id: 2, text: "Office facing", start_date: "21-07-2020", 
            duration: "20", parent: "1" },
        { id: 3, text: "Furniture installation", start_date: "21-07-2020", 
            duration: "5", parent: "1" },
        { id: 4, text: "The employee relocation", start_date: "28-07-2020", 
            duration: "15", parent: "1" },
        { id: 5, text: "Interior office", start_date: "28-07-2020", 
            duration: "15", parent: "1" }
    ],
    links: [
        { id: "1", source: "2", target: "3", type: "0" },
        { id: "2", source: "3", target: "4", type: "0" },
        { id: "3", source: "4", target: "5", type: "0" }
    ]
};
gantt.init("gantt_here");

gantt.parse(data);
~~~


你也可以手动高亮任务和连接:

- 在 [task_class](api/template/task_class.md) 模板中返回 "gantt_critical_task" 可将任务高亮为关键任务。
- 在 [link_class](api/template/link_class.md) 模板中返回 "gantt_critical_link" 可将连接高亮为关键连接。

**相关示例:** [Custom critical path per project](https://snippet.dhtmlx.com/jd4dyc5p)

## 设置任务之间的滞后和提前时间


关键路径任务之间的滞后和提前时间可以进行配置。详细内容请参见[此处](guides/auto-scheduling.md#shezhirenwuzhijiandezhihouhetiqianshijian)。

## 已完成任务的调度


默认情况下，关键路径算法会将已完成的任务（progress 值为 1）与未完成任务同等处理。

你可以启用 [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md) 配置来改变此行为:

~~~js
gantt.config.auto_scheduling_use_progress = true;
 
gantt.init("gantt_here");
~~~

启用后，已完成的任务将不再包含在关键路径和自动调度中。

更多信息请参见 [API 页面](api/config/auto_scheduling_use_progress.md)。

