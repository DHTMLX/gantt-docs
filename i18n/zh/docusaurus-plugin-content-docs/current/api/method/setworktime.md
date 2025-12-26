---
sidebar_label: setWorkTime
title: setWorkTime method
description: "设置甘特图的工作时间"
---

# setWorkTime

### Description

@short: 设置甘特图的工作时间

@signature: setWorkTime: (config: object) =\> void

### Parameters

- `config` - (required) *object* - 时间段的配置对象

### Example

~~~jsx
gantt.config.work_time = true;

// 将工作日的工作时间从 ["8:00-17:00"] 更新为 ["9:00-18:00"]
gantt.setWorkTime({ hours:["9:00-18:00"] });
 
// 标记所有星期五为非工作日
gantt.setWorkTime({ day:5, hours:false });
 
// 调整星期五和星期六的工作时间
// 从 ["8:00-17:00"] 改为 ["8:00-12:00"]
gantt.setWorkTime({day : 5, hours : ["8:00-12:00"]});
gantt.setWorkTime({day : 6, hours : ["8:00-12:00"]});
 
// 指定3月31日为工作日
gantt.setWorkTime({date : new Date(2013, 2, 31)});
 
// 将1月1日设置为休息日
gantt.setWorkTime({date:new Date(2013,0,1), hours:false})

// 定义工作时间为两个时间段：8:30-12:00，13:00-17:00（允许午休时间）
gantt.setWorkTime({hours : ["8:30-12:00", "13:00-17:00"]})
~~~

### Related samples
- [Calculate working hours](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Details

:::note

此方法仅在启用 [work_time](api/config/work_time.md) 时生效，否则会被忽略。
 
:::

- 如果未指定任务，该方法将应用于[全局工作时间日历](guides/working-time.md#multipleworktimecalendars)。<br>
- 此外，也可以直接从[日历对象](api/other/calendar.md)调用。

默认情况下，工作时间设置如下:

- **工作日**:周一至周五。
- **工作时间**:08:00 - 17:00。

此方法允许您自定义这些默认设置。

## 配置对象属性

配置对象可以包含以下属性:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  属性 
  </th>
  <th>
  描述
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td rowspan="2"><b id="day">day</b></td>
  <td> 表示星期几的数字 [0 (<i>星期日</i>) - 6 (<i>星期六</i>)]. 注意一次只能设置一天。</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 将所有星期一标记为非工作日
gantt.setWorkTime({ day:1, hours:false }); 
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="date">date</b></td>
  <td> 指定某个具体日期作为工作日或休息日</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 将某个具体日期标记为休息日
gantt.setWorkTime({date:new Date(2013,0,1), hours:false})
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="hours">hours</b></td>
  <td> 一个表示工作时间段的数组，格式为 '起始时间'-'结束时间'。<br><i>'false'</i> 表示该日为休息日，<i>'true'（默认）</i> 表示应用默认时间（["8:00-17:00"]）</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 设置星期五的工作时间为 8:00 到 12:00
gantt.setWorkTime({day : 5, hours : ["8:00-12:00"]});
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="hours">customWeeks</b></td>
  <td> 一个定义不同时间段工作时间规则的对象。<br>该对象可以包含键值对，其中 <i>key</i> 是时间段名称，<i>value</i> 是包含以下属性的对象:
  <ul><li><b>from</b> - (<i>Date</i>) 必需，时间段开始日期</li><li><b>to</b> - (<i>Date</i>) 必需，时间段结束日期</li><li><b>hours</b> - (<i>array</i>) 工作时间数组，格式为 '起始时间'-'结束时间'。<br><i>'false'</i> 表示休息日，<i>'true'（默认）</i> 应用默认时间（["8:00-17:00"]）</li><li><b>days</b> - (<i>array</i>) 长度为7的数组，表示一周七天（0 - 星期日到 6 - 星期六），1/true 表示工作日，0/false 表示非工作日。</li></ul></td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 修改冬季月份的工作时间
gantt.setWorkTime({
    customWeeks: {
        winter: {
            from: new Date(2018, 11, 1), // 2018年12月1日
            to: new Date(2019, 2, 1), // 2019年3月1日 00:00
            hours: ["9:00-13:00", "14:00-16:00"],
            days: [ 1, 1, 1, 1, 0, 0, 0]
        }
    }
});
~~~
  </td>
  </tr>
  </tbody>
</table>

## 设置夜班工作时间

在 [setWorkTime](api/method/setworktime.md) 配置对象中指定 **hours** 属性时，时间段应按从早到晚的顺序列出。如果按降序提供，某些时间段可能会被忽略。例如，以下情况中 `18:00` 之后的时间段会被忽略:

~~~js
// 错误的设置示例
gantt.setWorkTime({day : 5, hours : ["16:00-18:00", "14:00-15:00",  "08:00-10:00"]});
gantt.setWorkTime({day : 5, hours : ["16:00-18:00", "00:00-04:00",  "05:00-06:00"]});
~~~

要正确指定夜班时间，应将其拆分到两天:

- 第一天内的24小时范围
- 第二天内的24小时范围

例如:

~~~js
gantt.setWorkTime({day : 5, hours : ["16:00-18:00"]});
gantt.setWorkTime({day : 6, hours : ["00:00-04:00",  "05:00-06:00"]});
~~~

## 重写工作时间规则

对同一日期多次调用此方法时，后一次调用会覆盖前一次的工作时间设置:

~~~js
gantt.setWorkTime({hours:["8:00-12:00"]});
gantt.setWorkTime({hours:["13:00-17:00"]});
// 最终工作时间为 13:00-17:00，
// 不是两个时间段的合并
~~~

## 设置自定义工作日和休息日

不允许设置排除所有工作日或工作时间的工作时间规则。例如，以下设置无效:

~~~js
gantt.setWorkTime({ day: 0, hours: [] });
gantt.setWorkTime({ day: 1, hours: [] });
gantt.setWorkTime({ day: 2, hours: [] });
gantt.setWorkTime({ day: 3, hours: [] });
gantt.setWorkTime({ day: 4, hours: [] });
gantt.setWorkTime({ day: 5, hours: [] });
gantt.setWorkTime({ day: 6, hours: [] });
~~~

在这种情况下，Gantt 会忽略其中某一天的设置，意味着该天仍有工作时间。

如果尝试基于这样的设置计算最近的工作时间或持续时间，将无法找到有效的日期或持续时间。实际上，这样的日历配置无效。即使某些具体日期有工作时间，计算也只会在包含工作日和工作时间的范围内正确工作。尝试在这些范围之外计算可能导致错误或无结果。

若要创建某些月份或年份完全为非工作日的日历，应使用 **setWorkTime()** 的 *customWeeks* 选项。要在所需范围内定义工作日和工作时间，应:

- 将时间线划分为无工作时间的时间段
- 明确为所需日期设置工作时间

示例:

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

:::note
Sample: [使用 `customWeeks` 使日历中的所有天为休息日](https://snippet.dhtmlx.com/i0o74zg7)
:::

### Related API
- [work_time](api/config/work_time.md)
- [unsetWorkTime](api/method/unsetworktime.md)
- [isWorkTime](api/method/isworktime.md)

### Related Guides
- [工作时间计算](guides/working-time.md)

### Change log
- **customWeeks** 属性在 v7.1 中引入；
- **hours** 属性的格式在 7.0 版本中更改。

