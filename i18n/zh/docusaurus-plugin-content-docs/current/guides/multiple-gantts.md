---
title: "页面上的多个甘特图"
sidebar_label: "页面上的多个甘特图"
---

页面上的多个甘特图
=========================

:::info
此功能包含在 Gantt PRO 版本中，可通过 Commercial（自 2021 年 10 月 6 日起）、Enterprise 和 Ultimate 许可证获得。
:::

本质上，dhtmlxGantt 作为一个静态对象存在，其默认实例始终存在于页面上。你可以随时通过全局 **gantt** 对象访问它。不过，如果有需要，你也可以创建一个新的 gantt 实例。

甘特实例配置
-----------------------------
要创建一个新的 dhtmlxGantt 实例，请使用 **Gantt.getGanttInstance()** 方法:

~~~js
// 注意 "Gantt" 首字母为大写
const ganttChart = Gantt.getGanttInstance();
~~~

该方法可以接收一个配置对象作为参数:

~~~js
const gantt = Gantt.getGanttInstance({
    plugins:{
        auto_scheduling: true,
    },
    container: "gantt_here",
    config: {
        work_time: true,
        duration_unit: "minute",
        auto_scheduling_compatibility: true,
        auto_scheduling: true,
        auto_scheduling_strict: true,
        auto_scheduling_initial: true,
        start_date: new Date(2020, 0, 1),
        end_date: new Date(2021, 0, 1),
    },
    calendars: [
        {
            id:"global",
            worktime: {
                hours: ["8:00-17:00"],
                days: [ 0, 1, 1, 1, 1, 0 ,0],
                customWeeks: {
                    lastMonthOfYear: {
                        from: new Date(2020, 11, 1),// 2020年12月1日
                        to: new Date(2021, 0, 1),// 2021年1月1日 00:00,
                        hours: ["9:00-13:00"],
                        days: [ 0, 1, 1, 1, 1, 1, 0]
                    },
                    firstMonthOfNextYear:{
                        from: new Date(2021, 0, 1),// 2021年1月1日
                        to: new Date(2021, 1, 1),// 2021年2月1日 00:00,
                        hours: ["14:00-16:00"],
                        days: [ 1, 1, 1, 1, 1, 0, 1]
                    }
                }
            }
        }
    ],
    data: {
        tasks: [
            { id: 11, text: "Project #1", type: "project", "open": true, "parent": 0 },
            { id: 1, start_date: "05-04-2020", text: "1", duration: 1, parent: "11", 
            type: "task" },
            { id: 2, start_date: "05-04-2020", text: "2", duration: 3, parent: "11", 
            type: "task" },
            { id: 3, start_date: "05-04-2020", text: "3", duration: 3, parent: "11", 
            type: "task" },
            { id: 4, start_date: "05-04-2020", text: "4", duration: 3, parent: "11", 
            type: "task" },
            { id: 5, start_date: "05-04-2020", text: "5", duration: 1, parent: "11", 
            type: "task" }
        ], 
        links: [
            { source: "1", target: "2", type: "0", id: 1 },
            { source: "1", target: "3", type: "0", id: 2 },
            { source: "1", target: "4", type: "0", id: 3 },
            { source: "2", target: "4", type: "0", id: 4 },
            { source: "3", target: "4", type: "0", id: 5 },
            { source: "4", target: "5", type: "0", id: 6 }
        ]
    }
});
~~~

这将创建一个使用指定选项初始化的甘特图。

config 对象支持以下属性:

- **container** - (*string|HTMLElement*) 甘特图渲染的 HTML 容器或其 id。如果省略，甘特图将在没有容器的情况下初始化。
- **config** - (*object*) 甘特图的配置设置
- **calendars** - (*array*) 要加载到 gantt 的工作日历数组。日历格式应符合 [gantt.addCalendar](api/method/addcalendar.md) 方法的要求。
- **templates** - (*object*) 包含模板的对象
- **events** - (*object*) 包含事件处理程序的对象。


为新 Gantt 实例指定事件处理程序时，使用如下格式:

~~~js
const gantt = Gantt.getGanttInstance({
     events: {
          onTaskCreated: function(task){
               task.owner = null;
               return true;
          },
          onTaskClick: function(id){
               alert(gantt.getTask(id).text);
               return true;
          }
     }
})
~~~

- **data** - (*object|string*) 要加载的数据或用于获取数据的 URL
- **plugins** - (*object*) 需要激活的插件
- **locale** - (*string|object*) 两位语言代码或要激活的本地化对象

