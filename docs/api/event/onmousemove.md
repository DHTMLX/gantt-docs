---
sidebar_label: onMouseMove
title: onMouseMove event
description: "fires when the mouse is moved over the gantt container"
---

# onMouseMove

### Description

@short: Fires when the mouse is moved over the gantt container

@signature: onMouseMove: (id: string | number, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - the id of the task that the mouse is moved over
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
gantt.attachEvent("onMouseMove", function (id, e){
    //any custom logic here
});
~~~

### Details

This event is an alias of the native [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event) event handler attached to the **gantt.$root** element.

When the event target is a node of a task element, the related task id will be passed into the first argument.
Otherwise, the first argument will be null.


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
sample: [Getting date-time under the mouse cursor](https://snippet.dhtmlx.com/3rn86wwq)
:::

### Related API
- [utils](api/other/utils.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline)

