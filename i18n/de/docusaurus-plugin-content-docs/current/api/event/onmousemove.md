---
sidebar_label: onMouseMove
title: onMouseMove-Ereignis
description: "feuert, wenn sich die Maus über dem Gantt-Container bewegt"
---

# onMouseMove

### Description

@short: Feuert, wenn sich die Maus über dem Gantt-Container bewegt

@signature: onMouseMove: (id: string | number, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe, über der sich die Maus bewegt
- `e` - (required) *Event* - ein natives Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onMouseMove", function (id, e){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Details

Dieses Event ist ein Alias des nativen [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event) Event-Handler, der an das **gantt.$root**-Element gebunden ist.

Wenn das Eventziel ein Knoten eines Aufgaben-Elements ist, wird die zugehörige Aufgaben-ID im ersten Argument übergeben.
Andernfalls wird das erste Argument auf null gesetzt.

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
sample: [Datum-Uhrzeit unter dem Mauszeiger](https://snippet.dhtmlx.com/3rn86wwq)
:::

### Related API
- [utils](api/other/utils.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline)