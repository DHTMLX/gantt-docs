---
sidebar_label: getTaskBaselines
title: getTaskBaselines method
description: "从数据存储中返回特定任务的基线数组"
---

# getTaskBaselines

:::info
 此功能仅包含在PRO版本中。 
:::

### Description

@short: 从数据存储中返回特定任务的基线数组

@signature: getTaskBaselines: (taskId: string | number) =\> Baseline[]

### Parameters

- `taskId` - (required) *string | number* -    任务 ID

### Returns
- ` param` - (Baseline[]) - Baseline 对象数组

### Example

~~~jsx
gantt.getTaskBaselines(5); // -> 查看详情
~~~

### Related samples
- [显示基线](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

:::note
 如果关闭了 [baselines](api/config/baselines.md) 配置，**getTaskBaselines** 方法将无法使用。 
:::

此方法返回一个包含**基线**对象的数组，每个对象具有以下属性:

- **id** - (*string | number*) - 基线 ID
- **task_id** - (*string | number*) - 该基线所属任务的 ID
- **start_date** - (*Date*) - 基线的开始日期
- **duration** - (*number*) - 基线的持续时间
- **end_date** - (*Date | number*) - 基线的结束日期
- **[customProperty: string]** - (*any*) - 任意自定义属性
- **className** - (*string | number*) - 此属性的值被 Gantt 用作 HTML 元素的自定义类名


例如：

~~~js
[
    {
        task_id: 5,
        id: 1, 
        duration: 2, 
        start_date: "03-04-2019 00:00", 
        end_date: "05-04-2019 00:00"
    },
    {
        task_id: 5,
        id: 2, 
        duration: 1, 
        start_date: "06-04-2019 00:00", 
        end_date: "07-04-2019 00:00"
    }
]
~~~

### Related Guides
- [时间线中的额外元素](guides/inbuilt-baselines.md)

### Change log
- 新增于 v9.0