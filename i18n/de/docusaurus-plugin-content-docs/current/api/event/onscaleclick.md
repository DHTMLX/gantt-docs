---
sidebar_label: onScaleClick
title: onScaleClick-Ereignis
description: "Wird ausgelöst, wenn der Benutzer auf die Zelle in der Zeitachse klickt"
---

# onScaleClick

### Description

@short: Wird ausgelöst, wenn der Benutzer auf die Zelle in der Zeitachse klickt

@signature: onScaleClick: (e: Event, date: Date) =\> void;

### Parameters

- `e` - (erforderlich) *Event* - ein natives Event-Objekt
- `date` - (erforderlich) *Date* - das Datum der angeklickten Zelle

### Example

~~~jsx
gantt.attachEvent("onScaleClick", function (e, date) {
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
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