**注意**，如果不传递参数调用 **Gantt.getGanttInstance()**，则返回带有默认设置的 gantt 对象。在这种情况下，你需要像往常一样为新实例配置、初始化并加载数据。

下面是一个简单示例，展示了两个垂直堆叠的甘特图:

~~~js
window.addEventListener("DOMContentLoaded", function(){
    var gantt1 = Gantt.getGanttInstance();
    gantt1.init("gantt_here");
    gantt1.parse(tasksA);

    var gantt2 = Gantt.getGanttInstance();
    gantt2.init("gantt_here_2");
    gantt2.parse(tasksB);
});

<body>
<div id="gantt_here" style="width:100%; height: 50%;"></div>
<div id="gantt_here_2" style="width:100%; height: 50%;"></div>
</body>
~~~

与 dhtmlxLayout 的集成
------------------------

在页面上组织多个甘特图的一个有效方法是使用 [dhtmlxLayout](https://docs.dhtmlx.com/layout__index.html)。它提供了整洁的布局框架，并能正确处理与其他页面元素的交互以及大小调整事件。

:::note
请注意，dhtmlxLayout 是一个独立产品，不包含在 dhtmlxGantt 库中。要在项目中使用 dhtmlxLayout，需要单独购买许可证。请[查看许可选项](https://dhtmlx.com/docs/products/dhtmlxLayout/#editions-licenses)。
:::

**要将 dhtmlxGantt 实例附加到布局单元格**，请使用 **attachGantt()** 方法。

**注意**，将 dhtmlxGantt 附加到单元格会自动初始化它。因此，请确保在附加到布局之前对 gantt 实例进行配置。

~~~js
function init() {
    var dhxLayout = new dhtmlXLayoutObject(document.body, "2U");

    gantt1 = Gantt.getGanttInstance();
    gantt1.config.min_column_width = 50;
    gantt1.config.scale_height = 90;
    dhxLayout.cells("a").attachGantt(null, null, gantt1); /*!*/
    gantt1.parse(tasksA);
        
    gantt2 = Gantt.getGanttInstance();
    gantt2.config.date_grid = "%Y-%m-%d %H:%i";
    gantt2.config.xml_date = "%Y-%m-%d %H:%i:%s";
    dhxLayout.cells("b").attachGantt(null, null, gantt2);/*!*/
    gantt2.parse(tasksB);
}
~~~

Gantt 和 DataProcessor 实例的析构函数
------------------------------------

从 5.1 版本开始，dhtmlxGantt 对象提供了 [destructor](api/method/destructor.md)，用于清理不再需要的 gantt 实例。

以下是如何为 gantt 实例使用析构函数的方法:

~~~js
var gantt = Gantt.getGanttInstance();
gantt.destructor();
~~~

该析构函数会执行以下操作:

- 清除加载到 gantt 实例中的数据
- 销毁已附加的数据处理器（dataProcessor）
- 将甘特图从 DOM 中移除
- 移除通过 [gantt.event()](api/method/event.md) 方法附加的所有 DOM 事件

请注意，析构函数不会移除通过 [gantt.createDatastore()](api/method/createdatastore.md) 方法创建的数据存储。你需要手动销毁这些数据存储，如下所示:

~~~js
// 创建数据存储
var resourcesStore = gantt.createDatastore({
    name:"resource",
    initItem: function(item){
        item.id = item.key || gantt.uid();
        return item;
    }
});

// 之后销毁数据存储
resourcesStore.destructor();
~~~

### 在 Angular 中使用析构函数

以下是在 Angular 中销毁 gantt 实例的示例:

~~~js
@Component({selector: 'app-gantt', template: `...`})
class MyGanttComponent implements OnDestroy {
  ngOnInit() {
     this.$gantt = Gantt.getGanttInstance();

     // 配置和初始化
  }
  
  ngOnDestroy() {
     this.$gantt.destructor();
     this.$gantt = null;
  }
}
~~~

### 分离 dataProcessor

对 dataProcessor 调用析构函数会清除其实例并将其从 gantt 分离。例如:

~~~js
var gantt = Gantt.getGanttInstance();
var dp = new gantt.dataProcessor("url");
dp.init(gantt);

// 销毁 dataProcessor 并从 gantt 分离
dp.destructor();
~~~

:::note
如果你使用的包不支持多个 gantt 实例（如 GPL 或 Commercial 版本），调用 gantt 的析构函数后，gantt 将不可用，直到页面重新加载。
:::

