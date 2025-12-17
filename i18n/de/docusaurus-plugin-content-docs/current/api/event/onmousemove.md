---
sidebar_label: onMouseMove
title: onMouseMove event
description: "Wird ausgelöst, wenn sich die Maus über dem Gantt-Container bewegt"
---

# onMouseMove

### Description

@short: Wird ausgelöst, wenn sich die Maus über dem Gantt-Container bewegt

@signature: onMouseMove: (id: string | number, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe, über der sich die Maus gerade befindet
- `e` - (required) *Event* - das native Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onMouseMove", function (id, e){
    // hier Ihre eigene Logik einfügen
});
~~~

### Details

Dieses Event fungiert als Alias für den nativen [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event) Event-Listener, der am **gantt.$root** Element angebracht ist.

Wenn das Event-Target Teil eines Aufgaben-Elements ist, wird die ID der Aufgabe als erstes Argument übergeben.
Falls nicht, ist das erste Argument null.

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
Sample: [Datum und Uhrzeit unter dem Mauszeiger ermitteln](https://snippet.dhtmlx.com/3rn86wwq) 
:::

### Related API
- [utils](api/other/utils.md)

### Related Guides
- ["How-tos"](guides/how-to.md#howtohaveaninfinitescrollinthetimeline)

