---
title: "工作时间计算"
sidebar_label: "工作时间计算"
---

工作时间计算
========================

默认情况下，dhtmlxGantt 使用日历时间来计算任务工期，这意味着周末和节假日也会计入总时长。

:::note
有关任务结束日期的格式化详情，请参阅 [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates) 文章。
:::


## 启用工作时间计算

如需仅按工作时间计算任务工期，请启用 [work_time](api/config/work_time.md) 中描述的选项:

**为任务工期启用工作时间计算**
~~~js
gantt.config.work_time = true;     // 从工期计算中排除非工作时间 /*!*/
gantt.config.skip_off_time = true; /*!*/   // 在甘特图上隐藏非工作时间
 
gantt.init("gantt_here");
~~~

请注意，[skip_off_time](api/config/skip_off_time.md) 选项仅在 PRO 版本中可用。


[Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)


:::note
根据 [duration_unit](api/config/duration_unit.md) 设置，dhtmlxGantt 以不同的单位计算任务工期（例如，如果
duration_unit = "hour"，工期将以工作小时计算）。
:::

![calculating_different_time](/img/calculating_different_time.png)


## 十进制格式的任务工期

:::note
此功能仅在 PRO 版本中提供。
:::

从 6.3 版本开始，dhtmlxGantt 支持使用 [Duration Formatter](guides/formatters-ext.md) 模块，以十进制格式指定任务工期（如 "2.5 days"、

"0.5 hours"、"3.75 hours"）。

需要注意的是，Gantt 内部以整数值存储任务工期。

formatter 模块可帮助将用户输入的十进制工期转换为 Gantt 内部使用的格式（例如，用户输入 "1.5 hours" 时，实际存储为 `90` 分钟）。它还可将已存储的值转换回可读格式（如将 `12` 小时转换为 "0.5 days"）。

![decimal_duration](/img/decimal_duration.png)

:::note
任务工期可以用小时、天等单位的小数表示（由 [duration_unit](api/config/duration_unit.md) 支持），但不支持分钟的小数。
:::


### 实现十进制格式

如需以十进制格式显示任务工期，请按以下步骤操作:

- 将 [duration_unit](api/config/duration_unit.md) 设置为 "minute"
 
~~~js
gantt.config.work_time = true;
gantt.config.duration_unit = "minute"; /*!*/
~~~

请注意，用于存储工期的单位应小于用于以十进制格式显示的单位。简言之:


    - 如需允许用户输入小时的小数（如 "0.5 hours"），应将 [duration_unit](api/config/duration_unit.md) 设置为 "minute" 


    - 如需允许天的小数，设置 [duration_unit](api/config/duration_unit.md) 为 "hour"。此时用户可以输入如 "0.5 day" 的工期，但 "0.5 hour" 会被四舍五入为 1 小时，因为工期以整小时存储。

:::note
默认情况下，任务日期会对齐到时间刻度。如果您的刻度为天，您可能希望禁用此功能，以便在一天内拖动任务到不同时段。

要实现此功能，请禁用 [round_dnd_dates](api/config/round_dnd_dates.md)，并为 [time_step](api/config/time_step.md) 设置合适的值。
:::
例如:

~~~js
// 全局时间步长为 15 分钟，需要将 duration_unit 设为 "minute"
gantt.config.time_step = 15;
gantt.config.round_dnd_dates = false;
~~~

或

~~~js
// 全局时间步长为 1 小时，
// 适用于 duration_unit 为 "hour" 的场景
gantt.config.time_step = 60;
gantt.config.round_dnd_dates = false;
~~~

- 创建 *formatter* 对象以处理工期格式化:

~~~js
// 设置工期格式化器
const formatter = gantt.ext.formatters.durationFormatter({
    enter: "day", 
    store: "minute", // duration_unit
    format: "day",
    hoursPerDay: 8,
    hoursPerWeek: 40,
    daysPerMonth: 30
});
~~~

- 通过定义模板函数，将 *formatter* 添加到 "Duration" 列中以返回格式化后的工期:

