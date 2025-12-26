---
sidebar_label: getConstraintLimitations
title: getConstraintLimitations method
description: "возвращает самые ранние и поздние даты, разрешённые ограничением, применённым к задаче"
---

# getConstraintLimitations
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Возвращает самые ранние и поздние даты, разрешённые ограничением, применённым к задаче

@signature: getConstraintLimitations: (task: Task) =\> any

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` constraintLimitations` - (object) - объект, содержащий даты ограничений

### Example

~~~jsx
gantt.addTaskLayer(function draw_deadline(task) {
  const constraintType = gantt.getConstraintType(task);
  const types = gantt.config.constraint_types;
  if (constraintType != types.ASAP && 
      constraintType != types.ALAP && task.constraint_date) {

    const dates = gantt.getConstraintLimitations(task);

    const els = document.createElement("div");

    if (dates.earliestStart) {
      els.appendChild(renderDiv(
        task, 
        dates.earliestStart, 
        'constraint-marker earliest-start'
      ));
    }

    if (dates.latestEnd) {
      els.appendChild(renderDiv(
        task, 
        dates.latestEnd, 
        'constraint-marker latest-end'
      ));
    }

    if (els.children.length)
      return els;
  }
  return false;
});

function renderDiv(task, date, className) {
  const el = document.createElement('div');
  el.className = className;
  const sizes = gantt.getTaskPosition(task, date);
  el.style.left = sizes.left + 'px';
  el.style.top = sizes.top + 'px';
  return el;
}
~~~

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details

Возвращаемый объект включает следующие свойства:

~~~js
{
    earliestStart: Date || null,
    earliestEnd: Date || null,
    latestStart: Date || null,
    latestEnd: Date || null
}
~~~

### Related API
- [constraint_types](api/config/constraint_types.md)
- [getConstraintType](api/method/getconstrainttype.md)

