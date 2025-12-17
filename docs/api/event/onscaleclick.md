---
sidebar_label: onScaleClick
title: onScaleClick event
description: "fires when the user clicks on the cell in the time scale"
---

# onScaleClick

### Description

@short: Fires when the user clicks on the cell in the time scale

@signature: onScaleClick: (e: Event, date: Date) =\> void;

### Parameters

- `e` - (required) *Event* - a native event object
- `date` - (required) *Date* - the date of the clicked cell

### Example

~~~jsx
gantt.attachEvent("onScaleClick", function (e, date) {
    //your custom code
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
