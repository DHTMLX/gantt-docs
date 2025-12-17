---
sidebar_label: types
title: types config
description: "存储 lightbox 结构的名称（用于不同类型的任务）"
---

# types
:::info
 此功能仅在 PRO 版本中可用。 
::: 
### Description

@short: 存储 lightbox 结构的名称（用于不同类型的任务）

@signature: types: \{ task?: string | number; project?: string | number; milestone?: string | number; placeholder?: string | number; [typeName: string]: string | number | undefined; \}

### Example

~~~jsx
var type1 = gantt.config.types.task;
~~~

**Default value:** types : \{task:'task',project:'project',milestone:'milestone', placeholder: "placeholder"\}

### Related samples
- [Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)

### Details

'types' 对象由 **"类型编程名称"** 和 **"类型标识符"** 组成:


- 编程名称主要用于提高代码的可读性，方便操作 types。
- 类型标识符是保存到数据库中的值，在 types 对象中必须唯一。如果需要，可以将标识符更改为任意值:

~~~js
{"task":0,"project":1,"milestone":2}
~~~


常见的类型如下:

- **task** - (*string | number*) - 任务类型的标识符。
- **project** - (*string | number*) - 项目类型的标识符。
- **milestone** - (*string | number*) - 里程碑类型的标识符。
- **placeholder** - (*string | number*) - 占位符类型的标识符。
- **[typeName: string]** - (*string | number | undefined*) - 任意自定义类型的标识符。

Gantt 会根据任务类型选择对应的 lightbox:

~~~js
types: {
    'task':'task',            // 常规任务的 lightbox
    'project':'project',      // 项目任务的 lightbox
    'milestone':'milestone'   // 里程碑的 lightbox
}
~~~

### Related Guides
- [任务类型](guides/task-types.md)
