---
sidebar_label: getConstraintLimitations
title: getConstraintLimitations method
description: "작업에 적용된 제약 조건에 의해 허용되는 가장 이른 날짜와 가장 늦은 날짜를 반환합니다."
---

# getConstraintLimitations

### Description

@short: 작업에 적용된 제약 조건에 의해 허용되는 가장 이른 날짜와 가장 늦은 날짜를 반환합니다.

@signature: getConstraintLimitations: (task: Task) =\> any

### Parameters

- `task` - (required) *Task* - 작업 객체

### Returns
- ` constraintLimitations` - (object) - 제약 날짜를 포함하는 객체

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

:::note
pronote 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

반환되는 객체는 다음 속성을 포함합니다:

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

