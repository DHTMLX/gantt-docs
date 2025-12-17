---
sidebar_label: onScaleClick
title: onScaleClick event
description: "Wird ausgelöst, wenn ein Benutzer auf eine Zelle innerhalb der Zeitskala klickt"
---

# onScaleClick

### Description

@short: Wird ausgelöst, wenn ein Benutzer auf eine Zelle innerhalb der Zeitskala klickt

@signature: onScaleClick: (e: Event, date: Date) =\> void;

### Parameters

- `e` - (required) *Event* - Ein natives Event-Objekt
- `date` - (required) *Date* - Das Datum, das der angeklickten Zelle entspricht

### Example

~~~jsx
gantt.attachEvent("onScaleClick", function (e, date) {
    //Ihr eigener Code
});
~~~

### Details

~~~js
let selected_column = null;

gantt.attachEvent("onScaleClick", function (e, date) {
    selected_column = date;
    const pos = gantt.getScrollState();
    gantt.render();
    gantt.scrollTo(pos.x, pos.y);
});

function is_selected_column (column_date){
    if(selected_column && column_date.valueOf() == selected_column.valueOf()){
        return true;
    }
    return false;
}
~~~
