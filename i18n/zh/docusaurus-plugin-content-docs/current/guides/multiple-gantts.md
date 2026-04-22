---
title: "在一个页面上显示多个甘特图"
sidebar_label: "一个页面上的多个甘特图"
---

# 在一个页面上显示多个甘特图

:::info
此功能在 Gantt PRO 版本的商业许可（自 2021 年 10 月 6 日起）、Enterprise 和 Ultimate 许可下可用。
:::

基本上，DHTMLX Gantt 是一个静态对象，其默认实例会持续存在于页面上。你可以随时通过全局对象 `gantt` 访问它。但如果需要，也可以创建一个新的 gantt 对象。
 
## Gantt 实例配置

要创建一个新的 DHTMLX Gantt 实例，请使用 `Gantt.getGanttInstance()` 方法：

~~~js
// 注意，命令中的 "Gantt" 首字母要大写
const ganttChart = Gantt.getGanttInstance();
~~~

该方法可以接收一个配置对象作为参数：

~~~js
const ganttInstance = Gantt.getGanttInstance({
    plugins: {
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
        start_date: new Date(2027, 0, 1),
        end_date: new Date(2028, 0, 1),
    },
    calendars: [
        {
            id: "global",
            worktime: {
                hours: ["8:00-17:00"],
                days: [0, 1, 1, 1, 1, 0, 0],
                customWeeks: {
                    lastMonthOfYear: {
                        from: new Date(2027, 11, 1),
                        to: new Date(2028, 0, 1),
                        hours: ["9:00-13:00"],
                        days: [0, 1, 1, 1, 1, 1, 0]
                    },
                    firstMonthOfNextYear: {
                        from: new Date(2028, 0, 1),
                        to: new Date(2028, 1, 1),
                        hours: ["14:00-16:00"],
                        days: [1, 1, 1, 1, 1, 0, 1]
                    }
                }
            }
        }
    ],
    data: {
        tasks: [
            { id: 11, text: "Project #1", type: "project", "open": true, "parent": 0 },
            { id: 1, text: "1", start_date: "2027-04-05", duration: 1, parent: "11" },
            { id: 2, text: "2", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 3, text: "3", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 4, text: "4", start_date: "2027-04-05", duration: 3, parent: "11" },
            { id: 5, text: "5", start_date: "2027-04-05", duration: 1, parent: "11" }
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

结果，你将获得一个具有指定设置的初始化 Gantt 图表。

config 对象可以包含以下属性：

- `container` - (*string|HTMLElement*) 将显示 Gantt 图的 HTML 容器或其 ID。如果未指定，Gantt 将在没有容器的情况下初始化。
- `config` - (*object*) 包含 Gantt 图配置设置的对象
- `calendars` - (*array*) 要加载到 gantt 实例中的工作时间日历数组。日历必须采用 [`gantt.addCalendar()`](api/method/addcalendar.md) 方法所支持的格式指定
- `templates` - (*object*) 包含模板的对象
- `events` - (*object*) 包含事件处理程序的对象

在为新的 Gantt 实例指定事件处理程序时，需要使用以下格式：

~~~js
const ganttInstance = Gantt.getGanttInstance({
    events: {
        onTaskCreated: (task) => {
            task.owner = null;
            return true;
        },
        onTaskClick: (taskId) => {
            alert(ganttInstance.getTask(taskId).text);
            return true;
        }
    }
});
~~~

- `data` - (*object|string*) 要加载的数据对象，或用于加载数据的 URL
- `plugins` - (*object*) 需要激活的扩展
- `locale` - (*string|object*) 两字母语言代码，或需要激活的区域设置对象

请注意，不带参数调用 `Gantt.getGanttInstance()` 方法将返回带有默认配置设置的 gantt 对象。因此，你需要像往常一样配置新实例、初始化它并用数据填充它。

让我们举一个简单的例子：两个 Gantt 图并排显示，一个在另一个下面：

~~~js
window.addEventListener("DOMContentLoaded", () => {
    const firstGantt = Gantt.getGanttInstance();
    firstGantt.init("gantt_here");
    firstGantt.parse(tasksA);

    const secondGantt = Gantt.getGanttInstance();
    secondGantt.init("gantt_here_2");
    secondGantt.parse(tasksB);
});
~~~

~~~html
<body>
    <div id="gantt_here" style="width: 100%; height: 50%;"></div>
    <div id="gantt_here_2" style="width: 100%; height: 50%;"></div>
</body>
~~~

## 与 DHTMLX Layout 的集成

在页面上放置多个 Gantt 图的一个好方法是使用 [DHTMLX Layout](https://docs.dhtmlx.com/suite/layout/)。
它不仅提供了一个方便的布局框架，还能确保与页面上其他元素的正确交互，并对页面大小变化做出响应。

:::note
请注意，DHTMLX Layout 是一个单独的产品，不属于 DHTMLX Gantt 库的一部分。如果你想在应用程序中使用 DHTMLX Layout，请购买相应许可。
请 [查看许可选项](https://dhtmlx.com/docs/products/licenses.shtml)。
:::

可以通过在单元格中定义一个容器并在其中初始化 Gantt 来将 DHTMLX Gantt 实例放置到布局单元格中。

~~~js
new dhx.Layout("layout_container", {
    rows: [
        {
            id: "top",
            height: "50%",
            html: '<div id="gantt_here" style="width: 100%; height: 100%;"></div>'
        },
        {
            id: "bottom",
            height: "50%",
            html: '<div id="gantt_here_2" style="width: 100%; height: 100%;"></div>'
        }
    ]
});

const firstGantt = Gantt.getGanttInstance();
firstGantt.init("gantt_here");
firstGantt.parse(tasksA);

const secondGantt = Gantt.getGanttInstance();
secondGantt.init("gantt_here_2");
secondGantt.parse(tasksB);
~~~

## Gantt 与 DataProcessor 实例的析构器 {#destructorofganttanddataprocessorinstances}

从版本 5.1 开始，DHTMLX Gantt 对象提供了 [`destructor()`](api/method/destructor.md) 方法，可用于处置不再需要的 Gantt 实例。

gantt 实例的 `destructor()` 方法可以按如下方式使用：

~~~js
const ganttInstance = Gantt.getGanttInstance();
ganttInstance.destructor();
~~~

析构器将执行以下任务：

- 清除加载到 gantt 实例中的数据
- 如果已将数据处理器附加到 gantt，则销毁数据处理器
- 将 gantt 从 DOM 中分离
- 分离通过 [`gantt.event()`](api/method/event.md) 方法附加的所有 DOM 事件

请注意，析构器不会销毁通过 [`gantt.createDatastore()`](api/method/createdatastore.md) 方法创建的数据存储。你必须手动销毁它们，如下所示：

~~~js
// 创建一个数据存储
const ganttInstance = Gantt.getGanttInstance();
const resourcesStore = ganttInstance.createDatastore({
    name: "resource",
    initItem: (item) => {
        item.id = item.key || ganttInstance.uid();
        return item;
    }
});

// 稍后销毁该数据存储
resourcesStore.destructor();
~~~

### 在 Angular 中使用析构器

下面是使用析构器在使用 Angular 框架时处置一个 gantt 实例的示例：

~~~ts
@Component({ template: '...' })
class MyGanttComponent implements OnInit, OnDestroy {
    private ganttInstance;

    ngOnInit() {
        this.ganttInstance = Gantt.getGanttInstance();

        // 配置并初始化
    }

    ngOnDestroy() {
        if (this.ganttInstance) {
            this.ganttInstance.destructor();
        }
    }
}
~~~

### 分离 dataProcessor

调用数据处理器的析构器将清除数据处理器实例并将其从 gantt 中分离。例如：

~~~js
const ganttInstance = Gantt.getGanttInstance();
const dataProcessor = ganttInstance.createDataProcessor({
    url: "url",
    mode: "REST"
});

// 销毁数据处理器并将其从 gantt 分离
dataProcessor.destructor();
~~~

:::note
如果你使用的包不允许创建同一个 gantt 对象的多个实例（GPL 或商业版），调用 gantt 的析构器将使 gantt 在页面重新加载之前不可访问。
:::