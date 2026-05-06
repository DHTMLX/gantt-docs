---
sidebar_label: getConstraintLimitations
title: getConstraintLimitations Methode
description: "gibt das früheste und das späteste Datum zurück, das durch die auf eine Aufgabe angewendete Constraint-Einschränkung zulässig ist"
---

# getConstraintLimitations

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Gibt das früheste und das späteste Datum zurück, das durch die auf eine Aufgabe angewendete Einschränkung zulässig ist

@signature: getConstraintLimitations: (task: Task) =\> any

### Parameters

- `task` - (erforderlich) *Task* - ein Task-Objekt

### Returns
- ` constraintLimitations` - (object) - ein Objekt, das Constraint-Daten enthält

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

Der Rückgabewert hat die folgende Struktur: 

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