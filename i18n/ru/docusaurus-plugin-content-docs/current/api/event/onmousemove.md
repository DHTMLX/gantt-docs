---
sidebar_label: onMouseMove
title: onMouseMove событие
description: "срабатывает при перемещении мыши над контейнером gantt"
---

# onMouseMove

### Description

@short: Функция вызывается при перемещении мыши над контейнером gantt

@signature: onMouseMove: (id: string | number, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - id задачи, над которой перемещается указатель мыши
- `e` - (required) *Event* - объект нативного события

### Example

~~~jsx
gantt.attachEvent("onMouseMove", function (id, e){
    // любая ваша логика здесь
});
~~~

### Details

Это событие является псевдонимом нативного обработчика события [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event) прикрепленного к элементу **gantt.$root**.

Если целевой элемент является узлом элемента задачи, в первый аргумент будет передано соответствующее id задачи.
В противном случае первый аргумент будет равен null.


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
sample: [Получение даты и времени под курсором мыши](https://snippet.dhtmlx.com/3rn86wwq)
:::



### Related API
- [utils](api/other/utils.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline)