---
sidebar_label: onScaleClick
title: onScaleClick event
description: "срабатывает, когда пользователь кликает на ячейку в тайм-скейле"
---

# onScaleClick

### Description

@short: Срабатывает, когда пользователь кликает на ячейку в тайм-скейле

@signature: onScaleClick: (e: Event, date: Date) =\> void;

### Parameters

- `e` - (required) *Event* - объект нативного события
- `date` - (required) *Date* - дата, соответствующая кликнутой ячейке

### Example

~~~jsx
gantt.attachEvent("onScaleClick", function (e, date) {
    //ваш кастомный код
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
