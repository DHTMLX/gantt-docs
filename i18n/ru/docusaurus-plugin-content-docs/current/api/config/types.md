---
sidebar_label: types
title: types config
description: "хранит имена структур lightbox, используемых для разных типов задач"
---

# types

### Description

@short: Хранит имена структур lightbox, используемых для разных типов задач

@signature: types: \{ task?: string | number; project?: string | number; milestone?: string | number; placeholder?: string | number; [typeName: string]: string | number | undefined; \}

### Example

~~~jsx
var type1 = gantt.config.types.task;
~~~

**Значение по умолчанию:** types : \{task:'task',project:'project',milestone:'milestone', placeholder: "placeholder"\}

### Related samples
- [Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)

### Details

:::note
Примечание: Эта функциональность доступна только в PRO-версии.
:::

Объект 'types' состоит из пар **"type programmatic name"**: **"type identifier"**:

  Имя программного типа не влияет ни на что. Единственная его цель — сделать работу с типами более читаемой.
  Идентификатор типа хранится в базе данных. Он должен быть уникальным в пределах объекта types. При необходимости идентификатор типа можно изменить на любое желаемое значение:
~~~js
{"task":0,"project":1,"milestone":2}
~~~

Ожидаемые типы:

- **task** - (*string | number*) - имя типа задачи.
- **project** - (*string | number*) - имя типа проекта.
- **milestone** - (*string | number*) - имя типа milestone.
- **placeholder** - (*string | number*) - имя типа placeholder.
- **[typeName: string]** - (*string | number | undefined*) - название пользовательного типа.

Gantt будет использовать lightbox в зависимости от типа задачи:

~~~js
types: {
    'task':'task',            // a lightbox for reqular tasks
    'project':'project',      // a lightbox for project tasks
    'milestone':'milestone'   // a lightbox for milestones
}
~~~

### Related Guides
- [Типы задач](guides/task-types.md)