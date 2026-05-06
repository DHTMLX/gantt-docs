---
sidebar_label: isReadonly
title: isReadonly method
description: "проверяет, находится ли указанная задача/ссылка, или весь Gantt в режиме только для чтения"
---

# isReadonly

### Description

@short: Проверяет, находится ли указанная задача/ссылка, или весь Gantt в режиме только для чтения

@signature: isReadonly: (item?: number | string | Task | Link) =\> boolean

### Parameters

- `item` - (необязательный) *number | string | Task | Link* - идентификатор или объект задачи/ссылки. Если не указано, метод проверяет, находится ли Gantt в режиме только для чтения

### Returns
- ` mode` - (boolean) - <i>true</i>, если задача/ссылка, или Gantt находится в режиме только для чтения. Иначе, <i>false</i>

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.isReadonly(10); // ->false

// or 
gantt.isReadonly(gantt.getTask(10)); // -> false
~~~

### Related Guides
- [Режим только для чтения](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)