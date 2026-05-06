---
sidebar_label: isWorkTime
title: isWorkTime 方法
description: "检查指定日期是否在工作时间内"
---

# isWorkTime 方法

### Description

@short: 检查指定日期是否在工作时间内

@signature: isWorkTime: Calendar['isWorkTime']

### Parameters

- `config` - (required) *object | Date* - 要么是时间段的配置对象，要么是一个具体日期

### Returns
- ` isWorkTime` - (boolean) - <i>true</i>，如果指定日期是工作时间；否则，<i>false</i>

### Example

~~~jsx
// 根据全局设置检查指定日期是否为工作日
gantt.isWorkTime({ date: new Date(2023,3,5) });
// 或者
gantt.isWorkTime(new Date(2023,3,5));

// 检查指定日期是否为某个特定任务的工作日
gantt.isWorkTime({date: new Date(2023,3,5), task: task});
~~~

### Details

:::note
如果 [work_time](api/config/work_time.md) 选项被禁用，该方法始终返回 `true`。
:::

- 如果未指定任务，该方法将使用全局工作时间日历（ [global work time calendar](guides/working-time.md#multipleworktimecalendars) ）
- 此外，可以直接从 [calendar object](api/other/calendar.md) 调用该方法。

让我们假设您为图表设置了以下工作时间：

- **工作日**：周一至周五
- **工作时段**：6:00 - 15:00

那么，如果按如下方式检查 2023 年 4 月 3 日（星期一），您将得到：

~~~js
gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit: "hour"}); 
//->false，因为下午5点到6点不在工作时间内

gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit:  "day"}); 
//-> true，因为星期一是工作日
~~~

## 配置对象属性

配置对象可以包含以下属性:

- **date** - (*Date*) 要检查的日期
- **unit** - (string) 可选，一个时间单位： "minute", "hour", "day", "week", "month", "year"
- **task** - (*object*) 可选，要计算持续时间的任务对象

~~~js
if (gantt.isWorkTime({date: date, task: task})){
    alert("worktime of task" + task.text);
}
~~~

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [getWorkHours](api/method/getworkhours.md)

### Related Guides
- [工作时间计算](guides/working-time.md)