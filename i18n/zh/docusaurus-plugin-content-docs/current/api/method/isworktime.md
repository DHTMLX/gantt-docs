---
sidebar_label: isWorkTime
title: isWorkTime method
description: "判断给定日期是否处于工作时间内"
---

# isWorkTime

### Description

@short: 判断给定日期是否处于工作时间内

@signature: isWorkTime: (config: Date | object) =\> boolean

### Parameters

- `config` - (required) *object | Date* -        可以是描述时间段的配置对象，也可以是具体的日期

### Returns
- ` isWorkTime` - (boolean) - <i>true</i> 表示给定日期处于工作时间内；否则为 <i>false</i>

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

如果 [work_time](api/config/work_time.md) 选项被关闭，该方法将始终返回 `true`。
 
:::

- 当未提供任务时，该方法参考[全局工作时间日历](guides/working-time.md#multipleworktimecalendars)。<br>
- 该方法也可以直接从[calendar对象](api/other/calendar.md)调用。


以下是甘特图的工作时间设置示例:

- **工作日**:周一至周五
- **工作时间**:上午6:00至下午3:00

如果检查2023年4月3日星期一，如下所示，结果为:

~~~js
gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit: "hour"}); 
//->false，因为下午5点到6点不在工作时间内

gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit:  "day"}); 
//-> true，因为星期一是工作日
~~~

## 配置对象属性

配置对象可以包含以下属性:

- **date** - (*Date*) 要检查的日期
- **unit** - (string)    可选，指定时间单位:"minute"、"hour"、"day"、"week"、"month"、"year"
- **task** - (*object*)    可选，指定需要确定工作时长的任务对象

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

