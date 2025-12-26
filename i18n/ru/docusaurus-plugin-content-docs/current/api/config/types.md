---
sidebar_label: types
title: types config
description: "хранит имена структур lightbox (используются для разных типов задач)"
---

# types
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Хранит имена структур lightbox (используются для разных типов задач)

@signature: types: \{ task?: string | number; project?: string | number; milestone?: string | number; placeholder?: string | number; [typeName: string]: string | number | undefined; \}

### Example

~~~jsx
var type1 = gantt.config.types.task;
~~~

**Default value:** types : \{task:'task',project:'project',milestone:'milestone', placeholder: "placeholder"\}

### Related samples
- [Projects and milestones](https://docs.dhtmlx.com/gantt/samples/01_initialization/16_projects_and_milestones.html)

### Details

Объект 'types' состоит из пар **«программное имя типа»** и **«идентификатор типа»**:

- Программное имя служит для удобства и ясности, облегчая работу с типами.
- Идентификатор типа - это то, что сохраняется в базе данных. Он должен быть уникальным в пределах объекта types. При необходимости вы можете изменить идентификатор на любое значение:
~~~js
{"task":0,"project":1,"milestone":2}
~~~


Вот стандартные типы:

- **task** - (*string | number*) - идентификатор типа задачи.
- **project** - (*string | number*) - идентификатор типа проекта.
- **milestone** - (*string | number*) - идентификатор типа вехи.
- **placeholder** - (*string | number*) - идентификатор типа-заполнителя.
- **[typeName: string]** - (*string | number | undefined*) - идентификатор для любого пользовательского типа.

Gantt выберет lightbox в зависимости от типа задачи:

~~~js
types: {
    'task':'task',            // lightbox для обычных задач
    'project':'project',      // lightbox для проектных задач
    'milestone':'milestone'   // lightbox для вех
}
~~~

### Related Guides
- [Типы задач](guides/task-types.md)
