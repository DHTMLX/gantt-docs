---
sidebar_label: isReadonly
title: isReadonly method
description: "определяет, установлен ли для указанной задачи, ссылки или всей диаграммы Ганта режим только для чтения"
---

# isReadonly

### Description

@short: Определяет, установлен ли для указанной задачи, ссылки или всей диаграммы Ганта режим только для чтения

@signature: isReadonly: (item?: number | string | Task | Link) =\> boolean

### Parameters

- `item` - (optional) *number | string | Task | Link* -    необязательно, идентификатор или объект, представляющий задачу/ссылку. Если параметр опущен, метод проверяет, установлен ли режим только для чтения для всей диаграммы Ганта

### Returns
- ` mode` - (boolean) - <i>true</i>, если указанная задача/ссылка или вся диаграмма Ганта находятся в режиме только для чтения; иначе <i>false</i>

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.isReadonly(10); // ->false

// или 
gantt.isReadonly(gantt.getTask(10)); // -> false
~~~

### Related Guides
- [Режим только для чтения](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)
