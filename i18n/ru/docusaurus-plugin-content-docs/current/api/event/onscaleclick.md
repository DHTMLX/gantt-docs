---
sidebar_label: onScaleClick
title: событие onScaleClick
description: "срабатывает, когда пользователь кликает по ячейке шкалы времени"
---

# onScaleClick

### Description

@short: Срабатывает, когда пользователь кликает по ячейке шкалы времени

@signature: onScaleClick: (e: Event, date: Date) =\> void;

### Parameters

- `e` - (required) *Event* - нативный объект события
- `date` - (required) *Date* - дата нажатой ячейки

### Example

~~~jsx
gantt.attachEvent("onScaleClick", function (e, date) {
    // любая ваша логика здесь
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