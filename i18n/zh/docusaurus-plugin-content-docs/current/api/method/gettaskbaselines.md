---
sidebar_label: getTaskBaselines
title: getTaskBaselines method
description: "从数据存储中检索与特定任务关联的基线数组"
---

# getTaskBaselines
:::info
 此功能仅包含在PRO版本中。 
:::
### Description

@short: 从数据存储中检索与特定任务关联的基线数组

@signature: getTaskBaselines: (taskId: string | number) =\> Baseline[]

### Parameters

- `taskId` - (required) *string | number* -    任务的唯一标识符

### Returns
- ` param` - (Baseline[]) - 包含基线对象的数组

### Example

~~~jsx
gantt.getTaskBaselines(5); // -> 查看详情
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

:::note
 如果关闭了 [baselines](api/config/baselines.md) 配置，**getTaskBaselines** 方法将无法使用。 
:::

此方法返回一个包含**基线**对象的数组，每个对象具有以下属性:

- **id** - (*string | number*) - 唯一的基线ID
- **task_id** - (*string | number*) - 此基线关联的任务ID
- **start_date** - (*Date*) - 基线的开始时间
- **duration** - (*number*) - 基线持续的时间长度
- **end_date** - (*Date | number*) - 基线的结束时间
- **[customProperty: string]** - (*any*) - 任何额外的自定义属性

示例:

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
- 在v9.0中新增

