---
sidebar_label: types
title: types config
description: "存储 lightbox 结构的名称（用于不同类型的任务）"
---

# types

### Description

@short: Lightbox 的结构名称（用于不同类型的任务）

@signature: types: \{ task?: string | number; project?: string | number; milestone?: string | number; placeholder?: string | number; [typeName: string]: string | number | undefined; \}

### Example

~~~jsx
var type1 = gantt.config.types.task;
~~~

**Default value:** types : \{task:'task',project:'project',milestone:'milestone', placeholder: "placeholder"\}

### Related samples
- [Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)

### Details

:::note
此功能仅在 PRO 版本中可用。 
:::

The 'types' object consists of the **"type programmatic name"**: **"type identifier"** pairs:

  The type programmatic name doesn't affect anything. The only purpose of it is to make the work with types more readable.
  The type identifier is stored in the database. It must be unique within the types' object. If required, the type identifier can be changed to any desirable value:
~~~js
{"task":0,"project":1,"milestone":2}
~~~

The expected types are:

- **task** - (*string | number*) - 任务类型的名称。
- **project** - (*string | number*) - 项目类型的名称。
- **milestone** - (*string | number*) - 里程碑类型的名称。
- **placeholder** - (*string | number*) - 占位符类型的名称。
- **[typeName: string]** - (*string | number | undefined*) - 自定义类型的名称。

Gantt 将根据任务类型使用相应的 lightbox：

~~~js
types: {
    'task':'task',            // a lightbox for reqular tasks
    'project':'project',      // a lightbox for project tasks
    'milestone':'milestone'   // a lightbox for milestones
}
~~~

### Related Guides
- [Task Types](guides/task-types.md)