~~~js
gantt.config.columns = [
    { name: "text", tree: true, width: 170, resize: true, editor: textEditor },
    { name: "start_date", align: "center", resize: true, editor: dateEditor },
    { name: "duration", label: "Duration", resize: true, align: "center",
        template: task => formatter.format(task.duration), width: 100 },
    { name: "add", width: 44 }
];
~~~

- 在 lightbox 中，将 *formatter* 赋值给 **time** 控件的 **formatter** 属性:

~~~js
gantt.config.lightbox.sections = [
    { name: "description", map_to: "text", type: "textarea", height: 70, focus: true },
    { name: "time", map_to: "auto", type: "duration", formatter: formatter }
];
~~~

- 如果启用了表格中的内联编辑，还需通过 **formatter** 属性将 *formatter* 添加到 durationEditor 对象:

~~~js
const durationEditor = {
    type: "duration",
    map_to: "duration",
    formatter: formatter, /*!*/
    min: 0,
    max: 1000
};

gantt.config.columns = [
    { name: "text", tree: true, width: 170, resize: true },
    { name: "start_date", align: "center", resize: true },
    { name: "duration", label: "Duration", resize: true, align: "center", 
        template: (task) => formatter.format(task.duration),
        editor: durationEditor, width: 100 },
    { name: "add", width: 44 }
];
~~~

:::note
如果您的 Gantt 已以分钟、小时或其他单位存储任务工期，也可以使用 [Duration Formatter](guides/formatters-ext.md) 模块以十进制格式显示工期。
:::


## 全局设置

### 设置工作时间 {#setworktime}

默认的工作时间为:

- 工作日:周一至周五
- 工作时间:8:00 - 12:00，13:00 - 17:00

如需自定义工作时间，请使用 [setWorkTime](api/method/setworktime.md) 方法:

**自定义工作时间**

~~~js
// 修改工作日的工作时间
gantt.setWorkTime({ hours: ["9:00-18:00"] });

// 将所有周五设为休息日
gantt.setWorkTime({ day: 5, hours: false });

// 设置周五和周六的工作时间
gantt.setWorkTime({ day: 5, hours: ["8:00-12:00"] });
gantt.setWorkTime({ day: 6, hours: ["8:00-12:00"] });

// 将特定日期设为工作日
gantt.setWorkTime({ date: new Date(2025, 2, 31) });

// 将特定日期设为休息日
gantt.setWorkTime({ date: new Date(2025, 0, 1), hours: false });
~~~


