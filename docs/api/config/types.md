---
sidebar_label: types
title: types config
description: "stores the names of lightbox's structures (used for different types of tasks)"
---

# types

### Description

@short: Stores the names of lightbox's structures (used for different types of tasks)

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
pronote This functionality is available in the PRO edition only. 
:::

The 'types' object consists of the **"type programmatic name"**: **"type identifier"** pairs:


  The type programmatic name doesn't affect anything. The only purpose of it is to make the work with types more readable.
  The type identifier is stored in the database. It must be unique within the types' object. If required, the type identifier can be changed to any desirable value:
~~~js
{"task":0,"project":1,"milestone":2}
~~~
  


The expected types are:

- **task** - (*string | number*) - the name of the task type.
- **project** - (*string | number*) - the name of the project type.
- **milestone** - (*string | number*) - the name of the milestone type.
- **placeholder** - (*string | number*) - the name of the placeholder type.
- **[typeName: string]** - (*string | number | undefined*) - name of the custom type.


Gantt will use the lightbox depending on the task type:

~~~js
types: {
    'task':'task',            // a lightbox for reqular tasks
    'project':'project',      // a lightbox for project tasks
    'milestone':'milestone'   // a lightbox for milestones
}
~~~

### Related Guides
- [Task Types](guides/task-types.md)
