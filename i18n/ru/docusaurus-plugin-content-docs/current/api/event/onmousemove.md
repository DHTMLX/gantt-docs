---
sidebar_label: onMouseMove
title: onMouseMove event
description: "срабатывает при перемещении мыши над контейнером gantt"
---

# onMouseMove

### Description

@short: Срабатывает при перемещении мыши над контейнером gantt

@signature: onMouseMove: (id: string | number, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - id задачи, над которой в данный момент находится мышь
- `e` - (required) *Event* - родной объект события

### Example

~~~jsx
gantt.attachEvent("onMouseMove", function (id, e){
    // разместите здесь вашу пользовательскую логику
});
~~~

### Details

Это событие является алиасом для родного слушателя события [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event), прикрепленного к элементу **gantt.$root**.

Если цель события является частью элемента задачи, в качестве первого аргумента будет передан id задачи.
Если нет - первый аргумент будет равен null.


~~~js
gantt.message({
    expire: -1,
    text: ""
});

const formatDate = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.attachEvent("onMouseMove", function (id, e){
    const helper = gantt.utils.dom;
    if(helper.isChildOf(e.target, gantt.$task_data)){
          const textContainer = document.querySelector("#pointer-date");
        const pos = helper.getRelativeEventPosition(e, gantt.$task_data);
        const pointerDate = gantt.dateFromPos(pos.x);
        textContainer.innerText = formatDate(pointerDate);
    }
});
~~~
:::note
Sample: [Получение даты и времени под курсором мыши](https://snippet.dhtmlx.com/3rn86wwq) 
:::

### Related API
- [utils](api/other/utils.md)

### Related Guides
- [Решения](guides/how-to.md#howtohaveaninfinitescrollinthetimeline)