[Custom working days and time](https://docs.dhtmlx.com/gantt/samples/09_worktime/04_custom_workday_duration.html)


### 为夜班设置工作时间

配置 [setWorkTime](api/method/setworktime.md) 方法中的 **hours** 属性时，时间区间应按升序排列。如果顺序不正确，部分区间将被忽略。例如，以下错误设置中 `18:00` 之后的区间会被忽略:

~~~js
// 错误的顺序示例
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00", "14:00-15:00", "08:00-10:00"] });
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00", "00:00-04:00", "05:00-06:00"] });
~~~

如需设置跨夜班的工作时间，请将区间分布在两天:

- 第一天内的 24 小时
- 下一天内的 24 小时

例如:

~~~js
gantt.setWorkTime({ day: 5, hours: ["16:00-18:00"] });
gantt.setWorkTime({ day: 6, hours: ["00:00-04:00", "05:00-06:00"] });
~~~


### 配置工作时间规则

可以通过 [setWorkTime](api/method/setworktime.md) 方法的 **customWeeks** 属性，为不同周期定义不同的工作时间规则。例如，调整冬季月份的工作时间:

~~~js
// 修改冬季月份的工作时间
gantt.setWorkTime({
    customWeeks: {
        winter: {
            from: new Date(2025, 11, 1), // 2025年12月1日
            to: new Date(2026, 2, 1), // 2026年3月1日
            hours: ["9:00-13:00", "14:00-16:00"],
            days: [1, 1, 1, 1, 0, 0, 0]
        }
    }
});
~~~

如需设置包含分钟的工作时间（如 "8:15-12:45"），请将 [duration_unit](api/config/duration_unit.md) 设置为 *"minute"*。

**以分钟为精度设置工作时间**
~~~js
gantt.config.duration_unit = "minute";

// 以分钟精度设置工作时间
gantt.setWorkTime({ hours: ["8:15-12:45"] });
~~~

:::note
7.0 版本之前使用的工作时间格式依然受支持:

~~~js
gantt.setWorkTime({ hours: [9, 18] });
~~~
:::


### 重写工作时间规则

对于同一天，每次调用该方法都会覆盖上一次的工作时间规则。因此，如需取消某个规则，请用不同的配置调用 [setWorkTime](api/method/setworktime.md):

~~~js
gantt.setWorkTime({ hours: ["8:00-12:00"] });
gantt.setWorkTime({ hours: ["13:00-17:00"] });
// 最终的工作时间为 13:00-17:00，
// 而不是两者的组合
~~~

### 设置自定义工作日/休息日

请注意，您不能设置排除所有工作日或工作时间的工作时间配置。例如，以下设置是不可行的:

~~~js
gantt.setWorkTime({ day: 0, hours: [] });
gantt.setWorkTime({ day: 1, hours: [] });
gantt.setWorkTime({ day: 2, hours: [] });
gantt.setWorkTime({ day: 3, hours: [] });
gantt.setWorkTime({ day: 4, hours: [] });
gantt.setWorkTime({ day: 5, hours: [] });
gantt.setWorkTime({ day: 6, hours: [] });
~~~

在这种情况下，Gantt 至少会忽略一个工作日的设置，该天仍然会有工作时间。

如果您尝试从某个日期计算最近的工作时间或持续时间，将找不到任何有效的日期或持续时间。这意味着这样的日历设置实际上是无效的。即使您在特定日期设置了工作时间，也不会正确运行，因为 Gantt 只能在包含工作日和工作时间的范围内计算日期，超出这些范围的计算将失败或导致错误。

如果您希望创建一个某些月份甚至年份全部为非工作日的日历，建议在 **setWorkTime()** 方法中使用 *customWeeks* 选项。要在指定范围内定义工作日和工作时间，您应当:

- 将范围拆分为没有工作时间的区间
- 在需要的日期设置工作时间

~~~js
gantt.setWorkTime({ date: new Date(2025, 3, 10), hours: ["8:00-12:00"] })
gantt.setWorkTime({ date: new Date(2025, 3, 11), hours: ["13:00-17:00"] })

gantt.setWorkTime({
    customWeeks: {
        period1: {
            from: new Date(2025, 3, 1),
            to: new Date(2025, 3, 10),
            hours: false,
        },

        period2: {
            from: new Date(2025, 3, 12),
            to: new Date(2025, 5, 1),
            hours: false,
        },

    }
});
~~~


**Related example:** [Using `customWeeks` to make all days in the calendar days-off](https://snippet.dhtmlx.com/i0o74zg7)


### 取消工作时间设置 {#unsetworktime}

您可以使用 [unsetWorkTime](api/method/unsetworktime.md) 方法移除工作时间设置:

~~~js
// 将工作日的工作时间从 ["8:00-17:00"] 更改为 ["8:00-12:00"]
gantt.setWorkTime({ hours: ["8:00-12:00"] });
// 移除工作时间设置
gantt.unsetWorkTime({ hours: ["8:00-12:00"] });
~~~


### 检查工作时间 {#checkworktime}

要判断某个具体日期是否属于工作时间，请使用 [isWorkTime](api/method/isworktime.md) 方法:

~~~js
// 将 2025 年 1 月 1 日标记为休息日
gantt.setWorkTime({ date: new Date(2025, 0, 1), hours: false });
gantt.isWorkTime(new Date(2025, 0, 1)); // -> false  /*!*/

// 将 2025 年 3 月 15 日标记为 8:00 到 17:00 的工作日
gantt.setWorkTime({ date: new Date(2025, 2, 15), hours: ["8:00-17:00"] });
gantt.isWorkTime(new Date(2025, 2, 15, 10, 0), "hour"); // -> true  /*!*/
gantt.isWorkTime(new Date(2025, 2, 15, 8, 0), "hour"); // -> false  /*!*/
~~~


[Correct task position on drag](https://docs.dhtmlx.com/gantt/samples/09_worktime/05_adjust_to_worktime.html)


### 获取工作时间 {#getworktime}

要检索特定日期的工作时间段，请使用 [getWorkHours](api/method/getworkhours.md) 方法:

~~~js
gantt.getWorkHours(new Date(2025, 3, 30)); // -> ["8:00-17:00"]
~~~

要查找距离给定日期最近的工作日，请使用 [getClosestWorkTime](api/method/getclosestworktime.md) 方法:

~~~js
gantt.getClosestWorkTime(new Date(2025, 3, 30));
~~~


### 重复特定工作时间 {#repeat_worktime}

有时需要设置仅在特定日子重复的工作时间（例如每月最后一个星期五为短工时，或 12 月 25 日为节假日），贯穿整个项目周期。

目前，dhtmlxGantt 不支持内置的此类重复工作时间配置。仅支持以下方式:

- 按星期几（如周一、周二等）设置工作时间
- 为特定日期（如 2025 年 6 月 4 日）设置工作时间
- 为日期范围覆盖工作时间规则（如 2025 年 6 月 1 日至 9 月 1 日）

因此，如果您有工作时间规则的例外情况，需要手动识别符合条件的日期，并分别为每个日期应用工作时间设置。

例如，如果您的项目持续 5 年，并希望每年 1 月 1 日为休息日，每月最后一个星期五为短工时，可以如下硬编码 1 月 1 日为休息日:

~~~js
gantt.setWorkTime({ hours: false, date: new Date(2025, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2026, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2027, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2028, 0, 1) });
gantt.setWorkTime({ hours: false, date: new Date(2029, 0, 1) });
~~~

以下是将每月最后一个星期五标记为短工时的示例:

~~~js
const lastFridayOfMonth = (date) => {
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    if (lastDay.getDay() < 5) {
        lastDay.setDate(lastDay.getDate() - 7);
    }

    lastDay.setDate(lastDay.getDate() - (lastDay.getDay() - 5));

    return lastDay;
};

const projectStart = new Date(2025, 5, 1);
const projectEnd = new Date(2026, 5, 1);
let currentDate = new Date(projectStart);

while (currentDate <= projectEnd) {
    const lastFriday = lastFridayOfMonth(currentDate);
    gantt.setWorkTime({ hours: ["8:00-12:00", "13:00-15:00"], date: lastFriday });
    currentDate = gantt.date.add(currentDate, 1, "month");
}
~~~


### 为休息时间着色 {#color_dayoff_times}

要在图表区域高亮显示休息时间，请使用 [timeline_cell_class](api/template/timeline_cell_class.md) 模板:

~~~js
gantt.templates.timeline_cell_class = (task, date) => 
    !gantt.isWorkTime({ task, date }) ? "week_end" : "";
~~~


[Custom working days and time](https://docs.dhtmlx.com/gantt/samples/09_worktime/04_custom_workday_duration.html)


更多信息请参见 [타임 슬롯 하이라이트하기](guides/highlighting-time-slots.md) 文章。

:::note
如果您希望隐藏休息时间，请参考 [스케일에서 시간 단위 숨기기](guides/custom-scale.md) 中的方法。
:::

## 多工作时间日历

除了全局工作时间设置外，Gantt 还支持创建多个工作时间日历。这些日历可以分配给特定任务或任务组。

### 创建工作日历 {#createcalendar}

您可以使用 [createCalendar](api/method/createcalendar.md) 方法创建新的日历实例。

该方法有两种使用方式:

- 不传递参数时，创建一个全天候日历（每天 24 小时，周 7 天均为工作日）:

~~~js
const calendar = gantt.createCalendar();
~~~

- 如果希望基于已有日历创建新日历并应用不同的选项，可将已有日历作为参数传递给 [createCalendar](api/method/createcalendar.md) 方法:

~~~js
const newCalendar = gantt.createCalendar(calendar);
~~~

最初，该日历对象与 Gantt 脱离，只有添加到 Gantt 后才会生效。

### 将工作日历添加到 Gantt {#addcalendar}

创建日历后，需使用 [addCalendar](api/method/addcalendar.md) 方法将其添加到 Gantt。方式有两种:

- 添加已存在的日历配置:

~~~js
const calendarId = gantt.addCalendar(calendar);
~~~

- 或设置新的日历配置，包括日历 id 及包含工作日和工作时间的 **worktime** 对象:

~~~js
const calendarId = gantt.addCalendar({
    id: "custom", // 可选
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});
~~~

:::note
此方式也可用于创建新日历。
:::

### 为不同时间段设置不同的工作时间 {#rules_for_periods}

从 v7.1 起，可以在单个日历中为不同的时间段定义不同的工作时间规则。例如，您可以为冬季月份设置单独的作息时间表。方法是在 [addCalendar](api/method/addcalendar.md) 方法中使用 **customWeeks** 属性:

~~~js
const calendarId = gantt.addCalendar({
    id: "global", // 可选
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1],
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // 2025年12月1日
                to: new Date(2026, 2, 1), // 2026年3月1日 00:00
                hours: ["9:00-13:00", "14:00-16:00"],
                days: [1, 1, 1, 1, 0, 0, 0]
            }
        }
    }
});
~~~


[Different worktimes for different time periods](https://docs.dhtmlx.com/gantt/samples/09_worktime/12_calendar_ranges.html)


### 更改工作时间 {#change_worktime}

可通过 [setWorkTime()](api/method/setworktime.md) 方法，更新日历中特定日期的工作时间:

~~~js
const calendar = gantt.getCalendar("custom");
calendar.setWorkTime({ day: 6, hours: ["8:00-12:00"] });
calendar.setWorkTime({ date: new Date(2025, 0, 1), hours: ["8:00-12:00"] });
~~~

### 获取日历 {#multipleworktimecalendars}

有多种方式可以获取工作日历对象以便进一步使用。

#### 获取全局 Gantt 日历 {#getglobalcalendar}

使用 [getCalendar](api/method/getcalendar.md) 方法获取全局 Gantt 日历对象:

~~~js
const calendar = gantt.getCalendar(id);
~~~

*calendar* 对象是 [calendar](api/other/calendar.md) 接口的实例。

可通过预定义的 **"global"** id 访问默认日历（全局设置）:

~~~js
const globalSettings = gantt.getCalendar("global");
~~~

当未指定其他日历时，[工作时间方法](guides/working-time.md#quanjushezhi) 使用此日历。它默认分配给任务。

#### 获取任务的当前日历 {#gettaskcalendar}

要获取分配给某任务的工作日历，使用 [getTaskCalendar](api/method/gettaskcalendar.md) 方法，并传递任务对象:

~~~js
const task = gantt.getTask(taskId);
const calendar = gantt.getTaskCalendar(task);

if (calendar.isWorkTime(date)) {
    alert("TaskWorkTime");
}
~~~


[Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)


如果 Gantt 配置中禁用了工作时间，此方法将返回一个 24/7 工作时间日历。

### 使用全局方法访问日历 {#globalmethodsforcalendars}

Gantt 对象的 [工作时间方法](guides/working-time.md#quanjushezhi) 可用于计算任务的时间持续，无需手动访问其日历。

这些方法接受一个对象参数，其中包含相关的 "task" 对象属性。

- [**gantt.isWorkTime**](api/method/isworktime.md)

~~~js
if (gantt.isWorkTime({ date: date, task: task })) {
    alert(`Work time of a task: ${task.text}`);
}
~~~

等同于:

~~~js
const calendar = gantt.getTaskCalendar(task);

if (calendar.isWorkTime({ date: date })) {
    alert(`Work time of a task: ${task.text}`);
}
~~~

- [**gantt.calculateEndDate**](api/method/calculateenddate.md)

~~~js
const endDate = gantt.calculateEndDate({  
    start_date: date, duration: duration, task: task  
});
// 或
const endDate = gantt.calculateEndDate(task);
~~~

- [**gantt.calculateDuration**](api/method/calculateduration.md)

~~~js
const duration = gantt.calculateDuration({  
    start_date: start, end_date: end, task: task  
});
// 或
const duration = gantt.calculateDuration(task);
~~~

- [**gantt.getClosestWorkTime**](api/method/getclosestworktime.md)

~~~js
const closestTime = gantt.getClosestWorkTime({ date: date, task: task });
~~~

### 获取所有 Gantt 日历 {#getallcalendars}

要检索添加到 Gantt 的所有日历（包括全局日历和分配给任务的日历），使用 [getCalendars](api/method/getcalendars.md) 方法:

~~~js
const calendars = gantt.getCalendars();
~~~

该方法返回一个 [Calendar interface](api/other/calendar.md) 对象数组。

### 删除日历 {#deletecalendar}

如无需某个日历，可通过 [deleteCalendar](api/method/deletecalendar.md) 方法，传递其 id 进行删除:

~~~js
// 添加日历
gantt.addCalendar({
    id: "custom",
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});

// 删除日历
gantt.deleteCalendar("custom");
~~~

##为任务分配日历

要为任务分配工作日历，首先需使用 id 和指定工作日与工作时间的 **worktime** 对象添加日历:

~~~js
gantt.addCalendar({
    id: "custom", // 可选
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});
~~~

然后，在任务对象中将该日历的 id 作为 **"calendar_id"** 属性的值:

~~~js
{
    id: 2, text: "Task #1", start_date: "02-04-2025", duration: 8,
    calendar_id: "custom" /*!*/
}
~~~

你可以通过配置项 [calendar_property](api/config/calendar_property.md) 更改用于关联日历的任务属性名:

~~~js
gantt.config.calendar_property = "property_name";
~~~


[Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)


##为资源分配日历

:::note
此功能仅在 PRO 版本中可用。
:::

还可以为需要特定资源（如人员或设备）的任务分配专属工作日历。

例如，可以根据分配给任务的用户为任务设置独立的日历。操作流程如下:

- 使用配置属性 [resource_property](api/config/resource_property.md) 定义存储资源 id 的任务属性。在下例中，名为 **user** 的属性用于存储用户 id:

~~~js
gantt.config.resource_property = "user";
~~~

- 使用配置项 [resource_calendars](api/config/resource_calendars.md) 为每个用户添加日历，并将其分组到一个对象中:

~~~js
gantt.config.resource_calendars = {
    1 : gantt.addCalendar({
        worktime: {
            days: [0, 1, 1, 1, 1, 1, 0]
        }
    }),
    2 : gantt.addCalendar({
        worktime: {
            days: [1, 0, 0, 0, 0, 0, 1]
        }
    }),
    3 : gantt.addCalendar({
        worktime: {
            days: [0, 1, 1, 1, 0, 1, 1]
        }
    })
};
~~~

该对象使用资源 id 作为键，[addCalendar](api/method/addcalendar.md) 方法返回的日历 id 作为值。

- 在任务配置对象中指定 **user** 属性。其值应与 **resource_calendars** 配置中的相关日历键一致:

~~~js
{ id: 1, user: 1, text: "Project #2", start_date: "01-04-2025", duration: 5 },
{ id: 2, user: 0, text: "Task #1", start_date: "02-04-2025", duration: 2 },
{ id: 3, user: 2, text: "Task #2", start_date: "11-04-2025", duration: 4 },
{ id: 4, user: 3, text: "Task #3", start_date: "13-04-2025", duration: 3 },
{ id: 5, user: 0, text: "Task #1.1", start_date: "02-04-2025", duration: 7 },
{ id: 6, user: 1, text: "Task #1.2", start_date: "03-04-2025", duration: 7 }
~~~


[Resource level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/07_resource_calendars.html)


:::note
当任务同时拥有自定义日历和资源日历时，自定义日历优先生效并覆盖资源日历设置。
:::

### 合并多个日历 {#mergingcalendars}

自 v7.0 起，支持将多个日历合并为一个。


例如，若同一任务分配了两个拥有不同工作日历的资源--一个工作时间为 9:00-15:00，另一个为 12:00-17:00--合并后得到的日历工作时间为 12:00-15:00。

将配置项 [dynamic_resource_calendars](api/config/dynamic_resource_calendars.md) 设为 *true* 可自动启用该功能:

~~~js
gantt.config.dynamic_resource_calendars = true;
~~~


[Merge work Calendars of different resources](https://docs.dhtmlx.com/gantt/samples/09_worktime/10_merge_calendars.html)


你也可以通过 [mergeCalendars](api/method/mergecalendars.md) 方法手动合并日历:

~~~js
const johnCalendarId = gantt.addCalendar({
    worktime: {
        hours: ["0:00-24:00"],
        days: [0, 1, 1, 1, 1, 1, 0]
    }
});

const mikeCalendarId = gantt.addCalendar({
    worktime: {
        hours: ["8:00-12:00", "13:00-17:00"],
        days: [0, 1, 1, 1, 1, 1, 0]
    }
});

const joinedCalendar = gantt.mergeCalendars(
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
);
~~~

有关工作时间合并方式的详细说明，请参阅 [mergeCalendars()](api/method/mergecalendars.md) 文章。

##为项目分配日历

:::note
此功能仅在 PRO 版本中可用。
:::

不仅可以为单个任务或资源分配工作日历，还可以为项目分配，使任务自动继承其父项目的日历。

继承逻辑如下:

- 当将日历分配给带有任务的子项目时，该项目下的所有任务都会继承该日历。
- 如果任务已分配了自己的日历，则优先使用该日历而非父项目的日历。

要启用该功能，需要将配置项 [inherit_calendar](api/config/inherit_calendar.md) 设为 *true*。默认情况下该选项为禁用状态。

~~~js
gantt.config.inherit_calendar = true;
~~~

- 若为 *true*，未分配日历的任务将使用其汇总父任务（也可能继续向上继承）的日历。
- 若为 *false*，此类任务将使用全局日历。

下例中，任务默认继承其父项目的日历。拥有自定义日历的任务则使用自身日历。例如，"Task #2.2" 和 "Task #3" 使用 "Full week" 日历，与其父项目不同:

![Working calendar for project](/img/working_calendar_project.png)


[Project level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)


##动态更换日历

自 7.0 版本起，Gantt 会自动检测任务日历的变更，并相应更新任务时间。

如有需要，你也可以在日历变更时手动调整任务计划。例如，可以通过 lightbox 处理日历变更:

~~~js
const updateTaskTiming = (task) => {
    task.start_date = gantt.getClosestWorkTime({
        dir: "future",
        date: task.start_date,
        unit: gantt.config.duration_unit,
        task: task
    });
    task.end_date = gantt.calculateEndDate(task);
};

gantt.attachEvent("onLightboxSave", (id, task, is_new) => {
    updateTaskTiming(task);
    return true;
});
~~~

或者，在需要时为所有任务触发重新计算:

~~~js
gantt.batchUpdate(() => {
    gantt.eachTask((task) => {
        task.start_date = gantt.getClosestWorkTime({
            dir: "future",
            date: task.start_date,
            unit: gantt.config.duration_unit,
            task: task
        });
        task.end_date = gantt.calculateEndDate(task);
        gantt.updateTask(task.id);
    });
});
~~~


**Related example:** [切换工作时间设置并将任务移动到工作日](https://snippet.dhtmlx.com/6cvo9dy9)


**Related example:** [切换工作时间设置并重新计算任务结束日期](https://snippet.dhtmlx.com/wb8vc82p)

